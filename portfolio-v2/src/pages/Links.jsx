import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import emailjs from "emailjs-com";
import "./Links.css";

import ProfileImg from "../assets/links-profile.png";
import TanukiImg from "../assets/tanuki-footer.svg";
import StepSvg from "../assets/step.svg";
import SiteLogo from "../assets/logo.svg";
import TanukiWaitImg from "../assets/tanuki-wait.png";
/* If the two logos sit directly in src/assets/, drop the "logos/" part of these paths */
import MlbLogo from "../assets/logos/mlb-logo.png";
import AmaLogo from "../assets/logos/ama-logo.png";
import MlbThumb from "../assets/mlb-thumb.jpeg";

/* ─────────────────────────────────────────────
   CONFIG — every URL lives here, nowhere else
   ───────────────────────────────────────────── */
const LINKEDIN_URL = "https://www.linkedin.com/in/yurino-murakami-047175318";
const INSTAGRAM_URL = "https://www.instagram.com/lilyzvillage.design/";
const RESUME_URL = "/Yurino-Murakami-Resume[Creative].pdf";
const AMA_PRESENTATION_URL = "https://canva.link/o0ix7nu98em7utq";

/* Email is assembled at runtime so the raw address never sits in the HTML.
   ⚠️ CHECK THESE TWO LINES — your message was missing the @ so I split it here. */
const EMAIL_USER = "lilyvillage";
const EMAIL_DOMAIN = "gmail.com";

/* Same EmailJS credentials as ContactForm on the About page */
const EMAILJS = {
  serviceId: "service_lilyzvillage",
  templateId: "template_wog790s",
  publicKey: "GpwstzwdSptbEcud7",
};

const profile = {
  name: "Yuri",
  handle: "Yurino Murakami",
  role: "Creative Strategist",
  bioLines: [
    "1+ year in the print industry @ London Drugs",
    "2nd place @ AMA Case Competition",
    "Bachelor of Creative Industries @ BCIT",
  ],
};

const links = [
  {
    id: "linkedin",
    title: "Connect with me on LinkedIn",
    description: "Yes, I'm chronically online.",
    url: LINKEDIN_URL,
    type: "external",
    icon: "linkedin",
    featured: true,
  },
  {
    id: "portfolio",
    title: "Explore my portfolio",
    url: "/",
    icon: "siteLogo",
    type: "internal",
  },
  {
    id: "ama",
    title: "AMA Case Competition — 2nd Place in North America",
  description: "View the full 150+ slide MLB case study presentation",
    url: AMA_PRESENTATION_URL,
    type: "external",
    logos: [
      { src: AmaLogo, alt: "American Marketing Association" },
      { src: MlbLogo, alt: "Major League Baseball" },
    ],
  },
  {
    id: "resume",
    title: "Download my resume",
    url: RESUME_URL,
    type: "download",
  },
];

/* ─────────────────────────────────────────────
   Doodles — inline SVG, no extra assets
   ───────────────────────────────────────────── */
function DoodleStar({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2.5c.8 4.6 2.1 6.9 6.6 7.8-4.5.9-5.8 3.2-6.6 7.8-.8-4.6-2.1-6.9-6.6-7.8 4.5-.9 5.8-3.2 6.6-7.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoodleSparkle({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      </g>
    </svg>
  );
}

function DoodleArrow({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 44" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 4c6 10 4 22-3 32" />
        <path d="M11 27l7 9 7-7" />
      </g>
    </svg>
  );
}

function DoodleSquiggle({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 12" aria-hidden="true" focusable="false">
      <path
        d="M2 8c5-7 10 4 15-2s10 6 15 0 10 3 16-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Brand icons — inline SVG, no new dependency
   ───────────────────────────────────────────── */
function IconMail({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  );
}

function IconLinkedIn({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.2 9h3.6v12H3.2V9zm6.4 0h3.45v1.64h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.3 4.33 5.3V21h-3.6v-5.2c0-1.24-.02-2.84-1.76-2.84-1.76 0-2.03 1.35-2.03 2.75V21H9.6V9z" />
    </svg>
  );
}

function IconInstagram({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* the site mark is a file, not an inline svg, so it gets a small wrapper */
function IconSiteLogo({ className }) {
  return <img src={SiteLogo} alt="" aria-hidden="true" className={className} />;
}

const icons = {
  linkedin: IconLinkedIn,
  instagram: IconInstagram,
  siteLogo: IconSiteLogo,
};

/* ─────────────────────────────────────────────
   Link card
   ───────────────────────────────────────────── */
function LinkCard({ link }) {
  const Icon = link.icon ? icons[link.icon] : null;

  const inner = (
    <>
      {link.featured && <span className="links-card__tape" aria-hidden="true" />}
      {Icon && <Icon className="links-card__icon" />}
      <span className="links-card__body">
        <span className="links-card__title">{link.title}</span>
        {link.description && (
          <span className="links-card__desc">{link.description}</span>
        )}
        {link.logos && (
          <span className="links-card__logos">
            {link.logos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="links-card__logo"
              />
            ))}
          </span>
        )}
      </span>
      <span className="links-card__cue" aria-hidden="true">
        {link.type === "download" ? "↓" : "→"}
      </span>
    </>
  );

  const className = `links-card links-anim${
    link.featured ? " links-card--featured" : ""
  }${link.thumb ? " links-card--thumb" : ""}`;

  if (link.type === "internal") {
    return (
      <Link to={link.url} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {inner}
    </a>
  );
}

/* ─────────────────────────────────────────────
   Paw divider — tanuki peeks in from the screen edge
   ───────────────────────────────────────────── */
function PawDivider() {
  return (
    <div className="links__divider">
      <span className="links__divider-text">Still here?</span>

      <div className="links__paws" aria-hidden="true">
        {[0, 1].map((i) => (
          <img key={i} src={StepSvg} alt="" className="links__paw" />
        ))}
      </div>

      <span className="links__divider-text">Wanna know more?</span>

      <img
        src={TanukiWaitImg}
        alt=""
        aria-hidden="true"
        className="links__peek"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Drop me a line — copy button + short form
   ───────────────────────────────────────────── */
function ContactNote() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const emailAddress = `${EMAIL_USER}@${EMAIL_DOMAIN}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (http, old browser) — show it so they can select it
      setRevealed(true);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        formRef.current,
        EMAILJS.publicKey
      )
      .then(
        () => {
          setStatus("sent");
          e.target.reset();
        },
        () => setStatus("error")
      );
  };

  return (
    <section className="links-contact" aria-labelledby="dropMeALine">
      <div className="links-contact__paper links-anim">
        <span className="links-contact__tape" aria-hidden="true" />

        <p className="links-contact__eyebrow">Get in touch</p>
        <h2 className="links-contact__title" id="dropMeALine">
          Drop me a line
        </h2>
        <p className="links-contact__sub">
          My pet peeve is checking my email inbox every 30 min. I read
          EVERYTHING :0
        </p>

        {/* copy email */}
        <button
          type="button"
          className={`links-contact__copy${
            copied ? " links-contact__copy--copied" : ""
          }`}
          onClick={handleCopy}
        >
          <IconMail className="links-contact__copy-icon" />
          <span className="links-contact__copy-label">
            {copied ? "Copied to clipboard ✓" : "Copy my email"}
          </span>
        </button>

        {revealed && (
          <p className="links-contact__reveal">
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
          </p>
        )}

        <span className="links-contact__or">or write here</span>

        {/* short form */}
        <form ref={formRef} onSubmit={sendEmail} className="links-contact__form">
          <div className="links-contact__field">
            <label className="links-contact__label" htmlFor="lc-name">
              Name
            </label>
            <input
              id="lc-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="Your name"
            />
          </div>

          <div className="links-contact__field">
            <label className="links-contact__label" htmlFor="lc-email">
              Email
            </label>
            <input
              id="lc-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="your@email.com"
            />
          </div>

          <div className="links-contact__field">
            <label className="links-contact__label" htmlFor="lc-message">
              Message
            </label>
            <textarea
              id="lc-message"
              name="message"
              required
              rows="3"
              placeholder="Say hi..."
            />
          </div>

          <button
            type="submit"
            className="links-contact__send"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send it →"}
          </button>
        </form>

        {/* one polite live region for both actions */}
        <p className="links-contact__status" aria-live="polite">
          {copied && "Email address copied to your clipboard."}
          {status === "sent" && "Message sent. I'll get back to you soon 🦝"}
          {status === "error" &&
            "Something went wrong. Try the copy button instead."}
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */
function Links() {
  const rootRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".links-anim, .links__paw, .links__peek", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".links__avatar",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.9 }
      )
        .fromTo(
          ".links__identity",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".links__bio",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".links__doodle",
          { opacity: 0, scale: 0.6, rotation: -12 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(2)",
          },
          "-=0.45"
        )
        .fromTo(
          ".links-card",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 },
          "-=0.35"
        )
        .fromTo(
          ".links__paw",
          { opacity: 0, y: -8 },
          { opacity: 0.7, y: 0, duration: 0.35, stagger: 0.12 },
          "-=0.15"
        )
        .fromTo(
          ".links__peek",
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.7, ease: "back.out(1.4)" },
          "-=0.2"
        )
        .fromTo(
          ".links-contact__paper",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.1"
        )
        .fromTo(
          ".links__footer-inner",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.2"
        );

      // gentle idle motion
      gsap.to(".links__doodle--star", {
        rotation: 12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.4,
      });
      gsap.to(".links__doodle--arrow", {
        y: 5,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.4,
      });
      gsap.to(".links__tanuki", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="links" ref={rootRef}>
      <section className="links__hero">
        <div className="links__avatar-wrap">
          <span className="links__avatar-tape" aria-hidden="true" />
          <img
            src={ProfileImg}
            alt="Yurino Murakami"
            className="links__avatar links-anim"
            width="200"
            height="200"
          />
          <DoodleStar className="links__doodle links__doodle--star links-anim" />
          <DoodleSparkle className="links__doodle links__doodle--sparkle links-anim" />
          <DoodleArrow className="links__doodle links__doodle--arrow links-anim" />
        </div>

        <div className="links__identity links-anim">
          <h1 className="links__name">{profile.name}</h1>
          <p className="links__handle">{profile.handle}</p>
          <DoodleSquiggle className="links__doodle links__doodle--squiggle links-anim" />
        </div>

        <p className="links__bio links-anim">
          <strong className="links__bio-role">{profile.role}</strong>
          {profile.bioLines.map((line) => (
            <span className="links__bio-rest" key={line}>
              {line}
            </span>
          ))}
        </p>
      </section>

      <nav className="links__list" aria-label="Yuri's links">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </nav>

      <PawDivider />

      <ContactNote />

      <footer className="links__footer">
        <div className="links__footer-inner links-anim">
          <p className="links__footer-note">Let's be a Tomodachi!</p>
          <div className="links__footer-social">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="links__footer-icon"
            >
              <IconLinkedIn />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="links__footer-icon"
            >
              <IconInstagram />
            </a>
          </div>

          <p className="links__footer-mark">@lilyzvillage 2026</p>
          <p className="links__footer-mark">
            The mascot is inspired by Japanese raccoon called Tanuki
          </p>
          <img src={TanukiImg} alt="" className="links__tanuki" />
        </div>
      </footer>
    </div>
  );
}

export default Links;
