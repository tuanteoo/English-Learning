import React from 'react';

export default function Modal({ open, title = 'Coming soon', children, onClose }) {
  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div className="modal__content" role="document">
        <h2 id="modal-title">{title}</h2>
        <div>{children || 'This feature is under construction.'}</div>
        <button className="btn primary" type="button" onClick={onClose} style={{ marginTop: 12 }}>Close</button>
      </div>
    </div>
  );
}

