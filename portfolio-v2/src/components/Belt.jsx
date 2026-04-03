import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Belt.css';

const ProjectBelt = ({ images }) => {
  const beltRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track mobile breakpoint
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP scrolling belt — desktop only
  useEffect(() => {
    if (isMobile || !beltRef.current) return;

    const belt = beltRef.current;

    // Wait for images inside the belt to load before calculating width
    const imgs = Array.from(belt.querySelectorAll('img'));
    let loaded = 0;

    const startAnimation = () => {
      const beltWidth = belt.scrollWidth / 2;

      gsap.killTweensOf(belt);
      gsap.set(belt, { x: 0 });

      const anim = gsap.to(belt, {
        x: -beltWidth,
        duration: 30,
        ease: 'linear',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % beltWidth),
        },
      });

      return anim;
    };

    let anim;

    if (imgs.length === 0) {
      anim = startAnimation();
    } else {
      const onLoad = () => {
        loaded++;
        if (loaded >= imgs.length) anim = startAnimation();
      };
      imgs.forEach(img => {
        if (img.complete) onLoad();
        else { img.addEventListener('load', onLoad); img.addEventListener('error', onLoad); }
      });
    }

    return () => {
      anim?.kill();
      imgs.forEach(img => {
        img.removeEventListener('load', () => {});
        img.removeEventListener('error', () => {});
      });
    };
  }, [isMobile, images]);

  // Desktop: duplicate images for seamless loop
  const rendered = isMobile ? images : [...images, ...images];

  return (
    <section className={`project-belt ${isMobile ? 'project-belt--mobile' : 'project-belt--desktop'}`}>
      <div
        className="project-belt__track"
        ref={beltRef}
        style={{ flexDirection: isMobile ? 'column' : 'row' }}
      >
        {rendered.map((src, i) => (
          <div className="project-belt__item" key={`${src}-${i}`}>
            <img src={src} alt={`belt-${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectBelt;
