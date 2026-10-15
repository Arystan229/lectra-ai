import base64
import hashlib
import io
import subprocess
import wave

import imageio_ffmpeg
import pytest

import audio_io
from audio_io import AudioError, AudioStore, CHUNK_BYTES, decoded_chunks


def send(store, data, name='lecture.wav', key='audio-1'):
    store.handle(dict(kind='upload_start', uploadId=key, name=name, size=len(data)))
    for index, offset in enumerate(range(0, len(data), CHUNK_BYTES)):
        store.handle(dict(kind='upload_chunk', uploadId=key, index=index,
                          audio=base64.b64encode(data[offset:offset+CHUNK_BYTES]).decode()))
    store.handle(dict(kind='upload_finish', uploadId=key))
    return store.ready(key)


def test_upload_resume_and_identical_retry():
    store = AudioStore()
    data = b'a' * CHUNK_BYTES + b'last'
    start = dict(kind='upload_start', uploadId='audio-1', size=len(data), name='Lecture.M4A')
    assert store.handle(start)['received'] == 0
    part = dict(kind='upload_chunk', uploadId='audio-1', index=0, audio=base64.b64encode(data[:CHUNK_BYTES]).decode())
    assert store.handle(part)['received'] == CHUNK_BYTES
    assert store.handle(part)['received'] == CHUNK_BYTES
    assert store.handle(start)['nextIndex'] == 1
    with pytest.raises(AudioError):
        store.handle(dict(kind='upload_finish', uploadId='audio-1'))
    store.handle(dict(kind='upload_chunk', uploadId='audio-1', index=1, audio=base64.b64encode(b'last').decode()))
    assert store.handle(dict(kind='upload_finish', uploadId='audio-1'))['ready']
    item = store.ready('audio-1')
    assert item['path'].read_bytes() == data
    assert item['digest'].hexdigest() == hashlib.sha256(data).hexdigest()


@pytest.mark.parametrize('size,name,category', [(0,'a.wav','emptyAudio'),(audio_io.MAX_BYTES+1,'a.wav','fileLarge'),(10,'a.txt','unsupportedAudio')])
def test_invalid_upload(size, name, category):
    with pytest.raises(AudioError) as error:
        AudioStore().handle(dict(kind='upload_start', uploadId='test', size=size, name=name))
    assert error.value.category == category


def test_transfer_order_validation_and_session_isolation():
    store = AudioStore()
    store.handle(dict(kind='upload_start', uploadId='test', size=4, name='x.mp3'))
    for index, encoded in [(1,'YWJjZA=='),(0,'$$$'),(0,'YQ==')]:
        with pytest.raises(AudioError):
            store.handle(dict(kind='upload_chunk',uploadId='test',index=index,audio=encoded))
    send(store,b'abcd','x.mp3',key='other')
    with pytest.raises(AudioError,match='доступна'):
        AudioStore().ready('other')


def fixture_audio(path, seconds=2.2):
    subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-f','lavfi','-i',
                    'sine=frequency=440:sample_rate=16000','-t',str(seconds),'-y',str(path)],check=True,timeout=30)
    return path.read_bytes()


@pytest.mark.parametrize('extension', ['wav','mp3','m4a','ogg','opus','webm','flac','aac'])
def test_real_audio_decode_and_cached_retry(tmp_path, monkeypatch, extension):
    monkeypatch.setattr(audio_io,'CHUNK_SECONDS',1)
    store = AudioStore()
    item = send(store, fixture_audio(tmp_path / ('test.'+extension)), 'test.'+extension)
    chunks = list(decoded_chunks(item))
    assert 2 <= len(chunks) <= 3
    assert 2 <= chunks[-1][1] <= 2.5
    with wave.open(io.BytesIO(chunks[0][2])) as wav:
        assert wav.getframerate() == 16000 and wav.getnchannels() == 1
        assert wav.getnframes() == 16000
    monkeypatch.setattr(subprocess,'Popen',lambda *a,**kw: pytest.fail('A cached retry must not decode again'))
    assert list(decoded_chunks(item)) == chunks


def test_resume_after_first_decoded_chunk(tmp_path, monkeypatch):
    monkeypatch.setattr(audio_io,'CHUNK_SECONDS',1)
    store = AudioStore()
    item = send(store,fixture_audio(tmp_path/'lecture.wav'),'lecture.wav')
    first = decoded_chunks(item)
    head = next(first)
    first.close()
    resumed = list(decoded_chunks(item))
    assert resumed[0] == head
    assert resumed[-1][1] == pytest.approx(2.2,abs=.01)


def test_corrupt_audio_and_duration_limit(tmp_path, monkeypatch):
    store = AudioStore()
    with pytest.raises(AudioError):
        list(decoded_chunks(send(store,b'not a recording','a.m4a')))
    monkeypatch.setattr(audio_io,'MAX_SECONDS',1)
    with pytest.raises(AudioError) as error:
        list(decoded_chunks(send(store,fixture_audio(tmp_path/'a.wav'),'a.wav',key='long')))
    assert error.value.category == 'recordLimit'
