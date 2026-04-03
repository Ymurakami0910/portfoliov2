import React, { useState } from 'react';
import './ProjectSlides.css';

const ProjectSlides = ({ id, label, images }) => {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const prev = () => setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === images.length - 1 ? 0 : i + 1));

  const openModal = (i) => { setModalIndex(i); setModalOpen(true); };
  const prevModal = () => setModalIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const nextModal = () => setModalIndex(i => (i === images.length - 1 ? 0 : i + 1));

  const visible = [
    images[current % images.length],
    images[(current + 1) % images.length],
    images[(current + 2) % images.length],
  ];

  return (
    <section className="project-slides" id={id}>
      <div className="container">
        {label && <p className="label project-slides__label">{label}</p>}
        <div className="project-slides__track">
          <button className="slides-arrow slides-arrow--prev" onClick={prev}>‹</button>
          <div className="project-slides__items">
            {visible.map((img, i) => (
              <div key={i} className="project-slides__item" onClick={() => openModal((current + i) % images.length)}>
                <img src={img} alt={`Slide ${current + i + 1}`} />
              </div>
            ))}
          </div>
          <button className="slides-arrow slides-arrow--next" onClick={next}>›</button>
        </div>
      </div>

      {modalOpen && (
        <div className="slides-modal" onClick={() => setModalOpen(false)}>
          <div className="slides-modal__content" onClick={e => e.stopPropagation()}>
            <button className="slides-modal__close" onClick={() => setModalOpen(false)}>×</button>
            <button className="slides-arrow slides-arrow--prev" onClick={prevModal}>‹</button>
            <img src={images[modalIndex]} alt={`Expanded ${modalIndex + 1}`} />
            <button className="slides-arrow slides-arrow--next" onClick={nextModal}>›</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectSlides;