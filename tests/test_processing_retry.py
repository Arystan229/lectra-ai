"""Exercise the real processing function without importing the Streamlit page."""
import ast
from contextlib import nullcontext
from pathlib import Path
from types import SimpleNamespace

import pytest
import audio_pipeline


def processing_function(monkeypatch):
    tree = ast.parse((Path(__file__).parents[1] / 'app.py').read_text(encoding='utf-8'))
    process = next(node for node in tree.body if isinstance(node,ast.FunctionDef) and node.name=='process')
    calls=[]
    state={}
    ui=SimpleNamespace(update=lambda **kw:None,caption=lambda text:None)
    st=SimpleNamespace(session_state=state,spinner=lambda *a,**kw:nullcontext(),status=lambda *a,**kw:nullcontext(ui),empty=lambda:ui,write=lambda *a:None)
    scope=dict(st=st,genai=SimpleNamespace(Client=lambda **kw:nullcontext(None)),api_key=lambda:'test',
               CHUNK_SECONDS=300,clock_label=str,advance_audio=audio_pipeline.advance_audio,
               decoded_chunks=lambda item:iter([(0,300,b'a'),(1,301,b'b')]),
               summarize=lambda *a: {'summary':'test'})
    def transcribe(client,audio,original,target,index):
        calls.append(index)
        if calls==[0,1]:
            raise RuntimeError('temporary provider failure')
        return {'notes':[str(index)],'terms':[]}
    monkeypatch.setattr(audio_pipeline, 'decoded_chunks', lambda item,skip=0: ((i,d,b) for i,d,b in [(0,300,b'a'),(1,301,b'b')] if i>=skip))
    scope['transcribe_chunk']=transcribe
    exec(compile(ast.Module(body=[process],type_ignores=[]),'app.py','exec'),scope)
    return scope['process'],state,calls


def test_ai_retry_keeps_successful_chunks_and_finished_pack(monkeypatch):
    process,state,calls=processing_function(monkeypatch)
    partial,more=process({},'English','Russian','job')
    assert more and partial['partial']
    with pytest.raises(RuntimeError):
        process({},'English','Russian','job')
    assert len(state['job']['chunks'])==1
    process({},'English','Russian','job')
    assert calls==[0,1,1]
    process({},'English','Russian','job')
    assert state['pack']['total']==2 and state['pack']['duration']==301
    process({},'English','Russian','job')
    assert calls==[0,1,1]
