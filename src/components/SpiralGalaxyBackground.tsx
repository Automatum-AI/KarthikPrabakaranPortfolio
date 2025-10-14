/**
 * Cinematic Spiral Galaxy Background Component
 * 
 * Creates a photorealistic 3D spiral galaxy with cinematic camera work.
 * Features:
 * - 60,000+ particles forming a hyper-realistic spiral galaxy
 * - 7 distinct spiral arms with proper color gradients
 * - Dark dust lanes for depth and realism
 * - Multiple nebula clouds with volumetric appearance
 * - 12,000 background stars with depth-based sizing
 * - Cinematic camera zoom with dynamic FOV and orbital movement
 * - Smooth easing and parallax effects
 * - Optimized performance with LOD and instancing
 */

// @ts-nocheck - Temporary workaround for Three.js JSX element type issues
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';

// Extend Three.js objects so they can be used as JSX elements
extend(THREE);

// Cinematic easing function - smooth ease-in-out
function cinematicEase(t: number): number {
  // Cubic ease-in-out for smooth, cinematic movement
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Helper function to convert hex color to RGB values (0-1 range)
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 1, g: 1, b: 1 };
}

// Helper function to lerp between two RGB colors
function lerpColor(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number },
  t: number
): { r: number; g: number; b: number } {
  return {
    r: color1.r + (color2.r - color1.r) * t,
    g: color1.g + (color2.g - color1.g) * t,
    b: color1.b + (color2.b - color1.b) * t
  };
}

interface GalaxyProps {
  scrollProgress: number;
  currentSection?: string;
}

// Photorealistic Spiral Galaxy Component
function PhotorealisticGalaxy({ scrollProgress, currentSection = 'home' }: GalaxyProps) {
  const galaxyRef = useRef<any>(null);
  const innerCoreRef = useRef<any>(null);
  const coreParticlesRef = useRef<any>(null);
  const starClustersRef = useRef<any>(null);
  const volumetricCoreRef = useRef<any>(null);
  
  // Use refs to avoid recreation on prop changes
  const scrollProgressRef = useRef(scrollProgress);
  const currentSectionRef = useRef(currentSection);
  
  // Update refs when props change
  scrollProgressRef.current = scrollProgress;
  currentSectionRef.current = currentSection;
  
  // Section-based color tinting - memoized but not triggering re-renders
  const sectionColorTint = useMemo(() => {
    switch(currentSection) {
      case 'skills':
        return { r: 0.4, g: 0.8, b: 1.0 }; // Cyan tint
      case 'projects':
        return { r: 0.6, g: 0.4, b: 1.0 }; // Purple tint
      case 'experience':
        return { r: 1.0, g: 0.5, b: 0.3 }; // Orange tint
      case 'contact':
        return { r: 0.3, g: 1.0, b: 0.5 }; // Green tint
      default:
        return { r: 1.0, g: 1.0, b: 1.0 }; // Normal (home/about)
    }
  }, [currentSection]);

  // Realistic spiral galaxy parameters (Milky Way-like) - shared across geometries
  // Realistic spiral galaxy parameters (like the reference image)
  const armCount = 2; // Barred spiral structure
  const maxRadius = 28; // Large enough for dramatic effect
  const coreRadius = 1.8; // Bright central bulge
  const bulgeRadius = 5; // Galactic bulge extent
  const diskRadius = 22; // Main disk extent
  const spiralTightness = 0.22; // Tight, well-defined spiral
  const armWidth = 0.8; // Clear arm definition

  // Realistic astronomical color palette (matching reference image)
  const coreWhite = hexToRgb('#FFFFFF'); // Bright white core
  const warmYellow = hexToRgb('#FFF8DC'); // Warm yellow-white bulge
  const hotBlue = hexToRgb('#87CEEB'); // Hot blue young stars
  const coolOrange = hexToRgb('#FFB366'); // Cool orange older stars
  const dustBrown = hexToRgb('#8B4513'); // Dust lane brown
  const deepBlue = hexToRgb('#4169E1'); // Deep blue outer regions
  const voidBlack = hexToRgb('#000000'); // Deep space
  const nebulaBlue = hexToRgb('#1E90FF'); // Nebula blue glow

  // Generate realistic spiral galaxy matching reference image
  const galaxyGeometry = useMemo(() => {
    const count = 250000; // High density for smooth appearance
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Realistic galactic structure with proper density distribution
      const random1 = Math.random();
      const random2 = Math.random();
      
      // Exponential disk density profile
      const radius = -Math.log(1 - random1 * 0.95) * (maxRadius / 4);
      const clampedRadius = Math.min(radius, maxRadius);
      
      let x, y, z, stellarType;
      
      if (clampedRadius < coreRadius) {
        // BRIGHT CENTRAL CORE
        const coreAngle = random2 * Math.PI * 2;
        const coreR = clampedRadius * (0.3 + Math.random() * 0.7);
        
        x = coreR * Math.cos(coreAngle);
        z = coreR * Math.sin(coreAngle);
        y = (Math.random() - 0.5) * 0.2; // Very flat core
        
        stellarType = 'core';
        
      } else if (clampedRadius < bulgeRadius) {
        // GALACTIC BULGE
        const bulgeAngle = random2 * Math.PI * 2;
        const bulgeR = clampedRadius + (Math.random() - 0.5) * 0.8;
        
        x = bulgeR * Math.cos(bulgeAngle);
        z = bulgeR * Math.sin(bulgeAngle);
        // Elliptical bulge shape
        y = (Math.random() - 0.5) * (1.2 * (1 - clampedRadius / bulgeRadius));
        
        stellarType = 'bulge';
        
      } else {
        // SPIRAL DISK - Create logarithmic spiral arms
        const baseAngle = random2 * Math.PI * 2;
        
        // Calculate spiral pattern
        let bestArmAngle = baseAngle;
        let minArmDistance = Infinity;
        
        for (let arm = 0; arm < armCount; arm++) {
          const armStartAngle = (arm / armCount) * Math.PI * 2;
          // Logarithmic spiral equation
          const spiralAngle = armStartAngle + spiralTightness * Math.log(clampedRadius / coreRadius);
          
          const angleDiff = Math.abs(baseAngle - spiralAngle);
          const wrappedDiff = Math.min(angleDiff, Math.PI * 2 - angleDiff);
          
          if (wrappedDiff < minArmDistance) {
            minArmDistance = wrappedDiff;
            bestArmAngle = spiralAngle;
          }
        }
        
        // Determine if in spiral arm
        const armProbability = Math.exp(-minArmDistance / armWidth);
        const inArm = Math.random() < armProbability;
        
        let finalAngle;
        if (inArm) {
          // In spiral arm
          finalAngle = bestArmAngle + (Math.random() - 0.5) * armWidth * 0.4;
          stellarType = 'youngArm';
        } else {
          // Inter-arm region
          finalAngle = baseAngle + (Math.random() - 0.5) * 0.5;
          stellarType = 'oldDisk';
        }
        
        x = clampedRadius * Math.cos(finalAngle);
        z = clampedRadius * Math.sin(finalAngle);
        
        // Thin disk structure
        const scaleHeight = 0.25 * (1 + clampedRadius / maxRadius);
        y = Math.random() < 0.5 ? 
          -Math.log(Math.random()) * scaleHeight : 
          Math.log(Math.random()) * scaleHeight;
      }
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Determine stellar properties
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      const normalizedRadius = distanceFromCenter / maxRadius;
      let isInArm = stellarType === 'youngArm';
      let color;
      let size;
      
      // REALISTIC STELLAR COLOR SYSTEM - Astronomical accuracy
      if (stellarType === 'core') {
        // GALACTIC CORE - Bright central concentration
        const coreIntensity = 1.0 - (distanceFromCenter / coreRadius);
        if (Math.random() < 0.7) {
          // Orange-red evolved giants
          color = {
            r: 1.0,
            g: 0.6 + Math.random() * 0.3,
            b: 0.3 + Math.random() * 0.2
          };
        } else {
          // Yellow evolved stars
          color = {
            r: 1.0,
            g: 0.9 + Math.random() * 0.1,
            b: 0.6 + Math.random() * 0.2
          };
        }
        size = 3.5 + Math.random() * 3 + coreIntensity * 2;
        
      } else if (stellarType === 'bulge') {
        // GALACTIC BULGE - Old stellar population
        if (Math.random() < 0.6) {
          // K-type orange stars
          color = {
            r: 1.0,
            g: 0.7 + Math.random() * 0.2,
            b: 0.4 + Math.random() * 0.3
          };
        } else {
          // G-type yellow stars  
          color = {
            r: 1.0,
            g: 0.8 + Math.random() * 0.2,
            b: 0.6 + Math.random() * 0.3
          };
        }
        size = 2.5 + Math.random() * 2.5;
        
      } else if (stellarType === 'youngArm') {
        // SPIRAL ARM STARS - Young star formation regions
        if (normalizedRadius < 0.4) {
          // Inner arm - hot blue and white stars
          if (Math.random() < 0.5) {
            // Hot blue O/B stars
            color = {
              r: 0.7 + Math.random() * 0.3,
              g: 0.8 + Math.random() * 0.2,
              b: 1.0
            };
          } else {
            // White A/F stars
            color = {
              r: 0.9 + Math.random() * 0.1,
              g: 0.9 + Math.random() * 0.1,
              b: 0.95 + Math.random() * 0.05
            };
          }
          size = 2.5 + Math.random() * 2.5;
        } else {
          // Outer arm - more diverse population
          if (Math.random() < 0.6) {
            // White stars
            color = {
              r: 0.9 + Math.random() * 0.1,
              g: 0.9 + Math.random() * 0.1,
              b: 0.95 + Math.random() * 0.05
            };
          } else {
            // Red giants
            color = {
              r: 1.0,
              g: 0.5 + Math.random() * 0.3,
              b: 0.2 + Math.random() * 0.3
            };
          }
          size = 2 + Math.random() * 2;
        }
        
      } else {
        // INTER-ARM DISK - Older stellar population
        if (normalizedRadius < 0.5) {
          // Inner disk - K-type orange stars
          color = {
            r: 1.0,
            g: 0.6 + Math.random() * 0.3,
            b: 0.3 + Math.random() * 0.2
          };
          size = 1.8 + Math.random() * 1.5;
        } else {
          // Outer disk - M-type red dwarfs
          color = {
            r: 1.0,
            g: 0.4 + Math.random() * 0.2,
            b: 0.1 + Math.random() * 0.2
          };
          size = 1.2 + Math.random() * 1.2;
        }
      }
      
      // Add bright stars for realism
      if (Math.random() < 0.05) {
        // Random bright giant stars
        if (Math.random() < 0.6) {
          // Blue-white supergiants
          color = {
            r: 0.8 + Math.random() * 0.2,
            g: 0.85 + Math.random() * 0.15,
            b: 1.0
          };
        } else {
          // Red supergiants
          color = {
            r: 1.0,
            g: 0.4 + Math.random() * 0.2,
            b: 0.1 + Math.random() * 0.2
          };
        }
        size *= 1.8;
      }
      
      // Add dramatic brightness variation for cinematic sparkle
      let brightness = 0.7 + Math.random() * 0.3;
      if (isInArm && Math.random() < 0.1) {
        // Random bright stars in arms for sparkle effect
        brightness *= 1.5;
        size *= 1.3;
      }
      
      colors[i3] = color.r * brightness;
      colors[i3 + 1] = color.g * brightness;
      colors[i3 + 2] = color.b * brightness;
      
      sizes[i] = size;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Realistic dust lanes and nebular structures
  const dustLanesGeometry = useMemo(() => {
    const count = 35000; // Moderate density for realistic dust lanes
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    // Realistic interstellar dust and gas colors
    const darkDust = hexToRgb('#2B1810'); // Dark brownish dust lanes
    const warmDust = hexToRgb('#8B4513'); // Warmer illuminated dust
    const coolGas = hexToRgb('#4169E1'); // Blue-white scattered light
    const ionizedGas = hexToRgb('#DC143C'); // Red H-alpha emission
    const molecularGas = hexToRgb('#1C1C1C'); // Dark molecular clouds
    const stellarNursery = hexToRgb('#FF69B4'); // Pink star formation regions
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Realistic dust lane distribution - follows galactic structure
      const dustType = Math.random();
      let x, y, z, dustColor, opacity, size;
      
      if (dustType < 0.5) {
        // SPIRAL ARM DUST - Dark lanes between spiral arms
        const dustRadius = coreRadius + Math.pow(Math.random(), 1.2) * (maxRadius - coreRadius);
        const baseAngle = Math.random() * Math.PI * 2;
        
        // Find position between spiral arms (dust lanes)
        const armIndex = Math.floor(Math.random() * armCount);
        const armStartAngle = (armIndex / armCount) * Math.PI * 2;
        const spiralAngle = armStartAngle + spiralTightness * Math.log(dustRadius / coreRadius);
        
        // Position dust between arms
        const betweenArms = spiralAngle + Math.PI / armCount; // Halfway between arms
        const dustOffset = (Math.random() - 0.5) * armWidth * 0.8;
        const finalAngle = betweenArms + dustOffset;
        
        x = dustRadius * Math.cos(finalAngle) + (Math.random() - 0.5) * 2;
        z = dustRadius * Math.sin(finalAngle) + (Math.random() - 0.5) * 2;
        y = (Math.random() - 0.5) * 1.5; // Thin disk
        
        // Dark dust with distance-based coloring
        const dustProgress = dustRadius / maxRadius;
        if (dustProgress < 0.3) {
          dustColor = lerpColor(darkDust, warmDust, dustProgress / 0.3);
        } else if (dustProgress < 0.7) {
          dustColor = lerpColor(warmDust, coolGas, (dustProgress - 0.3) / 0.4);
        } else {
          dustColor = lerpColor(coolGas, molecularGas, (dustProgress - 0.7) / 0.3);
        }
        
        opacity = 0.2 + Math.random() * 0.3;
        size = 2 + Math.random() * 4;
        
      } else if (dustType < 0.8) {
        // MOLECULAR CLOUDS - Dense star-forming regions
        const cloudRadius = bulgeRadius + Math.random() * (maxRadius * 0.8 - bulgeRadius);
        const cloudAngle = Math.random() * Math.PI * 2;
        
        // Clumpy distribution for molecular clouds
        const clumpiness = Math.sin(cloudRadius * 0.15) * 0.3;
        const clumpAngle = cloudAngle + clumpiness;
        
        x = cloudRadius * Math.cos(clumpAngle) + (Math.random() - 0.5) * 5;
        z = cloudRadius * Math.sin(clumpAngle) + (Math.random() - 0.5) * 5;
        y = (Math.random() - 0.5) * 2.5;
        
        // Star formation regions - dark clouds with some emission
        if (Math.random() < 0.3) {
          dustColor = stellarNursery; // Pink H-alpha regions
          opacity = 0.4 + Math.random() * 0.3;
        } else if (Math.random() < 0.6) {
          dustColor = ionizedGas; // Red emission
          opacity = 0.3 + Math.random() * 0.2;
        } else {
          dustColor = molecularGas; // Dark molecular material
          opacity = 0.2 + Math.random() * 0.3;
        }
        
        size = 3 + Math.random() * 5;
        
      } else {
        // DIFFUSE INTERSTELLAR MEDIUM - General galactic dust
        const diffuseRadius = Math.pow(Math.random(), 0.9) * maxRadius;
        const diffuseAngle = Math.random() * Math.PI * 2;
        
        x = diffuseRadius * Math.cos(diffuseAngle) + (Math.random() - 0.5) * 3;
        z = diffuseRadius * Math.sin(diffuseAngle) + (Math.random() - 0.5) * 3;
        y = (Math.random() - 0.5) * 3;
        
        // Scattered light and general dust
        dustColor = coolGas;
        opacity = 0.1 + Math.random() * 0.15;
        size = 1.5 + Math.random() * 3;
      }
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Add subtle brightness variations for realism
      if (Math.random() < 0.05) {
        // Occasional brighter dust illuminated by nearby stars
        opacity *= 1.4;
        size *= 1.2;
      }
      
      colors[i3] = dustColor.r * opacity;
      colors[i3 + 1] = dustColor.g * opacity;
      colors[i3 + 2] = dustColor.b * opacity;
      
      sizes[i] = size;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Nebula clouds for color and atmosphere
  const nebulaGeometry = useMemo(() => {
    const count = 6000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const nebulaColors = [
      hexToRgb('#FF1493'), // Magenta
      hexToRgb('#8B00FF'), // Violet
      hexToRgb('#4169E1'), // Royal blue
      hexToRgb('#FF4500'), // Orange-red
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const radius = 3 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.8;
      positions[i3 + 2] = Math.sin(angle) * radius;
      
      const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
      const opacity = Math.random() * 0.25;
      colors[i3] = color.r * opacity;
      colors[i3 + 1] = color.g * opacity;
      colors[i3 + 2] = color.b * opacity;
      
      sizes[i] = Math.random() * 5 + 1;
    }
    
    return { positions, colors, sizes };
  }, []);

  // 3D Core particles - creates volumetric depth in the core
  const coreParticlesGeometry = useMemo(() => {
    const count = 8000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spherical distribution for 3D volume
      const radius = Math.pow(Math.random(), 2) * 2.5; // Concentrated at center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6; // Flattened for bulge
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Color based on distance from center - stored as base colors
      const normalizedRadius = radius / 2.5;
      let color;
      if (normalizedRadius < 0.3) {
        // Very center - white hot
        const brightness = 1 - normalizedRadius;
        colors[i3] = 1;
        colors[i3 + 1] = 0.95 + (brightness * 0.05);
        colors[i3 + 2] = 0.85 + (brightness * 0.15);
      } else if (normalizedRadius < 0.6) {
        // Middle - golden yellow
        color = lerpColor(hexToRgb('#FFD700'), hexToRgb('#FFA500'), (normalizedRadius - 0.3) / 0.3);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      } else {
        // Outer - orange to red
        color = lerpColor(hexToRgb('#FFA500'), hexToRgb('#FF6B00'), (normalizedRadius - 0.6) / 0.4);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }
      
      // Larger particles at center, smaller at edges
      sizes[i] = (1.5 - normalizedRadius) * 2 + Math.random() * 0.5;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Bright star clusters in the core
  const starClustersGeometry = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Very concentrated at center
      const radius = Math.pow(Math.random(), 3) * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Bright white to blue-white stars
      const temp = Math.random();
      if (temp < 0.7) {
        // White
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      } else {
        // Blue-white
        colors[i3] = 0.9;
        colors[i3 + 1] = 0.95;
        colors[i3 + 2] = 1;
      }
      
      sizes[i] = Math.random() * 1.5 + 0.5;
    }
    
    return { positions, colors, sizes };
  }, []);

  // 3D Ambient space field for depth and immersion
  const ambientSpaceGeometry = useMemo(() => {
    const count = 15000; // Sparse but visible
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const spaceExtent = 80; // Much larger than galaxy for deep space feel
    const backgroundColors = [
      hexToRgb('#0F0B1F'), // Deep space purple
      hexToRgb('#1A1B3A'), // Dark blue
      hexToRgb('#0A0A2E'), // Very dark blue
      hexToRgb('#2D1B69'), // Purple
      hexToRgb('#1E1E3F'), // Midnight blue
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create 3D cube distribution with galaxy avoidance
      let x, y, z, distanceFromCenter;
      let attempts = 0;
      do {
        x = (Math.random() - 0.5) * spaceExtent;
        y = (Math.random() - 0.5) * spaceExtent * 0.6; // Slightly flattened
        z = (Math.random() - 0.5) * spaceExtent;
        
        // Avoid placing particles too close to galaxy center
        distanceFromCenter = Math.sqrt(x * x + y * y + z * z);
        attempts++;
      } while (distanceFromCenter < 25 && attempts < 10);
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Very dim, distant coloring
      const colorIndex = Math.floor(Math.random() * backgroundColors.length);
      const baseColor = backgroundColors[colorIndex];
      const dimness = 0.1 + Math.random() * 0.2; // Very subtle
      
      colors[i3] = baseColor.r * dimness;
      colors[i3 + 1] = baseColor.g * dimness;
      colors[i3 + 2] = baseColor.b * dimness;
      
      // Very small, distant points
      sizes[i] = Math.random() * 0.8 + 0.2;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Realistic galaxy rotation - astronomical movement
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (galaxyRef.current) {
      // Realistic galactic rotation
      const baseRotation = 0.0015; // Slower, more realistic rotation
      const scrollMultiplier = 1 + scrollProgress * 1.2; // Enhanced when zooming
      const rotationSpeed = baseRotation * scrollMultiplier;
      
      // Primary galactic rotation
      galaxyRef.current.rotation.y += rotationSpeed;
      
      // Subtle natural drift and observation angle changes
      galaxyRef.current.rotation.x = Math.sin(t * 0.08) * 0.03 * (1 - scrollProgress * 0.7);
      galaxyRef.current.rotation.z = Math.cos(t * 0.05) * 0.02 * (1 - scrollProgress * 0.8);
      
      // Gentle scale variation for depth perception
      const naturalVariation = 1 + Math.sin(t * 0.25) * 0.015;
      galaxyRef.current.scale.setScalar(naturalVariation);
      
      // Dynamic viewing angle based on zoom progress
      const viewingAngle = scrollProgress * 0.12;
      galaxyRef.current.rotation.z = Math.sin(t * 0.1) * 0.006 * (1 - scrollProgress) + viewingAngle;
    }
    
    if (innerCoreRef.current) {
      // Enhanced counter-rotating inner core with 3D movement
      innerCoreRef.current.rotation.y -= 0.0015 + scrollProgress * 0.001;
      innerCoreRef.current.rotation.x = Math.sin(t * 0.1) * 0.02 * (1 - scrollProgress * 0.8);
      innerCoreRef.current.rotation.z = Math.cos(t * 0.07) * 0.015 * (1 - scrollProgress * 0.9);
    }
    
    if (coreParticlesRef.current) {
      // Dynamic 3D core particle rotation
      const coreSpeed = 0.002 + scrollProgress * 0.001;
      coreParticlesRef.current.rotation.y += coreSpeed;
      coreParticlesRef.current.rotation.x += coreSpeed * 0.6;
      coreParticlesRef.current.rotation.z = Math.sin(t * 0.05) * 0.01 * (1 - scrollProgress);
    }
    
    if (starClustersRef.current) {
      // Cinematic star cluster movements
      starClustersRef.current.rotation.y -= 0.0025 + scrollProgress * 0.0015;
      starClustersRef.current.rotation.z += Math.sin(t * 0.06) * 0.008 * (1 - scrollProgress * 0.7);
      starClustersRef.current.rotation.x = Math.cos(t * 0.04) * 0.005;
    }
    
    if (volumetricCoreRef.current) {
      // Enhanced volumetric core with breathing effect
      volumetricCoreRef.current.rotation.y += 0.0008 + scrollProgress * 0.0005;
      
      // Breathing scale effect when far away
      const breathingScale = 1 + Math.sin(t * 0.3) * 0.05 * (1 - scrollProgress);
      volumetricCoreRef.current.scale.setScalar(breathingScale);
      
      // Subtle 3D wobble
      volumetricCoreRef.current.rotation.x = Math.sin(t * 0.08) * 0.015 * (1 - scrollProgress * 0.9);
      volumetricCoreRef.current.rotation.z = Math.cos(t * 0.11) * 0.01 * (1 - scrollProgress * 0.95);
    }
  });

  return (
    <group 
      rotation={[
        0.3 + scrollProgress * 0.1,  // Slight tilt increase as we zoom
        scrollProgress * 0.05,       // Gentle Y rotation 
        scrollProgress * -0.02       // Counter Z tilt for dynamic perspective
      ]} 
      position={[0, 0, 0]}
    >
      {/* Dark dust lanes - render first for proper depth */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustLanesGeometry.positions.length / 3}
            array={dustLanesGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={dustLanesGeometry.colors.length / 3}
            array={dustLanesGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={dustLanesGeometry.sizes.length}
            array={dustLanesGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.6}
        />
      </points>

      {/* Nebula clouds */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nebulaGeometry.positions.length / 3}
            array={nebulaGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={nebulaGeometry.colors.length / 3}
            array={nebulaGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={nebulaGeometry.sizes.length}
            array={nebulaGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.2}
        />
      </points>

      {/* Ambient 3D space field */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={ambientSpaceGeometry.positions.length / 3}
            array={ambientSpaceGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={ambientSpaceGeometry.colors.length / 3}
            array={ambientSpaceGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={ambientSpaceGeometry.sizes.length}
            array={ambientSpaceGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.15}
        />
      </points>

      {/* Main spiral galaxy */}
      <points ref={galaxyRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={galaxyGeometry.positions.length / 3}
            array={galaxyGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={galaxyGeometry.colors.length / 3}
            array={galaxyGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={galaxyGeometry.sizes.length}
            array={galaxyGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.95}
        />
      </points>
      
      {/* 3D Volumetric Core System */}
      <group ref={volumetricCoreRef}>
        {/* Bright galactic core - concentrated starlight */}
        <mesh position={[0, 0, 0]} scale={[1, 1, 1]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial
            color="#FFF8DC"
            transparent={true}
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Warm stellar bulge */}
        <mesh position={[0, 0, 0]} scale={[1, 0.8, 1]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial
            color="#FFB366"
            transparent={true}
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Extended galactic halo */}
        <mesh position={[0, 0, 0]} scale={[1, 0.9, 1]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial
            color="#FFA500"
            transparent={true}
            opacity={0.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Outer stellar halo glow */}
        <mesh position={[0, 0, 0]} scale={[1, 0.95, 1]}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial
            color="#B0C4DE"
            transparent={true}
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Counter-rotating inner core */}
        <group ref={innerCoreRef}>
          <mesh position={[0, 0, 0]} scale={[1, 0.7, 1]}>
            <sphereGeometry args={[1.0, 32, 32]} />
            <meshBasicMaterial
              color="#FFD700"
              transparent={true}
              opacity={0.5}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
        
        {/* Volumetric layers - creating depth */}
        <mesh position={[0, 0, 0]} scale={[1, 0.7, 1]}>
          <sphereGeometry args={[1.4, 32, 32]} />
          <meshBasicMaterial
            color="#FFA500"
            transparent={true}
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        <mesh position={[0, 0, 0]} scale={[1, 0.75, 1]}>
          <sphereGeometry args={[2.0, 32, 32]} />
          <meshBasicMaterial
            color="#FF8C00"
            transparent={true}
            opacity={0.22}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        <mesh position={[0, 0, 0]} scale={[1, 0.8, 1]}>
          <sphereGeometry args={[2.8, 32, 32]} />
          <meshBasicMaterial
            color="#FF7700"
            transparent={true}
            opacity={0.12}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        <mesh position={[0, 0, 0]} scale={[1, 0.82, 1]}>
          <sphereGeometry args={[3.5, 32, 32]} />
          <meshBasicMaterial
            color="#FF6600"
            transparent={true}
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Outermost glow - transitions to spiral arms */}
        <mesh position={[0, 0, 0]} scale={[1, 0.85, 1]}>
          <sphereGeometry args={[4.5, 32, 32]} />
          <meshBasicMaterial
            color="#FACC14"
            transparent={true}
            opacity={0.05}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
      
      {/* 3D Core particles - volumetric depth */}
      <points ref={coreParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={coreParticlesGeometry.positions.length / 3}
            array={coreParticlesGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={coreParticlesGeometry.colors.length / 3}
            array={coreParticlesGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={coreParticlesGeometry.sizes.length}
            array={coreParticlesGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.8}
        />
      </points>
      
      {/* Bright star clusters in core */}
      <points ref={starClustersRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starClustersGeometry.positions.length / 3}
            array={starClustersGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starClustersGeometry.colors.length / 3}
            array={starClustersGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={starClustersGeometry.sizes.length}
            array={starClustersGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.9}
        />
      </points>
    </group>
  );
}

// Enhanced starfield with depth-based sizing
function RealisticStarfield({ scrollProgress }: { scrollProgress: number }) {
  const nearStarsRef = useRef<any>(null);
  const midStarsRef = useRef<any>(null);
  const farStarsRef = useRef<any>(null);

  // Near layer stars
  const nearStarGeometry = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const radius = 25 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Varied star colors
      const colorType = Math.random();
      if (colorType < 0.6) {
        // White stars
        const brightness = 0.9 + Math.random() * 0.1;
        colors[i3] = brightness;
        colors[i3 + 1] = brightness;
        colors[i3 + 2] = 1;
      } else if (colorType < 0.85) {
        // Yellow-orange stars
        colors[i3] = 1;
        colors[i3 + 1] = 0.85 + Math.random() * 0.15;
        colors[i3 + 2] = 0.6 + Math.random() * 0.3;
      } else {
        // Red stars
        colors[i3] = 1;
        colors[i3 + 1] = 0.5 + Math.random() * 0.3;
        colors[i3 + 2] = 0.4 + Math.random() * 0.2;
      }
      
      sizes[i] = Math.random() * 0.8 + 0.2;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Mid layer stars
  const midStarGeometry = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const radius = 60 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      const brightness = 0.8 + Math.random() * 0.2;
      colors[i3] = brightness;
      colors[i3 + 1] = brightness;
      colors[i3 + 2] = 1;
      
      sizes[i] = Math.random() * 0.5 + 0.1;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Far layer stars
  const farStarGeometry = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const radius = 120 + Math.random() * 180;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      const brightness = 0.7 + Math.random() * 0.3;
      colors[i3] = brightness;
      colors[i3 + 1] = brightness;
      colors[i3 + 2] = 1;
      
      sizes[i] = Math.random() * 0.3;
    }
    
    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (nearStarsRef.current) {
      // Enhanced 3D parallax - near stars move most with depth
      nearStarsRef.current.rotation.y = t * 0.0008 + scrollProgress * 0.15;
      nearStarsRef.current.rotation.x = t * 0.0005 + Math.sin(scrollProgress * Math.PI) * 0.02;
      nearStarsRef.current.rotation.z = Math.sin(t * 0.3) * 0.005 * (1 - scrollProgress);
    }
    
    if (midStarsRef.current) {
      // Cinematic mid-layer parallax
      midStarsRef.current.rotation.y = t * 0.0004 + scrollProgress * 0.08;
      midStarsRef.current.rotation.x = t * 0.0003 + Math.cos(scrollProgress * Math.PI * 0.5) * 0.015;
      midStarsRef.current.rotation.z = Math.cos(t * 0.25) * 0.003 * (1 - scrollProgress * 0.8);
    }
    
    if (farStarsRef.current) {
      // Subtle deep space parallax
      farStarsRef.current.rotation.y = t * 0.0002 + scrollProgress * 0.03;
      farStarsRef.current.rotation.x = t * 0.0001 + scrollProgress * 0.01;
      farStarsRef.current.rotation.z = Math.sin(t * 0.1) * 0.001 * (1 - scrollProgress * 0.9);
    }
  });

  return (
    <>
      {/* Far background stars */}
      <points ref={farStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={farStarGeometry.positions.length / 3}
            array={farStarGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={farStarGeometry.colors.length / 3}
            array={farStarGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={farStarGeometry.sizes.length}
            array={farStarGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          transparent={true}
          opacity={0.25}
        />
      </points>
      
      {/* Mid layer stars */}
      <points ref={midStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={midStarGeometry.positions.length / 3}
            array={midStarGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={midStarGeometry.colors.length / 3}
            array={midStarGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={midStarGeometry.sizes.length}
            array={midStarGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          transparent={true}
          opacity={0.4}
        />
      </points>
      
      {/* Near stars */}
      <points ref={nearStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nearStarGeometry.positions.length / 3}
            array={nearStarGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={nearStarGeometry.colors.length / 3}
            array={nearStarGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={nearStarGeometry.sizes.length}
            array={nearStarGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          transparent={true}
          opacity={0.6}
        />
      </points>
    </>
  );
}

// Cinematic camera controller
function CinematicCamera({ scrollProgress }: { scrollProgress: number }) {
  const orbitAngle = useRef(0);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.05;
    
    // Use the global state directly for most up-to-date value
    const currentProgress = galaxyState.scrollProgress;
    

    
    // Use direct progress for equal zoom per section
    const directProgress = currentProgress;
    
    // More moderate zoom range with linear progression for equal section zoom
    const startZ = 60;  // Start farther but not too far
    const endZ = 3;     // End closer but not too close
    
    // Linear zoom progression so each section contributes equally
    const targetZ = startZ - (directProgress * (startZ - endZ));
    
    // Add section-specific zoom boosts for more dramatic transitions
    const sectionBoost = Math.floor(directProgress * 6) * 2; // 2 units extra zoom per section
    const finalTargetZ = Math.max(targetZ - sectionBoost, endZ);
    
    // Linear height transitions for equal section changes
    const startY = 15;  // Start high for overview
    const endY = 0;     // End level for immersion
    const targetY = startY - (directProgress * (startY - endY));
    
    // Enhanced 3D orbital camera movement for dramatic depth showcase
    orbitAngle.current = directProgress * Math.PI * 1.2; // 216° dramatic sweep
    const orbitRadius = 8 * (1 - directProgress * 0.7); // More gradual orbit reduction
    
    // Complex 3D orbital positioning with vertical motion
    const orbitX = Math.sin(orbitAngle.current + t * 0.15) * orbitRadius;
    const orbitZ = Math.cos(orbitAngle.current + t * 0.15) * orbitRadius * 0.8;
    const orbitVertical = Math.sin(orbitAngle.current * 2 + t * 0.1) * 3 * (1 - directProgress * 0.8);
    
    const targetX = orbitX;
    const orbitTargetZ = orbitZ;
    const enhancedTargetY = targetY + orbitVertical;
    
    // Add tilting motion to show galaxy layers
    const tiltAngle = Math.sin(orbitAngle.current * 0.5) * 0.3 * (1 - directProgress * 0.6);
    
    // Cinematic camera movement with variable speed
    const baseLerpFactor = 0.02; // Slightly slower for smoother cinematic feel
    const zoomLerpFactor = baseLerpFactor * (1 + directProgress * 2); // Even faster zoom response
    const heightLerpFactor = baseLerpFactor * 0.6; // Slower height changes for elegance
    
    // Use final target Z position with section boosts
    const actualTargetZ = finalTargetZ;
    
    // Apply enhanced 3D movement with depth showcasing
    const fastLerpFactor = 0.06; // Balanced response for smooth cinematic feel
    state.camera.position.z += (finalTargetZ - state.camera.position.z) * zoomLerpFactor;
    state.camera.position.y += (enhancedTargetY - state.camera.position.y) * heightLerpFactor;
    state.camera.position.x += (targetX - state.camera.position.x) * fastLerpFactor;
    
    // Add Z-axis movement for depth perception
    const enhancedTargetZ = finalTargetZ + orbitTargetZ * 0.2; // Subtle Z variation for depth
    state.camera.position.z = enhancedTargetZ;
    
    // Linear FOV progression for equal section changes
    const startFOV = 75;  // Moderate wide angle
    const endFOV = 45;    // Moderate telephoto
    const targetFOV = startFOV - (directProgress * (startFOV - endFOV));
    const finalFOV = targetFOV;
    
    // @ts-ignore - FOV exists on PerspectiveCamera
    if (state.camera.fov !== undefined) {
      // @ts-ignore
      state.camera.fov += (finalFOV - state.camera.fov) * fastLerpFactor;
      state.camera.updateProjectionMatrix();
    }
    
    // Enhanced 3D focus system to showcase galaxy layers
    const focusOffset = (1 - directProgress) * 2.5;
    const focusX = Math.sin(orbitAngle.current + directProgress * 0.5) * focusOffset;
    const focusY = Math.sin(orbitAngle.current * 0.3) * focusOffset * 0.3; // Vertical focus shift
    const focusZ = Math.cos(orbitAngle.current + directProgress * 0.5) * focusOffset * 0.5;
    
    // Add slight camera rotation to emphasize 3D structure
    const rotationX = tiltAngle;
    const rotationZ = Math.sin(orbitAngle.current * 0.2) * 0.1 * (1 - directProgress);
    
    // Apply rotation before looking at target
    state.camera.rotation.x = rotationX;
    state.camera.rotation.z = rotationZ;
    
    state.camera.lookAt(focusX, focusY, focusZ);
  });
  
  return null;
}

interface SpiralGalaxyBackgroundProps {
  scrollProgress?: number;
  currentSection?: string;
}

// Global state that Three.js components will read from
const galaxyState = {
  scrollProgress: 0,
  currentSection: 'home'
};

// Update components to read from global state instead of props
function RealisticStarfieldWithState() {
  return <RealisticStarfield scrollProgress={galaxyState.scrollProgress} />;
}

function PhotorealisticGalaxyWithState() {
  return <PhotorealisticGalaxy scrollProgress={galaxyState.scrollProgress} currentSection={galaxyState.currentSection} />;
}

function CinematicCameraWithState() {
  return <CinematicCamera scrollProgress={galaxyState.scrollProgress} />;
}

// Singleton Canvas - created once at module level
let canvasElement: JSX.Element | null = null;

function getOrCreateCanvas() {
  if (!canvasElement) {
    canvasElement = (
      <Canvas
        camera={{ position: [0, 20, 100], fov: 90 }}
        gl={{ 
          antialias: true, // Enable for smoother visuals
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping, // Cinematic tone mapping
          toneMappingExposure: 1.2
        }}
        dpr={[1, 2]}
        style={{ background: 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 70%)' }}
      >
        {/* Cinematic lighting setup */}
        <ambientLight intensity={0.1} color="#1a1a3a" />
        <directionalLight position={[10, 10, 5]} intensity={0.3} color="#4a6cf7" />
        <pointLight position={[0, 0, 0]} intensity={0.8} color="#ffd700" distance={30} />
        
        <RealisticStarfieldWithState />
        <PhotorealisticGalaxyWithState />
        <CinematicCameraWithState />
      </Canvas>
    );
  }
  return canvasElement;
}

// Main component - only updates overlay, Canvas never recreated
export function SpiralGalaxyBackground({ 
  scrollProgress = 0,
  currentSection = 'home'
}: SpiralGalaxyBackgroundProps) {
  // Update global state that Three.js components read from
  galaxyState.scrollProgress = scrollProgress;
  galaxyState.currentSection = currentSection;
  
  // Section-based color filter overlay
  const sectionColorOverlay = useMemo(() => {
    switch(currentSection) {
      case 'skills':
        return 'rgba(100, 200, 255, 0.15)'; // Cyan overlay
      case 'projects':
        return 'rgba(168, 85, 247, 0.15)'; // Purple overlay
      case 'experience':
        return 'rgba(251, 146, 60, 0.15)'; // Orange overlay
      case 'contact':
        return 'rgba(74, 222, 128, 0.12)'; // Green overlay
      default:
        return 'transparent'; // No overlay for home/about
    }
  }, [currentSection]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {getOrCreateCanvas()}
      
      {/* Debug: Section-based zoom progress indicator */}
      <div className="fixed top-4 left-4 z-50 bg-black/70 text-white p-3 rounded text-sm font-mono pointer-events-none">
        <div>Section: {currentSection}</div>
        <div>Zoom: {Math.round(scrollProgress * 100)}%</div>
        <div className="w-32 h-2 bg-gray-700 rounded mt-1">
          <div 
            className="h-full bg-blue-500 rounded transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
      
      {/* Section-based color overlay with smooth transition */}
      <div 
        className="absolute inset-0 pointer-events-none transition-colors duration-1000"
        style={{
          background: sectionColorOverlay
        }} 
      />

      {/* Dynamic overlay - fades out as we zoom in to reveal galaxy beauty */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.6) 100%)',
          opacity: 1 - scrollProgress * 0.5
        }} 
      />
      
      {/* Vignette - stronger at edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.8) 100%)'
        }} 
      />
    </div>
  );
}
