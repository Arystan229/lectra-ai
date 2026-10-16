/* Run: node tests/frontend-audio.cjs. Requires playwright and a Chromium browser.
 * Uses the real Streamlit bridge at TEST_URL (default localhost:8501), no Gemini key.
 */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const os=require('node:os');
function wav(seconds=1){
  const samples=16000*seconds, result=Buffer.alloc(44+samples*2);
  result.write('RIFF');result.writeUInt32LE(result.length-8,4);result.write('WAVEfmt ',8);
  result.writeUInt32LE(16,16);result.writeUInt16LE(1,20);result.writeUInt16LE(1,22);
  result.writeUInt32LE(16000,24);result.writeUInt32LE(32000,28);result.writeUInt16LE(2,32);result.writeUInt16LE(16,34);
  result.write('data',36);result.writeUInt32LE(samples*2,40);
  for(let i=0;i<samples;i++)result.writeInt16LE(Math.sin(i*2*Math.PI*440/16000)*4000,44+i*2);
  return result;
}
(async()=>{
  const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),
    args:['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream']});
  const context=await browser.newContext({acceptDownloads:true,viewport:{width:1366,height:1000}});
  const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
  page.on('dialog',dialog=>dialog.accept());
  const temp=await fs.mkdtemp(path.join(os.tmpdir(),'lectra-test-'));
  try{
    await page.goto(process.env.TEST_URL||'http://127.0.0.1:8501');
    const element=page.locator('iframe').first();await element.waitFor({timeout:30000});
    const frame=await (await element.elementHandle()).contentFrame();
    await frame.waitForFunction(()=>document.querySelector('#saveState')?.textContent.includes('Сохранено'));
    await frame.waitForFunction(()=>window.Product?.initialized);await frame.evaluate(()=>Product.open('notebook','notes'));
    await frame.waitForFunction(()=>innerWidth>1000);
    await page.screenshot({path:path.join(temp,'desktop-initial.png'),fullPage:true});
    await frame.locator('.editor').first().fill('Мои заметки сохраняются при загрузке аудио.');
    const audio=wav();const started=Date.now();
    await frame.locator('#audioFile').setInputFiles({name:'лекция.wav',mimeType:'',buffer:audio});
    await frame.locator('#downloadAudio').waitFor({state:'visible'});
    await frame.waitForFunction(()=>document.querySelector('#audioStatus').textContent.includes('готово'));
    console.log('Local import/preview:',Date.now()-started,'ms');
    await frame.waitForFunction(()=>document.querySelector('#audioPlayer').readyState>=1);
    const downloadEvent=page.waitForEvent('download');await frame.locator('#downloadAudio').click();
    const download=await downloadEvent;const saved=path.join(temp,'original.wav');await download.saveAs(saved);
    assert.equal(download.suggestedFilename(),'лекция.wav');assert.deepEqual(await fs.readFile(saved),audio);
    // Empty files and same-file retry must not destroy a previous successful import.
    await frame.locator('#audioFile').setInputFiles({name:'empty.wav',mimeType:'audio/wav',buffer:Buffer.alloc(0)});
    await frame.waitForFunction(()=>document.querySelector('#notice').textContent.includes('пустой'));
    assert(await frame.locator('#downloadAudio').isVisible());
    await frame.locator('#audioFileFallback').setInputFiles({name:'bad.txt',mimeType:'text/plain',buffer:Buffer.from('no audio')});
    await frame.waitForFunction(()=>document.querySelector('#notice').textContent.includes('аудиофайл'));
    await frame.locator('#audioFile').setInputFiles({name:'лекция.wav',mimeType:'',buffer:audio});
    await frame.waitForFunction(()=>document.querySelector('#audioStatus').textContent.includes('готово'));
    assert((await frame.locator('.editor').first().innerText()).includes('Мои заметки'));
    assert.equal(await frame.locator('#audioFileFallback').getAttribute('accept'),null);
    assert((await frame.locator('#audioFile').getAttribute('accept')).includes('.m4a'));
    // Exercise the actual Streamlit acknowledged transfer, without calling AI.
    const result=await frame.evaluate(async()=>{
      const asset=await read('assets',doc.audioKey),context={lectureId:doc.id,audioKey:doc.audioKey},uploadId=doc.audioKey;
      pending={kind:'test'};
      try{
        let ack=await bridgeRequest('upload_start',{uploadId,name:doc.audioName,size:asset.size,mime:asset.type},context);
        if(ack.error)throw new Error(JSON.stringify(ack.error));
        ack=await bridgeRequest('upload_chunk',{uploadId,index:0,audio:await blobData(asset)},context);
        if(ack.error)throw new Error(JSON.stringify(ack.error));
        const duplicate=await bridgeRequest('upload_chunk',{uploadId,index:0,audio:await blobData(asset)},context);
        const done=await bridgeRequest('upload_finish',{uploadId},context);
        const retry=await bridgeRequest('upload_start',{uploadId,name:doc.audioName,size:asset.size,mime:asset.type},context);
        return {received:ack.received,duplicate:duplicate.received,ready:done.ready,retryReady:retry.ready};
      }finally{pending=null;}
    });
    assert.deepEqual(result,{received:audio.length,duplicate:audio.length,ready:true,retryReady:true});
    console.log('Real Streamlit upload ACK, duplicate and cached retry: passed');
    // Test captured request context and 4 MiB slices against a fake bridge only.
    const transfer=await frame.evaluate(async()=>{
      const originalRequest=bridgeRequest,originalKey=bridge.has_key;
      const packets=[];let receivedBytes=0;
      bridge.has_key=true;
      bridgeRequest=async(kind,payload,context)=>{
        packets.push({kind,size:payload.audio?atob(payload.audio).length:0,audioKey:context.audioKey});
        if(kind==='upload_start')return {chunkSize:4*1024*1024,nextIndex:0,received:0,ready:false};
        if(kind==='upload_chunk'){receivedBytes+=atob(payload.audio).length;return {nextIndex:payload.index+1,received:receivedBytes,ready:false};}
        if(kind==='upload_finish')return {ready:true};
        return {id:'fake-analysis',kind:'analyze',lectureId:context.lectureId,audioKey:context.audioKey,error:{category:'quota'}};
      };
      try{
        const currentKey=doc.audioKey;
        await write('assets',new Blob([new Uint8Array(4*1024*1024+100)],{type:'audio/wav'}),currentKey);
        await Promise.all([analyze(),analyze()]);
        return packets;
      }finally{bridgeRequest=originalRequest;bridge.has_key=originalKey;}
    });
    assert.deepEqual(transfer.map(x=>x.kind),['upload_start','upload_chunk','upload_chunk','upload_finish','analyze']);
    assert.equal(transfer[1].size,4*1024*1024);assert.equal(transfer[2].size,100);
    const cancellation=await frame.evaluate(async()=>{
      const originalRequest=bridgeRequest,originalKey=bridge.has_key;bridge.has_key=true;
      let part=0;
      bridgeRequest=async(kind,payload)=>{
        if(kind==='upload_start')return {chunkSize:4*1024*1024,nextIndex:0,received:0,ready:false};
        if(kind==='upload_chunk'){part++;uploadTask.cancelled=true;return {received:4*1024*1024,nextIndex:1};}
        throw new Error('Cancellation must not submit audio to AI');
      };
      try{await analyze();return {part,busy:!!pending,cancelled:document.querySelector('#notice').textContent.includes('остановлена')};}
      finally{bridgeRequest=originalRequest;bridge.has_key=originalKey;}
    });
    assert.deepEqual(cancellation,{part:1,busy:false,cancelled:true});
    const stages=await frame.evaluate(async()=>{
      const real=bridgeRequest,key=bridge.has_key;bridge.has_key=true;let count=0,seen=false;
      const pack={title:'Test lecture',summary:'Summary',notes:[],terms:[],quiz:[],slides:[],recommendations:[],original_language:doc.original,target_language:doc.target,chunks:[{paragraphs:[{original:'Full speech',translation:'Полная речь'}],notes:[],terms:[],unclear:[]}]};
      bridgeRequest=async(kind,payload,context)=>{
        if(kind==='upload_start')return {chunkSize:4*1024*1024,nextIndex:2,received:4*1024*1024+100,ready:true};
        if(kind!=='analyze')throw Error(kind);
        count++;if(count===2)seen=doc.pack?.partial===true;
        return {id:'stage-'+count,kind,lectureId:context.lectureId,audioKey:context.audioKey,more:count===1,partial:count===1,pack:{...pack,partial:count===1}};
      };
      try{await analyze();await analyze();return {count,seen,complete:!doc.pack.partial};}
      finally{bridgeRequest=real;bridge.has_key=key;}
    });
    assert.deepEqual(stages,{count:2,seen:true,complete:true});
    console.log('Progressive results and zero-network local result cache: passed');
    const stale=await frame.evaluate(async()=>{
      const originalPack=doc.pack;
      await receive({id:'stale-result',kind:'analyze',lectureId:doc.id,audioKey:'old-recording',pack:{title:'Wrong audio'}});
      return doc.pack===originalPack;
    });
    assert(stale);
    // Reimport real audio before refresh/recording checks.
    await frame.locator('#audioFile').setInputFiles({name:'лекция.wav',mimeType:'audio/wav',buffer:audio});
    await frame.waitForFunction(()=>document.querySelector('#audioStatus').textContent.includes('готово'));
    await page.reload();await page.locator('iframe').first().waitFor();
    const frame2=await (await page.locator('iframe').first().elementHandle()).contentFrame();
    await frame2.waitForFunction(()=>window.Product?.initialized);await frame2.evaluate(()=>Product.open('notebook','notes'));
    await frame2.locator('#downloadAudio').waitFor({state:'visible'});
    assert((await frame2.locator('.editor').first().innerText()).includes('Мои заметки'));
    await page.setViewportSize({width:390,height:844});
    await frame2.locator('#startRecording').click();
    await frame2.locator('#stopRecording').waitFor({state:'visible'});
    await page.waitForTimeout(750);
    await frame2.locator('#pauseRecording').click();
    assert((await frame2.locator('#pauseRecording').innerText()).includes('Продолжить'));
    await frame2.locator('#pauseRecording').click();
    await page.waitForTimeout(500);
    await frame2.locator('#stopRecording').click();
    await frame2.waitForFunction(()=>document.querySelector('#audioStatus').textContent.includes('готово'));
    const recordingDownload=page.waitForEvent('download');await frame2.locator('#downloadAudio').click();
    const recording=await recordingDownload;await recording.saveAs(path.join(temp,recording.suggestedFilename()));
    assert((await fs.stat(path.join(temp,recording.suggestedFilename()))).size>0);
    console.log('Record / pause / resume / finalize / download without AI: passed');
    await page.setViewportSize({width:360,height:900});
    await frame2.waitForFunction(()=>innerWidth<500);
    assert(await frame2.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await page.screenshot({path:path.join(temp,'mobile.png'),fullPage:true});
    await page.setViewportSize({width:1366,height:1000});
    await frame2.waitForFunction(()=>innerWidth>1000);
    await page.screenshot({path:path.join(temp,'desktop.png'),fullPage:true});
    assert.deepEqual(errors,[]);
    console.log('PASS: import/export, notes persistence, validation, real upload, bounded transfer, duplicate click, recording, mobile layout. Artifacts:',temp);
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
