import React, { useState, useEffect } from 'react';
import DriftingStarfield from '../DriftingStarfield';
// import BlackHoleBackground from '../BlackHoleBackground';
import { useResponsive } from '../ui/responsive-context';
import { MobileHeader } from './MobileHeader';
import { MobileFooter } from './MobileFooter';
import { MobileHomeSection } from '../sections/mobile/MobileHomeSection';
import { MobileAboutSection } from '../sections/mobile/MobileAboutSection';
import { MobileSkillsSection } from '../sections/mobile/MobileSkillsSection';
import { MobileProjectsSection } from '../sections/mobile/MobileProjectsSection';
import { MobileExperienceSection } from '../sections/mobile/MobileExperienceSection';
import { MobileContactSection } from '../sections/mobile/MobileContactSection';

export function MobileApp() {
  const responsive = useResponsive();
  const [currentSection, setCurrentSection] = useState('Home');
  const [activeSections, setActiveSections] = useState<Set<string>>(new Set(['Home']));
  const [contentVisible, setContentVisible] = useState(true); // Start as true for initial load
  const [prevSection, setPrevSection] = useState('Home');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const scrollToSection = (sectionName: string) => {
    const element = document.getElementById(sectionName.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  // Handle animation complete from header
  const handleAnimationComplete = (complete: boolean) => {
    setContentVisible(complete);
    if (!isInitialized && complete) {
      setIsInitialized(true);
    }
  };

  // Track active sections for reveal animations
  useEffect(() => {
    const options = {
      root: document.querySelector('.app-body'),
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0.1
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const name = id.charAt(0).toUpperCase() + id.slice(1);
          
          // Only hide content and trigger animation if section actually changed
          if (name !== prevSection) {
            setPrevSection(name);
            setContentVisible(false);
          }
          
          // Update current section (this triggers header decrypt)
          setCurrentSection(name);
          
          // Dispatch event for SpaceBackground
          window.dispatchEvent(new CustomEvent('section-change', { 
            detail: { section: name.toLowerCase() } 
          }));
          
          // Add to active sections set
          setActiveSections(prev => {
            const newSet = new Set(prev);
            newSet.add(name);
            return newSet;
          });
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const sections = document.querySelectorAll('.app-section');
    
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [prevSection]);

  return (
    <div className="app-container">
      <DriftingStarfield />
  {/* BlackHoleBackground removed for mobile version */}
      <div 
        className="app-header"
        style={{
          height: `${responsive.layout.headerHeight}px`,
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 70%, rgba(0, 0, 0, 0.3) 100%)'
        }}
      >
        <MobileHeader 
          activeSection={currentSection} 
          onSectionChange={scrollToSection}
          onAnimationComplete={handleAnimationComplete}
        />
      </div>
      <div className="app-body">
        <div id="home" className="app-section">
          <MobileHomeSection isActive={activeSections.has('Home') && contentVisible} />
        </div>
        <div id="about" className="app-section">
          <MobileAboutSection isActive={activeSections.has('About') && contentVisible} />
        </div>
        <div id="skills" className="app-section">
          <MobileSkillsSection isActive={activeSections.has('Skills') && contentVisible} />
        </div>
        <div id="projects" className="app-section">
          <MobileProjectsSection isActive={activeSections.has('Projects') && contentVisible} />
        </div>
        <div id="experience" className="app-section">
          <MobileExperienceSection isActive={activeSections.has('Experience') && contentVisible} />
        </div>
        <div id="contact" className="app-section">
          <MobileContactSection isActive={activeSections.has('Contact') && contentVisible} />
        </div>
      </div>
      <div 
        className="app-footer"
        style={{
          height: `${responsive.layout.footerHeight}px`,
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 70%, rgba(0, 0, 0, 0.3) 100%)'
        }}
      >
        <MobileFooter />
      </div>
    </div>
  );
}
