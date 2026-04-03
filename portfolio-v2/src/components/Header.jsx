import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from '../assets/logo.svg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // ← INSIDE the function

  const handleProjectClick = () => { // ← INSIDE the function
    if (window.location.pathname === '/') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 300); // ← increased to 300ms to give page time to load
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <NavLink to="/" className="header__logo">
          <img src={Logo} alt="Yuri's Studio" />
          <span className="header__logo-text">Yurino Murakami</span>
        </NavLink>

        <nav className="header__nav">
          <button className="header__link" onClick={handleProjectClick}>Project</button>
          <NavLink to="/asobiba" className={({ isActive }) => `header__link ${isActive ? 'active' : ''}`}>Asobiba</NavLink>
          <NavLink to="/about" className={({ isActive }) => `header__link ${isActive ? 'active' : ''}`}>About</NavLink>
        </nav>

        <button className="header__burger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
        </button>
      </div>

      <div className={`header__overlay ${isMenuOpen ? 'open' : ''}`}>
        <button className="header__close" onClick={() => setIsMenuOpen(false)}>×</button>
        <nav className="header__overlay-nav">
          <button className="header__link" onClick={handleProjectClick}>Project</button>
          <NavLink to="/asobiba" onClick={() => setIsMenuOpen(false)}>Asobiba</NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;