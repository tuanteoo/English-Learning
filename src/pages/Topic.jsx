import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTopicBySlug } from '../data/topics.js';

export default function Topic() {
  const { slug } = useParams();
  const topic = useMemo(() => getTopicBySlug(slug), [slug]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const current = topic?.words?.[index];

  useEffect(() => { setIndex(0); setFlipped(false); }, [slug]);

  const speak = useCallback(() => {
    if (!current) return;
    const text = current.word;
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      // Try to pick an English voice if available
      const voices = window.speechSynthesis.getVoices?.() || [];
      const en = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('en'));
      if (en) u.voice = en;
      window.speechSynthesis.speak(u);
    } catch {}
  }, [current]);

  const next = useCallback(() => {
    if (!topic?.words?.length) return;
    setIndex(i => (i + 1) % topic.words.length);
    setFlipped(false);
  }, [topic]);

  if (!topic) {
    return (
      <main className="container">
        <header className="page-header" aria-labelledby="page-title">
          <Link to="/flashcards" className="btn ghost" aria-label="Back to topics">⬅ Topics</Link>
          <div className="page-header__titles">
            <h1 id="page-title" className="page-title">Topic Not Found</h1>
            <p className="subtitle">This topic may be coming soon.</p>
          </div>
        </header>
      </main>
    );
  }

  return (
    <main className="container">
      <header className="page-header" aria-labelledby="page-title">
        <Link to="/flashcards" className="btn ghost" aria-label="Back to topics">⬅ Topics</Link>
        <div className="page-header__titles">
          <h1 id="page-title" className="page-title">{topic.name}</h1>
          <p className="subtitle">Tap the speaker to hear the word.</p>
        </div>
      </header>

      <section className="flashcard-wrap">
        <div className={`flashcard ${flipped ? 'is-flipped' : ''}`}>
          <button className="btn next-btn" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next word">Next ➜</button>
          <div className="flashcard__inner" onClick={() => setFlipped(f => !f)}>
            {/* Front face */}
            <div className="flashcard__face flashcard__face--front">
              <div className="flashcard__word-row">
                <div className="flashcard__word" aria-live="polite">{current?.word}</div>
                <button className="flashcard__speak" onClick={(e) => { e.stopPropagation(); speak(); }} aria-label="Speak word">🔊</button>
              </div>
              <div className="flashcard__meta">
                <span className="ipa">{current?.ipa}</span>
                {current?.pos && <span className="pos-tag" title="Part of speech">{current.pos}</span>}
              </div>
            </div>

            {/* Back face */}
            <div className="flashcard__face flashcard__face--back">
              <div className="flashcard__back-grid">
                <div className="flashcard__back-left">
                  <div className="flashcard__vi" aria-label="Vietnamese meaning">{current?.vi}</div>
                  <div className="flashcard__example" aria-label="Example sentence">{current?.example}</div>
                </div>
                <div className="flashcard__back-right" aria-hidden="false">
                  <div className="illustration" role="img" aria-label={`Illustration for ${current?.word}`}>
                    <span className="illustration__emoji">{current?.emoji || '✨'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
