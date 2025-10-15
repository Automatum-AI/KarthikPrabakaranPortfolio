import React, { createContext, useContext, useEffect, useState } from 'react';

interface ResponsiveValues {
  // Screen info
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isReady: boolean;
  
  // Font sizes (in px)
  fontSize: {
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  
  // Spacing (in px)
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
  
  // Layout
  layout: {
    headerHeight: number;
    footerHeight: number;
    columnGap: number;
    sectionPadding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    columnWidths: {
      left: string;
      middle: string;
      right: string;
    };
  };
  
  // HUD specific
  hud: {
    titleHeight: number;
    titlePadding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    cornerSize: number;
    contentPadding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
}

const ResponsiveContext = createContext<ResponsiveValues | null>(null);

export function useResponsive(): ResponsiveValues {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within ResponsiveProvider');
  }
  return context;
}

function calculateResponsiveValues(width: number, height: number): ResponsiveValues {
  // Determine device type
  const isMobile = width < 1024;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  
  // Calculate base font size
  let baseFontSize = 16;
  if (width <= 640) baseFontSize = 12;
  else if (width <= 768) baseFontSize = 13;
  else if (width <= 1024) baseFontSize = 14;
  else if (width <= 1200) baseFontSize = 14;
  else if (width <= 1400) baseFontSize = 15;
  
  // Calculate font sizes based on base
  const fontSize = {
    base: baseFontSize * 1,
    lg: baseFontSize * 1.125,
    xl: baseFontSize * 1.25,
    '2xl': baseFontSize * 1.5,
    '3xl': baseFontSize * 1.875,
    '4xl': baseFontSize * 2.25,
  };
  
  // Calculate spacing
  const baseSpacing = baseFontSize * 0.25; // 4px at 16px base
  const spacing = {
    xs: baseSpacing * 1,   // 4px
    sm: baseSpacing * 2,   // 8px
    md: baseSpacing * 4,   // 16px
    lg: baseSpacing * 6,   // 24px
    xl: baseSpacing * 8,   // 32px
    '2xl': baseSpacing * 12, // 48px
  };
  
  // Calculate layout values
  let headerHeight = 90;
  let footerHeight = 35;
  let columnGap = 24;
  let sectionPadding = { top: 30, right: 40, bottom: 30, left: 40 };
  let columnWidths = { left: 'minmax(0, 1fr)', middle: 'minmax(0, 2fr)', right: 'minmax(0, 1fr)' };
  
  if (width <= 640) {
    headerHeight = 48;
    footerHeight = 18;
    columnGap = 16;
    sectionPadding = { top: 15, right: 15, bottom: 15, left: 15 };
    columnWidths = { left: '1fr', middle: '1fr', right: '1fr' };
  } else if (width <= 768) {
    headerHeight = 50;
    footerHeight = 22;
    columnGap = 20;
    sectionPadding = { top: 15, right: 20, bottom: 15, left: 20 };
    columnWidths = { left: '1fr', middle: '1fr', right: '1fr' };
  } else if (width <= 1024) {
    headerHeight = 55;
    footerHeight = 25;
    columnGap = 24;
    sectionPadding = { top: 20, right: 30, bottom: 20, left: 30 };
    columnWidths = { left: '1fr', middle: '1fr', right: '1fr' };
  } else if (width <= 1200) {
    headerHeight = 70;
    footerHeight = 28;
    columnGap = 24;
    sectionPadding = { top: 20, right: 20, bottom: 20, left: 20 };
    columnWidths = { left: 'minmax(300px, 1fr)', middle: 'minmax(0, 2fr)', right: 'minmax(0, 1fr)' };
  } else if (width <= 1400) {
    headerHeight = 80;
    footerHeight = 32;
    columnGap = 24;
    sectionPadding = { top: 20, right: 30, bottom: 20, left: 30 };
    columnWidths = { left: 'minmax(320px, 1fr)', middle: 'minmax(0, 2fr)', right: 'minmax(0, 1fr)' };
  } else if (width <= 1600) {
    headerHeight = 85;
    footerHeight = 75;
    columnGap = 20;
    sectionPadding = { top: 25, right: 30, bottom: 25, left: 30 };
    columnWidths = { left: 'minmax(0, 1fr)', middle: 'minmax(0, 2fr)', right: 'minmax(0, 1fr)' };
  }
  
  // Calculate HUD values
  let hudTitleHeight = 32;
  let hudCornerSize = 16;
  let hudTitlePadding = { top: 6, right: 28, bottom: 6, left: 16 };
  let hudContentPadding = { top: 12, right: 16, bottom: 16, left: 16 };
  
  if (width <= 640) {
    hudTitleHeight = 26;
    hudCornerSize = 12;
    hudTitlePadding = { top: 6, right: 24, bottom: 6, left: 12 };
    hudContentPadding = { top: 8, right: 8, bottom: 8, left: 8 };
  } else if (width <= 768) {
    hudTitleHeight = 28;
    hudCornerSize = 14;
    hudTitlePadding = { top: 6, right: 26, bottom: 6, left: 14 };
    hudContentPadding = { top: 10, right: 12, bottom: 12, left: 12 };
  } else if (width <= 1024) {
    hudTitleHeight = 30;
    hudCornerSize = 15;
    hudTitlePadding = { top: 6, right: 27, bottom: 6, left: 15 };
    hudContentPadding = { top: 11, right: 14, bottom: 14, left: 14 };
  } else if (width <= 1400) {
    hudTitleHeight = 34;
    hudCornerSize = 17;
    hudTitlePadding = { top: 6, right: 30, bottom: 6, left: 16 };
    hudContentPadding = { top: 13, right: 18, bottom: 18, left: 18 };
  }
  
  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isReady: true,
    fontSize,
    spacing,
    layout: {
      headerHeight,
      footerHeight,
      columnGap,
      sectionPadding,
      columnWidths,
    },
    hud: {
      titleHeight: hudTitleHeight,
      titlePadding: hudTitlePadding,
      cornerSize: hudCornerSize,
      contentPadding: hudContentPadding,
    },
  };
}

export function ResponsiveProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [values, setValues] = useState<ResponsiveValues>(() => {
    // Initial value with isReady: false
    if (typeof window !== 'undefined') {
      return { ...calculateResponsiveValues(window.innerWidth, window.innerHeight), isReady: false };
    }
    // Fallback for SSR
    return { ...calculateResponsiveValues(1920, 1080), isReady: false };
  });
  
  useEffect(() => {
    const handleResize = () => {
      setValues({ ...calculateResponsiveValues(window.innerWidth, window.innerHeight), isReady: true });
    };
    
    // Set initial value and mark as ready
    handleResize();
    setIsReady(true);
    
    // Listen for resize
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <ResponsiveContext.Provider value={values}>
      {children}
    </ResponsiveContext.Provider>
  );
}
