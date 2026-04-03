import React from 'react';
import './ProjectThumb.css';

const ProjectThumb = ({ imageSrc, imageAlt, title, label, year, role }) => {
  return (
    <section className="project-thumb" id="overview">
      <div className="project-thumb__image">
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div className="container project-thumb__info">
        <div className="project-thumb__meta">
          <span className="label">{label}</span>
          <span className="label">{year}</span>
        </div>
        <h1 className="project-thumb__title">{title}</h1>
        {role && <p className="project-thumb__role">{role}</p>}
      </div>
    </section>
  );
};

export default ProjectThumb;
