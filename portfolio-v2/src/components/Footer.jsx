import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';


import TanukiImg from '../assets/tanuki-footer.svg'

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer" id="pageFooter">
      <div className="footer__main container">

        {/* Left — Pages */}
        <div className="footer__col">
          <p className="footer__col-title">PAGES</p>
          <button onClick={() => navigate('/project')}>Project</button>
          <button onClick={() => navigate('/about')}>Asobiba</button>
          <button onClick={() => navigate('/about')}>About</button>
        </div>

        {/* Center — Tanuki */}
        <div className="footer__tanuki">
            <img src={TanukiImg} alt="Tanuki" />
        </div>

        {/* Right — Connect */}
        <div className="footer__col footer__col--right">
          <p className="footer__col-title">CONNECT</p>
          <a href="https://www.linkedin.com/in/yurino-murakami-047175318" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/lilyzvillage.ca/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <button onClick={() => navigate('/contact')}>Email</button>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom container">
        <p>lilyzvillage@2026</p>
        <p>Let's be a Tomodachi!</p>
      </div>

      {/* Tanuki note */}
      <div className="footer__tanuki-note container">
        <span className="footer__tanuki-q">Why a tanuki?</span>
        <span className="footer__tanuki-a">
          In Japanese folklore, they're known for their adaptability and clever nature. Just like me.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
