import React, { useState } from 'react';
import { SpaceHUD } from '../SpaceHUD';
import { SectionLayout, ThreeColumnLayout } from '../SectionLayout';
import { experience } from '../../content/website-content';
import { useResponsive } from '../ui/responsive-context';

interface ExperienceSectionProps {
  isActive: boolean;
}

export function ExperienceSection({ isActive }: ExperienceSectionProps) {
  const responsive = useResponsive();
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
    <SectionLayout isActive={isActive} sectionId="experience">
      <ThreeColumnLayout
        left={
          <div className="flex flex-col h-full hud-stagger-1" style={{ gap: `${responsive.spacing['2xl']}px` }}>
            <div className="flex flex-col" style={{ gap: `${responsive.spacing.lg}px` }}>
              <div className="flex items-center" style={{ gap: `${responsive.spacing.md}px` }}>
                <div className="w-3 h-3 rounded-full animate-pulse"
                     style={{ backgroundColor: getTypeColor(selectedExp.type) }}></div>
                <span className="text-white font-mono tracking-wider uppercase" style={{ fontSize: `${responsive.fontSize.lg}px` }}>
                  CAREER DETAILS
                </span>
              </div>
              
              <div className="font-medium text-white/60" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                <p>COMPANY</p>
              </div>
              <div 
                className="font-bold"
                style={{ 
                  fontSize: `${responsive.fontSize['2xl']}px`,
                  color: getTypeColor(selectedExp.type),
                  textShadow: `0 0 15px ${getTypeColor(selectedExp.type)}80`
                }}
              >
                <p>{selectedExp.company}</p>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex items-center" style={{ gap: `${responsive.spacing.sm}px`, marginTop: `${responsive.spacing.lg}px` }}>
                <button
                  onClick={handlePrevious}
                  className="font-mono transition-all duration-300 relative overflow-hidden"
                  style={{
                    padding: `${responsive.spacing.sm}px ${responsive.spacing.md}px`,
                    fontSize: `${responsive.fontSize.base * 0.875}px`,
                    border: `2px solid ${getTypeColor(selectedExp.type)}`,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: getTypeColor(selectedExp.type),
                    boxShadow: `0 0 15px ${getTypeColor(selectedExp.type)}30`,
                  }}
                >
                  ←
                </button>
                
                <span className="text-white/40 font-mono" style={{ fontSize: `${responsive.fontSize.base * 0.75}px` }}>
                  {selectedIndex + 1} / {experience.length}
                </span>
                
                <button
                  onClick={handleNext}
                  className="font-mono transition-all duration-300 relative overflow-hidden"
                  style={{
                    padding: `${responsive.spacing.sm}px ${responsive.spacing.md}px`,
                    fontSize: `${responsive.fontSize.base * 0.875}px`,
                    border: `2px solid ${getTypeColor(selectedExp.type)}`,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: getTypeColor(selectedExp.type),
                    boxShadow: `0 0 15px ${getTypeColor(selectedExp.type)}30`,
                  }}
                >
                  →
                </button>
              </div>
            </div>
            
            <div className="flex flex-col" style={{ gap: `${responsive.spacing.sm}px` }}>
              <div className="font-medium text-white/60" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                <p>DURATION</p>
              </div>
              <div 
                className="font-bold"
                style={{ 
                  fontSize: `${responsive.fontSize['2xl']}px`,
                  color: getTypeColor(selectedExp.type),
                  textShadow: `0 0 15px ${getTypeColor(selectedExp.type)}80`
                }}
              >
                <p>{selectedExp.period}</p>
              </div>
            </div>
            
            <div className="flex flex-col" style={{ gap: `${responsive.spacing.sm}px` }}>
              <div className="font-medium text-white/60" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                <p>LOCATION</p>
              </div>
              <div 
                className="font-bold"
                style={{ 
                  fontSize: `${responsive.fontSize['2xl']}px`,
                  color: getTypeColor(selectedExp.type),
                  textShadow: `0 0 15px ${getTypeColor(selectedExp.type)}80`
                }}
              >
                <p>{selectedExp.location}</p>
              </div>
            </div>
          </div>
        }
        middle={
          <div className="hud-stagger-4 h-full flex flex-col justify-between">
            <div>
              <h2 
                className="font-bold"
                style={{ 
                  fontSize: `${responsive.fontSize['3xl']}px`,
                  color: getTypeColor(selectedExp.type),
                  textShadow: `0 0 15px ${getTypeColor(selectedExp.type)}80`
                }}
              >
                {selectedExp.title}
              </h2>
              <p className="text-white/70" style={{ marginTop: `${responsive.spacing.md}px`, fontSize: `${responsive.fontSize.lg}px` }}>
                {selectedExp.description}
              </p>
            </div>
            
            {/* Tech Stack - Aligned at bottom */}
            <div>
              <div className="text-white/40 font-mono uppercase tracking-wider" style={{ fontSize: `${responsive.fontSize.base * 0.75}px`, marginBottom: `${responsive.spacing.sm}px` }}>
                Tech Stack
              </div>
              <div className="flex flex-wrap" style={{ gap: `${responsive.spacing.xs}px` }}>
                {selectedExp.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full font-mono uppercase tracking-wide transition-all duration-300 hover:scale-105 inline-block"
                    style={{
                      padding: `${responsive.spacing.xs}px ${responsive.spacing.sm}px`,
                      fontSize: `${responsive.fontSize.base * 0.75}px`,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      border: `1px solid ${getTypeColor(selectedExp.type)}40`,
                      color: getTypeColor(selectedExp.type),
                      boxShadow: `0 0 10px ${getTypeColor(selectedExp.type)}20`,
                      textShadow: `0 0 5px ${getTypeColor(selectedExp.type)}60`
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        }
        right={
          <div className="flex flex-col" style={{ gap: `${responsive.spacing.md}px` }}>
            <div className="hud-stagger-5">
              <SpaceHUD variant={getTypeVariant(selectedExp.type)} title="RESPONSIBILITIES" size="medium" glow={true}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${responsive.spacing.xs}px` }}>
                  {selectedExp.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-start text-white/80" style={{ gap: `${responsive.spacing.sm}px`, fontSize: `${responsive.fontSize.base * 0.875}px` }}>
                      <div 
                        style={{ 
                          marginTop: `${responsive.spacing.xs}px`, 
                          fontSize: `${responsive.fontSize.base * 0.75}px`,
                          color: getTypeColor(selectedExp.type)
                        }}
                      >
                        ▶
                      </div>
                      <div>{responsibility}</div>
                    </div>
                  ))}
                </div>
              </SpaceHUD>
            </div>
            
            <div className="hud-stagger-6">
              <SpaceHUD variant={getTypeVariant(selectedExp.type)} title="ACHIEVEMENTS" size="medium" glow={true}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${responsive.spacing.xs}px` }}>
                  {selectedExp.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start text-white/80" style={{ gap: `${responsive.spacing.sm}px`, fontSize: `${responsive.fontSize.base * 0.875}px` }}>
                      <div 
                        style={{ 
                          marginTop: `${responsive.spacing.xs}px`, 
                          fontSize: `${responsive.fontSize.base * 0.75}px`,
                          color: getTypeColor(selectedExp.type)
                        }}
                      >
                        ▶
                      </div>
                      <div>{achievement}</div>
                    </div>
                  ))}
                </div>
              </SpaceHUD>
            </div>
          </div>
        }
      />
    </SectionLayout>
  );
}
