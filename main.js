// aplyk – language dropdown + language-based page switching
(function () {
  window.__APLYK_MAIN_LOADED = true;

  const STORAGE_KEY = 'aplyk_lang';

  const LANG_PAGES = {
    en: 'en.html',
    es: 'es.html',
    // de: 'de.html',
  };

  const SUPPORTED = Object.keys(LANG_PAGES);

  const baseLang = (code) => String(code || '').toLowerCase().split('-')[0];

  const getCurrentFile = () => {
    const path = window.location.pathname || '';
    const parts = path.split('/').filter(Boolean);
    return parts.length ? parts[parts.length - 1] : '';
  };

  const inferLangFromFilename = () => {
    const file = getCurrentFile();
    for (const [lang, fname] of Object.entries(LANG_PAGES)) {
      if (file === fname) return lang;
    }
    return null;
  };

  const detectBrowserLang = () => {
    const candidates = (Array.isArray(navigator.languages) && navigator.languages.length)
      ? navigator.languages
      : [navigator.language];

    for (const c of candidates) {
      const b = baseLang(c);
      if (SUPPORTED.includes(b)) return b;
    }
    return 'en';
  };

  const getPreferredLang = () => {
    try {
      const saved = baseLang(localStorage.getItem(STORAGE_KEY));
      if (SUPPORTED.includes(saved)) return saved;
    } catch (_) {}
    return detectBrowserLang();
  };

  const getCurrentLang = () => {
    // 1) Filename is the source of truth (because you are using separate HTML files)
    const byFile = inferLangFromFilename();
    if (byFile) return byFile;

    // 2) Fallback: <html lang="..">
    const htmlLang = baseLang(document.documentElement.getAttribute('lang'));
    if (SUPPORTED.includes(htmlLang)) return htmlLang;

    return 'en';
  };

  const goToLang = (lang) => {
    const target = LANG_PAGES[lang];
    if (!target) return;

    const currentFile = getCurrentFile();
    if (currentFile === target) return; // already there

    const hash = window.location.hash || '';
    const query = window.location.search || '';
    window.location.assign(`${target}${query}${hash}`);
  };

  // 1) Auto language on first load (browser) unless user already chose one
  const preferred = getPreferredLang();
  const currentLang = getCurrentLang();

  // Redirect ONLY if it would actually change file
  if (preferred !== currentLang) {
    const target = LANG_PAGES[preferred];
    if (target && getCurrentFile() !== target) {
      goToLang(preferred);
      return;
    }
  }

  // 2) Wire dropdown UI
  const wrap = document.getElementById('langWrap');
  const btn = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');
  const label = document.getElementById('langLabel');

  if (!wrap || !btn || !menu || !label) return;

  label.textContent = currentLang.toUpperCase();

  const openMenu = () => {
    menu.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    menu.classList.contains('hidden') ? openMenu() : closeMenu();
  };

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });

  menu.querySelectorAll('[data-lang]').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = baseLang(item.getAttribute('data-lang'));

      if (!SUPPORTED.includes(lang)) {
        closeMenu();
        return;
      }

      try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
      closeMenu();
      goToLang(lang);
    });
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();
