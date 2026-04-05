import React, { useEffect, useRef } from 'react';
import './LinkedInEmbed.css';

const LinkedInEmbed = ({ embedCode, caption }) => {
  const containerRef = useRef(null);

  // LinkedIn embed needs its script to re-run after React renders
  useEffect(() => {
    if (!containerRef.current) return;

    // Remove any existing LinkedIn script to force reload
    const existingScript = document.querySelector('script[src="https://platform.linkedin.com/in.js"]');
    if (existingScript) existingScript.remove();

    // Re-inject LinkedIn embed script
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/in.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => script.remove();
  }, [embedCode]);

  return (
    <div className="linkedin-embed">
      {caption && <p className="label linkedin-embed__caption">{caption}</p>}
      <div
        className="linkedin-embed__container"
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
    </div>
  );
};

export default LinkedInEmbed;
