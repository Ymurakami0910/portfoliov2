import React, { useRef } from 'react';
import './Snow.css';

const FLAKE_COUNT = 52;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Generated once at module level so flakes don't re-randomise on re-render
const FLAKES = Array.from({ length: FLAKE_COUNT }, (_, i) => ({
  id: i,
  x:        randomBetween(0, 100),
  size:     randomBetween(3, 8),
  opacity: randomBetween(0.08, 0.22),
  duration: randomBetween(7, 20),
  delay:    randomBetween(0, 16),
  drift:    randomBetween(-2, 2),
}));

export default function Snow() {
  return (
    <div className="snow" aria-hidden="true">
      {FLAKES.map((flake) => (
        <div
          key={flake.id}
          className="snow__flake"
          style={{
            left:            `${flake.x}%`,
            width:           `${flake.size}px`,
            height:          `${flake.size}px`,
            opacity:         flake.opacity,
            animationDuration:`${flake.duration}s`,
            animationDelay:  `${flake.delay}s`,
            '--drift':       `${flake.drift}vw`,
          }}
        />
      ))}
    </div>
  );
}
