const {chromium,webkit}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
(async()=>{
 const engine=process.env.TEST_ENGINE==='webkit'?webkit:chromium;
 const browser=await engine.launch({headless:true,...(engine===chromium?{executablePath:process.env.CHROME_PATH}:{})});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,acceptDownloads:true});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());page.setDefaultTimeout(25000);
 const out=path.resolve('test-results/experience');await fs.mkdir(out,{recursive:true});
 try{
  await page.goto('http://127.0.0.1:8501');await page.locator('iframe').first().waitFor({timeout:90000});const f=await(await page.locator('iframe').first().elementHandle()).contentFrame();await f.waitForFunction(()=>window.Product?.initialized&&document.querySelector('#chooseTemplate'));
  await f.evaluate(()=>Product.open('notebook','notes'));await f.locator('.editor').first().fill('Original student notes');await f.waitForFunction(()=>!unsaved);
  await f.locator('#chooseTemplate').click();await f.locator('[data-template="cornell"]').click();await f.locator('#noteBlocks table').waitFor();assert.equal(await f.evaluate(()=>doc.pages.length),2);assert(await f.evaluate(()=>doc.pages[0].blocks[0].html.includes('Original student notes')));
  assert.equal(await f.evaluate(()=>NotebookExperience.shapePoints('rectangle',{x:1,y:2},{x:30,y:40}).length),5);
  await f.locator('#addDrawing').click();await f.locator('[data-tool="rectangle"]').click();
  await f.locator('#drawCanvas').scrollIntoViewIfNeeded();const box=await f.locator('#drawCanvas').boundingBox();await page.mouse.move(box.x+20,box.y+20);await page.mouse.down();await page.mouse.move(box.x+100,box.y+80,{steps:5});await page.mouse.up();assert(await f.evaluate(()=>drawingBlock.strokes.some(s=>s.tool==='rectangle'&&s.points.length===5)));
  await f.locator('#closeDrawing').click();
  // Simulate an IndexedDB transaction that never produces completion or error.
  await f.evaluate(()=>{window.originalDB=db;window.testAbort=false;db={transaction(store,...args){if(store!=='assets')return originalDB.transaction(store,...args);return {objectStore(){return {put(){}}},abort(){testAbort=true;this.onabort?.()}}}}});
  const started=Date.now();await f.locator('#audioFile').setInputFiles({name:'lecture.m4a',mimeType:'audio/mp4',buffer:Buffer.alloc(512*1024,1)});
  await f.locator('#downloadAudio').waitFor();assert(Date.now()-started<5000,'preview must not wait for storage');
  await f.waitForFunction(()=>!audioBusy);assert(await f.evaluate(()=>testAbort&&volatileRecording&&!!currentAudioBlob));assert(await f.locator('#analyze').isEnabled());
  const transfer=await f.evaluate(async()=>{db=originalDB;const real=bridgeRequest,key=bridge.has_key;bridge.has_key=true;let bytes=0,analyzed=false;
   bridgeRequest=async(kind,payload,context)=>{if(kind==='upload_start')return{chunkSize:4*1024*1024,nextIndex:0,received:0};if(kind==='upload_chunk'){bytes+=atob(payload.audio).length;return{nextIndex:1,received:bytes}}if(kind==='upload_finish')return{ready:true};analyzed=true;return{id:'test-error',kind:'analyze',lectureId:context.lectureId,audioKey:context.audioKey,error:{category:'quota'}}};
   try{await analyze();return{bytes,analyzed}}finally{bridgeRequest=real;bridge.has_key=key;volatileRecording=false}});
  assert.deepEqual(transfer,{bytes:512*1024,analyzed:true});
  await f.evaluate(()=>{notice('');return Product.open('library')});await f.locator('.paper-cover').first().waitFor();assert(await f.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:path.join(out,`${process.env.TEST_ENGINE||'chromium'}-mobile.png`),fullPage:true});
  await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:path.join(out,`${process.env.TEST_ENGINE||'chromium'}-desktop.png`),fullPage:true});
  assert.deepEqual(errors,[]);console.log('PASS: template preservation, library previews, bounded storage stall and in-memory audio transfer: '+(process.env.TEST_ENGINE||'chromium'));
 }catch(error){console.error('Page errors:',errors);console.error((await page.locator('body').innerText()).slice(0,2500));throw error}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
