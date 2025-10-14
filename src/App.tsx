import React from 'react';
import { ResponsiveProvider, useResponsive } from './components/ui/responsive-context';
import { DesktopApp } from './components/layout/DesktopApp';
import { MobileApp } from './components/layout/MobileApp';
import { SpiralGalaxyBackground } from './components/SpiralGalaxyBackground';

function AppContent() {
  const { isMobile, isReady } = useResponsive();

  return (
    <>
      {/* Loading screen - shown before anything else */}
      {!isReady && (
        <div className="fixed inset-0 bg-black z-50" />
      )}
      
      {/* Show mobile version for screens below 1024px (tablets and phones) */}
      {isReady && (isMobile ? <MobileApp /> : <DesktopApp />)}
    </>
  );
}

// Separate component for Galaxy that's mounted outside everything else
class GalaxyRoot extends React.Component<{}, { scrollProgress: number; currentSection: string }> {
  private bodyElement: Element | null = null;
  private timeoutId: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      scrollProgress: 0,
      currentSection: 'home'
    };
  }

  componentDidMount() {
    this.setupScrollListener();
  }

  componentWillUnmount() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.bodyElement && this.handleScroll) {
      this.bodyElement.removeEventListener('scroll', this.handleScroll);
    }
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  handleScroll = () => {
    if (!this.bodyElement) return;
    const scrollTop = this.bodyElement.scrollTop;
    const scrollHeight = this.bodyElement.scrollHeight - this.bodyElement.clientHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    
    // Calculate section-based zoom progress for equal zoom per section
    const totalSections = 6;
    const sectionProgress = progress * totalSections;
    const currentSectionIndex = Math.floor(sectionProgress);
    const progressWithinSection = sectionProgress - currentSectionIndex;
    
    // Map section index to section name
    const sectionNames = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const currentSection = sectionNames[Math.min(currentSectionIndex, totalSections - 1)] || 'home';
    
    // Calculate zoom progress: each section contributes equally to the zoom
    // Home = 0% zoom, About = 16.67%, Skills = 33.33%, etc.
    const baseZoomProgress = currentSectionIndex / totalSections;
    const additionalZoomProgress = progressWithinSection / totalSections;
    const zoomProgress = Math.min(baseZoomProgress + additionalZoomProgress, 1);
    
    this.setState({ 
      scrollProgress: zoomProgress, 
      currentSection 
    });
  };

  setupScrollListener = () => {
    this.bodyElement = document.querySelector('.app-body');
    
    if (!this.bodyElement) {
      this.timeoutId = setTimeout(this.setupScrollListener, 100);
      return;
    }


    
    this.bodyElement.addEventListener('scroll', this.handleScroll);
    
    // Also listen to window scroll as backup
    window.addEventListener('scroll', this.handleWindowScroll);
    
    this.handleScroll();
  };

  handleWindowScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    
    // Calculate section-based zoom progress for equal zoom per section
    const totalSections = 6;
    const sectionProgress = progress * totalSections;
    const currentSectionIndex = Math.floor(sectionProgress);
    const progressWithinSection = sectionProgress - currentSectionIndex;
    
    // Map section index to section name
    const sectionNames = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const currentSection = sectionNames[Math.min(currentSectionIndex, totalSections - 1)] || 'home';
    
    // Calculate zoom progress: each section contributes equally to the zoom
    const baseZoomProgress = currentSectionIndex / totalSections;
    const additionalZoomProgress = progressWithinSection / totalSections;
    const zoomProgress = Math.min(baseZoomProgress + additionalZoomProgress, 1);
    
    this.setState({ 
      scrollProgress: zoomProgress, 
      currentSection 
    });
  };

  shouldComponentUpdate(nextProps: {}, nextState: { scrollProgress: number; currentSection: string }) {
    // Only update if scrollProgress or section changes significantly
    return (
      Math.abs(this.state.scrollProgress - nextState.scrollProgress) > 0.001 ||
      this.state.currentSection !== nextState.currentSection
    );
  }

  render() {
    return (
      <SpiralGalaxyBackground 
        scrollProgress={this.state.scrollProgress} 
        currentSection={this.state.currentSection}
      />
    );
  }
}

export default function App() {
  return (
    <>
      {/* Galaxy is mounted once as a class component - maximum stability */}
      <GalaxyRoot />
      
      <ResponsiveProvider>
        <AppContent />
      </ResponsiveProvider>
    </>
  );
}
