/* Translates author-written UI literals only, never user documents. */
window.UI=(()=>{
 const catalog={
  "Главная": [
    "Home",
    "首页"
  ],
  "Библиотека": [
    "Library",
    "资料库"
  ],
  "Учёба": [
    "Study",
    "学习"
  ],
  "Планер": [
    "Planner",
    "计划"
  ],
  "Сообщество": [
    "Community",
    "社区"
  ],
  "Настройки": [
    "Settings",
    "设置"
  ],
  "Корзина": [
    "Trash",
    "回收站"
  ],
  "Помощь": [
    "Help",
    "帮助"
  ],
  "Предмет": [
    "Subject",
    "科目"
  ],
  "Обзор": [
    "Overview",
    "概览"
  ],
  "Заметки": [
    "Notes",
    "笔记"
  ],
  "Источники": [
    "Sources",
    "资料来源"
  ],
  "Чат": [
    "Chat",
    "对话"
  ],
  "Студия": [
    "Studio",
    "工作室"
  ],
  "LECTRA / УЧЕБНОЕ ПРОСТРАНСТВО": [
    "LECTRA / STUDY SPACE",
    "LECTRA / 学习空间"
  ],
  "Страница 1": [
    "Page 1",
    "第 1 页"
  ],
  "На этом устройстве": [
    "On this device",
    "保存在此设备"
  ],
  "Ошибка сохранения": [
    "Could not save",
    "保存失败"
  ],
  "Изменения пока только в памяти. Скачай резервную копию и освободи место.": [
    "Changes are only in memory. Download a backup and free up storage.",
    "更改仅保存在内存中。请下载备份并释放存储空间。"
  ],
  "Закрыть": [
    "Close",
    "关闭"
  ],
  "Не подключено": [
    "Not connected",
    "未连接"
  ],
  "Локальные заметки, записи и материалы остаются доступны.": [
    "Local notes, recordings and materials remain available.",
    "本地笔记、录音和资料仍可使用。"
  ],
  "Библиотека /": [
    "Library /",
    "资料库 /"
  ],
  "Без папки": [
    "No folder",
    "未分类"
  ],
  "Новая тетрадь": [
    "New notebook",
    "新建笔记本"
  ],
  "Предмет и тетрадь": [
    "Subject and notebook",
    "科目与笔记本"
  ],
  "Собери заметки, рисунки и материалы одного предмета в тетради.": [
    "Keep notes, drawings and materials for one subject together.",
    "将同一科目的笔记、绘图和资料放在一起。"
  ],
  "Без предмета": [
    "No subject",
    "未设置科目"
  ],
  "В этой тетради": [
    "In this notebook",
    "本笔记本"
  ],
  "В заметках можно вставить изображение, ссылку, PDF, Word или презентацию. Оригиналы файлов сохраняются в резервной копии.": [
    "Insert images, links, PDFs, Word files or presentations in your notes. Backups include the original files.",
    "笔记可插入图片、链接、PDF、Word 文件或演示文稿。备份包含原始文件。"
  ],
  "Создать предмет": [
    "Create subject",
    "新建科目"
  ],
  "Открыть тетрадь": [
    "Open notebook",
    "打开笔记本"
  ],
  "Применить к тетрадям предмета": [
    "Apply to this subject’s notebooks",
    "应用到本科目的笔记本"
  ],
  "Добавить страницу": [
    "Add page",
    "添加页面"
  ],
  "· на устройстве": [
    "· on this device",
    "· 保存在此设备"
  ],
  "Личный блокнот": [
    "Personal notebook",
    "个人笔记本"
  ],
  "Выбрать": [
    "Select",
    "选择"
  ],
  "тетрадь": [
    "notebook",
    "笔记本"
  ],
  "Чистая страница для новых идей": [
    "A fresh page for new ideas",
    "为新想法开启空白页"
  ],
  "Место для твоих идей": [
    "A place for your ideas",
    "记录你的想法"
  ],
  "Пиши, разбирай материалы и возвращайся к важному.": [
    "Write, explore your materials and return to what matters.",
    "写下笔记、整理资料，随时回顾重点。"
  ],
  "Создать": [
    "Create",
    "新建"
  ],
  "Продолжить работу": [
    "Continue working",
    "继续编辑"
  ],
  "В СВОЁМ ТЕМПЕ": [
    "AT YOUR OWN PACE",
    "按自己的节奏"
  ],
  "Сегодня": [
    "Today",
    "今天"
  ],
  "карточек к повторению": [
    "cards to review",
    "张待复习卡片"
  ],
  "Учебные дела": [
    "Study tasks",
    "学习任务"
  ],
  "Вся библиотека": [
    "Full library",
    "全部资料"
  ],
  "Начни с чистого листа": [
    "Start with a blank page",
    "从空白页开始"
  ],
  "Создай тетрадь или добавь первый материал.": [
    "Create a notebook or add your first material.",
    "新建笔记本或添加第一份资料。"
  ],
  "Добавить материал": [
    "Add material",
    "添加资料"
  ],
  "Начать повторение": [
    "Start review",
    "开始复习"
  ],
  "Когда появятся карточки, здесь будет план повторения.": [
    "Your review plan will appear here when you add cards.",
    "添加卡片后，这里将显示复习计划。"
  ],
  "На сегодня задач нет.": [
    "No tasks for today.",
    "今天没有任务。"
  ],
  "Открыть планер": [
    "Open planner",
    "打开计划"
  ],
  "тетрадей · хранятся на этом устройстве": [
    "notebooks · stored on this device",
    "本笔记本 · 保存在此设备"
  ],
  "Импорт": [
    "Import",
    "导入"
  ],
  "Найти тетрадь": [
    "Find a notebook",
    "查找笔记本"
  ],
  "Поиск в библиотеке": [
    "Search library",
    "搜索资料库"
  ],
  "Сортировка": [
    "Sort",
    "排序"
  ],
  "Недавно изменённые": [
    "Recently updated",
    "最近修改"
  ],
  "По названию": [
    "By title",
    "按标题"
  ],
  "Списком": [
    "List view",
    "列表视图"
  ],
  "Сеткой": [
    "Grid view",
    "网格视图"
  ],
  "Все": [
    "All",
    "全部"
  ],
  "Избранное": [
    "Favorites",
    "收藏"
  ],
  "Общие": [
    "Shared",
    "共享"
  ],
  "Архив": [
    "Archive",
    "归档"
  ],
  "Выбрано:": [
    "Selected:",
    "已选择："
  ],
  "В архив": [
    "Archive",
    "归档"
  ],
  "В корзину": [
    "Move to trash",
    "移到回收站"
  ],
  "Снять выбор": [
    "Clear selection",
    "取消选择"
  ],
  "Совместная работа ещё не подключена": [
    "Collaboration is not connected yet",
    "协作功能尚未连接"
  ],
  "Для общих тетрадей нужен сервер аккаунтов и прав доступа. Сейчас все тетради личные.": [
    "Shared notebooks require an account and permissions server. All notebooks are currently personal.",
    "共享笔记本需要账户及权限服务器。目前所有笔记本均为个人使用。"
  ],
  "Как устроен доступ": [
    "About access",
    "访问权限说明"
  ],
  "Назад": [
    "Back",
    "返回"
  ],
  "Далее": [
    "Next",
    "下一步"
  ],
  "Пока ничего не найдено": [
    "Nothing found yet",
    "暂无结果"
  ],
  "Попробуй другой запрос или создай новую тетрадь.": [
    "Try another search or create a notebook.",
    "请尝试其他搜索词或新建笔记本。"
  ],
  "ТВОЯ ТЕТРАДЬ": [
    "YOUR NOTEBOOK",
    "你的笔记本"
  ],
  "Страницы": [
    "Pages",
    "页面"
  ],
  "Материалы": [
    "Materials",
    "资料"
  ],
  "источников ·": [
    "sources ·",
    "份来源 ·"
  ],
  "По этой теме": [
    "On this topic",
    "相关主题"
  ],
  "Собери здесь свои мысли, лекции и материалы по теме.": [
    "Collect your ideas, lectures and related materials here.",
    "在此收集想法、讲座和相关资料。"
  ],
  "Без тегов": [
    "No tags",
    "无标签"
  ],
  "Продолжить заметку": [
    "Continue note",
    "继续笔记"
  ],
  "Описание и теги": [
    "Description and tags",
    "描述与标签"
  ],
  "Поделиться": [
    "Share",
    "分享"
  ],
  "блоков": [
    "blocks",
    "个内容块"
  ],
  "Новая страница": [
    "New page",
    "新建页面"
  ],
  "1 запись": [
    "1 recording",
    "1 段录音"
  ],
  "нет записей": [
    "no recordings",
    "无录音"
  ],
  "Добавить источник": [
    "Add source",
    "添加来源"
  ],
  "Записать лекцию": [
    "Record lecture",
    "录制讲座"
  ],
  "Спросить ИИ": [
    "Ask AI",
    "询问 AI"
  ],
  "Открыть студию": [
    "Open studio",
    "打开工作室"
  ],
  "Связанных задач пока нет.": [
    "No linked tasks yet.",
    "暂无关联任务。"
  ],
  "Добавить задачу": [
    "Add task",
    "添加任务"
  ],
  "Краткий обзор лекции": [
    "Lecture overview",
    "讲座概要"
  ],
  "Открыть конспект": [
    "Open summary",
    "打开摘要"
  ],
  "Страница": [
    "Page",
    "页面"
  ],
  "Текст": [
    "Text",
    "文本"
  ],
  "+ Страница": [
    "+ Page",
    "+ 页面"
  ],
  "Фокус": [
    "Focus",
    "专注"
  ],
  "История": [
    "History",
    "历史"
  ],
  "Выполнено:": [
    "Completed:",
    "已完成："
  ],
  "Без срока": [
    "No due date",
    "无截止日期"
  ],
  "· Важно": [
    "· Important",
    "· 重要"
  ],
  "Небольшие шаги к тому, что важно.": [
    "Small steps toward what matters.",
    "一步步完成重要的事。"
  ],
  "Задачи сохраняются локально. Фоновые напоминания и синхронизация календарей не подключены.": [
    "Tasks are stored locally. Background reminders and calendar sync are not connected.",
    "任务保存在本地。后台提醒和日历同步尚未连接。"
  ],
  "Дата": [
    "Date",
    "日期"
  ],
  "День": [
    "Day",
    "日"
  ],
  "Неделя": [
    "Week",
    "周"
  ],
  "Месяц": [
    "Month",
    "月"
  ],
  "Список": [
    "List",
    "列表"
  ],
  "Пн": [
    "Mon",
    "周一"
  ],
  "Вт": [
    "Tue",
    "周二"
  ],
  "Ср": [
    "Wed",
    "周三"
  ],
  "Чт": [
    "Thu",
    "周四"
  ],
  "Пт": [
    "Fri",
    "周五"
  ],
  "Сб": [
    "Sat",
    "周六"
  ],
  "Вс": [
    "Sun",
    "周日"
  ],
  "Здесь пока свободно": [
    "Nothing scheduled yet",
    "暂无安排"
  ],
  "Добавь задачу и при желании свяжи её с тетрадью.": [
    "Add a task and optionally link it to a notebook.",
    "添加任务，也可将其关联到笔记本。"
  ],
  "Задача": [
    "Task",
    "任务"
  ],
  "Новая задача": [
    "New task",
    "新建任务"
  ],
  "Срок и детали": [
    "Due date and details",
    "截止日期与详情"
  ],
  "Приоритет": [
    "Priority",
    "优先级"
  ],
  "Обычный": [
    "Normal",
    "普通"
  ],
  "Важный": [
    "Important",
    "重要"
  ],
  "Тетрадь": [
    "Notebook",
    "笔记本"
  ],
  "Без привязки": [
    "Not linked",
    "未关联"
  ],
  "Сохранить": [
    "Save",
    "保存"
  ],
  "Название": [
    "Title",
    "标题"
  ],
  "Срок": [
    "Due date",
    "截止日期"
  ],
  "Удалить": [
    "Delete",
    "删除"
  ],
  "Повторяй материал в удобном темпе.": [
    "Review at your own pace.",
    "按自己的节奏复习。"
  ],
  "Создать колоду": [
    "Create deck",
    "新建卡片组"
  ],
  "НА СЕГОДНЯ": [
    "FOR TODAY",
    "今日复习"
  ],
  "Срок следующего повторения зависит от твоей оценки.": [
    "Your rating determines the next review date.",
    "下次复习时间取决于你的评价。"
  ],
  "Мои колоды": [
    "My decks",
    "我的卡片组"
  ],
  "Тесты по лекциям": [
    "Lecture quizzes",
    "讲座测验"
  ],
  "Начать": [
    "Start",
    "开始"
  ],
  "карточек ·": [
    "cards ·",
    "张卡片 ·"
  ],
  "на сегодня": [
    "due today",
    "今日到期"
  ],
  "Личная колода": [
    "Personal deck",
    "个人卡片组"
  ],
  "Повторить": [
    "Review",
    "复习"
  ],
  "Редактировать": [
    "Edit",
    "编辑"
  ],
  "Запомнить и понять": [
    "Remember and understand",
    "理解并记住"
  ],
  "Создай карточки вручную или перенеси определения из лекции.": [
    "Create cards yourself or import lecture definitions.",
    "手动创建卡片或导入讲座中的定义。"
  ],
  "вопросов · тренировка с объяснениями": [
    "questions · practice with explanations",
    "道题 · 附带解析"
  ],
  "Пройти": [
    "Take quiz",
    "开始测验"
  ],
  "Тест появится после обработки лекции.": [
    "The quiz will appear after the lecture is processed.",
    "讲座处理完成后将生成测验。"
  ],
  "Сначала добавь карточки в колоду.": [
    "Add some cards to the deck first.",
    "请先向卡片组添加卡片。"
  ],
  "Повторение завершено": [
    "Review complete",
    "复习完成"
  ],
  "стоит повторить": [
    "need more practice",
    "需要再练习"
  ],
  "Повторить сложные": [
    "Review difficult cards",
    "复习难题"
  ],
  "К колодам": [
    "Back to decks",
    "返回卡片组"
  ],
  "← К колодам": [
    "← Back to decks",
    "← 返回卡片组"
  ],
  "Показать ответ": [
    "Show answer",
    "显示答案"
  ],
  "Не вспомнил": [
    "Forgot",
    "忘记了"
  ],
  "Сложно": [
    "Hard",
    "困难"
  ],
  "Хорошо": [
    "Good",
    "掌握了"
  ],
  "Легко": [
    "Easy",
    "简单"
  ],
  "Добавить карточку": [
    "Add card",
    "添加卡片"
  ],
  "Править": [
    "Edit",
    "编辑"
  ],
  "Колода пока пустая.": [
    "This deck is empty.",
    "卡片组为空。"
  ],
  "Карточка": [
    "Card",
    "卡片"
  ],
  "Новая карточка": [
    "New card",
    "新建卡片"
  ],
  "Вопрос": [
    "Question",
    "问题"
  ],
  "Ответ": [
    "Answer",
    "答案"
  ],
  "Источник / пояснение": [
    "Source / explanation",
    "来源 / 解释"
  ],
  "Подборки": [
    "Collections",
    "合集"
  ],
  "Личное пространство остаётся личным.": [
    "Your personal space stays personal.",
    "你的个人空间保持私密。"
  ],
  "Опубликовать": [
    "Publish",
    "发布"
  ],
  "Карточки": [
    "Cards",
    "卡片"
  ],
  "Шаблоны": [
    "Templates",
    "模板"
  ],
  "Блокноты": [
    "Notebooks",
    "笔记本"
  ],
  "Комнаты": [
    "Rooms",
    "房间"
  ],
  "Сообщество ещё не подключено": [
    "Community is not connected yet",
    "社区尚未连接"
  ],
  "Публичные материалы, авторы, лицензии и комнаты появятся после подключения аккаунтов, хранения и модерации. Сейчас здесь нет публикаций или активных комнат.": [
    "Public materials, authors, licenses and rooms require accounts, storage and moderation. There are currently no publications or active rooms.",
    "公开资料、作者、许可和房间功能需要账户、存储及审核服务。目前没有公开内容或活动房间。"
  ],
  "Условия публикации": [
    "Publication terms",
    "发布条款"
  ],
  "Внешний вид": [
    "Appearance",
    "外观"
  ],
  "Редактор и стилус": [
    "Editor and stylus",
    "编辑器与触控笔"
  ],
  "Язык и доступность": [
    "Language and accessibility",
    "语言与无障碍"
  ],
  "ИИ и данные": [
    "AI and data",
    "AI 与数据"
  ],
  "Хранилище": [
    "Storage",
    "存储"
  ],
  "Уведомления": [
    "Notifications",
    "通知"
  ],
  "Профиль": [
    "Profile",
    "个人资料"
  ],
  "Безопасность": [
    "Security",
    "安全"
  ],
  "Подписка": [
    "Subscription",
    "订阅"
  ],
  "Экспорт и удаление": [
    "Export and deletion",
    "导出与删除"
  ],
  "Тема": [
    "Theme",
    "主题"
  ],
  "Светлая": [
    "Light",
    "浅色"
  ],
  "Тёмная": [
    "Dark",
    "深色"
  ],
  "Цвет листа": [
    "Paper color",
    "纸张颜色"
  ],
  "Белый": [
    "White",
    "白色"
  ],
  "Кремовый": [
    "Cream",
    "米色"
  ],
  "Размер текста": [
    "Text size",
    "文字大小"
  ],
  "Компактные отступы": [
    "Compact spacing",
    "紧凑间距"
  ],
  "Леворукий режим: основные инструменты справа": [
    "Left-handed mode: main tools on the right",
    "左手模式：主要工具置于右侧"
  ],
  "Ручка, маркер, ластик, перемещение штриха и отдельный режим прокрутки доступны в рисунке.": [
    "Drawings support pen, highlighter, eraser, moving strokes and a separate scrolling mode.",
    "绘图支持画笔、荧光笔、橡皮擦、移动笔画及独立滚动模式。"
  ],
  "Давление используется, если устройство его передаёт. Универсальная защита от ладони, стабилизация, радиальное меню и лассо пока не реализованы.": [
    "Pressure is used when supplied by the device. Universal palm rejection, stabilization, radial menus and lasso selection are not implemented yet.",
    "设备支持时可使用压感。通用防误触、笔画防抖、环形菜单及套索选择尚未实现。"
  ],
  "Выбери язык интерфейса в верхней панели. Язык заметок и материалов лекции настраивается отдельно.": [
    "Choose the interface language in the top bar. Note and lecture languages are set separately.",
    "在顶部栏选择界面语言。笔记和讲座资料的语言可单独设置。"
  ],
  "Размер текста меняется во «Внешнем виде». Системное уменьшение движения учитывается автоматически.": [
    "Change text size under Appearance. Your system’s reduced-motion preference is respected automatically.",
    "可在外观中调整字号。应用会自动遵循系统的减少动态效果设置。"
  ],
  "Ctrl/Cmd+Shift+F — поиск": [
    "Ctrl/Cmd+Shift+F — search",
    "Ctrl/Cmd+Shift+F — 搜索"
  ],
  "Ctrl/Cmd+Shift+P — команды": [
    "Ctrl/Cmd+Shift+P — commands",
    "Ctrl/Cmd+Shift+P — 命令"
  ],
  "Ctrl/Cmd+S — сохранить": [
    "Ctrl/Cmd+S — save",
    "Ctrl/Cmd+S — 保存"
  ],
  "Ctrl/Cmd+B, I, K — форматирование": [
    "Ctrl/Cmd+B, I, K — formatting",
    "Ctrl/Cmd+B、I、K — 格式设置"
  ],
  "По нажатию «Создать материалы» аудио передаётся на сервер и в Gemini. Чат отправляет только выбранные текстовые источники и вопрос.": [
    "Creating materials sends audio to the server and Gemini. Chat sends only selected text sources and your question.",
    "创建资料时会将音频发送至服务器和 Gemini。对话仅发送选中的文本来源及问题。"
  ],
  "Рисунки не распознаются. Интернет-поиск, локальная модель и другие провайдеры не подключены.": [
    "Drawings are not recognized. Web search, local models and other providers are not connected.",
    "暂不识别绘图。网络搜索、本地模型及其他服务商尚未连接。"
  ],
  "Gemini подключён": [
    "Gemini connected",
    "Gemini 已连接"
  ],
  "Ключ AI не настроен": [
    "AI key not configured",
    "尚未配置 AI 密钥"
  ],
  "Проверяю использование хранилища…": [
    "Checking storage usage…",
    "正在检查存储使用情况…"
  ],
  "Данные хранятся в этом браузере. Очистка данных сайта удалит тетради и файлы. Уже открытый редактор продолжает локальную работу без сети; повторное открытие приложения без сети не гарантируется.": [
    "Data is stored in this browser. Clearing site data deletes notebooks and files. An open editor works locally offline; reopening the app offline is not guaranteed.",
    "数据保存在此浏览器中。清除网站数据将删除笔记本和文件。已打开的编辑器可离线使用，但不保证离线重新打开应用。"
  ],
  "Локальное хранение · без синхронизации": [
    "Local storage · no sync",
    "本地存储 · 不同步"
  ],
  "Подготовить резервную копию": [
    "Prepare backup",
    "准备备份"
  ],
  "Восстановить копию": [
    "Restore backup",
    "恢复备份"
  ],
  "Резервная копия содержит локальные тетради, источники, карточки и задачи. Скачай её перед очисткой браузера.": [
    "Backups include local notebooks, sources, cards and tasks. Download one before clearing browser data.",
    "备份包含本地笔记本、来源、卡片和任务。清除浏览器数据前请下载备份。"
  ],
  "Резервная копия": [
    "Backup",
    "备份"
  ],
  "Восстановить": [
    "Restore",
    "恢复"
  ],
  "Результаты и ошибки можно открыть в центре уведомлений. Push-уведомления, приглашения и фоновые напоминания не подключены.": [
    "Find results and errors in the notification center. Push notifications, invitations and background reminders are not connected.",
    "可在通知中心查看结果和错误。推送通知、邀请及后台提醒尚未连接。"
  ],
  "Центр уведомлений": [
    "Notification center",
    "通知中心"
  ],
  "Сервис не подключён": [
    "Service not connected",
    "服务未连接"
  ],
  "Сейчас используется локальный режим без аккаунта. Регистрация, вход и синхронизация требуют серверной службы.": [
    "You are using local mode without an account. Registration, login and sync require a server service.",
    "当前为无账户的本地模式。注册、登录和同步需要服务器服务。"
  ],
  "Тетради доступны в текущем профиле браузера. MFA, список устройств и серверные сессии недоступны без аккаунтов.": [
    "Notebooks are available in this browser profile. MFA, device lists and server sessions require accounts.",
    "笔记本保存在当前浏览器用户配置中。多因素认证、设备列表和服务器会话需要账户支持。"
  ],
  "Платных подписок и оплаты в приложении нет. Возможные лимиты AI задаются подключённым проектом Gemini.": [
    "There are no paid subscriptions or payments in the app. AI limits are set by the connected Gemini project.",
    "应用内没有付费订阅或支付。AI 限额由连接的 Gemini 项目决定。"
  ],
  "Настрой пространство под себя.": [
    "Make this space your own.",
    "按你的习惯设置空间。"
  ],
  "Использовано около": [
    "About",
    "已使用约"
  ],
  "МБ из": [
    "MB of",
    "MB / 共"
  ],
  "МБ доступной браузеру квоты.": [
    "MB of browser storage used.",
    "MB 浏览器存储配额。"
  ],
  "Браузер не сообщил размер хранилища.": [
    "The browser did not report storage capacity.",
    "浏览器未报告存储容量。"
  ],
  "Создай тетрадь, начни писать или добавь источник. Запись аудио не мешает заметкам. После обработки лекции материалы доступны в Студии и рядом с заметками.": [
    "Create a notebook, start writing or add a source. Record audio while taking notes. Processed lecture materials appear in Studio and alongside your notes.",
    "新建笔记本、开始书写或添加来源。录音时可同时记笔记。讲座处理后的资料可在工作室及笔记旁查看。"
  ],
  "Чтобы спросить ИИ, выбери текстовые источники. Кнопка цитаты открывает проверенный фрагмент; возвращение сохраняет разговор.": [
    "Select text sources to ask AI. Citation buttons open verified excerpts; returning keeps your conversation.",
    "选择文本来源后即可询问 AI。点击引用可打开核对过的片段，返回后对话仍会保留。"
  ],
  "PDF без текстового слоя требует OCR, который пока не подключён. Word и PowerPoint открываются как извлечённый текст, а не полноценный редактор исходных файлов.": [
    "PDFs without a text layer require OCR, which is not connected. Word and PowerPoint are shown as extracted text, not as fully editable original files.",
    "无文本层的 PDF 需要 OCR，目前尚未连接。Word 和 PowerPoint 以提取文本显示，不支持完整编辑原始文件。"
  ],
  "Сохраняй резервные копии. Статус «На этом устройстве» не означает облачную синхронизацию.": [
    "Keep backups. On this device does not mean cloud sync.",
    "请保留备份。“保存在此设备”不代表已同步到云端。"
  ],
  "Понятные действия, без скрытой автоматизации.": [
    "Clear actions, no hidden automation.",
    "操作清晰，没有隐藏的自动操作。"
  ],
  "Хранится на устройстве до восстановления или удаления вручную.": [
    "Stored on this device until restored or manually deleted.",
    "保存在此设备，直至恢复或手动删除。"
  ],
  "Страницы текущей тетради": [
    "Pages in the current notebook",
    "当前笔记本的页面"
  ],
  "Удалённые блоки": [
    "Deleted blocks",
    "已删除的内容块"
  ],
  "Удалено": [
    "Deleted",
    "已删除"
  ],
  "Удалить навсегда": [
    "Delete permanently",
    "永久删除"
  ],
  "Удалённых тетрадей нет.": [
    "No deleted notebooks.",
    "没有已删除的笔记本。"
  ],
  "Удалённых страниц нет.": [
    "No deleted pages.",
    "没有已删除的页面。"
  ],
  "Рисунок": [
    "Drawing",
    "绘图"
  ],
  "Текстовый блок": [
    "Text block",
    "文本块"
  ],
  "Удалённых блоков нет.": [
    "No deleted blocks.",
    "没有已删除的内容块。"
  ],
  "История тетради": [
    "Notebook history",
    "笔记本历史"
  ],
  "Снимки создаются по нажатию. Хранятся последние 10 версий; аудиофайлы не дублируются.": [
    "Snapshots are created on request. The latest 10 versions are kept; audio files are not duplicated.",
    "点击后创建快照。保留最近 10 个版本，不重复存储音频文件。"
  ],
  "Сохранить текущую версию": [
    "Save current version",
    "保存当前版本"
  ],
  "Посмотреть": [
    "Preview",
    "预览"
  ],
  "Сохранённых версий пока нет.": [
    "No saved versions yet.",
    "暂无保存的版本。"
  ],
  "Лекция": [
    "Lecture",
    "讲座"
  ],
  "материалов · выбор для ИИ отмечается отдельно": [
    "materials · select separately for AI",
    "份资料 · 需单独勾选以供 AI 使用"
  ],
  "Поиск источников": [
    "Search sources",
    "搜索来源"
  ],
  "Найти материал": [
    "Find material",
    "查找资料"
  ],
  "Тип источника": [
    "Source type",
    "来源类型"
  ],
  "Все типы": [
    "All types",
    "全部类型"
  ],
  "Ссылки": [
    "Links",
    "链接"
  ],
  "Записи": [
    "Recordings",
    "录音"
  ],
  "Добавить": [
    "Add",
    "添加"
  ],
  "Для ИИ": [
    "For AI",
    "供 AI 使用"
  ],
  "страниц / частей ·": [
    "pages / sections ·",
    "页 / 部分 ·"
  ],
  "версия": [
    "version",
    "版本"
  ],
  "локальная копия": [
    "local copy",
    "本地副本"
  ],
  "Готово": [
    "Ready",
    "已就绪"
  ],
  "Обработка": [
    "Processing",
    "处理中"
  ],
  "Ошибка — можно повторить": [
    "Error — retry available",
    "出错 — 可重试"
  ],
  "Требуется текст или OCR": [
    "Text or OCR required",
    "需要文本或 OCR"
  ],
  "Открыть": [
    "Open",
    "打开"
  ],
  "Добавь опору для своих идей": [
    "Give your ideas a foundation",
    "为想法添加依据"
  ],
  "Загрузи документ, вставь текст или обработай аудиозапись. Выбранные материалы будут доступны чату.": [
    "Upload a document, paste text or process a recording. Selected materials will be available in chat.",
    "上传文档、粘贴文本或处理录音。选中的资料可用于对话。"
  ],
  "Страница / часть": [
    "Page / section",
    "页 / 部分"
  ],
  "← Источники": [
    "← Sources",
    "← 资料来源"
  ],
  "Скачать оригинал": [
    "Download original",
    "下载原文件"
  ],
  "Выделить": [
    "Highlight",
    "高亮"
  ],
  "В заметки": [
    "Add to notes",
    "添加到笔记"
  ],
  "Объяснить": [
    "Explain",
    "解释"
  ],
  "Убрать выделения": [
    "Clear highlights",
    "清除高亮"
  ],
  "Текстовая версия страницы. Выделения сохраняются отдельно от PDF.": [
    "Text version of the page. Highlights are saved separately from the PDF.",
    "页面的文本版本。高亮内容与 PDF 分开保存。"
  ],
  "Извлечённый текст / локальный текст. Оформление исходного файла может отличаться.": [
    "Extracted or local text. Formatting may differ from the original.",
    "提取文本或本地文本，排版可能与原文件不同。"
  ],
  "Обработана только часть файла (до 60 страниц и 200 000 символов).": [
    "Only part of the file was processed (up to 60 pages and 200,000 characters).",
    "仅处理了部分文件（最多 60 页、200,000 字符）。"
  ],
  "Текст не извлечён. Для сканов нужен OCR. Можно добавить текст отдельным источником.": [
    "No text extracted. Scans require OCR. You can add text as a separate source.",
    "未提取到文本。扫描件需要 OCR。可将文本作为独立来源添加。"
  ],
  "Подготавливаю оригинал…": [
    "Preparing original…",
    "正在准备原文件…"
  ],
  "Открыть исходную ссылку": [
    "Open original link",
    "打开原始链接"
  ],
  "Оригинал PDF": [
    "Original PDF",
    "原始 PDF"
  ],
  "Если просмотр PDF не поддерживается браузером, скачай оригинал.": [
    "If your browser cannot display the PDF, download the original.",
    "若浏览器无法显示 PDF，请下载原文件。"
  ],
  "Файл": [
    "File",
    "文件"
  ],
  "Ссылка": [
    "Link",
    "链接"
  ],
  "Запись": [
    "Recording",
    "录音"
  ],
  "Веб-поиск": [
    "Web search",
    "网络搜索"
  ],
  "Ссылка на материал": [
    "Material link",
    "资料链接"
  ],
  "Текст страницы (для ответов ИИ)": [
    "Page text (for AI answers)",
    "网页文本（用于 AI 回答）"
  ],
  "Текст материала": [
    "Material text",
    "资料文本"
  ],
  "Страница по ссылке автоматически не скачивается. Вставь её текст, чтобы использовать в чате.": [
    "Linked pages are not downloaded automatically. Paste the page text to use it in chat.",
    "不会自动下载链接页面。请粘贴页面文本以用于对话。"
  ],
  "PDF, DOCX, PPTX, TXT, MD: до 10 МБ. Документы отправляются на сервер для извлечения текста; в Gemini — только при запросе ИИ.": [
    "PDF, DOCX, PPTX, TXT, MD: up to 10 MB. Documents go to the server for text extraction; they go to Gemini only when you ask AI.",
    "支持 PDF、DOCX、PPTX、TXT、MD，最大 10 MB。文档发送至服务器以提取文本；仅在询问 AI 时才发送至 Gemini。"
  ],
  "Нужна ссылка http:// или https://.": [
    "Use an http:// or https:// link.",
    "请使用 http:// 或 https:// 链接。"
  ],
  "Выбери непустой документ размером до 10 МБ.": [
    "Choose a non-empty document up to 10 MB.",
    "请选择非空且不超过 10 MB 的文档。"
  ],
  "Поддерживаются PDF, DOCX, PPTX, TXT и MD.": [
    "PDF, DOCX, PPTX, TXT and MD are supported.",
    "支持 PDF、DOCX、PPTX、TXT 和 MD。"
  ],
  "Заверши текущую запись или обработку и нажми «Повторить».": [
    "Finish the current recording or processing, then retry.",
    "请先结束当前录音或处理，然后重试。"
  ],
  "Файл недоступен в локальном хранилище. Импортируй его снова.": [
    "The file is missing from local storage. Import it again.",
    "本地存储中找不到文件，请重新导入。"
  ],
  "Не удалось прочитать файл. Проверь, что он не повреждён и не защищён паролем.": [
    "Could not read the file. Check that it is not corrupted or password-protected.",
    "无法读取文件，请确认文件未损坏且未设置密码。"
  ],
  "Источник готов:": [
    "Source ready:",
    "来源已就绪："
  ],
  "Не удалось открыть": [
    "Could not open",
    "无法打开"
  ],
  "Чат по источникам": [
    "Chat with sources",
    "基于资料对话"
  ],
  "выбрано · ответы только по материалам": [
    "selected · answers based only on materials",
    "份已选 · 仅基于资料回答"
  ],
  "Вопрос по источникам": [
    "Question about sources",
    "关于资料的问题"
  ],
  "Что хочешь понять?": [
    "What would you like to understand?",
    "你想了解什么？"
  ],
  "Выбрать источники": [
    "Select sources",
    "选择来源"
  ],
  "По источникам": [
    "From sources",
    "基于资料"
  ],
  "С веб-поиском": [
    "With web search",
    "使用网络搜索"
  ],
  "Новый разговор": [
    "New conversation",
    "新建对话"
  ],
  "Сначала — твои материалы": [
    "Start with your materials",
    "从你的资料开始"
  ],
  "Спроси о том, что важно понять. Цитаты помогут проверить ответ.": [
    "Ask about what matters. Citations help you check the answer.",
    "提出你想了解的问题，引用可帮助核对答案。"
  ],
  "Добавь текст или документ и отметь его «Для ИИ».": [
    "Add text or a document and mark it For AI.",
    "添加文本或文档，并勾选“供 AI 使用”。"
  ],
  "Объясни главные идеи простыми словами": [
    "Explain the main ideas in simple terms",
    "用简单的语言解释主要观点"
  ],
  "Какие вопросы остаются открытыми?": [
    "Which questions remain unanswered?",
    "还有哪些问题尚未解决？"
  ],
  "Сравни основные понятия": [
    "Compare the key concepts",
    "比较主要概念"
  ],
  "В Gemini отправятся выбранные тексты и вопрос.": [
    "Selected texts and your question will be sent to Gemini.",
    "选中的文本和问题将发送至 Gemini。"
  ],
  "Выбери хотя бы один источник.": [
    "Select at least one source.",
    "请至少选择一个来源。"
  ],
  "Остановить ожидание": [
    "Stop waiting",
    "停止等待"
  ],
  "Отправить": [
    "Send",
    "发送"
  ],
  "ТЫ": [
    "YOU",
    "你"
  ],
  "Читаю источники и проверяю цитаты…": [
    "Reading sources and checking citations…",
    "正在阅读资料并核对引用…"
  ],
  "Повторить вопрос": [
    "Retry question",
    "重新提问"
  ],
  "LECTRA · ПО ИСТОЧНИКАМ": [
    "LECTRA · FROM SOURCES",
    "LECTRA · 基于资料"
  ],
  "Источник": [
    "Source",
    "来源"
  ],
  "Для этого фрагмента нет подтверждённой цитаты.": [
    "There is no verified citation for this passage.",
    "此段落没有经过核对的引用。"
  ],
  "Копировать": [
    "Copy",
    "复制"
  ],
  "Проверить ответ": [
    "Check answer",
    "核对答案"
  ],
  "Для ответов по источникам нужно настроить ключ Gemini на сервере.": [
    "Configure a Gemini key on the server to get source-based answers.",
    "请在服务器上配置 Gemini 密钥，以获取基于资料的回答。"
  ],
  "Сначала заверши текущую запись или обработку.": [
    "Finish the current recording or processing first.",
    "请先完成当前录音或处理。"
  ],
  "Выбери готовые источники для ответа.": [
    "Select ready sources for the answer.",
    "请选择已就绪的来源。"
  ],
  "Выбранные тексты больше 100 000 символов. Выбери меньше источников.": [
    "Selected texts exceed 100,000 characters. Select fewer sources.",
    "所选文本超过 100,000 字符，请减少来源数量。"
  ],
  "Материал готов в Студии": [
    "Your material is ready in Studio",
    "资料已在工作室中就绪"
  ],
  "Ответ по источникам готов": [
    "Source-based answer ready",
    "基于资料的回答已完成"
  ],
  "Не удалось получить ответ. Повтори запрос.": [
    "Could not get an answer. Try again.",
    "未能获取回答，请重试。"
  ],
  "Ожидание остановлено. Сервер мог продолжить запрос; результат не добавлен.": [
    "Stopped waiting. The server may have continued the request; the result was not added.",
    "已停止等待。服务器可能仍在处理，但结果未添加。"
  ],
  "Конспект": [
    "Summary",
    "摘要"
  ],
  "Главное из лекции — в удобном порядке.": [
    "The key ideas from your lecture, organized.",
    "整理讲座的重点内容。"
  ],
  "Отчёт": [
    "Report",
    "报告"
  ],
  "Связный текст с цитатами из источников.": [
    "Connected prose with citations from your sources.",
    "包含来源引用的连贯报告。"
  ],
  "Карта источников": [
    "Source map",
    "来源图谱"
  ],
  "Посмотри, из чего состоит твой материал.": [
    "See how your material is organized.",
    "了解资料的组成。"
  ],
  "Вопрос на одной стороне, ответ — на другой.": [
    "A question on one side, an answer on the other.",
    "一面是问题，另一面是答案。"
  ],
  "Тест": [
    "Quiz",
    "测验"
  ],
  "Проверь, что удалось понять и запомнить.": [
    "Check what you understood and remembered.",
    "检查理解和记忆情况。"
  ],
  "Таблица терминов": [
    "Term table",
    "术语表"
  ],
  "Определения из лекции в одном месте.": [
    "Lecture definitions in one place.",
    "集中查看讲座中的定义。"
  ],
  "Презентация": [
    "Presentation",
    "演示文稿"
  ],
  "Слайды по лекции и скачивание PowerPoint.": [
    "Lecture slides with PowerPoint download.",
    "根据讲座生成幻灯片，可下载 PowerPoint。"
  ],
  "Инфографика": [
    "Infographic",
    "信息图"
  ],
  "Наглядное объяснение темы.": [
    "A visual explanation of the topic.",
    "用图形解释主题。"
  ],
  "Аудиообзор": [
    "Audio overview",
    "音频概览"
  ],
  "Повторение материала на слух.": [
    "Review by listening.",
    "通过聆听复习。"
  ],
  "Видеообзор": [
    "Video overview",
    "视频概览"
  ],
  "Объяснение в формате видео.": [
    "An explanation in video format.",
    "以视频形式解释。"
  ],
  "Нужна обработанная лекция": [
    "Process a lecture first",
    "请先处理讲座"
  ],
  "Нужен ключ AI": [
    "AI key required",
    "需要 AI 密钥"
  ],
  "Что поможет разобраться?": [
    "What would help you understand?",
    "哪种方式有助于理解？"
  ],
  "Выбери формат для своей лекции или источников.": [
    "Choose a format for your lecture or sources.",
    "为讲座或来源选择输出形式。"
  ],
  "Другие форматы": [
    "Other formats",
    "其他形式"
  ],
  "Пока не подключены": [
    "Not connected yet",
    "尚未连接"
  ],
  "Твои материалы": [
    "Your materials",
    "你的资料"
  ],
  "Собрать итоговый конспект": [
    "Combine into final notes",
    "合并为最终笔记"
  ],
  "Материалы лекции": [
    "Lecture materials",
    "讲座资料"
  ],
  "· ещё обрабатывается": [
    "· still processing",
    "· 仍在处理"
  ],
  "Здесь сохранятся созданные материалы": [
    "Created materials will appear here",
    "生成的资料将显示在这里"
  ],
  "Начни с формата выше. Свои заметки ты всегда найдёшь во вкладке «Заметки».": [
    "Start with a format above. Your own notes are always in the Notes tab.",
    "从上方选择一种形式。你的个人笔记始终保存在“笔记”标签中。"
  ],
  "Параметры лекции": [
    "Lecture settings",
    "讲座设置"
  ],
  "Тест создаётся вместе с материалами аудиолекции. Сначала обработай запись.": [
    "The quiz is created with audio lecture materials. Process a recording first.",
    "测验随音频讲座资料一同生成。请先处理录音。"
  ],
  "Определения лекции": [
    "Lecture definitions",
    "讲座定义"
  ],
  "Презентация появится после обработки аудиолекции.": [
    "The presentation will appear after processing the audio lecture.",
    "音频讲座处理完成后将生成演示文稿。"
  ],
  "Этот формат пока недоступен": [
    "This format is not available yet",
    "暂不支持此形式"
  ],
  "Генерация инфографики, аудио- и видеообзоров требует отдельной интеграции. Можно создать текстовый конспект, отчёт или карточки.": [
    "Infographics, audio and video overviews need separate integrations. You can create text summaries, reports or cards.",
    "信息图、音频和视频概览需要单独集成。现在可创建文字摘要、报告或卡片。"
  ],
  "Сначала выбери источники.": [
    "Select sources first.",
    "请先选择来源。"
  ],
  "Навигационная карта выбранных материалов, без генерации новых фактов.": [
    "A navigation map of selected materials, without generating new facts.",
    "为所选资料生成导航图，不生成新事实。"
  ],
  "Таблица доступна для определений обработанной лекции.": [
    "The table is available for definitions from a processed lecture.",
    "可为已处理讲座中的定义创建表格。"
  ],
  "Таблица понятий": [
    "Concept table",
    "概念表"
  ],
  "Понятие": [
    "Concept",
    "概念"
  ],
  "Определение": [
    "Definition",
    "定义"
  ],
  "По алфавиту. Источник — конспект лекции; точные построчные ссылки не возвращаются обработкой.": [
    "Sorted alphabetically. Based on the lecture summary; processing does not return exact line references.",
    "按字母顺序排列。基于讲座摘要，处理结果不包含精确行号引用。"
  ],
  "Создать материал": [
    "Create material",
    "创建资料"
  ],
  "Выбрано источников:": [
    "Sources selected:",
    "已选来源："
  ],
  ". Язык —": [
    ". Language:",
    "。语言："
  ],
  "Задание": [
    "Instructions",
    "要求"
  ],
  "Подготовь структурированный отчёт по выбранным источникам. Отдели факты от неясных вопросов.": [
    "Write a structured report based on the selected sources. Separate facts from unresolved questions.",
    "根据所选来源撰写结构化报告，区分事实与尚未明确的问题。"
  ],
  "Составь понятный конспект выбранных источников с ключевыми определениями.": [
    "Write clear notes based on the selected sources, including key definitions.",
    "根据所选来源编写清晰的笔记，包含关键定义。"
  ],
  "Предпросмотр содержания. Редактирование и история слайдов в приложении пока недоступны; скачанный PPTX можно править в редакторе презентаций.": [
    "Content preview. Slide editing and history are not available in the app; edit the downloaded PPTX in a presentation editor.",
    "内容预览。应用暂不支持幻灯片编辑及历史记录，可在演示文稿编辑器中修改下载的 PPTX。"
  ],
  "Скачать PowerPoint": [
    "Download PowerPoint",
    "下载 PowerPoint"
  ],
  "Новая колода": [
    "New deck",
    "新建卡片组"
  ],
  "Тетрадь уже хранится на этом устройстве. Повторное открытие самого приложения требует сети.": [
    "The notebook is already stored on this device. Reopening the app requires a network connection.",
    "笔记本已保存在此设备。重新打开应用需要网络连接。"
  ],
  "Переименовать / переместить": [
    "Rename / move",
    "重命名 / 移动"
  ],
  "Убрать из избранного": [
    "Remove from favorites",
    "取消收藏"
  ],
  "В избранное": [
    "Add to favorites",
    "添加收藏"
  ],
  "Вернуть из архива": [
    "Unarchive",
    "取消归档"
  ],
  "Архивировать": [
    "Archive",
    "归档"
  ],
  "Экспортировать JSON": [
    "Export JSON",
    "导出 JSON"
  ],
  "Команды": [
    "Commands",
    "命令"
  ],
  "Поиск по материалам": [
    "Search materials",
    "搜索资料"
  ],
  "Найти действие": [
    "Find an action",
    "查找操作"
  ],
  "Найти в тетрадях": [
    "Search notebooks",
    "搜索笔记本"
  ],
  "Начни вводить действие…": [
    "Start typing an action…",
    "输入操作名称…"
  ],
  "Название, фраза, понятие…": [
    "Title, phrase, concept…",
    "标题、词句、概念…"
  ],
  "Тетради, текст заметок, источники и расшифровки. Поиск рукописи без OCR пока недоступен.": [
    "Search notebooks, note text, sources and transcripts. Handwriting search requires OCR and is not available yet.",
    "搜索笔记本、笔记文本、来源和转录。手写搜索需要 OCR，目前尚不支持。"
  ],
  "Начать запись": [
    "Start recording",
    "开始录音"
  ],
  "Перейти в библиотеку": [
    "Go to library",
    "前往资料库"
  ],
  "Создать карточки": [
    "Create cards",
    "创建卡片"
  ],
  "Режим фокуса": [
    "Focus mode",
    "专注模式"
  ],
  "Заметка": [
    "Note",
    "笔记"
  ],
  "Расшифровка": [
    "Transcript",
    "转录"
  ],
  "Совпадений нет. Попробуй другую фразу.": [
    "No matches. Try another phrase.",
    "没有匹配结果，请尝试其他词句。"
  ],
  "Фрагмент добавлен в заметки.": [
    "Excerpt added to notes.",
    "片段已添加到笔记。"
  ],
  "Название предмета": [
    "Subject name",
    "科目名称"
  ],
  "Сначала выбери предмет.": [
    "Select a subject first.",
    "请先选择科目。"
  ],
  "Формат применён к тетрадям предмета.": [
    "Paper settings applied to this subject’s notebooks.",
    "纸张设置已应用到本科目的笔记本。"
  ],
  "Страницу заметок": [
    "Note page",
    "笔记页"
  ],
  "Импорт документа": [
    "Document import",
    "导入文档"
  ],
  "Запись лекции": [
    "Lecture recording",
    "讲座录音"
  ],
  "Колоду карточек": [
    "Card deck",
    "卡片组"
  ],
  "Задачу": [
    "Task",
    "任务"
  ],
  "Тетрадь перемещена в корзину. Её можно восстановить.": [
    "Notebook moved to trash. You can restore it.",
    "笔记本已移到回收站，可以恢复。"
  ],
  "Удалить «": [
    "Delete “",
    "永久删除“"
  ],
  "» навсегда? Заметки и страницы нельзя будет восстановить без резервной копии.": [
    "” permanently? Notes and pages cannot be recovered without a backup.",
    "”？没有备份将无法恢复笔记和页面。"
  ],
  "Новую тетрадь": [
    "New notebook",
    "新建笔记本"
  ],
  "Название и папка": [
    "Title and folder",
    "标题与文件夹"
  ],
  "Предмет / папка": [
    "Subject / folder",
    "科目 / 文件夹"
  ],
  "О тетради": [
    "About this notebook",
    "关于此笔记本"
  ],
  "Описание": [
    "Description",
    "描述"
  ],
  "Теги через запятую": [
    "Tags, separated by commas",
    "标签，以逗号分隔"
  ],
  "Название страницы": [
    "Page title",
    "页面标题"
  ],
  "Переименовать": [
    "Rename",
    "重命名"
  ],
  "Страница в корзине. Восстановление доступно в разделе «Корзина».": [
    "Page moved to trash. Restore it from Trash.",
    "页面已移到回收站，可在回收站中恢复。"
  ],
  "Сначала восстанови страницу этого блока.": [
    "Restore this block’s page first.",
    "请先恢复此内容块所在的页面。"
  ],
  "Версия": [
    "Version",
    "版本"
  ],
  "Текстовый предпросмотр. Рисунки сохраняются в снимке и восстанавливаются вместе со страницами.": [
    "Text preview. Drawings are included in the snapshot and restored with the pages.",
    "文本预览。绘图包含在快照中，会随页面一起恢复。"
  ],
  "[Редактируемый рисунок]": [
    "[Editable drawing]",
    "[可编辑绘图]"
  ],
  "Восстановить как новую версию": [
    "Restore as a new version",
    "恢复为新版本"
  ],
  "Доступ к тетради": [
    "Notebook access",
    "笔记本访问权限"
  ],
  "Приватно: только этот профиль браузера. Приглашения, роли «читать / комментировать / редактировать» и ссылки доступа требуют серверной авторизации. Можно вручную передать экспортированный файл.": [
    "Private to this browser profile. Invitations, read/comment/edit roles and access links require server authentication. You can share an exported file manually.",
    "仅当前浏览器用户配置可访问。邀请、阅读/评论/编辑角色及访问链接需要服务器身份认证。可手动分享导出的文件。"
  ],
  "Публикация": [
    "Publication",
    "发布"
  ],
  "Публикация и комнаты не подключены. Перед их запуском нужны аккаунты, лицензии, предпросмотр раскрываемых данных, жалобы и модерация. Источники и аудио сейчас никуда публично не отправляются.": [
    "Publishing and rooms are not connected. They need accounts, licensing, data previews, reporting and moderation. Sources and audio are not currently published anywhere.",
    "发布及房间功能尚未连接，需要账户、许可、数据预览、举报及审核支持。目前不会公开发布来源或音频。"
  ],
  "Подключённое хранилище": [
    "Connected storage",
    "已连接存储"
  ],
  "Облачные диски пока не подключены. Можно выбрать файл с устройства.": [
    "Cloud drives are not connected yet. Choose a file from your device.",
    "云盘尚未连接，请从设备选择文件。"
  ],
  "Чат сейчас работает только с выбранными источниками. Поиск по интернету не подключён; добавь ссылку и текст страницы вручную.": [
    "Chat currently uses selected sources only. Web search is not connected; add a link and page text manually.",
    "对话目前仅使用选中的来源。网络搜索尚未连接，请手动添加链接及页面文本。"
  ],
  "Пока нет уведомлений": [
    "No notifications yet",
    "暂无通知"
  ],
  "Здесь будут результаты обработки и ошибки.": [
    "Processing results and errors will appear here.",
    "处理结果和错误将显示在这里。"
  ],
  "Источник скрыт. Его текст сохранён для ранее созданных цитат.": [
    "Source hidden. Its text is kept for existing citations.",
    "来源已隐藏，文本仍保留以供已有引用使用。"
  ],
  "Сначала выдели текст на странице.": [
    "Select text on the page first.",
    "请先选择页面中的文本。"
  ],
  "Для расшифровки используй вставку в заметки.": [
    "Use Add to notes for the transcript.",
    "请使用“添加到笔记”插入转录内容。"
  ],
  "Выдели фрагмент текста.": [
    "Select a text excerpt.",
    "请选择文本片段。"
  ],
  "Выдели фрагмент для карточки.": [
    "Select an excerpt for the card.",
    "请选择用于卡片的片段。"
  ],
  "Источник:": [
    "Source:",
    "来源："
  ],
  "Выдели фрагмент для объяснения.": [
    "Select an excerpt to explain.",
    "请选择需要解释的片段。"
  ],
  "Объясни этот фрагмент:": [
    "Explain this excerpt:",
    "解释此片段："
  ],
  "Сначала останови ожидание ответа.": [
    "Stop waiting for the answer first.",
    "请先停止等待回答。"
  ],
  "История разговоров": [
    "Conversation history",
    "对话历史"
  ],
  "Разговор": [
    "Conversation",
    "对话"
  ],
  "Предыдущих разговоров нет.": [
    "No previous conversations.",
    "没有历史对话。"
  ],
  "Проверить источник": [
    "Check source",
    "核对来源"
  ],
  "· страница / часть": [
    "· page / section",
    "· 页 / 部分"
  ],
  "Точная цитата проверена по тексту, отправленному с вопросом. Это не заменяет проверку смысла ответа.": [
    "The exact quote was checked against the text sent with your question. You should still check the meaning of the answer.",
    "已将引用与提问时发送的文本进行精确核对，但仍需检查回答的含义。"
  ],
  "К странице": [
    "Go to page",
    "前往页面"
  ],
  "Вернуться в чат": [
    "Back to chat",
    "返回对话"
  ],
  "Ответ скопирован.": [
    "Answer copied.",
    "回答已复制。"
  ],
  "Ответ по источникам": [
    "Source-based answer",
    "基于资料的回答"
  ],
  "Проверка ответа": [
    "Answer check",
    "核对回答"
  ],
  "Сравни ответ с цитатами. Внешняя отправка жалоб не подключена; исправление можно сохранить в личных заметках.": [
    "Compare the answer with its citations. External reporting is not connected; save corrections in your own notes.",
    "请将回答与引用进行比较。外部举报功能尚未连接，可在个人笔记中保存修正内容。"
  ],
  "Скачать текст": [
    "Download text",
    "下载文本"
  ],
  "Карточки тетради": [
    "Notebook cards",
    "笔记本卡片"
  ],
  "Разделы приложения": [
    "App sections",
    "应用栏目"
  ],
  "Найти в материалах": [
    "Find in materials",
    "在资料中查找"
  ],
  "Поиск": [
    "Search",
    "搜索"
  ],
  "Разделы тетради": [
    "Notebook sections",
    "笔记本栏目"
  ],
  "Основная навигация": [
    "Main navigation",
    "主导航"
  ],
  "Ещё": [
    "More",
    "更多"
  ],
  "Выйти из фокуса": [
    "Exit focus",
    "退出专注"
  ],
  "Не удалось выполнить действие. Повтори попытку.": [
    "Could not complete the action. Try again.",
    "无法完成操作，请重试。"
  ],
  "Поиск не запустился. Обнови страницу.": [
    "Search did not start. Reload the page.",
    "搜索未能启动，请刷新页面。"
  ],
  "Нет сети. Можно продолжать писать; AI и импорт с обработкой на сервере временно недоступны.": [
    "You are offline. You can keep writing; AI and server-based imports are temporarily unavailable.",
    "当前离线。可以继续书写，但 AI 及需要服务器处理的导入暂不可用。"
  ],
  "Не удалось открыть пространство.": [
    "Could not open the workspace.",
    "无法打开工作空间。"
  ],
  "Блок перемещён в корзину.": [
    "Block moved to trash.",
    "内容块已移到回收站。"
  ],
  "Отменить": [
    "Undo",
    "撤销"
  ],
  "Листов:": [
    "Sheets:",
    "纸张数："
  ],
  "Формат листа": [
    "Paper size",
    "纸张大小"
  ],
  "Разлиновка": [
    "Paper ruling",
    "纸张格线"
  ],
  "Листы добавляются автоматически по мере ввода. Текст остаётся непрерывным, чтобы переход между листами не мешал печатать.": [
    "Sheets are added automatically as you type. Text stays continuous so page boundaries never interrupt writing.",
    "书写时自动增加纸张。文本保持连续，不会因翻页而中断输入。"
  ],
  "Чистый": [
    "Blank",
    "空白"
  ],
  "Линейка": [
    "Ruled",
    "横线"
  ],
  "Клетка": [
    "Grid",
    "方格"
  ],
  "Точки": [
    "Dots",
    "点阵"
  ],
  "Файл должен быть не больше 10 МБ.": [
    "Files must be no larger than 10 MB.",
    "文件不得超过 10 MB。"
  ],
  "Файл в тетради": [
    "File in notebook",
    "笔记本中的文件"
  ],
  "Файл недоступен. Восстанови резервную копию.": [
    "File unavailable. Restore a backup.",
    "文件不可用，请恢复备份。"
  ],
  "Скачать": [
    "Download",
    "下载"
  ],
  "Открыть PDF": [
    "Open PDF",
    "打开 PDF"
  ],
  "Открыть в источниках": [
    "Open in sources",
    "在来源中打开"
  ],
  "Настроить лист": [
    "Paper settings",
    "纸张设置"
  ],
  "Изображение": [
    "Image",
    "图片"
  ],
  "Файл / презентация": [
    "File / presentation",
    "文件 / 演示文稿"
  ],
  "Экран удерживается включённым": [
    "Keeping the screen awake",
    "保持屏幕常亮"
  ],
  "Не блокируй экран и держи вкладку открытой во время записи.": [
    "Keep the screen unlocked and the tab open while recording.",
    "录音时请保持屏幕解锁，并打开此标签页。"
  ]
};
 Object.assign(catalog,{
  'К заметкам':['Skip to notes','跳转到笔记'],
  'Закрыть навигацию':['Close navigation','关闭导航'],
  'Учебный блокнот':['Study notebook','学习笔记本'],
  'Стиль текста':['Text style','文字样式'],
  'Заголовок':['Heading','标题'],
  'Подзаголовок':['Subheading','副标题'],
  'Передача аудио':['Audio transfer','音频传输'],
  'Дополнительное форматирование':['More formatting','更多格式'],
  'Представление конспекта':['Note layout','笔记布局'],
  'Ширина панелей':['Panel width','面板宽度'],
  'Не выключать экран':['Keep screen awake','保持屏幕常亮'],
  'Остановить после текущей части':['Stop after this part','本部分完成后停止'],
  'Готово частей: ':['Parts ready: ','已完成部分：'],
  ' · текст доступен в материалах. Продолжаю…':[' · text is available in materials. Continuing…',' · 文本已在资料中显示。正在继续…'],
  'Обработка остановлена. Готовые части сохранены; нажми «Создать материалы», чтобы продолжить.':['Processing stopped. Completed parts are saved; choose Create materials to continue.','处理已停止。已完成的部分已保存，请选择创建资料以继续。'],
  'Завершаю текущую часть и сохраняю результат…':['Finishing this part and saving the result…','正在完成当前部分并保存结果…']
 });
 const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const pattern=new RegExp(Object.keys(catalog).sort((a,b)=>b.length-a.length).map(escape).join('|'),'g');
 function literal(value){const language=localStorage.getItem('lectra-ui')||'ru';if(language==='ru')return value;return value.replace(pattern,key=>catalog[key][language==='zh'?1:0]);}
 return {literal};
})();
