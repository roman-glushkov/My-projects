import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export function Editor() {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Landing Page', desc: 'Красивый лендинг для стартапа.' },
    { id: 2, title: 'Сайт фотографа', desc: 'Портфолио с галереей и отзывами.' },
    { id: 3, title: 'Dashboard', desc: 'Панель аналитики с графиками.' },
  ]);

  const handleAddProject = (title: string, desc: string) => {
    setProjects([...projects, { id: Date.now(), title, desc }]);
  };

  return (
    <>
      <Header />
      <Hero />
      <Projects projects={projects} />
      <ContactForm onAddProject={handleAddProject} />
      <Footer />
    </>
  );
}
