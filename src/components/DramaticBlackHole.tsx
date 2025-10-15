// @ts-nocheck

// Utility: create a soft round particle texture
function createSoftParticleTexture(size = 64) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const center = size / 2;
  const radius = size / 2 * 0.9;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, 'rgba(255,255,255,0.5)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}
/**
 * Dramatic Black Hole - Visually Stunning and Realistic
 * Perfect balance of scientific accuracy and visual impact
 */

// @ts-nocheck

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Mesh, SphereGeometry, TorusGeometry, MeshPhysicalMaterial, ShaderMaterial } from 'three';
import * as THREE from 'three';

extend({ Mesh, SphereGeometry, TorusGeometry, MeshPhysicalMaterial, ShaderMaterial });

// Allow react-three-fiber primitives in TS without full project-level types.
// This is a local, minimal fix so the file compiles cleanly. For a stricter
// solution install `@types/three` and configure `tsconfig.json` (recommended).
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // accept any r3f primitive (mesh, points, shaderMaterial, etc.)
      [name: string]: any;
    }
  }
}


// Enhanced shader for cinematic/scientific accretion disk
const diskVertexShader = `
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const diskFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPos;
  uniform float time;
  // Enhanced turbulence, color, lensing
  void main() {
    float r = length(vPos.xz);
    float theta = atan(vPos.z, vPos.x);
    // Thinner disk
    float diskAlpha = smoothstep(1.6, 2.0, r) * (1.0 - smoothstep(2.0, 2.3, r));
    // Relativistic temperature gradient
    float temp = 0.5 + 0.5 * sin(theta + time * 0.7 + r * 3.0);
    float doppler = 0.6 + 0.4 * cos(theta - time * 0.3);
    // More vivid color
    vec3 diskColor = mix(vec3(1.2, 0.8, 0.3), vec3(0.1, 0.5, 1.2), temp);
    diskColor *= doppler;
    // Stronger turbulence
    diskColor += 0.18 * vec3(sin(r * 12.0 + time * 1.2), cos(r * 9.0 - time * 0.8), sin(theta * 4.0 + time * 0.5));
    // Lensing distortion
    float lensing = 1.0 - 0.3 * exp(-pow((r-1.0)*5.0,2.0));
    diskColor *= lensing;
    // Subtle glow
    float glow = 0.12 * exp(-pow((r-1.8)*6.0,2.0));
    gl_FragColor = vec4(diskColor, diskAlpha + glow);
  }
`;


// Enhanced volumetric glow for photon ring
const glowVertexShader = `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const glowFragmentShader = `
  varying vec3 vPos;
  uniform float time;
  void main() {
    float r = length(vPos.xz);
    float glow = exp(-pow((r-1.0)*10.0,2.0));
    // Relativistic color shift
    float shift = 0.5 + 0.5 * sin(time + r * 6.0);
    vec3 color = mix(vec3(1.2,1.0,0.7), vec3(0.7,0.2,1.0), shift);
    gl_FragColor = vec4(color, glow*0.7);
  }
`;

// Event horizon (black sphere)
function BlackHoleSphere() {
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial color="#000" roughness={0.8} metalness={1} clearcoat={1} />
    </mesh>
  );
}

// Accretion disk as a thinner, more dynamic 3D torus with enhanced shader
function AccretionDisk() {
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame(({ clock }) => {
    if (ref.current && (ref.current.material as any) && 'uniforms' in (ref.current.material as any)) {
      ((ref.current.material as any).uniforms as any).time.value = clock.getElapsedTime();
    }
  });
  return (
    <mesh ref={ref} rotation-x={Math.PI/2}>
      <torusGeometry args={[1.8, 0.28, 128, 256]} />
      <shaderMaterial
        vertexShader={diskVertexShader}
        fragmentShader={diskFragmentShader}
        uniforms={{ time: { value: 0 } }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Volumetric photon ring
function PhotonRing() {
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame(({ clock }) => {
    if (ref.current && (ref.current.material as any) && 'uniforms' in (ref.current.material as any)) {
      ((ref.current.material as any).uniforms as any).time.value = clock.getElapsedTime();
    }
  });
  return (
    <mesh ref={ref} rotation-x={Math.PI/2}>
      <torusGeometry args={[1.05, 0.08, 64, 128]} />
      <shaderMaterial
        vertexShader={glowVertexShader}
        fragmentShader={glowFragmentShader}
        uniforms={{ time: { value: 0 } }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Main scene component
// ...existing code...

// Dramatic event horizon with perfect glow
function DramaticEventHorizon() {
  const groupRef = useRef<THREE.Group>(null);
  
  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        viewVector: { value: new THREE.Vector3() }
      },
      vertexShader: `
        uniform vec3 viewVector;
        uniform float time;
        varying float intensity;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          
          vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          vec3 viewDir = normalize(viewVector - worldPos);
          
          // Perfect rim lighting
          float rim = 1.0 - abs(dot(viewDir, normalize(vNormal)));
          intensity = pow(rim, 2.0);
          
          // Gentle pulsing
          intensity *= (sin(time * 1.2) * 0.2 + 0.8);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying float intensity;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Beautiful blue-orange gradient
          vec3 innerGlow = vec3(0.1, 0.4, 1.0); // Blue core
          vec3 outerGlow = vec3(1.0, 0.3, 0.1); // Orange edge
          
          vec3 glow = mix(innerGlow, outerGlow, intensity);
          
          // Add energy fluctuations
          float energy = sin(time * 2.0 + length(vPosition) * 4.0) * 0.3 + 0.7;
          glow *= energy;
          
          gl_FragColor = vec4(glow, intensity * 0.8);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
  }, []);
  
  useFrame(({ clock, camera }) => {
    if (groupRef.current) {
      glowMaterial.uniforms.time.value = clock.getElapsedTime();
      glowMaterial.uniforms.viewVector.value.copy(camera.position);
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Pure black core */}
      <mesh>
        <sphereGeometry args={[4.5, 64, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Main glow effect */}
      <mesh material={glowMaterial}>
        <sphereGeometry args={[4.8, 48, 24]} />
      </mesh>
      
      {/* Subtle outer glow */}
      <mesh>
        <sphereGeometry args={[5.2, 32, 16]} />
        <meshBasicMaterial 
          color="#ff4400"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Scientifically accurate black hole with gravitational lensing
function ScientificBlackHole({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const blackHoleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(1024, 1024) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // Schwarzschild radius and disk parameters
        const float rs = 0.3;           // Event horizon radius
        const float diskInner = 0.6;    // Inner disk radius
        const float diskOuter = 2.5;    // Outer disk radius
        
        // Black body temperature colors
        vec3 temperatureColor(float temp) {
          temp = clamp(temp, 0.0, 1.0);
          if (temp > 0.8) {
            return mix(vec3(1.0, 0.8, 0.4), vec3(1.2, 1.1, 0.9), (temp - 0.8) / 0.2);
          } else if (temp > 0.5) {
            return mix(vec3(1.0, 0.4, 0.1), vec3(1.0, 0.8, 0.4), (temp - 0.5) / 0.3);
          } else if (temp > 0.2) {
            return mix(vec3(0.6, 0.2, 0.05), vec3(1.0, 0.4, 0.1), (temp - 0.2) / 0.3);
          } else {
            return mix(vec3(0.2, 0.05, 0.01), vec3(0.6, 0.2, 0.05), temp / 0.2);
          }
        }
        
        // Gravitational lensing calculation
        vec2 gravitationalLens(vec2 coord, float mass) {
          vec2 center = vec2(0.0, 0.0);
          vec2 offset = coord - center;
          float r = length(offset);
          
          if (r < rs) return coord; // Inside event horizon
          
          // Einstein ring effect - light bending
          float lensStrength = mass / (r * r + 0.01);
          float bentAngle = atan(offset.y, offset.x) + lensStrength * 0.3;
          float bentR = r + lensStrength * 0.1;
          
          return center + vec2(cos(bentAngle), sin(bentAngle)) * bentR;
        }
        
        void main() {
          vec2 coord = (vUv - 0.5) * 4.0; // Scale to -2 to 2
          float r = length(coord);
          float angle = atan(coord.y, coord.x);
          
          // Apply gravitational lensing
          vec2 lensedCoord = gravitationalLens(coord, 0.5);
          float lensedR = length(lensedCoord);
          float lensedAngle = atan(lensedCoord.y, lensedCoord.x);
          
          vec3 finalColor = vec3(0.0);
          
          // Event horizon (pure black)
          if (r < rs) {
            finalColor = vec3(0.0);
          }
          // Accretion disk with gravitational effects
          else if (lensedR >= diskInner && lensedR <= diskOuter) {
            // Distance from center affects temperature
            float temp = 1.0 - ((lensedR - diskInner) / (diskOuter - diskInner));
            
            // Add Keplerian rotation
            float rotationSpeed = 1.0 / sqrt(lensedR);
            float rotatedAngle = lensedAngle + time * rotationSpeed * 2.0;
            
            // Density fluctuations and turbulence
            float density = sin(rotatedAngle * 8.0) * 0.3 + 0.7;
            density *= sin(lensedR * 15.0 + time * 3.0) * 0.2 + 0.8;
            
            // Doppler beaming - approaching side brighter
            float dopplerBoost = 1.0 + 0.4 * cos(rotatedAngle);
            
            // Temperature based on radius and dynamics
            temp *= density * dopplerBoost;
            temp = pow(temp, 0.8); // Gamma correction
            
            finalColor = temperatureColor(temp) * temp;
            
            // Add gravitational redshift
            float redshift = 1.0 - rs / (2.0 * lensedR);
            finalColor *= redshift;
          }
          // Gravitational lensing creates secondary images
          else {
            // Check for lensed disk behind black hole
            vec2 mirrorCoord = vec2(-coord.x, coord.y);
            vec2 lensedMirror = gravitationalLens(mirrorCoord, 0.3);
            float mirrorR = length(lensedMirror);
            
            if (mirrorR >= diskInner && mirrorR <= diskOuter) {
              float temp = (1.0 - ((mirrorR - diskInner) / (diskOuter - diskInner))) * 0.6;
              float mirrorAngle = atan(lensedMirror.y, lensedMirror.x);
              float rotationSpeed = 1.0 / sqrt(mirrorR);
              float rotatedAngle = mirrorAngle + time * rotationSpeed * 2.0;
              
              float density = sin(rotatedAngle * 6.0) * 0.2 + 0.6;
              temp *= density;
              
              finalColor += temperatureColor(temp) * temp * 0.4; // Dimmer lensed image
            }
          }
          
          // Add photon ring (Einstein ring)
          float ringR = rs * 1.5; // Photon sphere
          if (abs(r - ringR) < 0.05) {
            finalColor += vec3(0.3, 0.2, 0.1) * (1.0 - abs(r - ringR) / 0.05);
          }
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });
  }, []);
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Main black hole plane */}
      <mesh>
        <planeGeometry args={[40, 40, 1, 1]} />
        <primitive object={blackHoleMaterial} ref={materialRef} />
      </mesh>
    </group>
  );
}

// Realistic black hole using a ray-bending fragment shader (approximate)
function RealisticBlackHole() {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const { size, viewport } = (THREE as any).__r3f__getSize ? (THREE as any).__r3f__getSize() : { size: { width: window.innerWidth, height: window.innerHeight }, viewport: null };
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (matRef.current) matRef.current.uniforms.time.value = t;
    // slow rotation for cinematic motion
    if (meshRef.current) meshRef.current.rotation.z = t * 0.05;
  });

  const realisticFS = `
    precision highp float;
    uniform float time;
    uniform vec2 resolution;

  // parameters
  const float rs = 0.35; // Schwarzschild radius (scaled)
  const float diskInner = 0.9;
  const float diskOuter = 2.2;

    // temperature color map (simple)
    vec3 tempColor(float t) {
      return mix(vec3(1.0,0.8,0.4), vec3(0.1,0.5,1.2), clamp(t,0.0,1.0));
    }

    // improved bending: stronger near horizon and softer far away
    vec2 bend(vec2 p) {
      float r = length(p);
      if (r < rs) return vec2(0.0);
      float s = 0.9 / (r*r + 0.0005);
      // additional falloff
      s *= smoothstep(0.6, 3.0, 1.0/r);
      float a = atan(p.y,p.x) + s * 1.2;
      float rr = r + s * 0.25;
      return vec2(cos(a), sin(a)) * rr;
    }

    // simple pseudo-random for turbulence
    float hash(vec2 p) { p = vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3))); return fract(sin(p.x+p.y)*43758.5453123); }
    float noise(vec2 p){
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0,0.0));
      float c = hash(i + vec2(0.0,1.0));
      float d = hash(i + vec2(1.0,1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)*u.y*(1.0-u.x) + (d - b)*u.x*u.y;
    }

    void main(){
      vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
      uv.x *= resolution.x / resolution.y;
      vec2 p = uv * 2.0;
      float r = length(p);

      // bend the ray
      vec2 bp = bend(p);
      float br = length(bp);

      vec3 col = vec3(0.0);

      // event horizon
      if (r < rs*0.9) {
        col = vec3(0.0);
      } else if (br > diskInner && br < diskOuter) {
        float t = 1.0 - (br - diskInner) / (diskOuter - diskInner);
        float ang = atan(bp.y,bp.x);
        float rot = ang + time * (1.0 / sqrt(max(br,0.001))) * 0.9;
        // turbulence
        float turb = noise(vec2(br*4.0, ang*2.0 + time*0.5));
        float density = 0.5 + 0.5 * sin(rot * 8.0 + time * 3.0) + 0.25 * turb;
        // Doppler color: approaching side blue-ish, receding orange
        float doppler = 0.9 + 0.7 * cos(rot);
        float temp = pow(max(0.0, t * density * doppler), 0.85);
        vec3 spectral = mix(vec3(1.0,0.6,0.2), vec3(0.3,0.8,1.2), smoothstep(0.0,1.0,cos(rot)));
        col = spectral * temp;
        // photon ring boost
        float pr = abs(br - (rs*1.55));
        col += vec3(1.6,1.0,0.6) * exp(-pow(pr*28.0,2.0)) * 0.9;
      } else {
        // lensed background - faint
        col += vec3(0.01,0.02,0.04);
      }

      // stronger cinematic vignette and small bloom-like boost
      float vign = 1.0 - smoothstep(1.8, 3.0, r);
      col *= vign;
      // gentle filmic gamma
      col = pow(col, vec3(0.95));
      gl_FragColor = vec4(col,1.0);
    }
  `;

  const realisticVS = `
    varying vec2 vUv;
    void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `;

  return (
    <group>
      {/* accretion disk layers - placed slightly above the shader plane to avoid occlusion */}
      <mesh ref={meshRef} rotation-x={Math.PI/2} position-y={0.02}>
        <torusGeometry args={[2.0, 0.28, 128, 256]} />
        <shaderMaterial
          vertexShader={diskVertexShader}
          fragmentShader={diskFragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation-x={Math.PI/2} position-y={0.015}>
        <torusGeometry args={[1.5, 0.16, 128, 256]} />
        <shaderMaterial
          vertexShader={diskVertexShader}
          fragmentShader={diskFragmentShader}
          uniforms={{ time: { value: 0 } }}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* background shader plane (depthWrite disabled so disks remain visible) */}
      <mesh rotation-x={Math.PI/2}>
        <planeGeometry args={[20,20,1,1]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={realisticVS}
          fragmentShader={realisticFS}
          uniforms={{ time: { value: 0 }, resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) } }}
          side={THREE.DoubleSide}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Removed - no more spiraling particles

// Beautiful star field
function BeautifulStarField() {
  const starData = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const radius = 150 + Math.random() * 300;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      const brightness = 0.4 + Math.random() * 0.6;
      colors[i * 3] = brightness;
      colors[i * 3 + 1] = brightness * 0.9;
      colors[i * 3 + 2] = brightness;
    }
    
    return { positions, colors };
  }, []);
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={starData.positions.length / 3} array={starData.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={starData.colors.length / 3} array={starData.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
        map={createSoftParticleTexture() || undefined}
      />
    </points>
  );
}

// Main scene
function DramaticScene({ scrollProgress, currentSection }: { scrollProgress: number; currentSection?: string }) {
  return (
    <group>
      {/* <CinematicCamera scrollProgress={scrollProgress} currentSection={currentSection} /> */}
      <BeautifulStarField />
  <DramaticEventHorizon />
  <RealisticBlackHole />
      {/* Beautiful lighting */}
      <ambientLight intensity={0.05} />
      <pointLight position={[20, 10, 20]} intensity={0.3} color="#ff6600" distance={80} />
      <pointLight position={[-15, -5, 15]} intensity={0.2} color="#0066ff" distance={60} />
    </group>
  );
}

interface BlackHoleProps {
  scrollProgress: number;
  currentSection?: string;
}

export default function DramaticBlackHole({ scrollProgress, currentSection = 'home' }: BlackHoleProps) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ 
          position: [0, 25, 80], 
          fov: 35,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <color attach="background" args={['#000008']} />
        <fog attach="fog" args={['#000010', 80, 400]} />
        <DramaticScene scrollProgress={scrollProgress} currentSection={currentSection} />
      </Canvas>
    </div>
  );
}