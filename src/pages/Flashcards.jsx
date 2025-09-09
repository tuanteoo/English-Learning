import React from 'react';
import { Link } from 'react-router-dom';
import { TOPICS } from '../data/topics.js';

export default function Flashcards() {
  return (
    <main className="container">
      <header className="page-header" aria-labelledby="page-title">
        <Link to="/" className="btn ghost" aria-label="Back to homepage">⬅ Home</Link>
        <div className="page-header__titles">
          <h1 id="page-title" className="page-title">Flashcards</h1>
          <p className="subtitle">Choose a topic to practice vocabulary.</p>
        </div>
      </header>

      <section className="topics-grid" aria-label="Vocabulary topics">
        {TOPICS.map(({ slug, name, icon }) => (
          <Link key={slug} to={`/flashcards/${slug}`} className="topic-card">
            <span className="icon" aria-hidden="true">{icon}</span>
            <span className="text">{name}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
