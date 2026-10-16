"""One resumable unit of audio work per client request. No Streamlit dependencies."""
from audio_io import decoded_chunks


def advance_audio(upload, job, transcribe, summarize, short_pack):
    if job.get('pack'):
        return job['pack'], False
    iterator = decoded_chunks(upload, skip=len(job['chunks']))
    try:
        item = next(iterator, None)
        if item is not None:
            index, duration, audio = item
            job.update(duration=duration, total=index+1)
            job['stage'] = f'Распознавание части {index+1}'
            if index == 0 and duration <= 120:
                # A sub-120s first block is EOF (normal decoder blocks are 300s).
                # Consume EOF to validate/commit its decode manifest before the API call.
                if next(iterator, None) is not None:
                    raise ValueError('Unexpected short audio boundary')
                pack = short_pack(audio)
                job['chunks'] = pack['chunks']
                job['pack'] = pack
                return pack, False
            job['chunks'].append(transcribe(audio, index))
            return None, True
        job['stage'] = 'Создание учебных материалов'
        pack = summarize(job['chunks'])
        pack['chunks'] = job['chunks']
        job['pack'] = pack
        return pack, False
    finally:
        iterator.close()
