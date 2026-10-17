'use strict';
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const translations={
ru:{newLecture:'Новая лекция',searchLectures:'Найти лекцию',definitions:'Определения',subjects:'Предметы',newFolder:'Добавить предмет',lectures:'Лекции',localOnly:'Сохранение на этом устройстве. Очистка данных браузера удалит записи.',backup:'Резервная копия',restore:'Восстановить',workspace:'Учебный блокнот',interfaceLanguage:'Язык интерфейса',download:'Скачать',subject:'Предмет',originalLanguage:'Язык лектора',materialsLanguage:'Язык материалов',start:'Начать запись',uploadAudio:'Загрузить аудио',pause:'Пауза',resume:'Продолжить',finish:'Завершить',mark:'Отметить момент',confused:'Не понял',analyze:'Создать материалы',recordHint:'Можно писать во время записи. Для нескольких часов надёжнее загрузить файл диктофона.',myNotes:'Мои заметки',lectureMaterials:'Материалы лекции',finalNotes:'Итоговый конспект',sideBySide:'Открыть рядом',bullets:'Маркированный список',checklist:'Чек-лист',highlight:'Выделить маркером',link:'Ссылка',quote:'Цитата',image:'Изображение',undo:'Отменить',redo:'Повторить',addDrawing:'Добавить рисунок',addText:'Добавить текст',summary:'Конспект',transcript:'Текст и перевод',quiz:'Тест',buildFinal:'Собрать итоговый конспект',mergeHint:'AI создаёт отдельный черновик. Твои записи и рисунки сохраняются; вопросы не считаются фактами.',privacy:'Запись и AI-анализ — с разрешения участников. При анализе аудио отправляется в Gemini.',drawing:'Схема и рукописные заметки',done:'Готово',pen:'Ручка',marker:'Маркер',eraser:'Ластик',move:'Перемещать',clear:'Очистить',drawingHint:'В режиме «Перемещать» перетаскивай выделенный штрих. Мышь, палец и стилус; универсальная защита от ладони не гарантируется.',navigation:'Навигация',saved:'Сохранено на этом устройстве',saving:'Сохранение…',saveError:'Не удалось сохранить. Сделай резервную копию.',noSubject:'Без предмета',auto:'Определить автоматически',russian:'Русский',english:'Английский',chinese:'Китайский',emptyNotes:'Запиши мысли, вопрос или начни конспект…',emptyMaterials:'Материалы появятся после обработки аудио. Пока можно писать заметки и рисовать.',emptyFinal:'Создай итоговый черновик или добавь выбранные AI-фрагменты в свои заметки.',keyReady:'Ключ AI сохранён',keyMissing:'Для анализа нужен ключ Gemini в Streamlit Secrets.',recording:'Идёт запись',paused:'Запись на паузе',micDenied:'Нет доступа к микрофону. Разреши его для сайта в настройках браузера или загрузи аудио.',micUnsupported:'Браузер не поддерживает запись. Используй загрузку аудио.',recordError:'Запись прервалась. Доступное аудио сохранится, если браузер смог его получить.',recovered:'Восстановлено доступное аудио прерванной записи. Проверь его перед анализом.',busy:'Идёт обработка. Этапы отображаются под документом; заметки можно редактировать.',noAudio:'Сначала запиши или загрузи аудио.',add:'Добавить в конспект',sourceAI:'Источник: AI-конспект',sourceTranscript:'Источник: расшифровка',sourceStudent:'Личная заметка',insertWhere:'Куда вставить?',append:'В конец',atCursor:'В выбранный текстовый блок',editDrawing:'Редактировать рисунок',remove:'Удалить блок',addLink:'Адрес ссылки (https://…)',invalidLink:'Нужна ссылка с https:// или http://.',folderName:'Название предмета',noteQuestion:'Что было непонятно? Вопрос необязателен.',unclear:'Неясные места в записи',searchText:'Найти в тексте',original:'Оригинал',translation:'Перевод',chunk:'Часть',timeHint:'Время соответствует началу пятиминутной части, а не каждой фразе.',reading:'Что почитать',watching:'Что посмотреть',nextTopics:'Изучить дальше',searchOnly:'Ссылки ведут на поиск; отдельные источники не проверены.',check:'Проверить',next:'Следующий вопрос',tryAgain:'Пройти снова',correct:'Верно',incorrect:'Пока неверно',chooseAnswer:'Выбери ответ.',score:'Результат',preview:'Предварительный вариант',accept:'Сохранить как итоговый',discard:'Отменить',replaceFinal:'Заменить итоговый конспект? Предыдущий вариант можно будет вернуть.',restoreFinal:'Вернуть предыдущий вариант',draftAI:'Предложение AI — проверь перед сохранением',noDrawingAI:'Рисунки сохранены как редактируемые блоки; AI не анализирует их содержание.',personalExport:'Заметки и рисунки (JSON)',lectureExport:'Лекция и материалы (JSON)',originalExport:'Оригинальный текст',translatedExport:'Перевод',pptx:'Презентация PowerPoint',audioExport:'Исходное аудио',notesHtml:'Конспект для печати (HTML)',unsupportedAudio:'Поддерживаются WAV, MP3, M4A, AAC, OGG, FLAC, WebM и MP4.',fileLarge:'Для передачи из блокнота максимум 80 МБ. Сожми запись в MP3/M4A или раздели файл.',imageLarge:'Изображение должно быть не больше 5 МБ.',importError:'Не удалось прочитать резервную копию.',importDone:'Резервная копия восстановлена.',quota:'Достигнут лимит Gemini. Повтори позже; готовые части сохраняются в серверной сессии.',invalidKey:'Gemini не принимает ключ. Проверь Settings → Secrets.',access:'Gemini отказал в доступе. Проверь ключ и доступ к модели.',modelMissing:'Модель недоступна этому проекту Gemini.',badResponse:'AI вернул неполный или неправильный ответ. Повтори обработку.',serverError:'Gemini временно недоступен. Повтори позже.',genericError:'Не удалось завершить обработку. Пришли диагностическую строку.',partial:'Обработана только часть лекции. Можно сохранить готовый текст.',audioReplace:'Заменить аудио? Личные заметки сохранятся, AI-материалы потребуется создать снова.',leaveRecording:'Сначала заверши запись.',aiPending:'Нет подключения к серверу. Открой приложение в Streamlit.',deleteConfirm:'Удалить этот блок?',questions:'Отмеченные вопросы',explainQuestion:'Найти соответствующую часть лекции',noQuestionTiming:'Доступна только пятиминутная привязка; точное объяснение отмеченного момента пока не создаётся.',emptyHistory:'Здесь появятся твои лекции.',savingAudio:'Сохраняю аудио…',connectionError:'Сервер не ответил. Запись и заметки остаются на устройстве. Можно повторить запрос.',color:'Цвет линии',width:'Толщина линии',insertImage:'Вставить изображение',recordLimit:'Достигнут лимит записи — сохраняю аудио.',keepUnsaved:'Есть несохранённые изменения. Сохрани резервную копию перед уходом.'},
en:{newLecture:'New lecture',searchLectures:'Find a lecture',definitions:'Definitions',subjects:'Subjects',newFolder:'Add subject',lectures:'Lectures',localOnly:'Stored on this device. Clearing browser data removes your records.',backup:'Backup',restore:'Restore',workspace:'Study notebook',interfaceLanguage:'Interface language',download:'Download',subject:'Subject',originalLanguage:'Lecture language',materialsLanguage:'Study language',start:'Start recording',uploadAudio:'Upload audio',pause:'Pause',resume:'Resume',finish:'Finish',mark:'Mark moment',confused:"I didn’t understand",analyze:'Create materials',recordHint:'Write while recording. For several hours, upload a file from a separate recorder.',myNotes:'My notes',lectureMaterials:'Lecture materials',finalNotes:'Combined notes',sideBySide:'Open side by side',bullets:'Bullet list',checklist:'Checklist',highlight:'Highlight',link:'Link',quote:'Quote',image:'Image',undo:'Undo',redo:'Redo',addDrawing:'Add drawing',addText:'Add text',summary:'Summary',transcript:'Text and translation',quiz:'Quiz',buildFinal:'Combine notes',mergeHint:'AI creates a separate draft. Your notes and drawings stay intact; questions are not treated as facts.',privacy:'Record and analyze with participants’ permission. Audio is sent to Gemini for analysis.',drawing:'Drawing and handwriting',done:'Done',pen:'Pen',marker:'Highlighter',eraser:'Eraser',move:'Move',clear:'Clear',drawingHint:'In Move mode, drag a selected stroke. Mouse, touch and stylus supported; universal palm rejection is not guaranteed.',navigation:'Navigation',saved:'Saved on this device',saving:'Saving…',saveError:'Could not save. Export a backup.',noSubject:'No subject',auto:'Detect automatically',russian:'Russian',english:'English',chinese:'Chinese',emptyNotes:'Write an idea, question or start your notes…',emptyMaterials:'Materials appear after audio analysis. You can write and draw now.',emptyFinal:'Create a combined draft or add selected AI blocks to your notes.',keyReady:'AI key saved',keyMissing:'Analysis needs a Gemini key in Streamlit Secrets.',recording:'Recording',paused:'Recording paused',micDenied:'Microphone access denied. Allow it in browser settings or upload audio.',micUnsupported:'This browser cannot record audio. Upload a file instead.',recordError:'Recording interrupted. Available audio will be kept if the browser can provide it.',recovered:'Available audio recovered from an interrupted recording. Check it before analysis.',busy:'Processing. Actual stages appear below the document; you can keep editing notes.',noAudio:'Record or upload audio first.',add:'Add to notes',sourceAI:'Source: AI summary',sourceTranscript:'Source: transcript',sourceStudent:'Personal note',insertWhere:'Insert where?',append:'At the end',atCursor:'In the selected text block',editDrawing:'Edit drawing',remove:'Remove block',addLink:'Link address (https://…)',invalidLink:'Use an https:// or http:// link.',folderName:'Subject name',noteQuestion:'What was unclear? A question is optional.',unclear:'Unclear passages',searchText:'Search transcript',original:'Original',translation:'Translation',chunk:'Part',timeHint:'Times mark five-minute chunk starts, not individual sentences.',reading:'Read more',watching:'Watch more',nextTopics:'Explore further',searchOnly:'These links open searches; individual sources have not been verified.',check:'Check answer',next:'Next question',tryAgain:'Try again',correct:'Correct',incorrect:'Not quite',chooseAnswer:'Choose an answer.',score:'Score',preview:'Preview',accept:'Save as combined notes',discard:'Discard',replaceFinal:'Replace combined notes? You can restore the previous version.',restoreFinal:'Restore previous version',draftAI:'AI draft — review before saving',noDrawingAI:'Drawings remain editable blocks; AI does not interpret them.',personalExport:'Notes and drawings (JSON)',lectureExport:'Lecture and materials (JSON)',originalExport:'Original transcript',translatedExport:'Translation',pptx:'PowerPoint presentation',audioExport:'Original audio',notesHtml:'Printable notes (HTML)',unsupportedAudio:'Supported: WAV, MP3, M4A, AAC, OGG, FLAC, WebM and MP4.',fileLarge:'Notebook transfer is limited to 80 MB. Compress to MP3/M4A or split the file.',imageLarge:'Images must be under 5 MB.',importError:'Could not read the backup.',importDone:'Backup restored.',quota:'Gemini limit reached. Retry later; completed parts remain in the server session.',invalidKey:'Gemini rejected the key. Check Settings → Secrets.',access:'Gemini denied access. Check key and model permissions.',modelMissing:'This Gemini project cannot access the model.',badResponse:'AI returned an incomplete or invalid result. Retry.',serverError:'Gemini is temporarily unavailable. Retry later.',genericError:'Processing failed. Share the diagnostic line.',partial:'Only part of the lecture is processed. You can save the available text.',audioReplace:'Replace audio? Personal notes stay intact; AI materials will need regenerating.',leaveRecording:'Finish recording first.',aiPending:'No server connection. Open the app in Streamlit.',deleteConfirm:'Remove this block?',questions:'Marked questions',explainQuestion:'Find the matching lecture part',noQuestionTiming:'Only five-minute alignment is available; exact explanations for marked moments are not yet generated.',emptyHistory:'Your lectures will appear here.',savingAudio:'Saving audio…',connectionError:'Server did not respond. Audio and notes remain on this device; you can retry.',color:'Ink color',width:'Line width',insertImage:'Insert image',recordLimit:'Recording limit reached — saving audio.',keepUnsaved:'Unsaved changes. Export a backup before leaving.'},
zh:{newLecture:'新建讲座',searchLectures:'搜索讲座',definitions:'定义',subjects:'科目',newFolder:'添加科目',lectures:'讲座',localOnly:'保存在此设备。清除浏览器数据将删除记录。',backup:'备份',restore:'恢复',workspace:'学习笔记本',interfaceLanguage:'界面语言',download:'下载',subject:'科目',originalLanguage:'讲座语言',materialsLanguage:'学习材料语言',start:'开始录音',uploadAudio:'上传音频',pause:'暂停',resume:'继续',finish:'结束',mark:'标记时刻',confused:'我没听懂',analyze:'生成学习材料',recordHint:'录音时可以写笔记。数小时的讲座建议用独立录音工具后上传。',myNotes:'我的笔记',lectureMaterials:'讲座材料',finalNotes:'综合笔记',sideBySide:'并排打开',bullets:'项目列表',checklist:'待办列表',highlight:'高亮',link:'链接',quote:'引用',image:'图片',undo:'撤销',redo:'重做',addDrawing:'添加绘图',addText:'添加文字',summary:'摘要',transcript:'原文与翻译',quiz:'测验',buildFinal:'整理综合笔记',mergeHint:'AI生成独立草稿。个人笔记和绘图保持不变，问题不会被当成事实。',privacy:'请经参与者同意后录音。分析时音频会发送到Gemini。',drawing:'绘图与手写',done:'完成',pen:'画笔',marker:'荧光笔',eraser:'橡皮擦',move:'移动',clear:'清空',drawingHint:'移动模式可拖动选中的笔画。支持鼠标、触摸与手写笔，不保证所有设备都能防误触。',navigation:'导航',saved:'已保存在此设备',saving:'正在保存…',saveError:'保存失败，请导出备份。',noSubject:'未分类',auto:'自动识别',russian:'俄语',english:'英语',chinese:'中文',emptyNotes:'写下想法、问题或开始记笔记…',emptyMaterials:'分析音频后将显示材料。现在可以写笔记和绘图。',emptyFinal:'创建综合草稿或将AI片段添加到笔记。',keyReady:'已保存AI密钥',keyMissing:'分析需要Streamlit Secrets中的Gemini密钥。',recording:'正在录音',paused:'录音已暂停',micDenied:'无法访问麦克风。请在浏览器设置中允许访问，或上传音频。',micUnsupported:'浏览器不支持录音，请上传音频。',recordError:'录音中断。若浏览器可提供音频，将保存可用部分。',recovered:'已恢复中断录音的可用音频，请先检查。',busy:'正在处理。实际阶段显示在文档下方，仍可编辑笔记。',noAudio:'请先录音或上传音频。',add:'添加到笔记',sourceAI:'来源：AI摘要',sourceTranscript:'来源：讲座原文',sourceStudent:'个人笔记',insertWhere:'插入位置',append:'末尾',atCursor:'选中的文字块',editDrawing:'编辑绘图',remove:'删除块',addLink:'链接地址（https://…）',invalidLink:'请使用https://或http://链接。',folderName:'科目名称',noteQuestion:'哪里没听懂？可不填写问题。',unclear:'不清楚的片段',searchText:'搜索原文',original:'原文',translation:'翻译',chunk:'片段',timeHint:'时间对应五分钟片段的起点，不是每句话的准确时间。',reading:'阅读更多',watching:'观看视频',nextTopics:'进一步学习',searchOnly:'链接打开搜索页面，具体来源尚未验证。',check:'检查答案',next:'下一题',tryAgain:'重新测试',correct:'正确',incorrect:'还不正确',chooseAnswer:'请选择答案。',score:'得分',preview:'预览',accept:'保存为综合笔记',discard:'取消',replaceFinal:'替换综合笔记？可恢复上一版本。',restoreFinal:'恢复上一版本',draftAI:'AI草稿，请先检查',noDrawingAI:'绘图仍可编辑，AI不解析绘图内容。',personalExport:'笔记与绘图（JSON）',lectureExport:'讲座与材料（JSON）',originalExport:'原文',translatedExport:'翻译',pptx:'PowerPoint演示文稿',audioExport:'原始音频',notesHtml:'打印笔记（HTML）',unsupportedAudio:'支持WAV、MP3、M4A、AAC、OGG、FLAC、WebM和MP4。',fileLarge:'笔记本传输上限为80 MB，请压缩成MP3/M4A或拆分文件。',imageLarge:'图片不能超过5 MB。',importError:'无法读取备份。',importDone:'备份已恢复。',quota:'Gemini额度已用尽。请稍后重试，完成的片段保留在服务器会话中。',invalidKey:'Gemini拒绝了密钥，请检查Settings → Secrets。',access:'Gemini拒绝访问，请检查密钥和模型权限。',modelMissing:'该项目无法访问所选模型。',badResponse:'AI返回不完整或格式不正确，请重试。',serverError:'Gemini暂时不可用，请稍后重试。',genericError:'处理失败，请提供诊断信息。',partial:'仅处理了部分讲座，可保存已有文字。',audioReplace:'替换音频？个人笔记保留，AI材料需重新生成。',leaveRecording:'请先结束录音。',aiPending:'未连接服务器，请在Streamlit中打开应用。',deleteConfirm:'删除此块？',questions:'标记的问题',explainQuestion:'找到对应的讲座片段',noQuestionTiming:'目前只能定位五分钟片段，尚未生成精确时刻的解释。',emptyHistory:'你的讲座将显示在这里。',savingAudio:'正在保存音频…',connectionError:'服务器未响应。音频和笔记仍保存在此设备，可重试。',color:'笔画颜色',width:'线宽',insertImage:'插入图片',recordLimit:'已达录音上限，正在保存。',keepUnsaved:'还有未保存的内容，请先导出备份。'}
};
const icons={menu:'M4 6h16M4 12h16M4 18h16',search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',mic:'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8',upload:'M12 16V3M7 8l5-5 5 5M4 16v5h16v-5',list:'M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1',check:'M4 12l5 5L20 6',highlight:'M4 20h16M7 16l-2-2L15 4l4 4-10 10Z',link:'M10 14l4-4M8 16l-2 2a4 4 0 0 1-6-6l4-4M16 8l2-2a4 4 0 0 1 6 6l-4 4',quote:'M4 5h6v7H6l-2 5M14 5h6v7h-4l-2 5',image:'M3 3h18v18H3ZM3 17l6-6 4 4 3-3 5 5M7 7h1',undo:'M9 5L4 10l5 5M4 10h9a7 7 0 0 1 7 7',redo:'M15 5l5 5-5 5M20 10h-9a7 7 0 0 0-7 7',pen:'M3 21l4-1L21 6l-4-4L3 16v5M14 5l4 4'};
let lang=localStorage.getItem('lectra-ui')||'ru';if(!translations[lang])lang='ru';
const t=key=>translations[lang][key]||translations.ru[key]||key;
const uid=()=>crypto.randomUUID(), clone=x=>structuredClone(x), esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clock=sec=>{sec=Math.max(0,Math.floor(sec));return(sec>=3600?String(Math.floor(sec/3600)).padStart(2,'0')+':':'')+String(Math.floor(sec%3600/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0')};
const svg=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[name]||icons.pen}"/></svg>`;
function localize(root=document){document.documentElement.lang=lang;root.querySelectorAll("[data-ui-label]").forEach(el=>el.setAttribute("aria-label",UI.literal(el.dataset.uiLabel)));root.querySelectorAll("[data-ui]").forEach(el=>el.textContent=UI.literal(el.dataset.ui));$("#panelDivider").setAttribute("aria-label",UI.literal("Ширина панелей"));root.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));root.querySelectorAll('[data-placeholder]').forEach(el=>el.placeholder=t(el.dataset.placeholder));root.querySelectorAll('[data-label]').forEach(el=>{el.title=t(el.dataset.label);el.setAttribute('aria-label',t(el.dataset.label))});root.querySelectorAll('[data-icon]').forEach(el=>{if(!el.querySelector('svg'))el.insertAdjacentHTML('afterbegin',svg(el.dataset.icon))});$('#inkColor').setAttribute('aria-label',t('color'));$('#inkWidth').setAttribute('aria-label',t('width'));$('#uiLanguage').setAttribute('aria-label',t('interfaceLanguage'));$('#lectureTitle').setAttribute('aria-label',t('newLecture'));}
function notice(message,error=false){$('#notice').textContent=message;$('#notice').classList.toggle('error',error);$('#notice').hidden=!message;}
function signal(type,extra={}){window.parent.postMessage({isStreamlitMessage:true,type,...extra},'*')}
function height(){signal('streamlit:setFrameHeight',{height:Math.max(document.documentElement.scrollHeight,900)})}
let db,docs=[],folders=[],doc=null,view='notes',material='summary',split=false,activeEditor=null,editorRange=null,queue=Promise.resolve(),saveTimer,unsaved=false;
let bridge={has_key:false},pending=null,received=new Set(),audioURL=null,playingKey=null,recorder=null,stream=null,audioContext=null,analyser=null,recordElapsed=0,recordSince=0,recordParts=[],recordId=null,recordSize=0,saveStatus='saved',editRevision=0,recordFrame=0,recordDoc=null,chunkQueue=Promise.resolve();
let drawingBlock=null,drawingList=null,drawingTool='pen',drawUndo=[],drawRedo=[],stroke=null,selectedStroke=-1,dragPoint=null;
function openDatabase(){return new Promise((resolve,reject)=>{const req=indexedDB.open('lectra-notebook',1);req.onupgradeneeded=()=>{const d=req.result;d.createObjectStore('documents',{keyPath:'id'});d.createObjectStore('settings');d.createObjectStore('assets');};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);})}
function read(store,key){return new Promise((resolve,reject)=>{const req=db.transaction(store).objectStore(store).get(key);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
function all(store){return new Promise((resolve,reject)=>{const req=db.transaction(store).objectStore(store).getAll();req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error)})}
function write(store,value,key){return new Promise((resolve,reject)=>{const tx=db.transaction(store,'readwrite');const s=tx.objectStore(store);key===undefined?s.put(value):s.put(value,key);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('aborted'));})}
function saveNow(){clearTimeout(saveTimer);if(!doc)return Promise.resolve();window.Product?.beforeSave();const revision=editRevision;const snapshot=clone(doc);snapshot.updated=Date.now();doc.updated=snapshot.updated;unsaved=true;saveStatus='saving';updateSaved();queue=queue.catch(()=>{}).then(()=>write('documents',snapshot)).then(()=>{const i=docs.findIndex(d=>d.id===snapshot.id);if(i<0)docs.push(snapshot);else docs[i]=snapshot;if(revision===editRevision){unsaved=false;saveStatus='saved';}updateSaved();renderNav();}).catch(error=>{unsaved=true;saveStatus='saveError';updateSaved();notice(t('saveError'),true);throw error;});return queue;}
function scheduleSave(){editRevision++;unsaved=true;saveStatus='saving';updateSaved();clearTimeout(saveTimer);saveTimer=setTimeout(()=>saveNow().catch(()=>{}),450)}
function updateSaved(){$('#saveState').textContent=t(saveStatus);$('#saveState').dataset.state=saveStatus}
function makeDoc(){return{id:uid(),title:'',subject:'',original:'Auto-detect',target:'Russian',blocks:[{id:uid(),type:'text',html:''}],finalBlocks:[],previousFinal:null,draft:null,marks:[],audioKey:null,audioName:'',audioType:'',pack:null,created:Date.now(),updated:Date.now(),recordingParts:[]}}
function languages(){const opts=[['Russian','russian'],['English','english'],['Chinese','chinese']];$('#originalLanguage').innerHTML=`<option value="Auto-detect">${t('auto')}</option>`+opts.map(([v,k])=>`<option value="${v}">${t(k)}</option>`).join('');$('#materialsLanguage').innerHTML=opts.map(([v,k])=>`<option value="${v}">${t(k)}</option>`).join('');$('#originalLanguage').value=doc.original;$('#materialsLanguage').value=doc.target;$('#subject').innerHTML=`<option value="">${t('noSubject')}</option>`+folders.map(f=>`<option value="${esc(f.id)}">${esc(f.name)}</option>`).join('');$('#subject').value=doc.subject;}
function renderNav(){const query=$('#searchLectures').value.toLowerCase();const folderFilter=$('#folders').dataset.filter||'';$('#folders').innerHTML=folders.map(f=>`<button class="folder ${folderFilter===f.id?'active':''}" data-folder="${f.id}">${esc(f.name)}</button>`).join('');$('#folders').querySelectorAll('button').forEach(b=>b.onclick=()=>{$('#folders').dataset.filter=folderFilter===b.dataset.folder?'':b.dataset.folder;renderNav()});const list=docs.filter(d=>(!folderFilter||d.subject===folderFilter)&&(!query||(d.title||t('newLecture')).toLowerCase().includes(query))).sort((a,b)=>b.updated-a.updated);$('#lectureList').innerHTML=list.length?list.filter(d=>!d.deletedAt&&!d.archived).slice(0,12).map(d=>`<button class="lecture-link ${doc?.id===d.id?'active':''}" data-id="${d.id}" title="${esc(d.title||t('newLecture'))}">${esc(d.title||t('newLecture'))}</button>`).join(''):`<p class="meta">${t('emptyHistory')}</p>`;$('#lectureList').querySelectorAll('button').forEach(b=>b.onclick=()=>switchDoc(b.dataset.id));}
async function switchDoc(id){if(volatileRecording&&!confirm(t('discardAudioWarning')))return;if(audioBusy||recordingSession)return notice(t('audioBusy'));if(recorder?.state!=='inactive'&&recorder)return notice(t('leaveRecording'),true);try{await saveNow()}catch{return}doc=clone(docs.find(d=>d.id===id));localStorage.setItem('lectra-current',doc.id);view='notes';split=false;closeNotebookNavigation(false);renderDoc();}
function renderDoc(){if(!doc)return;$('#lectureTitle').value=doc.title;resizeTitle();activeEditor=null;editorRange=null;languages();renderNav();renderBlocks('noteBlocks',doc.blocks);renderBlocks('finalBlocks',doc.finalBlocks);renderMaterials();renderDraft();renderRestoreFinal();renderDownloads();setView(view);refreshAudio();updateSaved();height();window.Product?.syncNotebook();}
function sanitize(html){
  const temp=document.createElement('div');temp.innerHTML=html;
  temp.querySelectorAll('script,style,iframe,object,embed,form,meta,link,svg,math').forEach(n=>n.remove());
  temp.querySelectorAll('*').forEach(n=>{
    // Keep the editor's marker, not arbitrary pasted layout or executable attributes.
    const marker=n.style.backgroundColor,checklist=n.tagName==='LABEL'&&n.classList.contains('checkbox-item');
    for(const attr of [...n.attributes]){
      if(attr.name.startsWith('on')||['style','srcdoc','id','class','contenteditable','autofocus'].includes(attr.name))n.removeAttribute(attr.name);
      if(['href','src'].includes(attr.name)&&!(attr.name==='href'&&attr.value==='#'&&n.hasAttribute('data-time'))&&!/^(https?:|data:image\/(png|jpeg|gif|webp);base64,)/i.test(attr.value))n.removeAttribute(attr.name);
    }
    if(marker&&/^(#[\da-f]{3,8}|rgba?\([\d\s.,%]+\))$/i.test(marker))n.style.backgroundColor=marker;
    if(checklist)n.className='checkbox-item';
    if(n.tagName==='INPUT'){
      if(n.type!=='checkbox'){n.remove();return}
      n.setAttribute('aria-label',t('checklist'));
    }
    if(n.tagName==='A')n.setAttribute('rel','noopener noreferrer');
  });
  return temp.innerHTML;
}
function renderBlocks(containerId,blocks){
  const container=$('#'+containerId);container.innerHTML='';
  for(const block of blocks){
    const wrap=document.createElement('div');wrap.className='note-block';wrap.dataset.id=block.id;
    if(block.type==='attachment'){NotebookPaper.attachment(block,wrap);
    }else if(block.type==='drawing'){
      const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=650;canvas.className='drawing-preview';
      canvas.setAttribute('role','img');canvas.setAttribute('aria-label',t('drawing'));
      drawStrokes(canvas,block.strokes||[]);wrap.append(canvas);
      const edit=document.createElement('button');edit.className='quiet';edit.textContent=t('editDrawing');
      edit.onclick=()=>openDrawing(block,blocks);canvas.onclick=edit.onclick;wrap.append(edit);
    }else{
      const editor=document.createElement('div');editor.className='editor';editor.contentEditable='true';
      editor.setAttribute('role','textbox');editor.setAttribute('aria-multiline','true');
      editor.setAttribute('aria-label',t(containerId==='noteBlocks'?'myNotes':'finalNotes'));
      editor.dataset.placeholder=t('emptyNotes');editor.innerHTML=sanitize(block.html||'');
      editor.onfocus=()=>{if(activeEditor!==editor)editorRange=null;activeEditor=editor};
      editor.oninput=()=>{block.html=editor.innerHTML;scheduleSave()};
      editor.onpaste=event=>{event.preventDefault();document.execCommand('insertHTML',false,sanitize(event.clipboardData.getData('text/html')||esc(event.clipboardData.getData('text/plain')).replace(/\n/g,'<br>')));block.html=editor.innerHTML;scheduleSave()};
      editor.onclick=event=>{
        const a=event.target.closest('[data-time]');if(a){event.preventDefault();seek(Number(a.dataset.time),a.dataset.audioKey)}
        if(event.target.type==='checkbox'){event.target.toggleAttribute('checked',event.target.checked);block.html=editor.innerHTML;scheduleSave()}
      };
      editor.onkeydown=event=>{
        if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#insertLink').click()}
      };
      wrap.append(editor);
    }
    if(block.source){const source=document.createElement('small');source.className='source-label';source.textContent=t(block.source.kind==='transcript'?'sourceTranscript':block.source.kind==='ai'?'sourceAI':block.source.kind==='document'?'sourceDocument':'sourceStudent')+(block.source.time!==undefined?' · '+clock(block.source.time):'');wrap.append(source)}
    const actions=document.createElement('div');actions.className='block-actions';
    const remove=document.createElement('button');remove.className='quiet';remove.textContent=t('remove');
    remove.onclick=()=>{if(window.Product?.initialized)return Product.trashBlock(block,blocks,containerId);if(!confirm(t('deleteConfirm')))return;blocks.splice(blocks.indexOf(block),1);renderBlocks(containerId,blocks);scheduleSave()};
    actions.append(remove);wrap.append(actions);container.append(wrap);
  }
  if(!blocks.length){const empty=document.createElement('p');empty.className='empty';empty.textContent=t(containerId==='finalBlocks'?'emptyFinal':'emptyNotes');container.append(empty)}
  window.NotebookPaper?.refresh();height();
}
function setView(next,restoreScroll=false){
  const scrollWindow=notebookScrollHost();
  doc.scrollPositions=doc.scrollPositions||{};if(restoreScroll)doc.scrollPositions[view]=scrollWindow.scrollTop??scrollWindow.scrollY;
  view=next;
  if(next==='final')split=false;
  $('#notesPane').hidden=next!=='notes'&&!split;$('#materialsPane').hidden=next!=='materials'&&!split;$('#finalPane').hidden=next!=='final';
  $('#workspace').classList.toggle('split',split);$('#panelDivider').hidden=!split;
  $('#splitView').setAttribute('aria-pressed',String(split));
  $$('[data-view]').forEach(b=>{const selected=b.dataset.view===next;b.classList.toggle('active',selected);b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1});
  $('.selection-popover')?.remove();height();
  if(restoreScroll)requestAnimationFrame(()=>scrollWindow.scrollTo({top:doc.scrollPositions[next]||0,behavior:'instant'}));
}
function textBlock(html,source=null){return{id:uid(),type:'text',html:sanitize(html),source}}
function insertBlock(html,source){
  const target=doc.blocks,place=$('#insertPosition')?.value||'end',block=textBlock(html,source);
  const i=target.findIndex(x=>x.id===place);target.splice(i<0?target.length:i+1,0,block);
  renderBlocks('noteBlocks',target);scheduleSave();
  // Refresh insertion positions without resetting search or the material the student is reading.
  const current=$('#insertPosition');if(current){const wrapper=document.createElement('div');wrapper.innerHTML=insertionSelector();current.replaceWith(wrapper.querySelector('select'));$('#insertPosition').value=place;}
  notice(t('addedToNotes'));
}
function insertionSelector(){return `<label class="meta insertion-control">${t('insertWhere')}<select id="insertPosition"><option value="end">${t('append')}</option>${doc.blocks.map((b,i)=>`<option value="${esc(b.id)}">${t('afterBlock')} ${i+1} · ${esc(b.type==='drawing'?t('drawing'):htmlText(b.html).slice(0,45)||t('myNotes'))}</option>`).join('')}</select></label>`;}
function htmlText(html){const d=document.createElement('div');d.innerHTML=html;return d.innerText||d.textContent||''}
function renderMaterials(){const box=$('#materialContent');$$('[data-material]').forEach(b=>{b.classList.toggle('active',b.dataset.material===material);b.setAttribute('aria-selected',String(b.dataset.material===material));b.tabIndex=b.dataset.material===material?0:-1});const pack=doc.pack;if(!pack){box.innerHTML=`<div class="empty"><strong>${t('materialsEmptyTitle')}</strong><p>${t('emptyMaterials')}</p></div>`;return}if(material==='summary'){box.innerHTML=insertionSelector()+`<h2>${esc(pack.title)}</h2><div class="material-block"><p>${esc(pack.summary)}</p><button class="quiet" data-add="summary">${t('add')}</button></div>`+(pack.notes||[]).map((n,i)=>`<div class="material-block"><p>${esc(n)}</p><button class="quiet" data-add="note" data-index="${i}">${t('add')}</button></div>`).join('')+`<h3>${t('definitions')}</h3>`+(pack.terms||[]).map((term,i)=>`<div class="material-block"><strong>${esc(term.term)}</strong><p>${esc(term.definition)}</p><button class="quiet" data-add="term" data-index="${i}">${t('add')}</button></div>`).join('');const unclear=(pack.chunks||[]).flatMap(c=>c.unclear||[]);if(unclear.length)box.innerHTML+=`<h3>${t('unclear')}</h3><p>${unclear.map(esc).join('<br>')}</p>`;box.innerHTML+=`<h3>${t('nextTopics')}</h3><p class="meta">${t('searchOnly')}</p>`+(pack.recommendations||[]).map(r=>`<div class="material-block"><strong>${esc(r.topic)}</strong><p>${esc(r.reason)}</p><a href="https://www.google.com/search?q=${encodeURIComponent(r.reading_query)}" target="_blank" rel="noopener">${t('reading')}</a> · <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(r.video_query)}" target="_blank" rel="noopener">${t('watching')}</a></div>`).join('');box.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{let html;if(b.dataset.add==='summary')html='<p>'+esc(pack.summary)+'</p>';if(b.dataset.add==='note')html='<p>'+esc(pack.notes[Number(b.dataset.index)])+'</p>';if(b.dataset.add==='term'){const term=pack.terms[Number(b.dataset.index)];html='<h2>'+esc(term.term)+'</h2><p>'+esc(term.definition)+'</p>'}insertBlock(html,{kind:'ai',packId:pack.id});});}
else if(material==='transcript'){box.innerHTML=insertionSelector()+`<p class="meta">${t('timeHint')}</p><input id="transcriptSearch" placeholder="${t('searchText')}" aria-label="${t('searchText')}"><div id="transcriptRows"></div>`;const renderRows=()=>{const query=$('#transcriptSearch').value.toLowerCase();$('#transcriptRows').innerHTML=(pack.chunks||[]).map((chunk,i)=>chunk.paragraphs.map((p,j)=>({p,i,j}))).flat().filter(({p})=>!query||(p.original+' '+p.translation).toLowerCase().includes(query)).map(({p,i,j})=>`<div class="transcript-pair"><div><button class="time-link" data-seek="${i*300}">${clock(i*300)}</button><span class="meta"> ${t('original')}</span><p>${esc(p.original)}</p><button class="quiet" data-quote="${i}:${j}:original">${t('add')}</button></div><div><span class="meta">${t('translation')}</span><p>${esc(p.translation)}</p><button class="quiet" data-quote="${i}:${j}:translation">${t('add')}</button></div></div>`).join('');$('#transcriptRows').querySelectorAll('[data-seek]').forEach(b=>b.onclick=()=>seek(Number(b.dataset.seek)));$('#transcriptRows').querySelectorAll('[data-quote]').forEach(b=>b.onclick=()=>{const[i,j,field]=b.dataset.quote.split(':');const text=pack.chunks[Number(i)].paragraphs[Number(j)][field];insertBlock(`<blockquote>${esc(text)}</blockquote><a href="#" data-time="${Number(i)*300}" data-audio-key="${esc(doc.pack.audioKey||doc.audioKey||'')}">${clock(Number(i)*300)}</a>`,{kind:'transcript',time:Number(i)*300,audioKey:doc.pack.audioKey||doc.audioKey});});height()};$('#transcriptSearch').value=doc.transcriptQuery||'';$('#transcriptSearch').oninput=()=>{doc.transcriptQuery=$('#transcriptSearch').value;renderRows();scheduleSave()};renderRows();}
else renderQuiz();height();}
function renderQuiz(){const box=$('#materialContent'),quiz=doc.pack.quiz||[];doc.quizState=doc.quizState||{index:0,answers:[]};const state=doc.quizState;if(state.index>=quiz.length){const score=quiz.reduce((n,q,i)=>n+(state.answers[i]===q.answer?1:0),0);box.innerHTML=`<h2>${t('score')}: ${score} / ${quiz.length}</h2><button id="retryQuiz" class="primary">${t('tryAgain')}</button>`;$('#retryQuiz').onclick=()=>{doc.quizState={index:0,answers:[]};renderQuiz();scheduleSave()};return}const q=quiz[state.index],answered=state.answers[state.index]!==undefined;box.innerHTML=`<span class="meta">${state.index+1} / ${quiz.length}</span><h2>${esc(q.question)}</h2><div class="question-options">${q.options.map((o,i)=>`<label><input type="radio" name="question" value="${i}" ${answered?'disabled':''} ${state.answers[state.index]===i?'checked':''}>${esc(o)}</label>`).join('')}</div>`+(answered?`<div class="quiz-feedback"><strong>${t(state.answers[state.index]===q.answer?'correct':'incorrect')}</strong><p>${esc(q.options[q.answer])}</p><p>${esc(q.explanation)}</p></div><button id="nextQuestion" class="primary">${t('next')}</button>`:`<button id="checkQuestion" class="primary">${t('check')}</button>`);if(answered)$('#nextQuestion').onclick=()=>{state.index++;renderQuiz();scheduleSave()};else $('#checkQuestion').onclick=()=>{const value=$('input[name="question"]:checked');if(!value)return notice(t('chooseAnswer'));state.answers[state.index]=Number(value.value);renderQuiz();scheduleSave()};height();}
const AUDIO_LIMIT = 450 * 1024 * 1024;
const AUDIO_TYPES = {mp3:'audio/mpeg',m4a:'audio/mp4',mp4:'audio/mp4',aac:'audio/aac',wav:'audio/wav',ogg:'audio/ogg',oga:'audio/ogg',opus:'audio/ogg',flac:'audio/flac',webm:'audio/webm',weba:'audio/webm'};
Object.assign(translations.ru, {
  audioExport:'Скачать аудио',
  discardAudioWarning:'Аудио не сохранено на устройстве. Сначала скачай его. Перейти к другой лекции и потерять несохранённую запись?',
  uploadAudio:'Выбрать аудиофайл', browseFiles:'Не видно аудио? Открыть все файлы',
  pickerHint:'На телефоне выбери «Файлы» или «Обзор». Запись диктофона сначала сохрани в файлы устройства.',
  audioFormats:'MP3, M4A, WAV, AAC, OGG, OPUS, FLAC, WebM · до 450 МБ, до 4 часов',
  fileLarge:'Файл больше 450 МБ. Выбери сжатую запись или раздели её.',
  emptyAudio:'Файл пустой. Выбери другую запись.', invalidAudio:'Не удалось прочитать звук. Проверь запись или выбери MP3, M4A или WAV.',
  unsupportedAudio:'Выбери аудиофайл MP3, M4A, WAV, AAC, OGG, OPUS, FLAC или WebM.',
  savingAudio:'Сохраняю аудио на устройстве…', audioReady:'Аудио готово. Можно прослушать, скачать или создать материалы.',
  audioBusy:'Дождись завершения сохранения или передачи аудио.', uploadProgress:'Передано на сервер',
  uploadPreparing:'Подготавливаю передачу аудио…', uploadError:'Передача прервалась. Повтори: сохранённые части не отправятся заново.',
  uploadExpired:'Сессия загрузки завершилась. Повтори отправку аудио.', cancelUpload:'Отменить передачу',
  uploadCancelled:'Передача остановлена. Аудио осталось на устройстве; можно продолжить.',
  aiProcessing:'Аудио передано. AI распознаёт лекцию и готовит материалы. Этапы — под блокнотом.',
  audioMissing:'Запись не найдена в хранилище устройства. Выбери файл повторно.',
  audioSaveFailed:'Не удалось сохранить запись на устройстве. Скачай аудио сейчас — после закрытия страницы оно может быть потеряно.',
  previewUnsupported:'Браузер не смог воспроизвести этот формат. Можно скачать оригинал или отправить его на обработку.',
  shareAudio:'Сохранить / поделиться', recordLimit:'Достигнут предел записи: 4 часа или 450 МБ.',
  sourceChanged:'Полученный результат относится к предыдущей записи и не заменил текущий конспект.'
});
Object.assign(translations.en, {
  audioExport:'Download audio',
  discardAudioWarning:'Audio has not been saved locally. Download it first. Leave this lecture and discard the unsaved recording?',
  uploadAudio:'Choose audio file',browseFiles:'Audio missing? Browse all files',pickerHint:'On a phone, choose Files or Browse. Save voice memos to your device files first.',
  audioFormats:'MP3, M4A, WAV, AAC, OGG, OPUS, FLAC, WebM · up to 450 MB, 4 hours',fileLarge:'Maximum file size is 450 MB.',
  emptyAudio:'The file is empty. Choose another recording.',invalidAudio:'Cannot read the audio. Try a valid MP3, M4A or WAV.',unsupportedAudio:'Choose a supported audio file.',
  savingAudio:'Saving audio on this device…',audioReady:'Audio ready. Listen, download or create study materials.',audioBusy:'Please wait for audio to finish saving or transferring.',
  uploadProgress:'Transferred to server',uploadPreparing:'Preparing audio transfer…',uploadError:'Transfer interrupted. Retry to resume saved parts.',uploadExpired:'Upload session expired. Send the audio again.',
  cancelUpload:'Cancel transfer',uploadCancelled:'Transfer stopped. Audio is still on this device; you can resume.',aiProcessing:'Audio transferred. AI is preparing the materials. See stages below the notebook.',
  audioMissing:'Recording missing from local storage. Choose the file again.',audioSaveFailed:'Could not save locally. Download the audio now before leaving this page.',
  previewUnsupported:'This browser cannot play the format. You can download the original or send it for processing.',shareAudio:'Save / share',recordLimit:'Recording limit reached: 4 hours or 450 MB.',sourceChanged:'The result belongs to a previous recording and did not replace these materials.'
});
Object.assign(translations.zh, {
  audioExport:'下载音频',
  discardAudioWarning:'音频尚未保存到本机，请先下载。离开此讲座并丢弃未保存的录音？',
  uploadAudio:'选择音频文件',browseFiles:'找不到音频？浏览所有文件',pickerHint:'在手机上选择“文件”或“浏览”。请先将录音保存到设备文件中。',
  audioFormats:'MP3、M4A、WAV、AAC、OGG、OPUS、FLAC、WebM · 最大450 MB，4小时',fileLarge:'文件不能超过450 MB。',
  emptyAudio:'文件为空，请选择其他录音。',invalidAudio:'无法读取音频，请尝试有效的MP3、M4A或WAV文件。',unsupportedAudio:'请选择支持的音频文件。',
  savingAudio:'正在本机保存音频…',audioReady:'音频已就绪，可以播放、下载或生成学习材料。',audioBusy:'请等待音频保存或传输完成。',
  uploadProgress:'已传输至服务器',uploadPreparing:'正在准备音频传输…',uploadError:'传输中断，请重试以继续已保存的部分。',uploadExpired:'上传会话已过期，请重新发送音频。',
  cancelUpload:'取消传输',uploadCancelled:'传输已停止，音频仍保存在本机，可以继续。',aiProcessing:'音频已传输，AI正在生成材料。进度显示在笔记本下方。',
  audioMissing:'本机找不到录音，请重新选择文件。',audioSaveFailed:'本机保存失败，请在关闭页面前立即下载音频。',
  previewUnsupported:'浏览器无法播放该格式。可以下载原文件或提交处理。',shareAudio:'保存 / 分享',recordLimit:'已达到录音限制：4小时或450 MB。',sourceChanged:'结果属于之前的录音，未覆盖当前材料。'
});
let audioBusy=false, volatileRecording=false, audioRefresh=0, downloadAudioURL=null, currentAudioBlob=null,
    recordingSession=null, bridgeWaiter=null, uploadTask=null;
const audioError = category => Object.assign(new Error(t(category)), {category});
const audioExtension = name => String(name).split('.').pop().toLowerCase();
const fileSize = bytes => bytes<1024*1024 ? Math.max(1,Math.round(bytes/1024))+' KB' : (bytes/1024/1024).toFixed(1)+' MB';
function updateAudioControls(){
  const locked=audioBusy||!!pending||!!recordingSession;
  for(const id of ['startRecording','uploadAudio','browseAudioFiles']) $('#'+id).disabled=locked;
  $('#analyze').disabled=locked;
  $('#buildFinal').disabled=!!pending;
}
function audioProgress(message,ratio=null){
  $('#audioStatus').textContent=message;
  $('#audioProgress').hidden=ratio===null;
  if(ratio!==null) $('#audioProgress').value=ratio;
  height();
}
function showAudio(blob,name,key){
  if(audioURL)URL.revokeObjectURL(audioURL);
  if(downloadAudioURL)URL.revokeObjectURL(downloadAudioURL);
  currentAudioBlob=blob;
  audioURL=URL.createObjectURL(blob);
  downloadAudioURL=URL.createObjectURL(blob);
  playingKey=key;
  $('#audioPlayer').src=audioURL;
  $('#audioName').textContent=name+' · '+fileSize(blob.size);
  const link=$('#downloadAudio');
  link.href=downloadAudioURL;link.download=name;link.hidden=false;
  $('#audioArea').hidden=false;
  $('#playbackError').hidden=true;
  $('#shareAudio').hidden=!(navigator.canShare&&navigator.canShare({files:[new File([blob],name,{type:blob.type})]}));
  renderDownloads();height();
}
async function refreshAudio(){
  const revision=++audioRefresh, target=doc; volatileRecording=false;
  $('#audioArea').hidden=true;
  currentAudioBlob=null;
  renderDownloads();
  if(!target.audioKey){
    if(audioURL)URL.revokeObjectURL(audioURL);
    if(downloadAudioURL)URL.revokeObjectURL(downloadAudioURL);
    audioURL=downloadAudioURL=playingKey=null;
    $('#audioPlayer').removeAttribute('src');$('#audioPlayer').load();
    renderDownloads();return;
  }
  try{
    const asset=await read('assets',target.audioKey);
    if(revision!==audioRefresh||doc.id!==target.id)return;
    if(!asset?.size){notice(t('audioMissing'),true);return;}
    showAudio(asset,target.audioName,target.audioKey);
  }catch{notice(t('audioMissing'),true);}
}
async function seek(seconds,sourceKey=null){
  if(recordingSession||audioBusy)return notice(t('leaveRecording'));
  const audio=$('#audioPlayer'),key=sourceKey||doc.audioKey,documentId=doc.id;
  if(!key)return notice(t('noAudio'));
  if(key!==playingKey){
    const asset=await read('assets',key);
    if(doc.id!==documentId)return;
    if(!asset)return notice(t('audioMissing'),true);
    if(audioURL)URL.revokeObjectURL(audioURL);
    audioURL=URL.createObjectURL(asset);playingKey=key;
    await new Promise((resolve,reject)=>{
      const cleanup=()=>{clearTimeout(timer);audio.removeEventListener('loadedmetadata',done);audio.removeEventListener('error',fail)};
      const done=()=>{cleanup();resolve()},fail=()=>{cleanup();reject(audioError('previewUnsupported'))};
      const timer=setTimeout(fail,10000);
      audio.addEventListener('loadedmetadata',done);audio.addEventListener('error',fail);audio.src=audioURL;
    }).catch(()=>notice(t('previewUnsupported'),true));
  }
  if(audio.readyState){audio.currentTime=seconds;audio.play().catch(()=>{});}
  $('#audioArea').scrollIntoView({block:'nearest'});
}
function blobData(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.onerror=()=>reject(reader.error);reader.readAsDataURL(blob)})}
async function setAudio(file,name){
  if(audioBusy||pending||recordingSession)return notice(t('audioBusy'));
  if(!AUDIO_TYPES[audioExtension(name)])return notice(t('unsupportedAudio'),true);
  if(!file.size)return notice(t('emptyAudio'),true);
  if(file.size>AUDIO_LIMIT)return notice(t('fileLarge'),true);
  if(doc.audioKey&&!confirm(t('audioReplace')))return;
  audioBusy=true;updateAudioControls();notice('');
  const target=doc,key=uid();
  const blob=file.type.startsWith('audio/')?file:new Blob([file],{type:AUDIO_TYPES[audioExtension(name)]});
  audioProgress(t('savingAudio'));
  try{
    await write('assets',blob,key);
    Object.assign(target,{audioKey:key,audioName:name,audioType:blob.type,pack:null,quizState:null,partialPack:null});
    await saveNow();showAudio(blob,name,key);renderMaterials();audioProgress(t('audioReady'));
  }catch{notice(t('saveError'),true);audioProgress('');}
  finally{audioBusy=false;updateAudioControls();}
}
async function startRecording(){
  if(audioBusy||pending||recordingSession)return;
  if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)return microphoneError('micUnsupported');
  if(doc.audioKey&&!confirm(t('audioReplace')))return;
  audioBusy=true;updateAudioControls();
  try{
    await saveNow();
    stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:true,noiseSuppression:true}});
    recorder=MobileAudio.createRecorder(stream);
    const session={id:uid(),doc,recorder,stream,parts:[],keys:[],queue:Promise.resolve(),size:0,failed:false};
    recordingSession=session;recordId=session.id;recordDoc=doc;recordElapsed=0;recordSince=performance.now();
    doc.recordingParts=[];doc.recordingType=recorder.mimeType;doc.recordingId=session.id;
    try{
      audioContext=new(window.AudioContext||window.webkitAudioContext)();await audioContext.resume();
      analyser=audioContext.createAnalyser();analyser.fftSize=256;audioContext.createMediaStreamSource(stream).connect(analyser);
    }catch{analyser=null;}
    recorder.ondataavailable=event=>{
      if(!event.data.size)return;
      const key=session.id+':'+session.parts.length;
      session.parts.push(event.data);session.size+=event.data.size;
      session.queue=session.queue.then(async()=>{
        await write('assets',event.data,key);
        session.keys.push(key);session.doc.recordingParts=[...session.keys];await saveNow();
      }).catch(()=>{session.failed=true;microphoneError('audioSaveFailed')});
      if(session.size>=AUDIO_LIMIT){notice(t('recordLimit'));stopRecording();}
    };
    recorder.onerror=()=>{microphoneError('recordError');stopRecording()};
    recorder.onstop=()=>finishRecording(session);
    recorder.start(5000);
    session.cleanup=MobileAudio.protect(stream,recorder,()=>{microphoneError('recordError');stopRecording()});
    $('#recordControls').hidden=false;$('#timer').hidden=false;$('#level').hidden=false;
    $('#pauseRecording').textContent=t('pause');$('#microphoneError').hidden=true;notice('');audioProgress('');updateRecording();
  }catch(error){stream?.getTracks().forEach(track=>track.stop());recordingSession=null;microphoneError(error.name==='NotAllowedError'?'micDenied':'recordError');}
  finally{audioBusy=false;updateAudioControls();}
}
function microphoneError(key){$('#microphoneError').textContent=t(key);$('#microphoneError').hidden=false}
function elapsed(){return recordElapsed+(recorder?.state==='recording'?(performance.now()-recordSince)/1000:0)}
function pauseRecording(){if(!recorder)return;if(recorder.state==='recording'){recordElapsed=elapsed();recorder.pause();$('#pauseRecording').textContent=t('resume')}else if(recorder.state==='paused'){recordSince=performance.now();recorder.resume();$('#pauseRecording').textContent=t('pause')}updateRecording();}
function stopRecording(){if(recorder&&recorder.state!=='inactive'){recordElapsed=elapsed();recorder.stop()}}
async function finishRecording(session){
  audioBusy=true;updateAudioControls();cancelAnimationFrame(recordFrame);
  session.cleanup?.();session.stream.getTracks().forEach(track=>track.stop());audioContext?.close().catch(()=>{});
  $('#recordControls').hidden=true;$('#timer').hidden=true;$('#level').hidden=true;
  $('#recordStatus').textContent='';audioProgress(t('savingAudio'));
  await session.queue;
  const mime=session.recorder.mimeType||session.parts[0]?.type||'audio/webm';
  const blob=new Blob(session.parts,{type:mime});
  const name='lecture.'+(mime.includes('mp4')?'m4a':mime.includes('ogg')?'ogg':'webm');
  if(blob.size){volatileRecording=true;showAudio(blob,name,session.id);}
  try{
    if(!blob.size)throw audioError('emptyAudio');
    await write('assets',blob,session.id);
    Object.assign(session.doc,{audioKey:session.id,audioName:name,audioType:mime,pack:null,partialPack:null,quizState:null,recordingParts:[]});
    await saveNow();
    // Remove checkpoint copies only after the final recording and document commit.
    volatileRecording=false;
    const tx=db.transaction('assets','readwrite');session.keys.forEach(key=>tx.objectStore('assets').delete(key));
    renderMaterials();renderDownloads();audioProgress(t('audioReady'));
  }catch(error){notice(t(error.category||'audioSaveFailed'),true);audioProgress('');}
  finally{recordingSession=null;audioBusy=false;updateAudioControls();}
}
function updateRecording(){if(!recorder||recorder.state==='inactive')return;const running=recorder.state==='recording';$('#recordStatus').textContent=t(running?'recording':'paused');$('#timer').textContent=clock(elapsed());if(running&&analyser){const data=new Uint8Array(analyser.fftSize);analyser.getByteTimeDomainData(data);const rms=Math.sqrt(data.reduce((sum,v)=>sum+((v-128)/128)**2,0)/data.length);$('#level').value=Math.min(1,rms*4)}else $('#level').value=0;if(elapsed()>=14400){notice(t('recordLimit'));stopRecording()}cancelAnimationFrame(recordFrame);recordFrame=requestAnimationFrame(updateRecording)}
function markMoment(confused=false){const seconds=elapsed(),question=confused?(prompt(t('noteQuestion'))||''):'';const mark={id:uid(),seconds,question,confused};doc.marks.push(mark);doc.blocks.push(textBlock(`<p><a href="#" data-time="${Math.floor(seconds)}" data-audio-key="${recordId}">${clock(seconds)}</a> ${confused?esc(t('confused')):''}${question?' — '+esc(question):''}</p>`,{kind:'personal',time:seconds,audioKey:recordId}));renderBlocks('noteBlocks',doc.blocks);scheduleSave();}
function bridgeRequest(kind,payload,context,timeout=60000){
  return new Promise((resolve,reject)=>{
    const id=uid();
    const timer=setTimeout(()=>{
      if(bridgeWaiter?.id!==id)return;
      bridgeWaiter=null;reject(audioError('connectionError'));
    },timeout);
    bridgeWaiter={id,resolve,reject,timer};
    signal('streamlit:setComponentValue',{value:{id,kind,...context,...payload,ui:lang},dataType:'json'});
  });
}
async function uploadRequest(kind,payload,context,task){
  for(let attempt=0;attempt<2;attempt++){
    if(task.cancelled)throw audioError('uploadCancelled');
    try{
      const response=await bridgeRequest(kind,payload,context);
      if(response.error)throw audioError(response.error.category||'uploadError');
      return response;
    }catch(error){if(task.cancelled||attempt||error.category!=='connectionError')throw error;}
  }
}
async function analyze(){
  if(pending||audioBusy||recordingSession)return;
  if(!doc.audioKey)return notice(t('noAudio'));
  if(doc.pack&&!doc.pack.partial&&doc.pack.audioKey===doc.audioKey&&doc.pack.target_language===doc.target&&doc.pack.original_language===doc.original){material='summary';renderMaterials();setView('materials');return;}
  if(!bridge.has_key)return notice(t('keyMissing'),true);
  const context={lectureId:doc.id,audioKey:doc.audioKey},target=doc.target,original=doc.original,name=doc.audioName;
  const task={cancelled:false};uploadTask=task;pending={...context,kind:'analyze'};updateAudioControls();
  notice('');audioProgress(t('uploadPreparing'));$('#cancelAudioUpload').hidden=false;
  try{
    await saveNow();
    const asset=await read('assets',context.audioKey);
    if(!asset?.size)throw audioError('audioMissing');
    const uploadId=context.audioKey;
    let ack=await uploadRequest('upload_start',{uploadId,name,size:asset.size,mime:asset.type},context,task);
    const chunkSize=ack.chunkSize;
    if(!Number.isInteger(chunkSize)||chunkSize<1||chunkSize>4*1024*1024)throw audioError('uploadError');
    while(!ack.ready&&ack.received<asset.size){
      audioProgress(t('uploadProgress')+' · '+fileSize(ack.received)+' / '+fileSize(asset.size),ack.received/asset.size);
      const index=ack.nextIndex;
      const audio=await blobData(asset.slice(ack.received,Math.min(ack.received+chunkSize,asset.size)));
      ack=await uploadRequest('upload_chunk',{uploadId,index,audio},context,task);
    }
    if(!ack.ready)await uploadRequest('upload_finish',{uploadId},context,task);
    if(task.cancelled)throw audioError('uploadCancelled');
    task.phase='analysis';$('#cancelAudioUpload').textContent=UI.literal("Остановить после текущей части");audioProgress(t('aiProcessing'));
    let response;
    do {
      response=await bridgeRequest('analyze',{uploadId,target,original},context,1800000);
      await receive(response);
      if(response.error)break;
      if(response.more){
        audioProgress(UI.literal("Готово частей: ")+response.pack.chunks.length+UI.literal(" · текст доступен в материалах. Продолжаю…"));
        if(doc.id===context.lectureId&&response.pack.chunks.length===1){material='transcript';renderMaterials();setView('materials');}
      }
    } while(response.more&&!task.cancelled);
    if(task.cancelled)notice(UI.literal("Обработка остановлена. Готовые части сохранены; нажми «Создать материалы», чтобы продолжить."));
    audioProgress('');
  }catch(error){notice(t(error.category||'uploadError'),true);audioProgress('');}
  finally{uploadTask=null;pending=null;$('#cancelAudioUpload').hidden=true;$('#cancelAudioUpload').disabled=false;$('#cancelAudioUpload').textContent=t('cancelUpload');updateAudioControls();}
}
async function sendRequest(kind,payload,sourceContext=null){
  if(!bridge.has_key)return notice(t('keyMissing'),true);
  if(pending||audioBusy||recordingSession)return;
  const context=sourceContext||{lectureId:doc.id,audioKey:doc.audioKey};pending={...context,kind};updateAudioControls();notice(t('busy'));
  try{await receive(await bridgeRequest(kind,payload,context,1800000));}
  catch(error){notice(t(error.category||'genericError'),true);}
  finally{pending=null;updateAudioControls();}
}
async function buildFinal(){if(pending)return;if(!doc.pack)return notice(t('emptyMaterials'));const source=doc,context={lectureId:source.id,audioKey:source.audioKey};await saveNow();await sendRequest('merge',{notes:source.blocks.map(b=>({id:b.id,type:b.type,text:b.type==='text'?htmlText(b.html):'',source:b.source||null})),pack:source.pack,target:source.target},context);}
async function receive(response){
  if(!response||response.kind?.startsWith('upload_')||received.has(response.id))return;
  received.add(response.id);
  const saved=docs.find(d=>d.id===response.lectureId);
  const target=doc.id===response.lectureId?doc:(saved?clone(saved):null);
  if(!target)return;
  if(response.audioKey&&target.audioKey!==response.audioKey){notice(t('sourceChanged'));return;}
  if(response.kind==='analyze'&&response.pack){
    if(!response.partial)material='summary';
    if(response.partial&&target.pack&&!target.pack.partial)target.partialPack=response.pack;
    else{target.pack={...response.pack,audioKey:target.audioKey};target.quizState=null;}
    notice(response.partial?t('partial'):'');
  }
  if(response.kind==='merge'&&response.draft)target.draft=response.draft;
  if(response.error)notice(t(response.error.category||'genericError')+'\n'+(response.error.diagnostic||''),true);
  if(doc.id===target.id){
    await saveNow();renderMaterials();renderDraft();renderDownloads();
    if(response.kind==='analyze'&&response.pack&&!response.partial&&!split)setView('materials');
    if(response.kind==='merge'&&response.draft)setView('final');
  }else{await write('documents',target);const i=docs.findIndex(d=>d.id===target.id);docs[i]=target;}
}

function draftBlocks(){
  const placed=new Set(),blocks=[];
  for(const section of doc.draft.sections){
    const ids=section.source_block_ids||[];
    let references='';const seen=new Set();
    for(const id of ids){const source=doc.blocks.find(b=>b.id===id);if(!source||source.type!=='text')continue;
      const content=document.createElement('div');content.innerHTML=sanitize(source.html||'');
      content.querySelectorAll('a[data-time],img').forEach(node=>{if(!seen.has(node.outerHTML)){references+=node.outerHTML+' ';seen.add(node.outerHTML)}});
    }
    blocks.push(textBlock(`<h2>${esc(section.heading)}</h2><p>${esc(section.text).replace(/\n/g,'<br>')}</p>${references}`,{kind:'ai',sourceBlockIds:ids}));
    for(const id of ids){
      const index=doc.blocks.findIndex(b=>b.id===id);if(index<0)continue;
      // Preserve drawings and attached originals beside the preceding text.
      let j=['drawing','attachment'].includes(doc.blocks[index].type)?index:index+1;
      for(;j<doc.blocks.length&&['drawing','attachment'].includes(doc.blocks[j].type);j++){
        const drawing=doc.blocks[j];if(!placed.has(drawing.id)){blocks.push(clone(drawing));placed.add(drawing.id)}
      }
    }
  }
  for(const block of doc.blocks)if(['drawing','attachment'].includes(block.type)&&!placed.has(block.id))blocks.push(clone(block));
  return blocks;
}
function renderDraft(){
  const box=$('#draftPreview');if(!doc.draft){box.hidden=true;return}
  box.hidden=false;box.innerHTML=`<span class="meta">${t('draftAI')}</span>`;
  box.onclick=event=>{const link=event.target.closest('[data-time]');if(link){event.preventDefault();seek(Number(link.dataset.time),link.dataset.audioKey)}};
  for(const block of draftBlocks()){
    if(block.type==='drawing'){const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=650;canvas.className='draft-drawing';canvas.setAttribute('role','img');canvas.setAttribute('aria-label',t('drawing'));drawStrokes(canvas,block.strokes||[]);box.append(canvas)}
    else if(block.type==='attachment'){const wrap=document.createElement('div');box.append(wrap);NotebookPaper.attachment(block,wrap)}
    else box.insertAdjacentHTML('beforeend',sanitize(block.html));
  }
  box.insertAdjacentHTML('beforeend',`<p class="meta">${t('noDrawingAI')}</p><button id="acceptDraft" class="primary">${t('accept')}</button> <button id="discardDraft" class="quiet">${t('discard')}</button>`);
  $('#discardDraft').onclick=()=>{doc.draft=null;renderDraft();scheduleSave()};
  $('#acceptDraft').onclick=()=>{
    if(doc.finalBlocks.length&&!confirm(t('replaceFinal')))return;
    doc.previousFinal=clone(doc.finalBlocks);doc.finalBlocks=draftBlocks();doc.draft=null;
    renderBlocks('finalBlocks',doc.finalBlocks);renderDraft();renderRestoreFinal();scheduleSave();
  };height();
}
function renderRestoreFinal(){let button=$('#restorePreviousFinal');if(button)button.remove();if(!doc.previousFinal)return;button=document.createElement('button');button.id='restorePreviousFinal';button.className='quiet';button.textContent=t('restoreFinal');button.onclick=()=>{const current=doc.finalBlocks;doc.finalBlocks=doc.previousFinal;doc.previousFinal=current;renderBlocks('finalBlocks',doc.finalBlocks);scheduleSave()};$('#finalBlocks').after(button);}
function download(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)}
function jsonDownload(value,name){download(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),name)}
function transcriptText(translated=false){return(doc.pack?.chunks||[]).map((c,i)=>'['+clock(i*300)+']\n'+c.paragraphs.map(p=>p[translated?'translation':'original']).join('\n\n')).join('\n\n')}
function renderDownloads(){const items=$('#downloadItems');items.innerHTML='';const add=(label,action)=>{const b=document.createElement('button');b.textContent=t(label);b.onclick=()=>{action();$('#downloads').open=false};items.append(b)};add('personalExport',()=>jsonDownload({...doc,audioKey:null,recordingParts:[]},'lectra-notes.json'));add('notesHtml',()=>{const blocks=doc.finalBlocks.length?doc.finalBlocks:doc.blocks;const body=blocks.map(b=>{if(b.type==='text')return sanitize(b.html);if(b.type==='attachment')return `<p>${esc(UI.literal('Файл в тетради'))}: ${esc(b.name)}</p>`;const c=document.createElement('canvas');c.width=1000;c.height=650;drawStrokes(c,b.strokes||[]);return `<img src="${c.toDataURL()}" style="max-width:100%">`}).join('\n');download(new Blob([`<!doctype html><html lang="${lang}"><meta charset="UTF-8"><title>${esc(doc.title||t('newLecture'))}</title><body style="font:16px/1.6 sans-serif;max-width:800px;margin:40px auto"><h1>${esc(doc.title||t('newLecture'))}</h1>${body}</body></html>`],{type:'text/html'}),'lectra-notes.html')});if(currentAudioBlob&&downloadAudioURL){const link=document.createElement('a');link.className='download-link';link.textContent=t('audioExport');link.href=downloadAudioURL;link.download=$('#downloadAudio').download;items.append(link);}if(doc.partialPack)add('partial',()=>jsonDownload(doc.partialPack,'lectra-partial.json'));if(doc.pack){add('lectureExport',()=>jsonDownload(doc,'lectra-lecture.json'));add('originalExport',()=>download(new Blob([transcriptText()],{type:'text/plain;charset=utf-8'}),'lecture-original.txt'));add('translatedExport',()=>download(new Blob([transcriptText(true)],{type:'text/plain;charset=utf-8'}),'lecture-translation.txt'));if(doc.pack.pptx_base64)add('pptx',()=>{const bytes=Uint8Array.from(atob(doc.pack.pptx_base64),c=>c.charCodeAt(0));download(new Blob([bytes],{type:'application/vnd.openxmlformats-officedocument.presentationml.presentation'}),'lectra-presentation.pptx')});}}
function drawStrokes(canvas,strokes,selected=-1){const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);for(let i=0;i<strokes.length;i++){const s=strokes[i];if(!s.points?.length)continue;ctx.strokeStyle=s.color;ctx.lineCap='round';ctx.lineJoin='round';ctx.globalAlpha=s.tool==='marker'?.25:1;for(let j=0;j<s.points.length;j++){const p=s.points[j],prev=s.points[Math.max(0,j-1)];ctx.lineWidth=s.width*(p.pressure||.5)*1.5;ctx.beginPath();ctx.moveTo(prev.x,prev.y);ctx.lineTo(p.x+(j===0?.01:0),p.y);ctx.stroke()}if(i===selected){ctx.globalAlpha=1;const xs=s.points.map(p=>p.x),ys=s.points.map(p=>p.y);ctx.strokeStyle='#8197b5';ctx.lineWidth=1;ctx.setLineDash([5,4]);ctx.strokeRect(Math.min(...xs)-8,Math.min(...ys)-8,Math.max(...xs)-Math.min(...xs)+16,Math.max(...ys)-Math.min(...ys)+16);ctx.setLineDash([])}}ctx.globalAlpha=1;}
let drawingPointer=null,drawingReturnId=null;
function openDrawing(block,blocks){
  drawingBlock=block;drawingList=blocks;drawUndo=[];drawRedo=[];selectedStroke=-1;
  drawingReturnId=block.id;stroke=null;dragPoint=null;drawingPointer=null;
  positionNotebookDialog();$('#drawingDialog').showModal();
  drawStrokes($('#drawCanvas'),block.strokes||[]);localize($('#drawingDialog'));setTool('pen');updateDrawingHistory();
}
function updateDrawingHistory(){
  $('#drawUndo').disabled=!drawUndo.length;$('#drawRedo').disabled=!drawRedo.length;
  $('#drawClear').disabled=!(drawingBlock?.strokes||[]).length;
}
function setTool(tool){
  if(drawingPointer!==null)finishStroke();drawingTool=tool;
  $$('[data-tool]').forEach(b=>{b.classList.toggle('active',b.dataset.tool===tool);b.setAttribute('aria-pressed',String(b.dataset.tool===tool))});
  $('#drawCanvas').style.touchAction=tool==='pan'||!$('#fingerDrawing').checked?'pan-y':'none';
  $('#drawCanvas').style.cursor=tool==='pan'?'grab':tool==='move'?'move':'crosshair';
}
function checkpoint(){drawUndo.push(clone(drawingBlock.strokes||[]));if(drawUndo.length>40)drawUndo.shift();drawRedo=[];updateDrawingHistory()}
function canvasPoint(event){const box=$('#drawCanvas').getBoundingClientRect();return{x:Math.max(0,Math.min(1000,(event.clientX-box.left)/box.width*1000)),y:Math.max(0,Math.min(650,(event.clientY-box.top)/box.height*650)),pressure:event.pointerType==='pen'?(event.pressure||.5):.65}}
function hitStroke(point){
  const radius=14*1000/$('#drawCanvas').getBoundingClientRect().width;
  for(let i=drawingBlock.strokes.length-1;i>=0;i--){
    const points=drawingBlock.strokes[i].points;
    for(let j=0;j<points.length;j++){
      const p=points[j],q=points[Math.max(0,j-1)],dx=p.x-q.x,dy=p.y-q.y;
      const a=Math.max(0,Math.min(1,((point.x-q.x)*dx+(point.y-q.y)*dy)/(dx*dx+dy*dy||1)));
      if(Math.hypot(q.x+a*dx-point.x,q.y+a*dy-point.y)<radius)return i;
    }
  }return -1;
}
function finishStroke(){
  if(!drawingBlock)return;
  if(drawingPointer!==null&&canvas.hasPointerCapture(drawingPointer))canvas.releasePointerCapture(drawingPointer);
  drawingPointer=null;stroke=null;dragPoint=null;canvas.style.touchAction=drawingTool==='pan'||!$('#fingerDrawing').checked?'pan-y':'none';updateDrawingHistory();scheduleSave();
  renderBlocks(drawingList===doc.blocks?'noteBlocks':'finalBlocks',drawingList);
}
const canvas=$('#drawCanvas');
canvas.onpointerenter=event=>{if(event.pointerType==='pen'&&drawingTool!=='pan')canvas.style.touchAction='none'};
canvas.onpointerdown=event=>{
  if(!drawingBlock||drawingPointer!==null||drawingTool==='pan')return;
  if(event.pointerType==='touch'&&!$('#fingerDrawing').checked)return;
  if(event.pointerType==='mouse'&&event.button!==0)return;
  if(event.pointerType==='pen'){$('#fingerDrawing').checked=false;canvas.style.touchAction='none'}
  event.preventDefault();drawingPointer=event.pointerId;canvas.setPointerCapture(event.pointerId);
  const point=canvasPoint(event);drawingBlock.strokes=drawingBlock.strokes||[];
  if(drawingTool==='move'){
    selectedStroke=hitStroke(point);if(selectedStroke>=0){checkpoint();dragPoint=point}
    drawStrokes(canvas,drawingBlock.strokes,selectedStroke);return;
  }
  selectedStroke=-1;checkpoint();
  if(drawingTool==='eraser'){const hit=hitStroke(point);if(hit>=0)drawingBlock.strokes.splice(hit,1)}
  else{stroke={id:uid(),tool:drawingTool,color:$('#inkColor').value,width:Number($('#inkWidth').value),points:[point]};drawingBlock.strokes.push(stroke)}
  drawStrokes(canvas,drawingBlock.strokes);updateDrawingHistory();
};
canvas.onpointermove=event=>{
  if(event.pointerType==='pen'&&drawingTool!=='pan')canvas.style.touchAction='none';
  if(event.pointerId!==drawingPointer)return;
  const samples=event.getCoalescedEvents?.()||[],points=(samples.length?samples:[event]).map(canvasPoint),point=points[points.length-1];
  if(stroke)stroke.points.push(...points);
  if(drawingTool==='eraser'){const hit=hitStroke(point);if(hit>=0)drawingBlock.strokes.splice(hit,1)}
  if(dragPoint&&selectedStroke>=0){
    const selected=drawingBlock.strokes[selectedStroke].points;
    let dx=point.x-dragPoint.x,dy=point.y-dragPoint.y;
    // Keep the selected stroke on the finite page without distorting its shape.
    const xs=selected.map(p=>p.x),ys=selected.map(p=>p.y);
    dx=Math.max(-Math.min(...xs),Math.min(1000-Math.max(...xs),dx));dy=Math.max(-Math.min(...ys),Math.min(650-Math.max(...ys),dy));
    selected.forEach(p=>{p.x+=dx;p.y+=dy});dragPoint=point;
  }
  drawStrokes(canvas,drawingBlock.strokes,selectedStroke);
};
canvas.onpointerup=canvas.onpointercancel=event=>{if(event.pointerId===drawingPointer)finishStroke()};
$('#drawUndo').onclick=()=>{if(!drawUndo.length)return;drawRedo.push(clone(drawingBlock.strokes));drawingBlock.strokes=drawUndo.pop();selectedStroke=-1;drawStrokes(canvas,drawingBlock.strokes);finishStroke()};
$('#drawRedo').onclick=()=>{if(!drawRedo.length)return;drawUndo.push(clone(drawingBlock.strokes));drawingBlock.strokes=drawRedo.pop();selectedStroke=-1;drawStrokes(canvas,drawingBlock.strokes);finishStroke()};
$('#drawClear').onclick=()=>{checkpoint();drawingBlock.strokes=[];selectedStroke=-1;drawStrokes(canvas,[]);finishStroke()};
$('#closeDrawing').onclick=()=>$('#drawingDialog').close();
$('#drawingDialog').addEventListener('close',()=>{finishStroke();const block=$$('.note-block').find(n=>n.dataset.id===drawingReturnId);block?.querySelector('button')?.focus({preventScroll:true});drawingBlock=null;drawingList=null});
$('#drawingDialog').addEventListener('keydown',event=>{
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='z'){event.preventDefault();$(event.shiftKey?'#drawRedo':'#drawUndo').click()}
});
$('#fingerDrawing').onchange=()=>setTool(drawingTool);
$$('[data-tool]').forEach(b=>b.onclick=()=>setTool(b.dataset.tool));

function format(command,value){
  const container=view==='final'?$('#finalBlocks'):$('#noteBlocks');
  if(!activeEditor?.isConnected||!container.contains(activeEditor)){
    activeEditor=container.querySelector('.editor');editorRange=null;
    if(!activeEditor){const blocks=view==='final'?doc.finalBlocks:doc.blocks;blocks.push(textBlock(''));renderBlocks(container.id,blocks);activeEditor=container.querySelector('.editor')}
  }
  activeEditor.focus();
  if(editorRange&&activeEditor.contains(editorRange.commonAncestorContainer)){const s=window.getSelection();s.removeAllRanges();s.addRange(editorRange)}
  document.execCommand(command,false,value);activeEditor.dispatchEvent(new Event('input'));
}
$$('[data-format]').forEach(b=>{b.onmousedown=e=>e.preventDefault();b.onclick=()=>format(b.dataset.format,b.dataset.value||null)});
$('#insertLink').onclick=()=>{const url=prompt(t('addLink'));if(!url)return;if(!/^https?:\/\//i.test(url))return notice(t('invalidLink'),true);format('createLink',url)};
$('#checklist').onclick=()=>format('insertHTML','<div><label class="checkbox-item"><input type="checkbox" aria-label="'+esc(t('checklist'))+'"> '+esc(t('checkItem'))+'</label></div><p><br></p>');
$('#insertImage').onclick=()=>$('#imageFile').click();$('#imageFile').onchange=async event=>{const file=event.target.files[0];if(!file)return;if(file.size>5*1024*1024)return notice(t('imageLarge'),true);if(!['image/png','image/jpeg','image/webp','image/gif'].includes(file.type))return;const owner=doc.id,editor=activeEditor;const data=await blobData(file);if(doc.id!==owner||activeEditor!==editor)return;format('insertHTML',`<img src="data:${file.type};base64,${data}" alt="${esc(file.name)}"><p><br></p>`);event.target.value='';};
document.addEventListener('selectionchange',()=>{const s=window.getSelection();if(s.rangeCount&&activeEditor?.contains(s.anchorNode))editorRange=s.getRangeAt(0).cloneRange();const old=$('.selection-popover');if(old)old.remove();if(s.isCollapsed||!activeEditor?.contains(s.anchorNode))return;const box=s.getRangeAt(0).getBoundingClientRect();const bar=document.createElement('div');bar.className='selection-popover';bar.setAttribute('role','toolbar');bar.setAttribute('aria-label',t('myNotes'));bar.style.left=Math.max(5,Math.min(window.innerWidth-140,box.left))+'px';bar.style.top=Math.max(5,box.top-48)+'px';for(const[cmd,label]of[['bold','B'],['italic','I'],['hiliteColor',t('highlight')]]){const b=document.createElement('button');b.textContent=label;b.setAttribute('aria-label',t(cmd==='bold'?'bold':cmd==='italic'?'italic':'highlight'));b.onmousedown=e=>e.preventDefault();b.onclick=()=>format(cmd,cmd==='hiliteColor'?'#FFF0B5':null);bar.append(b)}document.body.append(bar)});
$('#addText').onclick=()=>{doc.blocks.push(textBlock(''));renderBlocks('noteBlocks',doc.blocks);$('#noteBlocks .note-block:last-child .editor').focus();scheduleSave()};$('#addDrawing').onclick=()=>{const blocks=view==='final'?doc.finalBlocks:doc.blocks;const block={id:uid(),type:'drawing',strokes:[]};blocks.push(block);renderBlocks(view==='final'?'finalBlocks':'noteBlocks',blocks);openDrawing(block,blocks);scheduleSave()};
$('#closeNavigation').onclick=()=>$('#app').classList.remove('nav-open');
$('#toggleNav').onclick=()=>{if(window.innerWidth<=1000)$('#app').classList.toggle('nav-open');else $('#app').classList.toggle('nav-collapsed');height()};
$('#newLecture').onclick=async()=>{if(volatileRecording&&!confirm(t('discardAudioWarning')))return;if(audioBusy||recordingSession)return notice(t('audioBusy'));if(recorder&&recorder.state!=='inactive')return notice(t('leaveRecording'));try{await saveNow();doc=makeDoc();doc.target=lang==='en'?'English':lang==='zh'?'Chinese':'Russian';await saveNow();localStorage.setItem('lectra-current',doc.id);view='notes';split=false;closeNotebookNavigation(false);renderDoc()}catch{notice(t('saveError'),true)}};
$('#newFolder').onclick=async()=>{const name=prompt(t('folderName'));if(!name?.trim())return;folders.push({id:uid(),name:name.trim()});try{await write('settings',folders,'folders');languages();renderNav()}catch{notice(t('saveError'),true)}};
$('#searchLectures').oninput=renderNav;$('#lectureTitle').oninput=()=>{resizeTitle();doc.title=$('#lectureTitle').value;scheduleSave()};$('#subject').onchange=()=>{doc.subject=$('#subject').value;scheduleSave()};$('#originalLanguage').onchange=()=>{doc.original=$('#originalLanguage').value;scheduleSave()};$('#materialsLanguage').onchange=()=>{doc.target=$('#materialsLanguage').value;scheduleSave()};
$('#uiLanguage').value=lang;$('#uiLanguage').onchange=async()=>{if(recordingSession||audioBusy||pending){$('#uiLanguage').value=lang;return notice(t('audioBusy'))}await saveNow();lang=$('#uiLanguage').value;localStorage.setItem('lectra-ui',lang);localize();languages();renderNav();renderMaterials();renderDownloads();renderDraft();renderBlocks('noteBlocks',doc.blocks);renderBlocks('finalBlocks',doc.finalBlocks);updateSaved();$('#keyState').textContent=t(bridge.has_key?'keyReady':'keyMissing');location.reload()};
$$('[data-view]').forEach(b=>b.onclick=()=>{split=false;setView(b.dataset.view,true)});$$('[data-material]').forEach(b=>b.onclick=()=>{const host=notebookScrollHost();doc.materialScroll=doc.materialScroll||{};doc.materialScroll[material]=host.scrollTop??host.scrollY;material=b.dataset.material;renderMaterials();requestAnimationFrame(()=>host.scrollTo({top:doc.materialScroll[material]??doc.materialScroll.summary??0,behavior:'instant'}))});$('#splitView').onclick=()=>{split=!split;setView('notes')};
$('#startRecording').onclick=startRecording;$('#pauseRecording').onclick=pauseRecording;$('#stopRecording').onclick=stopRecording;$('#markTime').onclick=()=>markMoment();$('#confusedTime').onclick=()=>markMoment(true);$('#uploadAudio').onclick=()=>$('#audioFile').click();
$('#browseAudioFiles').onclick=()=>$('#audioFileFallback').click();
for(const selector of ['#audioFile','#audioFileFallback'])$(selector).onchange=async event=>{
  const file=event.target.files[0];event.target.value='';
  if(file)try{await setAudio(file,file.name)}catch{notice(t('saveError'),true)}
};
$('#cancelAudioUpload').onclick=()=>{
  if(!uploadTask)return;uploadTask.cancelled=true;
  if(uploadTask.phase==='analysis'){$('#cancelAudioUpload').disabled=true;audioProgress(UI.literal("Завершаю текущую часть и сохраняю результат…"));return;}
  if(bridgeWaiter){const waiter=bridgeWaiter;bridgeWaiter=null;clearTimeout(waiter.timer);waiter.reject(audioError('uploadCancelled'));}
};
$('#audioPlayer').onerror=()=>{$('#playbackError').hidden=false;$('#playbackError').textContent=t('previewUnsupported')};
$('#shareAudio').onclick=()=>{
  if(!currentAudioBlob)return;
  navigator.share({files:[new File([currentAudioBlob],$('#downloadAudio').download,{type:currentAudioBlob.type})]})
    .catch(error=>{if(error.name!=='AbortError')notice(t('genericError'),true)});
};
$('#analyze').onclick=()=>analyze().catch(()=>notice(t('genericError'),true));$('#buildFinal').onclick=()=>buildFinal().catch(()=>notice(t('genericError'),true));
async function collectBackupAssets(entries){const assets={};for(const d of entries){const keys=new Set([...(d.sources||[]).map(s=>s.assetKey),...[...(d.blocks||[]),...(d.finalBlocks||[]),...(d.previousFinal||[]),...(d.pages||[]).flatMap(p=>p.blocks||[]),...(d.pageTrash||[]).flatMap(p=>p.blocks||[]),...(d.blockTrash||[]).map(x=>x.block),...(d.versions||[]).flatMap(v=>(v.pages||[]).flatMap(p=>p.blocks||[]))].map(b=>b.assetKey),d.audioKey,...[...(d.blocks||[]),...(d.pages||[]).flatMap(p=>p.blocks||[]),...(d.pageTrash||[]).flatMap(p=>p.blocks||[])].map(b=>b.source?.audioKey),...(d.finalBlocks||[]).map(b=>b.source?.audioKey)].filter(Boolean));for(const key of keys){const a=await read('assets',key).catch(()=>null)||(key===doc.audioKey?currentAudioBlob:null);if(a)assets[key]={data:await blobData(a),type:a.type}}}return assets;}
$('#backup').onclick=async()=>{await saveNow().catch(()=>{});const entries=await all('documents').catch(()=>clone(docs));const currentIndex=entries.findIndex(d=>d.id===doc.id);if(currentIndex<0)entries.push(clone(doc));else entries[currentIndex]=clone(doc);const assets=await collectBackupAssets(entries);prepareNotebookBackup({version:1,documents:entries,folders,assets,product:window.Product?.backupState()})};$('#restore').onclick=()=>$('#restoreFile').click();$('#restoreFile').onchange=async event=>{try{const raw=JSON.parse(await event.target.files[0].text());const entries=raw.documents||[raw];if(!Array.isArray(entries)||entries.some(d=>!d.id||!Array.isArray(d.blocks)))throw new Error();for(const d of entries){for(const b of[...d.blocks,...(d.finalBlocks||[])])if(b.type==='text')b.html=sanitize(b.html||'');await write('documents',d)}for(const[key,a]of Object.entries(raw.assets||{})){const bytes=Uint8Array.from(atob(a.data),c=>c.charCodeAt(0));await write('assets',new Blob([bytes],{type:a.type}),key)}if(Array.isArray(raw.folders)){folders=raw.folders;await write('settings',folders,'folders')}docs=await all('documents');doc=clone(entries[0]);if(raw.product)await window.Product?.restoreState(raw.product);localStorage.setItem('lectra-current',doc.id);renderDoc();notice(t('importDone'))}catch{notice(t('importError'),true)}};
window.addEventListener('beforeunload',event=>{if(unsaved||volatileRecording||audioBusy||uploadTask||recordingSession){event.preventDefault();event.returnValue=t('keepUnsaved')}});
window.addEventListener('message',event=>{if(event.source!==window.parent||event.data?.type!=='streamlit:render')return;bridge=event.data.args||{};$('#keyState').textContent=t(bridge.has_key?'keyReady':'keyMissing');if(bridge.response){const response=bridge.response;ready.then(()=>{
  if(bridgeWaiter?.id===response.id){const waiter=bridgeWaiter;bridgeWaiter=null;clearTimeout(waiter.timer);waiter.resolve(response);}
  else if(!pending)return receive(response);
}).catch(()=>notice(t('saveError'),true));}height()});
window.addEventListener('resize',()=>{if(window.innerWidth<1000&&split){split=false;setView('notes')}height()});
const ready=(async()=>{try{db=await openDatabase();folders=await read('settings','folders')||[];docs=await all('documents');const current=localStorage.getItem('lectra-current');doc=clone(docs.find(d=>d.id===current)||docs.sort((a,b)=>b.updated-a.updated)[0]||makeDoc());if(doc.recordingParts?.length){const parts=await Promise.all(doc.recordingParts.map(key=>read('assets',key)));const blob=new Blob(parts.filter(Boolean),{type:doc.recordingType||'audio/webm'});const key=doc.recordingId||uid();await write('assets',blob,key);doc.audioKey=key;doc.audioType=blob.type;doc.audioName='recovered.'+(blob.type.includes('mp4')?'m4a':blob.type.includes('ogg')?'ogg':'webm');doc.recordingParts=[];notice(t('recovered'));}await saveNow();localStorage.setItem('lectra-current',doc.id);localize();renderDoc();$('#keyState').textContent=t(bridge.has_key?'keyReady':'keyMissing');}catch{notice(t('saveError'),true)}})();
const finalToolbar=$('.toolbar').cloneNode(true);finalToolbar.querySelectorAll('[id]').forEach(n=>{const originalId=n.id;n.removeAttribute('id');n.onclick=()=>document.getElementById(originalId).click()});finalToolbar.querySelectorAll('[data-format]').forEach(b=>{b.onmousedown=e=>e.preventDefault();b.onclick=()=>format(b.dataset.format,b.dataset.value||null)});$('#finalBlocks').before(finalToolbar);
initNotebookUI();localize();signal('streamlit:componentReady',{apiVersion:1});new ResizeObserver(()=>height()).observe(document.body);
