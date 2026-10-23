(() => {
  const API_BASE =
    'https://aplyk-ai-agent.jlzorrillauk.workers.dev';

  const state = {
    conversationId: getOrCreateConversationId(),
    week: 0,
    pollingTimer: null,
    assistantName: null,
  };

  state.assistantName =
    getSavedAssistantName(
      state.conversationId
    );

  /* =========================================================
     BASIC HELPERS
  ========================================================= */

  function getOrCreateConversationId() {
    const key = 'aplyk_contact_conversation_id';

    let id = sessionStorage.getItem(key);

    if (!id) {
      id =
        'web-' +
        Date.now() +
        '-' +
        Math.random().toString(36).slice(2, 10);

      sessionStorage.setItem(key, id);
    }

    return id;
  }

  function getLanguage() {
    const lang =
      document.documentElement.lang?.toLowerCase() || 'en';

    return lang.startsWith('es') ? 'es' : 'en';
  }

  function t(es, en) {
    return getLanguage() === 'es' ? es : en;
  }

  function getAssistantNameStorageKey(
    conversationId
  ) {
    return (
      'aplyk_contact_assistant_name_' +
      conversationId
    );
  }

  function getSavedAssistantName(
    conversationId
  ) {
    const saved =
      sessionStorage.getItem(
        getAssistantNameStorageKey(
          conversationId
        )
      );

    return ['Kyla', 'Nerea'].includes(saved)
      ? saved
      : null;
  }

  function getDisplayAssistantName() {
    return (
      state.assistantName ||
      (getLanguage() === 'es'
        ? 'Nerea'
        : 'Kyla')
    );
  }

  function lockAssistantName() {
    if (!state.assistantName) {
      state.assistantName =
        getLanguage() === 'es'
          ? 'Nerea'
          : 'Kyla';

      sessionStorage.setItem(
        getAssistantNameStorageKey(
          state.conversationId
        ),
        state.assistantName
      );
    }

    return state.assistantName;
  }

  /* =========================================================
     CREATE SHARED CONTACT WIDGET
  ========================================================= */

  function createWidget() {
    if (document.getElementById('aplyk-contact-widget')) {
      return;
    }

    const root = document.createElement('div');

    root.id = 'aplyk-contact-widget';

    root.innerHTML = `
      <div
        class="aplyk-contact-actions"
        aria-label="${t('Opciones de contacto', 'Contact options')}"
      >

        <!-- WHATSAPP -->
        <a
          class="aplyk-contact-action aplyk-contact-whatsapp"
          id="aplykContactWhatsApp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Aplyk"
        >
          <img
            src="/images/whatsapp.png"
            alt=""
            class="aplyk-contact-whatsapp-icon"
            aria-hidden="true"
          />

          <span class="aplyk-contact-action-label">
            WhatsApp
          </span>
        </a>

        <!-- AI AGENT + CALL -->
        <button
          class="aplyk-contact-action aplyk-contact-chat"
          id="aplykContactChatButton"
          type="button"
        >
          <span
            class="material-symbols-outlined"
            aria-hidden="true"
          >
            forum
          </span>

          <span class="aplyk-contact-action-label">
            ${t('Hablar', 'Talk')}
          </span>
        </button>

        <!-- ORIGINAL BOOK A DEMO FORM -->
        <button
          class="aplyk-contact-action aplyk-contact-form"
          id="aplykContactFormButton"
          type="button"
        >
          <span
            class="material-symbols-outlined"
            aria-hidden="true"
          >
            mail
          </span>

          <span class="aplyk-contact-action-label">
            ${t('Formulario', 'Form')}
          </span>
        </button>

      </div>

      <!-- CHAT PANEL -->
      <section
        class="aplyk-chat-panel"
        id="aplykChatPanel"
        aria-hidden="true"
      >

        <header class="aplyk-chat-header">

          <div>
            <strong>${getDisplayAssistantName()}</strong>

            <span>
              ${t(
                '¿En qué puedo ayudarte?',
                'How can I help you?'
              )}
            </span>
          </div>

          <button
            type="button"
            id="aplykChatClose"
            aria-label="${t('Cerrar', 'Close')}"
          >
            <span
              class="material-symbols-outlined"
              aria-hidden="true"
            >
              close
            </span>
          </button>

        </header>

        <div
          class="aplyk-chat-messages"
          id="aplykChatMessages"
        >
        <div
          class="aplyk-message aplyk-message-bot"
          id="aplykInitialBotMessage"
        >
          ${t(
            'Hola, soy ' + getDisplayAssistantName() + '. ¿En qué puedo ayudarte?',
            'Hi, I’m ' + getDisplayAssistantName() + '. How can I help you?'
          )}
        </div>
        </div>

        <div
          class="aplyk-calendar-container"
          id="aplykCalendarContainer"
          hidden
        ></div>

        <form
          class="aplyk-chat-input-row"
          id="aplykChatForm"
        >

          <input
            id="aplykChatInput"
            type="text"
            autocomplete="off"
            placeholder="${t(
              'Escribe un mensaje...',
              'Write a message...'
            )}"
          />

          <button
            type="submit"
            aria-label="${t('Enviar', 'Send')}"
          >
            <span
              class="material-symbols-outlined"
              aria-hidden="true"
            >
              send
            </span>
          </button>

        </form>

      </section>
    `;

    document.body.appendChild(root);

    updateWidgetLanguage();
    updateWhatsApp();
    wireEvents();
    observeLanguageChanges();
  }

  /* =========================================================
     WHATSAPP
  ========================================================= */

  function updateWhatsApp() {
    const button =
      document.getElementById('aplykContactWhatsApp');

    if (!button) {
      return;
    }

    const isSpanish = getLanguage() === 'es';

    const number =
      isSpanish
        ? '34681870145'
        : '447784185475';

    button.href = `https://wa.me/${number}`;

    button.setAttribute(
      'aria-label',
      isSpanish
        ? 'WhatsApp Aplyk España'
        : 'WhatsApp Aplyk UK'
    );
  }

  /* =========================================================
     LANGUAGE
  ========================================================= */

  function updateWidgetLanguage() {
    const chatButton =
      document.getElementById('aplykContactChatButton');

    const formButton =
      document.getElementById('aplykContactFormButton');

    const input =
      document.getElementById('aplykChatInput');

    if (chatButton) {
      chatButton.setAttribute(
        'aria-label',
        t('Hablar con Aplyk', 'Talk to Aplyk')
      );

      const label =
        chatButton.querySelector(
          '.aplyk-contact-action-label'
        );

      if (label) {
        label.textContent = t('Hablar', 'Talk');
      }
    }

    if (formButton) {
      formButton.setAttribute(
        'aria-label',
        t(
          'Abrir formulario de contacto',
          'Open contact form'
        )
      );

      const label =
        formButton.querySelector(
          '.aplyk-contact-action-label'
        );

      if (label) {
        label.textContent =
          t('Formulario', 'Form');
      }
    }

    if (input) {
      input.placeholder =
        t(
          'Escribe un mensaje...',
          'Write a message...'
        );
    }

    const chatHeaderTitle =
      document.querySelector('.aplyk-chat-header strong');

    const chatHeaderSubtitle =
      document.querySelector('.aplyk-chat-header span');

    if (chatHeaderTitle) {
      chatHeaderTitle.textContent =
        getDisplayAssistantName();
    }

    if (chatHeaderSubtitle) {
      chatHeaderSubtitle.textContent =
        t(
          '¿En qué puedo ayudarte?',
          'How can I help you?'
        );
    }

    const initialMessage = document.getElementById('aplykInitialBotMessage');

    if (initialMessage) {
      initialMessage.textContent =
        t(
          'Hola, soy ' + getDisplayAssistantName() + '. ¿En qué puedo ayudarte?',
          'Hi, I’m ' + getDisplayAssistantName() + '. How can I help you?'
        );
    }


    updateWhatsApp();
  }

  function observeLanguageChanges() {
    const observer =
      new MutationObserver(() => {
        updateWidgetLanguage();
      });

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ['lang'],
      }
    );
  }

  /* =========================================================
     BUTTON EVENTS
  ========================================================= */

  function wireEvents() {
    document
      .getElementById('aplykContactChatButton')
      ?.addEventListener('click', openChat);

    document
      .getElementById('aplykChatClose')
      ?.addEventListener('click', closeChat);

    document
      .getElementById('aplykContactFormButton')
      ?.addEventListener(
        'click',
        openOriginalDemoForm
      );

    document
      .getElementById('aplykChatForm')
      ?.addEventListener(
        'submit',
        handleChatSubmit
      );

    document.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'Escape') {
          closeChat();
        }
      }
    );
  }

  function openChat() {
    lockAssistantName();
    updateWidgetLanguage();

    const panel =
      document.getElementById('aplykChatPanel');

    panel?.classList.add('is-open');

    panel?.setAttribute(
      'aria-hidden',
      'false'
    );

    setTimeout(() => {
      document
        .getElementById('aplykChatInput')
        ?.focus();
    }, 100);
  }

  function closeChat() {
    const panel =
      document.getElementById('aplykChatPanel');

    panel?.classList.remove('is-open');

    panel?.setAttribute(
      'aria-hidden',
      'true'
    );
  }

  /* =========================================================
     ORIGINAL BOOK A DEMO FORM
  ========================================================= */

  function openOriginalDemoForm() {

    /*
      On index.html the original modal already exists.
      We trigger one of the existing Book a Demo buttons,
      therefore the current index.html logic opens the
      original form exactly as it does today.
    */

    const existingTrigger =
      document.querySelector('.js-open-demo');

    if (existingTrigger) {
      existingTrigger.click();
      return;
    }

    /*
      About / Blog:
      if the modal does not live on that page yet,
      send the visitor to the homepage and ask
      index.html to open the existing modal.
    */

    window.location.href = '/?demo=1';
  }

  /* =========================================================
     CHAT
  ========================================================= */

  async function handleChatSubmit(event) {
    event.preventDefault();

    lockAssistantName();

    const input =
      document.getElementById('aplykChatInput');

    const message =
      input?.value.trim();

    if (!message) {
      return;
    }

    addMessage(message, 'user');

    input.value = '';
    input.disabled = true;

    try {
      const response =
        await fetch(
          `${API_BASE}/`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              message,
              conversation_id:
                state.conversationId,
              assistant_name:
                state.assistantName,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
          'Request failed'
        );
      }

      if (data.reply) {
        addMessage(
          data.reply,
          'bot'
        );
      }

      const requestId =
        data.call_request?.request_id ||
        data.request_id ||
        null;

      if (requestId) {
        hideCalendar();
        startCallPolling(requestId);
      }

      if (
        data.calendar_needed ||
        data.show_calendar ||
        data.solicita_agendar_llamada === true ||
        (
          Array.isArray(data.calendar_slots) &&
          data.calendar_slots.length > 0
        )
      ) {
        await loadCalendar(0);
      }

    } catch (error) {
      console.error(
        'Aplyk chat error:',
        error
      );

      addMessage(
        t(
          'Ha ocurrido un error. Inténtalo de nuevo.',
          'Something went wrong. Please try again.'
        ),
        'bot'
      );

    } finally {
      input.disabled = false;
      input.focus();
    }
  }

  function addMessage(text, type) {
    const container =
      document.getElementById(
        'aplykChatMessages'
      );

    if (!container) {
      return;
    }

    const message =
      document.createElement('div');

    message.className =
      `aplyk-message aplyk-message-${type}`;

    message.textContent = text;

    container.appendChild(message);

    container.scrollTop =
      container.scrollHeight;
  }

  /* =========================================================
     IMMEDIATE CALL POLLING
  ========================================================= */

  function startCallPolling(requestId) {
    if (state.pollingTimer) {
      clearInterval(
        state.pollingTimer
      );
    }

    state.pollingTimer =
      setInterval(
        async () => {
          try {
            const response =
              await fetch(
                `${API_BASE}/call-status?request_id=${encodeURIComponent(
                  requestId
                )}`
              );

            const data =
              await response.json();

            if (!response.ok) {
              return;
            }

            const status =
              data.status ||
              data.estado;

            if (
              status === 'accepted' ||
              status === 'aceptada'
            ) {
              stopPolling();
              hideCalendar();

              addMessage(
                data.reply ||
                t(
                  'Perfecto. Te llamaremos ahora.',
                  'Perfect. We will call you now.'
                ),
                'bot'
              );

              return;
            }

            if (
              data.calendar_needed ||
              status === 'rejected' ||
              status === 'rechazada' ||
              status === 'timeout'
            ) {
              stopPolling();

              if (data.reply) {
                addMessage(
                  data.reply,
                  'bot'
                );
              }

              await loadCalendar(0);
            }

          } catch (error) {
            console.error(
              'Call status error:',
              error
            );
          }

        },
        3000
      );
  }

  function stopPolling() {
    if (!state.pollingTimer) {
      return;
    }

    clearInterval(
      state.pollingTimer
    );

    state.pollingTimer = null;
  }

  function hideCalendar() {
    const container =
      document.getElementById(
        'aplykCalendarContainer'
      );

    if (!container) {
      return;
    }

    container.hidden = true;
    container.innerHTML = '';
  }

  /* =========================================================
     CALENDAR
  ========================================================= */

  async function loadCalendar(week = 0) {
    state.week = week;

    const container =
      document.getElementById(
        'aplykCalendarContainer'
      );

    if (!container) {
      return;
    }

    container.hidden = false;

    container.innerHTML = `
      <div class="aplyk-calendar-loading">
        ${t(
          'Buscando huecos disponibles...',
          'Checking available times...'
        )}
      </div>
    `;

    try {
      const response =
        await fetch(
          `${API_BASE}/calendar-slots?week=${week}`
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
          'Calendar error'
        );
      }

      renderCalendar(data);

    } catch (error) {
      console.error(
        'Calendar error:',
        error
      );

      container.innerHTML = `
        <div class="aplyk-calendar-error">
          ${t(
            'No se pudo cargar el calendario.',
            'The calendar could not be loaded.'
          )}
        </div>
      `;
    }
  }

  function renderCalendar(data) {
    const container =
      document.getElementById(
        'aplykCalendarContainer'
      );

    if (!container) {
      return;
    }

    const availableDays =
      data.days.filter(
        (day) =>
          day.has_availability
      );

    let html = `
      <div class="aplyk-calendar-header">

        <button
          type="button"
          id="aplykCalendarPrevious"
          ${
            data.previous_week === null
              ? 'disabled'
              : ''
          }
          aria-label="${t(
            'Semana anterior',
            'Previous week'
          )}"
        >
          ‹
        </button>

        <strong>
          ${formatWeekTitle(
            data.week_start,
            data.week_end
          )}
        </strong>

        <button
          type="button"
          id="aplykCalendarNext"
          aria-label="${t(
            'Semana siguiente',
            'Next week'
          )}"
        >
          ›
        </button>

      </div>
    `;

    if (!availableDays.length) {
      html += `
        <div class="aplyk-calendar-empty">
          ${t(
            'No hay huecos disponibles esta semana.',
            'There are no available times this week.'
          )}
        </div>
      `;
    }

    availableDays.forEach(
      (day) => {

        html += `
          <div class="aplyk-calendar-day">

            <div class="aplyk-calendar-day-title">
              ${day.label}
            </div>
        `;

        if (day.morning?.length) {
          html += `
            <div class="aplyk-calendar-period">

              <span>
                ${t(
                  'Mañana',
                  'Morning'
                )}
              </span>

              <div class="aplyk-slot-list">
          `;

          day.morning.forEach(
            (slot) => {
              html +=
                createSlotButton(
                  slot
                );
            }
          );

          html += `
              </div>
            </div>
          `;
        }

        if (day.afternoon?.length) {
          html += `
            <div class="aplyk-calendar-period">

              <span>
                ${t(
                  'Tarde',
                  'Afternoon'
                )}
              </span>

              <div class="aplyk-slot-list">
          `;

          day.afternoon.forEach(
            (slot) => {
              html +=
                createSlotButton(
                  slot
                );
            }
          );

          html += `
              </div>
            </div>
          `;
        }

        html += `
          </div>
        `;
      }
    );

    container.innerHTML = html;

    document
      .getElementById(
        'aplykCalendarPrevious'
      )
      ?.addEventListener(
        'click',
        () => {
          if (
            data.previous_week !== null
          ) {
            loadCalendar(
              data.previous_week
            );
          }
        }
      );

    document
      .getElementById(
        'aplykCalendarNext'
      )
      ?.addEventListener(
        'click',
        () => {
          loadCalendar(
            data.next_week
          );
        }
      );

    container
      .querySelectorAll(
        '[data-aplyk-slot]'
      )
      .forEach(
        (button) => {

          button.addEventListener(
            'click',
            () => {
              bookSlot(
                button.dataset.aplykSlot
              );
            }
          );

        }
      );
  }

  function createSlotButton(slot) {
    return `
      <button
        type="button"
        class="aplyk-slot-button"
        data-aplyk-slot="${slot.start}"
      >
        ${slot.time}
      </button>
    `;
  }

  function formatWeekTitle(start, end) {
    const locale =
      getLanguage() === 'es'
        ? 'es-ES'
        : 'en-GB';

    const startDate =
      new Date(
        `${start}T12:00:00`
      );

    const endDate =
      new Date(
        `${end}T12:00:00`
      );

    const formatter =
      new Intl.DateTimeFormat(
        locale,
        {
          day: 'numeric',
          month: 'short',
        }
      );

    return (
      formatter.format(startDate) +
      ' – ' +
      formatter.format(endDate)
    );
  }

  /* =========================================================
     BOOK CALL
  ========================================================= */

  async function bookSlot(start) {
    const buttons =
      document.querySelectorAll(
        '.aplyk-slot-button'
      );

    buttons.forEach(
      (button) =>
        button.disabled = true
    );

    try {
      const response =
        await fetch(
          `${API_BASE}/book-call`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify({
                conversation_id:
                  state.conversationId,

                start,
              }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        if (
          data.error ===
          'That slot is no longer available.'
        ) {
          addMessage(
            t(
              'Ese hueco acaba de dejar de estar disponible. Te muestro los horarios actualizados.',
              'That time has just become unavailable. Here are the updated times.'
            ),
            'bot'
          );

          await loadCalendar(
            state.week
          );

          return;
        }

        throw new Error(
          data?.error ||
          'Booking failed'
        );
      }

      addMessage(
        data.reply ||
        t(
          'Perfecto. La llamada ha quedado agendada.',
          'Perfect. The call has been booked.'
        ),
        'bot'
      );

      hideCalendar();

    } catch (error) {
      console.error(
        'Booking error:',
        error
      );

      addMessage(
        t(
          'No se pudo reservar la llamada. Inténtalo de nuevo.',
          'The call could not be booked. Please try again.'
        ),
        'bot'
      );

    } finally {
      buttons.forEach(
        (button) =>
          button.disabled = false
      );
    }
  }

  /* =========================================================
     START
  ========================================================= */

  if (
    document.readyState ===
    'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      createWidget
    );
  } else {
    createWidget();
  }
})();