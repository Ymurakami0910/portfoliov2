import React from 'react';
import ProjectNav from '../../components/project/ProjectNav';
import ProjectThumb from '../../components/project/ProjectThumb';
import ProjectText from '../../components/project/ProjectText';
import ProjectSlides from '../../components/project/ProjectSlides';
import ProjectVideo from '../../components/project/ProjectVideo';
import './MLB.css';

// ——— Replace these with your actual MLB assets ———
// import MLBThumb from '../../assets/mlb/thumb.jpg';
// import Slide1 from '../../assets/mlb/slide1.jpg';
// import Slide2 from '../../assets/mlb/slide2.jpg';
// import Slide3 from '../../assets/mlb/slide3.jpg';
// import Slide4 from '../../assets/mlb/slide4.jpg';
// import Slide5 from '../../assets/mlb/slide5.jpg';

const NAV_SECTIONS = [
  { id: 'overview',  label: 'Overview'  },
  { id: 'challenge', label: 'Challenge' },
  { id: 'strategy',  label: 'Strategy'  },
  { id: 'slides',    label: 'Slides'    },
  { id: 'outcome',   label: 'Outcome'   },
];

// Placeholder slides — replace with real imports
const SLIDES = [
  null, null, null, null, null,
].map((_, i) => `https://via.placeholder.com/800x500/D9C5C0/1A1A2E?text=MLB+Slide+${i + 1}`);

function MLB() {
  return (
    <div className="mlb-page">

      {/* ——— Sticky side nav ——— */}
      <ProjectNav sections={NAV_SECTIONS} />

      {/* ——— Hero Thumb ——— */}
      <ProjectThumb
        imageSrc="https://lilyzvillage.com/KissaStore-DmijIweP.png"
        imageAlt="MLB Hits Home Campaign"
        title="Hits Home Campaign"
        label="MLB – AMA Competition 2nd place"
        year="Fall 2025 – Winter 2026"
        role="Brand Strategist & Campaign Designer"
      />

      {/* ——— Overview ——— */}
      <ProjectText id="overview" label="Overview" title="A national campaign for MLB">
        <p>
          The Hits Home Campaign was developed as part of the AMA case competition, 
          where our team placed 2nd nationally. The brief asked us to create a 
          marketing strategy that would grow MLB's fanbase among 18–34 year olds 
          in Canada.
        </p>
        <p>
          I led the brand strategy and visual identity for the campaign, developing 
          a cohesive design system across digital, social, and experiential touchpoints.
        </p>
      </ProjectText>

      {/* ——— Challenge ——— */}
      <ProjectText id="challenge" label="The Challenge" title="Connecting a sport to a new generation">
        <p>
          MLB's Canadian audience skews older. The challenge was to find a cultural 
          entry point that felt authentic to younger fans — without alienating the 
          existing base.
        </p>
        <p>
          Research showed that younger fans engage deeply with the social and 
          community aspects of sport, not just the game itself. This became our 
          strategic anchor.
        </p>
        <h3>Key Insight</h3>
        <p>
          "Baseball is the most local major sport in North America. Every team 
          belongs to a city. We made that the story."
        </p>
      </ProjectText>

      {/* ——— Strategy ——— */}
      <ProjectText id="strategy" label="Strategy" title="Welcome to Homebase">
        <p>
          The "Welcome to Homebase" platform positioned MLB stadiums as community 
          hubs — places where culture, food, music, and sport converge. 
        </p>
        <p>
          We developed three campaign pillars: Local Pride, Shared Moments, and 
          Your Team Your City. Each pillar had its own visual language and 
          activation strategy.
        </p>
        <h3>My Role</h3>
        <p>
          Brand strategy, visual identity, campaign design, presentation design, 
          and social media mockups.
        </p>
      </ProjectText>

      {/* ——— Presentation Slides ——— */}
      <ProjectSlides
        id="slides"
        label="Presentation Deck"
        images={SLIDES}
      />


      {/* ——— Outcome ——— */}
      <ProjectText id="outcome" label="Outcome" title="2nd place nationally">
        <p>
          Our team placed 2nd out of teams from across Canada. The judges 
          highlighted the strategic clarity of our brand positioning and the 
          visual consistency across all touchpoints.
        </p>
        <p>
          The campaign demonstrated how a heritage brand like MLB can speak to 
          younger audiences by leaning into local identity rather than chasing 
          trends.
        </p>
        <h3>Takeaway</h3>
        <p>
          Cultural storytelling is a powerful design strategy. Authenticity 
          beats novelty when building long-term brand equity.
        </p>
      </ProjectText>

    </div>
  );
}

export default MLB;
