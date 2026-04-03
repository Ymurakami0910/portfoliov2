import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectNav.css';

const ProjectNav = ({ sections }) => {
  const [active, setActive] = useState(sections[0]?.id || '');
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  // Hide when footer is visible
  useEffect(() => {
    const footer = document.getElementById('pageFooter');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Highlight active section
  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, [sections]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (hidden) return null;

  return (
    <nav className="project-nav">
      <button className="project-nav__home" onClick={() => navigate('/')}>
        ← HOME
      </button>
      <ul className="project-nav__list">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              className={`project-nav__item ${active === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProjectNav;
