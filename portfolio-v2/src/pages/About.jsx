import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from '../components/ContactForm';
import AboutNav from '../components/AboutNav';
import StepIcon from '../assets/step.svg';
import './About.css';

// ─── Timeline data ────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: '2025 – 2026',
    role: 'Bachelor of Creative Industries',
    org: 'BCIT (in progress)',
    desc: null,
    highlight: false,
  },
  {
    year: '2026',
    role: 'Case Team Member',
    org: 'BCIT Marketing Association',
    desc: 'Placed 2nd among 110+ universities across the U.S. and Canada in the AMA Collegiate Case Competition. Led visual direction and built a 150+ slide deck for a strategic MLB marketing campaign targeting Gen Z.',
    highlight: true,
  },
  {
    year: '2025 – Present',
    role: 'Photo Lab Specialist',
    org: 'London Drugs',
    desc: 'Produced in-store promotional displays and large-format print outputs using Adobe Photoshop and Epson printing systems.',
    highlight: false,
  },
  {
    year: '2025 – 2026',
    role: 'Design Assistant',
    org: 'SMILETECH',
    desc: 'Developed branding for a Roblox B2B marketplace and designed curriculum materials for a Minecraft-based English learning program.',
    highlight: false,
  },
  {
    year: '2024 – 2025',
    role: 'Diploma, New Media Design & Web Development',
    org: 'BCIT — With Distinction (90%)',
    desc: null,
    highlight: false,
  },
  {
    year: '2024 – 2025',
    role: 'Photographer',
    org: 'Spark CG Society',
    desc: 'Captured photo and video content for event website and social media.',
    highlight: false,
  },
  {
    year: '2024',
    role: '✦ Moved to Vancouver',
    org: null,
    desc: null,
    highlight: true,
  },
  {
    year: '2018 – 2023',
    role: 'Food & Hospitality',
    org: 'Japan — Sapporo · Chitose · Shiraoi',
    desc: 'From restaurants in Sapporo to an airport lounge in Chitose, and assisted cultural event at the National Ainu Museum — these experiences placed me in multicultural environments early on. Serving customers in English, learning Ainu indigenous culture, and working across communities quietly built the cross-cultural awareness that drives my work today.',
    highlight: false,
  },
];

// ─── Section nav config ───────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'roots',        label: 'Early Roots' },
  { id: 'inspirations', label: 'Inspirations' },
  { id: 'career',       label: 'Career' },
  { id: 'contact',      label: 'Contact' },
];

// ─── Sticker ──────────────────────────────────────────────────────────────────
function Sticker({ src, label, rotate = 0, size = 150 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 36, rotation: rotate - 8, scale: 0.82 },
      {
        opacity: 1,
        y: 0,
        rotation: rotate,
        scale: 1,
        duration: 0.9,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [rotate]);

  return (
    <div ref={ref} className="sticker" style={{ '--rotate': `${rotate}deg`, '--size': `${size}px` }}>
      <div className={`sticker__frame ${!src ? 'sticker__frame--empty' : ''}`}>
        {src ? (
          <img src={src} alt={label} className="sticker__img" />
        ) : (
          <div className="sticker__placeholder">
            <span className="sticker__placeholder-icon">✦</span>
            <span className="sticker__placeholder-label">{label}</span>
          </div>
        )}
      </div>
      {label && src && <p className="sticker__caption">{label}</p>}
    </div>
  );
}

// ─── FadeBlock ────────────────────────────────────────────────────────────────
function FadeBlock({ children, delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function Timeline({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);
  const barFillRef = useRef(null);

  // Scroll spy — whichever item enters the viewport center becomes active
  useEffect(() => {
    const observers = items.map((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [items]);

  // Animate bar fill height as user scrolls through items
  useEffect(() => {
    if (!barFillRef.current) return;
    const pct = items.length <= 1 ? 0 : (activeIndex / (items.length - 1)) * 100;
    gsap.to(barFillRef.current, {
      height: `${pct}%`,
      duration: 0.55,
      ease: 'power2.out',
    });
  }, [activeIndex, items.length]);

  // Entrance animation per row
  useEffect(() => {
    itemRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <div className="timeline">
      {/* ── Continuous bar (track + fill) ──────────────────────────────── */}
      <div className="timeline__bar">
        <div className="timeline__bar-track" />
        <div className="timeline__bar-fill" ref={barFillRef} />
      </div>

      {/* ── Items ──────────────────────────────────────────────────────── */}
      <div className="timeline__items">
        {items.map((item, i) => {
          const isPassed = i < activeIndex;
          const isActive = i === activeIndex;

          return (
            <div
              key={i}
              ref={el => (itemRefs.current[i] = el)}
              className={[
                'timeline-item',
                item.highlight  ? 'timeline-item--highlight' : '',
                isActive        ? 'timeline-item--active'    : '',
                isPassed        ? 'timeline-item--passed'    : '',
              ].filter(Boolean).join(' ')}
            >
              {/* Icon */}
              <div className="timeline-item__icon">
                {isPassed || isActive ? (
                  <img src={StepIcon} alt="" className="timeline-item__paw" />
                ) : (
                  <span />
                )}
              </div>

              {/* Year */}
              <div className="timeline-item__year">{item.year}</div>

              {/* Content */}
              <div className="timeline-item__content">
                {item.highlight && (
                  <span className="timeline-item__badge">★ Highlight</span>
                )}
                <div className="timeline-item__role" data-year={item.year}>{item.role}</div>
                {item.org  && <div className="timeline-item__org">{item.org}</div>}
                {item.desc && <p className="timeline-item__desc">{item.desc}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────
function About() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelectorAll('.hero-child'),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.16, ease: 'power3.out', delay: 0.15 }
    );
  }, []);

  return (
    <div className="about">
      <AboutNav sections={SECTIONS} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="about-hero" ref={heroRef}>
        <div className="container about-hero__inner">
          <div className="about-hero__text">
            <p className="about-hero__eyebrow hero-child">Creative Strategist · Brand Designer</p>
            <h1 className="about-hero__name hero-child">Yurino<br />Murakami</h1>
            <p className="about-hero__bio hero-child">
              I grew up in Sapporo, buried in snow and full of ideas —
              a designer since kindergarten, chasing beauty across cultures,
              languages, and the small details most people walk past.
            </p>
          </div>
          <blockquote className="about-hero__quote hero-child">
            "I collect trinkets. Small, curious, beautiful things
            with stories attached. It's the same instinct, really —
            finding meaning in the details."
          </blockquote>
        </div>
      </section>

      {/* ── Early Roots ───────────────────────────────────────────────────── */}
      <section id="roots" className="about-section">
        <div className="container">

            <p className="about-section__chapter">Chapter 01</p>
            <h2 className="about-section__title">Early Roots</h2>
          
          <div className="about-roots__grid">
            <FadeBlock delay={0} className="about-roots__card">
              <p className="about-roots__card-tag">Place</p>
              <h3 className="about-roots__card-title">Sapporo, Hokkaido</h3>
              <p>A city surrounded by nature in summer and buried in snow through the long winter. When you're stuck inside, you find ways to explore yourself. I filled mine with doodling, daydreaming, and letting my imagination run — picture books, classic novels, manga, films. I consumed everything.</p>
            </FadeBlock>
            <FadeBlock delay={0.1} className="about-roots__card">
              <p className="about-roots__card-tag">People</p>
              <h3 className="about-roots__card-title">A creative family</h3>
              <p>In my kindergarten yearbook, when asked about my dream, I wrote one word: <em>designer.</em> My mother was a fashion designer. My father always supported whatever I was curious about. My grandfather's bonsai garden, my grandmother's home cooking — the beauty of culture all around me became part of who I am.</p>
            </FadeBlock>
            <FadeBlock delay={0.2} className="about-roots__card">
              <p className="about-roots__card-tag">Goal</p>
              <h3 className="about-roots__card-title">A life across borders</h3>
              <p>Learning English opened a new door. I started dreaming of a life that crossed borders — cultures, languages, aesthetics. The instinct was always the same: find something beautiful, understand why it moves you, and bring that feeling to everything you make.</p>
            </FadeBlock>
          </div>
        </div>
      </section>

      {/* ── Inspirations ──────────────────────────────────────────────────── */}
      <section id="inspirations" className="about-section about-section--tinted">
        <div className="container">
          <div>
            <p className="about-section__chapter">Chapter 02</p>
            <h2 className="about-section__title">Inspirations</h2>
            <p className="about-section__lead">
              I was drawn to creators who lived between worlds — the Taisho and Meiji eras,
              where East and West quietly met. There's something in that collision of aesthetics
              that feels like home to me.
            </p>
          </div>
          <div className="about-stickers">
            <Sticker src={null} label="Yumeji Takehisa"  rotate={-4} size={150} />
            <Sticker src={null} label="Osamu Dazai"      rotate={2}  size={160} />
            <Sticker src={null} label="Junichi Nakahara" rotate={-2} size={150} />
          </div>
          <FadeBlock className="about-trinket-label">
            <p>— and then there are the trinkets.</p>
          </FadeBlock>
          <div className="about-stickers about-stickers--trinkets">
            <Sticker src={null} label="Trinket 01" rotate={3}  size={130} />
            <Sticker src={null} label="Trinket 02" rotate={-5} size={140} />
            <Sticker src={null} label="Trinket 03" rotate={2}  size={130} />
            <Sticker src={null} label="Trinket 04" rotate={-3} size={140} />
          </div>
        </div>
      </section>

      {/* ── Career & Education ────────────────────────────────────────────── */}
      <section id="career" className="about-section">
        <div className="container">
          <div>
            <p className="about-section__chapter">Chapter 03</p>
            <h2 className="about-section__title">Career & Education</h2>
          </div>
          <Timeline items={TIMELINE} />
        </div>
      </section>

      {/* ── Closing ───────────────────────────────────────────────────────── */}
      {/* <section className="about-closing">
        <div className="container">
          <FadeBlock className="about-closing__inner">
            <p className="about-section__chapter" style={{ textAlign: 'center' }}>Where it all leads</p>
            <h2 className="about-closing__line">
              Every trinket, every border crossed,<br />
              every detail noticed — it all ends up in the work.
            </h2>
            <p className="about-closing__sub">
              I'm looking for a place where design is taken seriously and culture is part of the brief.
              If that sounds like your studio, I'd love to talk.
            </p>
          </FadeBlock>
        </div>
      </section> */}

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section id="contact" className="about-contact">
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export default About;
