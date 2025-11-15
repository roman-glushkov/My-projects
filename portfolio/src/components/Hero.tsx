import React from 'react';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h2>Привет! Я — фронтенд-разработчик</h2>
        <p>Создаю современные сайты и веб-приложения.</p>
        <a href="#projects" className="btn">
          Мои работы
        </a>
      </div>
    </section>
  );
}
