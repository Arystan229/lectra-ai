import io
import subprocess
import wave
import pytest
import audio_pipeline
from audio_io import compact_audio
import imageio_ffmpeg


def decoder(monkeypatch, parts):
    def decode(upload, skip=0):
        yield from [part for part in parts if part[0] >= skip]
    monkeypatch.setattr(audio_pipeline, 'decoded_chunks', decode)


def test_short_audio_one_request_and_cached_result(monkeypatch):
    decoder(monkeypatch, [(0, 60, b'audio')])
    calls=[]
    job={'chunks': []}
    def short(audio):
        calls.append(audio)
        return {'chunks': [{'paragraphs': ['full transcript']}], 'summary': 'summary'}
    fail=lambda *args: pytest.fail('Short recording must not use two API calls')
    pack, more=audio_pipeline.advance_audio({}, job, fail, fail, short)
    assert not more and pack['summary']=='summary' and len(calls)==1
    assert audio_pipeline.advance_audio({}, job, fail, fail, fail)==(pack, False)


def test_progress_and_resume_without_repeating_paid_chunks(monkeypatch):
    decoder(monkeypatch, [(0,300,b'first'),(1,450,b'second')])
    job={'chunks': []};calls=[]
    def transcribe(audio,index):
        calls.append(index)
        if index==1 and calls.count(1)==1: raise RuntimeError('temporary provider failure')
        return {'notes':[str(index)]}
    summary=lambda chunks: {'summary':str(len(chunks))}
    fail=lambda *args: pytest.fail('Long audio cannot use the short path')
    assert audio_pipeline.advance_audio({},job,transcribe,summary,fail)==(None,True)
    with pytest.raises(RuntimeError):audio_pipeline.advance_audio({},job,transcribe,summary,fail)
    assert len(job['chunks'])==1
    assert audio_pipeline.advance_audio({},job,transcribe,summary,fail)==(None,True)
    pack,more=audio_pipeline.advance_audio({},job,transcribe,summary,fail)
    assert not more and pack['summary']=='2' and calls==[0,1,1]


def test_summary_failure_retries_only_summary(monkeypatch):
    decoder(monkeypatch, [])
    job={'chunks':[{'notes':['done']} ]}
    fail=lambda *args: (_ for _ in ()).throw(RuntimeError('retry'))
    with pytest.raises(RuntimeError):audio_pipeline.advance_audio({},job,fail,fail,fail)
    pack,more=audio_pipeline.advance_audio({},job,fail,lambda c:{'summary':'done'},fail)
    assert not more and len(pack['chunks'])==1


def test_flac_is_lossless_and_smaller():
    pcm=b'\0\0'*16000*3
    source=io.BytesIO()
    with wave.open(source,'wb') as wav:
        wav.setnchannels(1);wav.setsampwidth(2);wav.setframerate(16000);wav.writeframes(pcm)
    encoded,mime=compact_audio(source.getvalue())
    assert mime=='audio/flac' and len(encoded)<len(source.getvalue())
    decoded=subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-i','pipe:0','-f','s16le','pipe:1'],input=encoded,stdout=subprocess.PIPE,check=True).stdout
    assert decoded==pcm


def test_compression_failure_keeps_valid_original(monkeypatch):
    monkeypatch.setattr(subprocess,'run',lambda *a,**kw: (_ for _ in ()).throw(subprocess.TimeoutExpired('ffmpeg',30)))
    assert compact_audio(b'wav')==(b'wav','audio/wav')
