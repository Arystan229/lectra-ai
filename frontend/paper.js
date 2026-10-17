/* Continuous sheets preserve the editor caret while the paper grows around content. */
window.NotebookPaper=(()=>{
  let observer,raf=0,urls=[];
  const formats={A4:[794,1123],A5:[559,794],Letter:[816,1056]};
  function config(){return {...{size:'A4',ruling:'ruled'},...(folders.find(f=>f.id===doc.subject)?.paper||{}),...(doc.paper||{})}}
  function apply(){
    const c=config(),pane=$('#notesPane');if(!pane)return;
    pane.dataset.paperSize=c.size;pane.dataset.ruling=c.ruling;
    const [w,h]=formats[c.size]||formats.A4;pane.style.setProperty('--sheet-width',w+'px');pane.style.setProperty('--sheet-height',h+'px');
    cancelAnimationFrame(raf);raf=requestAnimationFrame(measure);
  }
  function measure(){
    const blocks=$('#noteBlocks'),pane=$('#notesPane');if(!blocks||pane.hidden||!pane.getClientRects().length)return;
    const c=config(),[w,h]=formats[c.size]||formats.A4;
    const sheetHeight=Math.max(520,h*Math.min(1,pane.clientWidth/w));
    const natural=Array.from(blocks.children).filter(el=>el.classList.contains('note-block')).reduce((n,el)=>Math.max(n,el.offsetTop+el.offsetHeight),0);
    const sheets=Math.max(1,Math.ceil((natural+80)/sheetHeight));
    blocks.style.minHeight=(sheets*sheetHeight-80)+'px';pane.style.setProperty('--sheet-height',sheetHeight+'px');
    const counter=$('#sheetCounter');if(counter)counter.textContent=UI.literal('Листов: ')+sheets+' · '+c.size;
    let guide=$('#sheetGuides');if(!guide){guide=document.createElement('div');guide.id='sheetGuides';guide.setAttribute('aria-hidden','true');blocks.append(guide)}
    const guides=Array.from({length:Math.max(0,sheets-1)},(_,i)=>`<span style="top:${(i+1)*sheetHeight-40}px">${i+2}</span>`).join('');if(guide.innerHTML!==guides)guide.innerHTML=guides;height();
  }
  function settings(){
    const c=config();return `${UI.literal("<div class=\"paper-settings\"><label>Формат листа<select id=\"sheetSize\">")}${Object.keys(formats).map(k=>`<option ${c.size===k?'selected':''}>${k}</option>`).join('')}${UI.literal("</select></label><label>Разлиновка<select id=\"sheetRuling\">")}${[['plain',UI.literal("Чистый")],['ruled',UI.literal("Линейка")],['grid',UI.literal("Клетка")],['dots',UI.literal("Точки")]].map(([v,l])=>`<option value="${v}" ${v===c.ruling?'selected':''}>${l}</option>`).join('')}${UI.literal("</select></label></div><p class=\"hint\">Листы добавляются автоматически по мере ввода. Текст остаётся непрерывным, чтобы переход между листами не мешал печатать.</p>")}`;
  }
  function bind(){for(const id of ['sheetSize','sheetRuling'])$('#'+id).onchange=async()=>{doc.paper={size:$('#sheetSize').value,ruling:$('#sheetRuling').value};await saveNow();apply()}}
  async function attach(files){
    const owner=doc,pageId=doc.pageId;const page=owner.pages.find(p=>p.id===pageId);if(!page)return;
    for(const file of files){
      if(!file.size||file.size>10*1024*1024){notice(UI.literal('Файл должен быть не больше 10 МБ.'),true);continue}
      const key=uid();await write('assets',file,key);
      const ext=file.name.split('.').pop().toLowerCase();
      const source={id:uid(),assetKey:key,name:file.name,kind:ext,status:'attached',selected:false,pages:[],version:1,created:Date.now()};
      owner.sources.push(source);page.blocks.push({id:uid(),type:'attachment',assetKey:key,name:file.name,mime:file.type,size:file.size,source:{kind:'document',sourceId:source.id}});
    }
    if(doc.id===owner.id){await saveNow();if(doc.pageId===pageId)renderBlocks('noteBlocks',doc.blocks)}else await write('documents',owner);
  }
  async function attachment(block,wrap){
    wrap.classList.add('attachment-block');const box=document.createElement('div');box.className='attachment-card';
    box.innerHTML=`<span class="attachment-icon">${svg('books')}</span><div><strong>${esc(block.name)}</strong><small>${fileSize(block.size)} · ${UI.literal('Файл в тетради')}</small></div>`;wrap.append(box);
    const blob=await read('assets',block.assetKey).catch(()=>null);if(!box.isConnected)return;
    if(!blob){box.append(UI.literal('Файл недоступен. Восстанови резервную копию.'));return}
    const url=URL.createObjectURL(blob);urls.push({url,node:box});const a=document.createElement('a');a.href=url;a.download=block.name;a.className='secondary audio-download';a.textContent=UI.literal('Скачать');box.append(a);
    if(/\.pdf$/i.test(block.name)){const open=document.createElement('a');open.href=url;open.target='_blank';open.rel='noopener';open.textContent=UI.literal('Открыть PDF');box.append(open)}
    const source=doc.sources.find(s=>s.id===block.source?.sourceId);
    if(source&&['pdf','docx','pptx','txt','md','text'].includes(source.kind)){const open=document.createElement('button');open.className='quiet';open.textContent=UI.literal('Открыть в источниках');open.onclick=()=>Product.openAttachmentSource(source.id);box.append(open)}
    apply();
  }
  function refresh(){urls=urls.filter(v=>{if(v.node.isConnected)return true;URL.revokeObjectURL(v.url);return false});apply()}
  function init(){
    const bar=document.createElement('div');bar.className='notebook-insert';bar.innerHTML=`${UI.literal("<span id=\"sheetCounter\"></span><div><button id=\"paperSettings\" class=\"quiet\">Настроить лист</button><button id=\"paperImage\" class=\"quiet\">Изображение</button><button id=\"paperLink\" class=\"quiet\">Ссылка</button><button id=\"paperFile\" class=\"quiet\">Файл / презентация</button></div><input id=\"notebookFile\" type=\"file\" accept=\".pdf,.pptx,.docx,.txt,.md,.csv,.xlsx\" multiple hidden>")}`;
    $('#notesPane .document-tools').after(bar);$('#paperSettings').onclick=()=>Product.open('notebook','subject');$('#paperImage').onclick=()=>$('#insertImage').click();$('#paperLink').onclick=()=>$('#insertLink').click();$('#paperFile').onclick=()=>$('#notebookFile').click();$('#notebookFile').onchange=async e=>{const files=[...e.target.files];e.target.value='';try{await attach(files)}catch{notice(t('saveError'),true)}};
    observer=new ResizeObserver(()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(measure)});observer.observe($('#noteBlocks'));$('#noteBlocks').addEventListener('input',apply);$('#noteBlocks').addEventListener('load',apply,true);window.addEventListener('resize',apply);apply();
  }
  return {init,apply,refresh,settings,bind,attachment};
})();
