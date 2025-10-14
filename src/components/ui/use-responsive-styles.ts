import { useResponsive } from './responsive-context';

export function useResponsiveStyles() {
  const responsive = useResponsive();
  
  return {
    // Font sizes
    fontSize: {
      xs: { fontSize: `${responsive.fontSize.base * 0.75}px` },
      sm: { fontSize: `${responsive.fontSize.base * 0.875}px` },
      base: { fontSize: `${responsive.fontSize.base}px` },
      lg: { fontSize: `${responsive.fontSize.lg}px` },
      xl: { fontSize: `${responsive.fontSize.xl}px` },
      '2xl': { fontSize: `${responsive.fontSize['2xl']}px` },
      '3xl': { fontSize: `${responsive.fontSize['3xl']}px` },
      '4xl': { fontSize: `${responsive.fontSize['4xl']}px` },
    },
    
    // Spacing
    spacing: {
      xs: `${responsive.spacing.xs}px`,
      sm: `${responsive.spacing.sm}px`,
      md: `${responsive.spacing.md}px`,
      lg: `${responsive.spacing.lg}px`,
      xl: `${responsive.spacing.xl}px`,
      '2xl': `${responsive.spacing['2xl']}px`,
    },
    
    // Layout
    layout: {
      headerHeight: `${responsive.layout.headerHeight}px`,
      footerHeight: `${responsive.layout.footerHeight}px`,
      columnGap: `${responsive.layout.columnGap}px`,
      sectionPadding: {
        paddingTop: `${responsive.layout.sectionPadding.top}px`,
        paddingRight: `${responsive.layout.sectionPadding.right}px`,
        paddingBottom: `${responsive.layout.sectionPadding.bottom}px`,
        paddingLeft: `${responsive.layout.sectionPadding.left}px`,
      },
    },
    
    // Responsive values
    responsive,
  };
}
