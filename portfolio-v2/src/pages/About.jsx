import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typewriter } from "react-simple-typewriter";

import ProjectLightbox from "../components/project/ProjectLightbox";
import ContactForm from "../components/ContactForm";
import AboutNav from "../components/AboutNav";
import Snow from "../components/Snow";
import "./About.css";

import PhotoSapporo from "../assets/SAPPORO.png";
import PhotoSnow from "../assets/YURI_SNOW.png";
import PhotoProfile from "../assets/YURIPROFILE.png";

// ─── Timeline data ────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: "2025 – 2026",
    role: "Bachelor of Creative Industries",
    org: "BCIT (in progress)",
    desc: null,
    highlight: false,
    photo: null,
  },
  {
    year: "2026",
    role: "Case Team Member",
    org: "BCIT Marketing Association",
    desc: "Placed 2nd among 110+ universities across the U.S. and Canada in the AMA Collegiate Case Competition. Led visual direction and built a 150+ slide deck for a strategic MLB marketing campaign targeting Gen Z.",
    highlight: true,
    photo: null,
  },
  {
    year: "2025 – Present",
    role: "Photo Lab Specialist",
    org: "London Drugs",
    desc: "Produced in-Produced in-store promotional displays and large-format print outputs using Adobe Photoshop and Epson printing systems.",
    highlight: false,
    photo: null,
  },
  {
    year: "2025 – 2026",
    role: "Design Assistant",
    org: "SMILETECH",
    desc: "Developed branding for a Roblox B2B marketplace and designed curriculum materials for a Minecraft-based English learning program.",
    highlight: false,
    photo: null,
  },
  {
    year: "2024 – 2025",
    role: "Diploma, New Media Design & Web Development",
    org: "BCIT — With Distinction (90%)",
    desc: null,
    highlight: false,
    photo: null,
  },
  {
    year: "2024 – 2025",
    role: "Photographer",
    org: "Spark CG Society",
    desc: "Captured photo and video content for event website and social media.",
    highlight: false,
    photo: null,
  },
  {
    year: "2024",
    role: "✦ Moved to Vancouver",
    org: null,
    desc: null,
    highlight: true,
    photo: null,
  },
  {
    year: "2018 – 2023",
    role: "Food & Hospitality",
    org: "Japan — Sapporo · Chitose · Shiraoi",
    desc: "From From restaurants in Sapporo to an airport lounge in Chitose, and assisted cultural event at the National Ainu Museum — these experiences placed me in multicultural environments early on. Serving customers in English, learning Ainu indigenous culture, and working across communities quietly built the cross-cultural awareness that drives my work today.",
    highlight: false,
    photo: null,
  },
];

// ─── Section nav config ───────────────────────────────────────────────────────
const SECTIONS = [
  { id: "roots", label: "Early Roots" },
  { id: "inspirations", label: "Inspirations" },
  { id: "career", label: "Career" },
  { id: "contact", label: "Contact" },
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
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [rotate]);

  return (
    <div
      ref={ref}
      className="sticker"
      style={{ "--rotate": `${rotate}deg`, "--size": `${size}px` }}
    >
      <div className={`sticker__frame ${!src ? "sticker__frame--empty" : ""}`}>
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
function FadeBlock({ children, delay = 0, className = "" }) {
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
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ─── Polaroid scatter config ──────────────────────────────────────────────────
const ROTATIONS = [-8, 4, -12, 6, -3, 9, -6, 11];
const X_OFFSETS = [-30, 35, -5, 42, -38, 18, -22, 38];

// ─── Timeline ─────────────────────────────────────────────────────────────────
function Timeline({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobilePhotoIndex, setMobilePhotoIndex] = useState(0);
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);
  const [mobileGalleryDone, setMobileGalleryDone] = useState(false);
  const [allItemsSeen, setAllItemsSeen] = useState(false);
  const animatedRef = useRef(new Set());
  const seenRef = useRef(false);

  const itemRefs = useRef([]);
  const barFillRef = useRef(null);
  const photoRefs = useRef([]);
  const leftRef = useRef(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Scroll spy
  useEffect(() => {
    const observers = items.map((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
            if (i === items.length - 1 && !seenRef.current) {
              seenRef.current = true;
              setAllItemsSeen(true);
              setMobileGalleryOpen(true);
            }
          }
        },
        { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [items]);

  // Grow bar fill
  useEffect(() => {
    if (!barFillRef.current) return;
    const pct =
      items.length <= 1 ? 0 : (activeIndex / (items.length - 1)) * 100;
    gsap.to(barFillRef.current, {
      height: `${pct}%`,
      duration: 0.55,
      ease: "power2.out",
    });
  }, [activeIndex, items.length]);

  // Desktop — position photo at item's vertical offset, animate in once
  useEffect(() => {
    if (animatedRef.current.has(activeIndex)) return;
    const itemEl = itemRefs.current[activeIndex];
    const photoEl = photoRefs.current[activeIndex];
    const leftEl = leftRef.current;
    if (!itemEl || !photoEl || !leftEl) return;
    animatedRef.current.add(activeIndex);
    const itemTop = itemEl.offsetTop + itemEl.offsetHeight / 2;
    const xOffset = X_OFFSETS[activeIndex % X_OFFSETS.length];
    const rotation = ROTATIONS[activeIndex % ROTATIONS.length];
    gsap.fromTo(
      photoEl,
      {
        opacity: 0,
        y: itemTop - 60,
        x: xOffset,
        rotation: rotation - 10,
        scale: 0.85,
      },
      {
        opacity: 1,
        y: itemTop - 110,
        x: xOffset,
        rotation: rotation,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.6)",
      }
    );
  }, [activeIndex]);

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
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // Mobile — lock scroll when gallery open
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (mobileGalleryOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileGalleryOpen]);

  const closeMobileGallery = (e) => {
    e.stopPropagation();
    setMobileGalleryOpen(false);
    setMobilePhotoIndex(0);
    document.body.style.overflow = "";
  };

  const handleMobileTap = () => {
    const next = mobilePhotoIndex + 1;
    if (next >= items.length) {
      setMobileGalleryOpen(false);
      setMobileGalleryDone(true);
      document.body.style.overflow = "";
    } else {
      setMobilePhotoIndex(next);
    }
  };

  const reversedItems = [...items].reverse();

  const lightboxItems = items.map((item) => ({
    src: item.photo || null,
    color: "#E8EEFF",
    alt: item.role,
    caption: [item.role, item.org, item.year].filter(Boolean).join(" · "),
  }));

  return (
    <div className="timeline">
      {/* ── LEFT: bar + items ──────────────────────────────────────────── */}
      <div className="timeline__left" ref={leftRef}>
        <div className="timeline__bar">
          <div className="timeline__bar-track" />
          <div className="timeline__bar-fill" ref={barFillRef} />
        </div>

        <div className="timeline__items">
          {items.map((item, i) => {
            const isPassed = i < activeIndex;
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className={[
                  "timeline-item",
                  item.highlight ? "timeline-item--highlight" : "",
                  isActive ? "timeline-item--active" : "",
                  isPassed ? "timeline-item--passed" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="timeline-item__icon">
                  {isPassed || isActive ? (
                    <div className="timeline-item__paw" />
                  ) : (
                    <span className="timeline-item__dot" />
                  )}
                </div>
                <div className="timeline-item__year">{item.year}</div>
                <div className="timeline-item__content">
                  {item.highlight && (
                    <span className="timeline-item__badge">★ Highlight</span>
                  )}
                  <div className="timeline-item__role" data-year={item.year}>
                    {item.role}
                  </div>
                  {item.org && (
                    <div className="timeline-item__org">{item.org}</div>
                  )}
                  {item.desc && (
                    <p className="timeline-item__desc">{item.desc}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT: desktop scatter (hidden on mobile) ──────────────────── */}
      <div className="timeline__photos">
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => (photoRefs.current[i] = el)}
            className="timeline__polaroid"
            style={{
              opacity: 0,
              zIndex: i + 1,
              pointerEvents: i <= activeIndex ? "auto" : "none",
              cursor: "pointer",
            }}
            onClick={() => {
              setLightboxIndex(i);
              setLightboxOpen(true);
            }}
          >
            {item.photo ? (
              <img
                src={item.photo}
                alt={item.role}
                className="timeline__polaroid-img"
              />
            ) : (
              <div className="timeline__polaroid-placeholder" />
            )}
          </div>
        ))}
      </div>

      {/* ── MOBILE: lightbox gallery ────────────────────────────────────── */}
      {mobileGalleryOpen && (
        <div className="timeline__mobile-gallery">
          <div className="timeline__mobile-overlay" onClick={handleMobileTap} />
          <button
            className="timeline__mobile-close"
            onClick={closeMobileGallery}
          >
            ×
          </button>
          <div className="timeline__mobile-stack" onClick={handleMobileTap}>
            {reversedItems.map((item, i) => (
              <div
                key={i}
                className={[
                  "timeline__mobile-card",
                  i === mobilePhotoIndex ? "active" : "",
                  i < mobilePhotoIndex ? "gone" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  "--tl-rotate": `${ROTATIONS[i % ROTATIONS.length]}deg`,
                }}
              >
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt={item.role}
                    className="timeline__polaroid-img"
                  />
                ) : (
                  <div className="timeline__polaroid-placeholder" />
                )}
                <div className="timeline__mobile-caption">
                  <p className="timeline__mobile-role">{item.role}</p>
                  {item.org && (
                    <p className="timeline__mobile-org">{item.org}</p>
                  )}
                  <p className="timeline__mobile-year">{item.year}</p>
                </div>
                {i === 0 && mobilePhotoIndex === 0 && (
                  <span className="timeline__mobile-tap-hint">Tap!</span>
                )}
              </div>
            ))}
          </div>
          <div className="timeline__mobile-dots">
            {items.map((_, i) => (
              <span
                key={i}
                className={`timeline__mobile-dot ${
                  i <= mobilePhotoIndex ? "active" : ""
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── MOBILE: pile preview after gallery done ─────────────────────── */}
      {mobileGalleryDone && !mobileGalleryOpen && (
        <div
          className="timeline__mobile-pile"
          onClick={() => {
            setMobilePhotoIndex(0);
            setMobileGalleryOpen(true);
          }}
        >
          {items.slice(0, 3).map((item, i) => (
            <div
              key={i}
              className="timeline__mobile-pile-card"
              style={{
                "--pile-rotate": `${[-6, 2, -10][i]}deg`,
                "--pile-z": i,
              }}
            >
              {item.photo ? (
                <img
                  src={item.photo}
                  alt={item.role}
                  className="timeline__mobile-pile-img"
                />
              ) : (
                <div className="timeline__mobile-pile-placeholder" />
              )}
            </div>
          ))}
          <span className="timeline__mobile-pile-hint">View photos ↑</span>
        </div>
      )}

      {lightboxOpen && (
        <ProjectLightbox
          items={lightboxItems}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────
function About() {
  const heroRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelectorAll(".hero-child"),
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.16,
        ease: "power3.out",
        delay: 0.15,
      }
    );
  }, []);

  return (
    <div className="about">
      <AboutNav sections={SECTIONS} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="about-hero" ref={heroRef}>
        <div className="container about-hero__inner">
          <div className="about-hero__text">
            <h1 className="about-hero__name hero-child">
              <Typewriter
                words={[
                  "Call me Yuri.",
                  "Creative Strategist.",
                  "Visual Communicator.",
                ]}
                loop={true}
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </h1>
            <p className="about-hero__bio hero-child">
              Born in Sapporo, raised by snow and long winters spent indoors. I
              filled those hours sketching, sticking stickers on everything, and
              chasing every curiosity my family was kind enough to let me
              follow, which eventually led me across the Pacific Ocean. That
              restless creativity became the foundation of my work, and still
              drives everything I make today.
            </p>
            <div className="about-hero__bottom hero-child">
              <p className="about-hero__doodle">Sapporo → Vancouver ✈</p>
              <button
                className="about-hero__scroll"
                onClick={() =>
                  document
                    .getElementById("roots")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                read my story ↓
              </button>
            </div>
          </div>
          <div className="about-hero__photos hero-child">
            <div className="photo-stack__card photo-stack__card--left">
              <div className="photo-stack__washi photo-stack__washi--1" />
              <img src={PhotoProfile} alt="Yuri" />
            </div>
            <div className="photo-stack__card photo-stack__card--center">
              <div className="photo-stack__washi photo-stack__washi--2" />
              <img src={PhotoSnow} alt="Yuri in the snow" />
            </div>
            <div className="photo-stack__card photo-stack__card--right">
              <div className="photo-stack__washi photo-stack__washi--3" />
              <img src={PhotoSapporo} alt="Sapporo" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Early Roots ───────────────────────────────────────────────────── */}
      <section id="roots" className="about-section">
        <div className="container">
          <p className="about-section__chapter">Chapter 01</p>
          <h2 className="about-section__title">
            Early Roots <span className="about-section__snowflake">❄</span>
          </h2>

          <div className="about-roots__grid">
            <FadeBlock delay={0} className="about-roots__card">
              <p className="about-roots__card-tag">Place</p>
              <h3 className="about-roots__card-title">Sapporo, Hokkaido</h3>
              <p>
                A city surrounded by nature in summer and buried in snow through
                the long winter. When you're stuck inside, you find ways to
                explore yourself. I filled mine with doodling, daydreaming, and
                letting my imagination run — picture books, classic novels,
                manga, films. I consumed everything.
              </p>
            </FadeBlock>
            <FadeBlock delay={0.1} className="about-roots__card">
              <p className="about-roots__card-tag">People</p>
              <h3 className="about-roots__card-title">A creative family</h3>
              <p>
                In my kindergarten yearbook, when asked about my dream, I wrote
                one word: <em>designer.</em> My mother was a fashion designer.
                My father always supported whatever I was curious about. My
                grandfather's bonsai garden, my grandmother's home cooking — the
                beauty of culture all around me became part of who I am.
              </p>
            </FadeBlock>
            <FadeBlock delay={0.2} className="about-roots__card">
              <p className="about-roots__card-tag">Goal</p>
              <h3 className="about-roots__card-title">A life across borders</h3>
              <p>
                Learning English opened a new door. I started dreaming of a life
                that crossed borders — cultures, languages, aesthetics. The
                instinct was always the same: find something beautiful,
                understand why it moves you, and bring that feeling to
                everything you make.
              </p>
            </FadeBlock>
          </div>
        </div>
      </section>

      {/* ── Inspirations ──────────────────────────────────────────────────── */}
      <section
        id="inspirations"
        className="about-section about-section--inspirations"
      >
        <div className="container">
          <div className="about-inspirations__split">
            {/* Left — no bg, left padding matches .container */}
            <div className="about-inspirations__left">
              <p className="about-section__chapter">Chapter 02</p>
              <h2 className="about-section__title">
                My inspiration,
                <br /> Peeks of my snow days.
              </h2>
              <p className="about-section__lead">
                Sapporo's long winters offer plenty of time. All the activities
                and hobbies I loved were right there.
              </p>
              <p className="about-inspirations__trinket-text">
                — and ofc I collect the trinkets!
              </p>
            </div>

            {/* Right — dark bg + snow, desktop = lightbox trigger */}
            <div
              className="about-inspirations__right"
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="Open inspirations gallery"
              onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
            >
              <Snow />
              <div className="about-inspirations__right-inner">
                <div className="about-stickers">
                  <Sticker
                    src={null}
                    label="Yumeji Takehisa"
                    rotate={-4}
                    size={150}
                  />
                  <Sticker
                    src={null}
                    label="Osamu Dazai"
                    rotate={2}
                    size={160}
                  />
                  <Sticker
                    src={null}
                    label="Junichi Nakahara"
                    rotate={-2}
                    size={150}
                  />
                </div>
                <div className="about-stickers about-stickers--trinkets">
                  <Sticker
                    src={null}
                    label="Trinket 01"
                    rotate={3}
                    size={120}
                  />
                  <Sticker
                    src={null}
                    label="Trinket 02"
                    rotate={-5}
                    size={130}
                  />
                  <Sticker
                    src={null}
                    label="Trinket 03"
                    rotate={2}
                    size={120}
                  />
                  <Sticker
                    src={null}
                    label="Trinket 04"
                    rotate={-3}
                    size={130}
                  />
                </div>
                <p className="about-inspirations__hint">✦ click to explore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inspirations Lightbox — desktop only ──────────────────────────── */}
      {lightboxOpen && (
        <div className="insp-lightbox" onClick={() => setLightboxOpen(false)}>
          <button
            className="insp-lightbox__close"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>
          <div
            className="insp-lightbox__inner"
            onClick={(e) => e.stopPropagation()}
          >
            <Snow />
            <div className="insp-lightbox__content">
              <p className="about-section__chapter insp-lightbox__chapter">
                My Inspirations
              </p>
              <h2 className="insp-lightbox__title">Peeks of my snow days.</h2>
              <div className="about-stickers" style={{ marginTop: "48px" }}>
                <Sticker
                  src={null}
                  label="Yumeji Takehisa"
                  rotate={-4}
                  size={190}
                />
                <Sticker src={null} label="Osamu Dazai" rotate={2} size={200} />
                <Sticker
                  src={null}
                  label="Junichi Nakahara"
                  rotate={-2}
                  size={190}
                />
              </div>
              <p className="insp-lightbox__trinket-label">My trinkets</p>
              <div className="about-stickers about-stickers--trinkets">
                <Sticker src={null} label="Trinket 01" rotate={3} size={155} />
                <Sticker src={null} label="Trinket 02" rotate={-5} size={165} />
                <Sticker src={null} label="Trinket 03" rotate={2} size={155} />
                <Sticker src={null} label="Trinket 04" rotate={-3} size={165} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Career & Education ────────────────────────────────────────────── */}
      <section id="career" className="about-section">
        <div className="container">
          <p className="about-section__chapter">Chapter 03</p>
          <h2 className="about-section__title">Career & Education</h2>
          <Timeline items={TIMELINE} />
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section id="contact" className="about-contact">
        <Snow />
        <div className="container about-contact__inner">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export default About;
