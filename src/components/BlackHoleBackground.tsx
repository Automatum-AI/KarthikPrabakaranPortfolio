/**
 * Realistic Black Hole Background Component
 * 
 * Creates a photorealistic black hole with:
 * - Event horizon (black sphere)
 * - Accretion disk with realistic heating colors
 * - Gravitational lensing effects
 * - Jets of plasma
 * - Hawking radiation glow
 * - Background starfield being lensed
 */

// @ts-nocheck - Temporary workaround for Three.js JSX element type issues
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
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

  // Black hole parameters
  const schwarzschildRadius = 2.0; // Event horizon size
  const accretionDiskInnerRadius = 3.0; // Just outside event horizon
  const accretionDiskOuterRadius = 12.0; // Outer edge of disk
  const jetLength = 20.0; // Length of polar jets

  // Generate Interstellar-style accretion disk with gravitational lensing effects
  const accretionDiskGeometry = useMemo(() => {
    const count = 120000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create multiple disk layers for lensing effect
      const layerType = Math.random();
      let radius, diskHeight, lensEffect;
      
      if (layerType < 0.4) {
        // Main visible disk
        radius = accretionDiskInnerRadius + Math.pow(Math.random(), 1.2) * 
                (accretionDiskOuterRadius - accretionDiskInnerRadius);
        diskHeight = Math.max(0.05, radius * 0.02);
        lensEffect = 1.0;
      } else if (layerType < 0.7) {
        // Upper lensed disk (appears above due to gravitational lensing)
        radius = accretionDiskInnerRadius + Math.pow(Math.random(), 1.5) * 
                (accretionDiskOuterRadius * 0.8 - accretionDiskInnerRadius);
        diskHeight = 2.0 + Math.random() * 1.5; // Above the black hole
        lensEffect = 0.6; // Dimmer due to lensing
      } else {
        // Lower lensed disk (appears below due to gravitational lensing)
        radius = accretionDiskInnerRadius + Math.pow(Math.random(), 1.5) * 
                (accretionDiskOuterRadius * 0.8 - accretionDiskInnerRadius);
        diskHeight = -2.0 - Math.random() * 1.5; // Below the black hole
        lensEffect = 0.4; // Even dimmer
      }
      
      const angle = Math.random() * Math.PI * 2;
      
      // Doppler shift and relativistic effects
      const velocityAngle = angle + Math.log(radius / accretionDiskInnerRadius) * 0.5;
      const relativistic = Math.abs(Math.cos(velocityAngle)); // Doppler boosting
      
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = (Math.random() - 0.5) * Math.abs(diskHeight) * 0.3 + diskHeight;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Interstellar-style colors with Doppler shift
      const normalizedRadius = (radius - accretionDiskInnerRadius) / 
                              (accretionDiskOuterRadius - accretionDiskInnerRadius);
      
      let color, size, brightness;
      
      // Temperature gradient with relativistic effects
      const temperature = 1.0 - normalizedRadius * 0.8;
      const dopplerBoost = 0.5 + relativistic * 1.5;
      
      if (temperature > 0.8) {
        // Extremely hot inner region - brilliant white/blue
        color = { r: 1.0, g: 1.0, b: 1.0 };
        size = 1.2 + Math.random() * 2.0;
        brightness = (0.9 + Math.random() * 0.1) * lensEffect * dopplerBoost;
      } else if (temperature > 0.6) {
        // Very hot region - white with blue tint
        color = { r: 0.95, g: 0.98, b: 1.0 };
        size = 1.0 + Math.random() * 1.5;
        brightness = (0.8 + Math.random() * 0.2) * lensEffect * dopplerBoost;
      } else if (temperature > 0.4) {
        // Hot region - golden white
        color = { r: 1.0, g: 0.95, b: 0.8 };
        size = 0.8 + Math.random() * 1.2;
        brightness = (0.6 + Math.random() * 0.3) * lensEffect * dopplerBoost;
      } else if (temperature > 0.2) {
        // Warm region - amber
        color = { r: 1.0, g: 0.7, b: 0.4 };
        size = 0.6 + Math.random() * 1.0;
        brightness = (0.4 + Math.random() * 0.3) * lensEffect * dopplerBoost;
      } else {
        // Cooler outer region - deep orange/red
        color = { r: 1.0, g: 0.4, b: 0.1 };
        size = 0.4 + Math.random() * 0.8;
        brightness = (0.2 + Math.random() * 0.3) * lensEffect * dopplerBoost;
      }
      
      // Add intense hotspots and jets
      if (Math.random() < 0.02) {
        brightness *= 3.0;
        size *= 2.0;
        color = { r: 1.0, g: 1.0, b: 1.0 }; // Pure white hotspots
      }
      
      colors[i3] = Math.min(1.0, color.r * brightness);
      colors[i3 + 1] = Math.min(1.0, color.g * brightness);
      colors[i3 + 2] = Math.min(1.0, color.b * brightness);
      
      sizes[i] = size;
    }
    
    return { positions, colors, sizes };
  }, []);

  // Generate Interstellar-style plasma jets
  const jetGeometry = useMemo(() => {
    const count = 25000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create more dramatic bipolar jets
      const isUpperJet = Math.random() < 0.5;
      const jetDirection = isUpperJet ? 1 : -1;
      
      const height = Math.pow(Math.random(), 0.6) * jetLength * 1.5;
      const radiusBase = Math.pow(Math.random(), 3) * (0.3 + height * 0.08);
      const angle = Math.random() * Math.PI * 2;
      
      // Add helical structure to jets
      const helixAngle = angle + height * 0.2;
      const radius = radiusBase * (1 + Math.sin(helixAngle) * 0.3);
      
      const x = radius * Math.cos(angle);
      const y = height * jetDirection;
      const z = radius * Math.sin(angle);
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // More cinematic jet colors with energy gradient
      const heightNorm = height / (jetLength * 1.5);
      const energyLevel = 1.0 - heightNorm;
      let color, size, brightness;
      
      if (heightNorm < 0.2) {
        // Base of jet - ultra-hot, pure white
        color = { r: 1.0, g: 1.0, b: 1.0 };
        size = 1.5 + Math.random() * 2.0;
        brightness = 1.0 + Math.random() * 0.5;
      } else if (heightNorm < 0.5) {
        // Hot region - blue-white
        color = { r: 0.9, g: 0.95, b: 1.0 };
        size = 1.0 + Math.random() * 1.5;
        brightness = 0.8 + Math.random() * 0.4;
      } else if (heightNorm < 0.8) {
        // Cooling region - blue
        color = { r: 0.6, g: 0.8, b: 1.0 };
        size = 0.8 + Math.random() * 1.2;
        brightness = 0.5 + Math.random() * 0.4;
      } else {
        // Outer region - deep blue purple
        color = { r: 0.4, g: 0.5, b: 0.9 };
        size = 0.5 + Math.random() * 1.0;
        brightness = 0.3 + Math.random() * 0.3;
      }
      
      // Add energy bursts
      if (Math.random() < 0.01) {
        brightness *= 4.0;
        size *= 2.5;
        color = { r: 1.0, g: 1.0, b: 1.0 }; // Energy bursts
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
    const count = 30000;
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
        size = 1.5 + Math.random() * 1.0;
        brightness = 0.8 + Math.random() * 0.2;
      } else if (starType < 0.3) {
        // White stars
        color = { r: 0.9, g: 0.9, b: 1.0 };
        size = 1.0 + Math.random() * 0.8;
        brightness = 0.6 + Math.random() * 0.3;
      } else if (starType < 0.6) {
        // Yellow stars
        color = { r: 1.0, g: 0.9, b: 0.6 };
        size = 0.8 + Math.random() * 0.6;
        brightness = 0.5 + Math.random() * 0.3;
      } else {
        // Red stars
        color = { r: 1.0, g: 0.5, b: 0.2 };
        size = 0.6 + Math.random() * 0.5;
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
      // Accretion disk rotation - differential rotation
      accretionDiskRef.current.rotation.y += 0.01 + currentScrollProgress * 0.005;
      
      // Slight precession
      accretionDiskRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    
    if (jetRef.current) {
      // Jets have slight wobble and rotation
      jetRef.current.rotation.y += 0.002;
      jetRef.current.rotation.z = Math.sin(t * 0.15) * 0.05;
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
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.6}
          fog={false}
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
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={1.2}
          fog={false}
        />
      </points>

      {/* Plasma jets */}
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
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.9}
          fog={false}
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

      {/* Photon sphere - glowing ring at 1.5x Schwarzschild radius */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[schwarzschildRadius * 1.4, schwarzschildRadius * 1.6, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>

      {/* Event horizon with slight distortion effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[schwarzschildRadius, 64, 64]} />
        <meshBasicMaterial
          color="#000000"
          transparent={true}
          opacity={0.98}
          fog={false}
        />
      </mesh>

      {/* Gravitational lensing ring effect */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[schwarzschildRadius * 2.8, schwarzschildRadius * 3.2, 32]} />
        <meshBasicMaterial
          color="#ff8800"
          transparent={true}
          opacity={0.15}
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
          clearColor: "#000000"
        }}
        scene={{ background: new THREE.Color('#000000') }}
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