import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

import Cloud1 from '../assets/cloud1.png';
import Cloud2 from '../assets/cloud2.png';
import ProfileGif from '../assets/video.gif';
import StepSvg from '../assets/step.svg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    label: 'MLB – AMA Competition 2nd place',
    date: 'Fall 2025 – Winter 2026',
    title: 'Hits Home Campaign',
    slug: 'mlb',
    image: null,
    color: '#D9C5C0',
  },
  {
    id: 2,
    label: 'Charisma Cafe – FLUI Hackathon',
    date: 'Winter 2026',
    title: 'Charisma Cafe Rebranding',
    slug: 'kissa-tanpopo',
    image: null,
    color: '#C5C9D9',
  },
];

function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const cloud1DupRef = useRef(null);
  const cloud2DupRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);

  // Splash timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Animations
  useEffect(() => {
    if (showSplash) return;

    const ctx = gsap.context(() => {

      // Cloud 1
      gsap.fromTo(cloud1Ref.current,
        { x: '0vw' },
        { x: '-100vw', duration: 22, ease: 'none', repeat: -1 }
      );
      gsap.fromTo(cloud1DupRef.current,
        { x: '100vw' },
        { x: '0vw', duration: 22, ease: 'none', repeat: -1 }
      );

      // Cloud 2
      gsap.fromTo(cloud2Ref.current,
        { x: '0vw' },
        { x: '-100vw', duration: 30, ease: 'none', repeat: -1 }
      );
      gsap.fromTo(cloud2DupRef.current,
        { x: '100vw' },
        { x: '0vw', duration: 30, ease: 'none', repeat: -1 }
      );

      // Hero text
      gsap.fromTo('.hero__headline',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo('.hero__sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      );

      gsap.fromTo('.hero__profile',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      // Paw animation
      gsap.fromTo('.paw-item',
      { opacity: 0, y: -6 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        repeat: -1,
        duration: 0.4,
        ease: 'power1.out',
        delay: 1,
      }
    );

      // Scroll animations
      gsap.utils.toArray('.fadeIn').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

    }, heroRef);

    return () => ctx.revert(); // cleanup

  }, [showSplash]);

  return (
    <>
      {/* Splash */}
      {showSplash && (
        <div className="splash">
          <div className="splash__logo">Yuri's Studio</div>
          <div className="splash__sub">Brand Designer</div>
        </div>
      )}

      {/* HERO */}
      <section className="hero" ref={heroRef}>

        {/* Clouds */}
        <div className="hero__clouds">
          <div className="hero__cloud hero__cloud--1" ref={cloud1Ref}>
            <img src={Cloud1} alt="" />
          </div>
          <div className="hero__cloud hero__cloud--1 hero__cloud--dup" ref={cloud1DupRef}>
            <img src={Cloud1} alt="" />
          </div>

          <div className="hero__cloud hero__cloud--2" ref={cloud2Ref}>
            <img src={Cloud2} alt="" />
          </div>
          <div className="hero__cloud hero__cloud--2 hero__cloud--dup" ref={cloud2DupRef}>
            <img src={Cloud2} alt="" />
          </div>
        </div>

        <div className="container hero__inner">
          {/* Text */}
          <div className="hero__text">
            <h1 className="hero__headline">
              Crafting brands that<br />cross borders.
            </h1>
            <p className="hero__sub">
              Brand identity and marketing strategy for businesses<br />
              that want to be memorable.
            </p>
          </div>

          {/* Profile */}
          <div className="hero__profile">
            <img src={ProfileGif} alt="Yurino Murakami" className="hero__gif" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll">
          <span className="hero__scroll-label">scroll</span>
          <div className="hero__paws">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="paw-item">
              {i === 0 ? (
                <img src={StepSvg} alt="" className="paw-arrow" />
              ) : (
                <span className="paw-step">🐾</span>
              )}
            </div>
          ))}
</div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects">
        <div className="container">
          <div className="projects__header fadeIn">
            <p className="label">Selected Work</p>
          </div>

          <div className="projects__grid">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`project-card fadeIn project-card--${i % 2 === 0 ? 'tall' : 'short'}`}
                onClick={() => navigate(`/project/${project.slug}`)}
              >
                <div
                  className="project-card__image"
                  style={{ background: project.color }}
                >
                  {project.image
                    ? <img src={project.image} alt={project.title} />
                    : <div className="project-card__placeholder" />
                  }
                </div>

                <div className="project-card__info">
                  <div className="project-card__meta">
                    <span className="label">{project.label}</span>
                    <span className="label project-card__date">{project.date}</span>
                  </div>
                  <h3 className="project-card__title">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;