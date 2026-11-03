/* Aplyk shared header — single source of truth for home, companies and professionals. */
(() => {
  const host = document.getElementById('shared-header');
  if (!host) return;

  const page = document.body?.dataset.page || 'home';
  const isCompanies = page === 'companies';
  const isProfessionals = page === 'professionals';

  const copy = {
    en: {
      earlyAccessNav: 'Early access',
      howItWorksCta: 'See how it works',
      close: 'Close early access',
      comingSoon: 'COMING SOON',
      homeTitle: 'Get early access to Aplyk.',
      homeText: 'Choose how you plan to use Aplyk and we’ll show you the right early-access form.',
      chooseCompany: 'I’m a company',
      chooseCompanyText: 'I need professionals for temporary shifts.',
      chooseProfessional: 'I’m a professional',
      chooseProfessionalText: 'I’m looking for flexible work opportunities.',
      companyTitle: 'A smarter way to cover your shifts is coming.',
      companyText: 'Aplyk will help you find available professionals, manage shifts and keep your temporary workforce operations in one place.',
      companyEmphasis: 'Be among the first companies to access Aplyk.',
      professionalTitle: 'The way you find flexible work is about to change.',
      professionalText: 'Aplyk will help you discover opportunities that match your availability, location and experience, so you can choose the shifts that suit you.',
      professionalEmphasis: 'Be among the first professionals to access Aplyk.',
      formTitleCompany: 'Request company early access',
      formTitleProfessional: 'Request professional early access',
      firstName: 'First name',
      lastName: 'Last name',
      company: 'Company',
      sector: 'Sector',
      select: 'Select an option',
      hospitality: 'Hospitality',
      logistics: 'Logistics / Warehousing',
      retail: 'Retail',
      events: 'Events',
      agriculture: 'Agriculture',
      other: 'Other',
      hiresYear: 'Temporary hires per year',
      workersMonth: 'Professionals needed per month',
      desiredWork: 'What type of work are you interested in?',
      desiredWorkPh: 'e.g. waiter, warehouse operative, forklift operator…',
      availability: 'Availability',
      availabilityPh: 'e.g. evenings, weekends, full-time availability…',
      email: 'Email',
      phone: 'Phone',
      howFound: 'How did you hear about Aplyk?',
      howGoogle: 'Google / search engine',
      howLinkedIn: 'LinkedIn',
      howInstagram: 'Instagram / social media',
      howReferral: 'Friend / referral',
      howPartner: 'Company / training centre / partner',
      howOther: 'Other',
      back: 'Back',
      submitCompany: 'Request early access',
      submitProfessional: 'Join early access',
      privacy: 'We’ll use these details to contact you about Aplyk early access.',
      successTitle: 'You’re on the early-access list.',
      successCompany: 'Thank you. We’ve received your company details and will contact you as Aplyk becomes available.',
      successProfessional: 'Thank you. We’ve received your details and will contact you as Aplyk becomes available.',
      successClose: 'Close',
      mobileMenu: 'Open menu'
    },
    es: {
      earlyAccessNav: 'Acceso anticipado',
      howItWorksCta: 'Ver cómo funciona',
      close: 'Cerrar acceso anticipado',
      comingSoon: 'MUY PRONTO',
      homeTitle: 'Accede antes que nadie a Aplyk.',
      homeText: 'Indícanos cómo quieres utilizar Aplyk y te mostraremos el formulario de acceso anticipado adecuado.',
      chooseCompany: 'Soy una empresa',
      chooseCompanyText: 'Necesito profesionales para cubrir turnos temporales.',
      chooseProfessional: 'Soy profesional',
      chooseProfessionalText: 'Busco oportunidades de trabajo flexible.',
      companyTitle: 'Una forma más inteligente de cubrir tus turnos está a punto de llegar.',
      companyText: 'Aplyk te ayudará a encontrar profesionales disponibles, gestionar turnos y controlar tu operativa de personal temporal desde un único lugar.',
      companyEmphasis: 'Sé de las primeras empresas en acceder a Aplyk.',
      professionalTitle: 'Tu forma de encontrar trabajo flexible está a punto de cambiar.',
      professionalText: 'Aplyk te ayudará a descubrir oportunidades compatibles con tu disponibilidad, ubicación y experiencia, para que elijas los turnos que mejor encajen contigo.',
      professionalEmphasis: 'Sé de los primeros profesionales en acceder a Aplyk.',
      formTitleCompany: 'Solicita acceso anticipado para tu empresa',
      formTitleProfessional: 'Solicita acceso anticipado como profesional',
      firstName: 'Nombre',
      lastName: 'Apellidos',
      company: 'Empresa',
      sector: 'Sector',
      select: 'Selecciona una opción',
      hospitality: 'Hostelería',
      logistics: 'Logística / Almacén',
      retail: 'Retail',
      events: 'Eventos',
      agriculture: 'Agricultura',
      other: 'Otro',
      hiresYear: 'Contrataciones temporales al año',
      workersMonth: 'Profesionales necesarios al mes',
      desiredWork: '¿En qué tipo de trabajo estás interesado?',
      desiredWorkPh: 'Ej.: camarero, mozo de almacén, carretillero…',
      availability: 'Disponibilidad',
      availabilityPh: 'Ej.: tardes, fines de semana, disponibilidad completa…',
      email: 'Email',
      phone: 'Teléfono',
      howFound: '¿Cómo has conocido Aplyk?',
      howGoogle: 'Google / buscador',
      howLinkedIn: 'LinkedIn',
      howInstagram: 'Instagram / redes sociales',
      howReferral: 'Amigo / recomendación',
      howPartner: 'Empresa / centro de formación / colaborador',
      howOther: 'Otro',
      back: 'Volver',
      submitCompany: 'Solicitar acceso anticipado',
      submitProfessional: 'Quiero acceso anticipado',
      privacy: 'Utilizaremos estos datos para contactar contigo sobre el acceso anticipado a Aplyk.',
      successTitle: 'Ya estás en la lista de acceso anticipado.',
      successCompany: 'Gracias. Hemos recibido los datos de tu empresa y contactaremos contigo cuando Aplyk esté disponible.',
      successProfessional: 'Gracias. Hemos recibido tus datos y contactaremos contigo cuando Aplyk esté disponible.',
      successClose: 'Cerrar',
      mobileMenu: 'Abrir menú'
    }
  };

  const current = (name) => {
    if ((name === 'companies' && isCompanies) || (name === 'professionals' && isProfessionals) || (name === 'blog' && page === 'blog') || (name === 'about' && page === 'about')) {
      return ' aria-current="page"';
    }
    return '';
  };

  host.innerHTML = `
    <div class="site-nav aplyk-shared-nav" data-header="shared-v3">
      <div class="wrap nav-inner">
        <a class="wordmark" href="/" aria-label="Aplyk home">
          <img src="/images/LogoBlue_LightBlueBG.png" alt="Aplyk"/>
        </a>

        <ul class="nav-links" aria-label="Primary">
          <li><a href="/empresas/"${current('companies')} data-i18n="navCompanies">Companies</a></li>
          <li><a href="/profesionales/"${current('professionals')} data-i18n="navWorkers">Workers</a></li>
          <li><a href="#faq" data-i18n="navFaq">FAQ</a></li>
          <li><a href="/blog.html"${current('blog')} data-i18n="navBlog">Blog</a></li>
          <li><a href="/about.html" data-i18n="footerAbout">About Us</a></li>
        </ul>

        <div class="nav-actions">
          <button class="nav-cta js-open-early-access" type="button" data-early-copy="earlyAccessNav">Early access</button>
          <div class="language-switcher" id="langWrap">
            <button id="langBtn" class="lang-btn" type="button" aria-haspopup="true" aria-expanded="false">
              <span id="langLabel">EN</span>
              <span class="material-symbols-outlined" aria-hidden="true">expand_more</span>
            </button>
            <div id="langMenu" class="lang-menu hidden" role="menu" aria-label="Language selector">
              <button class="lang-item" type="button" data-lang="es">Español (ES)</button>
              <button class="lang-item" type="button" data-lang="en">English (EN)</button>
            </div>
          </div>
          <button class="mobile-menu-btn" id="mobileMenuBtn" type="button" aria-label="Open menu" data-early-aria="mobileMenu">
            <span class="material-symbols-outlined" aria-hidden="true">menu</span>
          </button>
        </div>
      </div>

      <div id="mobileMenu" class="mobile-menu hidden">
        <nav class="wrap seo-mobile-nav" aria-label="Mobile menu">
          <a href="/empresas/"${current('companies')} data-i18n="navCompanies">Companies</a>
          <a href="/profesionales/"${current('professionals')} data-i18n="navWorkers">Workers</a>
          <a href="#faq" data-i18n="navFaq">FAQ</a>
          <a href="/blog.html"${current('blog')} data-i18n="navBlog">Blog</a>
          <a href="/about.html" data-i18n="footerAbout">About Us</a>

          <div class="seo-mobile-actions">
            <button class="nav-cta js-open-early-access" type="button" data-early-copy="earlyAccessNav">Early access</button>
            <div class="seo-mobile-languages">
              <button class="lang-item-mobile" type="button" data-lang="es">ES</button>
              <button class="lang-item-mobile" type="button" data-lang="en">EN</button>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div aria-hidden="true" aria-labelledby="early-access-title" aria-modal="true"
         class="modal early-access-modal" id="early-access-modal" role="dialog"
         data-early-access-page="${page}">
      <div class="modal-backdrop" data-close-early-access></div>
      <div class="modal-dialog early-access-dialog">
        <button class="modal-close" data-close-early-access data-early-aria="close" aria-label="Close early access" type="button">
          <span class="material-symbols-outlined">close</span>
        </button>

        <section class="early-access-panel" data-early-panel="chooser">
          <div aria-hidden="true" class="early-access-icon"><span class="material-symbols-outlined">rocket_launch</span></div>
          <p class="early-access-kicker" data-early-copy="comingSoon">COMING SOON</p>
          <h2 id="early-access-title" data-early-copy="homeTitle">Get early access to Aplyk.</h2>
          <p class="early-access-lead" data-early-copy="homeText">Choose how you plan to use Aplyk and we’ll show you the right early-access form.</p>
          <div class="early-access-role-grid">
            <button class="early-access-role" type="button" data-role-choice="company">
              <span class="material-symbols-outlined" aria-hidden="true">business_center</span>
              <strong data-early-copy="chooseCompany">I’m a company</strong>
              <small data-early-copy="chooseCompanyText">I need professionals for temporary shifts.</small>
            </button>
            <button class="early-access-role" type="button" data-role-choice="professional">
              <span class="material-symbols-outlined" aria-hidden="true">person</span>
              <strong data-early-copy="chooseProfessional">I’m a professional</strong>
              <small data-early-copy="chooseProfessionalText">I’m looking for flexible work opportunities.</small>
            </button>
          </div>
        </section>

        <section class="early-access-panel" data-early-panel="company" hidden>
          <div class="early-access-form-heading">
            <p class="early-access-kicker" data-early-copy="comingSoon">COMING SOON</p>
            <h2 data-early-copy="companyTitle">A smarter way to cover your shifts is coming.</h2>
            <p data-early-copy="companyText">Aplyk will help you find available professionals, manage shifts and keep your temporary workforce operations in one place.</p>
            <strong data-early-copy="companyEmphasis">Be among the first companies to access Aplyk.</strong>
          </div>
          <form class="early-access-form" data-early-form="company" action="https://formspree.io/f/xzeeydbg" method="POST" data-early-form-version="v6">
            <input type="hidden" name="_subject" value="Aplyk early access - Company"/>
            <input type="hidden" name="_template" value="table"/>
            <input type="hidden" name="_captcha" value="false"/>
            <input type="hidden" name="_next" data-early-next value=""/>
            <input type="hidden" name="Lead type" value="Company early access"/>
            <div class="early-access-form-grid">
              <label><span data-early-copy="firstName">First name</span><input name="First name" autocomplete="given-name" required/></label>
              <label><span data-early-copy="lastName">Last name</span><input name="Last name" autocomplete="family-name" required/></label>
              <label><span data-early-copy="company">Company</span><input name="Company" autocomplete="organization" required/></label>
              <label><span data-early-copy="sector">Sector</span><select name="Sector" required>
                <option value="" disabled selected data-early-copy="select">Select an option</option>
                <option value="Hospitality" data-early-copy="hospitality">Hospitality</option>
                <option value="Logistics / Warehousing" data-early-copy="logistics">Logistics / Warehousing</option>
                <option value="Retail" data-early-copy="retail">Retail</option>
                <option value="Events" data-early-copy="events">Events</option>
                <option value="Agriculture" data-early-copy="agriculture">Agriculture</option>
                <option value="Other" data-early-copy="other">Other</option>
              </select></label>
              <label><span data-early-copy="hiresYear">Temporary hires per year</span><input name="Temporary hires per year" type="number" min="0" inputmode="numeric" required/></label>
              <label><span data-early-copy="workersMonth">Professionals needed per month</span><input name="Professionals needed per month" type="number" min="0" inputmode="numeric" required/></label>
              <label><span data-early-copy="email">Email</span><input name="Email" type="email" autocomplete="email" required/></label>
              <label><span data-early-copy="phone">Phone</span><input name="Phone" type="tel" autocomplete="tel" required/></label>
              <label class="full"><span data-early-copy="howFound">How did you hear about Aplyk?</span><select name="How did you hear about Aplyk?" required>
                <option value="" disabled selected data-early-copy="select">Select an option</option>
                <option value="Google" data-early-copy="howGoogle">Google / search engine</option>
                <option value="LinkedIn" data-early-copy="howLinkedIn">LinkedIn</option>
                <option value="Instagram / social media" data-early-copy="howInstagram">Instagram / social media</option>
                <option value="Referral" data-early-copy="howReferral">Friend / referral</option>
                <option value="Company / training centre / partner" data-early-copy="howPartner">Company / training centre / partner</option>
                <option value="Other" data-early-copy="howOther">Other</option>
              </select></label>
            </div>
            <p class="early-access-privacy" data-early-copy="privacy">We’ll use these details to contact you about Aplyk early access.</p>
            <div class="early-access-form-actions">
              <button class="btn-secondary" type="button" data-early-back data-early-copy="back">Back</button>
              <button class="btn-primary" type="submit" data-early-copy="submitCompany">Request early access</button>
            </div>
          </form>
        </section>

        <section class="early-access-panel" data-early-panel="professional" hidden>
          <div class="early-access-form-heading">
            <p class="early-access-kicker" data-early-copy="comingSoon">COMING SOON</p>
            <h2 data-early-copy="professionalTitle">The way you find flexible work is about to change.</h2>
            <p data-early-copy="professionalText">Aplyk will help you discover opportunities that match your availability, location and experience, so you can choose the shifts that suit you.</p>
            <strong data-early-copy="professionalEmphasis">Be among the first professionals to access Aplyk.</strong>
          </div>
          <form class="early-access-form" data-early-form="professional" action="https://formspree.io/f/xzeeydbg" method="POST" data-early-form-version="v6">
            <input type="hidden" name="_subject" value="Aplyk early access - Professional"/>
            <input type="hidden" name="_template" value="table"/>
            <input type="hidden" name="_captcha" value="false"/>
            <input type="hidden" name="_next" data-early-next value=""/>
            <input type="hidden" name="Lead type" value="Professional early access"/>
            <div class="early-access-form-grid">
              <label><span data-early-copy="firstName">First name</span><input name="First name" autocomplete="given-name" required/></label>
              <label><span data-early-copy="lastName">Last name</span><input name="Last name" autocomplete="family-name" required/></label>
              <label class="full"><span data-early-copy="desiredWork">What type of work are you interested in?</span><input name="Work interests" data-early-placeholder="desiredWorkPh" placeholder="e.g. waiter, warehouse operative, forklift operator…" required/></label>
              <label class="full"><span data-early-copy="availability">Availability</span><input name="Availability" data-early-placeholder="availabilityPh" placeholder="e.g. evenings, weekends, full-time availability…" required/></label>
              <label><span data-early-copy="email">Email</span><input name="Email" type="email" autocomplete="email" required/></label>
              <label><span data-early-copy="phone">Phone</span><input name="Phone" type="tel" autocomplete="tel" required/></label>
              <label class="full"><span data-early-copy="howFound">How did you hear about Aplyk?</span><select name="How did you hear about Aplyk?" required>
                <option value="" disabled selected data-early-copy="select">Select an option</option>
                <option value="Google" data-early-copy="howGoogle">Google / search engine</option>
                <option value="LinkedIn" data-early-copy="howLinkedIn">LinkedIn</option>
                <option value="Instagram / social media" data-early-copy="howInstagram">Instagram / social media</option>
                <option value="Referral" data-early-copy="howReferral">Friend / referral</option>
                <option value="Company / training centre / partner" data-early-copy="howPartner">Company / training centre / partner</option>
                <option value="Other" data-early-copy="howOther">Other</option>
              </select></label>
            </div>
            <p class="early-access-privacy" data-early-copy="privacy">We’ll use these details to contact you about Aplyk early access.</p>
            <div class="early-access-form-actions">
              <button class="btn-secondary" type="button" data-early-back data-early-copy="back">Back</button>
              <button class="btn-primary" type="submit" data-early-copy="submitProfessional">Join early access</button>
            </div>
          </form>
        </section>

        <section class="early-access-panel early-access-success" data-early-panel="success" hidden>
          <div class="demo-success-icon" aria-hidden="true"><span class="material-symbols-outlined">check</span></div>
          <h2 data-early-copy="successTitle">You’re on the early-access list.</h2>
          <p data-early-success-copy></p>
          <button class="btn-primary" type="button" data-close-early-access data-early-copy="successClose">Close</button>
        </section>
      </div>
    </div>
  `;

  const getLang = () => (document.documentElement.lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  const applyEarlyCopy = () => {
    const dict = copy[getLang()];
    host.querySelectorAll('[data-early-copy]').forEach((el) => {
      const key = el.dataset.earlyCopy;
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    host.querySelectorAll('[data-early-placeholder]').forEach((el) => {
      const key = el.dataset.earlyPlaceholder;
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });
    host.querySelectorAll('[data-early-aria]').forEach((el) => {
      const key = el.dataset.earlyAria;
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });
    document.querySelectorAll('[data-aplyk-how-it-works]').forEach((el) => {
      el.textContent = dict.howItWorksCta;
    });
  };

  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn?.addEventListener('click', () => {
    const opening = mobileMenu?.classList.contains('hidden');
    mobileMenu?.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', opening ? 'true' : 'false');
  });

  document.addEventListener('click', (event) => {
    if (!mobileMenu || !menuBtn || mobileMenu.classList.contains('hidden')) return;
    if (!host.contains(event.target)) {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  const modal = document.getElementById('early-access-modal');
  const panels = [...modal.querySelectorAll('[data-early-panel]')];
  const formPanels = {
    company: modal.querySelector('[data-early-panel="company"]'),
    professional: modal.querySelector('[data-early-panel="professional"]')
  };
  let lastFocused = null;
  let activeRole = null;

  const showPanel = (name) => {
    panels.forEach((panel) => { panel.hidden = panel.dataset.earlyPanel !== name; });
    modal.querySelector('.early-access-dialog')?.scrollTo({top:0, behavior:'auto'});
    if (name === 'company' || name === 'professional') {
      activeRole = name;
      requestAnimationFrame(() => formPanels[name]?.querySelector('input:not([type="hidden"])')?.focus());
    }
  };

  const defaultPanel = () => isCompanies ? 'company' : isProfessionals ? 'professional' : 'chooser';

  const openEarlyAccess = (role = null) => {
    lastFocused = document.activeElement;
    mobileMenu?.classList.add('hidden');
    menuBtn?.setAttribute('aria-expanded','false');
    showPanel(role || defaultPanel());
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    if (!role && defaultPanel() === 'chooser') modal.querySelector('[data-role-choice]')?.focus();
  };

  const closeEarlyAccess = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    activeRole = null;
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  host.querySelectorAll('.js-open-early-access').forEach((button) => {
    button.addEventListener('click', (event) => { event.preventDefault(); openEarlyAccess(); });
  });
  document.querySelectorAll('.js-open-early-access-direct').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const role = button.dataset.earlyRole;
      openEarlyAccess(role === 'company' || role === 'professional' ? role : null);
    });
  });
  modal.querySelectorAll('[data-close-early-access]').forEach((button) => button.addEventListener('click', closeEarlyAccess));
  modal.querySelectorAll('[data-role-choice]').forEach((button) => {
    button.addEventListener('click', () => showPanel(button.dataset.roleChoice));
  });
  modal.querySelectorAll('[data-early-back]').forEach((button) => {
    button.addEventListener('click', () => {
      if (page === 'home') showPanel('chooser');
      else closeEarlyAccess();
    });
  });

  // Controlled early-access submission for both company and professional forms.
  // Keep the native HTML destination on Formspree so an unexpected form.submit()
  // cannot navigate to the failing FormSubmit 522 page.
  const EARLY_PRIMARY_URL = 'https://formsubmit.co/ajax/info@aplyk.com';
  const EARLY_BACKUP_URL = 'https://formspree.io/f/xzeeydbg';
  const EARLY_PRIMARY_TIMEOUT = 6000;
  const EARLY_BACKUP_TIMEOUT = 12000;
  const earlySending = new WeakSet();

  function earlyErrorMessage(error, provider) {
    if (error?.name === 'AbortError') return `${provider}: timeout`;
    if (error?.status) return `${provider}: HTTP ${error.status}`;
    return `${provider}: ${error?.message || 'network error'}`;
  }

  async function earlyPost(url, body, headers, timeoutMs) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, {
        method: 'POST',
        headers,
        body,
        signal: controller.signal,
        mode: 'cors',
        redirect: 'follow'
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  function earlyStatus(form) {
    let status = form.querySelector('[data-early-submit-status]');
    if (!status) {
      status = document.createElement('p');
      status.setAttribute('data-early-submit-status', '');
      status.setAttribute('role', 'alert');
      status.setAttribute('aria-live', 'polite');
      status.style.cssText = 'margin:12px 0 0;font-size:13px;line-height:1.5;white-space:pre-line;';
      form.querySelector('.early-access-form-actions')?.before(status);
      if (!status.isConnected) form.append(status);
    }
    return status;
  }

  async function earlySend(form) {
    const data = new FormData(form);
    const reference = (globalThis.crypto?.randomUUID?.() || `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    data.set('Request ID', reference);
    // Provider-specific controls are not submitted as user data to Formspree.
    const fields = {};
    for (const [key, value] of data) {
      if (key.startsWith('_')) continue;
      fields[key] = value;
    }
    const errors = [];

    try {
      const primary = await earlyPost(EARLY_PRIMARY_URL,
        JSON.stringify({...fields, _subject: data.get('_subject') || 'Aplyk early access', _template: 'table', _captcha: 'false'}),
        {'Content-Type': 'application/json', 'Accept': 'application/json'},
        EARLY_PRIMARY_TIMEOUT);
      let result = null;
      try { result = await primary.json(); } catch (_) { /* Treat non-JSON as unconfirmed */ }
      if (primary.ok && (result?.success === true || result?.success === 'true')) return 'FormSubmit';
      const error = new Error('no confirmed acceptance');
      error.status = primary.status;
      throw error;
    } catch (error) {
      errors.push(earlyErrorMessage(error, 'FormSubmit'));
    }

    try {
      const backupData = new FormData();
      Object.entries(fields).forEach(([key, value]) => backupData.append(key, value));
      backupData.append('_subject', data.get('_subject') || 'Aplyk early access');
      const backup = await earlyPost(EARLY_BACKUP_URL,
        backupData,
        {'Accept': 'application/json'},
        EARLY_BACKUP_TIMEOUT);
      if (backup.ok) return 'Formspree';
      const error = new Error('no confirmed acceptance');
      error.status = backup.status;
      throw error;
    } catch (error) {
      errors.push(earlyErrorMessage(error, 'Formspree'));
    }

    const failure = new Error(errors.join(' | '));
    failure.providerErrors = errors;
    throw failure;
  }

  modal.querySelectorAll('form[data-early-form]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (earlySending.has(form)) return;
      if (!form.reportValidity()) return;
      earlySending.add(form);
      const status = earlyStatus(form);
      const button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      status.style.color = 'inherit';
      status.textContent = getLang() === 'es' ? 'Enviando solicitud…' : 'Sending your request…';
      try {
        const provider = await earlySend(form);
        console.info('[Aplyk early access] Accepted by', provider);
        status.textContent = '';
        const role = form.dataset.earlyForm;
        const text = modal.querySelector('[data-early-success-copy]');
        const dict = copy[getLang()];
        if (text) text.textContent = role === 'company' ? dict.successCompany : dict.successProfessional;
        form.reset();
        showPanel('success');
      } catch (error) {
        console.error('[Aplyk early access] Both providers failed:', error);
        status.style.color = '#b42318';
        const intro = getLang() === 'es'
          ? 'No se ha podido confirmar el envío. Los datos siguen en el formulario.'
          : 'Your request could not be confirmed. Your details remain in the form.';
        status.textContent = `${intro}\n${(error.providerErrors || [error.message]).join('\n')}`;
      } finally {
        earlySending.delete(form);
        if (button) button.disabled = false;
      }
    }, {capture: true});
  });
  console.info('[Aplyk early access] v6 active: company/professional FormSubmit AJAX -> Formspree fallback');

  const returnBase = `${window.location.origin}${window.location.pathname}`;
  modal.querySelectorAll('[data-early-form]').forEach((form) => {
    const role = form.dataset.earlyForm;
    const next = form.querySelector('[data-early-next]');
    if (next) next.value = `${returnBase}?early_access_submitted=${encodeURIComponent(role)}`;
  });

  const params = new URLSearchParams(window.location.search);
  const submittedRole = params.get('early_access_submitted');
  if (submittedRole === 'company' || submittedRole === 'professional') {
    const dict = copy[getLang()];
    const successText = modal.querySelector('[data-early-success-copy]');
    if (successText) successText.textContent = submittedRole === 'company' ? dict.successCompany : dict.successProfessional;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    showPanel('success');
    params.delete('early_access_submitted');
    const clean = `${window.location.pathname}${params.toString() ? `?${params}` : ''}${window.location.hash}`;
    window.history.replaceState({},'',clean);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeEarlyAccess();
  });

  applyEarlyCopy();
  const languageObserver = new MutationObserver((mutations) => {
    if (mutations.some((m) => m.attributeName === 'lang')) {
      applyEarlyCopy();
      if (!modal.querySelector('[data-early-panel="success"]')?.hidden) {
        const dict = copy[getLang()];
        const successText = modal.querySelector('[data-early-success-copy]');
        if (successText && submittedRole) successText.textContent = submittedRole === 'company' ? dict.successCompany : dict.successProfessional;
      }
    }
  });
  languageObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
