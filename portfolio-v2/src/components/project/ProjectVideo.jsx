import React from 'react';
import './ProjectVideo.css';

const ProjectVideo = ({ id, label, src, title, description }) => {
  return (
    <section className="project-video" id={id}>
      <div className="container">
        {label && <p className="label project-video__label">{label}</p>}
        <div className="project-video__wrap">
          <video
            controls
            autoPlay
            muted
            loop
            playsInline
            className="project-video__player"
          >
            <source src={src} type="video/mp4" />
          </video>
          {(title || description) && (
            <div className="project-video__text">
              {title && <h3>{title}</h3>}
              {description && <p>{description}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectVideo;
