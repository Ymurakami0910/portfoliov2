import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ResearchStats.css';

gsap.registerPlugin(ScrollTrigger);

const MLB_NAVY = '#041E42';

const STATS = [
  {
    value: '35%',
    label: 'of Gen Z identify as casual MLB fans',
    sub: 'Ranking baseball 4th behind NFL, NBA, and college football',
    source: 'Morning Consult, 2022',
  },
  {
    value: '57',
    label: 'Average age of an MLB viewer',
    sub: 'And that number keeps climbing',
    source: 'RockWater, 2022',
  },
  {
    value: '23%',
    label: 'of Gen Z watch full games',
    sub: '60% engage only through social media, highlights, and clips',
    source: 'BCITMA Case Team, 2025',
  },
  {
    value: '6hrs',
    label: 'Gen Z spends on social platforms daily',
    sub: '56% say social content is more relevant than traditional TV',
    source: 'Deloitte, 2025',
  },
  {
    value: '3.5/5',
    label: 'MLB brand sentiment score among Gen Z',
    sub: 'Not disliked — neutral. In the attention economy, neutral means forgettable.',
    source: 'BCITMA Case Team, 2025',
    highlight: true,
  },
];

const COMPETITORS = [
  {
    label: 'Gaming',
    stat: '7–10 hrs/week',
    detail: 'Over 70% of Gen Z say gaming helps them feel socially connected',
    source: 'Amber Studio, 2021',
  },
  {
    label: 'Concerts',
    stat: '2–5 / year',
    detail: 'More than 50% of Gen Z attend two to five concerts per year',
    source: 'Schmidt, 2023',
  },
  {
    label: 'NBA',
    stat: 'Players as Icons',
    detail: 'Sells personalities — fashion, activism, and creator culture',
    source: 'Badenhausen, 2020',
  },
  {
    label: 'NFL',
    stat: '100M+ views',
    detail: 'Turns a 15-minute halftime show into hundreds of millions of views',
    source: 'Hyken, 2024',
  },
];

function ResearchStats() {
  const statsRef  = useRef(null);
  const compRef   = useRef(null);

  useEffect(() => {
    const cards = statsRef.current?.querySelectorAll('.rs-stat');
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', toggleActions: 'play none none none' }
        }
      );
    }

    const comps = compRef.current?.querySelectorAll('.rs-competitor');
    if (comps) {
      gsap.fromTo(comps,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: compRef.current, start: 'top 80%', toggleActions: 'play none none none' }
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="container">
    <div className="research-stats">
        {/* ——— Key Stats ——— */}
        <p className="label rs-section-label">By the numbers</p>
        <div className='research-stats-content'>
        <div className="rs-stats-grid" ref={statsRef}>
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`rs-stat ${s.highlight ? 'rs-stat--highlight' : ''}`}
              style={s.highlight ? { borderColor: MLB_NAVY, background: MLB_NAVY } : {}}
            >
              <span
                className="rs-stat__value"
                style={s.highlight ? { color: '#fff' } : { color: MLB_NAVY }}
              >
                {s.value}
              </span>
              <p
                className="rs-stat__label"
                style={s.highlight ? { color: 'rgba(255,255,255,0.9)' } : {}}
              >
                {s.label}
              </p>
              <p
                className="rs-stat__sub"
                style={s.highlight ? { color: 'rgba(255,255,255,0.6)' } : {}}
              >
                {s.sub}
              </p>
              <span
                className="rs-stat__source"
                style={s.highlight ? { color: 'rgba(255,255,255,0.4)' } : {}}
              >
                {s.source}
              </span>
            </div>
          ))}
        </div>
        </div>

        {/* ——— Real Competition ——— */}
        <div className="rs-competition" ref={compRef}>
          <p className="label rs-section-label" style={{ marginBottom: '1.25rem' }}>
            The real competition
          </p>

          <div className='rs-competition-content'>
          <p className="rs-competition__intro">
            MLB's real competition isn't the NFL or the NBA. It's everything on GenZ's phone.
          </p>
          <div className="rs-competitors-grid">
            {COMPETITORS.map((c, i) => (
              <div key={i} className="rs-competitor">
                <div className="rs-competitor__header">
                  <span className="rs-competitor__label">{c.label}</span>
                  <span className="rs-competitor__stat" style={{ color: MLB_NAVY }}>{c.stat}</span>
                </div>
                <p className="rs-competitor__detail">{c.detail}</p>
                <span className="rs-competitor__source">{c.source}</span>
              </div>
            ))}
          </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ResearchStats;
