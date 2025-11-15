import React from 'react';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  desc: string;
}

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Мои проекты</h2>
        <div className="projects__grid">
          {projects.map((p) => (
            <div key={p.id} className="project-card">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
