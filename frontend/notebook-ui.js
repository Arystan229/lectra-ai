let notebookBackupURL=null;
function prepareNotebookBackup(value){
  if(notebookBackupURL)URL.revokeObjectURL(notebookBackupURL);
  notebookBackupURL=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));
  notice(t('backupReady'));
  const link=document.createElement('a');link.id='downloadBackup';link.className='download-link';
  link.href=notebookBackupURL;link.download='lectra-backup.json';link.textContent=t('downloadBackup');$('#notice').append(link);
  link.focus({preventScroll:true});link.scrollIntoView({block:'nearest'});
}
function notebookScrollHost(){
  try{if(window.parent!==window&&window.parent.location.origin===location.origin)return window.parent.document.querySelector('[data-testid="stMain"]')||window.parent}catch{}
  return window;
}
/* Notebook interactions stay separate from recording and the Streamlit protocol. */
function resizeTitle(){const title=$('#lectureTitle');title.style.height='auto';title.style.height=title.scrollHeight+'px'}
function positionNotebookDialog(){
  const dialog=$('#drawingDialog');
  let top=12,height=window.visualViewport?.height||innerHeight;
  try{if(window.frameElement){const rect=window.frameElement.getBoundingClientRect();top=Math.max(12,12-rect.top);height=window.parent.visualViewport?.height||window.parent.innerHeight}}catch{}
  dialog.style.position='fixed';dialog.style.top=top+'px';dialog.style.margin='0 auto';dialog.style.left='0';dialog.style.right='0';
  dialog.style.maxHeight=Math.max(240,height-24)+'px';
  if(innerWidth<=600)dialog.style.height=Math.max(240,height-24)+'px';else dialog.style.height='auto';
}
function closeNotebookNavigation(restoreFocus=true){
  $('#app').classList.remove('nav-open');$('#navigationBackdrop').hidden=true;$('#mainContent').inert=false;
  $('#toggleNav').setAttribute('aria-expanded',String(innerWidth>1000&&!$('#app').classList.contains('nav-collapsed')));
  if(restoreFocus)$('#toggleNav').focus({preventScroll:true});
}
function initNotebookUI(){
  Object.assign(translations.ru,{
    sourceDocument:'Источник: документ',backupReady:'Копия подготовлена, включая последние изменения. Скачай её на устройство.',downloadBackup:'Скачать резервную копию',checkItem:'Новая задача',keyMissing:'Анализ недоступен: ключ AI не настроен.',importHelp:'Форматы и помощь с загрузкой',personalSpace:'Личный конспект',bold:'Жирный · Ctrl+B',italic:'Курсив · Ctrl+I',numbered:'Нумерованный список',
    addedToNotes:'Фрагмент добавлен в «Мои заметки». Его можно редактировать.',afterBlock:'После блока',materialsEmptyTitle:'Разберём лекцию по полочкам',
    navigateCanvas:'Прокрутка',fingerDrawing:'Рисовать пальцем',
    drawingHint:'«Перемещать» — выбрать и перетащить штрих. «Прокрутка» — двигать страницу без рисования. После касания стилусом рисование пальцем отключается; его можно включить снова.',
    recordHint:'Пиши заметки во время записи. До её завершения оставь вкладку открытой.',
    emptyFinal:'Здесь будет итоговый конспект. Собери черновик из заметок и материалов лекции или начни писать самостоятельно.',
    sideBySide:'Две панели',move:'Перемещать',uploadAudio:'Загрузить аудио'
  });
  Object.assign(translations.en,{sourceDocument:'Source: document',backupReady:'Backup is ready, including your latest edits. Save it to your device.',downloadBackup:'Download backup',checkItem:'New task',importHelp:'Formats and upload help',personalSpace:'Personal notebook',bold:'Bold · Ctrl+B',italic:'Italic · Ctrl+I',numbered:'Numbered list',addedToNotes:'Added to My notes. You can edit this block.',afterBlock:'After block',materialsEmptyTitle:'Make sense of your lecture',navigateCanvas:'Scroll',fingerDrawing:'Draw with a finger',drawingHint:'Move selects and drags a stroke. Scroll navigates without drawing. Using a stylus turns finger drawing off; you can enable it again.'});
  Object.assign(translations.zh,{sourceDocument:'来源：文档',backupReady:'已准备好包含最新编辑的备份。',downloadBackup:'下载备份',checkItem:'新任务',importHelp:'音频格式与上传帮助',personalSpace:'个人笔记',bold:'粗体',italic:'斜体',numbered:'编号列表',addedToNotes:'已添加到我的笔记，可以编辑。',afterBlock:'在此块之后',materialsEmptyTitle:'整理讲座内容',navigateCanvas:'滚动',fingerDrawing:'用手指绘图'});
  $$('.text-style').forEach(select=>{
    select.onchange=()=>{format('formatBlock',select.value);select.value='p'};
    // Keyboard focus must not erase the contenteditable selection.
    select.onmousedown=()=>{const selection=getSelection();if(selection.rangeCount&&activeEditor?.contains(selection.anchorNode))editorRange=selection.getRangeAt(0).cloneRange()};
  });
  $$('.toolbar').forEach(toolbar=>{toolbar.setAttribute('aria-label',t('myNotes'));toolbar.querySelectorAll('button').forEach(button=>button.addEventListener('mousedown',event=>event.preventDefault()))});
  // Keep writing and drawing one tap away; secondary commands use a touch menu.
  $$('.toolbar').forEach(toolbar=>{
    const more=document.createElement('details');more.className='format-more';
    more.innerHTML=UI.literal('<summary aria-label="Дополнительное форматирование">···</summary><div class="format-menu"></div>');
    const menu=more.querySelector('.format-menu');
    for(const button of [...toolbar.querySelectorAll('button')]){
      if(['bold','italic'].includes(button.dataset.format)||button.dataset.label==='addDrawing')continue;
      menu.append(button);button.addEventListener('click',()=>{more.open=false});
    }
    toolbar.append(more);more.open=innerWidth>600;
    more.addEventListener('toggle',()=>{if(innerWidth>600&&!more.open)more.open=true});
    window.addEventListener('resize',()=>{more.open=innerWidth>600});
    more.addEventListener('keydown',event=>{if(event.key==='Escape'){more.open=false;more.querySelector('summary').focus()}});
    document.addEventListener('click',event=>{if(!more.contains(event.target))more.open=false});
  });
  const backupAction=$('#backup').onclick;
  $('#backup').onclick=async()=>{$('#backup').disabled=true;try{await backupAction()}catch{notice(t('saveError'),true)}finally{$('#backup').disabled=false}};
  $('#addFinalText').onclick=()=>{doc.finalBlocks.push(textBlock(''));renderBlocks('finalBlocks',doc.finalBlocks);$('#finalBlocks .note-block:last-child .editor').focus();scheduleSave()};
  const panes={notes:'notesPane',materials:'materialsPane',final:'finalPane'};
  $$('[data-view]').forEach(button=>{button.id='tab-'+button.dataset.view;button.setAttribute('role','tab');button.setAttribute('aria-controls',panes[button.dataset.view]);const pane=$('#'+panes[button.dataset.view]);pane.setAttribute('role','tabpanel');pane.setAttribute('aria-labelledby',button.id)});
  $('.view-tabs').setAttribute('aria-label',UI.literal('Представление конспекта'));
  $('.material-tabs').setAttribute('role','tablist');$('.material-tabs').setAttribute('aria-label',UI.literal('Материалы лекции'));
  $$('[data-material]').forEach(button=>{button.setAttribute('role','tab');button.setAttribute('aria-controls','materialContent')});
  $('#materialContent').setAttribute('role','tabpanel');$('#materialContent').setAttribute('aria-label',t('lectureMaterials'));
  for(const selector of ['.view-tabs','.material-tabs'])$(selector).addEventListener('keydown',event=>{
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
    const tabs=[...event.currentTarget.querySelectorAll('[role="tab"]')],i=tabs.indexOf(document.activeElement);if(i<0)return;
    event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
    tabs[next].click();tabs[next].focus();
  });
  $('#closeNavigation').onclick=()=>closeNotebookNavigation();$('#navigationBackdrop').onclick=()=>closeNotebookNavigation();
  $('#toggleNav').onclick=()=>{
    if(innerWidth<=1000){
      if($('#app').classList.contains('nav-open'))return closeNotebookNavigation();
      $('#app').classList.remove('nav-collapsed');$('#app').classList.add('nav-open');$('#navigationBackdrop').hidden=false;$('#mainContent').inert=true;
      $('#toggleNav').setAttribute('aria-expanded','true');$('#closeNavigation').focus();
    }else{$('#app').classList.toggle('nav-collapsed');localStorage.setItem('lectra-nav-collapsed',String($('#app').classList.contains('nav-collapsed')));$('#toggleNav').setAttribute('aria-expanded',String(!$('#app').classList.contains('nav-collapsed')))}
    resizeTitle();height();
  };
  $('#sidebar').addEventListener('keydown',event=>{
    if(!$('#app').classList.contains('nav-open'))return;
    if(event.key==='Escape'){event.preventDefault();closeNotebookNavigation()}
    if(event.key==='Tab'){
      const items=[...$('#sidebar').querySelectorAll('button,input:not([hidden])')].filter(el=>el.getClientRects().length),first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
  });
  if(localStorage.getItem('lectra-nav-collapsed')==='true'&&innerWidth>1000)$('#app').classList.add('nav-collapsed');
  closeNotebookNavigation(false);
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){$('#downloads').open=false;$('.selection-popover')?.remove()}
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='s'){event.preventDefault();saveNow().catch(()=>{})}
  });
  document.addEventListener('click',event=>{if(!$('#downloads').contains(event.target))$('#downloads').open=false});
  let splitPointer=null;
  const divider=$('#panelDivider'),workspace=$('#workspace');
  const resizePanel=value=>{value=Math.max(35,Math.min(65,value));workspace.style.setProperty('--split-size',value+'%');divider.setAttribute('aria-valuenow',String(Math.round(value)));localStorage.setItem('lectra-split-size',String(value))};
  resizePanel(Number(localStorage.getItem('lectra-split-size'))||50);
  divider.onpointerdown=event=>{event.preventDefault();splitPointer=event.pointerId;divider.setPointerCapture(splitPointer)};
  divider.onpointermove=event=>{if(event.pointerId!==splitPointer)return;const box=workspace.getBoundingClientRect();resizePanel((event.clientX-box.left)/box.width*100)};
  divider.onpointerup=divider.onpointercancel=()=>{splitPointer=null};
  divider.onkeydown=event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const value=Number(divider.getAttribute('aria-valuenow'));resizePanel(event.key==='Home'?35:event.key==='End'?65:value+(event.key==='ArrowRight'?2:-2))};
  window.addEventListener('resize',()=>{resizeTitle();if(innerWidth>1000)closeNotebookNavigation(false);if($('#drawingDialog').open)positionNotebookDialog()});
  window.visualViewport?.addEventListener('resize',()=>{if($('#drawingDialog').open)positionNotebookDialog()});
}
