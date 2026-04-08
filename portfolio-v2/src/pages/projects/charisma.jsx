import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./charisma.css";

import ProjectFigma from "../../components/project/ProjectFigma";

import TanukiImg from "../../assets/tanuki-wait.png";

function Charisma() {
  const navigate = useNavigate();
  const tanukiRef = useRef(null);
  const hardhatRef = useRef(null);

  useEffect(() => {
    // Tanuki bobbing
    gsap.to(tanukiRef.current, {
      y: -12,
      duration: 1.8,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Hard hat wiggle
    gsap.to(hardhatRef.current, {
      rotation: 8,
      duration: 0.4,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Stagger fade in cards
    gsap.fromTo(
      ".asobiba__card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.4,
      }
    );
  }, []);

  return (
    <div className="asobiba">
      {/* ——— Hero ——— */}
      <section className="asobiba__hero">
        <button
          className="btn-outline asobiba__btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
        <div className="container asobiba__hero-inner">
          <div className="asobiba__text">
            <p className="label asobiba__label">Project page</p>
            <h1 className="asobiba__title">
              Under
              <br />
              Construction.
            </h1>
            <p className="asobiba__sub">
              The tanuki is busy building one exciting project page here.
              <br />
              You can have a quick look of the prototype below!
            </p>
          </div>

          {/* Tanuki with hard hat */}
          <div className="asobiba__tanuki" ref={tanukiRef}>
            <div className="asobiba__tanuki-placeholder">
              <span ref={hardhatRef} className="asobiba__hardhat">
                🔨
              </span>
              <img
                className="asobiba__tanuki"
                src={TanukiImg}
                alt="Tanuki building"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <ProjectFigma
          id="figma-prototype"
          label="Prototype"
          desktopSrc="https://embed.figma.com/proto/25yu3eyob8CHKhw2sJMKIe/FLUI-Hackathon--26?node-id=335-1535&p=f&viewport=556%2C138%2C0.14&scaling=scale-down&content-scaling=fixed&starting-point-node-id=335%3A1535&page-id=1%3A2&embed-host=share"
          mobileSrc="https://embed.figma.com/proto/25yu3eyob8CHKhw2sJMKIe/FLUI-Hackathon--26?node-id=459-3862&p=f&viewport=727%2C124%2C0.11&scaling=scale-down&content-scaling=fixed&starting-point-node-id=459%3A3862&page-id=459%3A3860&embed-host=share"
        />
      </section>
    </div>
  );
}

export default Charisma;
