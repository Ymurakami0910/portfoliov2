import React, { useState, useEffect } from 'react';
import './AboutNav.css';

/**
 * AboutNav
 * --------
 * Desktop : fixed left sidebar (unchanged from current About design)
 * Mobile  : fixed horizontal bar just below header, underline-style active (like ProjectNav)
 * Both    : fade out when footer (#pageFooter) enters viewport
 *
 * Props:
 *   sections — array of { id, label }
 */
const AboutNav = ({ sections }) => {
  const [active, setActive]   = useState(sections[0]?.id || '');
  const [visible, setVisible] = useState(true);

  // ── Fade out when footer is visible ──────────────────────────────────────
  useEffect(() => {
    const footer = document.getElementById('pageFooter');
    if (!footer) return;

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  // ── Scroll spy ────────────────────────────────────────────────────────────
  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [sections]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`about-nav ${visible ? '' : 'about-nav--hidden'}`}>
      {/* ── Desktop: vertical sidebar ───────────────────────────────────── */}
      <ul className="about-nav__sidebar">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              className={`about-nav__sidebar-item ${active === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              <span className="about-nav__sidebar-line" />
              <span className="about-nav__sidebar-label">{label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* ── Mobile: horizontal underline bar ────────────────────────────── */}
      <ul className="about-nav__bar">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              className={`about-nav__bar-item ${active === id ? 'active' : ''}`}
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

export default AboutNav;
