/* Capability-based recording: Safari may reject bitrate hints accepted by Chrome. */
window.MobileAudio = {
  createRecorder(stream) {
    const candidates = ['audio/webm;codecs=opus','audio/mp4;codecs=mp4a.40.2','audio/mp4','audio/ogg;codecs=opus'];
    for (const mimeType of candidates) {
      if (typeof MediaRecorder.isTypeSupported === 'function' && !MediaRecorder.isTypeSupported(mimeType)) continue;
      for (const options of [{mimeType,audioBitsPerSecond:32000},{mimeType}]) {
        try { return new MediaRecorder(stream,options); } catch(error) {
          if (!['NotSupportedError','TypeError'].includes(error.name)) throw error;
        }
      }
    }
    return new MediaRecorder(stream);
  },
  protect(stream, recorder, interrupted) {
    let lock=null, stopped=false, acquiring=false;
    const toggle=document.querySelector('#keepScreenAwake');
    const hint=document.querySelector('#wakeStatus');
    const label=()=>{if(hint)hint.textContent=lock&&!lock.released?UI.literal("Экран удерживается включённым"):UI.literal("Не блокируй экран и держи вкладку открытой во время записи.")};
    async function acquire(){
      if(stopped||acquiring||document.visibilityState!=='visible'||!toggle?.checked||lock&&!lock.released)return;
      acquiring=true;
      try { const next=await navigator.wakeLock?.request('screen');
        if(stopped||!toggle.checked){await next?.release();return;}
        lock=next;lock?.addEventListener('release',label);
      } catch {} finally {acquiring=false;label();}
    }
    function visibility(){
      if(document.visibilityState==='hidden'&&recorder.state==='recording'){
        try{recorder.requestData()}catch{}
      } else acquire();
    }
    function ended(){if(!stopped&&recorder.state!=='inactive')interrupted()}
    function changed(){if(toggle.checked)acquire();else {lock?.release().catch(()=>{});lock=null;label()}}
    const tracks=stream.getAudioTracks();tracks.forEach(t=>t.addEventListener('ended',ended));
    document.addEventListener('visibilitychange',visibility);toggle?.addEventListener('change',changed);acquire();
    return ()=>{stopped=true;lock?.release().catch(()=>{});tracks.forEach(t=>t.removeEventListener('ended',ended));document.removeEventListener('visibilitychange',visibility);toggle?.removeEventListener('change',changed)};
  }
};
