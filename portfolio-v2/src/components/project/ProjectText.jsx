import React from 'react';
import './ProjectText.css';

const ProjectText = ({ id, label, title, children }) => {
  return (
    <section className="project-text" id={id}>
      <div className="container">
        <div className="project-text__paper">
          {label && <p className="label project-text__label">{label}</p>}
          {title && <h2 className="project-text__title">{title}</h2>}
          <div className="project-text__body">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectText;
