import React from 'react';
import MaskSvg from '../../assets/mask.svg';
import './ProjectThumb.css';

const ProjectThumb = ({ imageSrc, imageAlt, title, label, year, role, thumbColor }) => {
  return (
    <section className="project-thumb" id="overview">
      <div
        className="project-thumb__image"
        style={{
          WebkitMaskImage: `url(${MaskSvg})`,
          maskImage: `url(${MaskSvg})`,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      >
        {imageSrc
          ? <img src={imageSrc} alt={imageAlt} />
          : <div className="project-thumb__placeholder" style={{ background: thumbColor || '#C5C9D9' }} />
        }
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
