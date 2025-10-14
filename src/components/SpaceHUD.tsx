import React from "react";
import { useResponsive } from "./ui/responsive-context";

interface SpaceHUDProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "warning" | "danger" | "success";
  size?: "small" | "medium" | "large";
  animated?: boolean;
  glow?: boolean;
}

export function SpaceHUD({
  children,
  title,
  className = "",
  variant = "primary",
  size = "medium",
  animated = true,
  glow = true,
}: SpaceHUDProps) {
  const responsive = useResponsive();
  
  // Enhanced color system with better visual appeal
  const variants = {
    primary: {
      border: "#FACC14",
      accent: "#20DBE9",
      background: "rgba(250, 204, 20, 0.05)",
      titleBg: "#FACC14",
      titleText: "text-black",
      glowColor: "#FACC14",
    },
    secondary: {
      border: "#5BBD96",
      accent: "#20DBE9",
      background: "rgba(91, 189, 150, 0.05)",
      titleBg: "#5BBD96",
      titleText: "text-black",
      glowColor: "#5BBD96",
    },
    accent: {
      border: "#20DBE9",
      accent: "#FACC14",
      background: "rgba(32, 219, 233, 0.05)",
      titleBg: "#20DBE9",
      titleText: "text-black",
      glowColor: "#20DBE9",
    },
    warning: {
      border: "#F59E0B",
      accent: "#EF4444",
      background: "rgba(245, 158, 11, 0.05)",
      titleBg: "#F59E0B",
      titleText: "text-black",
      glowColor: "#F59E0B",
    },
    danger: {
      border: "#EF4444",
      accent: "#F59E0B",
      background: "rgba(239, 68, 68, 0.05)",
      titleBg: "#EF4444",
      titleText: "text-white",
      glowColor: "#EF4444",
    },
    success: {
      border: "#10B981",
      accent: "#20DBE9",
      background: "rgba(16, 185, 129, 0.05)",
      titleBg: "#10B981",
      titleText: "text-black",
      glowColor: "#10B981",
    },
  };

  // Get responsive HUD values from context
  const hudValues = responsive.hud;
  
  // Size multipliers
  const sizeMultipliers = {
    small: 0.8,
    medium: 1,
    large: 1.2,
  };
  
  const multiplier = sizeMultipliers[size];
  
  // Calculate responsive sizes
  const titleHeight = Math.round(hudValues.titleHeight * multiplier);
  const cornerSize = Math.round(hudValues.cornerSize * multiplier);
  const titlePadding = {
    top: Math.round(hudValues.titlePadding.top * multiplier),
    right: Math.round(hudValues.titlePadding.right * multiplier),
    bottom: Math.round(hudValues.titlePadding.bottom * multiplier),
    left: Math.round(hudValues.titlePadding.left * multiplier),
  };
  const contentPadding = {
    top: Math.round(hudValues.contentPadding.top * multiplier),
    right: Math.round(hudValues.contentPadding.right * multiplier),
    bottom: Math.round(hudValues.contentPadding.bottom * multiplier),
    left: Math.round(hudValues.contentPadding.left * multiplier),
  };
  
  // Calculate font size for title
  const titleFontSize = responsive.fontSize.base * (size === 'small' ? 0.875 : size === 'large' ? 1.125 : 1);

  const currentVariant = variants[variant];

  return (
    <div className={`relative w-full h-full max-w-full ${className}`} style={{ minWidth: 0, boxSizing: 'border-box' }}>
      {/* Background Glow Layer - sits behind the clipped element */}
      {glow && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: currentVariant.background,
            clipPath: `polygon(
              0 0,
              calc(100% - ${cornerSize}px) 0,
              100% ${cornerSize}px,
              100% 100%,
              ${cornerSize}px 100%,
              0 calc(100% - ${cornerSize}px)
            )`,
            boxShadow: `0 0 40px ${currentVariant.glowColor}, 0 0 80px ${currentVariant.glowColor}CC, 0 0 120px ${currentVariant.glowColor}99, 0 0 160px ${currentVariant.glowColor}66`,
            filter: 'blur(8px)',
          }}
        />
      )}
      
      {/* Main container with clean border design */}
      <div
        className="relative w-full h-full border-2 backdrop-blur-sm flex flex-col overflow-hidden"
        style={{
          borderColor: currentVariant.border,
          background: currentVariant.background,
          clipPath: `polygon(
            0 0,
            calc(100% - ${cornerSize}px) 0,
            100% ${cornerSize}px,
            100% 100%,
            ${cornerSize}px 100%,
            0 calc(100% - ${cornerSize}px)
          )`,
          boxShadow: glow 
            ? `inset 0 0 40px ${currentVariant.glowColor}30, 0 0 20px ${currentVariant.glowColor}60` 
            : undefined,
          maxWidth: '100%',
        }}
      >
        {/* Title badge - positioned at top-left with diagonal cuts */}
        {title && (
          <div
            className="absolute z-20"
            style={{
              top: "8px",
              left: "8px",
              maxWidth: "calc(100% - 16px)",
            }}
          >
            <div
              className={`flex items-center justify-start relative overflow-hidden border-2`}
              style={{
                backgroundColor: currentVariant.titleBg,
                borderColor: currentVariant.border,
                width: "auto",
                minWidth: "80px",
                maxWidth: "100%",
                height: `${titleHeight}px`,
                paddingTop: `${titlePadding.top}px`,
                paddingBottom: `${titlePadding.bottom}px`,
                paddingLeft: `${titlePadding.left}px`,
                paddingRight: `${titlePadding.right}px`,
                clipPath: `polygon(
                  0 0,
                  calc(100% - ${Math.floor(cornerSize * 0.6)}px) 0,
                  100% ${Math.floor(cornerSize * 0.6)}px,
                  100% 100%,
                  0 100%
                )`,
                boxShadow: glow ? `0 0 15px ${currentVariant.glowColor}60` : undefined,
              }}
            >
              <span
                className={`font-bold tracking-wider uppercase ${currentVariant.titleText} select-none relative z-10`}
                style={{
                  whiteSpace: "nowrap",
                  fontSize: `${titleFontSize}px`,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                {title}
              </span>
              
              {/* Title shine effect */}
              {animated && (
                <div
                  className="absolute inset-0 space-title-shine"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                    clipPath: `polygon(
                      0 0,
                      calc(100% - ${Math.floor(cornerSize * 0.6)}px) 0,
                      100% ${Math.floor(cornerSize * 0.6)}px,
                      100% 100%,
                      0 100%
                    )`,
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* Corner accent decorations */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top-left corner */}
          <div
            className="absolute top-0 left-0 w-4 h-4"
            style={{
              background: `linear-gradient(45deg, ${currentVariant.accent} 0%, transparent 70%)`,
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          />
          
          {/* Top-right corner */}
          <div
            className="absolute top-0 right-0 w-4 h-4"
            style={{
              background: `linear-gradient(135deg, ${currentVariant.accent} 0%, transparent 70%)`,
              clipPath: "polygon(100% 0, 100% 100%, 0 0)",
            }}
          />
          
          {/* Bottom-right corner */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4"
            style={{
              background: `linear-gradient(225deg, ${currentVariant.accent} 0%, transparent 70%)`,
              clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
            }}
          />
          
          {/* Bottom-left corner */}
          <div
            className="absolute bottom-0 left-0 w-4 h-4"
            style={{
              background: `linear-gradient(315deg, ${currentVariant.accent} 0%, transparent 70%)`,
              clipPath: "polygon(0 100%, 0 0, 100% 100%)",
            }}
          />
        </div>

        {/* Animated scan line */}
        {animated && (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              clipPath: `polygon(
                0 0,
                calc(100% - ${cornerSize}px) 0,
                100% ${cornerSize}px,
                100% 100%,
                ${cornerSize}px 100%,
                0 calc(100% - ${cornerSize}px)
              )`,
            }}
          >
            <div
              className="absolute h-0.5 w-full space-scan-line"
              style={{
                background: `linear-gradient(90deg, transparent, ${currentVariant.border}80, transparent)`,
                top: "0",
              }}
            />
          </div>
        )}

        {/* Content area - with proper spacing for title */}
        <div 
          className="relative z-10 flex flex-col flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-hud-content"
          style={{
            paddingTop: title ? `${contentPadding.top + titleHeight + 6}px` : `${contentPadding.top}px`,
            paddingRight: `${contentPadding.right}px`,
            paddingBottom: `${contentPadding.bottom}px`,
            paddingLeft: `${contentPadding.left}px`,
            maxWidth: '100%',
            width: '100%',
          }}
        >
          <div className="w-full h-full max-w-full space-hud-inner" style={{ minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Preset components for easier use
export function PrimarySpaceHUD({ children, title, className = "", ...props }: Omit<SpaceHUDProps, 'variant'>) {
  return (
    <SpaceHUD variant="primary" title={title} className={className} {...props}>
      {children}
    </SpaceHUD>
  );
}

export function SecondarySpaceHUD({ children, title, className = "", ...props }: Omit<SpaceHUDProps, 'variant'>) {
  return (
    <SpaceHUD variant="secondary" title={title} className={className} {...props}>
      {children}
    </SpaceHUD>
  );
}

export function AccentSpaceHUD({ children, title, className = "", ...props }: Omit<SpaceHUDProps, 'variant'>) {
  return (
    <SpaceHUD variant="accent" title={title} className={className} {...props}>
      {children}
    </SpaceHUD>
  );
}

export function WarningSpaceHUD({ children, title, className = "", ...props }: Omit<SpaceHUDProps, 'variant'>) {
  return (
    <SpaceHUD variant="warning" title={title} className={className} {...props}>
      {children}
    </SpaceHUD>
  );
}

export function DangerSpaceHUD({ children, title, className = "", ...props }: Omit<SpaceHUDProps, 'variant'>) {
  return (
    <SpaceHUD variant="danger" title={title} className={className} {...props}>
      {children}
    </SpaceHUD>
  );
}

export function SuccessSpaceHUD({ children, title, className = "", ...props }: Omit<SpaceHUDProps, 'variant'>) {
  return (
    <SpaceHUD variant="success" title={title} className={className} {...props}>
      {children}
    </SpaceHUD>
  );
}

export function CompactSpaceHUD({ children, title, className = "", ...props }: Omit<SpaceHUDProps, 'size'>) {
  return (
    <SpaceHUD size="small" title={title} className={className} {...props}>
      {children}
    </SpaceHUD>
  );
}

export function LargeSpaceHUD({ children, title, className = "", ...props }: Omit<SpaceHUDProps, 'size'>) {
  return (
    <SpaceHUD size="large" title={title} className={className} {...props}>
      {children}
    </SpaceHUD>
  );
}