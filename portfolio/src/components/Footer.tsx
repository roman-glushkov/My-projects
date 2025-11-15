import React from 'react';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} MyPortfolio. Все права защищены.</p>
      </div>
    </footer>
  );
}
