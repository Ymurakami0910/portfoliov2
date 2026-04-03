import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ProjectBelt from '../components/Belt';
import './Asobiba.css';

import TanukiImg from "../assets/tanuki-wait.png"
import Past1 from "../assets/kissastore.png"
import Past2 from "../assets/crafted.jpg"
import Past3 from "../assets/celestrial.png"
import Past4 from "../assets/boba.jpg"

const BELT_IMAGES = [
  Past1,Past2,Past3,Past4
];


function Asobiba() {
  const navigate = useNavigate();
  const tanukiRef = useRef(null);
  const hardhatRef = useRef(null);

  useEffect(() => {
    // Tanuki bobbing
    gsap.to(tanukiRef.current, {
      y: -12,
      duration: 1.8,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Hard hat wiggle
    gsap.to(hardhatRef.current, {
      rotation: 8,
      duration: 0.4,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Stagger fade in cards
    gsap.fromTo('.asobiba__card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.4 }
    );
  }, []);

  return (
    <div className="asobiba">

      {/* ——— Hero ——— */}
      <section className="asobiba__hero">
      <button className="btn-outline asobiba__btn" onClick={() => navigate('/')}>
              ← Back to Home
      </button>
        <div className="container asobiba__hero-inner">

          <div className="asobiba__text">
            <p className="label asobiba__label">Asobiba · 遊び場</p>
            <h1 className="asobiba__title">
              Under<br />Construction.
            </h1>
            <p className="asobiba__sub">
              The tanuki is busy building something exciting here.
              <br />
              Check back soon!
            </p>
          </div>

          {/* Tanuki with hard hat */}
          <div className="asobiba__tanuki" ref={tanukiRef}>
            <div className="asobiba__tanuki-placeholder">
              <span ref={hardhatRef} className="asobiba__hardhat">🔨</span>
              <img className="asobiba__tanuki" src={TanukiImg} alt="Tanuki building" />
            </div>
          </div>

        </div>


      </section>
      {/* ——— Past project belt ——— */}
      <section className="asobiba__belt">
        <div className="container asobiba__belt-header">
          <p className="label">While you wait — past work</p>
        </div>
        <ProjectBelt images={BELT_IMAGES} />
      </section>

    </div>
  );
}

export default Asobiba;
