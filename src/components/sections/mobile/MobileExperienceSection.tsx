import React, { useState } from 'react';
import { SpaceHUD } from '../../SpaceHUD';
import { experience } from '../../../content/website-content';
import { sectionLabels } from '../../../content/website-content';

interface MobileExperienceSectionProps {
  isActive: boolean;
}

export function MobileExperienceSection({ isActive }: MobileExperienceSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedExp = experience[selectedIndex];
  
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time': return '#10B981';
      case 'freelance': return '#FACC14';
      case 'contract': return '#F59E0B';
      default: return 'rgba(255, 255, 255, 0.6)';
    }
  };

  const getTypeVariant = (type: string): 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' => {
    switch (type.toLowerCase()) {
      case 'full-time': return 'success';
      case 'freelance': return 'primary';
      case 'contract': return 'warning';
      default: return 'secondary';
    }
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : experience.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < experience.length - 1 ? prev + 1 : 0));
  };

  return (
    <div 
      className="section-wrapper"
      data-section="experience"
      data-active={isActive}
    >
      <div className="h-full w-full flex flex-col px-4 py-4">
        <div className="flex-1 flex flex-col justify-evenly gap-3 overflow-y-auto">
          {/* Header */}
          <div className="hud-stagger-1">
            <h2 className="text-lg font-bold text-yellow-400 mb-2">{sectionLabels.experience.terminalTitle}</h2>
          </div>

          {/* Company Name */}
          <div className="hud-stagger-2">
            <div className="text-white/60 uppercase mb-1"
                 style={{ fontSize: 'clamp(11px, 3.2vw, 13px)' }}>
              Company
            </div>
            <h2 
              className="uppercase"
              style={{ 
                color: getTypeColor(selectedExp.type),
                textShadow: `0 0 12px ${getTypeColor(selectedExp.type)}80`,
                fontSize: 'clamp(24px, 7vw, 36px)',
                fontWeight: 900,
                lineHeight: 1.2
              }}
            >
              {selectedExp.company}
            </h2>
          </div>

          {/* Navigation */}
          <div className="hud-stagger-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                className="px-3 py-1.5 font-mono transition-all duration-300"
                style={{
                  border: `1px solid ${getTypeColor(selectedExp.type)}`,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: getTypeColor(selectedExp.type),
                  fontSize: 'clamp(11px, 3.2vw, 13px)'
                }}
              >
                ←
              </button>
              
              <span className="text-white/40 font-mono"
                    style={{ fontSize: 'clamp(10px, 3vw, 11px)' }}>
                {selectedIndex + 1} / {experience.length}
              </span>
              
              <button
                onClick={handleNext}
                className="px-3 py-1.5 font-mono transition-all duration-300"
                style={{
                  border: `1px solid ${getTypeColor(selectedExp.type)}`,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: getTypeColor(selectedExp.type),
                  fontSize: 'clamp(11px, 3.2vw, 13px)'
                }}
              >
                →
              </button>
            </div>
          </div>

          {/* Position & Type */}
          <div className="hud-stagger-4">
            <div className="text-white/60 uppercase mb-1"
                 style={{ fontSize: 'clamp(11px, 3.2vw, 13px)' }}>
              Designation
            </div>
            <div className="uppercase mb-2"
                 style={{ 
                   color: getTypeColor(selectedExp.type),
                   textShadow: `0 0 12px ${getTypeColor(selectedExp.type)}80`,
                   fontSize: 'clamp(16px, 4.5vw, 20px)', 
                   fontWeight: 900 
                 }}>
              {selectedExp.title}
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1"
                   style={{
                     backgroundColor: `${getTypeColor(selectedExp.type)}20`,
                     border: `1px solid ${getTypeColor(selectedExp.type)}`,
                     color: getTypeColor(selectedExp.type),
                     fontSize: 'clamp(10px, 3vw, 11px)',
                     fontWeight: 900
                   }}>
                {selectedExp.type.toUpperCase()}
              </div>
              <span className="text-white/60 font-mono"
                    style={{ fontSize: 'clamp(11px, 3.2vw, 13px)' }}>
                {selectedExp.period}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="hud-stagger-5">
            <SpaceHUD variant={getTypeVariant(selectedExp.type)} title="ROLE OVERVIEW" size="small" glow={true}>
              <p className="text-white leading-relaxed"
                 style={{ fontSize: 'clamp(12px, 3.5vw, 14px)' }}>
                {selectedExp.description}
              </p>
            </SpaceHUD>
          </div>

          {/* Key Achievements */}
          <div className="hud-stagger-6 mb-4">
            <SpaceHUD variant={getTypeVariant(selectedExp.type)} title="KEY ACHIEVEMENTS" size="small" glow={true}>
              <div className="space-y-2">
                {selectedExp.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                         style={{ backgroundColor: getTypeColor(selectedExp.type) }}></div>
                    <span className="text-white leading-relaxed"
                          style={{ fontSize: 'clamp(11px, 3.2vw, 13px)' }}>
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </SpaceHUD>
          </div>
        </div>
      </div>
    </div>
  );
}
