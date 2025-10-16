import React from 'react';
import { sectionLabels } from '../../../content/website-content';

interface MobileHomeSectionProps {
  isActive: boolean;
}

export function MobileHomeSection({ isActive }: MobileHomeSectionProps) {
  return (
    <div 
      className="section-wrapper"
      data-section="home"
      data-active={isActive}
    >
      <div className="h-full w-full flex items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center text-center w-full hud-stagger-1">
          <h1 
            className="text-[#facc14] uppercase leading-tight"
            style={{ 
              textShadow: '0 0 12px rgba(250, 204, 20, 0.8)',
              fontSize: 'clamp(24px, 8vw, 48px)',
              fontWeight: 900
            }}
          >
            {sectionLabels.home.heroText.split('.').map((line, i) => (
              <span key={i}>{line.trim()}{i < sectionLabels.home.heroText.split('.').length - 1 ? <br/> : null}</span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
}
