import React, { useEffect, useState } from 'react';

export const Visualizer: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  // Create an array of 60 bars for a finer look
  const bars = Array.from({ length: 60 }, (_, i) => i);
  
  return (
    <div className="flex items-center justify-center gap-[3px] h-16 w-full px-4">
      {bars.map((i) => (
        <Bar key={i} index={i} isPlaying={isPlaying} />
      ))}
    </div>
  );
};

const Bar: React.FC<{ index: number; isPlaying: boolean }> = ({ isPlaying, index }) => {
  const [height, setHeight] = useState(4);

  useEffect(() => {
    if (!isPlaying) {
      setHeight(4);
      return;
    }

    const interval = setInterval(() => {
      // Create a wave-like pattern + random noise
      // Higher bars in the middle
      const baseHeight = Math.sin(index / 10) * 10 + 10; 
      const noise = Math.random() * 15;
      setHeight(Math.max(4, baseHeight + noise));
    }, 80); // Fast update

    return () => clearInterval(interval);
  }, [isPlaying, index]); // Add index to dependency to vary logic if needed

  return (
    <div
      className="w-[1px] bg-white/40 rounded-full transition-[height] duration-75 ease-in-out"
      style={{ height: `${height}px` }}
    />
  );
};