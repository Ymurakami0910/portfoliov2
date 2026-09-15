import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./Links.css";

import ProfileImg from "../assets/links-profile.png";
import TanukiImg from "../assets/tanuki-footer.svg";

/* ─────────────────────────────────────────────
   CONFIG — every URL lives here, nowhere else
   ───────────────────────────────────────────── */
const LINKEDIN_URL = "https://www.linkedin.com/in/yurino-murakami-047175318";
const INSTAGRAM_URL = "https://www.instagram.com/lilyzvillage.design/";
const RESUME_URL = "/Yurino-Murakami-Resume[Creative].pdf";
const AMA_PRESENTATION_URL = "https://canva.link/o0ix7nu98em7utq";

const profile = {
  name: "Yuri",
  handle: "Yurino Murakami",
  role: "Creative Strategist",
  bioRest: "2nd place @ AMA Case Competition | Bachelor of Creative Industries @ BCIT",
};

const links = [
  {
    id: "linkedin",
    title: "Connect with me on LinkedIn",
    description: "Let's stay in touch",
    url: LINKEDIN_URL,
    type: "external",
    icon: "linkedin",
    featured: true,
  },
  {
    id: "portfolio",
    title: "Explore my portfolio",
    url: "/",
    type: "internal",
  },
  {
    id: "ama",
    title: "AMA Case Competition — 2nd Place",
    description: "View the full MLB case presentation",
    url: AMA_PRESENTATION_URL,
    type: "external",
  },
  {
    id: "resume",
    title: "Download my resume",
    url: RESUME_URL,
    type: "download",
  },
  {
    id: "instagram",
    title: "Follow me on Instagram",
    url: INSTAGRAM_URL,
    type: "external",
    icon: "instagram",
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

const icons = {
  linkedin: IconLinkedIn,
  instagram: IconInstagram,
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
      </span>
      <span className="links-card__cue" aria-hidden="true">
        {link.type === "download" ? "↓" : "→"}
      </span>
    </>
  );

  const className = `links-card links-anim${
    link.featured ? " links-card--featured" : ""
  }`;

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
        gsap.set(".links-anim", { opacity: 1, y: 0, scale: 1 });
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
          <span className="links__bio-rest">{profile.bioRest}</span>
        </p>
      </section>

      <nav className="links__list" aria-label="Yuri's links">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </nav>

      <footer className="links__footer">
        <div className="links__footer-inner links-anim">
          <p className="links__footer-note">Let's be a Tomodachi!</p>
          <p className="links__footer-mark">@lilyzvillage 2026</p>
          <img src={TanukiImg} alt="" className="links__tanuki" />
        </div>
      </footer>
    </div>
  );
}

export default Links;
