import { useState } from "react";
import { Sparkles, FolderOpen, WandSparkles, LifeBuoy, BrainCircuit, Settings, Globe2, ArrowUpRight, Plus, Menu } from "lucide-react";

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
  const [lang, setLang] = useState<Lang>("en");
  const [section, setSection] = useState<Section>("webora");
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState("");
  const [sidebar, setSidebar] = useState(true);
  const t = copy[lang];

  function notify() { window.alert(t.coming); }

  return <div className="shell">
    <aside className={sidebar ? "sidebar" : "sidebar collapsed"}>
      <div className="brand"><div className="brand-mark">K</div><div><b>KVARA</b><span>GLOBAL GROUP</span></div></div>
      <button className="new-project" onClick={() => setSection("webora")}><Plus size={17}/>{t.start}</button>
      <div className="nav-label">WORKSPACE</div>
      <nav>{nav.map(([key, Icon]) => <button key={key} className={section === key ? "nav-item active" : "nav-item"} onClick={() => setSection(key as Section)}><Icon size={18}/><span>{t[key]}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="status-dot"/> All systems in development</div>
    </aside>
    <main className="main">
      <header className="topbar">
        <button className="icon-button mobile-menu" onClick={() => setSidebar(!sidebar)} aria-label="Toggle menu"><Menu size={20}/></button>
        <div className="crumb">Kvara Global <span>/</span> {t[section]}</div>
        <div className="top-actions"><Globe2 size={16}/><select value={lang} onChange={e => setLang(e.target.value as Lang)} aria-label="Language"><option value="en">English</option><option value="ka">ქართული</option><option value="ru">Русский</option></select><div className="avatar">K</div></div>
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
        {section === "projects" && <section className="page"><div className="eyebrow">WORKSPACE</div><h1>{t.projectsTitle}</h1><p className="subtitle">{t.projectsSub}</p><div className="empty-state"><FolderOpen size={30}/><b>{t.noProjects}</b><p>{t.noProjectsSub}</p><button className="primary" onClick={() => setSection("webora")}>{t.start}</button></div></section>}
        {section === "upgrader" && <section className="page"><div className="eyebrow">WEBSITE TOOLS</div><h1>{t.upgradeTitle}</h1><p className="subtitle">{t.upgradeSub}</p><div className="form-card"><label>Website URL</label><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com"/><button className="primary" onClick={notify} disabled={!url.trim()}>{t.analyze}<ArrowUpRight size={16}/></button><small>Sign-in will be required before analysis is enabled.</small></div></section>}
        {section === "help" && <section className="page"><div className="eyebrow">SUPPORT</div><h1>{t.helpTitle}</h1><p className="subtitle">{t.helpSub}</p><div className="empty-state"><LifeBuoy size={30}/><b>Getting started</b><p>Guides and walkthroughs will be added here.</p></div></section>}
        {section === "kvara" && <section className="page"><div className="eyebrow">AI ASSISTANT</div><h1>{t.kvaraTitle}</h1><p className="subtitle">{t.kvaraSub}</p><div className="empty-state"><BrainCircuit size={30}/><b>Kvara AI</b><p>The separate Kvara AI integration will be connected here.</p></div></section>}
        {section === "settings" && <section className="page"><div className="eyebrow">PREFERENCES</div><h1>{t.settingsTitle}</h1><div className="form-card"><label>{t.language}</label><select value={lang} onChange={e => setLang(e.target.value as Lang)}><option value="en">English</option><option value="ka">ქართული</option><option value="ru">Русский</option></select></div></section>}
      </div>
      <footer><span>© 2026 Kvara Global Group</span><span>{t.tagline}</span></footer>
    </main>
  </div>;
}
