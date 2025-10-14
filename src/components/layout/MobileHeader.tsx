import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ScrambledText } from '../ScrambledText';
import { navigationSections } from '../../content/website-content';

interface MobileHeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onAnimationComplete?: (complete: boolean) => void;
}

export function MobileHeader({ activeSection, onSectionChange, onAnimationComplete }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displaySection, setDisplaySection] = useState(activeSection);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);


  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      setShouldAnimate(true);
      onAnimationComplete?.(false);
      return;
    }
    
    if (activeSection !== displaySection && !isInitialLoad) {
      setDisplaySection(activeSection);
      setShouldAnimate(true);
      onAnimationComplete?.(false);
    }
  }, [activeSection, displaySection, isInitialLoad, onAnimationComplete]);

  const handleScrambleComplete = () => {
    setShouldAnimate(false);
    onAnimationComplete?.(true);
  };

  const handleSectionClick = (section: string) => {
    onSectionChange(section);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="mx-3 mt-2 relative">
        <div 
          className="relative px-3 py-2 overflow-hidden"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            border: '1px solid rgba(250, 204, 20, 0.4)',
            clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
            boxShadow: '0 0 20px rgba(250, 204, 20, 0.2), inset 0 0 10px rgba(250, 204, 20, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Corner accents */}
          <div 
            className="absolute top-0 right-0 w-1 h-1 bg-[#FACC14]"
            style={{
              clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
              animation: 'advanced-corner-pulse 2s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-1 h-1 bg-[#FACC14]"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
              animation: 'advanced-corner-pulse 2s ease-in-out infinite',
              animationDelay: '1s'
            }}
          />

          <div className="relative flex items-center justify-between z-10">
            {/* Section Title with Decrypt Animation */}
            <div 
              className="text-[#FACC14] font-mono uppercase tracking-[0.15em]"
              style={{ 
                textShadow: '0 0 12px rgba(250, 204, 20, 0.8)',
                fontWeight: 900,
                fontSize: 'clamp(14px, 4.5vw, 20px)'
              }}
            >
              <ScrambledText 
                text={displaySection}
                isActive={shouldAnimate}
                scrambleDuration={1200}
                onComplete={handleScrambleComplete}
              />
            </div>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-1.5 transition-all duration-200"
              style={{
                backgroundColor: 'rgba(250, 204, 20, 0.1)',
                border: '1px solid rgba(250, 204, 20, 0.4)',
                clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))',
                boxShadow: isMenuOpen 
                  ? '0 0 15px rgba(250, 204, 20, 0.4), inset 0 0 10px rgba(250, 204, 20, 0.2)' 
                  : '0 0 10px rgba(250, 204, 20, 0.2)'
              }}
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-[#FACC14]" style={{ filter: 'drop-shadow(0 0 4px rgba(250, 204, 20, 0.8))' }} />
              ) : (
                <Menu className="w-4 h-4 text-[#FACC14]" style={{ filter: 'drop-shadow(0 0 4px rgba(250, 204, 20, 0.8))' }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            animation: 'hud-reveal 0.3s ease-out'
          }}
        >
          <div className="w-full max-w-md px-6">
            <div 
              className="relative p-6 overflow-hidden"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                border: '2px solid rgba(250, 204, 20, 0.5)',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                boxShadow: '0 0 40px rgba(250, 204, 20, 0.3), inset 0 0 20px rgba(250, 204, 20, 0.1)'
              }}
            >
              {/* Corner decorations */}
              <div 
                className="absolute top-0 right-0 w-3 h-3 bg-[#FACC14]"
                style={{
                  clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                  animation: 'advanced-corner-pulse 2s ease-in-out infinite'
                }}
              />
              <div 
                className="absolute bottom-0 left-0 w-3 h-3 bg-[#FACC14]"
                style={{
                  clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
                  animation: 'advanced-corner-pulse 2s ease-in-out infinite',
                  animationDelay: '1s'
                }}
              />

              {/* Menu title */}
              <div className="mb-6 text-center">
                <span 
                  className="text-[#FACC14] font-mono uppercase tracking-[0.2em]"
                  style={{
                    textShadow: '0 0 15px rgba(250, 204, 20, 0.8)',
                    fontWeight: 900,
                    fontSize: 'clamp(18px, 5vw, 24px)'
                  }}
                >
                  Navigation
                </span>
              </div>

              {/* Navigation buttons */}
              <div className="space-y-3">
                {navigationSections.map((section, index) => {
                  const isActive = activeSection === section;
                  return (
                    <button
                      key={section}
                      onClick={() => handleSectionClick(section)}
                      className="relative w-full px-4 py-3 font-mono uppercase tracking-[0.15em] transition-all duration-200 overflow-hidden"
                      style={{
                        backgroundColor: isActive ? 'rgba(250, 204, 20, 0.15)' : 'rgba(0, 0, 0, 0.5)',
                        border: `1px solid ${isActive ? 'rgba(250, 204, 20, 0.6)' : 'rgba(250, 204, 20, 0.3)'}`,
                        clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                        color: isActive ? '#FACC14' : 'rgba(255, 255, 255, 0.7)',
                        boxShadow: isActive 
                          ? '0 0 20px rgba(250, 204, 20, 0.4), inset 0 0 15px rgba(250, 204, 20, 0.2)' 
                          : '0 0 10px rgba(250, 204, 20, 0.1)',
                        textShadow: isActive ? '0 0 10px rgba(250, 204, 20, 0.8)' : 'none',
                        fontSize: 'clamp(14px, 4vw, 18px)',
                        animation: `hud-reveal 0.4s ease-out ${index * 0.05}s backwards`
                      }}
                    >
                      {isActive && (
                        <>
                          <div 
                            className="absolute inset-0 opacity-30 pointer-events-none"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(250, 204, 20, 0.6), transparent)',
                              animation: 'advanced-scan-horizontal 3s ease-in-out infinite'
                            }}
                          />
                          <div 
                            className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#FACC14]"
                            style={{
                              clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                              animation: 'advanced-corner-pulse 1.5s ease-in-out infinite'
                            }}
                          />
                          <div 
                            className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#FACC14]"
                            style={{
                              clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
                              animation: 'advanced-corner-pulse 1.5s ease-in-out infinite',
                              animationDelay: '0.75s'
                            }}
                          />
                        </>
                      )}
                      <span className="relative z-10">{section}</span>
                    </button>
                  );
                })}
              </div>

              {/* Close button at bottom */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="mt-6 w-full px-4 py-2 font-mono uppercase tracking-[0.15em] transition-all duration-200"
                style={{
                  backgroundColor: 'rgba(250, 204, 20, 0.1)',
                  border: '1px solid rgba(250, 204, 20, 0.4)',
                  clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: 'clamp(12px, 3.5vw, 14px)'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
