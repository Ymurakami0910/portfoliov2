import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';

function ProjectCard({ id, title, label, date, image, color, slug }) {
  const navigate = useNavigate();

  return (
    <div className="project-card" onClick={() => navigate(slug)}>

      {/* Image */}
      <div className="project-card__image" style={{ background: color }}>
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="project-card__placeholder" />
        )}
      </div>

      {/* Info */}
      <div className="project-card__info">
        <div className="project-card__meta">
          <span className="label">{label}</span>
          <span className="label project-card__date">{date}</span>
        </div>
        <h3 className="project-card__title">{title}</h3>
          <div className="project-card__peel"></div>
        </div>
      </div>

  );
}

export default ProjectCard;
