import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './Footer.css';

import TanukiImg from '../assets/tanuki-footer.svg';
import AirplaneImg from '../assets/airplane.svg';

function Footer() {
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const distance = isMobile ? '120vw' : '130vw';

    gsap.fromTo('.footer__airplane--1',
      { x: '-20vw', y: '0vh' },
      { x: distance, y: '-3vh', rotation: 3, duration: 10, ease: 'power1.inOut', repeat: -1 }
    );

    gsap.fromTo('.footer__airplane--2',
      { x: '-30vw', y: '2vh' },
      { x: distance, y: '-1vh', rotation: 2, duration: 14, ease: 'power1.inOut', repeat: -1, delay: 3 }
    );
  }, []);

  return (
    <footer className="footer" id="pageFooter">

      {/* Airplanes */}
      <img src={AirplaneImg} alt="" className="footer__airplane footer__airplane--1" />
      <img src={AirplaneImg} alt="" className="footer__airplane footer__airplane--2" />

      <div className="footer__main container">

        {/* Left — Pages */}
        <div className="footer__col">
          <p className="footer__col-title">PAGES</p>
          <button onClick={() => navigate('/project')}>Project</button>
          <button onClick={() => navigate('/asobiba')}>Asobiba</button>
          <button onClick={() => navigate('/about')}>About</button>
        </div>

        {/* Center — Tanuki */}
        <div className="footer__tanuki">
          <img src={TanukiImg} alt="Tanuki mascot" />
        </div>

        {/* Right — Connect */}
        <div className="footer__col footer__col--right">
          <p className="footer__col-title">CONNECT</p>
          <a href="https://www.linkedin.com/in/yurino-murakami-047175318" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/lilyzvillage.design/" target="_blank" rel="noopener noreferrer">Instagram</a>
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
