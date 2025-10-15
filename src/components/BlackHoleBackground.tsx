/**
 * Epic Cinematic Black Hole Background - Cosmic Journey Style
 * 
 * Features:
 * - Massive glowing accretion disk with spiral patterns
 * - Smooth camera orbital movement around the black hole
 * - Volumetric lighting and particle streams
 * - Dynamic color transitions and energy waves
 * - Immersive depth of field effects
 * - Realistic space atmosphere
 */

// @ts-nocheck
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Extend Three.js objects so they can be used as JSX elements
extend(THREE);

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

// Physically accurate blackbody radiation color calculation
function getBlackBodyColor(temperature: number): { r: number; g: number; b: number } {
  const t = Math.max(1000, Math.min(12000, temperature));
  
  // Approximate blackbody spectrum
  let r, g, b;
  
  if (t < 3000) {
    // Cool red/orange
    r = 1.0;
    g = Math.min(1.0, (t - 1000) / 2000 * 0.6);
    b = 0.0;
  } else if (t < 5000) {
    // Orange to yellow
    r = 1.0;
    g = Math.min(1.0, 0.6 + (t - 3000) / 2000 * 0.4);
    b = Math.max(0.0, (t - 4000) / 1000 * 0.3);
  } else if (t < 6500) {
    // Yellow to white
    r = 1.0;
    g = Math.min(1.0, 0.9 + (t - 5000) / 1500 * 0.1);
    b = Math.min(1.0, 0.3 + (t - 5000) / 1500 * 0.5);
  } else if (t < 8000) {
    // White to blue-white
    r = Math.max(0.8, 1.0 - (t - 6500) / 1500 * 0.2);
    g = 1.0;
    b = Math.min(1.0, 0.8 + (t - 6500) / 1500 * 0.2);
  } else {
    // Blue-white to blue
    r = Math.max(0.6, 0.8 - (t - 8000) / 4000 * 0.2);
    g = Math.max(0.8, 1.0 - (t - 8000) / 4000 * 0.2);
    b = 1.0;
  }
  
  return { r, g, b };
}

interface BlackHoleProps {
  scrollProgress: number;
  currentSection?: string;
}

// Realistic Black Hole Component
function RealisticBlackHole({ scrollProgress, currentSection = 'home' }: BlackHoleProps) {
  const blackHoleRef = useRef<any>(null);
  const accretionDiskRef = useRef<any>(null);
  const jetRef = useRef<any>(null);
  const hawkingRadiationRef = useRef<any>(null);
  const backgroundStarsRef = useRef<any>(null);
  
  // Use refs to avoid recreation on prop changes
  const scrollProgressRef = useRef(scrollProgress);
  const currentSectionRef = useRef(currentSection);
  
  // Update refs when props change
  scrollProgressRef.current = scrollProgress;
  currentSectionRef.current = currentSection;

  // Enhanced cinematic black hole parameters
  const schwarzschildRadius = 1.0; // Event horizon
  const photonSphere = schwarzschildRadius * 1.5; // Where light orbits
  const accretionDiskInnerRadius = schwarzschildRadius * 2.0; // ISCO (Innermost Stable Circular Orbit)
  const accretionDiskOuterRadius = schwarzschildRadius * 8.0; // Extended disk for cinematics
  const jetLength = schwarzschildRadius * 25.0; // Dramatic jets
  const quantumFoamRadius = schwarzschildRadius * 0.8; // Quantum effects near horizon

  // High-quality smooth accretion disk with anti-aliased rendering
  const accretionDiskGeometry = useMemo(() => {
    const count = 60000; // Optimized count for smooth, non-pixelated appearance
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Advanced multi-zone disk structure for cinematic realism
      const rand1 = Math.random();
      const rand2 = Math.random();
      let radius, diskHeight, intensity, diskType;
      
      if (rand1 < 0.4) {
        // Hot inner disk - closest to event horizon, ultra-bright
        radius = accretionDiskInnerRadius + Math.pow(rand2, 6.0) * (photonSphere - accretionDiskInnerRadius);
        diskHeight = (Math.random() - 0.5) * 0.015; // Ultra-thin hot disk
        intensity = 2.5 + Math.random() * 1.5;
        diskType = 'inner';
      } else if (rand1 < 0.7) {
        // Main accretion disk - primary visual component
        const radiusNorm = Math.pow(rand2, 3.0);
        radius = photonSphere + radiusNorm * (accretionDiskOuterRadius * 0.7 - photonSphere);
        diskHeight = (Math.random() - 0.5) * (0.03 + radiusNorm * 0.08);
        intensity = 1.5 + Math.random() * 1.0;
        diskType = 'main';
      } else if (rand1 < 0.85) {
        // Outer disk with more turbulence
        const radiusNorm = Math.pow(rand2, 2.0);
        radius = accretionDiskOuterRadius * 0.6 + radiusNorm * (accretionDiskOuterRadius * 0.4);
        diskHeight = (Math.random() - 0.5) * (0.08 + radiusNorm * 0.15);
        intensity = 0.8 + Math.random() * 0.7;
        diskType = 'outer';
      } else if (rand1 < 0.92) {
        // Einstein ring effect - gravitationally lensed back-side material
        radius = accretionDiskInnerRadius + Math.pow(rand2, 2.5) * (accretionDiskOuterRadius * 0.8 - accretionDiskInnerRadius);
        // Lensed material appears above and below the disk plane
        diskHeight = (Math.random() < 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.8);
        intensity = 0.6 + Math.random() * 0.5;
        diskType = 'lensed';
      } else {
        // Sparse outer halo and tidal disruption streams
        const haloRadius = Math.pow(rand2, 1.5) * accretionDiskOuterRadius * 2.0;
        radius = accretionDiskOuterRadius + haloRadius;
        diskHeight = (Math.random() - 0.5) * (0.2 + haloRadius * 0.1);
        intensity = 0.2 + Math.random() * 0.3;
        diskType = 'halo';
      }
      
      const angle = Math.random() * Math.PI * 2;
      
      // Advanced relativistic physics simulation
      const GM = 1.0; // Gravitational parameter
      const c = 1.0; // Speed of light (normalized)
      
      // General relativistic orbital motion
      const orbitalVelocity = Math.sqrt(GM / radius) * (1.0 + 0.15 * GM / (radius * c * c)); // Post-Newtonian correction
      const velocityAngle = angle + orbitalVelocity * 2.0;
      
      // Advanced Doppler and gravitational redshift effects
      const radialVelocity = Math.cos(velocityAngle) * orbitalVelocity;
      const transverseVelocity = Math.sin(velocityAngle) * orbitalVelocity;
      const dopplerFactor = 1.0 / (1.0 + radialVelocity / c);
      const gravitationalRedshift = Math.sqrt(1.0 - 2.0 * GM / (radius * c * c));
      const totalRedshift = dopplerFactor * gravitationalRedshift;
      
      // Add turbulent motion and magnetic field effects
      const turbulenceScale = intensity * 0.1;
      const magneticTurbulence = Math.sin(angle * 3.0 + radius * 0.5) * turbulenceScale;
      const spiralArm = Math.sin(angle * 2.0 - radius * 0.3) * 0.05;
      
      const x = radius * Math.cos(angle) + magneticTurbulence;
      const z = radius * Math.sin(angle) + spiralArm;
      const y = diskHeight + Math.sin(angle * 5.0 + radius * 0.8) * turbulenceScale * 0.5;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Cinematic temperature-based color grading with physical accuracy
      const normalizedRadius = Math.max(0, Math.min(1, (radius - accretionDiskInnerRadius) / 
                              (accretionDiskOuterRadius - accretionDiskInnerRadius)));
      
      // Temperature calculation based on accretion physics
      const temperature = 10000 * Math.pow(radius / schwarzschildRadius, -0.75); // Shakura-Sunyaev disk
      const temperatureNorm = Math.max(0, Math.min(1, (temperature - 2000) / 8000));
      
      let color, size, finalBrightness;
      
      // Physically-based blackbody radiation colors
      const blackbodyColor = getBlackBodyColor(temperature);
      
      // Enhanced cinematic intensity with realistic physics
      const radialIntensity = Math.pow(1.0 - normalizedRadius, 4.0) * intensity;
      const relativisticBoost = totalRedshift * (1.0 + Math.abs(transverseVelocity) * 0.5);
      
      // Cinematic multi-zone rendering based on disk physics and visual type
      if (diskType === 'inner') {
        // Ultra-hot innermost stable circular orbit - brilliant white-blue
        color = lerpColor(blackbodyColor, { r: 1.0, g: 1.0, b: 1.0 }, 0.7);
        size = 1.5 + Math.random() * 2.0; // Much larger for smooth appearance
        finalBrightness = (8.0 + Math.random() * 4.0) * relativisticBoost;
      } else if (diskType === 'main') {
        // Main accretion disk - intense orange-yellow like Interstellar
        const zoneFactor = Math.pow(radialIntensity, 2.0);
        if (zoneFactor > 0.8) {
          color = lerpColor(blackbodyColor, { r: 1.0, g: 0.9, b: 0.6 }, 0.8);
          size = 1.2 + Math.random() * 1.8; // Larger, smoother particles
          finalBrightness = (6.0 + Math.random() * 3.0) * relativisticBoost;
        } else if (zoneFactor > 0.5) {
          color = lerpColor(blackbodyColor, { r: 1.0, g: 0.8, b: 0.4 }, 0.9);
          size = 1.0 + Math.random() * 1.5;
          finalBrightness = (4.0 + Math.random() * 2.0) * relativisticBoost;
        } else {
          color = lerpColor(blackbodyColor, { r: 1.0, g: 0.7, b: 0.25 }, 0.95);
          size = 0.8 + Math.random() * 1.2;
          finalBrightness = (2.5 + Math.random() * 1.5) * relativisticBoost;
        }
      } else if (diskType === 'outer') {
        // Cooler outer regions with more red shift
        color = lerpColor(blackbodyColor, { r: 1.0, g: 0.5, b: 0.15 }, 0.7);
        size = 0.6 + Math.random() * 1.0; // Larger particles for smoothness
        finalBrightness = (1.5 + Math.random() * 1.0) * relativisticBoost;
      } else if (diskType === 'lensed') {
        // Einstein ring - gravitationally lensed back-side material
        color = lerpColor(blackbodyColor, { r: 0.8, g: 0.6, b: 0.3 }, 0.6);
        size = 0.5 + Math.random() * 0.8;
        finalBrightness = (0.8 + Math.random() * 0.7) * relativisticBoost * 0.7; // Dimmer due to lensing
      } else {
        // Sparse halo material
        color = { r: 0.6, g: 0.3, b: 0.1 };
        size = 0.3 + Math.random() * 0.5;
        finalBrightness = (0.3 + Math.random() * 0.4) * relativisticBoost;
      }
      
      // Cinematic special effects
      
      // Magnetic reconnection flares - rare but dramatic
      if (Math.random() < 0.001 && diskType === 'inner') {
        finalBrightness *= 8.0;
        size *= 3.0;
        color = { r: 1.0, g: 1.0, b: 1.0 }; // Pure white flares
      }
      
      // Shock fronts in the disk
      if (Math.random() < 0.005 && (diskType === 'main' || diskType === 'inner')) {
        finalBrightness *= 2.5;
        size *= 1.8;
        color = lerpColor(color, { r: 1.0, g: 0.9, b: 0.8 }, 0.6);
      }
      
      // Dynamic flow patterns with magnetic field effects
      const magneticField = Math.sin(angle * 4.0 + radius * 0.8) * Math.cos(angle * 2.0 - radius * 0.3);
      const turbulentFlow = 1.0 + magneticField * 0.15 * intensity;
      const spiralDensity = 1.0 + Math.sin(angle * 3.0 - radius * 0.5) * 0.1;
      
      finalBrightness *= turbulentFlow * spiralDensity;
      
      // Quantum foam effects near event horizon
      if (radius < schwarzschildRadius * 2.5) {
        const quantumFluctuation = Math.random() < 0.01 ? 2.0 + Math.random() * 3.0 : 1.0;
        finalBrightness *= quantumFluctuation;
        if (quantumFluctuation > 2.0) {
          color = lerpColor(color, { r: 0.8, g: 0.9, b: 1.0 }, 0.4); // Blue quantum glow
        }
      }
      
      colors[i3] = Math.min(1.0, color.r * finalBrightness);
      colors[i3 + 1] = Math.min(1.0, color.g * finalBrightness);
      colors[i3 + 2] = Math.min(1.0, color.b * finalBrightness);
      
      sizes[i] = size;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Generate smooth, high-quality plasma jets
  const jetGeometry = useMemo(() => {
    const count = 12000; // Optimized for smooth rendering
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create highly collimated relativistic jets
      const isUpperJet = Math.random() < 0.5;
      const jetDirection = isUpperJet ? 1 : -1;
      
      // Multi-component jet structure
      const jetType = Math.random();
      let height, radiusBase, jetComponent;
      
      if (jetType < 0.6) {
        // Core jet - highly collimated
        height = Math.pow(Math.random(), 0.4) * jetLength * 2.0;
        radiusBase = Math.pow(Math.random(), 4) * (0.1 + height * 0.03);
        jetComponent = 'core';
      } else if (jetType < 0.85) {
        // Sheath - broader, lower energy
        height = Math.pow(Math.random(), 0.6) * jetLength * 1.5;
        radiusBase = Math.pow(Math.random(), 2) * (0.2 + height * 0.08);
        jetComponent = 'sheath';
      } else {
        // Cocoon - shocked ambient medium
        height = Math.pow(Math.random(), 0.8) * jetLength * 1.2;
        radiusBase = Math.pow(Math.random(), 1.5) * (0.4 + height * 0.15);
        jetComponent = 'cocoon';
      }
      
      const angle = Math.random() * Math.PI * 2;
      
      // Complex magnetic field structure
      const helixAngle = angle + height * 0.15;
      const kinkAngle = Math.sin(height * 0.05) * 0.2; // Jet instabilities
      const magneticPinch = 1.0 + Math.sin(height * 0.1) * 0.1; // Magnetic confinement
      
      const radius = radiusBase * magneticPinch * (1 + Math.sin(helixAngle) * 0.2 + kinkAngle);
      
      const x = radius * Math.cos(angle);
      const y = height * jetDirection;
      const z = radius * Math.sin(angle);
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Cinematic relativistic jet physics and coloring
      const heightNorm = height / (jetLength * 2.0);
      const lorentzFactor = 1.0 + heightNorm * 10.0; // Relativistic boost
      const synchrotronEmission = Math.pow(lorentzFactor, 2.0);
      
      let color, size, brightness;
      
      // Component-based rendering
      if (jetComponent === 'core') {
        if (heightNorm < 0.1) {
          // Jet base - ultra-relativistic, synchrotron emission
          color = { r: 1.0, g: 1.0, b: 1.0 };
          size = 3.0 + Math.random() * 4.0; // Much larger for smooth appearance
          brightness = synchrotronEmission * (3.0 + Math.random() * 2.0);
        } else if (heightNorm < 0.4) {
          // Acceleration zone - blue-white with magnetic field lines
          color = { r: 0.85, g: 0.9, b: 1.0 };
          size = 2.5 + Math.random() * 3.0; // Larger for smooth rendering
          brightness = synchrotronEmission * (2.0 + Math.random() * 1.5);
        } else if (heightNorm < 0.7) {
          // Collimated beam - brilliant blue
          color = { r: 0.6, g: 0.8, b: 1.0 };
          size = 2.0 + Math.random() * 2.5;
          brightness = synchrotronEmission * (1.5 + Math.random() * 1.0);
        } else {
          // Terminal region - deep blue with shock interactions
          color = { r: 0.4, g: 0.6, b: 0.95 };
          size = 1.5 + Math.random() * 2.0;
          brightness = synchrotronEmission * (0.8 + Math.random() * 0.8);
        }
      } else if (jetComponent === 'sheath') {
        // Slower, broader sheath material
        color = { r: 0.7, g: 0.75, b: 0.9 };
        size = 1.5 + Math.random() * 2.0; // Larger for smoothness
        brightness = synchrotronEmission * 0.6 * (0.6 + Math.random() * 0.6);
      } else {
        // Shocked cocoon material
        color = { r: 0.8, g: 0.6, b: 0.7 };
        size = 1.2 + Math.random() * 1.8;
        brightness = synchrotronEmission * 0.4 * (0.4 + Math.random() * 0.5);
      }
      
      // Dramatic energy bursts and instabilities
      if (Math.random() < 0.008) {
        brightness *= 6.0;
        size *= 3.0;
        color = { r: 1.0, g: 1.0, b: 1.0 }; // Brilliant flares
      }
      
      // Magnetic field reconnection events
      if (Math.random() < 0.003 && jetComponent === 'core') {
        brightness *= 4.0;
        size *= 2.0;
        color = lerpColor(color, { r: 1.0, g: 0.8, b: 1.0 }, 0.6); // Purple-white magnetic events
      }
      
      colors[i3] = Math.min(1.0, color.r * brightness);
      colors[i3 + 1] = Math.min(1.0, color.g * brightness);
      colors[i3 + 2] = Math.min(1.0, color.b * brightness);
      
      sizes[i] = size;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Generate quantum foam and Hawking radiation near event horizon
  const quantumFoamGeometry = useMemo(() => {
    const count = 15000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Quantum fluctuations near the event horizon
      const radius = schwarzschildRadius * (0.9 + Math.random() * 0.8); // Just outside horizon
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Add quantum uncertainty to position
      const quantumUncertainty = 0.05 * Math.random();
      const effectiveRadius = radius + (Math.random() - 0.5) * quantumUncertainty;
      
      const x = effectiveRadius * Math.sin(phi) * Math.cos(theta);
      const y = effectiveRadius * Math.sin(phi) * Math.sin(theta);
      const z = effectiveRadius * Math.cos(phi);
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Hawking radiation spectrum - very subtle blue glow
      const hawkingIntensity = Math.exp(-(effectiveRadius - schwarzschildRadius) * 10.0);
      let color, size, brightness;
      
      if (Math.random() < 0.02) {
        // Rare virtual particle pair creation events
        color = { r: 0.8, g: 0.9, b: 1.0 };
        size = 0.15 + Math.random() * 0.2;
        brightness = hawkingIntensity * (2.0 + Math.random() * 3.0);
      } else {
        // Subtle quantum foam
        color = { r: 0.6, g: 0.7, b: 0.9 };
        size = 0.05 + Math.random() * 0.1;
        brightness = hawkingIntensity * (0.3 + Math.random() * 0.5);
      }
      
      colors[i3] = Math.min(1.0, color.r * brightness);
      colors[i3 + 1] = Math.min(1.0, color.g * brightness);
      colors[i3 + 2] = Math.min(1.0, color.b * brightness);
      
      sizes[i] = size;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Generate background stars (to be lensed)
  const backgroundStarsGeometry = useMemo(() => {
    const count = 8000; // Reduced for smoother rendering
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribute stars in a large sphere around black hole
      const radius = 30 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Various star colors and sizes
      const starType = Math.random();
      let color, size, brightness;
      
      if (starType < 0.1) {
        // Blue giants
        color = { r: 0.7, g: 0.8, b: 1.0 };
        size = 2.5 + Math.random() * 2.0; // Larger, smoother stars
        brightness = 0.8 + Math.random() * 0.2;
      } else if (starType < 0.3) {
        // White stars
        color = { r: 0.9, g: 0.9, b: 1.0 };
        size = 2.0 + Math.random() * 1.5;
        brightness = 0.6 + Math.random() * 0.3;
      } else if (starType < 0.6) {
        // Yellow stars
        color = { r: 1.0, g: 0.9, b: 0.6 };
        size = 1.5 + Math.random() * 1.2;
        brightness = 0.5 + Math.random() * 0.3;
      } else {
        // Red stars
        color = { r: 1.0, g: 0.5, b: 0.2 };
        size = 1.2 + Math.random() * 1.0;
        brightness = 0.3 + Math.random() * 0.4;
      }
      
      colors[i3] = color.r * brightness;
      colors[i3 + 1] = color.g * brightness;
      colors[i3 + 2] = color.b * brightness;
      
      sizes[i] = size;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Generate Hawking radiation glow
  const hawkingRadiationGeometry = useMemo(() => {
    const count = 8000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Very close to event horizon
      const radius = schwarzschildRadius + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Hawking radiation - very faint, high-energy
      const color = { r: 0.8, g: 0.9, b: 1.0 };
      const size = 0.2 + Math.random() * 0.3;
      const brightness = 0.1 + Math.random() * 0.1;
      
      colors[i3] = color.r * brightness;
      colors[i3 + 1] = color.g * brightness;
      colors[i3 + 2] = color.b * brightness;
      
      sizes[i] = size;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Animation loop with cinematic camera zoom
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const currentScrollProgress = scrollProgressRef.current;
    
    // Cinematic camera zoom animation - exponential zoom for dramatic effect
    const directProgress = currentScrollProgress;
    
    // Dramatic zoom range with better starting view
    const startZ = 50;   // Start closer so black hole is clearly visible
    const endZ = 1.5;    // End extremely close - almost touching event horizon
    
    // Exponential zoom for cinematic drama - each section zooms faster
    const exponentialProgress = Math.pow(directProgress, 1.8); // More aggressive curve
    const baseTargetZ = startZ - (exponentialProgress * (startZ - endZ));
    
    // Per-section dramatic zoom boosts - each section brings you much closer
    const currentSection = Math.floor(directProgress * 6);
    let sectionMultiplier = 1;
    
    // Each section has increasingly dramatic zoom
    switch(currentSection) {
      case 0: sectionMultiplier = 1.0; break;    // Home - distant overview
      case 1: sectionMultiplier = 2.5; break;   // About - approaching 
      case 2: sectionMultiplier = 4.0; break;   // Skills - getting closer
      case 3: sectionMultiplier = 6.0; break;   // Experience - much closer
      case 4: sectionMultiplier = 8.5; break;   // Projects - very close
      case 5: sectionMultiplier = 12.0; break;  // Contact - extreme closeup
      default: sectionMultiplier = 12.0; break;
    }
    
    const finalTargetZ = Math.max(baseTargetZ / sectionMultiplier, endZ);
    
    // Height transitions for cinematic approach
    const startY = 15;  // Start at good viewing height
    const endY = -2;    // End slightly below for dramatic angle
    const targetY = startY - (exponentialProgress * (startY - endY));
    
    // More dramatic orbital camera movement
    const orbitAngle = directProgress * Math.PI * 2.0; // Full 360° sweep for drama
    const orbitRadius = 15 * (1 - exponentialProgress * 0.9); // Much wider orbit that tightens dramatically
    
    // 3D orbital positioning
    const orbitX = Math.sin(orbitAngle + t * 0.05) * orbitRadius;
    const orbitZ = Math.cos(orbitAngle + t * 0.05) * orbitRadius * 0.8;
    const orbitVertical = Math.sin(orbitAngle * 2 + t * 0.1) * 3 * (1 - directProgress * 0.8);
    
    const targetX = orbitX;
    const enhancedTargetY = targetY + orbitVertical;
    
    // Much more responsive camera movement for dramatic zooming
    const baseLerpFactor = 0.05; // Faster base response
    const zoomLerpFactor = baseLerpFactor * (1 + directProgress * 4); // Much faster zoom response
    const heightLerpFactor = baseLerpFactor * 0.8; // Faster height changes
    const fastLerpFactor = 0.08; // Faster orbital movement
    
    // Apply dramatic camera movement
    state.camera.position.z += (finalTargetZ - state.camera.position.z) * zoomLerpFactor;
    state.camera.position.y += (enhancedTargetY - state.camera.position.y) * heightLerpFactor;
    state.camera.position.x += (targetX - state.camera.position.x) * fastLerpFactor;
    
    // Dramatic FOV changes for cinematic zoom
    const startFOV = 75;  // Wide but not too extreme for good initial view
    const endFOV = 25;    // Tight telephoto for intimate closeup
    const targetFOV = startFOV - (exponentialProgress * (startFOV - endFOV));
    
    // @ts-ignore - FOV exists on PerspectiveCamera
    if (state.camera.fov !== undefined) {
      // @ts-ignore
      state.camera.fov += (targetFOV - state.camera.fov) * fastLerpFactor;
      state.camera.updateProjectionMatrix();
    }
    
    // More dramatic focus tracking as we zoom in
    const focusOffset = (1 - exponentialProgress) * 5.0; // Larger focus range
    const focusX = Math.sin(orbitAngle + directProgress * 0.8) * focusOffset;
    const focusY = Math.sin(orbitAngle * 0.4) * focusOffset * 0.4;
    const focusZ = Math.cos(orbitAngle + directProgress * 0.8) * focusOffset * 0.6;
    
    // Camera tilt for dramatic effect
    const tiltAngle = Math.sin(orbitAngle * 0.5) * 0.3 * (1 - directProgress * 0.6);
    const rotationZ = Math.sin(orbitAngle * 0.2) * 0.1 * (1 - directProgress);
    
    state.camera.rotation.x = tiltAngle;
    state.camera.rotation.z = rotationZ;
    state.camera.lookAt(focusX, focusY, focusZ);
    
    // Black hole system animations
    if (blackHoleRef.current) {
      // Slow rotation of entire black hole system
      blackHoleRef.current.rotation.y += 0.001;
    }
    
    if (accretionDiskRef.current) {
      // Enhanced cinematic rotation with variable speed
      const baseRotation = 0.025;
      const dynamicRotation = baseRotation + Math.sin(t * 0.1) * 0.005;
      accretionDiskRef.current.rotation.y += dynamicRotation + currentScrollProgress * 0.015;
      
      // Realistic precession and orbital mechanics
      accretionDiskRef.current.rotation.x = Math.sin(t * 0.05) * 0.04;
      accretionDiskRef.current.rotation.z = Math.cos(t * 0.08) * 0.02;
    }
    
    if (jetRef.current) {
      // Cinematic jet precession and magnetic field evolution
      jetRef.current.rotation.y += 0.008 + Math.sin(t * 0.15) * 0.003;
      jetRef.current.rotation.x += Math.cos(t * 0.1) * 0.002;
      jetRef.current.rotation.z += Math.sin(t * 0.12) * 0.001;
    }
    
    if (hawkingRadiationRef.current) {
      // Hawking radiation flickering
      hawkingRadiationRef.current.rotation.x += 0.02;
      hawkingRadiationRef.current.rotation.y += 0.015;
      hawkingRadiationRef.current.rotation.z += 0.01;
    }
    
    if (backgroundStarsRef.current) {
      // Very slow background star rotation
      backgroundStarsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <group 
      ref={blackHoleRef}
      rotation={[
        0.2 + scrollProgress * 0.1,  // Slight tilt
        scrollProgress * 0.05,       // Gentle Y rotation 
        scrollProgress * -0.02       // Counter Z tilt
      ]} 
      position={[0, 0, 0]}
    >
      {/* Background stars (affected by gravitational lensing) */}
      <points ref={backgroundStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={backgroundStarsGeometry.positions.length / 3}
            array={backgroundStarsGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={backgroundStarsGeometry.colors.length / 3}
            array={backgroundStarsGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={backgroundStarsGeometry.sizes.length}
            array={backgroundStarsGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={3.5}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.8}
          fog={false}
          alphaTest={0.1}
        />
      </points>

      {/* Accretion disk */}
      <points ref={accretionDiskRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={accretionDiskGeometry.positions.length / 3}
            array={accretionDiskGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={accretionDiskGeometry.colors.length / 3}
            array={accretionDiskGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={accretionDiskGeometry.sizes.length}
            array={accretionDiskGeometry.sizes}
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
          opacity={0.9}
          fog={false}
          alphaTest={0.01}
        />
      </points>

      {/* Cinematic Relativistic Jets */}
      <points ref={jetRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={jetGeometry.positions.length / 3}
            array={jetGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={jetGeometry.colors.length / 3}
            array={jetGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={jetGeometry.sizes.length}
            array={jetGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1.2}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.8}
          fog={false}
          alphaTest={0.01}
        />
      </points>

      {/* Hawking radiation */}
      <points ref={hawkingRadiationRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={hawkingRadiationGeometry.positions.length / 3}
            array={hawkingRadiationGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={hawkingRadiationGeometry.colors.length / 3}
            array={hawkingRadiationGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={hawkingRadiationGeometry.sizes.length}
            array={hawkingRadiationGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.3}
          fog={false}
        />
      </points>

      {/* Quantum Foam Effects */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={quantumFoamGeometry.positions.length / 3}
            array={quantumFoamGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={quantumFoamGeometry.colors.length / 3}
            array={quantumFoamGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={quantumFoamGeometry.sizes.length}
            array={quantumFoamGeometry.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.4}
          fog={false}
        />
      </points>

      {/* Smooth High-Quality Einstein Ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[photonSphere * 0.95, photonSphere * 1.1, 128]} />
        <meshBasicMaterial
          color="#ffaa44"
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>
      
      {/* Secondary smooth lensing ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[photonSphere * 1.15, photonSphere * 1.3, 96]} />
        <meshBasicMaterial
          color="#ff8833"
          transparent={true}
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>
      
      {/* Smooth accretion disk base layer - mesh for ultra-smooth appearance */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[accretionDiskInnerRadius * 0.9, accretionDiskOuterRadius * 0.6, 256]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>
      
      {/* Inner glow ring for extra smoothness */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[accretionDiskInnerRadius * 0.95, accretionDiskInnerRadius * 1.8, 128]} />
        <meshBasicMaterial
          color="#ffaa33"
          transparent={true}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>
      
      {/* Event horizon - perfectly smooth sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[schwarzschildRadius * 1.02, 64, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent={true}
          opacity={0.98}
          fog={false}
        />
      </mesh>

      {/* Event horizon - perfectly black sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[schwarzschildRadius * 0.98, 128, 128]} />
        <meshBasicMaterial
          color="#000000"
          transparent={false}
          fog={false}
        />
      </mesh>

      {/* Gravitational lensing ring - subtle orange glow */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[schwarzschildRadius * 2.5, schwarzschildRadius * 2.8, 32]} />
        <meshBasicMaterial
          color="#cc6600"
          transparent={true}
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>
    </group>
  );
}

// Main Black Hole Background Component
export default function BlackHoleBackground({ 
  scrollProgress = 0, 
  currentSection = 'home' 
}: { 
  scrollProgress?: number; 
  currentSection?: string; 
}) {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas
        camera={{ 
          position: [0, 15, 50], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          clearColor: "#000000",
          pixelRatio: Math.min(window.devicePixelRatio, 2), // High DPI support
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
          shadowMap: {
            enabled: true,
            type: THREE.PCFSoftShadowMap
          }
        }}
        scene={{ background: new THREE.Color('#000000') }}
        dpr={[1, 2]} // Device pixel ratio for crisp rendering
      >
        <color attach="background" args={['#000000']} />
        <RealisticBlackHole 
          scrollProgress={scrollProgress} 
          currentSection={currentSection} 
        />
      </Canvas>
    </div>
  );
}