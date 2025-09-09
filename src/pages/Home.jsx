import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal.jsx';

const STORAGE_KEYS = {
  name: 'le_name',
  stats: 'le_stats',
};

const defaultStats = { streak: 3, words: 120, lessons: 8, minutes: 45 };

function timeOfDay() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 22) return 'evening';
  return 'night';
}

export default function Home() {
  const [name, setName] = useState('Friend');
  const [nameInput, setNameInput] = useState('');
  const [greetTime, setGreetTime] = useState('day');
  const [stats, setStats] = useState(defaultStats);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  useEffect(() => {
    setGreetTime(timeOfDay());
    try {
      const storedName = localStorage.getItem(STORAGE_KEYS.name);
      if (storedName && storedName.trim()) {
        setName(storedName.trim().slice(0, 24));
        setNameInput(storedName.trim().slice(0, 24));
      }
    } catch {}
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.stats);
      if (raw) setStats({ ...defaultStats, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const openFeature = (message) => {
    setModalMsg(message || 'This feature is under construction.');
    setModalOpen(true);
  };

  const shortcuts = useMemo(() => ([
    { key: 'review-vocab', icon: '📝', text: 'Review Vocab' },
    { key: 'practice-listening', icon: '🎧', text: 'Practice Listening' },
    { key: 'take-quiz', icon: '🧠', text: 'Take Quiz' },
    { key: 'grammar-tips', icon: '📚', text: 'Grammar Tips' },
    { key: 'speak-practice', icon: '🗣️', text: 'Speak Practice' },
  ]), []);

  const messages = {
    'start-lesson': 'Launching your next lesson soon. Get ready! 🚀',
    'review-vocab': 'Vocab review is on the way. 📚',
    'practice-listening': 'Tuning in for listening practice. 🎧',
    'take-quiz': 'Quiz time is coming up. 🧠',
    'grammar-tips': 'Loading handy grammar tips. ✍️',
    'speak-practice': 'Practice speaking with fun prompts. 🗣️',
  };

  const saveName = () => {
    const v = (nameInput || '').trim().slice(0, 24) || 'Friend';
    setName(v);
    try { localStorage.setItem(STORAGE_KEYS.name, v); } catch {}
  };

  return (
    <>
      <main className="container">
        {/* Greeting / Hero */}
        <section className="greeting-card" aria-labelledby="greeting-title">
          <div className="greeting-card__bg" aria-hidden="true">
            <span className="bubble b1"></span>
            <span className="bubble b2"></span>
            <span className="bubble b3"></span>
            <span className="bubble b4"></span>
          </div>
          <div className="greeting-card__content">
            <div className="mascot" aria-hidden="true">🦊</div>
            <h1 id="greeting-title" className="greeting">
              <span className="wave" aria-hidden="true">👋</span>
              {`Good ${greetTime}, `}
              <span className="name">{name}</span>!
            </h1>
            <p className="subtitle">Let’s make English learning fun today.</p>

            <div className="name-editor" role="group" aria-label="Set your name">
              <input
                className="input"
                type="text"
                placeholder="Enter your name"
                maxLength={24}
                aria-label="Your name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') saveName(); }}
              />
              <button className="btn primary" type="button" aria-label="Save name" onClick={saveName}>Save</button>
            </div>

            <div className="cta-row">
              <a
                href="#"
                className="btn cta"
                onClick={(e) => { e.preventDefault(); openFeature(messages['start-lesson']); }}
              >
                <span className="i" aria-hidden="true">🚀</span> Start Lesson
              </a>
              <a href="#shortcuts" className="btn ghost">See shortcuts</a>
            </div>
          </div>
        </section>

        {/* Quick Statistics */}
        <section className="stats" aria-label="Your learning stats">
          <article className="stat-card" title="Your current daily streak">
            <div className="icon" aria-hidden="true">🔥</div>
            <div className="value">{stats.streak}</div>
            <div className="label">Day Streak</div>
          </article>

          <article className="stat-card" title="Words you’ve learned">
            <div className="icon" aria-hidden="true">🔤</div>
            <div className="value">{stats.words}</div>
            <div className="label">Words Learned</div>
          </article>

          <article className="stat-card" title="Lessons you’ve completed">
            <div className="icon" aria-hidden="true">🎯</div>
            <div className="value">{stats.lessons}</div>
            <div className="label">Lessons Done</div>
          </article>

          <article className="stat-card" title="Minutes spent listening">
            <div className="icon" aria-hidden="true">🎧</div>
            <div className="value">{stats.minutes}</div>
            <div className="label">Listening Minutes</div>
          </article>
        </section>

        {/* Quick Access Shortcuts */}
        <section id="shortcuts" className="shortcuts" aria-label="Quick access shortcuts">
          {shortcuts.map(s => (
            <a
              key={s.key}
              href="#"
              className="shortcut"
              onClick={(e) => { e.preventDefault(); openFeature(messages[s.key]); }}
            >
              <span className="icon" aria-hidden="true">{s.icon}</span>
              <span className="text">{s.text}</span>
            </a>
          ))}
          <Link to="/flashcards" className="shortcut">
            <span className="icon" aria-hidden="true">🃏</span>
            <span className="text">Flashcards</span>
          </Link>
        </section>
      </main>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalMsg}
      </Modal>
    </>
  );
}

