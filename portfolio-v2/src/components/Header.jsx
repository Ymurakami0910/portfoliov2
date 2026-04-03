import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../assets/logo.svg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <NavLink to="/" className="header__logo">
          <img src={Logo} alt="Yuri's Studio" />
          <span className="header__logo-text">Yurino Murakami</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="header__nav">
          <NavLink to="/project" className={({ isActive }) => `header__link ${isActive ? 'active' : ''}`}>Project</NavLink>
          <NavLink to="/about" className={({ isActive }) => `header__link ${isActive ? 'active' : ''}`}>Asobiba</NavLink>
          <NavLink to="/about" className={({ isActive }) => `header__link ${isActive ? 'active' : ''}`}>About</NavLink>
        </nav>

        {/* Mobile hamburger */}
        <button className="header__burger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile overlay */}
      <div className={`header__overlay ${isMenuOpen ? 'open' : ''}`}>
        <button className="header__close" onClick={() => setIsMenuOpen(false)}>×</button>
        <nav className="header__overlay-nav">
          <NavLink to="/project" onClick={() => setIsMenuOpen(false)}>Project</NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>Asobiba</NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
