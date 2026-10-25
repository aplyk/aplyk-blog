// document.getElementById('currentYear').textContent = new Date().getFullYear();

    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (btn && menu) { btn.addEventListener('click', () => menu.classList.toggle('hidden')); }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href.length < 2) return;
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        menu?.classList.add('hidden');
      });
    });

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      const toggleBackToTop = () => { backToTop.style.display = window.scrollY > 480 ? 'flex' : 'none'; };
      toggleBackToTop();
      window.addEventListener('scroll', toggleBackToTop);
      backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ===== Draggable mobile contact bubbles =====
    const mobileContactActions = document.getElementById('mobileContactActions');

    if (mobileContactActions) {
      const dragThreshold = 10;
      let startX = 0;
      let startY = 0;
      let startLeft = 0;
      let startTop = 0;
      let currentTouchId = null;
      let isDragging = false;
      let suppressNextClick = false;

      const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

      const positionForDragging = () => {
        const rect = mobileContactActions.getBoundingClientRect();
        mobileContactActions.style.right = 'auto';
        mobileContactActions.style.transform = 'none';
        mobileContactActions.style.left = `${rect.left}px`;
        mobileContactActions.style.top = `${rect.top}px`;
        return rect;
      };

      const moveTo = (clientX, clientY) => {
        const dx = clientX - startX;
        const dy = clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) < dragThreshold) return;

        if (!isDragging) {
          isDragging = true;
          suppressNextClick = true;
          mobileContactActions.classList.add('is-dragging');
        }

        const rect = mobileContactActions.getBoundingClientRect();
        const margin = 8;
        const demoBarHeight = document.getElementById('mobileDemoBar')?.getBoundingClientRect().height || 0;
        const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
        const maxTop = Math.max(margin, window.innerHeight - demoBarHeight - rect.height - margin);

        mobileContactActions.style.left = `${clamp(startLeft + dx, margin, maxLeft)}px`;
        mobileContactActions.style.top = `${clamp(startTop + dy, margin, maxTop)}px`;
      };

      const snapToEdge = () => {
        const rect = mobileContactActions.getBoundingClientRect();
        const margin = 8;
        const demoBarHeight =
          document.getElementById('mobileDemoBar')?.getBoundingClientRect().height || 0;

        const maxTop = Math.max(
          margin,
          window.innerHeight - demoBarHeight - rect.height - margin
        );

        const top = clamp(rect.top, margin, maxTop);
        const snapRight =
          rect.left + rect.width / 2 >= document.documentElement.clientWidth / 2;

        mobileContactActions.style.top = `${top}px`;
        mobileContactActions.style.transform = 'none';

        if (snapRight) {
          mobileContactActions.style.left = 'auto';
          mobileContactActions.style.right = `${margin}px`;
        } else {
          mobileContactActions.style.right = 'auto';
          mobileContactActions.style.left = `${margin}px`;
        }
      };

      const finishDrag = () => {
        if (isDragging) snapToEdge();
        mobileContactActions.classList.remove('is-dragging');
        currentTouchId = null;
        isDragging = false;
      };

      mobileContactActions.addEventListener('touchstart', (event) => {
        if (!window.matchMedia('(max-width: 960px)').matches) return;
        if (event.touches.length !== 1) return;

        const touch = event.touches[0];
        const rect = positionForDragging();
        currentTouchId = touch.identifier;
        startX = touch.clientX;
        startY = touch.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        isDragging = false;
      }, { passive: true });

      mobileContactActions.addEventListener('touchmove', (event) => {
        const touch = Array.from(event.touches).find((item) => item.identifier === currentTouchId);
        if (!touch) return;

        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if (isDragging || Math.hypot(dx, dy) >= dragThreshold) event.preventDefault();
        moveTo(touch.clientX, touch.clientY);
      }, { passive: false });

      mobileContactActions.addEventListener('touchend', (event) => {
        const ended = Array.from(event.changedTouches).some((item) => item.identifier === currentTouchId);
        if (ended) finishDrag();
      }, { passive: true });

      mobileContactActions.addEventListener('touchcancel', finishDrag, { passive: true });

      let mouseActive = false;
      const onMouseMove = (event) => {
        if (!mouseActive) return;
        event.preventDefault();
        moveTo(event.clientX, event.clientY);
      };
      const onMouseUp = () => {
        if (!mouseActive) return;
        mouseActive = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        finishDrag();
      };

      mobileContactActions.addEventListener('mousedown', (event) => {
        if (!window.matchMedia('(max-width: 960px)').matches || event.button !== 0) return;
        const rect = positionForDragging();
        startX = event.clientX;
        startY = event.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        isDragging = false;
        mouseActive = true;
        document.addEventListener('mousemove', onMouseMove, { passive: false });
        document.addEventListener('mouseup', onMouseUp);
      });

      mobileContactActions.addEventListener('click', (event) => {
        if (!suppressNextClick) return;
        event.preventDefault();
        event.stopPropagation();
        suppressNextClick = false;
      }, true);

      mobileContactActions.querySelectorAll('a, img').forEach((el) => {
        el.setAttribute('draggable', 'false');
      });
    }

    // ===== Mobile fixed CTA: hide it whenever another demo CTA is actually visible =====
    const mobileDemoBar = document.getElementById('mobileDemoBar');
    if (mobileDemoBar && 'IntersectionObserver' in window) {
      const visibleDemoButtons = new Set();
      const syncMobileDemoBar = () => {
        const isMobile = window.matchMedia('(max-width: 960px)').matches;
        mobileDemoBar.classList.toggle('is-hidden', !isMobile || visibleDemoButtons.size > 0);
      };

      const demoVisibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === mobileDemoBar) return;
          if (entry.isIntersecting && entry.intersectionRatio > 0) visibleDemoButtons.add(entry.target);
          else visibleDemoButtons.delete(entry.target);
        });
        syncMobileDemoBar();
      }, { threshold: 0.15 });

      document.querySelectorAll('.js-open-demo').forEach((el) => {
        if (el !== mobileDemoBar) demoVisibilityObserver.observe(el);
      });

      window.addEventListener('resize', syncMobileDemoBar);
      syncMobileDemoBar();
    }

    // ===== Intro video modal =====
    const videoModal = document.getElementById('videoModal');
    const introVideo = document.getElementById('introVideo');

    const setVideoSourceForLanguage = () => {
      const lang = (window.getCurrentLanguage && window.getCurrentLanguage()) || 'en';
      const wantedSrc = introVideo.dataset[lang === 'es' ? 'srcEs' : 'srcEn'];
      if (wantedSrc && !introVideo.currentSrc.endsWith(wantedSrc.replace('./', ''))) {
        const wasOpen = videoModal.classList.contains('open');
        introVideo.src = wantedSrc;
        introVideo.load();
        if (wasOpen) {
          introVideo.muted = true;
          introVideo.play().catch(() => { });
        }
      }
    };

    const openVideo = () => {
      setVideoSourceForLanguage();
      videoModal.classList.add('open');
      videoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      introVideo.currentTime = 0;
      introVideo.muted = true;
      introVideo.play().catch(() => { });
    };
    const closeVideo = () => {
      videoModal.classList.remove('open');
      videoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      introVideo.pause();
    };
    document.getElementById('videoModalClose')?.addEventListener('click', closeVideo);
    document.getElementById('videoModalBackdrop')?.addEventListener('click', closeVideo);
    document.getElementById('watchVideoBtn')?.addEventListener('click', openVideo);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideo(); });

    // Keep the video in sync if the person switches language while it's open
    document.querySelectorAll('#langMenu [data-lang], .lang-item-mobile[data-lang]').forEach((item) => {
      item.addEventListener('click', () => { setTimeout(setVideoSourceForLanguage, 0); });
    });

    // Open intro video only once per browser session
    const suppressIntroVideo =
      new URLSearchParams(window.location.search).has('newsletter_submitted') ||
      new URLSearchParams(window.location.search).has('demo_submitted') ||
      new URLSearchParams(window.location.search).has('demo');

    const introVideoSeen = sessionStorage.getItem('aplyk_intro_video_seen');

    window.addEventListener('DOMContentLoaded', () => {
      if (!suppressIntroVideo && !introVideoSeen) {
        sessionStorage.setItem('aplyk_intro_video_seen', '1');
        openVideo();
      }
    });

    // ===== Book a demo modal =====
    const demoModal = document.getElementById('demo-modal');
    const demoForm = document.getElementById('demo-form');
    const demoHeading = demoModal?.querySelector('.modal-heading');
    const demoSuccess = document.getElementById('demo-success');
    const demoPhone = document.getElementById('demo-phone');
    const demoPhoneCountry = document.getElementById('demo-phone-country');
    const demoPhoneFull = document.getElementById('demo-phone-full');
    const demoPhoneError = document.getElementById('demo-phone-error');
    let lastFocused = null;

    const demoDict = () => {
      const lang = (window.getCurrentLanguage && window.getCurrentLanguage()) || 'en';
      return (window.translations && window.translations[lang]) || {};
    };

    const showDemoForm = () => {
      if (demoHeading) demoHeading.hidden = false;
      if (demoForm) demoForm.hidden = false;
      if (demoSuccess) demoSuccess.hidden = true;
    };

    const showDemoSuccess = () => {
      if (demoHeading) demoHeading.hidden = true;
      if (demoForm) demoForm.hidden = true;
      if (demoSuccess) demoSuccess.hidden = false;
    };

    const openDemo = (trigger, mode = 'form') => {
      if (!demoModal) return;
      closeVideo();
      lastFocused = trigger || document.activeElement;
      mode === 'success' ? showDemoSuccess() : showDemoForm();
      demoModal.classList.add('is-open');
      demoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        (mode === 'success'
          ? demoSuccess?.querySelector('[data-close-demo]')
          : document.getElementById('demo-name'))?.focus();
      });
    };

    const closeDemo = () => {
      if (!demoModal) return;
      demoModal.classList.remove('is-open');
      demoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    const clearPhoneError = () => {
      if (!demoPhone || !demoPhoneError) return;
      demoPhone.setCustomValidity('');
      demoPhoneError.textContent = '';
      demoPhone.closest('.phone-input-group')?.classList.remove('has-error');
    };

    const normalisePhone = () => {
      if (!demoPhone || !demoPhoneCountry) return { valid: true, full: '' };

      const raw = demoPhone.value.trim();
      if (!raw) return { valid: true, full: '' };

      let digits = raw.replace(/[^0-9]/g, '');
      const country = demoPhoneCountry.value;

      if (country === 'ES') {
        if (digits.startsWith('0034')) digits = digits.slice(4);
        else if (digits.startsWith('34') && digits.length > 9) digits = digits.slice(2);

        const valid = /^[6789]\d{8}$/.test(digits);
        return { valid, full: valid ? `+34${digits}` : '' };
      }

      if (country === 'GB') {
        if (digits.startsWith('0044')) digits = digits.slice(4);
        else if (digits.startsWith('44') && digits.length > 10) digits = digits.slice(2);
        if (digits.startsWith('0')) digits = digits.slice(1);

        const valid = /^[1-9]\d{9}$/.test(digits);
        return { valid, full: valid ? `+44${digits}` : '' };
      }

      return { valid: false, full: '' };
    };

    const validatePhone = () => {
      if (!demoPhone) return true;
      clearPhoneError();

      const result = normalisePhone();
      if (result.valid) {
        if (demoPhoneFull) demoPhoneFull.value = result.full;
        return true;
      }

      const dict = demoDict();
      const message = demoPhoneCountry?.value === 'GB'
        ? (dict.demoPhoneInvalidGB || 'Enter a valid UK phone number (10 digits after +44).')
        : (dict.demoPhoneInvalidES || 'Enter a valid Spanish phone number (9 digits).');

      demoPhone.setCustomValidity(message);
      if (demoPhoneError) demoPhoneError.textContent = message;
      demoPhone.closest('.phone-input-group')?.classList.add('has-error');
      demoPhone.reportValidity();
      return false;
    };

    const updatePhoneUi = () => {
      if (!demoPhone || !demoPhoneCountry) return;
      demoPhone.placeholder = demoPhoneCountry.value === 'GB' ? '7700 900000' : '600 000 000';
      clearPhoneError();
    };

    document.querySelectorAll('.js-open-demo').forEach((el) => {
      el.addEventListener('click', (e) => { e.preventDefault(); openDemo(el, 'form'); });
    });
    document.querySelectorAll('[data-close-demo]').forEach((el) => {
      el.addEventListener('click', closeDemo);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && demoModal?.classList.contains('is-open')) closeDemo();
    });

    demoPhoneCountry?.addEventListener('change', updatePhoneUi);
    demoPhone?.addEventListener('input', clearPhoneError);
    demoPhone?.addEventListener('blur', () => {
      if (demoPhone.value.trim()) validatePhone();
    });
    updatePhoneUi();

    let demoFormIsSubmitting = false;

    demoForm?.addEventListener(
      'submit',
      async (event) => {
        if (demoFormIsSubmitting) {
          return;
        }

        event.preventDefault();

        if (!validatePhone()) {
          return;
        }

        const name =
          document
            .getElementById('demo-name')
            ?.value
            .trim();

        const company =
          document
            .getElementById('demo-company')
            ?.value
            .trim();

        const industry =
          document
            .getElementById('demo-industry')
            ?.value
            .trim();

        const email =
          document
            .getElementById('demo-email')
            ?.value
            .trim();

        const phone =
          document
            .getElementById('demo-phone-full')
            ?.value
            .trim();

        try {
          const response =
            await fetch(
              'https://aplyk-ai-agent.jlzorrillauk.workers.dev/web-lead',
              {
                method: 'POST',

                headers: {
                  'Content-Type':
                    'application/json'
                },

                body:
                  JSON.stringify({
                    nombre:
                      name,

                    empresa:
                      company,

                    sector:
                      industry,

                    email:
                      email,

                    telefono:
                      phone
                  })
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data?.error ||
              'Could not save lead'
            );
          }

          /*
            The lead has now been saved in D1.
  
            We allow the original FormSubmit form
            to continue normally so the email
            notification still works.
          */

          demoFormIsSubmitting = true;

          demoForm.submit();

        } catch (error) {
          console.error(
            'Aplyk lead save error:',
            error
          );

          /*
            Important:
            Even if D1 temporarily fails,
            do not lose the enquiry.
            We still allow FormSubmit to send
            the email notification.
          */

          demoFormIsSubmitting = true;

          demoForm.submit();
        }
      }
    );

    const demoUrl = new URL(window.location.href);
    const demoSubmitted = demoUrl.searchParams.get('demo_submitted') === '1';
    const demoRequested = demoUrl.searchParams.get('demo') === '1';

    if (demoSubmitted) {
      openDemo(null, 'success');
      demoForm?.reset();
      if (demoPhoneFull) demoPhoneFull.value = '';
      updatePhoneUi();
      demoUrl.searchParams.delete('demo_submitted');
      window.history.replaceState({}, '', demoUrl.pathname + demoUrl.search + demoUrl.hash);
    } else if (demoRequested) {
      // Open the existing Book a Demo form immediately when visitors
      // arrive from article CTAs such as https://aplyk.com/?demo=1.
      openDemo(null, 'form');
      demoUrl.searchParams.delete('demo');
      window.history.replaceState({}, '', demoUrl.pathname + demoUrl.search + demoUrl.hash);
    }
    // ===== Newsletter success modal =====
    const newsletterModal = document.getElementById('newsletter-success-modal');

    const openNewsletterSuccess = () => {
      if (!newsletterModal) return;

      closeVideo();

      newsletterModal.classList.add('is-open');
      newsletterModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeNewsletterSuccess = () => {
      if (!newsletterModal) return;

      newsletterModal.classList.remove('is-open');
      newsletterModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-close-newsletter]').forEach((el) => {
      el.addEventListener('click', closeNewsletterSuccess);
    });

    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        newsletterModal?.classList.contains('is-open')
      ) {
        closeNewsletterSuccess();
      }
    });

    const newsletterUrl = new URL(window.location.href);

    if (newsletterUrl.searchParams.get('newsletter_submitted') === '1') {
      openNewsletterSuccess();

      document.getElementById('newsletter-form')?.reset();

      newsletterUrl.searchParams.delete('newsletter_submitted');

      window.history.replaceState(
        {},
        '',
        newsletterUrl.pathname +
        newsletterUrl.search +
        newsletterUrl.hash
      );
    }
