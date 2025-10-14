import React, { useState, useEffect } from 'react';
import { ScrambledText } from '../ScrambledText';
import { useResponsive } from '../ui/responsive-context';
import { navigationSections } from '../../content/website-content';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

function Navigation({ activeSection, onSectionChange }: { activeSection: string, onSectionChange: (section: string) => void }) {
  
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {navigationSections.map((section) => {
        const isActive = activeSection === section;
        return (
          <button
            key={section}
            onClick={() => onSectionChange(section)}
            className="relative px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] transition-all duration-200 overflow-hidden"
            style={{
              backgroundColor: isActive ? 'rgba(250, 204, 20, 0.1)' : 'rgba(0, 0, 0, 0.4)',
              border: `1px solid ${isActive ? 'rgba(250, 204, 20, 0.6)' : 'rgba(250, 204, 20, 0.2)'}`,
              clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))',
              color: isActive ? '#FACC14' : 'rgba(255, 255, 255, 0.5)',
              boxShadow: isActive 
                ? '0 0 15px rgba(250, 204, 20, 0.3), inset 0 0 10px rgba(250, 204, 20, 0.15)' 
                : 'none',
              textShadow: isActive ? '0 0 8px rgba(250, 204, 20, 0.8)' : 'none'
            }}
          >
            {isActive && (
              <div 
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(250, 204, 20, 0.6), transparent)',
                  animation: 'advanced-scan-horizontal 3s ease-in-out infinite'
                }}
              />
            )}
            {isActive && (
              <>
                <div 
                  className="absolute top-0 right-0 w-1 h-1 bg-[#FACC14]"
                  style={{
                    clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                    animation: 'advanced-corner-pulse 1.5s ease-in-out infinite'
                  }}
                />
                <div 
                  className="absolute bottom-0 left-0 w-1 h-1 bg-[#FACC14]"
                  style={{
                    clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
                    animation: 'advanced-corner-pulse 1.5s ease-in-out infinite',
                    animationDelay: '0.75s'
                  }}
                />
              </>
            )}
            <span className="relative z-10 hover:text-white/80 transition-colors duration-200">
              {section}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StatusIndicator() {
  return (
    <div 
      className="relative px-4 py-2 overflow-hidden"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(91, 189, 150, 0.3)',
        clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
        boxShadow: '0 0 12px rgba(91, 189, 150, 0.15), inset 0 0 6px rgba(91, 189, 150, 0.1)'
      }}
    >
      <div 
        className="absolute top-0 right-0 w-1 h-1 bg-[#5BBD96]"
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          animation: 'advanced-corner-pulse 1.5s ease-in-out infinite',
          animationDelay: '0.5s'
        }}
      />
      <div className="flex items-center gap-2 relative z-10">
        <span className="text-white/40 text-[8px] font-mono uppercase tracking-[0.15em]">Status:</span>
        <span className="text-[#5BBD96] text-[10px] font-mono uppercase tracking-wider"
              style={{ textShadow: '0 0 8px rgba(91, 189, 150, 0.6)' }}>
          Online
        </span>
        <div className="flex gap-0.5 items-end ml-1">
          {[3, 4, 5, 4].map((height, i) => (
            <div 
              key={i}
              className="w-1 bg-[#5BBD96]"
              style={{ 
                height: `${height * 2}px`,
                opacity: 0.4 + (i * 0.15),
                boxShadow: '0 0 4px rgba(91, 189, 150, 0.4)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header({ activeSection, onSectionChange }: HeaderProps) {
  const responsive = useResponsive();
  const [displaySection, setDisplaySection] = useState(activeSection);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      setShouldAnimate(true);
      return;
    }
    
    if (activeSection !== displaySection && !isInitialLoad) {
      setDisplaySection(activeSection);
      setShouldAnimate(true);
    }
  }, [activeSection, displaySection, isInitialLoad]);

  const handleScrambleComplete = () => {
    setShouldAnimate(false);
  };

  const headerPadding = responsive.spacing.md;
  const headerMarginX = responsive.spacing.lg;
  const headerMarginTop = responsive.spacing.md;
  
  return (
    <div style={{ marginLeft: headerMarginX, marginRight: headerMarginX, marginTop: headerMarginTop, position: 'relative' }}>
      <div 
        className="relative overflow-hidden"
        style={{
          paddingLeft: headerPadding,
          paddingRight: headerPadding,
          paddingTop: `${responsive.spacing.sm}px`,
          paddingBottom: `${responsive.spacing.sm}px`,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(250, 204, 20, 0.4)',
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          boxShadow: '0 0 20px rgba(250, 204, 20, 0.2), inset 0 0 10px rgba(250, 204, 20, 0.1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div 
          className="absolute top-0 right-0 w-2 h-2 bg-[#FACC14]"
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
            animation: 'advanced-corner-pulse 2s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-2 h-2 bg-[#FACC14]"
          style={{
            clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
            animation: 'advanced-corner-pulse 2s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />
        
        <div className="relative h-full flex items-center justify-center z-10">
          {/* Section Title - Left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <span 
              className="text-[#FACC14] text-[32px] font-mono uppercase tracking-[0.2em]"
              style={{ 
                textShadow: '0 0 15px rgba(250, 204, 20, 0.8)',
                fontWeight: 900
              }}
            >
              <ScrambledText 
                text={displaySection}
                isActive={shouldAnimate}
                scrambleDuration={800}
                revealDelay={0}
                onComplete={handleScrambleComplete}
              />
            </span>
          </div>
          
          {/* Navigation - Center */}
          <div>
            <Navigation activeSection={activeSection} onSectionChange={onSectionChange} />
          </div>
          
          {/* Status - Right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <StatusIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}