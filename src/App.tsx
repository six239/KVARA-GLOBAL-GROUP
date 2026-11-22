import { useState } from "react";
import { Sparkles, FolderOpen, WandSparkles, LifeBuoy, BrainCircuit, Settings, Globe2, ArrowUpRight, Plus, Menu, ChevronDown, Image as ImageIcon, Home, Video, Upload, Download, RotateCw, Info } from "lucide-react";

type Lang = "en" | "ka" | "ru";
type Section = "webora" | "projects" | "upgrader" | "help" | "kvara" | "settings" | "about";

const copy = {
  en: {
    tagline: "One group. A world of ideas.", appDownload: "Download Android app", welcome: "Build something remarkable.", sub: "Your workspace for creating, managing and improving websites.",
    webora: "Webora AI", projects: "My Projects", upgrader: "Website Upgrader", help: "Help Center", kvara: "Kvara AI", settings: "Settings", about: "About",
    start: "Start building", prompt: "Describe the website you want to create…", generate: "Generate website",
    projectsTitle: "Your projects", projectsSub: "Websites you create will appear here automatically.",
    upgradeTitle: "Make your existing website better", upgradeSub: "Enter a public website URL to begin an upgrade analysis.",
    analyze: "Analyze website", helpTitle: "How can we help?", helpSub: "Find clear, step-by-step guidance for using Kvara Global Group.",
    kvaraTitle: "Kvara AI", kvaraSub: "Your AI assistant, available as a separate product area.",
    settingsTitle: "Preferences", language: "Language", coming: "This workspace is being built. This feature is not connected yet.",
    noProjects: "No projects yet", noProjectsSub: "Create your first website with Webora AI."
  },
  ka: {
    tagline: "ერთი ჯგუფი. იდეების მთელი სამყარო.", appDownload: "Android აპის ჩამოტვირთვა", welcome: "შექმენი რაღაც გამორჩეული.", sub: "სამუშაო სივრცე ვებსაიტების შესაქმნელად, სამართავად და გასაუმჯობესებლად.",
    webora: "Webora AI", projects: "ჩემი პროექტები", upgrader: "ვებსაიტის გაუმჯობესება", help: "დახმარების ცენტრი", kvara: "Kvara AI", settings: "პარამეტრები", about: "შესახებ",
    start: "შექმნის დაწყება", prompt: "აღწერე, როგორი ვებსაიტის შექმნა გინდა…", generate: "ვებსაიტის შექმნა",
    projectsTitle: "შენი პროექტები", projectsSub: "შენ მიერ შექმნილი ვებსაიტები აქ ავტომატურად გამოჩნდება.",
    upgradeTitle: "გააუმჯობესე არსებული ვებსაიტი", upgradeSub: "ანალიზის დასაწყებად შეიყვანე საჯარო ვებსაიტის ბმული.",
    analyze: "ვებსაიტის ანალიზი", helpTitle: "როგორ დაგეხმაროთ?", helpSub: "იპოვე მარტივი, ეტაპობრივი ინსტრუქციები Kvara Global Group-ისთვის.",
    kvaraTitle: "Kvara AI", kvaraSub: "შენი AI ასისტენტი, როგორც ცალკე პროდუქტი.",
    settingsTitle: "პარამეტრები", language: "ენა", coming: "სამუშაო სივრცე ჯერ შენდება. ეს ფუნქცია ჯერ დაკავშირებული არ არის.",
    noProjects: "პროექტები ჯერ არ არის", noProjectsSub: "შექმენი პირველი ვებსაიტი Webora AI-ით."
  },
  ru: {
    tagline: "Одна группа. Мир идей.", appDownload: "Скачать приложение Android", welcome: "Создайте нечто выдающееся.", sub: "Рабочее пространство для создания, управления и улучшения сайтов.",
    webora: "Webora AI", projects: "Мои проекты", upgrader: "Улучшение сайта", help: "Центр помощи", kvara: "Kvara AI", settings: "Настройки", about: "О приложении",
    start: "Начать создание", prompt: "Опишите сайт, который хотите создать…", generate: "Создать сайт",
    projectsTitle: "Ваши проекты", projectsSub: "Созданные вами сайты будут автоматически появляться здесь.",
    upgradeTitle: "Улучшите существующий сайт", upgradeSub: "Введите общедоступный URL сайта, чтобы начать анализ.",
    analyze: "Анализировать сайт", helpTitle: "Чем мы можем помочь?", helpSub: "Понятные пошаговые инструкции по Kvara Global Group.",
    kvaraTitle: "Kvara AI", kvaraSub: "Ваш ИИ-помощник как отдельный продукт.",
    settingsTitle: "Настройки", language: "Язык", coming: "Рабочее пространство создаётся. Эта функция пока не подключена.",
    noProjects: "Пока нет проектов", noProjectsSub: "Создайте свой первый сайт с Webora AI."
  }
};

const nav = [
  ["webora", Sparkles], ["projects", FolderOpen], ["upgrader", WandSparkles],
  ["help", LifeBuoy], ["kvara", BrainCircuit], ["settings", Settings], ["about", Info]
] as const;

const helpGuides = {
  en: [
    { id: "start", title: "Getting started with Webora AI", summary: "Create your first website from a written idea.", steps: ["Open Webora AI from the left navigation. This is the main website builder.", "Describe the website you want. Include its purpose, audience, pages, colors, and style.", "Select Generate website and wait while the AI prepares your site.", "Review the live preview. If you want a different result, make your prompt more specific and generate again.", "Select Download HTML to save a standalone website file to your device."] },
    { id: "prompts", title: "Writing a good website prompt", summary: "Clear requirements usually produce a more useful first draft.", steps: ["Start with the type of website, such as a portfolio, business page, restaurant site, or product landing page.", "Describe the sections you need, for example Home, About, Services, Gallery, and Contact.", "Specify colors, visual style, and whether the layout should feel minimal, bold, elegant, or playful.", "Mention important content and features. Do not include passwords, private information, or real customer data.", "Generate the site, review it, then refine the prompt with the changes you want."] },
    { id: "projects", title: "Finding your saved projects", summary: "Generated sites are saved in this browser on this device.", steps: ["Generate a website in Webora AI.", "Open My Projects in the left navigation.", "Choose Open project to load a saved website back into the preview.", "Choose Download HTML to export a copy. Clearing this browser's site data may remove locally saved projects, so keep your downloads."] },
    { id: "publish", title: "Downloading and publishing a website", summary: "Export your generated website before putting it online.", steps: ["Open the website in Webora AI or My Projects.", "Select Download HTML and save the file.", "Open the downloaded file on your device to check the page locally.", "To publish it, upload the HTML file to a web-hosting service that supports static websites.", "Connect a domain through your hosting provider if you own one. Kvara Global Group does not publish the site automatically yet."] },
    { id: "trouble", title: "Troubleshooting generation", summary: "Try these checks if a website does not generate.", steps: ["Check that your prompt is not empty and clearly describes the website.", "Check your internet connection and try again.", "If the prompt is very long, shorten it and generate again.", "If an error appears, note the exact message and try again later.", "If generation repeatedly fails, contact support with the error text. Do not send passwords or secret keys."] }
  ],
  ka: [
    { id: "start", title: "Webora AI-ის დაწყება", summary: "შექმენი პირველი ვებსაიტი ტექსტური აღწერით.", steps: ["მარცხენა მენიუში გახსენი Webora AI — ეს არის ვებსაიტების მთავარი კონსტრუქტორი.", "აღწერე სასურველი ვებსაიტი: მიზანი, აუდიტორია, გვერდები, ფერები და სტილი.", "დააჭირე „ვებსაიტის შექმნას“ და დაელოდე გენერაციის დასრულებას.", "გადახედე ცოცხალ წინასწარ ხედს. თუ შედეგის შეცვლა გინდა, უფრო დეტალურად აღწერე მოთხოვნა და თავიდან შექმენი.", "დააჭირე HTML-ის ჩამოტვირთვას, რათა ვებსაიტის ფაილი მოწყობილობაზე შეინახო."] },
    { id: "prompts", title: "კარგი მოთხოვნის დაწერა", summary: "ზუსტი აღწერა უკეთეს საწყის შედეგს იძლევა.", steps: ["დაიწყე ვებსაიტის ტიპით: პორტფოლიო, ბიზნესგვერდი, რესტორანი ან პროდუქტის გვერდი.", "ჩამოთვალე საჭირო სექციები, მაგალითად მთავარი, ჩვენ შესახებ, სერვისები და კონტაქტი.", "აღწერე ფერები და ვიზუალური სტილი — მინიმალისტური, მკვეთრი, ელეგანტური თუ მხიარული.", "მიუთითე მნიშვნელოვანი ტექსტი და ფუნქციები. არ ჩაწერო პაროლები ან პირადი მონაცემები.", "შექმენი ვებსაიტი, გადახედე და შემდეგ მოთხოვნაში მიუთითე შესაცვლელი დეტალები."] },
    { id: "projects", title: "შენახული პროექტების პოვნა", summary: "შექმნილი ვებსაიტები ამ ბრაუზერში და მოწყობილობაზე ინახება.", steps: ["შექმენი ვებსაიტი Webora AI-ში.", "მარცხენა მენიუში გახსენი „ჩემი პროექტები“.", "„პროექტის გახსნით“ დააბრუნე შენახული ვებსაიტი წინასწარ ხედში.", "HTML-ის ჩამოტვირთვით შეინახე ასლი. ბრაუზერის მონაცემების გასუფთავებამ შეიძლება ადგილობრივი პროექტები წაშალოს."] },
    { id: "publish", title: "ვებსაიტის ჩამოტვირთვა და გამოქვეყნება", summary: "ონლაინ განთავსებამდე ჩამოტვირთე შექმნილი ვებსაიტი.", steps: ["გახსენი ვებსაიტი Webora AI-ში ან „ჩემს პროექტებში“.", "დააჭირე HTML-ის ჩამოტვირთვას და შეინახე ფაილი.", "გახსენი ჩამოტვირთული ფაილი და გადაამოწმე გვერდი.", "გამოსაქვეყნებლად ატვირთე HTML ფაილი ჰოსტინგის სერვისში, რომელიც სტატიკურ ვებსაიტებს უჭერს მხარს.", "თუ საკუთარი დომენი გაქვს, დააკავშირე ის ჰოსტინგის პროვაიდერის პარამეტრებიდან. საიტი ავტომატურად ჯერ არ ქვეყნდება."] },
    { id: "trouble", title: "გენერაციის პრობლემების მოგვარება", summary: "თუ ვებსაიტი არ იქმნება, შეამოწმე ეს ნაბიჯები.", steps: ["დარწმუნდი, რომ მოთხოვნა ცარიელი არ არის და ნათლად აღწერს ვებსაიტს.", "შეამოწმე ინტერნეტი და სცადე ხელახლა.", "თუ მოთხოვნა ძალიან გრძელია, შეამოკლე.", "თუ შეცდომა გამოჩნდა, ჩაინიშნე ზუსტი ტექსტი და მოგვიანებით სცადე.", "თუ პრობლემა მეორდება, მხარდაჭერას გაუგზავნე შეცდომის ტექსტი. პაროლები და საიდუმლო გასაღებები არ გააზიარო."] }
  ],
  ru: [
    { id: "start", title: "Начало работы с Webora AI", summary: "Создайте первый сайт по текстовому описанию.", steps: ["Откройте Webora AI в левой панели — это основной конструктор сайтов.", "Опишите сайт: его назначение, аудиторию, страницы, цвета и стиль.", "Нажмите «Создать сайт» и дождитесь завершения генерации.", "Проверьте предварительный просмотр. Чтобы изменить результат, уточните запрос и запустите генерацию снова.", "Нажмите «Скачать HTML», чтобы сохранить файл сайта на устройстве."] },
    { id: "prompts", title: "Как составить хороший запрос", summary: "Чёткие требования помогают получить более полезный результат.", steps: ["Укажите тип сайта: портфолио, бизнес-сайт, ресторан или страница продукта.", "Перечислите нужные разделы: Главная, О нас, Услуги, Галерея и Контакты.", "Опишите цвета и стиль: минималистичный, яркий, элегантный или игривый.", "Укажите нужный контент и функции. Не добавляйте пароли и личные данные.", "Создайте сайт, проверьте его и уточните запрос для следующих изменений."] },
    { id: "projects", title: "Поиск сохранённых проектов", summary: "Созданные сайты сохраняются в этом браузере на этом устройстве.", steps: ["Создайте сайт в Webora AI.", "Откройте «Мои проекты» в левой панели.", "Нажмите «Открыть проект», чтобы вернуть сайт в предварительный просмотр.", "Нажмите «Скачать HTML», чтобы сохранить копию. Очистка данных браузера может удалить локальные проекты."] },
    { id: "publish", title: "Скачивание и публикация сайта", summary: "Сначала экспортируйте созданный сайт.", steps: ["Откройте сайт в Webora AI или разделе «Мои проекты».", "Нажмите «Скачать HTML» и сохраните файл.", "Откройте скачанный файл и проверьте страницу на устройстве.", "Для публикации загрузите HTML-файл на хостинг, поддерживающий статические сайты.", "Если у вас есть домен, подключите его в настройках хостинг-провайдера. Автоматическая публикация пока не поддерживается."] },
    { id: "trouble", title: "Решение проблем с генерацией", summary: "Если сайт не создаётся, выполните эти проверки.", steps: ["Убедитесь, что запрос не пустой и ясно описывает сайт.", "Проверьте подключение к интернету и повторите попытку.", "Если запрос слишком длинный, сократите его.", "Если появилась ошибка, сохраните её точный текст и попробуйте позже.", "Если проблема повторяется, обратитесь в поддержку с текстом ошибки. Не отправляйте пароли и секретные ключи."] }
  ]
} as Record<Lang, Array<{ id: string; title: string; summary: string; steps: string[] }>>;

export default function App() {
  const [lang, setLang] = useState<Lang>(() => { const saved = localStorage.getItem("kvara-language"); return saved === "ka" || saved === "ru" ? saved : "en"; });
  const [section, setSection] = useState<Section>("webora");
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [projects, setProjects] = useState<Array<{ id: string; title: string; html: string; createdAt: string }>>(() => {
    try { const saved = JSON.parse(localStorage.getItem("webora-projects") || "[]"); return Array.isArray(saved) ? saved : []; } catch { return []; }
  });
  const [helpGuide, setHelpGuide] = useState("start");
  const [helpStep, setHelpStep] = useState(0);
  const [kvaraView, setKvaraView] = useState<"home" | "image" | "video">("home");
  const [imageView, setImageView] = useState<"creator" | "people" | "editor">("creator");
  const [videoView, setVideoView] = useState<"animate" | "generate">("animate");
  const [videoPrompt, setVideoPrompt] = useState("");
  const [animateImageName, setAnimateImageName] = useState("");
  const [animateImagePreview, setAnimateImagePreview] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState("5");
  const [videoRatio, setVideoRatio] = useState("16:9");
  const [imagePrompt, setImagePrompt] = useState("");
  const [personOneName, setPersonOneName] = useState("");
  const [personTwoName, setPersonTwoName] = useState("");
  const [kvaraMenuOpen, setKvaraMenuOpen] = useState(false);
  const [editImage, setEditImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  function downloadEditedImage() {
    if (!editImage) return;
    const img = new Image();
    img.onload = () => {
      const sideways = rotation % 180 !== 0;
      const canvas = document.createElement("canvas");
      canvas.width = sideways ? img.height : img.width;
      canvas.height = sideways ? img.width : img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      const a = document.createElement("a"); a.download = "kvara-edited-image.png"; a.href = canvas.toDataURL("image/png"); a.click();
    };
    img.src = editImage;
  }
  const [sidebar, setSidebar] = useState(() => window.innerWidth > 560);
  const t = copy[lang];

  function changeLanguage(next: Lang) { setLang(next); localStorage.setItem("kvara-language", next); }

  async function generateWebsite() {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setGenerationError("");
    setGeneratedHtml("");
    try {
      const response = await fetch("/api/generate-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), language: lang })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Generation failed (${response.status})`);
      if (typeof data.html !== "string" || !data.html.includes("<")) throw new Error("The generator returned an invalid website. Please try again.");
      const title = String(data.title || data.html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] || prompt.trim().slice(0, 48));
      setGeneratedHtml(data.html);
      setGeneratedTitle(title);
      const project = { id: String(Date.now()), title, html: data.html, createdAt: new Date().toISOString() };
      const updated = [project, ...projects].slice(0, 30);
      setProjects(updated);
      localStorage.setItem("webora-projects", JSON.stringify(updated));
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  function downloadWebsite(html: string, title: string) {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "webora-website"}.html`;
    link.click();
    URL.revokeObjectURL(objectUrl);
  }

  function openProject(project: { title: string; html: string }) {
    setGeneratedTitle(project.title);
    setGeneratedHtml(project.html);
    navigate("webora");
  }

  const guides = helpGuides[lang];
  const activeGuide = guides.find(guide => guide.id === helpGuide) || guides[0];

  function navigate(next: Section) { setSection(next); if (window.innerWidth <= 560) setSidebar(false); }

  return <div className={`shell flag-bg-${lang}`}>
    <svg className="visual-filters" aria-hidden="true" focusable="false">
      <filter id="flag-wave" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.025" numOctaves="2" seed="4" result="noise">
          <animate attributeName="baseFrequency" dur="9s" values="0.008 0.025;0.012 0.035;0.008 0.025" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="17" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
    <aside className={sidebar ? "sidebar" : "sidebar collapsed"}>
      <button className="sidebar-edge-toggle" onClick={() => setSidebar(!sidebar)} aria-label={sidebar ? "Collapse sidebar" : "Expand sidebar"} title={sidebar ? "Collapse sidebar" : "Expand sidebar"}><span>{sidebar ? "‹" : "›"}</span></button>
      <div className="brand"><div className="brand-mark">K</div><div><b>KVARA</b><span>GLOBAL GROUP</span></div></div>
      <button className="new-project" title={t.start} onClick={() => navigate("webora")}><Plus size={17}/>{t.start}</button>
      <div className="nav-label">WORKSPACE</div>
      <nav>{nav.map(([key, Icon]) => <button key={key} title={t[key]} className={section === key ? "nav-item active" : "nav-item"} onClick={() => navigate(key as Section)}><Icon size={18}/><span>{t[key]}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="status-dot"/> All systems in development</div>
    </aside>
    <main className="main">
      <header className="topbar">
        <button className="icon-button mobile-menu" onClick={() => setSidebar(!sidebar)} aria-label="Toggle menu"><Menu size={20}/></button>
        <div className="crumb">Kvara Global <span>/</span> {t[section]}</div>
        <div className="top-actions"><span className="free-access-label">FREE FOR EVERYONE</span><Globe2 size={16}/><select value={lang} onChange={e => changeLanguage(e.target.value as Lang)} aria-label="Language"><option value="en">English</option><option value="ka">ქართული</option><option value="ru">Русский</option></select><div className="avatar">K</div></div>
      </header>
      <div className="content">
        {section === "webora" && <section className="hero">
          <div className="eyebrow"><Sparkles size={14}/> AI WEBSITE STUDIO</div>
          <h1>{t.welcome}</h1><p className="subtitle">{t.sub}</p><a className="primary app-download-cta" href="https://github.com/six239/KVARA-GLOBAL-GROUP/releases/latest/download/Kvara-Global-Group.apk"><Download size={17}/>{t.appDownload}</a>
          <div className="builder-card">
            <div className="builder-head"><div className="orb"><WandSparkles size={20}/></div><div><b>{t.webora}</b><small>Turn your idea into a website</small></div><span className="pill">STUDIO</span></div>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={t.prompt}/>
            <div className="builder-foot"><span>Be as specific as you like</span><button className="primary" onClick={generateWebsite} disabled={!prompt.trim() || isGenerating}>{isGenerating ? (lang === "ka" ? "იქმნება..." : lang === "ru" ? "Создание..." : "Generating...") : t.generate}<ArrowUpRight size={16}/></button></div>
          </div>
          {generationError && <div className="generation-error" role="alert">{generationError}</div>}
          {generatedHtml && <div className="generated-result"><div className="generated-result-head"><div><b>{generatedTitle}</b><span>{lang === "ka" ? "შექმნილი ვებსაიტის წინასწარი ხედი" : lang === "ru" ? "Предварительный просмотр сайта" : "Generated website preview"}</span></div><button className="primary" onClick={() => downloadWebsite(generatedHtml, generatedTitle)}><Download size={16}/>{lang === "ka" ? "HTML-ის ჩამოტვირთვა" : lang === "ru" ? "Скачать HTML" : "Download HTML"}</button></div><iframe className="website-preview" title={generatedTitle} srcDoc={generatedHtml} sandbox="allow-scripts" /></div>}
          <div className="feature-grid"><article><span className="feature-icon"><FolderOpen/></span><b>{t.projects}</b><p>Keep your generated websites organized.</p></article><article><span className="feature-icon"><WandSparkles/></span><b>{t.upgrader}</b><p>Review and improve an existing website.</p></article><article><span className="feature-icon"><BrainCircuit/></span><b>{t.kvara}</b><p>Your AI assistant in its own space.</p></article></div>
        </section>}
        {section === "projects" && <section className="page"><div className="eyebrow">WORKSPACE</div><h1>{t.projectsTitle}</h1><p className="subtitle">{t.projectsSub}</p>{projects.length === 0 ? <div className="empty-state"><FolderOpen size={30}/><b>{t.noProjects}</b><p>{t.noProjectsSub}</p><button className="primary" onClick={() => navigate("webora")}>{t.start}</button></div> : <div className="projects-grid">{projects.map(project => <article className="project-card" key={project.id}><div className="project-card-icon"><FolderOpen size={20}/></div><b>{project.title}</b><small>{new Date(project.createdAt).toLocaleDateString()}</small><div className="project-card-actions"><button className="secondary" onClick={() => openProject(project)}>{lang === "ka" ? "გახსნა" : lang === "ru" ? "Открыть" : "Open project"}</button><button className="secondary" onClick={() => downloadWebsite(project.html, project.title)}><Download size={15}/>{lang === "ka" ? "ჩამოტვირთვა" : lang === "ru" ? "Скачать" : "Download HTML"}</button></div></article>)}</div>}</section>}
        {section === "upgrader" && <section className="page"><div className="eyebrow">WEBSITE TOOLS</div><h1>{t.upgradeTitle}</h1><p className="subtitle">{t.upgradeSub}</p><div className="form-card"><label>Website URL</label><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com"/><button className="primary" onClick={() => window.alert(t.coming)} disabled={!url.trim()}>{t.analyze}<ArrowUpRight size={16}/></button><small>Sign-in will be required before analysis is enabled.</small></div></section>}
        {section === "help" && <section className="page"><div className="eyebrow">SUPPORT & LEARNING</div><h1>{t.helpTitle}</h1><p className="subtitle">{t.helpSub}</p><div className="help-layout"><div className="help-guide-list">{guides.map(guide => <button key={guide.id} className={helpGuide === guide.id ? "help-guide-button active" : "help-guide-button"} onClick={() => { setHelpGuide(guide.id); setHelpStep(0); }}><LifeBuoy size={17}/><span>{guide.title}</span><ArrowUpRight size={14}/></button>)}</div><div className="help-walkthrough"><div className="walkthrough-meta"><span>{lang === "ka" ? "ეტაპობრივი ინსტრუქცია" : lang === "ru" ? "ПОШАГОВОЕ РУКОВОДСТВО" : "STEP-BY-STEP WALKTHROUGH"}</span><b>{helpStep + 1} / {activeGuide.steps.length}</b></div><div className="walkthrough-progress"><span style={{ width: `${((helpStep + 1) / activeGuide.steps.length) * 100}%` }}/></div><h2>{activeGuide.title}</h2><p className="walkthrough-summary">{activeGuide.summary}</p><div className="walkthrough-current"><span>{String(helpStep + 1).padStart(2, "0")}</span><p>{activeGuide.steps[helpStep]}</p></div><div className="walkthrough-actions"><button className="secondary" disabled={helpStep === 0} onClick={() => setHelpStep(step => Math.max(0, step - 1))}>{lang === "ka" ? "წინა" : lang === "ru" ? "Назад" : "Previous"}</button><button className="primary" onClick={() => setHelpStep(step => step + 1 >= activeGuide.steps.length ? 0 : step + 1)}>{helpStep + 1 === activeGuide.steps.length ? (lang === "ka" ? "თავიდან დაწყება" : lang === "ru" ? "Начать заново" : "Restart guide") : (lang === "ka" ? "შემდეგი ეტაპი" : lang === "ru" ? "Следующий шаг" : "Next step")}</button></div><div className="walkthrough-all-steps"><b>{lang === "ka" ? "ყველა ეტაპი" : lang === "ru" ? "Все шаги" : "All steps"}</b>{activeGuide.steps.map((step, index) => <button key={index} className={index === helpStep ? "walkthrough-step-link active" : "walkthrough-step-link"} onClick={() => setHelpStep(index)}><span>{index + 1}</span>{step}</button>)}</div></div></div></section>}
        {section === "kvara" && <section className="page"><div className="eyebrow">AI ASSISTANT</div><div className="kvara-title-row"><h1>{t.kvaraTitle}</h1><div className="kvara-switcher"><button className="kvara-switch-button" onClick={() => setKvaraMenuOpen(!kvaraMenuOpen)} aria-expanded={kvaraMenuOpen} aria-label="Open Kvara AI tools menu"><ChevronDown size={18}/></button>{kvaraMenuOpen && <div className="kvara-menu"><button onClick={() => {setKvaraView("home");setKvaraMenuOpen(false);}}><Home size={16}/>Home Page</button><button onClick={() => {setKvaraView("image");setImageView("creator");setKvaraMenuOpen(false);}}><ImageIcon size={16}/>Image Studio</button><button onClick={() => {setKvaraView("video");setVideoView("animate");setKvaraMenuOpen(false);}}><Video size={16}/>Video Studio</button></div>}</div></div><p className="subtitle">{t.kvaraSub}</p>{kvaraView === "home" && <div className="empty-state"><BrainCircuit size={30}/><b>Kvara AI Home Page</b><p>The Kvara AI home page will be connected here.</p></div>}{kvaraView === "image" && <div className="image-studio"><div className="studio-tabs"><button className={imageView === "creator" ? "studio-tab active" : "studio-tab"} onClick={() => setImageView("creator")}><Sparkles size={15}/>Image Creator</button><button className={imageView === "people" ? "studio-tab active" : "studio-tab"} onClick={() => setImageView("people")}><ImageIcon size={15}/>People Studio</button><button className={imageView === "editor" ? "studio-tab active" : "studio-tab"} onClick={() => setImageView("editor")}><WandSparkles size={15}/>Image Editor</button></div>{imageView === "creator" && <div className="studio-panel"><div className="editor-heading"><Sparkles size={22}/><div><b>Image Creator</b><p>Describe an image you want to create.</p></div></div><label className="studio-label">Image description</label><textarea className="studio-prompt" value={imagePrompt} onChange={e => setImagePrompt(e.target.value)} placeholder="Example: A young footballer celebrating with a trophy in a packed stadium…"/><div className="studio-note">AI image generation is not connected yet. Your prompt will not be sent or generated.</div><button className="primary" disabled={!imagePrompt.trim()} onClick={() => window.alert("Image generation is not connected yet.")}><Sparkles size={16}/>Generate image</button></div>}{imageView === "people" && <div className="studio-panel"><div className="editor-heading"><ImageIcon size={22}/><div><b>People Studio</b><p>Prepare reference photos for a future image-combination tool.</p></div></div><div className="people-upload-grid"><label className="people-upload"><Upload size={18}/><b>Person / photo 1</b><span>{personOneName || "Choose a photo"}</span><input type="file" accept="image/*" onChange={e => setPersonOneName(e.target.files?.[0]?.name || "")}/></label><label className="people-upload"><Upload size={18}/><b>Person / photo 2</b><span>{personTwoName || "Choose a photo"}</span><input type="file" accept="image/*" onChange={e => setPersonTwoName(e.target.files?.[0]?.name || "")}/></label></div><div className="studio-note">Only use photos you have permission to use. AI photo combination is not connected yet; selected files stay in this browser and are not uploaded.</div><button className="primary" disabled={!personOneName || !personTwoName} onClick={() => window.alert("People Studio generation is not connected yet.")}><Sparkles size={16}/>Create image</button></div>}{imageView === "editor" && <div className="image-editor"><div className="editor-heading"><ImageIcon size={22}/><div><b>Image Studio & Editor</b><p>Upload an image, adjust it, and download your edit.</p></div></div><label className="upload-image"><Upload size={18}/>Choose an image<input type="file" accept="image/*" onChange={e => {const file=e.target.files?.[0]; if(file){const reader=new FileReader();reader.onload=()=>{setEditImage(String(reader.result));setBrightness(100);setContrast(100);setSaturation(100);setRotation(0);};reader.readAsDataURL(file);}}}/></label>{editImage && <><div className="editor-preview"><img src={editImage} alt="Image being edited" style={{filter:`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,transform:`rotate(${rotation}deg)`}}/></div><div className="editor-controls"><label>Brightness <span>{brightness}%</span><input type="range" min="0" max="200" value={brightness} onChange={e=>setBrightness(Number(e.target.value))}/></label><label>Contrast <span>{contrast}%</span><input type="range" min="0" max="200" value={contrast} onChange={e=>setContrast(Number(e.target.value))}/></label><label>Saturation <span>{saturation}%</span><input type="range" min="0" max="200" value={saturation} onChange={e=>setSaturation(Number(e.target.value))}/></label><button className="secondary" onClick={()=>setRotation((rotation+90)%360)}><RotateCw size={16}/> Rotate 90°</button><button className="primary" onClick={downloadEditedImage}><Download size={16}/> Download edited image</button></div></>}</div>}</div>}{kvaraView === "video" && (
          <div className="image-studio">
            <div className="studio-tabs">
              <button className={videoView === "animate" ? "studio-tab active" : "studio-tab"} onClick={() => setVideoView("animate")}><ImageIcon size={15}/>{lang === "ka" ? "ფოტოს ანიმაცია" : lang === "ru" ? "Анимация фото" : "Animate Photo"}</button>
              <button className={videoView === "generate" ? "studio-tab active" : "studio-tab"} onClick={() => setVideoView("generate")}><Video size={15}/>{lang === "ka" ? "ვიდეოს შექმნა" : lang === "ru" ? "Создать видео" : "Generate Video"}</button>
            </div>
            {videoView === "animate" && (
              <div className="studio-panel">
                <div className="editor-heading"><ImageIcon size={22}/><div><b>{lang === "ka" ? "ფოტოს ანიმაცია" : lang === "ru" ? "Анимация фото" : "Animate Photo"}</b><p>{lang === "ka" ? "ატვირთე ფოტო, რომელსაც მოძრაობის დამატება გინდა." : lang === "ru" ? "Загрузите фото, которому хотите добавить движение." : "Upload a still image that you want to bring to life."}</p></div></div>
                <label className="studio-label">{lang === "ka" ? "საწყისი ფოტო" : lang === "ru" ? "Исходное фото" : "Source photo"}</label>
                <label className="people-upload video-upload"><Upload size={20}/><b>{lang === "ka" ? "აირჩიე ფოტო" : lang === "ru" ? "Выбрать фото" : "Choose a photo"}</b><span>{animateImageName || "PNG or JPG image"}</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e => setAnimateImageName(e.target.files?.[0]?.name || "")}/></label>
                <label className="studio-label">{lang === "ka" ? "ვიდეოს ხანგრძლივობა" : lang === "ru" ? "Длительность видео" : "Video duration"}</label>
                <select className="studio-select" value={videoDuration} onChange={e => setVideoDuration(e.target.value)}><option value="5">5 seconds</option><option value="10">10 seconds</option></select>
                <div className="studio-note">{lang === "ka" ? "ვიდეოს გენერაცია ჯერ არ არის დაკავშირებული. ფოტო არ იტვირთება." : lang === "ru" ? "Генерация видео пока не подключена. Фото не загружается." : "Video generation is not connected yet. Your photo is not uploaded."}</div>
                <button className="primary" disabled={!animateImageName} onClick={() => window.alert("Video generation is not connected yet.")}><Sparkles size={16}/>{lang === "ka" ? "ვიდეოს შექმნა" : lang === "ru" ? "Создать видео" : "Animate photo"}</button>
              </div>
            )}
            {videoView === "generate" && (
              <div className="studio-panel">
                <div className="editor-heading"><Video size={22}/><div><b>{lang === "ka" ? "ვიდეოს შექმნა" : lang === "ru" ? "Создать видео" : "Generate Video"}</b><p>{lang === "ka" ? "აღწერე ვიდეო, რომლის შექმნაც გინდა." : lang === "ru" ? "Опишите видео, которое хотите создать." : "Describe the video you want to create."}</p></div></div>
                <label className="studio-label">{lang === "ka" ? "ვიდეოს აღწერა" : lang === "ru" ? "Описание видео" : "Video prompt"}</label>
                <textarea className="studio-prompt" value={videoPrompt} onChange={e => setVideoPrompt(e.target.value)} placeholder="Describe your video idea..."/>
                <div className="video-options">
                  <label className="studio-label">Duration<select className="studio-select" value={videoDuration} onChange={e => setVideoDuration(e.target.value)}><option value="5">5 seconds</option><option value="10">10 seconds</option></select></label>
                  <label className="studio-label">Aspect ratio<select className="studio-select" value={videoRatio} onChange={e => setVideoRatio(e.target.value)}><option value="16:9">16:9 Landscape</option><option value="9:16">9:16 Portrait</option><option value="1:1">1:1 Square</option></select></label>
                </div>
                <div className="studio-note">{lang === "ka" ? "AI ვიდეოს მოდელი ჯერ არ არის დაკავშირებული." : lang === "ru" ? "Модель ИИ-видео пока не подключена." : "The AI video model is not connected yet. Your prompt is not sent and no video is generated."}</div>
                <button className="primary" disabled={!videoPrompt.trim()} onClick={() => window.alert("The AI video model is not connected yet.")}><Sparkles size={16}/>{lang === "ka" ? "ვიდეოს გენერაცია" : lang === "ru" ? "Сгенерировать видео" : "Generate video"}</button>
              </div>
            )}
          </div>
        )}</section>}
        {section === "settings" && <section className="page"><div className="eyebrow">PREFERENCES</div><h1>{t.settingsTitle}</h1><div className="form-card"><label>{t.language}</label><select value={lang} onChange={e => changeLanguage(e.target.value as Lang)}><option value="en">English</option><option value="ka">ქართული</option><option value="ru">Русский</option></select></div></section>}
        {section === "about" && <section className="page"><div className="eyebrow">KGG · KVARA GLOBAL GROUP</div><h1>About Kvara Global Group</h1><p className="subtitle">One group. A world of ideas. A workspace for building, managing and improving websites.</p><div className="about-card"><div className="about-mark">KGG</div><h2>Kvara Global Group</h2><p>Version 1.0.0</p><p>Developed by Kvara Global Group.</p><a className="primary about-download" href="https://github.com/six239/KVARA-GLOBAL-GROUP/releases/latest/download/Kvara-Global-Group.apk"><Download size={17}/> Download Android APK</a><small>The Android app requires an internet connection to use the online platform. This is an installable test build.</small><p className="about-copyright">© 2026 Kvara Global Group. All rights reserved.</p></div></section>}
      </div>
      <footer><span>© 2026 Kvara Global Group</span><span>{t.tagline}</span></footer>
    </main>
  </div>;
}
