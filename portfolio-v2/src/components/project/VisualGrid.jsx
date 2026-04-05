import React from 'react';
import './VisualGrid.css';

function VisualGrid({ items, allVisuals, onOpen, caption, aspectRatio }) {
  return (
    <div className="visual-grid">
      <div className="container">
        <div
          className={`visual-grid__grid visual-grid__grid--${Math.min(items.length, 4)}`}
          style={{ '--aspect': aspectRatio || '16 / 10' }}
        >
          {items.map((item, i) => {
            const globalIndex = allVisuals ? allVisuals.indexOf(item) : i;
            return (
              <button
                key={i}
                className="visual-grid__item"
                onClick={() => onOpen(globalIndex)}
                aria-label={item.alt || `Open visual ${i + 1}`}
              >
                {item.src
                  ? <img src={item.src} alt={item.alt} />
                  : <div className="visual-grid__placeholder" style={{ background: item.color || '#D0D0D0' }} />
                }
                <div className="visual-grid__overlay"><span>View ↗</span></div>
              </button>
            );
          })}
        </div>
      </div>
      {caption && <p className="visual-grid__caption container">{caption}</p>}
    </div>
  );
}

export default VisualGrid;
