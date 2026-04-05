import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CampaignOverview.css";

// SVG imports — use as img src instead of React components to avoid vite ?react issues
import HitsHomeLogo      from "../../assets/mlb/hits-home.svg";
import HitsDifferentLogo from "../../assets/mlb/hits-different.svg";
import WelcomeHomebaseLogo from "../../assets/mlb/welcome-homebase.svg";
import CatchItLiveLogo   from "../../assets/mlb/catch-it-live.svg";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  mlbNavy: "#041E42",
  stage1:  "#BC0022",
  stage2:  "#FFA300",
  stage3:  "#2968F7",
};

const STAGES = [
  {
    id: "stage1",
    logo: HitsDifferentLogo,
    tag: "Awareness",
    color: COLORS.stage1,
    metric: "3.5 → 4.0",
    metricLabel: "Shifting Brand Sentiment",
    tactics: [
      { group: "Public Relations", items: ["Influencer Marketing", "PR Boxes", "Organic Social Media"] },
      { group: "Out of Home",      items: ["Transit Ads"] },
    ],
    schedule: [
      { label: "Out of Home (OOH)",     start: 0, end: 18 },
      { label: "Instagram Influencer",  start: 0, end: 18 },
      { label: "TikTok Influencer",     start: 0, end: 18 },
      { label: "Twitch Watch Stream",   start: 1, end: 3,  start2: 5, end2: 7,  start3: 9,  end3: 11, start4: 13, end4: 15 },
      { label: "YouTube Collaboration", start: 0, end: 1,  start2: 3, end2: 4,  start3: 6,  end3: 7,  start4: 10, end4: 11 },
    ],
  },
  {
    id: "stage2",
    logo: WelcomeHomebaseLogo,
    tag: "Consideration",
    color: COLORS.stage2,
    metric: "25%",
    metricLabel: "In Viewership",
    tactics: [
      { group: "Website",            items: ["Interactive Microsite", "City Hub", "Player Cards"] },
      { group: "Internet Marketing", items: ["Paid Social Ads"] },
    ],
    schedule: [
      { label: "Instagram Reels", start: 0, end: 8 },
      { label: "Instagram Story", start: 0, end: 8 },
      { label: "Instagram Feeds", start: 0, end: 8 },
      { label: "TikTok In-Feed",  start: 0, end: 8 },
    ],
  },
  {
    id: "stage3",
    logo: CatchItLiveLogo,
    tag: "Conversion",
    color: COLORS.stage3,
    metric: "231%",
    metricLabel: "ROI",
    tactics: [
      { group: "Hero Ad",    items: ["Streaming Service", "YouTube In-Feed"] },
      { group: "Social Ads", items: ["Instagram Reels", "Instagram Story", "Instagram Feeds", "TikTok In-Feed", "Remarketing"] },
    ],
    schedule: [
      { label: "Streaming Service", start: 9,  end: 18 },
      { label: "YouTube In-Feed",   start: 9,  end: 18 },
      { label: "Instagram Reels",   start: 9,  end: 18 },
      { label: "Instagram Story",   start: 9,  end: 18 },
      { label: "Instagram Feeds",   start: 9,  end: 18 },
      { label: "TikTok In-Feed",    start: 11, end: 15 },
      { label: "Remarketing",       start: 9,  end: 14 },
    ],
  },
];

const MONTHS = ["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"];
const TOTAL = 18;

function OverviewTab() {
  const stagesRef = useRef(null);

  useEffect(() => {
    const bars = stagesRef.current?.querySelectorAll('.co-stage-bar');
    if (!bars) return;

    bars.forEach((bar, i) => {
      gsap.fromTo(bar,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="co-overview">
      {/* Metrics */}
      <div className="co-metrics">
        {STAGES.map(s => (
          <div key={s.id} className="co-metric" style={{ borderColor: s.color }}>
            <span className="co-metric__value" style={{ color: s.color }}>{s.metric}</span>
            <span className="co-metric__label">{s.metricLabel}</span>
          </div>
        ))}
      </div>

      {/* Stage bars — always visible, no dropdown */}
      <div className="co-stages" ref={stagesRef}>
        {STAGES.map((s, i) => (
          <div key={s.id} className="co-stage-row">
            <div
              className="co-stage-bar"
              style={{ background: s.color, '--offset': `${i * 8}%` }}
            >
              <img src={s.logo} alt={s.tag} className="co-stage-bar__logo" />
              <span className="co-stage-bar__tag">{s.tag}</span>
            </div>

            {/* Tactics always visible */}
            <div className="co-tactics open">
              <div className="co-tactics__inner">
                {s.tactics.map((t, ti) => (
                  <div key={ti} className="co-tactic-group">
                    <div className="co-tactic-group__dot" style={{ background: s.color }} />
                    <div>
                      <p className="co-tactic-group__title">{t.group}</p>
                      <ul>
                        {t.items.map((item, ii) => (
                          <li key={ii}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleTab() {
  const [hoveredRow, setHoveredRow] = React.useState(null);

  return (
    <div className="co-schedule">
      <div className="co-schedule__years">
        <div className="co-schedule__label-col" />
        <div className="co-schedule__year">2026 <span>(8 months)</span></div>
        <div className="co-schedule__year">2027 <span>(10 months)</span></div>
      </div>

      <div className="co-schedule__months">
        <div className="co-schedule__label-col" />
        {MONTHS.map((m, i) => (
          <div key={i} className="co-schedule__month">{m}</div>
        ))}
      </div>

      {STAGES.map(stage => (
        <React.Fragment key={stage.id}>
          <div className="co-schedule__stage-row" style={{ background: stage.color }}>
            <div className="co-schedule__label-col co-schedule__stage-label">
              <img src={stage.logo} alt={stage.tag} className="co-schedule__stage-logo" />
            </div>
            <div className="co-schedule__stage-span" />
          </div>

          {stage.schedule.map((row, ri) => (
            <div
              key={ri}
              className={`co-schedule__tactic-row ${hoveredRow === `${stage.id}-${ri}` ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredRow(`${stage.id}-${ri}`)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <div className="co-schedule__label-col co-schedule__tactic-label">{row.label}</div>
              <div className="co-schedule__cells">
                {Array.from({ length: TOTAL }, (_, i) => {
                  const active =
                    (i >= row.start && i < row.end) ||
                    (row.start2 != null && i >= row.start2 && i < row.end2) ||
                    (row.start3 != null && i >= row.start3 && i < row.end3) ||
                    (row.start4 != null && i >= row.start4 && i < row.end4);
                  return (
                    <div
                      key={i}
                      className={`co-schedule__cell ${active ? 'active' : ''}`}
                      style={active ? { background: stage.color, opacity: 0.75 } : {}}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

function CampaignOverview() {
  const [tab, setTab] = React.useState('overview');

  return (
    <div className="campaign-overview">
      <div className="container">
        <div className="co-header">
          <p className="label">Campaign Architecture</p>
          <h2 className="co-title">
            What the{' '}
            <img src={HitsHomeLogo} alt="Hits Home" className="co-title__logo" />
            {' '}Campaign Delivers
          </h2>
        </div>

        <div className="co-tabs">
          <button className={`co-tab ${tab === 'overview'  ? 'active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
          <button className={`co-tab ${tab === 'schedule'  ? 'active' : ''}`} onClick={() => setTab('schedule')}>Ad Schedule</button>
        </div>

        <div className="co-content">
          {tab === 'overview' && <OverviewTab />}
          {tab === 'schedule' && <ScheduleTab />}
        </div>
      </div>
    </div>
  );
}

export default CampaignOverview;
