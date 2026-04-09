import React, { useState, useEffect } from 'react';
import './BackToTop.css';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
<button
  className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  aria-label="Back to top"
>
  <div className="back-to-top__paw" />
  <span className="back-to-top__label">Top</span>
</button>
  );
}

export default BackToTop;