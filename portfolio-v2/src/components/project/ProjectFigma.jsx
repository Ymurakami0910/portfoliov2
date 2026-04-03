import React from 'react';
import './ProjectFigma.css';

const ProjectFigma = ({ id, label, src }) => {
  return (
    <section className="project-figma" id={id}>
      <div className="container">
        {label && <p className="label project-figma__label">{label}</p>}
        <div className="project-figma__frame">
          <iframe
            src={src}
            allowFullScreen
            title="Figma Design"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectFigma;
