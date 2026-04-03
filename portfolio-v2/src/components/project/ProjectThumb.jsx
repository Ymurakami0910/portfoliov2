import React from 'react';
import './ProjectThumb.css';
import MaskSvg from '../../assets/mask.svg';

const ProjectThumb = ({ imageSrc, imageAlt, title, label, year, role }) => {
  return (
    <section className="project-thumb" id="overview">
      <div className="project-thumb__image" style={{ WebkitMaskImage: `url(${MaskSvg})`, maskImage: `url(${MaskSvg})` }}>
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
