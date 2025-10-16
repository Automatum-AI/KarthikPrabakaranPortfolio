import React, { useState, useEffect } from 'react';
import DriftingStarfield from '../DriftingStarfield';
import { useResponsive } from '../ui/responsive-context';
import { Header } from './Header';
import { Footer } from './Footer';
import { HomeSection } from '../sections/HomeSection';
import AboutSection from '../sections/AboutSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ContactSection } from '../sections/ContactSection';

export function DesktopApp() {
  const responsive = useResponsive();
  const [currentSection, setCurrentSection] = useState('Home');
  const [prevSection, setPrevSection] = useState('Home');
  
  // Ensure we start at the top on mount
  useEffect(() => {
    const bodyElement = document.querySelector('.app-body');
    if (bodyElement) {
      bodyElement.scrollTop = 0;
    }
  }, []);
  
  const scrollToSection = (sectionName: string) => {
    const element = document.getElementById(sectionName.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  // Track active sections for reveal animations
  useEffect(() => {
    const bodyElement = document.querySelector('.app-body');
    if (!bodyElement) return;

    const options = {
      root: bodyElement,
      rootMargin: '-35% 0px -35% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      // Process all observed sections to find the most visible one
      const sections = document.querySelectorAll('.app-section');
      let mostVisibleSection: Element | null = null;
      let maxRatio = 0;

      sections.forEach((section) => {
        const entry = entries.find(e => e.target === section);
        if (entry && entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleSection = section;
        }
      });

      if (mostVisibleSection) {
        const id = (mostVisibleSection as HTMLElement).id;
        const name = id.charAt(0).toUpperCase() + id.slice(1);
        
        // Only update if different from current
        setCurrentSection(prev => {
          if (prev !== name) {
            setPrevSection(prev);
            
            // Dispatch event for SpaceBackground
            window.dispatchEvent(new CustomEvent('section-change', { 
              detail: { section: name.toLowerCase() } 
            }));
            
            return name;
          }
          return prev;
        });
      }
    };

    const observer = new IntersectionObserver(callback, options);
    const sections = document.querySelectorAll('.app-section');
    
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      <DriftingStarfield />
      
      <div 
        className="app-header" 
        style={{ height: `${responsive.layout.headerHeight}px` }}
      >
        <Header 
          activeSection={currentSection} 
          onSectionChange={scrollToSection}
        />
      </div>
      
      <div className="app-body">
        <div id="home" className="app-section">
          <HomeSection isActive={currentSection === 'Home'} />
        </div>
        
        <div id="about" className="app-section">
          <AboutSection isActive={currentSection === 'About'} />
        </div>
        
        <div id="skills" className="app-section">
          <SkillsSection isActive={currentSection === 'Skills'} />
        </div>
        
        <div id="projects" className="app-section">
          <ProjectsSection isActive={currentSection === 'Projects'} />
        </div>
        
        <div id="experience" className="app-section">
          <ExperienceSection isActive={currentSection === 'Experience'} />
        </div>
        
        <div id="contact" className="app-section">
          <ContactSection isActive={currentSection === 'Contact'} />
        </div>
      </div>
      
      <div 
        className="app-footer"
        style={{ height: `${responsive.layout.footerHeight}px` }}
      >
        <Footer />
      </div>
    </div>
  );
}
