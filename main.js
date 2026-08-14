// Aplyk — translations + language switcher (Dekapture-style, in-page, no reload)

const translations = {
  en: {
    pageTitle: "Aplyk | AI-Powered Temporary Workforce Platform",
    navCompanies: "Companies",
    navWorkers: "Workers",
    navFaq: "FAQ",
    navBlog: "Blog",
    login: "Login",
    bookDemo: "Book a demo",
    closeVideo: "Close video",

    heroEyebrow: "AI-powered · Real-time matching",
    heroTitle: "Fill shifts fast. <span class=\"hl\">Keep everyone happy.</span>",
    heroLead: "Aplyk connects companies with vetted professionals instantly — post a shift, get matched, track everything from your pocket.",
    seeHowItWorks: "See how it works",
    statMatch: "Avg. time to match",
    statRating: "Average worker rating",
    statShifts: "Shifts live this week",

    card1Title: "Shift created",
    card1Tag: "1-CLICK",
    card1Meta: "Warehouse Picker · 18:00–23:00<br>Site A",
    card1RowK: "Qualified matches",
    card1RowV: "12 available",

    card2Title: "Filled instantly",
    card2Sub: "Top-rated professional confirmed",
    card2RowK1: "Rating",
    card2RowK2: "Time to confirm",

    card3Title: "Clock-in confirmed",
    card3Sub: "Accurate time tracking",
    card3Tag: "LIVE",
    card3CellK1: "Clock-in",
    card3CellK2: "Status",
    card3CellV2: "On-site",

    card4Title: "New opportunities",
    card4Tag: "UPDATED",
    card4CellK1: "New companies",
    card4CellK2: "Shifts available",
    card4Note: "More options this week — choose shifts that fit your schedule.",

    card5Title: "Top performer",
    card5Sub: "Your reliability and ratings are trending up.",
    card5Tag: "THIS MONTH",
    card5RowK2: "Ranking",
    card5RowV2: "Top 10%",

    companiesEyebrow: "For companies",
    companiesTitle: "Everything you need, in one friendly platform.",
    companiesLead: "Streamline your operations with AI-driven tools designed specifically for on-site management. Handle everything from your pocket, anywhere.",

    feat1Title: "One-click shift creation",
    feat1Text: "Post jobs in seconds using smart AI templates that learn from your previous hiring patterns.",
    feat2Title: "Time tracking",
    feat2Text: "GPS-verified clock-ins and outs ensure you only pay for the time actually worked on-site.",
    feat3Title: "Worker rating",
    feat3Text: "Rate performance instantly after every shift to build a pool of your favorite reliable workers.",

    pillVetted: "Vetted professionals",
    pillMulti: "Multi-location control",
    pillInstant: "Instant matching",
    pillSupport: "24/7 Priority Support",

    workersEyebrow: "For workers",
    workersTitle: "Smart tools to manage your shifts",
    workersLead: "Easily stay on top of your schedule and shift opportunities.",

    w1Title: "Video interview",
    w1Text: "Join video calls for easy online interviews.",
    w1FootTitle: "AI video interview profile",
    w1FootText: "Record a quick, guided video when it suits you and let employers review it instantly — no scheduling delays.",

    w2Title: "Live alerts",
    w2Text: "Get notified the moment shifts open up.",

    w3Title: "Calendar",
    w3Text: "View and manage your upcoming shifts with a clear schedule.",
    w3FootTitle: "Shift discovery experience",
    w3FootText: "Browse available shifts, compare options quickly, and plan your week without effort.",

    wPill1: "Multiple companies & shifts",
    wPill2: "Build a trusted profile",
    wPill4: "24/7 support",
    wPill5: "Rate companies",

    faqEyebrow: "Support & answers",
    faqTitle: "Frequently Asked Questions",
    faqLead: "Everything you need to know about our AI-driven workforce management solution.",

    faq1Q: "How does the AI matching work?",
    faq1A: "Our advanced AI tools analyse the most critical data points — including skills, availability, location, and past performance — to quickly match qualified professionals with your shift requirements.",
    faq2Q: "What industries do you serve?",
    faq2A: "We currently specialise in Light Industrial, Warehousing, Logistics, Hospitality, and Event Staffing — and we also support other sectors with similar skill demands and shift-based workforce needs.",
    faq3Q: "Does aplyk employ and pay the workers?",
    faq3Lede: "No.",
    faq3A: "aplyk is a <strong>technology platform</strong> that connects businesses with vetted professionals for temporary shifts. We <strong>do not</strong> act as the Employer of Record and we <strong>do not</strong> run payroll. The hiring company remains responsible for contracts, payroll, and statutory obligations, while aplyk provides the tools to manage the workflow — matching, shift confirmations, time tracking, and performance feedback.",
    faq4Q: "How quickly can I get workers?",
    faq4A: "Our on-demand network is active 24/7. In most major cities, we can fill shift requests in as little as 2 hours. However, posting shifts 24-48 hours in advance guarantees the highest quality matches.",
    faq5Q: "Is compliance handled automatically?",
    faq5A: "The platform helps companies manage shifts, breaks and time tracking more efficiently, reducing operational errors.",

    ctaTitle: "Ready to streamline your workforce?",
    ctaText: "Discover how Aplyk can help streamline your temporary workforce operations.",
    ctaButton: "Book a Demo",

    footerTagline: "AI-powered temporary workforce platform designed for fast and efficient operations.",
    footerSolutions: "Solutions",
    footerCompany: "Company",
    footerAbout: "About Us",
    footerCareers: "Careers",
    footerContact: "Contact Support",
    footerLegal: "Legal",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerCookies: "Cookie Policy",
    footerSecurity: "Security",
    footerStay: "Stay updated",
    footerStayText: "Get the latest workforce trends directly to your inbox.",
    footerEmailPh: "Enter your email",
    footerSubscribe: "Subscribe",
    footerRights: "aplyk. All rights reserved.",
    footerStatus: "Platform available 24/7",

    closeForm: "Close form",
    demoModalTitle: "Book a demo",
    demoModalText: "Tell us a bit about your company and we'll get back to you shortly.",
    demoNameLabel: "Full name",
    demoNamePh: "Your full name",
    demoCompanyLabel: "Company",
    demoCompanyPh: "Company name",
    demoIndustryLabel: "Industry",
    demoSelectPh: "Select an option",
    demoIndHospitality: "Hospitality",
    demoIndWarehouse: "Warehousing / Logistics",
    demoIndRetail: "Retail",
    demoIndEvents: "Events",
    demoIndOther: "Other",
    demoEmailLabel: "Work email",
    demoEmailPh: "you@company.com",
    demoPhoneLabel: "Phone (optional)",
    demoPhonePh: "+34 600 000 000",
    demoFormNote: "Your information will be sent to info@aplyk.com.",
    demoCancel: "Cancel",
    demoSubmit: "Send request",
    demoSubmitted: "Thank you. Your request has been sent — we'll be in touch shortly."
  },

  es: {
    pageTitle: "Aplyk | Plataforma de personal temporal con IA",
    navCompanies: "Empresas",
    navWorkers: "Profesionales",
    navFaq: "FAQ",
    navBlog: "Blog",
    login: "Iniciar sesión",
    bookDemo: "Reservar una demo",
    closeVideo: "Cerrar vídeo",

    heroEyebrow: "Impulsado por IA · Matching en tiempo real",
    heroTitle: "Cubre turnos rápido. <span class=\"hl\">Mantén a todos contentos.</span>",
    heroLead: "Aplyk conecta empresas con profesionales verificados al instante — publica un turno, encuentra candidato y controla todo desde el bolsillo.",
    seeHowItWorks: "Ver cómo funciona",
    statMatch: "Tiempo medio de match",
    statRating: "Valoración media",
    statShifts: "Turnos activos esta semana",

    card1Title: "Turno creado",
    card1Tag: "1-CLICK",
    card1Meta: "Mozo de almacén · 18:00–23:00<br>Site A",
    card1RowK: "Coincidencias cualificadas",
    card1RowV: "12 disponibles",

    card2Title: "Cubierto al instante",
    card2Sub: "Profesional mejor valorado confirmado",
    card2RowK1: "Valoración",
    card2RowK2: "Tiempo de confirmación",

    card3Title: "Entrada confirmada",
    card3Sub: "Control horario preciso",
    card3Tag: "EN VIVO",
    card3CellK1: "Entrada",
    card3CellK2: "Estado",
    card3CellV2: "En el centro",

    card4Title: "Nuevas oportunidades",
    card4Tag: "ACTUALIZADO",
    card4CellK1: "Nuevas empresas",
    card4CellK2: "Turnos disponibles",
    card4Note: "Más opciones esta semana — elige los turnos que encajen con tu horario.",

    card5Title: "Top performer",
    card5Sub: "Tu fiabilidad y valoraciones van en aumento.",
    card5Tag: "ESTE MES",
    card5RowK2: "Ranking",
    card5RowV2: "Top 10%",

    companiesEyebrow: "Para empresas",
    companiesTitle: "Todo lo que necesitas, en una plataforma cercana.",
    companiesLead: "Optimiza tus operaciones con herramientas de IA diseñadas para la gestión in situ. Controla todo desde tu bolsillo, estés donde estés.",

    feat1Title: "Creación de turnos en 1 clic",
    feat1Text: "Publica turnos en segundos con plantillas inteligentes de IA que aprenden de tus patrones de contratación.",
    feat2Title: "Control horario",
    feat2Text: "Los fichajes con GPS verificado aseguran que solo pagues por el tiempo realmente trabajado en el centro.",
    feat3Title: "Valoración de profesionales",
    feat3Text: "Valora el desempeño al finalizar cada turno para crear un pool de profesionales fiables.",

    pillVetted: "Profesionales verificados",
    pillMulti: "Control multiubicación",
    pillInstant: "Matching instantáneo",
    pillSupport: "Soporte prioritario 24/7",

    workersEyebrow: "Para profesionales",
    workersTitle: "Herramientas inteligentes para gestionar tus turnos",
    workersLead: "Mantente al día de tu agenda y de las oportunidades de turnos.",

    w1Title: "Entrevista en vídeo",
    w1Text: "Realiza entrevistas online de forma sencilla.",
    w1FootTitle: "Perfil de entrevista en vídeo con IA",
    w1FootText: "Haz la entrevista cuando quieras: graba un vídeo guiado en minutos y deja que las empresas lo revisen al instante — sin esperas ni coordinaciones.",

    w2Title: "Alertas en tiempo real",
    w2Text: "Recibe avisos al instante cuando haya turnos disponibles.",

    w3Title: "Calendario",
    w3Text: "Consulta y gestiona tus próximos turnos con un calendario claro.",
    w3FootTitle: "Experiencia para descubrir turnos",
    w3FootText: "Explora turnos disponibles, compara opciones rápidamente y organiza todo en un solo lugar para planificar tu semana sin esfuerzo.",

    wPill1: "Varias empresas y turnos disponibles",
    wPill2: "Crea un perfil de confianza",
    wPill4: "Soporte 24/7",
    wPill5: "Valora a las empresas",

    faqEyebrow: "Soporte y respuestas",
    faqTitle: "Preguntas frecuentes",
    faqLead: "Todo lo que necesitas saber sobre nuestra solución de gestión de personal impulsada por IA.",

    faq1Q: "¿Cómo funciona el matching con IA?",
    faq1A: "Nuestras herramientas de IA analizan los datos clave — habilidades, disponibilidad, ubicación y rendimiento previo — para emparejar rápidamente profesionales cualificados con tus turnos.",
    faq2Q: "¿Qué sectores cubrís?",
    faq2A: "Actualmente nos especializamos en industria ligera, almacenes, logística, hostelería y eventos, y también apoyamos otros sectores con necesidades similares de personal por turnos.",
    faq3Q: "¿Aplyk emplea y paga a los trabajadores?",
    faq3Lede: "No.",
    faq3A: "aplyk es una <strong>plataforma tecnológica</strong> que conecta empresas con profesionales verificados para turnos temporales. <strong>No</strong> actuamos como el empleador legal (Employer of Record) y <strong>no</strong> gestionamos la nómina. La empresa contratante sigue siendo responsable de los contratos, la nómina y las obligaciones legales, mientras que aplyk proporciona las herramientas para gestionar el flujo de trabajo: matching, confirmación de turnos, control horario y feedback de desempeño.",
    faq4Q: "¿Con qué rapidez puedo conseguir personal?",
    faq4A: "Nuestra red on-demand está activa 24/7. En la mayoría de áreas urbanas podemos cubrir turnos en tan solo 2 horas. Aun así, publicar con 24–48 horas de antelación garantiza la mejor calidad de matching.",
    faq5Q: "¿El cumplimiento normativo se gestiona automáticamente?",
    faq5A: "La plataforma ayuda a las empresas a gestionar turnos, descansos y control horario de forma más eficiente, reduciendo errores operativos.",

    ctaTitle: "¿Listo para simplificar tu plantilla?",
    ctaText: "Descubre cómo Aplyk puede ayudarte a simplificar la gestión de tu personal temporal.",
    ctaButton: "Reservar una demo",

    footerTagline: "Plataforma de personal temporal impulsada por IA, diseñada para operaciones rápidas y eficientes.",
    footerSolutions: "Soluciones",
    footerCompany: "Empresa",
    footerAbout: "Sobre nosotros",
    footerCareers: "Empleo",
    footerContact: "Contactar soporte",
    footerLegal: "Legal",
    footerPrivacy: "Política de privacidad",
    footerTerms: "Términos de servicio",
    footerCookies: "Política de cookies",
    footerSecurity: "Seguridad",
    footerStay: "Mantente al día",
    footerStayText: "Recibe las últimas tendencias directamente en tu email.",
    footerEmailPh: "Introduce tu email",
    footerSubscribe: "Suscribirse",
    footerRights: "aplyk. Todos los derechos reservados.",
    footerStatus: "Plataforma disponible 24/7",

    closeForm: "Cerrar formulario",
    demoModalTitle: "Reservar una demo",
    demoModalText: "Cuéntanos un poco sobre tu empresa y nos pondremos en contacto contigo enseguida.",
    demoNameLabel: "Nombre completo",
    demoNamePh: "Tu nombre completo",
    demoCompanyLabel: "Empresa",
    demoCompanyPh: "Nombre de la empresa",
    demoIndustryLabel: "Sector",
    demoSelectPh: "Selecciona una opción",
    demoIndHospitality: "Hostelería",
    demoIndWarehouse: "Almacén / Logística",
    demoIndRetail: "Retail",
    demoIndEvents: "Eventos",
    demoIndOther: "Otro",
    demoEmailLabel: "Correo corporativo",
    demoEmailPh: "tu@empresa.com",
    demoPhoneLabel: "Teléfono (opcional)",
    demoPhonePh: "+34 600 000 000",
    demoFormNote: "Tu información se enviará a info@aplyk.com.",
    demoCancel: "Cancelar",
    demoSubmit: "Enviar solicitud",
    demoSubmitted: "Gracias. Tu solicitud se ha enviado — nos pondremos en contacto contigo enseguida."
  }
};

const STORAGE_KEY = 'aplyk_lang';
let currentLanguage = 'en';

function detectBrowserLang() {
  const candidates = (Array.isArray(navigator.languages) && navigator.languages.length)
    ? navigator.languages
    : [navigator.language];
  for (const c of candidates) {
    const b = String(c || '').toLowerCase().split('-')[0];
    if (translations[b]) return b;
  }
  return 'en';
}

function getPreferredLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch (_) {}
  return detectBrowserLang();
}

function setLanguage(lang) {
  currentLanguage = translations[lang] ? lang : 'en';
  const dict = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;
  if (dict.pageTitle) document.title = dict.pageTitle;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!(key in dict)) return;

    if (el.hasAttribute('data-i18n-attribute')) {
      el.setAttribute(el.getAttribute('data-i18n-attribute'), dict[key]);
    } else if (el.getAttribute('data-i18n-html') === 'true') {
      el.innerHTML = dict[key];
    } else {
      el.textContent = dict[key];
    }
  });

  const langLabel = document.getElementById('langLabel');
  if (langLabel) langLabel.textContent = currentLanguage.toUpperCase();

  try { localStorage.setItem(STORAGE_KEY, currentLanguage); } catch (_) {}
}

function wireLanguageUI() {
  const wrap = document.getElementById('langWrap');
  const btn = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');

  if (wrap && btn && menu) {
    const openMenu = () => { menu.classList.remove('hidden'); btn.setAttribute('aria-expanded', 'true'); };
    const closeMenu = () => { menu.classList.add('hidden'); btn.setAttribute('aria-expanded', 'false'); };
    const toggleMenu = () => { menu.classList.contains('hidden') ? openMenu() : closeMenu(); };

    btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); toggleMenu(); });

    menu.querySelectorAll('[data-lang]').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = item.getAttribute('data-lang');
        setLanguage(lang);
        closeMenu();
      });
    });

    document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  // Mobile menu language buttons
  document.querySelectorAll('.lang-item-mobile[data-lang]').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage(item.getAttribute('data-lang'));
    });
  });
}

function init() {
  wireLanguageUI();
  setLanguage(getPreferredLang());
}

window.translations = translations;
window.getCurrentLanguage = () => currentLanguage;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
