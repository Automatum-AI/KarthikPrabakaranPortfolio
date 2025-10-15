import React, { useState, useEffect } from 'react';
import { useResponsive } from '../ui/responsive-context';
import { coordinateData } from '../../content/website-content';

export function Footer() {
  const responsive = useResponsive();
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
    <>
      {/* Website Under Construction - Bottom Left */}
      <div 
        className="fixed bottom-0 left-0 z-50"
        style={{ 
          paddingBottom: `${responsive.layout.sectionPadding.bottom}px`,
          paddingLeft: `${responsive.layout.sectionPadding.left}px`
        }}
      >
        <div 
          className="relative px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] overflow-hidden"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(239, 68, 68, 0.6)',
            clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))',
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.3), inset 0 0 4px rgba(239, 68, 68, 0.2)',
            color: '#EF4444',
            textShadow: '0 0 6px #EF4444',
            height: '28px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.6), transparent)',
              animation: 'advanced-scan-horizontal 3s ease-in-out infinite'
            }}
          />
          <span className="relative z-10">Website Under Construction</span>
        </div>
      </div>
      
      {/* Coordinates Display - Bottom Right */}
      <div 
        className="fixed bottom-0 right-0 z-50 w-screen"
        style={{ 
          paddingBottom: `${responsive.layout.sectionPadding.bottom}px`
        }}
      >
        <div 
          className="flex space-x-8 items-center relative justify-end"
          style={{ 
            paddingRight: `${responsive.layout.sectionPadding.right}px`
          }}
        >
          {coordData.map((coord, index) => (
            <div
              key={coord.label}
              className="relative px-2 py-1 font-mono text-[10px] uppercase overflow-hidden"
              style={{
                marginLeft: index === 0 ? '0' : '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                border: `1px solid ${coord.color}60`,
                clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))',
                color: coord.color,
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                letterSpacing: '0.55em'
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
              <div 
                className="absolute bottom-0 left-0 w-0.5 h-0.5"
                style={{
                  backgroundColor: coord.color,
                  clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
                  animation: 'advanced-corner-pulse 1.5s ease-in-out infinite',
                  animationDelay: `${index * 0.3 + 0.75}s`
                }}
              />
              <span className="relative z-10" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {coord.label}:{coord.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}