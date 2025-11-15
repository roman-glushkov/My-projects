import React from 'react';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">MyPortfolio</h1>
        <nav>
          <ul className="nav">
            <li>
              <a href="#projects">Проекты</a>
            </li>
            <li>
              <a href="#contact">Контакты</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
