import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Flashcards from './pages/Flashcards.jsx';
import Topic from './pages/Topic.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/flashcards/:slug" element={<Topic />} />
    </Routes>
  );
}
