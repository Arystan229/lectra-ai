"""Bounded, acknowledged audio transfer and reusable decoding for the notebook."""
import base64
import hashlib
import io
import json
import re
import subprocess
import tempfile
import threading
import time
import wave
from pathlib import Path

import imageio_ffmpeg

MAX_BYTES = 450 * 1024 * 1024
CHUNK_BYTES = 4 * 1024 * 1024
MAX_SECONDS = 4 * 3600
CHUNK_SECONDS = 300
EXTENSIONS = {'.wav', '.mp3', '.m4a', '.aac', '.ogg', '.oga', '.opus', '.flac', '.webm', '.weba', '.mp4'}


class AudioError(ValueError):
    def __init__(self, category, message):
        super().__init__(message)
        self.category = category


class AudioStore:
    """Session-owned temporary files. At most two recordings and 450 MiB in total."""
    def __init__(self):
        self._temp = tempfile.TemporaryDirectory(prefix='lectra-audio-')
        self.root = Path(self._temp.name)
        self.uploads = {}

    def _get(self, upload_id):
        item = self.uploads.get(upload_id)
        if not item:
            raise AudioError('uploadExpired', 'Загрузка больше не доступна. Повтори отправку.')
        item['updated'] = time.monotonic()
        return item

    @staticmethod
    def _ack(item):
        return {key: item[key] for key in ('uploadId', 'nextIndex', 'received', 'total', 'ready')} | {'chunkSize': CHUNK_BYTES}

    def handle(self, event):
        upload_id = event.get('uploadId', '')
        if not isinstance(upload_id, str) or not re.fullmatch(r'[a-zA-Z0-9_-]{1,100}', upload_id):
            raise AudioError('uploadError', 'Некорректный идентификатор загрузки.')
        kind = event['kind']
        if kind == 'upload_start':
            size, name = event.get('size'), str(event.get('name', ''))
            if type(size) is not int or size <= 0:
                raise AudioError('emptyAudio', 'Аудиофайл пустой.')
            if size > MAX_BYTES:
                raise AudioError('fileLarge', 'Максимум 450 МБ.')
            if Path(name).suffix.lower() not in EXTENSIONS:
                raise AudioError('unsupportedAudio', 'Неподдерживаемый формат аудио.')
            if upload_id in self.uploads:
                item = self._get(upload_id)
                if item['total'] != size or item['name'] != name:
                    raise AudioError('uploadError', 'Параметры файла изменились.')
                return self._ack(item)
            # Evict least recently used staging files, never another user's session.
            while self.uploads and (len(self.uploads) >= 2 or sum(x['total'] for x in self.uploads.values()) + size > MAX_BYTES):
                oldest = min(self.uploads, key=lambda key: self.uploads[key]['updated'])
                self.uploads.pop(oldest)['directory'].cleanup()
            directory = tempfile.TemporaryDirectory(dir=self.root)
            path = Path(directory.name) / ('source' + Path(name).suffix.lower())
            path.touch()
            item = dict(uploadId=upload_id, nextIndex=0, received=0, total=size, ready=False,
                        name=name, path=path, directory=directory, updated=time.monotonic(), digest=hashlib.sha256())
            self.uploads[upload_id] = item
            return self._ack(item)
        item = self._get(upload_id)
        if kind == 'upload_chunk':
            index, encoded = event.get('index'), event.get('audio')
            if type(index) is not int or index < 0 or not isinstance(encoded, str) or len(encoded) > ((CHUNK_BYTES + 2) // 3) * 4:
                raise AudioError('uploadError', 'Некорректная часть аудио.')
            try:
                data = base64.b64decode(encoded, validate=True)
            except (ValueError, TypeError) as error:
                raise AudioError('uploadError', 'Повреждённая часть аудио.') from error
            if not data or len(data) > CHUNK_BYTES:
                raise AudioError('uploadError', 'Некорректный размер части.')
            if index < item['nextIndex']:
                # Lost ACK: acknowledge identical retries, never append twice.
                if len(data) != min(CHUNK_BYTES, item['total'] - index * CHUNK_BYTES):
                    raise AudioError('uploadError', 'Некорректный размер повторной части.')
                with item['path'].open('rb') as source:
                    source.seek(index * CHUNK_BYTES)
                    if source.read(len(data)) != data:
                        raise AudioError('uploadError', 'Повторная часть отличается от сохранённой.')
                return self._ack(item)
            expected = min(CHUNK_BYTES, item['total'] - item['received'])
            if item['ready'] or index != item['nextIndex'] or len(data) != expected:
                raise AudioError('uploadError', 'Нарушен порядок или размер частей.')
            with item['path'].open('ab') as target:
                target.write(data)
            item['digest'].update(data)
            item['received'] += len(data)
            item['nextIndex'] += 1
        elif kind == 'upload_finish':
            if item['received'] != item['total']:
                raise AudioError('uploadError', 'Файл ещё не загружен полностью.')
            item['ready'] = True
        else:
            raise AudioError('uploadError', 'Неизвестная операция загрузки.')
        return self._ack(item)

    def ready(self, upload_id):
        item = self._get(upload_id)
        if not item['ready']:
            raise AudioError('uploadError', 'Дождись завершения загрузки.')
        return item


def decoded_chunks(item):
    """Decode bounded PCM blocks, caching each WAV before yielding to AI.

    Retries reuse completed blocks and seek past them. No full lecture PCM buffer
    or normalized four-hour WAV must be produced before the first AI request.
    """
    folder = item['path'].parent
    manifest = folder / 'decoded.json'
    state = json.loads(manifest.read_text()) if manifest.exists() else {'parts': [], 'complete': False}
    duration = 0
    for index, info in enumerate(state['parts']):
        duration += info['seconds']
        yield index, duration, (folder / info['name']).read_bytes()
    if state['complete']:
        return
    if duration > MAX_SECONDS:
        raise AudioError('recordLimit', 'Максимальная длительность — 4 часа.')
    command = [imageio_ffmpeg.get_ffmpeg_exe(), '-nostdin', '-v', 'error']
    if duration:
        command += ['-ss', str(duration)]
    command += ['-i', str(item['path']), '-t', str(MAX_SECONDS + 1 - duration),
                '-map', '0:a:0', '-vn', '-ac', '1', '-ar', '16000', '-f', 's16le', 'pipe:1']
    with tempfile.TemporaryFile() as errors:
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=errors)
        try:
            while True:
                # Bound decoder work only; time spent waiting for Gemini is excluded.
                timer = threading.Timer(120, process.kill)
                timer.daemon = True
                timer.start()
                try:
                    frames = process.stdout.read(CHUNK_SECONDS * 16000 * 2)
                finally:
                    timer.cancel()
                if not frames:
                    if process.wait(timeout=10) != 0:
                        raise AudioError('invalidAudio', 'Не удалось прочитать аудио. Проверь файл или выбери MP3/M4A/WAV.')
                    if not state['parts']:
                        raise AudioError('emptyAudio', 'В файле нет доступного звука.')
                    state['complete'] = True
                    manifest.write_text(json.dumps(state))
                    return
                seconds = len(frames) / 32000
                # A short final read means EOF. Validate it before caching/yielding;
                # a failed decoder must never turn into a successful cached retry.
                if len(frames) < CHUNK_SECONDS * 32000 and process.wait(timeout=10) != 0:
                    raise AudioError('invalidAudio', 'Не удалось прочитать аудио полностью.')
                duration += seconds
                if duration > MAX_SECONDS:
                    raise AudioError('recordLimit', 'Максимальная длительность — 4 часа.')
                output = io.BytesIO()
                with wave.open(output, 'wb') as wav:
                    wav.setnchannels(1)
                    wav.setsampwidth(2)
                    wav.setframerate(16000)
                    wav.writeframes(frames)
                name = f'part-{len(state["parts"]):04d}.wav'
                (folder / name).write_bytes(output.getvalue())
                state['parts'].append({'name': name, 'seconds': seconds})
                manifest.write_text(json.dumps(state))
                yield len(state['parts']) - 1, duration, output.getvalue()
        finally:
            if process.poll() is None:
                process.kill()
            process.wait()
            process.stdout.close()
