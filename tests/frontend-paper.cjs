/* Real IndexedDB persistence, language switching and responsive paper regression. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
 const page=await context.newPage(),errors=[];page.setDefaultTimeout(20000);
 page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept(d.type()==='prompt'?'Биология':undefined));
 const out=path.resolve('test-results/paper');await fs.mkdir(out,{recursive:true});let f;
 async function ready(){await page.locator('iframe').first().waitFor();f=await(await page.locator('iframe').first().elementHandle()).contentFrame();await f.waitForFunction(()=>window.Product?.initialized)}
 async function saved(){await f.waitForFunction(()=>!unsaved)}
 try{
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8501');await ready();
  await f.evaluate(()=>Product.open('notebook','subject'));
  await f.locator('[data-action="new-subject"]').click();
  await f.locator('#sheetSize').selectOption('A5');await saved();
  await f.locator('#sheetRuling').selectOption('grid');await saved();
  await f.locator('[data-action="subject-paper"]').click();
  assert.equal(await f.evaluate(()=>folders.find(x=>x.id===doc.subject).paper.size),'A5');
  await page.screenshot({path:path.join(out,'subject-desktop.png'),fullPage:true});
  await f.evaluate(()=>Product.open('notebook','notes'));
  const editor=f.locator('#noteBlocks .editor').first();
  const original='Личная заметка / 我的笔记 / my own words';
  await editor.fill(original+'\n'+Array.from({length:90},(_,i)=>'Строка '+i).join('\n'));await saved();
  await f.waitForFunction(()=>document.querySelectorAll('#sheetGuides span').length>1);
  const count=await f.locator('#sheetGuides span').count();await f.waitForTimeout(500);
  assert.equal(await f.locator('#sheetGuides span').count(),count,'sheet count must not grow in a feedback loop');
  await editor.press('End');await page.keyboard.type(' abc');await saved();assert((await editor.innerText()).includes('abc'));
  // Shrinking does not recreate the editor or retain empty sheets.
  await editor.fill(original);await saved();await f.waitForFunction(()=>document.querySelectorAll('#sheetGuides span').length===0);
  await f.locator('#notebookFile').setInputFiles({name:'Конспект.txt',mimeType:'text/plain',buffer:Buffer.from('Light powers photosynthesis. 中文 текст')});
  await f.locator('.attachment-card a[download]').waitFor();await saved();
  const dl=page.waitForEvent('download');await f.locator('.attachment-card a[download]').click();const download=await dl;
  const target=path.join(out,'attachment.txt');await download.saveAs(target);assert((await fs.readFile(target,'utf8')).includes('photosynthesis'));
  await f.locator('.attachment-card button').click();await f.waitForFunction(()=>doc.sources.some(s=>s.status==='ready'));
  assert((await f.locator('#sourceText').innerText()).includes('photosynthesis'));
  await f.evaluate(()=>Product.open('notebook','notes'));
  assert.equal(await f.evaluate(async()=>Object.keys(await collectBackupAssets([doc])).length),1);
  await page.reload();await ready();await f.evaluate(()=>Product.open('notebook','notes'));
  assert.equal(await f.evaluate(()=>doc.paper.size),'A5');assert.equal(await f.evaluate(()=>doc.paper.ruling),'grid');
  await f.locator('.attachment-card a[download]').waitFor();assert((await f.locator('#noteBlocks .editor').first().innerText()).includes(original));
  // A generated outline must retain the student's original attachment.
  await f.evaluate(()=>{doc.draft={sections:[{heading:'Outline',text:'Test fixture',source_block_ids:[doc.blocks[0].id]}]};renderDraft()});
  assert.equal(await f.evaluate(()=>draftBlocks().filter(b=>b.type==='attachment').length),1);
  await f.evaluate(()=>{doc.draft=null;renderDraft()});
  const backup=await f.evaluate(async()=>JSON.stringify({version:1,documents:[doc],folders,assets:await collectBackupAssets([doc])}));
  const restored=await browser.newContext({viewport:{width:820,height:900},acceptDownloads:true});
  const restoredPage=await restored.newPage();await restoredPage.goto(process.env.TEST_URL||'http://127.0.0.1:8501');await restoredPage.locator('iframe').first().waitFor();
  const rf=await(await restoredPage.locator('iframe').first().elementHandle()).contentFrame();await rf.waitForFunction(()=>window.Product?.initialized);
  await rf.locator('#restoreFile').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(backup)});
  await rf.waitForFunction(()=>doc.paper?.size==='A5');await rf.evaluate(()=>Product.open('notebook','notes'));await rf.locator('.attachment-card a[download]').waitFor();
  assert.equal(await rf.evaluate(async()=>(await read('assets',doc.sources[0].assetKey)).size),Buffer.byteLength('Light powers photosynthesis. 中文 текст'));
  await restored.close();
  for(const [language,label] of [['en','Subject'],['zh','科目'],['ru','Предмет']]){
   await f.locator('#uiLanguage').selectOption(language);await f.waitForFunction(language=>document.documentElement.lang===language&&window.Product?.initialized,language);await ready();
   await f.evaluate(()=>Product.open('notebook','subject'));assert.equal(await f.locator('[data-action="book-tab"][data-id="subject"]').innerText(),label);
   assert.deepEqual(await f.evaluate(()=>Object.keys(translations.ru).filter(k=>!translations.en[k]||!translations.zh[k])),[]);
   if(language!=='ru'){
    for(const route of ['home','settings','help']){await f.evaluate(route=>Product.open(route),route);const text=await f.locator('#globalPage').innerText();assert(!/[А-Яа-яЁё]/.test(text.replaceAll(original,'').replaceAll('Биология','').replaceAll('Страница 1','').replaceAll('Без названия','')),`${language}: untranslated ${route}: ${text}`)}
   }
   for(const width of [820,360]){
    await page.setViewportSize({width,height:900});
    for(const tab of ['subject','notes']){await f.evaluate(tab=>Product.open('notebook',tab),tab);await f.waitForTimeout(150);assert(await f.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${language} ${tab} overflow at ${width}`)}
   }
   assert((await f.locator('#noteBlocks .editor').first().innerText()).includes(original),'language switching must preserve notes');
   await page.screenshot({path:path.join(out,`notes-${language}-360.png`),fullPage:true});
  }
  assert.deepEqual(errors,[]);console.log('PASS: subjects, paper formats, automatic sheets, file download/extraction, backup assets, persistence, 3 languages and responsive layouts.');
 }catch(error){await page.screenshot({path:path.join(out,'failure.png'),fullPage:true});console.error(errors);throw error}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
