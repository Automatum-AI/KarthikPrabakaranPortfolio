import React from 'react';
import { SectionLayout } from '../SectionLayout';
import { useResponsive } from '../ui/responsive-context';

interface HomeSectionProps {
  isActive: boolean;
}

export function HomeSection({ isActive }: HomeSectionProps) {
  const responsive = useResponsive();
  
  // Calculate responsive font size for the hero text
  let heroFontSize = 82;
  if (responsive.width <= 1200) {
    heroFontSize = 52;
  } else if (responsive.width <= 1400) {
    heroFontSize = 62;
  } else if (responsive.width <= 1600) {
    heroFontSize = 72;
  }
  
  // Calculate responsive padding
  const horizontalPadding = responsive.layout.sectionPadding.left;
  
  return (
    <SectionLayout isActive={isActive} sectionId="home">
      <div className="h-full w-full flex items-center justify-center">
        <div 
          className="flex flex-col items-center justify-center text-center"
          style={{ padding: `0 ${horizontalPadding}px` }}
        >
          <div 
            className="font-bold text-[#facc14] uppercase"
            style={{ 
              textShadow: '0 0 15px rgba(250, 204, 20, 0.8)',
              fontSize: `${heroFontSize}px`,
              lineHeight: 'normal'
            }}
          >
            <p className="whitespace-nowrap">BEYOND EARTH. BEYOND DESIGN.</p>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}