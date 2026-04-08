import React, { useEffect, useState } from "react";
import "./ProjectFigma.css";

const ProjectFigma = ({ id, label, desktopSrc, mobileSrc }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section className="project-figma" id={id}>
      <div className="container">
        {label && <p className="label project-figma__label">{label}</p>}

        <div className="project-figma__frame">
          <iframe
            src={isMobile ? mobileSrc : desktopSrc}
            title="Figma Design"
            allowFullScreen
            style={{ border: "1px solid rgba(0,0,0,0.1)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectFigma;
