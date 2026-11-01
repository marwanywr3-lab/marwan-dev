'use strict';
const translations = {
  en: {skip:'Skip to content',work:'Work',about:'About',intro:'DEVELOPER · CURIOUS BY NATURE',headline1:'Small details.',headline2:'Thoughtful experiences.',bio:"I'm Marwan, a developer turning curiosity into simple, useful digital experiences. I care about clean interfaces, fast websites, and the details that make them feel right.",view:'Explore my work',signature:'Built with care. Made to be useful.',selected:'IDEAS INTO INTERFACES',projects:'Selected work',behind:'BEHIND THE CODE',aboutTitle:'Always learning.\nAlways building.',aboutCopy:"I'm Marwan Barbood. I enjoy exploring how the web works and bringing ideas to life through code. My approach is simple: start with a clear purpose, focus on the essentials, and keep improving.",aboutEnd:'This portfolio is a growing collection of that journey.',simple:'Simplicity',care:'Attention to detail',curiosity:'Curiosity',name:'Marwan Barbood',top:'Back to top ↑',loading:'Loading projects…',empty:'New work is on the way. Check back soon.',error:'Projects could not be loaded. Please try again.',retry:'Try again ↗',demo:'Visit project ↗',source:'Source code ↗',nav:'Main navigation',title:'Marwan Barbood — Developer'},
  ar: {skip:'انتقل إلى المحتوى',work:'المشاريع',about:'عني',intro:'مطوّر · يقودني الفضول',headline1:'تفاصيل صغيرة.',headline2:'تجارب مدروسة.',bio:'أنا مروان، مطوّر أحوّل فضولي إلى تجارب رقمية بسيطة ومفيدة. أهتم بالواجهات الواضحة، والمواقع السريعة، والتفاصيل التي تجعل استخدامها أجمل.',view:'استكشف مشاريعي',signature:'صُنع بعناية. ليكون مفيدًا.',selected:'من الأفكار إلى الواجهات',projects:'مشاريع مختارة',behind:'خلف الكود',aboutTitle:'أتعلّم باستمرار.\nوأبني بشغف.',aboutCopy:'أنا مروان باربود. أستمتع باستكشاف كيفية عمل الويب وتحويل الأفكار إلى واقع عبر البرمجة. أسلوبي بسيط: أبدأ بهدف واضح، وأركّز على الأساسيات، وأواصل التحسين.',aboutEnd:'هذا الموقع مجموعة متجددة من محطات رحلتي.',simple:'البساطة',care:'الاهتمام بالتفاصيل',curiosity:'الفضول',name:'مروان باربود',top:'العودة للأعلى ↑',loading:'جارٍ تحميل المشاريع…',empty:'مشاريع جديدة في الطريق. عُد قريبًا.',error:'تعذّر تحميل المشاريع. حاول مرة أخرى.',retry:'حاول مجددًا ↗',demo:'زيارة المشروع ↗',source:'الكود المصدري ↗',nav:'القائمة الرئيسية',title:'مروان باربود — مطوّر'}
};
let language = 'en';
try { language = localStorage.getItem('portfolio-language') === 'ar' ? 'ar' : 'en'; } catch {}
let projects = [], state = 'loading', loading = false;
const list = document.querySelector('#project-list');
const status = document.querySelector('#project-status');
function text(value) { return typeof value === 'string' ? value : (value?.[language] || value?.en || ''); }
function safeURL(value) {
  if (typeof value !== 'string') return null;
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
}
function node(tag, content, className) { const el = document.createElement(tag); el.textContent = content; if(className) el.className = className; return el; }
function renderProjects() {
  list.replaceChildren();
  list.setAttribute('aria-busy', String(state === 'loading'));
  status.textContent = state === 'ready' ? (projects.length ? '' : translations[language].empty) : translations[language][state];
  document.querySelector('#retry').hidden = state !== 'error';
  for (const [index, project] of projects.entries()) {
    const card = node('article', '', 'project-card');
    card.append(node('span', String(index + 1).padStart(2, '0'), 'number'), node('h3', text(project.title)), node('p', text(project.description)));
    const tags = node('ul', '', 'tags');
    for (const tech of project.stack) { const tag = node('li', tech); tag.dir = 'auto'; tags.append(tag); }
    const links = node('div', '', 'project-links');
    for (const [key, label] of [['url', 'demo'], ['source', 'source']]) {
      const url = safeURL(project[key]);
      if (url) { const a = node('a', translations[language][label]); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('aria-label', `${translations[language][label]} — ${text(project.title)}`); links.append(a); }
    }
    card.append(tags, links); list.append(card);
  }
}
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next; document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  document.title = translations[next].title;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = translations[next][el.dataset.i18n]; });
  document.querySelector('#navigation').setAttribute('aria-label', translations[next].nav);
  const button = document.querySelector('#language');
  button.textContent = next === 'ar' ? 'English ↗' : 'العربية ↗'; button.lang = next === 'ar' ? 'en' : 'ar';
  button.setAttribute('aria-label', next === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  try { localStorage.setItem('portfolio-language', next); } catch {}
  renderProjects();
}
function localized(value) { return typeof value === 'string' || (value && typeof value.en === 'string' && typeof value.ar === 'string'); }
async function loadProjects() {
  if(loading) return;
  loading = true; state = 'loading'; projects = []; renderProjects();
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch('./projects.json', {signal:controller.signal, cache:'no-cache'});
    if (!response.ok) throw new Error('Request failed');
    const data = await response.json();
    if (!Array.isArray(data.projects) || data.projects.length > 100 || !data.projects.every(p => p && localized(p.title) && localized(p.description) && Array.isArray(p.stack) && p.stack.every(t => typeof t === 'string'))) throw new Error('Invalid project data');
    projects = data.projects; state = 'ready';
  } catch { state = 'error'; }
  finally { clearTimeout(timeout); loading = false; renderProjects(); }
}
document.querySelector('#language').addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));
document.querySelector('#retry').addEventListener('click', loadProjects);
document.querySelector('#year').textContent = new Date().getFullYear();
setLanguage(language);
loadProjects();
