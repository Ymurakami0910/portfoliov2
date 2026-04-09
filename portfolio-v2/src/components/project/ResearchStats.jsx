import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';
import './ResearchStats.css';

gsap.registerPlugin(ScrollTrigger);

const COMPETITORS = [
  {
    label: 'Gaming',
    stat: '7–10 hrs/week',
    detail: 'Over 70% of Gen Z say gaming helps them feel socially connected',
    source: 'Amber Studio, 2021',
    icon: 'mdi:controller-classic',
  },
  {
    label: 'Concerts',
    stat: '2–5 / year',
    detail: 'More than 50% of Gen Z attend two to five concerts per year',
    source: 'Schmidt, 2023',
    icon: 'mdi:music-note',
  },
  {
    label: 'NBA',
    stat: 'Players as Icons',
    detail: 'Sells personalities — fashion, activism, and creator culture',
    source: 'Badenhausen, 2020',
    icon: 'mdi:basketball',
  },
  {
    label: 'NHL',
    stat: '100M+ views',
    detail: 'Turns a 15-minute halftime show into hundreds of millions of views',
    source: 'Hyken, 2024',
    icon: 'mdi:hockey-puck',
  },
];

function ResearchStats() {
  const statsRef = useRef(null);
  const compRef  = useRef(null);

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
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: compRef.current, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="container">
      <div className="research-stats">

        {/* ——— By the Numbers ——— */}
        <p className="label rs-section-label">By the numbers</p>
        <div className="research-stats-content">
          <div className="rs-stats-grid" ref={statsRef}>

            {/* Row 1 — 35% | 57 */}
            <div className="rs-stat rs-stat--half">
              <span className="rs-stat__value">35%</span>
              <p className="rs-stat__label">of Gen Z identify as casual MLB fans</p>
              <span className="rs-stat__source">Morning Consult, 2022</span>
            </div>

            <div className="rs-stat rs-stat--half">
              <div className="rs-stat__inline">
                <span className="rs-stat__value">57</span>
                <span className="rs-stat__unit">y/o</span>
              </div>
              <p className="rs-stat__label">Average age of an MLB viewer</p>
              <span className="rs-stat__source">RockWater, 2022</span>
            </div>

            {/* Row 2 — 23% + 60% combo | 6hrs */}
            <div className="rs-stat rs-stat--double">
              <div className="rs-stat__double-left">
                <span className="rs-stat__value">23%</span>
                <p className="rs-stat__label">of Gen Z watch full games</p>
              </div>
              <div className="rs-stat__divider" />
              <div className="rs-stat__double-right">
                <span className="rs-stat__value">60%</span>
                <p className="rs-stat__label">engage only through social media, highlights, and clips</p>
              </div>
              <span className="rs-stat__source">BCITMA Case Team, 2025</span>
            </div>

            <div className="rs-stat rs-stat--half">
              <div className="rs-stat__inline">
                <span className="rs-stat__value">6</span>
                <span className="rs-stat__unit">hrs</span>
              </div>
              <p className="rs-stat__label">Gen Z spends on social platforms daily</p>
              <span className="rs-stat__source">Deloitte, 2025</span>
            </div>

            {/* Row 3 — 3.5/5 full width */}
            <div className="rs-stat rs-stat--highlight">
              <span className="rs-stat__value">3.5/5</span>
              <div className="rs-stat__highlight-body">
                <p className="rs-stat__label">MLB brand sentiment score among Gen Z</p>
                <p className="rs-stat__note">Not disliked — neutral. In the attention economy, neutral means forgettable.</p>
                <span className="rs-stat__source">BCITMA Case Team, 2025</span>
              </div>
            </div>

          </div>
        </div>

        {/* ——— Real Competition ——— */}
        <div className="rs-competition" ref={compRef}>
          <p className="label rs-section-label">The real competition</p>
          <div className="rs-competition-content">
            <p className="rs-competition__intro">
              MLB's real competition isn't the NFL or the NBA. It's everything on Gen Z's phone.
            </p>
            <div className="rs-competitors-grid">
              {COMPETITORS.map((c, i) => (
                <div key={i} className="rs-competitor">
                  <div className="rs-competitor__left">
                    <Icon icon={c.icon} className="rs-competitor__icon" />
                    <span className="rs-competitor__label">{c.label}</span>
                  </div>
                  <div className="rs-competitor__divider" />
                  <div className="rs-competitor__right">
                    <span className="rs-competitor__stat">{c.stat}</span>
                    <p className="rs-competitor__detail">{c.detail}</p>
                    <span className="rs-competitor__source">{c.source}</span>
                  </div>
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
