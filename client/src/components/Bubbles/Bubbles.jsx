import React from 'react';
import './Bubbles.css';

const Bubbles = () => {
  // Generate 8 bubbles with different sizes and animation delays
  const bubbles = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    size: Math.random() * 60 + 20, // Random size between 20px and 80px
    delay: Math.random() * 5, // Random delay between 0s and 5s
    duration: Math.random() * 5 + 8, // Random duration between 8s and 13s
    left: Math.random() * 100, // Random horizontal position within left area
  }));

  return (
    <div className="bubbles-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            left: `${bubble.left}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;