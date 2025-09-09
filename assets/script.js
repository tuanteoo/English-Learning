// Lightweight interactivity for the cute homepage and flashcards
(function () {
  const $ = (sel) => document.querySelector(sel);

  // Elements that may or may not exist depending on the page
  const nameEl = $('#student-name');
  const nameInput = $('#name-input');
  const saveNameBtn = $('#save-name-btn');
  const greetTimeEl = $('#greeting-time');

  const statEls = {
    streak: $('#stat-streak'),
    words: $('#stat-words'),
    lessons: $('#stat-lessons'),
    minutes: $('#stat-minutes'),
  };

  const modal = $('#modal');
  const closeModalBtn = $('#close-modal');
  const modalBody = $('#modal-body');

  const STORAGE_KEYS = {
    name: 'le_name',
    stats: 'le_stats',
  };

  function timeOfDay() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'morning';
    if (h >= 12 && h < 17) return 'afternoon';
    if (h >= 17 && h < 22) return 'evening';
    return 'night';
  }

  function loadName() {
    try {
      const n = localStorage.getItem(STORAGE_KEYS.name);
      if (n && n.trim()) return n.trim().slice(0, 24);
    } catch {}
    return 'Friend';
  }

  function saveName(val) {
    try { localStorage.setItem(STORAGE_KEYS.name, val); } catch {}
  }

  function loadStats() {
    const defaults = { streak: 3, words: 120, lessons: 8, minutes: 45 };
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.stats);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      return { ...defaults, ...parsed };
    } catch {
      return defaults;
    }
  }

  function renderStats(s) {
    if (statEls.streak) statEls.streak.textContent = s.streak;
    if (statEls.words) statEls.words.textContent = s.words;
    if (statEls.lessons) statEls.lessons.textContent = s.lessons;
    if (statEls.minutes) statEls.minutes.textContent = s.minutes;
  }

  function openModal(message) {
    if (!modal || !modalBody) return;
    modalBody.textContent = message || 'This feature is under construction.';
    modal.removeAttribute('hidden');
  }
  function closeModal() { if (modal) modal.setAttribute('hidden', ''); }

  function wireShortcuts() {
    document.querySelectorAll('.shortcut, .btn.cta').forEach((el) => {
      el.addEventListener('click', (e) => {
        const href = el.getAttribute('href') || '';
        // Allow real navigation (e.g., Flashcards page)
        if (href && href !== '#' && !href.startsWith('#')) return;

        e.preventDefault();
        const action = el.getAttribute('data-action') || 'feature';
        const nice = {
          'start-lesson': 'Launching your next lesson soon. Get ready! 🚀',
          'review-vocab': 'Vocab review is on the way. 📚',
          'practice-listening': 'Tuning in for listening practice. 🎧',
          'take-quiz': 'Quiz time is coming up. 🧠',
          'grammar-tips': 'Loading handy grammar tips. ✍️',
          'speak-practice': 'Practice speaking with fun prompts. 🗣️',
        };
        openModal(nice[action] || 'This feature is under construction.');
      });
    });
  }

  function wireTopicCards() {
    const cards = document.querySelectorAll('.topic-card');
    if (!cards.length) return;
    cards.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const topic = el.getAttribute('data-topic') || 'Topic';
        openModal(`Flashcards for “${topic}” are coming soon. ✨`);
      });
    });
  }

  function init() {
    // Greeting (homepage only)
    if (greetTimeEl) greetTimeEl.textContent = timeOfDay();
    let currentName = 'Friend';
    if (nameEl) {
      currentName = loadName();
      nameEl.textContent = currentName;
    }
    if (nameInput) nameInput.value = currentName === 'Friend' ? '' : currentName;

    // Stats (homepage only)
    if (statEls.streak || statEls.words || statEls.lessons || statEls.minutes) {
      const stats = loadStats();
      renderStats(stats);
    }

    // Save name (homepage only)
    if (saveNameBtn && nameInput && nameEl) {
      saveNameBtn.addEventListener('click', () => {
        const v = nameInput.value.trim().slice(0, 24) || 'Friend';
        nameEl.textContent = v;
        saveName(v);
        saveNameBtn.classList.add('saved');
        setTimeout(() => saveNameBtn.classList.remove('saved'), 600);
      });
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveNameBtn.click();
      });
    }

    // Modal controls (on pages that include modal)
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Interactions
    wireShortcuts();
    wireTopicCards();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
