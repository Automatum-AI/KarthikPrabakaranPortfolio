import React, { useEffect, useRef } from 'react';
import { useResponsive } from './ui/responsive-context';

interface SectionLayoutProps {
  children: React.ReactNode;
  isActive: boolean;
  sectionId?: string;
}

/**
 * Centralized 3-column layout for all sections
 * Left: 25%, Middle: 50%, Right: 25%
 * Responsive on smaller screens
 */
export function SectionLayout({ children, isActive, sectionId }: SectionLayoutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef(isActive);

  useEffect(() => {
    // When transitioning from inactive to active, force animation restart
    if (isActive && !previousActiveRef.current && sectionRef.current) {
      // Force a reflow to restart CSS animations
      const elements = sectionRef.current.querySelectorAll('[class*="hud-stagger"]');
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        // Remove and re-add the animation by forcing a reflow
        htmlEl.style.animation = 'none';
        void htmlEl.offsetHeight; // Trigger reflow
        htmlEl.style.animation = '';
      });
    }
    previousActiveRef.current = isActive;
  }, [isActive]);

  return (
    <div 
      ref={sectionRef}
      className="section-wrapper"
      data-section={sectionId}
      data-active={isActive}
    >
      {children}
    </div>
  );
}

interface ThreeColumnLayoutProps {
  left?: React.ReactNode;
  middle: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

/**
 * Three-column grid layout component
 * Left and Right columns: 25% each
 * Middle column: 50%
 * Uses responsive context for dynamic spacing
 */
export function ThreeColumnLayout({ left, middle, right, className = '' }: ThreeColumnLayoutProps) {
  const responsive = useResponsive();
  
  if (!middle) {
    console.error('ThreeColumnLayout: middle prop is required');
    return null;
  }

  // Calculate grid columns based on responsive context
  let gridColumns = `${responsive.layout.columnWidths.left} ${responsive.layout.columnWidths.middle} ${responsive.layout.columnWidths.right}`;
  if (responsive.isMobile) {
    gridColumns = '1fr';
  }
  
  const layoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: gridColumns,
    gap: `${responsive.layout.columnGap}px`,
    height: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    alignItems: 'start',
    paddingTop: `${responsive.layout.sectionPadding.top}px`,
    paddingRight: `${responsive.layout.sectionPadding.right}px`,
    paddingBottom: `${responsive.layout.sectionPadding.bottom}px`,
    paddingLeft: `${responsive.layout.sectionPadding.left}px`,
    overflow: 'hidden',
  };
  
  const columnStyle: React.CSSProperties = {
    display: responsive.isMobile && (left || right) ? 'none' : 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    gap: `${responsive.layout.columnGap}px`,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 0,
    minWidth: 0,
    maxWidth: '100%',
    width: '100%',
    boxSizing: 'border-box',
  };

  // Style for all column children to ensure they respect width
  const childWrapperStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    height: '100%',
    boxSizing: 'border-box',
  };

  return (
    <div style={layoutStyle} className={className}>
      {left && (
        <div style={columnStyle}>
          <div style={childWrapperStyle}>
            {left}
          </div>
        </div>
      )}
      <div style={{ ...columnStyle, display: 'flex' }}>
        <div style={childWrapperStyle}>
          {middle}
        </div>
      </div>
      {right && (
        <div style={columnStyle}>
          <div style={childWrapperStyle}>
            {right}
          </div>
        </div>
      )}
    </div>
  );
}