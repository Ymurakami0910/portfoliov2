import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Belt.css';

const ProjectBelt = ({ images }) => {
  const beltRef    = useRef(null);
  const animRef    = useRef(null);

  useEffect(() => {
    const belt = beltRef.current;
    if (!belt) return;

    const startAnim = () => {
      const beltWidth = belt.scrollWidth / 2;
      gsap.killTweensOf(belt);
      gsap.set(belt, { x: 0 });
      animRef.current = gsap.to(belt, {
        x: -beltWidth,
        duration: 30,
        ease: 'linear',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % beltWidth),
        },
      });
    };

    const stopAnim = () => {
      animRef.current?.kill();
      gsap.set(belt, { x: 0 });
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        startAnim();
      } else {
        stopAnim();
      }

      // Mobile scroll fade-in
if (window.innerWidth < 768) {
  const items = belt.querySelectorAll('.project-belt__item');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  items.forEach(item => observer.observe(item));

  return () => observer.disconnect();
}
    };

    // Wait for images to load then start
    const imgs = Array.from(belt.querySelectorAll('img'));
    let loaded = 0;

    const onLoad = () => {
      loaded++;
      if (loaded >= imgs.length) handleResize();
    };

    if (imgs.length === 0) {
      handleResize();
    } else {
      imgs.forEach(img => {
        if (img.complete) onLoad();
        else {
          img.addEventListener('load', onLoad);
          img.addEventListener('error', onLoad);
        }
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      animRef.current?.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [images]);

  return (
    <section className="project-belt">
      <div className="project-belt__track" ref={beltRef}>
        {[...images, ...images].map((src, i) => (
          <div className="project-belt__item" key={`${src}-${i}`}>
            <img src={src} alt={`belt-${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectBelt;