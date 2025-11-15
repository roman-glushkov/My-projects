import React, { useState } from 'react';
import './ContactForm.css';

interface ContactFormProps {
  onAddProject: (title: string, desc: string) => void;
}

export function ContactForm({ onAddProject }: ContactFormProps) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && desc) {
      onAddProject(title, desc);
      setTitle('');
      setDesc('');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Свяжитесь со мной</h2>
        <form className="contact__form" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название проекта"
            required
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Описание проекта"
            required
          />
          <button type="submit">Добавить проект</button>
        </form>
      </div>
    </section>
  );
}
