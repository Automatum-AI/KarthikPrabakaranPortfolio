import React, { useState, useEffect } from 'react';
import { coordinateData } from '../../content/website-content';

export function MobileFooter() {
  const [coords, setCoords] = useState({
    x: '10234567',
    y: '45678901',
    z: '89012345'
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCoords({
        x: Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join(''),
        y: Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join(''),
        z: Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('')
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  const coordData = coordinateData.map(coord => ({
    ...coord,
    value: coords[coord.label.toLowerCase() as keyof typeof coords]
  }));

  return (
    <div className="mx-3 mb-1 relative">
      <div className="flex gap-1 items-center justify-center">
        {coordData.map((coord, index) => (
          <div
            key={coord.label}
            className="relative px-1.5 py-0.5 font-mono uppercase tracking-wide overflow-hidden"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              border: `1px solid ${coord.color}60`,
              clipPath: 'polygon(0 0, calc(100% - 2px) 0, 100% 2px, 100% 100%, 2px 100%, 0 calc(100% - 2px))',
              boxShadow: `0 0 6px ${coord.color}30, inset 0 0 3px ${coord.color}20`,
              color: coord.color,
              textShadow: `0 0 4px ${coord.color}`,
              fontSize: 'clamp(7px, 2vw, 9px)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${coord.color}60, transparent)`,
                animation: 'advanced-scan-horizontal 3s ease-in-out infinite',
                animationDelay: `${index * 0.5}s`
              }}
            />
            <div 
              className="absolute top-0 right-0 w-0.5 h-0.5"
              style={{
                backgroundColor: coord.color,
                clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                animation: 'advanced-corner-pulse 1.5s ease-in-out infinite',
                animationDelay: `${index * 0.3}s`
              }}
            />
            <span className="relative z-10" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {coord.label}:{coord.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
