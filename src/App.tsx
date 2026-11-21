import { useState } from "react";
import { Sparkles, FolderOpen, WandSparkles, LifeBuoy, BrainCircuit, Settings, Globe2, ArrowUpRight, Plus, Menu, ChevronDown, Image as ImageIcon, Home, Video, Upload, Download, RotateCw } from "lucide-react";

type Lang = "en" | "ka" | "ru";
type Section = "webora" | "projects" | "upgrader" | "help" | "kvara" | "settings";

const copy = {
  en: {
    tagline: "One group. A world of ideas.", welcome: "Build something remarkable.", sub: "Your workspace for creating, managing and improving websites.",
    webora: "Webora AI", projects: "My Projects", upgrader: "Website Upgrader", help: "Help Center", kvara: "Kvara AI", settings: "Settings",
    start: "Start building", prompt: "Describe the website you want to create…", generate: "Generate website",
    projectsTitle: "Your projects", projectsSub: "Websites you create will appear here automatically.",
    upgradeTitle: "Make your existing website better", upgradeSub: "Enter a public website URL to begin an upgrade analysis.",
    analyze: "Analyze website", helpTitle: "How can we help?", helpSub: "Find clear, step-by-step guidance for using Kvara Global Group.",
    kvaraTitle: "Kvara AI", kvaraSub: "Your AI assistant, available as a separate product area.",
    settingsTitle: "Preferences", language: "Language", coming: "This workspace is being built. This feature is not connected yet.",
    noProjects: "No projects yet", noProjectsSub: "Create your first website with Webora AI."
  },
  ka: {
    tagline: "ერთი ჯგუფი. იდეების მთელი სამყარო.", welcome: "შექმენი რაღაც გამორჩეული.", sub: "სამუშაო სივრცე ვებსაიტების შესაქმნელად, სამართავად და გასაუმჯობესებლად.",
    webora: "Webora AI", projects: "ჩემი პროექტები", upgrader: "ვებსაიტის გაუმჯობესება", help: "დახმარების ცენტრი", kvara: "Kvara AI", settings: "პარამეტრები",
    start: "შექმნის დაწყება", prompt: "აღწერე, როგორი ვებსაიტის შექმნა გინდა…", generate: "ვებსაიტის შექმნა",
    projectsTitle: "შენი პროექტები", projectsSub: "შენ მიერ შექმნილი ვებსაიტები აქ ავტომატურად გამოჩნდება.",
    upgradeTitle: "გააუმჯობესე არსებული ვებსაიტი", upgradeSub: "ანალიზის დასაწყებად შეიყვანე საჯარო ვებსაიტის ბმული.",
    analyze: "ვებსაიტის ანალიზი", helpTitle: "როგორ დაგეხმაროთ?", helpSub: "იპოვე მარტივი, ეტაპობრივი ინსტრუქციები Kvara Global Group-ისთვის.",
    kvaraTitle: "Kvara AI", kvaraSub: "შენი AI ასისტენტი, როგორც ცალკე პროდუქტი.",
    settingsTitle: "პარამეტრები", language: "ენა", coming: "სამუშაო სივრცე ჯერ შენდება. ეს ფუნქცია ჯერ დაკავშირებული არ არის.",
    noProjects: "პროექტები ჯერ არ არის", noProjectsSub: "შექმენი პირველი ვებსაიტი Webora AI-ით."
  },
  ru: {
    tagline: "Одна группа. Мир идей.", welcome: "Создайте нечто выдающееся.", sub: "Рабочее пространство для создания, управления и улучшения сайтов.",
    webora: "Webora AI", projects: "Мои проекты", upgrader: "Улучшение сайта", help: "Центр помощи", kvara: "Kvara AI", settings: "Настройки",
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
  ["help", LifeBuoy], ["kvara", BrainCircuit], ["settings", Settings]
] as const;

export default function App() {
  const [lang, setLang] = useState<Lang>(() => { const saved = localStorage.getItem("kvara-language"); return saved === "ka" || saved === "ru" ? saved : "en"; });
  const [section, setSection] = useState<Section>("webora");
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState("");
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

  function notify() { window.alert(t.coming); }

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
      <div className="brand"><div className="brand-mark">K</div><div><b>KVARA</b><span>GLOBAL GROUP</span></div></div>
      <button className="new-project" onClick={() => navigate("webora")}><Plus size={17}/>{t.start}</button>
      <div className="nav-label">WORKSPACE</div>
      <nav>{nav.map(([key, Icon]) => <button key={key} className={section === key ? "nav-item active" : "nav-item"} onClick={() => navigate(key as Section)}><Icon size={18}/><span>{t[key]}</span></button>)}</nav>
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
          <h1>{t.welcome}</h1><p className="subtitle">{t.sub}</p>
          <div className="builder-card">
            <div className="builder-head"><div className="orb"><WandSparkles size={20}/></div><div><b>{t.webora}</b><small>Turn your idea into a website</small></div><span className="pill">STUDIO</span></div>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={t.prompt}/>
            <div className="builder-foot"><span>Be as specific as you like</span><button className="primary" onClick={notify} disabled={!prompt.trim()}>{t.generate}<ArrowUpRight size={16}/></button></div>
          </div>
          <div className="feature-grid"><article><span className="feature-icon"><FolderOpen/></span><b>{t.projects}</b><p>Keep your generated websites organized.</p></article><article><span className="feature-icon"><WandSparkles/></span><b>{t.upgrader}</b><p>Review and improve an existing website.</p></article><article><span className="feature-icon"><BrainCircuit/></span><b>{t.kvara}</b><p>Your AI assistant in its own space.</p></article></div>
        </section>}
        {section === "projects" && <section className="page"><div className="eyebrow">WORKSPACE</div><h1>{t.projectsTitle}</h1><p className="subtitle">{t.projectsSub}</p><div className="empty-state"><FolderOpen size={30}/><b>{t.noProjects}</b><p>{t.noProjectsSub}</p><button className="primary" onClick={() => navigate("webora")}>{t.start}</button></div></section>}
        {section === "upgrader" && <section className="page"><div className="eyebrow">WEBSITE TOOLS</div><h1>{t.upgradeTitle}</h1><p className="subtitle">{t.upgradeSub}</p><div className="form-card"><label>Website URL</label><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com"/><button className="primary" onClick={notify} disabled={!url.trim()}>{t.analyze}<ArrowUpRight size={16}/></button><small>Sign-in will be required before analysis is enabled.</small></div></section>}
        {section === "help" && <section className="page"><div className="eyebrow">SUPPORT</div><h1>{t.helpTitle}</h1><p className="subtitle">{t.helpSub}</p><div className="empty-state"><LifeBuoy size={30}/><b>Getting started</b><p>Guides and walkthroughs will be added here.</p></div></section>}
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
      </div>
      <footer><span>© 2026 Kvara Global Group</span><span>{t.tagline}</span></footer>
    </main>
  </div>;
}
