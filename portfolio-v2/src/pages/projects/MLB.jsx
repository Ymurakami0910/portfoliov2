import React, { useState } from "react";
import ProjectNav from "../../components/project/ProjectNav";
import ProjectThumb from "../../components/project/ProjectThumb";
import ProjectText from "../../components/project/ProjectText";
import VisualGrid from "../../components/project/VisualGrid";
import ProjectLightbox from "../../components/project/ProjectLightbox";
import ResearchStats from '../../components/project/ResearchStats';
import CampaignOverview from "../../components/project/CampaignOverview";
import PostItCard from "../../components/PostItCard";
import LinkedInEmbed from "../../components/LinkedInEmbed";
import "./MLB.css";


import MLBThumb     from '../../assets/mlb/thumb.jpg';
import ReportImg from "../../assets/mlb/report.png";

import PersonaImg from "../../assets/mlb/persona.png";
import TargetImg from "../../assets/mlb/target-audience.png";

import OOH1 from "../../assets/mlb/ooh1.jpg";
import OOH2 from "../../assets/mlb/ooh2.jpg";

import Microsite1 from "../../assets/mlb/microsite1.jpg";
import Microsite2 from "../../assets/mlb/microsite2.jpg";
import Microsite3 from "../../assets/mlb/microsite3.jpg";
import Microsite4 from "../../assets/mlb/microsite4.jpg";

import Social from "../../assets/mlb/Thumb.jpg"

import StoryboardMateo from "../../assets/mlb/storyboard-mateo.png";
import StoryboardSarah from "../../assets/mlb/storyboard-sarah.png";

import Outcome1 from "../../assets/mlb/outcome1.jpg";
import Outcome2 from "../../assets/mlb/outcome2.jpg";

import EricaImg from "../../assets/mlb/Erica.jpg";
import TeamPhoto from "../../assets/mlb/team.jpg";

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Problem" },
  { id: "problem", label: "Target Audience" },
  { id: "strategy", label: "Strategy" },
  { id: "outcome", label: "Outcome" },
  { id: "credibility", label: "Credibility" },
  { id: "team", label: "Team" },
];

// All visuals — lightbox navigates through ALL of them
// Visual groups
const ALL_VISUALS = [
  // 0 — Report
  {
    src: ReportImg,
    color: "#D4CCBF",
    alt: "Hits Home report template, landscape layout",
    caption: "Custom report template built in Microsoft Word. Our 3 months of work came together, selected as one of the top 11 universities among all submissions.",
  },
  // 1 — Persona
  {
    src: PersonaImg,
    color: "#C8C0D4",
    alt: "Connection Seekers segment profile visual",
    caption: "Connection Seeker profile. Approximately 19.32 million Gen Z individuals with no strong sport attachment, scrolling endlessly while quietly experiencing loneliness.",
  },
  // 2 — Target
  {
    src: TargetImg,
    color: "#C2BBD0",
    alt: "Connection Seekers loneliness visualisation",
    caption: "80% of Gen Z report feeling lonely in the past 12 months — more than any other generation, despite being the most digitally connected (GWI, 2024).",
  },
    // 3 — Social ad / moved
    {
      src: Social,
      color: "#CCBFB8",
      alt: "Social media ad mockup targeting Connection Seekers",
      caption: "Social ad creative targeting Connection Seekers in digital spaces, driving awareness toward the Homebase microsite.",
    },
  // 4 — OOH 1
  {
    src: OOH1,
    color: "#C5CAD9",
    alt: "Out-of-home mockup showing baseball breaking through glass on a bus window",
    caption: "A continuous presence that doesn't just vanish when people click to another web page (Blindspot, 2025), built to be photographed and shared.",
  },
  
  // 5 — OOH 2
  {
    src: OOH2,
    color: "#C0C5D4",
    alt: "Transit interior OOH mockup",
    caption: "Transit interior. The continuous physical presence extends the campaign into commuter spaces throughout the city.",
  },
  // 6 — Microsite hero
  {
    src: Microsite1,
    color: "#D4C5C0",
    alt: "Hits Home microsite hero — players cropped in baseball shapes with the campaign title",
    caption: "Microsite hero page. Players from across the league displayed in signature baseball shapes — circle, diamond, and home plate — setting the visual language of the campaign.",
  },
  // 7 — Microsite map
  {
    src: Microsite2,
    color: "#D0C0BB",
    alt: "Interactive USA map showing MLB team locations by state with filter panel",
    caption: "Major City Map. An interactive USA map lets users filter by MLB team or stadium, with California highlighted showing all four California teams — SF Giants, Dodgers, Angels, and Padres.",
  },
  // 8 — Microsite pub
  {
    src: Microsite3,
    color: "#CCC0D0",
    alt: "Pub search tab showing bar listings alongside a dark city map with baseball pin markers",
    caption: "Where They Connect. The pub search tab surfaces sports bars showing live MLB games nearby, paired with a real-time city map — each pin marking a place to watch with your city.",
  },
  // 9 — Microsite player cards
  {
    src: Microsite4,
    color: "#C8BEC8",
    alt: "Player cards showing all-time legends Tom Glavine and Don Wilson alongside current players Aaron Judge and Paul Skenes",
    caption: "Players — Past and Present. Baseball cards connect fans to all-time legends from their city alongside current stars born nearby, making the roster feel personal and local.",
  },

  // 10 — Storyboard Mateo
  {
    src: StoryboardMateo,
    color: "#1E3A6E",
    alt: "Storyboard for Mateo — 15 panels showing a lonely student discovering baseball through a neighbour",
    caption: "Storyboard 1: Catch It Live (Mateo). Mateo, alone in his dorm, hears cheers from next door. He knocks. A new friend shows him the microsite, they head to the game together. He never looks back.",
  },
  // 11 — Storyboard Sarah
  {
    src: StoryboardSarah,
    color: "#1A3060",
    alt: "Storyboard for Sarah — 15 panels showing a young woman finding connection through a foul ball moment",
    caption: "Storyboard 2: Video Hero Ads (Sarah). Sarah wakes up to the same routine. She stumbles across MLB content, goes to a game with a friend, catches a foul ball, and passes the moment on to a child beside her.",
  },
  // 12 — Outcome 1
  {
    src: Outcome1,
    color: "#1E3A6E",
    alt: "Sarah and friends celebrating at Dodger Stadium, arms raised in the crowd",
    caption: "The moment the campaign is built for — Connection Seekers at the game, present, loud, and belonging.",
  },
  // 13 — Outcome 2
  {
    src: Outcome2,
    color: "#1A3060",
    alt: "Campaign key visual — Sarah at the stadium with Hits Home script overlay",
    caption: "MLB doesn't just \"Hits Different\" — it Hits Home. The campaign's closing image, used for the final presentation",
  },
];

// ── Visual groups ─────────────────────────────────────────────────────────────
const REPORT_ITEMS     = [ALL_VISUALS[0]];
const SEEKER_ITEMS     = [ALL_VISUALS[1], ALL_VISUALS[2]];
const SOCIAL_ITEMS     = [ALL_VISUALS[3]];
const OOH_ITEMS        = [ALL_VISUALS[4], ALL_VISUALS[5]];
const MICROSITE_ITEMS  = [ALL_VISUALS[6], ALL_VISUALS[7], ALL_VISUALS[8], ALL_VISUALS[9]];
const STORYBOARD_ITEMS = [ALL_VISUALS[10], ALL_VISUALS[11]];
const OUTCOME_ITEMS    = [ALL_VISUALS[12], ALL_VISUALS[13]];

const LINKEDIN_EMBED = `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7441914687803473920" height="570" width="504" frameborder="0" allowfullscreen="" title="Embedded post from Erica Halvorsen about the BCITMA AMA Case Competition"></iframe>`;

function MLB() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section>
      <ProjectThumb
        imageSrc={MLBThumb}
        imageAlt="Hits Home Campaign overview showing campaign materials"
        title="Hits Home"
        label="MLB × AMA International Collegiate Case Competition"
        year="Fall 2025 – Winter 2026"
        role="Visual Director — BCIT Marketing Association Case Team"
        thumbColor="#1E3A6E"
      />
    <div className="mlb-page">
      <ProjectNav sections={NAV_SECTIONS} />

      {/* THUMB */}

      {/* OVERVIEW */}
      <ProjectText
        id="overview"
        label="Overview"
        title="18-Month Integrated Marketing Campaign"
      >
        <p>
          Hits Home is an{" "}
          <strong>18-month integrated marketing campaign</strong> developed for
          the <strong>AMA International Collegiate Case Competition,</strong>{" "}
          sponsored by <strong>MLB</strong> and <strong>Deloitte</strong>.
          Competing against 110+ university teams across the US and Canada, our
          team placed 2nd at the 2026 conference.
        </p>
        <p>
          <strong>As Visual Director</strong>, I was responsible for the full
          visual execution of the campaign along side with the team, including a
          custom report template, a 150-slide presentation deck, out-of-home
          mockups, microsite design, a hand-drawn storyboard, social ads, and
          audience visual identity.
        </p>
      </ProjectText>

      {/* Report visual sits right under overview */}
      <VisualGrid
        items={REPORT_ITEMS}
        allVisuals={ALL_VISUALS}
        onOpen={openLightbox}
        caption="Custom report template built in Microsoft Word. Our 3 months of work came together, selected as one of the top 11 universities among all submissions."
      />

      {/* CONTEXT */}
      <ProjectText
        id="context"
        label="The Problem"
        title="MLB is losing its youngest audience"
      >
        <p>
          Only 35% of Gen Z identify as even casual MLB fans, ranking it fourth
          behind the NFL, NBA, and college football among their generation
          (Morning Consult, 2022). The average MLB viewer is 57 years old, and
          that number keeps climbing (RockWater, 2022).
        </p>
        <p>
          The AMA competition challenged 110+ university teams to solve it: find
          a way to make baseball genuinely relevant to the next generation.
        </p>
      </ProjectText>
{/* 
      <VisualGrid
        items={CONTEXT_ITEMS}
        allVisuals={ALL_VISUALS}
        onOpen={openLightbox}
        caption="Research summary showing Gen Z sports engagement data. Baseball ranks fourth among Gen Z, with an average viewer age of 57."
      /> */}

      <ResearchStats/>

      {/* PROBLEM */}
      <ProjectText
        id="problem"
        label="The Target Audience"
        title="Connection Seekers"
      >
        <p>
          Through{" "}
          <strong>551 survey responses and 30 in-depth interviews </strong>, the
          team identified a segment we named <strong>Connection Seekers</strong>
          : approximately 19.32 million Gen Z individuals with no strong
          attachment to any sport, who scroll endlessly through social platforms
          to stay updated, while quietly experiencing persistent feelings of
          loneliness and isolation (BCITMA Case Team, 2025).
        </p>
        <p>
          80% of Gen Z report feeling lonely in the past 12 months, more than
          any other generation, despite being the most digitally connected (GWI,
          2024). They do not need baseball explained to them. They need a reason
          to show up.
        </p>
      </ProjectText>

      <VisualGrid
        items={SEEKER_ITEMS}
        allVisuals={ALL_VISUALS}
        onOpen={openLightbox}
        caption="Connection Seeker segment visuals. It portraits showing the emotional state and digital behaviour of the 19.32 million Gen Z individuals the campaign was designed to reach."
        aspectRatio="3 / 4"
      />

      {/* STRATEGY INTRO */}
      <ProjectText
        id="strategy"
        label="Strategy"
        title="Three stages. One goal: make baseball feel like belonging."
      >
        <p>
          Hits Home was built across three sequential phases over 18 months,
          each designed to move Connection Seekers from awareness to a live,
          in-person moment.
        </p>
      </ProjectText>


      <VisualGrid
        items={SOCIAL_ITEMS}
        allVisuals={ALL_VISUALS}
        onOpen={openLightbox}
        caption="Social ad creative targeting Connection Seekers in digital spaces, driving traffic toward the Homebase microsite."
      />




      {/* STAGE 1 */}
      <ProjectText
        id="stage1"
        label="Stage 1"
        title="Hits Different — Awareness"
      >
        <p>
          Drive cultural relevance by meeting Connection Seekers in their
          digital and physical spaces through influencer collaborations, player
          spotlights, and bold out-of-home advertising designed to stop the
          scroll.
        </p>
      </ProjectText>

      <VisualGrid
        items={OOH_ITEMS}
        allVisuals={ALL_VISUALS}
        onOpen={openLightbox}
        caption="Out-of-home mockups featuring a baseball breaking through glass across bus windows and transit interiors. A continuous physical presence built to be photographed and shared."
      />

      {/* STAGE 2 */}
      <ProjectText
        id="stage2"
        label="Stage 2"
        title="Welcome to Homebase — Consideration"
      >
        <p>
          Build community through targeted social ads driving users to a custom
          interactive microsite. Personalised by city, the site surfaces local
          MLB games, bars showing games, open practices, and players from the
          area.
        </p>
      </ProjectText>
          
      <VisualGrid
        items={MICROSITE_ITEMS}
        allVisuals={ALL_VISUALS}
        onOpen={openLightbox}
        caption="Microsite design system including an interactive city map, tabbed city hub across Scene, Games, and Players, player baseball cards with a flip mechanic, and a personalised email newsletter."
      />

  

      {/* STAGE 3 */}
      <ProjectText
        id="stage3"
        label="Stage 3"
        title="Catch It Live — Conversion"
      >
        <p>
          Convert digital engagement into real-world attendance through two hero
          commercials and social spotlights, replacing passive content
          consumption with a live, in-person moment.
        </p>
        <p>
          Each follows a different Connection Seeker whose life changes the
          moment baseball stops being a sport and starts being a place to
          belong.
        </p>
      </ProjectText>

      {/* Storyboard side-by-side */}
      <VisualGrid
        items={STORYBOARD_ITEMS}
        allVisuals={ALL_VISUALS}
        onOpen={openLightbox}
        caption="Two original hand-drawn storyboards following Connection Seekers Mateo and Sarah, each finding their way to a live baseball game."
        aspectRatio="3 / 4"
      />

      {/* OUTCOME */}
      <ProjectText
        id="outcome"
        label="Outcome"
        title="2nd place out of 110+ universities"
      >
        <p>
          The team placed 2nd at the 2026 AMA International Collegiate
          Conference, competing against 110+ schools across the US and Canada,
          judged by MLB and Deloitte executives.
        </p>
        <p>
          The projected campaign outcomes included a 25% increase in total
          broadcast viewership and a 231% ROI for MLB over 18 months.
        </p>
      </ProjectText>


      <VisualGrid
        items={OUTCOME_ITEMS}
        allVisuals={ALL_VISUALS}
        onOpen={openLightbox}
        caption="Campaign closing visuals Sarah (GenZ) is at the stadium, the emotional payoff of the full 18-month strategy."
      />
      
      <CampaignOverview />



      {/* CREDIBILITY */}
      <section className="mlb-credibility" id="credibility">
        <div className="container">
          <p className="label mlb-section-label">What they said</p>
          <div className="mlb-credibility__inner">
            <PostItCard
              avatarSrc={EricaImg}
              name="Erica Halvorsen"
              title={
                <>
                  Marketing &amp; Sales Instructor, BCIT
                  <br />
                  Strategic Brand Developer, Erica Jane Consulting
                </>
              }
              quote='"The BCITMA was extremely lucky to have Yurino Murakami on our AMA Case Competition team as Artistic Director. Yurino designed brand style guides and visuals for both the written proposal and presentation, including gorgeous hand-drawn mockups of digital and offline tactics. Her talent and focused execution was key to BCITMA placing 2nd out of 110 competitors at the 2026 AMA conference. I would highly recommend her as a creative professional."'
            />
            <div className="mlb-linkedin">
              <LinkedInEmbed embedCode={LINKEDIN_EMBED} />
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <ProjectText
        id="team"
        label="Team Credits"
        title="BCITMA Case Team 2025-2026"
      >
        <p>
          The strategy, research, and written case were built collaboratively by
          the BCITMA Case Team. The visual execution shown here represents my
          individual contribution as Visual Director.
        </p>
        <p>
          <a
            href="https://www.linkedin.com/in/andyjeongg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Andy Jeong
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/gurnoortatla/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gurnoor Tatla
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/aliyah-kane-355402313/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aliyah Kane
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/m%C4%83lina-nicoleta-mujdei-924bb6246/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mălina Nicoleta Mujdei
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/julia-aldaba-50965b313/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Julia Aldaba
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/varinder-pangli/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Varinder Pangli
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/dd-khanhnguyen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Khanh Nguyen
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/mod-amonnat/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mod Wongprasert
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/sierra-aston-a84184253/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sierra Aston
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/tyler-benson-a2a02a383/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tyler Benson
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/ronak-mankar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ronak Mankar
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/cole-caleb-thiessen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cole Thiessen
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/kenna-lewis-b2710b2a1/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kenna Lewis
          </a>{" "}
          and Erica Halvorsen.
        </p>
        <p>
          <a
            href="https://bcitma.ca/case-team-2025"
            target="_blank"
            rel="noopener noreferrer"
          >
            bcitma.ca/case-team-2025 ↗
          </a>
        </p>
      </ProjectText>

      {/* Team photo + LinkedIn post */}
      <section className="mlb-team-media">
        <div className="container">
          <div className="mlb-team-media__grid">
            <div className="mlb-team-media__photo">
              <img
                src={TeamPhoto}
                alt="BCITMA Case Team 2025 group photo at BCIT campus staircase"
              />
            </div>

            <div className="mlb-team-media__post">
              <LinkedInEmbed
                embedCode={`<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7437711414586208256" height="570" width="504" frameborder="0" allowfullscreen="" title="Yurino Murakami LinkedIn post about BCITMA AMA Case Competition"></iframe>`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="mlb-references">
        <div className="container">
          <p className="label mlb-section-label">References</p>
          <div className="mlb-references__list">
            <p className="mlb-references__category">Sports &amp; MLB</p>
            <ul>
              <li>
                <a
                  href="https://pro.morningconsult.com/trend-setters/gen-z-interest-in-watching-sports"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Morning Consult. (2022). Gen Z sports consumption and the
                  industry's efforts to increase it.
                </a>
              </li>
              <li>
                <a
                  href="https://pro.morningconsult.com/articles/gen-z-poll-sports-fandom"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Morning Consult. (2022). The sports industry's Gen Z problem:
                  Fewer fans, lower viewership.
                </a>
              </li>
              <li>
                <a
                  href="https://pro.morningconsult.com/instant-intel/gen-z-favorite-sports-league"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Morning Consult. (2022). The NFL's Gen Z fan base is slowly
                  growing.
                </a>
              </li>
              <li>
                <a
                  href="https://wearerockwater.com/future-proofing-sports-media-a-la-carte-live-rights"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RockWater. (2022). Why only 61% of Gen Z watches sports, and
                  how to future-proof sports media.
                </a>
              </li>
              <li>
                Deloitte. (2025). Digital Media Trends. Gen Z social media and
                content consumption data.
              </li>
              <li>
                <a
                  href="https://amberstudio.com/docs/Impact-of-Gen-Z-on-the-Gaming-Market.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Amber Studio. (2021). Impact of Gen Z on the gaming market.
                </a>
              </li>
              <li>
                <a
                  href="https://www.oliverwyman.com/our-expertise/insights/2023/oct/gen-z-reshaping-professional-sports-economics.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Oliver Wyman Forum. (2023). This is how Gen Z are
                  revolutionizing pro sports economics.
                </a>
              </li>
            </ul>
            <p className="mlb-references__category">
              Gen Z Loneliness &amp; Behaviour
            </p>
            <ul>
              <li>
                <a
                  href="https://www.gwi.com/blog/gen-z-loneliness"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GWI. (2024). Understanding Gen Z's loneliness epidemic.
                </a>
              </li>
              <li>
                <a
                  href="https://ballardbrief.byu.edu/issue-briefs/isolation-among-generation-z-in-the-united-states"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ballard Brief, BYU. (2025). Isolation among Generation Z in
                  the United States.
                </a>
              </li>
              <li>
                <a
                  href="https://www.newsweek.com/generation-genz-loneliness-problem-mental-health-1877013"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Newsweek. (2024). Gen Z has a loneliness problem.
                </a>
              </li>
              <li>
                <a
                  href="https://www.icsc.com/uploads/about/2023ICSC_Gen_Z_Report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ICSC. (2023). The ICSC Gen Z Consumer Report.
                </a>
              </li>
              <li>
                <a
                  href="https://www.retaildive.com/news/generation-z-social-media-influence-shopping-behavior-purchases-tiktok-instagram/652576/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Retail Dive. (2023). ICSC: 85% of Gen Z says social media
                  impacts purchase decisions.
                </a>
              </li>
              <li>
                <a
                  href="https://www.theshelf.com/the-blog/gen-z-spending-habits"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Shelf. (2023). What makes them buy: The Gen Z spending
                  habits to know.
                </a>
              </li>
              <li>
                <a
                  href="https://san.com/cc/gen-z-will-spend-112-complete-days-in-2024-on-their-phones-report/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dcdx. (2024). The 2024 Gen Z Screen Time Report.
                </a>
              </li>
              <li>
                <a
                  href="https://sleepopolis.com/education/screen-time-and-sleep-survey/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sleepopolis. (2023). Screen time and sleep statistics.
                </a>
              </li>
              <li>
                <a
                  href="https://www.deloitte.com/global/en/about/press-room/2023-gen-z-and-millenial-survey.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Deloitte. (2023). Gen Z and Millennial Survey 2023.
                </a>
              </li>
              <li>
                <a
                  href="https://www.deloitte.com/global/en/about/press-room/deloitte-2024-gen-z-and-millennial-survey.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Deloitte. (2024). Gen Z and Millennial Survey 2024.
                </a>
              </li>
            </ul>
            <p className="mlb-references__category">Primary Research</p>
            <ul>
              <li>
                BCITMA Case Team. (2025). Hits Home: Internal primary research
                findings. 551 survey responses and 30 in-depth interviews
                conducted as part of the AMA International Collegiate Case
                Competition, sponsored by MLB and Deloitte.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <ProjectLightbox
          items={ALL_VISUALS}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
    </section>
  );
}

export default MLB;
