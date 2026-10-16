/* End-to-end notebook regression. Start Streamlit first; no Gemini calls are made.
   AI responses below are explicit fixtures, never production demo content. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
(async()=>{
  const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
  const context=await browser.newContext({viewport:{width:1440,height:1080},acceptDownloads:true});
  const page=await context.newPage(),errors=[];page.setDefaultTimeout(20000);
  page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>dialog.accept());
  const artifacts=process.env.ARTIFACT_DIR||path.resolve('test-results/notebook');await fs.mkdir(artifacts,{recursive:true});
  async function open(){await page.goto(process.env.TEST_URL||'http://127.0.0.1:8501');const iframe=page.locator('iframe').first();await iframe.waitFor({timeout:30000});const frame=await(await iframe.elementHandle()).contentFrame();await frame.waitForFunction(()=>window.Product?.initialized);await frame.evaluate(()=>Product.open('notebook','notes'));await frame.locator('#saveState[data-state="saved"]').waitFor();return frame}
  async function saved(frame){await frame.waitForFunction(()=>!unsaved&&saveStatus==='saved')}
  async function noOverflow(frame){assert(await frame.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'page has horizontal overflow')}
  try{
    let frame=await open();
    await page.waitForTimeout(250);await page.screenshot({path:path.join(artifacts,'desktop-empty.png'),fullPage:true});
    await frame.locator('#lectureTitle').fill('Биология · Фотосинтез и превращение энергии');
    await frame.locator('.editor').first().fill('Световая фаза\nПочему растениям нужен свет?');
    console.log('Opened and typed notes');
    // Select text and use real toolbar controls; marker must survive sanitization/reload.
    await frame.evaluate(()=>{const editor=document.querySelector('.editor');editor.focus();const range=document.createRange();range.selectNodeContents(editor);getSelection().removeAllRanges();getSelection().addRange(range)});
    await frame.locator('#notesPane [data-format="bold"]').click();
    await frame.locator('#notesPane [data-format="hiliteColor"]').click();
    await saved(frame);
    assert(await frame.locator('.editor').first().evaluate(el=>!!el.querySelector('b,strong')));
    assert(await frame.locator('.editor').first().evaluate(el=>!!el.querySelector('[style*="background-color"]')));
    console.log('Reloading saved notebook');await page.reload();await page.locator('iframe').first().waitFor();frame=await(await page.locator('iframe').first().elementHandle()).contentFrame();await frame.waitForFunction(()=>window.Product?.initialized);await frame.evaluate(()=>Product.open('notebook','notes'));await frame.locator('#saveState[data-state="saved"]').waitFor();
    assert(await frame.locator('.editor').first().evaluate(el=>!!el.querySelector('[style*="background-color"]')),'highlight survives reload');
    assert(!(await frame.evaluate(()=>sanitize('<img src=x onerror="alert(1)"><script>alert(1)</script><span style="position:fixed;background-color:rgb(255,240,181)">text</span>'))).includes('onerror'));
    console.log('Marker restored');await frame.locator('#addText').click();await frame.locator('.editor').nth(1).fill('Проверить перед экзаменом');
    await frame.locator('#checklist').click();
    const checkbox=frame.locator('.editor input[type="checkbox"]').first();await checkbox.check();await saved(frame);
    assert(await frame.evaluate(()=>doc.blocks.some(b=>b.html?.includes('checked'))));
    console.log('Checklist saved');await frame.locator('#addDrawing').click();await frame.locator('#drawingDialog').waitFor({state:'visible'});
    const canvas=frame.locator('#drawCanvas');let rect=await canvas.boundingBox();
    await page.mouse.move(rect.x+rect.width*.2,rect.y+rect.height*.3);await page.mouse.down();await page.mouse.move(rect.x+rect.width*.7,rect.y+rect.height*.6,{steps:12});await page.mouse.up();
    assert.equal(await frame.evaluate(()=>drawingBlock.strokes.length),1);
    const original=await frame.evaluate(()=>structuredClone(drawingBlock.strokes));
    await frame.locator('[data-tool="move"]').click();
    await page.mouse.move(rect.x+rect.width*.2,rect.y+rect.height*.3);await page.mouse.down();await page.mouse.move(rect.x+rect.width*.3,rect.y+rect.height*.4,{steps:4});await page.mouse.up();
    assert.notDeepEqual(await frame.evaluate(()=>drawingBlock.strokes),original);
    await frame.locator('#drawUndo').click();assert.deepEqual(await frame.evaluate(()=>drawingBlock.strokes),original);
    await frame.locator('#drawClear').click();assert.equal(await frame.evaluate(()=>drawingBlock.strokes.length),0);
    await frame.locator('#drawUndo').click();assert.deepEqual(await frame.evaluate(()=>drawingBlock.strokes),original);
    await frame.locator('[data-tool="pan"]').click();
    await page.mouse.move(rect.x+rect.width*.4,rect.y+rect.height*.2);await page.mouse.down();await page.mouse.move(rect.x+rect.width*.6,rect.y+rect.height*.2,{steps:5});await page.mouse.up();
    assert.deepEqual(await frame.evaluate(()=>drawingBlock.strokes),original,'navigation must not draw');
    await frame.locator('#closeDrawing').click();await saved(frame);
    console.log('Reloading saved notebook');await page.reload();await page.locator('iframe').first().waitFor();frame=await(await page.locator('iframe').first().elementHandle()).contentFrame();await frame.waitForFunction(()=>window.Product?.initialized);await frame.evaluate(()=>Product.open('notebook','notes'));await frame.locator('#saveState[data-state="saved"]').waitFor();
    assert.deepEqual(await frame.evaluate(()=>doc.blocks.find(b=>b.type==='drawing').strokes),original);
    console.log('Drawing persisted');
    // Supply schema-shaped AI fixtures through the same response handler used by Streamlit.
    const pack={id:'test-lecture',title:'Как растения превращают свет в энергию',summary:'Фотосинтез превращает энергию света в химическую энергию. Процесс происходит в хлоропластах.',notes:['В световой фазе образуются АТФ и НАДФН.','В цикле Кальвина углерод включается в органические вещества.'],terms:[{term:'Хлоропласт',definition:'Органоид растительной клетки, в котором происходит фотосинтез.'}],recommendations:[],chunks:[{paragraphs:[{original:'Photosynthesis converts light energy into chemical energy.',translation:'Фотосинтез превращает световую энергию в химическую.'}],unclear:[]}],quiz:[{question:'Где происходит фотосинтез?',options:['В хлоропластах','В ядре','В рибосомах','В клеточной стенке'],answer:0,explanation:'Хлоропласты содержат хлорофилл и структуры для фотосинтеза.'}]};
    await frame.evaluate(async pack=>{await receive({id:'test-pack',lectureId:doc.id,kind:'analyze',pack})},pack);
    await frame.locator('#splitView').click();await frame.locator('#panelDivider').focus();await page.keyboard.press('ArrowRight');
    assert.equal(await frame.locator('#panelDivider').getAttribute('aria-valuenow'),'52');
    const firstId=await frame.evaluate(()=>doc.blocks[0].id);await frame.locator('#insertPosition').selectOption(firstId);await frame.locator('[data-add="term"]').click();
    assert.equal(await frame.evaluate(()=>doc.blocks[1].source.kind),'ai');
    await frame.locator('[data-material="transcript"]').click();await frame.locator('#transcriptSearch').fill('световую');
    await frame.locator('[data-quote]').first().click();
    assert(await frame.evaluate(()=>doc.blocks.some(b=>b.source?.kind==='transcript'&&b.html.includes('data-time="0"'))));
    await frame.locator('[data-material="summary"]').click();await frame.locator('[data-material="transcript"]').click();assert.equal(await frame.locator('#transcriptSearch').inputValue(),'световую');
    await frame.locator('[data-material="quiz"]').click();await frame.locator('input[value="0"]').check();await frame.locator('#checkQuestion').click();assert((await frame.locator('.quiz-feedback').innerText()).includes('Верно'));
    const before=await frame.evaluate(()=>structuredClone(doc.blocks));
    await frame.evaluate(async()=>{await receive({id:'test-merge',lectureId:doc.id,kind:'merge',draft:{sections:[{heading:'Фотосинтез',text:'Энергия света запасается в химических соединениях.\nВопрос студента: почему растениям нужен свет?',source_block_ids:doc.blocks.map(b=>b.id)}]}})});
    assert.equal(await frame.locator('#draftPreview canvas').count(),1,'preview includes editable drawings visually');
    await frame.locator('#acceptDraft').click();assert.deepEqual(await frame.evaluate(()=>doc.blocks),before,'personal notes unchanged');
    assert.equal(await frame.evaluate(()=>doc.finalBlocks.filter(b=>b.type==='drawing').length),1);
    assert(await frame.evaluate(()=>doc.finalBlocks.some(b=>b.html?.includes('data-time'))),'final preserves timestamps');
    await frame.locator('#finalBlocks .editor').first().fill('Мой отредактированный итоговый конспект');await saved(frame);
    await frame.evaluate(async pack=>{await receive({id:'test-pack-rerun',lectureId:doc.id,kind:'analyze',pack})},pack);
    assert.equal(await frame.evaluate(()=>htmlText(doc.finalBlocks[0].html)),'Мой отредактированный итоговый конспект');
    await frame.locator('[data-view="final"]').click();await frame.locator('#restorePreviousFinal').click();assert.equal(await frame.evaluate(()=>doc.finalBlocks.length),0);
    await frame.locator('#restorePreviousFinal').click();assert.equal(await frame.evaluate(()=>htmlText(doc.finalBlocks[0].html)),'Мой отредактированный итоговый конспект');
    // A denied microphone and a failed AI request must leave notes and drawings intact.
    await frame.evaluate(()=>{navigator.mediaDevices.getUserMedia=async()=>{throw new DOMException('Denied','NotAllowedError')}});
    await frame.locator('#startRecording').click();await frame.locator('#microphoneError').waitFor({state:'visible'});
    await frame.evaluate(async()=>{await receive({id:'test-error',lectureId:doc.id,kind:'analyze',error:{category:'quota'}})});
    assert.deepEqual(await frame.evaluate(()=>doc.blocks),before);
    const saveFailure=await frame.evaluate(async()=>{const originalWrite=write;write=()=>Promise.reject(new Error('test quota'));try{await saveNow().catch(()=>{});return {status:saveStatus,unsaved,text:document.querySelector('#saveState').textContent}}finally{write=originalWrite;await saveNow()}});
    assert.equal(saveFailure.status,'saveError');assert(saveFailure.unsaved);assert(saveFailure.text.includes('Не удалось'));
    await frame.evaluate(()=>{window.testOriginalWrite=write;write=()=>Promise.reject(new Error('test quota'));doc.title='Unsaved backup test'});
    await frame.locator('#backup').click();
    await frame.locator('#downloadBackup').waitFor();const backupEvent=page.waitForEvent('download');await frame.locator('#downloadBackup').click();
    const backup=await backupEvent;await frame.evaluate(()=>{write=window.testOriginalWrite;delete window.testOriginalWrite});const backupPath=path.join(artifacts,'backup-test.json');await backup.saveAs(backupPath);
    const exported=JSON.parse(await fs.readFile(backupPath,'utf8'));assert(exported.documents.some(d=>d.title==='Unsaved backup test'),'backup includes unsaved in-memory edits');await fs.unlink(backupPath);
    await frame.evaluate(async()=>{doc.title='Биология · Фотосинтез и превращение энергии';document.querySelector('#lectureTitle').value=doc.title;await saveNow()});

    await frame.evaluate(()=>{notice('');document.querySelector('#microphoneError').hidden=true});
    await frame.locator('[data-view="notes"]').click();await frame.locator('#splitView').click();await frame.locator('[data-material="summary"]').click();
    await noOverflow(frame);await page.waitForTimeout(250);await page.screenshot({path:path.join(artifacts,'desktop-notebook.png'),fullPage:true});
    // Long title + responsive layout, keyboard navigation, sidebar focus and canvas aspect ratio.
    await frame.locator('#lectureTitle').fill('Очень длинное название лекции о взаимосвязи световой фазы фотосинтеза, обмена веществ и строения растительной клетки');await saved(frame);
    for(const [name,width,height] of [['tablet',820,1180],['phone',360,800]]){
      await page.setViewportSize({width,height});await frame.waitForFunction(width=>innerWidth<=width,width);await noOverflow(frame);
      await frame.locator('#toggleNav').click();assert(await frame.locator('#sidebar').isVisible());await page.keyboard.press('Escape');assert(!(await frame.locator('#sidebar').isVisible()));
      await frame.locator('[data-view="notes"]').click();await frame.locator('.editor').first().click();await page.keyboard.press('End');await page.keyboard.type(' ');await saved(frame);
      await frame.locator('[data-view="notes"]').focus();await page.keyboard.press('ArrowRight');assert.equal(await frame.locator('[data-view="materials"]').getAttribute('aria-selected'),'true');
      await frame.locator('[data-view="notes"]').click();await page.waitForTimeout(250);await page.screenshot({path:path.join(artifacts,name+'-notebook.png'),fullPage:true});
      if(width===360){await frame.locator('#notesPane .format-more summary').click();assert(await frame.locator('#insertLink').isVisible());await page.keyboard.press('Escape')}
      await frame.locator('#noteBlocks .drawing-preview').click();rect=await frame.locator('#drawCanvas').boundingBox();assert(Math.abs(rect.width/rect.height-1000/650)<.02,'canvas aspect ratio');
      await noOverflow(frame);await page.waitForTimeout(250);await page.screenshot({path:path.join(artifacts,name+'-drawing.png'),fullPage:false});await page.keyboard.press('Escape');
    }
    // A reduced viewport approximates layout under a virtual keyboard; physical IME needs device QA.
    await page.setViewportSize({width:360,height:420});await frame.locator('.editor').first().focus();await page.keyboard.type('Текст при уменьшенной высоте');await noOverflow(frame);await saved(frame);
    assert.deepEqual(errors,[]);
    console.log('PASS: editor persistence, drawing move/undo/reload, AI insertion, draft preview/restore, errors, responsive keyboard navigation. Artifacts:',artifacts);
  }catch(error){console.error('Browser errors:',errors);console.error('Frames:',page.frames().map(f=>f.url()));await page.waitForTimeout(250);await page.screenshot({path:path.join(artifacts,'failure.png'),fullPage:true});throw error}finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
