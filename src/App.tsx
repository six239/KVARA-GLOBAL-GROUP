import { useEffect, useState } from "react";
import KggTools from "./KggTools";
import { Sparkles, FolderOpen, WandSparkles, LifeBuoy, BrainCircuit, Settings, Globe2, ArrowUpRight, Plus, Menu, ChevronDown, Image as ImageIcon, Home, Video, Upload, Download, RotateCw, Info, UserRound, BadgeCheck, ShieldCheck, LogOut, Building2, Users, ReceiptText, Server, Plug, Trash2, ExternalLink, CheckCircle2 } from "lucide-react";

type Lang = "en" | "ka" | "ru";
type Section = "webora" | "projects" | "upgrader" | "business" | "command" | "workflows" | "drive" | "developer" | "monitor" | "team" | "documents" | "support" | "marketplace" | "security" | "help" | "kvara" | "settings" | "about" | "account";

const copy = {
  en: {
    tagline: "One group. A world of ideas.", appDownload: "Download Android app", welcome: "Build something remarkable.", sub: "Your workspace for creating, managing and improving websites.",
    webora: "Webora AI", projects: "My Projects", upgrader: "Website Upgrader", business: "Business Suite", command: "Command Center", workflows: "Workflow Builder", drive: "Cloud Drive", developer: "Developer Hub", monitor: "Website Monitor", team: "Team Workspace", documents: "KGG Documents", support: "Support Center", marketplace: "Integrations Marketplace", security: "Security Center", help: "Help Center", kvara: "Kvara AI", settings: "Settings", about: "About", account: "Account",
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
    webora: "Webora AI", projects: "ჩემი პროექტები", upgrader: "ვებსაიტის გაუმჯობესება", business: "ბიზნეს სივრცე", command: "მართვის ცენტრი", workflows: "სამუშაო პროცესები", drive: "ღრუბლოვანი დისკი", developer: "დეველოპერის ცენტრი", monitor: "ვებსაიტის მონიტორი", team: "გუნდის სივრცე", documents: "KGG დოკუმენტები", support: "მხარდაჭერის ცენტრი", marketplace: "ინტეგრაციების კატალოგი", security: "უსაფრთხოების ცენტრი", help: "დახმარების ცენტრი", kvara: "Kvara AI", settings: "პარამეტრები", about: "შესახებ", account: "ანგარიში",
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
    webora: "Webora AI", projects: "Мои проекты", upgrader: "Улучшение сайта", business: "Бизнес-панель", command: "Центр управления", workflows: "Конструктор процессов", drive: "Облачный диск", developer: "Для разработчиков", monitor: "Монитор сайтов", team: "Командное пространство", documents: "Документы KGG", support: "Поддержка", marketplace: "Каталог интеграций", security: "Центр безопасности", help: "Центр помощи", kvara: "Kvara AI", settings: "Настройки", about: "О приложении", account: "Аккаунт",
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
  ["webora", Sparkles], ["projects", FolderOpen], ["upgrader", WandSparkles], ["business", Building2],
  ["command", Home], ["workflows", WandSparkles], ["drive", FolderOpen], ["developer", Server], ["monitor", Globe2], ["team", Users], ["documents", ReceiptText], ["support", LifeBuoy], ["marketplace", Plug], ["security", ShieldCheck],
  ["help", LifeBuoy], ["kvara", BrainCircuit], ["settings", Settings], ["about", Info], ["account", UserRound]
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
  const [isNativeApp, setIsNativeApp] = useState(false);
  const [apkInstallConfirmed, setApkInstallConfirmed] = useState(() => localStorage.getItem("kgg-apk-installed") === "true");
  function confirmApkInstalled() { localStorage.setItem("kgg-apk-installed", "true"); setApkInstallConfirmed(true); }
  useEffect(() => {
    const capacitor = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean; getPlatform?: () => string } }).Capacitor;
    setIsNativeApp(Boolean(capacitor?.isNativePlatform?.() || (capacitor?.getPlatform && capacitor.getPlatform() !== "web")));
  }, []);
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

  type Lead = { id:string; name:string; company:string; email:string; website:string; stage:string; notes:string; createdAt:string };
  type Invoice = { id:string; number:string; client:string; email:string; description:string; amount:number; currency:string; createdAt:string };
  const [businessTab,setBusinessTab]=useState<"overview"|"leads"|"invoices"|"publish"|"backend"|"connectors">("overview");
  const [leads,setLeads]=useState<Lead[]>(()=>{try{return JSON.parse(localStorage.getItem("kgg-leads")||"[]")}catch{return[]}});
  const [invoices,setInvoices]=useState<Invoice[]>(()=>{try{return JSON.parse(localStorage.getItem("kgg-invoices")||"[]")}catch{return[]}});
  const [leadName,setLeadName]=useState(""); const [leadCompany,setLeadCompany]=useState(""); const [leadEmail,setLeadEmail]=useState(""); const [leadWebsite,setLeadWebsite]=useState(""); const [leadNotes,setLeadNotes]=useState("");
  const [invoiceClient,setInvoiceClient]=useState(""); const [invoiceEmail,setInvoiceEmail]=useState(""); const [invoiceDescription,setInvoiceDescription]=useState(""); const [invoiceAmount,setInvoiceAmount]=useState(""); const [invoiceCurrency,setInvoiceCurrency]=useState("GEL");
  const [backendStatus,setBackendStatus]=useState<"idle"|"checking"|"online"|"offline">("idle");
  const [backendCheckedAt,setBackendCheckedAt]=useState("");
  function saveLeads(next:Lead[]){setLeads(next);localStorage.setItem("kgg-leads",JSON.stringify(next));}
  function saveInvoices(next:Invoice[]){setInvoices(next);localStorage.setItem("kgg-invoices",JSON.stringify(next));}
  function addLead(){if(!leadName.trim())return;saveLeads([{id:crypto.randomUUID(),name:leadName.trim(),company:leadCompany.trim(),email:leadEmail.trim(),website:leadWebsite.trim(),stage:"New",notes:leadNotes.trim(),createdAt:new Date().toISOString()},...leads]);setLeadName("");setLeadCompany("");setLeadEmail("");setLeadWebsite("");setLeadNotes("");}
  function addInvoice(){const amount=Number(invoiceAmount);if(!invoiceClient.trim()||!invoiceDescription.trim()||!Number.isFinite(amount)||amount<=0)return;saveInvoices([{id:crypto.randomUUID(),number:"KGG-"+String(Date.now()).slice(-6),client:invoiceClient.trim(),email:invoiceEmail.trim(),description:invoiceDescription.trim(),amount,currency:invoiceCurrency,createdAt:new Date().toISOString()},...invoices]);setInvoiceClient("");setInvoiceEmail("");setInvoiceDescription("");setInvoiceAmount("");}
  function downloadInvoice(inv:Invoice){const esc=(v:string)=>v.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]||c));const html='<!doctype html><html><head><meta charset="utf-8"><title>Invoice '+esc(inv.number)+'</title><style>body{font:16px Arial;color:#172235;max-width:760px;margin:48px auto;padding:24px}h1{color:#244a78}hr{border:1px solid #244a78}.total{text-align:right;font-size:24px;font-weight:bold}</style></head><body><h1>KVARA GLOBAL GROUP</h1><hr><h2>Invoice draft '+esc(inv.number)+'</h2><p>Bill to: '+esc(inv.client)+'</p><p>'+esc(inv.email)+'</p><p>'+esc(inv.description)+'</p><p class="total">'+inv.amount.toFixed(2)+' '+esc(inv.currency)+'</p><p>Draft only — not a payment request or tax invoice.</p></body></html>';const u=URL.createObjectURL(new Blob([html],{type:"text/html"}));const link=document.createElement("a");link.href=u;link.download=inv.number+".html";link.click();URL.revokeObjectURL(u);}
  async function checkBackend(){setBackendStatus("checking");try{const r=await fetch("/api/health",{cache:"no-store"});if(!r.ok)throw new Error();setBackendStatus("online");}catch{setBackendStatus("offline");}setBackendCheckedAt(new Date().toLocaleString());}
  const businessTabs=[["overview","Overview"],["leads","Lead CRM"],["invoices","Invoicing"],["publish","Hosting & domains"],["backend","Backend"],["connectors","Connectors"]] as const;

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
  const [account, setAccount] = useState<{id:string;email:string;verified:boolean;owner:boolean}|null>(null);
  const [authMode, setAuthMode] = useState<"login"|"register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  useEffect(() => { fetch("/api/auth/me").then(r=>r.json()).then(d=>setAccount(d.user||null)).catch(()=>setAccount(null)); }, []);
  useEffect(() => { if (!account) return; fetch("/api/projects").then(r=>r.ok?r.json():null).then(d=>{ if(d && Array.isArray(d.projects)){ const merged=[...d.projects,...projects.filter(p=>!d.projects.some((q:{id:string})=>q.id===p.id))].slice(0,100); setProjects(merged); localStorage.setItem("webora-projects",JSON.stringify(merged)); } }).catch(()=>{}); }, [account?.id]);
  const t = copy[lang];

  function changeLanguage(next: Lang) { setLang(next); localStorage.setItem("kvara-language", next); }

  async function submitAuth() {
    setAuthBusy(true); setAuthError("");
    try {
      const response = await fetch(`/api/auth/${authMode}`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({email:authEmail,password:authPassword}) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Account request failed.");
      setAccount(data.user); setAuthPassword("");
    } catch (error) { setAuthError(error instanceof Error ? error.message : "Please try again."); }
    finally { setAuthBusy(false); }
  }
  async function logout() { await fetch("/api/auth/logout",{method:"POST"}); setAccount(null); }

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
      if (account) fetch("/api/projects",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(project)}).catch(()=>{});
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

  return <div className="shell">
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
        <div className="top-actions"><span className="free-access-label">FREE FOR EVERYONE</span><Globe2 size={16}/><select value={lang} onChange={e => changeLanguage(e.target.value as Lang)} aria-label="Language"><option value="en">English</option><option value="ka">ქართული</option><option value="ru">Русский</option></select><button className="avatar account-avatar" onClick={() => navigate("account")} aria-label="Open account">{account ? account.email.slice(0,1).toUpperCase() : <UserRound size={17}/>}</button></div>
      </header>
      <div className="content">
        {section === "webora" && <section className="hero">
          <div className="eyebrow"><Sparkles size={14}/> AI WEBSITE STUDIO</div>
          <h1>{t.welcome}</h1><p className="subtitle">{t.sub}</p>{!isNativeApp && !apkInstallConfirmed && <div className="app-download-actions"><a className="primary app-download-cta" href="https://github.com/six239/KVARA-GLOBAL-GROUP/releases/latest/download/Kvara-Global-Group.apk"><Download size={17}/>{t.appDownload}</a><button className="secondary" type="button" onClick={confirmApkInstalled}>{lang === "ka" ? "აპი უკვე დავაინსტალირე" : lang === "ru" ? "Я уже установил приложение" : "I've installed the app"}</button></div>}
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

        {section === "business" && <section className="page business-page">
          <div className="eyebrow">KGG · BUSINESS WORKSPACE</div><h1>Business Suite</h1><p className="subtitle">Manage prospects, prepare invoices, publish projects and connect your tools.</p>
          <div className="business-tabs">{businessTabs.map(([key,label])=><button key={key} className={businessTab===key?"business-tab active":"business-tab"} onClick={()=>setBusinessTab(key)}>{label}</button>)}</div>
          {businessTab==="overview" && <div className="business-stats"><article><Users/><span>Saved leads</span><b>{leads.length}</b><button onClick={()=>setBusinessTab("leads")}>Open CRM <ArrowUpRight size={14}/></button></article><article><ReceiptText/><span>Invoice drafts</span><b>{invoices.length}</b><button onClick={()=>setBusinessTab("invoices")}>Open invoices <ArrowUpRight size={14}/></button></article><article><Globe2/><span>Website projects</span><b>{projects.length}</b><button onClick={()=>setBusinessTab("publish")}>Publishing <ArrowUpRight size={14}/></button></article><article><Server/><span>API status</span><b>{backendStatus==="online"?"Online":backendStatus==="offline"?"Unavailable":"Not checked"}</b><button onClick={()=>{setBusinessTab("backend");checkBackend();}}>Check API <ArrowUpRight size={14}/></button></article></div>}
          {businessTab==="leads" && <><div className="business-section-head"><div><h2>Lead CRM</h2><p>Manually manage contacts you have permission to store.</p></div><span>{leads.length} records</span></div><div className="business-form"><div className="business-fields"><label>Contact name<input value={leadName} onChange={e=>setLeadName(e.target.value)} placeholder="Contact name"/></label><label>Company<input value={leadCompany} onChange={e=>setLeadCompany(e.target.value)} placeholder="Company name"/></label><label>Email<input type="email" value={leadEmail} onChange={e=>setLeadEmail(e.target.value)} placeholder="name@company.com"/></label><label>Website<input value={leadWebsite} onChange={e=>setLeadWebsite(e.target.value)} placeholder="https://example.com"/></label><label className="wide">Notes<textarea value={leadNotes} onChange={e=>setLeadNotes(e.target.value)} placeholder="Project requirements and follow-up notes"/></label></div><button className="primary" disabled={!leadName.trim()} onClick={addLead}><Plus size={16}/> Add lead</button><small>Saved only in this browser on this device. No scraping or automatic contact collection.</small></div><div className="business-records">{leads.length===0?<div className="empty-state"><Users/><b>No leads yet</b><p>Add a contact to start your prospect list.</p></div>:leads.map(lead=><article className="business-record" key={lead.id}><div><b>{lead.name}</b><span>{lead.company||"Independent contact"} · {lead.email||"No email"}</span>{lead.website&&<a href={lead.website.startsWith("http")?lead.website:"https://"+lead.website} target="_blank" rel="noreferrer">{lead.website}</a>}{lead.notes&&<p>{lead.notes}</p>}</div><select aria-label={"Stage for "+lead.name} value={lead.stage} onChange={e=>saveLeads(leads.map(x=>x.id===lead.id?{...x,stage:e.target.value}:x))}><option>New</option><option>Contacted</option><option>Qualified</option><option>Proposal</option><option>Won</option><option>Lost</option></select><button className="icon-button" aria-label="Delete lead" onClick={()=>saveLeads(leads.filter(x=>x.id!==lead.id))}><Trash2 size={16}/></button></article>)}</div></>}
          {businessTab==="invoices" && <><div className="business-section-head"><div><h2>Invoice workspace</h2><p>Create downloadable invoice drafts. Payment collection and tax compliance are not connected.</p></div><span>{invoices.length} drafts</span></div><div className="business-form"><div className="business-fields"><label>Client / company<input value={invoiceClient} onChange={e=>setInvoiceClient(e.target.value)} placeholder="Client name"/></label><label>Client email<input type="email" value={invoiceEmail} onChange={e=>setInvoiceEmail(e.target.value)} placeholder="client@example.com"/></label><label className="wide">Description<input value={invoiceDescription} onChange={e=>setInvoiceDescription(e.target.value)} placeholder="Website design service"/></label><label>Amount<input type="number" min="0.01" step="0.01" value={invoiceAmount} onChange={e=>setInvoiceAmount(e.target.value)} placeholder="250"/></label><label>Currency<select value={invoiceCurrency} onChange={e=>setInvoiceCurrency(e.target.value)}><option>GEL</option><option>USD</option><option>EUR</option></select></label></div><button className="primary" disabled={!invoiceClient.trim()||!invoiceDescription.trim()||!(Number(invoiceAmount)>0)} onClick={addInvoice}><Plus size={16}/> Create draft</button></div><div className="business-records">{invoices.length===0?<div className="empty-state"><ReceiptText/><b>No invoices yet</b><p>Your invoice drafts will appear here.</p></div>:invoices.map(inv=><article className="business-record" key={inv.id}><div><b>{inv.number} · {inv.client}</b><span>{inv.description} · {inv.amount.toFixed(2)} {inv.currency}</span><small>{new Date(inv.createdAt).toLocaleDateString()} · Draft</small></div><button className="secondary" onClick={()=>downloadInvoice(inv)}><Download size={15}/> Export</button><button className="icon-button" aria-label="Delete invoice" onClick={()=>saveInvoices(invoices.filter(x=>x.id!==inv.id))}><Trash2 size={16}/></button></article>)}</div></>}
          {businessTab==="publish" && <><div className="business-section-head"><div><h2>Hosting & domains</h2><p>Export a website project and follow the steps to publish it.</p></div></div><div className="business-info-grid"><article><Globe2/><h3>Website export</h3><p>Download a standalone HTML file for a static hosting provider.</p><label className="business-select-label">Choose project<select id="publish-project" defaultValue={projects[0]?.id||""}>{projects.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></label><button className="primary" disabled={!projects.length} onClick={()=>{const el=document.getElementById("publish-project") as HTMLSelectElement|null;const p=projects.find(x=>x.id===el?.value);if(p)downloadWebsite(p.html,p.title);}}><Download size={16}/> Export website</button></article><article><Globe2/><h3>Custom domain</h3><p>Register a domain with a registrar, then configure DNS at your hosting provider. KGG does not yet purchase domains or manage DNS automatically.</p><a className="business-text-link" href="https://developers.cloudflare.com/pages/configuration/custom-domains/" target="_blank" rel="noreferrer">Cloudflare domain setup guide <ExternalLink size={14}/></a></article><article><Server/><h3>Cloud hosting</h3><p>KGG itself runs on Cloudflare Workers. Publishing customer sites to separate hosting projects is not connected yet.</p><a className="business-text-link" href="https://developers.cloudflare.com/pages/" target="_blank" rel="noreferrer">Cloudflare Pages documentation <ExternalLink size={14}/></a></article></div></>}
          {businessTab==="backend" && <><div className="business-section-head"><div><h2>Backend & data</h2><p>Check the platform API and review implemented services.</p></div><button className="primary" onClick={checkBackend} disabled={backendStatus==="checking"}>{backendStatus==="checking"?"Checking…":"Check API status"}</button></div><div className="business-status-card"><div className={"status-indicator "+backendStatus}/><div><b>{backendStatus==="online"?"API responded":backendStatus==="offline"?"API unavailable":"Status not checked"}</b><span>{backendCheckedAt||"Run a live health check."}</span></div></div><div className="business-info-grid"><article><CheckCircle2/><h3>Website generation</h3><p>Webora AI uses the existing Cloudflare Workers AI integration.</p></article><article><CheckCircle2/><h3>Accounts & sessions</h3><p>Account registration and login use the existing D1 database.</p></article><article><CheckCircle2/><h3>Project storage</h3><p>Signed-in users can sync website project records through the existing API.</p></article><article><Server/><h3>Backend builder</h3><p>Visual database schema editing, server functions and custom APIs are not implemented yet.</p></article></div></>}
          {businessTab==="connectors" && <><div className="business-section-head"><div><h2>Connectors</h2><p>Integration directory. Each provider requires explicit authorization.</p></div></div><div className="business-info-grid connector-grid">{[["Google Drive","Store and access project files"],["Notion","Sync documentation and project notes"],["Slack","Send workspace notifications"],["GitHub","Connect repositories and deployments"],["Cloudflare","Manage hosting and DNS resources"],["Email provider","Send account and project emails"]].map(([name,desc])=><article key={name}><Plug/><h3>{name}</h3><p>{desc}</p><span className="connector-status">Not connected</span></article>)}</div><div className="business-note">OAuth permissions, provider credentials and secure token storage must be configured before enabling these integrations.</div></>}
        </section>}
        {(["command","workflows","drive","developer","monitor","team","documents","support","marketplace","security"] as Section[]).includes(section) && <KggTools section={section} title={t[section]} language={lang} projectCount={projects.length}/>}
        {section === "help" && <section className="page"><div className="eyebrow">SUPPORT & LEARNING</div><h1>{t.helpTitle}</h1><p className="subtitle">{t.helpSub}</p><div className="help-layout"><div className="help-guide-list">{guides.map(guide => <button key={guide.id} className={helpGuide === guide.id ? "help-guide-button active" : "help-guide-button"} onClick={() => { setHelpGuide(guide.id); setHelpStep(0); }}><LifeBuoy size={17}/><span>{guide.title}</span><ArrowUpRight size={14}/></button>)}</div><div className="help-walkthrough"><div className="walkthrough-meta"><span>{lang === "ka" ? "ეტაპობრივი ინსტრუქცია" : lang === "ru" ? "ПОШАГОВОЕ РУКОВОДСТВО" : "STEP-BY-STEP WALKTHROUGH"}</span><b>{helpStep + 1} / {activeGuide.steps.length}</b></div><div className="walkthrough-progress"><span style={{ width: `${((helpStep + 1) / activeGuide.steps.length) * 100}%` }}/></div><h2>{activeGuide.title}</h2><p className="walkthrough-summary">{activeGuide.summary}</p><div className="walkthrough-current"><span>{String(helpStep + 1).padStart(2, "0")}</span><p>{activeGuide.steps[helpStep]}</p></div><div className="walkthrough-actions"><button className="secondary" disabled={helpStep === 0} onClick={() => setHelpStep(step => Math.max(0, step - 1))}>{lang === "ka" ? "წინა" : lang === "ru" ? "Назад" : "Previous"}</button><button className="primary" onClick={() => setHelpStep(step => step + 1 >= activeGuide.steps.length ? 0 : step + 1)}>{helpStep + 1 === activeGuide.steps.length ? (lang === "ka" ? "თავიდან დაწყება" : lang === "ru" ? "Начать заново" : "Restart guide") : (lang === "ka" ? "შემდეგი ეტაპი" : lang === "ru" ? "Следующий шаг" : "Next step")}</button></div><div className="walkthrough-all-steps"><b>{lang === "ka" ? "ყველა ეტაპი" : lang === "ru" ? "Все шаги" : "All steps"}</b>{activeGuide.steps.map((step, index) => <button key={index} className={index === helpStep ? "walkthrough-step-link active" : "walkthrough-step-link"} onClick={() => setHelpStep(index)}><span>{index + 1}</span>{step}</button>)}</div></div></div></section>}
        {section === "kvara" && <section className="page"><div className="eyebrow">AI ASSISTANT</div><div className="kvara-title-row"><h1>{t.kvaraTitle}</h1><div className="kvara-switcher"><button className="kvara-switch-button" onClick={() => setKvaraMenuOpen(!kvaraMenuOpen)} aria-expanded={kvaraMenuOpen} aria-label="Open Kvara AI tools menu"><ChevronDown size={18}/></button>{kvaraMenuOpen && <div className="kvara-menu"><button onClick={() => {setKvaraView("home");setKvaraMenuOpen(false);}}><Home size={16}/>Home Page</button><button onClick={() => {setKvaraView("image");setImageView("creator");setKvaraMenuOpen(false);}}><ImageIcon size={16}/>Image Studio</button></div>}</div></div><p className="subtitle">{t.kvaraSub}</p>{kvaraView === "home" && <div className="empty-state"><BrainCircuit size={30}/><b>Kvara AI Home Page</b><p>The Kvara AI home page will be connected here.</p></div>}{kvaraView === "image" && <div className="image-studio"><div className="studio-tabs"><button className={imageView === "creator" ? "studio-tab active" : "studio-tab"} onClick={() => setImageView("creator")}><Sparkles size={15}/>Image Creator</button><button className={imageView === "people" ? "studio-tab active" : "studio-tab"} onClick={() => setImageView("people")}><ImageIcon size={15}/>People Studio</button><button className={imageView === "editor" ? "studio-tab active" : "studio-tab"} onClick={() => setImageView("editor")}><WandSparkles size={15}/>Image Editor</button></div>{imageView === "creator" && <div className="studio-panel"><div className="editor-heading"><Sparkles size={22}/><div><b>Image Creator</b><p>Describe an image you want to create.</p></div></div><label className="studio-label">Image description</label><textarea className="studio-prompt" value={imagePrompt} onChange={e => setImagePrompt(e.target.value)} placeholder="Example: A young footballer celebrating with a trophy in a packed stadium…"/><div className="studio-note">AI image generation is not connected yet. Your prompt will not be sent or generated.</div><button className="primary" disabled={!imagePrompt.trim()} onClick={() => window.alert("Image generation is not connected yet.")}><Sparkles size={16}/>Generate image</button></div>}{imageView === "people" && <div className="studio-panel"><div className="editor-heading"><ImageIcon size={22}/><div><b>People Studio</b><p>Prepare reference photos for a future image-combination tool.</p></div></div><div className="people-upload-grid"><label className="people-upload"><Upload size={18}/><b>Person / photo 1</b><span>{personOneName || "Choose a photo"}</span><input type="file" accept="image/*" onChange={e => setPersonOneName(e.target.files?.[0]?.name || "")}/></label><label className="people-upload"><Upload size={18}/><b>Person / photo 2</b><span>{personTwoName || "Choose a photo"}</span><input type="file" accept="image/*" onChange={e => setPersonTwoName(e.target.files?.[0]?.name || "")}/></label></div><div className="studio-note">Only use photos you have permission to use. AI photo combination is not connected yet; selected files stay in this browser and are not uploaded.</div><button className="primary" disabled={!personOneName || !personTwoName} onClick={() => window.alert("People Studio generation is not connected yet.")}><Sparkles size={16}/>Create image</button></div>}{imageView === "editor" && <div className="image-editor"><div className="editor-heading"><ImageIcon size={22}/><div><b>Image Studio & Editor</b><p>Upload an image, adjust it, and download your edit.</p></div></div><label className="upload-image"><Upload size={18}/>Choose an image<input type="file" accept="image/*" onChange={e => {const file=e.target.files?.[0]; if(file){const reader=new FileReader();reader.onload=()=>{setEditImage(String(reader.result));setBrightness(100);setContrast(100);setSaturation(100);setRotation(0);};reader.readAsDataURL(file);}}}/></label>{editImage && <><div className="editor-preview"><img src={editImage} alt="Image being edited" style={{filter:`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,transform:`rotate(${rotation}deg)`}}/></div><div className="editor-controls"><label>Brightness <span>{brightness}%</span><input type="range" min="0" max="200" value={brightness} onChange={e=>setBrightness(Number(e.target.value))}/></label><label>Contrast <span>{contrast}%</span><input type="range" min="0" max="200" value={contrast} onChange={e=>setContrast(Number(e.target.value))}/></label><label>Saturation <span>{saturation}%</span><input type="range" min="0" max="200" value={saturation} onChange={e=>setSaturation(Number(e.target.value))}/></label><button className="secondary" onClick={()=>setRotation((rotation+90)%360)}><RotateCw size={16}/> Rotate 90°</button><button className="primary" onClick={downloadEditedImage}><Download size={16}/> Download edited image</button></div></>}</div>}</div>}{kvaraView === "video" && (
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
        {section === "account" && <section className="page"><div className="eyebrow">KGG · ACCOUNT</div><h1>{account ? "Your account" : "Sign in or create an account"}</h1><p className="subtitle">Manage your Kvara Global Group identity.</p>{account ? <div className="about-card account-card"><div className="account-name-row"><b>{account.email}</b>{account.owner && <span className="role-badge owner-badge"><ShieldCheck size={14}/>Owner</span>}{account.verified && <span className="role-badge verified-badge"><BadgeCheck size={14}/>Verified</span>}</div><p>{account.verified ? "Your contact method is verified." : "Email / phone verification is not yet available. Your account is not marked verified."}</p><button className="secondary" onClick={logout}><LogOut size={16}/>Sign out</button></div> : <div className="form-card account-form"><div className="studio-tabs"><button className={authMode==="login"?"studio-tab active":"studio-tab"} onClick={()=>{setAuthMode("login");setAuthError("");}}>Sign in</button><button className={authMode==="register"?"studio-tab active":"studio-tab"} onClick={()=>{setAuthMode("register");setAuthError("");}}>Create account</button></div><label>Email address</label><input type="email" autoComplete="email" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="you@example.com"/><label>Password (10–128 characters)</label><input type="password" autoComplete={authMode==="login"?"current-password":"new-password"} value={authPassword} onChange={e=>setAuthPassword(e.target.value)} placeholder="Enter your password"/>{authError && <div className="generation-error" role="alert">{authError}</div>}<button className="primary" onClick={submitAuth} disabled={authBusy||!authEmail.trim()||authPassword.length<10}>{authBusy?"Please wait…":authMode==="login"?"Sign in":"Create account"}</button><small>Accounts use secure server-side sessions. Email verification and cloud project sync are not enabled yet.</small></div>}</section>}
        {section === "about" && <section className="page"><div className="eyebrow">KGG · KVARA GLOBAL GROUP</div><h1>About Kvara Global Group</h1><p className="subtitle">One group. A world of ideas. A workspace for building, managing and improving websites.</p><div className="about-card"><div className="about-mark">KGG</div><h2>Kvara Global Group</h2><p>Version 1.0.0</p><p>Developed by Kvara Global Group.</p>{!isNativeApp && !apkInstallConfirmed && <div className="app-download-actions"><a className="primary about-download" href="https://github.com/six239/KVARA-GLOBAL-GROUP/releases/latest/download/Kvara-Global-Group.apk"><Download size={17}/> Download Android APK</a><button className="secondary" type="button" onClick={confirmApkInstalled}>{lang === "ka" ? "აპი უკვე დავაინსტალირე" : lang === "ru" ? "Я уже установил приложение" : "I've installed the app"}</button></div>}<small>The Android app requires an internet connection to use the online platform. This is an installable test build.</small><p className="about-copyright">© 2026 Kvara Global Group. All rights reserved.</p></div></section>}
      </div>
      <footer><span>© 2026 Kvara Global Group</span><span>{t.tagline}</span></footer>
    </main>
  </div>;
}
