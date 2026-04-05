import React, { useEffect, useCallback } from 'react';
import './ProjectLightbox.css';

// Global lightbox that works across ALL visual elements on the page
const ProjectLightbox = ({ items, startIndex, onClose }) => {
  const [current, setCurrent] = React.useState(startIndex || 0);

  const prev = useCallback(() => setCurrent(i => (i === 0 ? items.length - 1 : i - 1)), [items]);
  const next = useCallback(() => setCurrent(i => (i === items.length - 1 ? 0 : i + 1)), [items]);

  // Keyboard nav
  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [prev, next, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const item = items[current];

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__inner" onClick={e => e.stopPropagation()}>

        <button className="lightbox__close" onClick={onClose} aria-label="Close">×</button>

        <button className="lightbox__arrow lightbox__arrow--prev" onClick={prev} aria-label="Previous">‹</button>

        <div className="lightbox__media">
          {item.src
            ? <img src={item.src} alt={item.alt || `Visual ${current + 1}`} />
            : <div className="lightbox__placeholder" style={{ background: item.color || '#D9C5C0' }} />
          }
        </div>

        <button className="lightbox__arrow lightbox__arrow--next" onClick={next} aria-label="Next">›</button>

        <div className="lightbox__footer">
          {item.caption && <p className="lightbox__caption">{item.caption}</p>}
          <span className="lightbox__count">{current + 1} / {items.length}</span>
        </div>

      </div>
    </div>
  );
};

export default ProjectLightbox;
