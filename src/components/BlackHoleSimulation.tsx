// src/components/BlackHoleSimulation.tsx
// @ts-nocheck
/**
 * Real-time black hole simulation component (TypeScript + React + three)
 * Based on the ray-tracing / geodesic approach described here:
 *   Christian Matabaro — "Building a Real-Time Black Hole Simulation". (Medium)
 *   https://medium.com/@christianmatabaro92/...
 *
 * Paste this file into src/components/BlackHoleSimulation.tsx and render <BlackHoleSimulation />.
 *
 * Notes:
 * - This shader uses a simplified Schwarzschild approximation and RK4-in-shader integration.
 * - Increase `maxIterations` for more accurate lensing at the cost of performance.
 * - Use lower resolution / smaller canvas or reduce iterations for mobile.
 */

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

/* -----------------
   GLSL SHADERS
   ----------------- */

/** Vertex shader for full-screen quad */
const quadVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/**
 * Fragment shader:
 * - Implements simplified geodesic integrator (RK4-ish) for light ray bending around a Schwarzschild-like object.
 * - Uses adaptive step size and early exit (event horizon absorption / escape to background).
 * - Renders accretion disk (optional) by sampling disk function when ray passes through disk radii.
 *
 * Uniforms:
 *  - uTime: elapsed time (seconds)
 *  - uResolution: canvas resolution
 *  - uCameraPos: camera position in world-space
 *  - uMaxIterations: maximum integration steps
 *  - uStepSize: base integration step
 *  - uAccretionToggle: 0.0/1.0
 *  - uBackground: sampler2D for distant star background (optional)
 */
const quadFragment = `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uCameraPos;
  uniform int uMaxIterations;
  uniform float uStepSize;
  uniform float uAccretionToggle;
  uniform sampler2D uBackground;

  #define PI 3.141592653589793
  // Schwarzschild-like event horizon radius (in shader space)
  const float EVENT_HORIZON_R = 1.0;
  const float BACKGROUND_DIST = 10000.0;

  struct Ray {
    vec3 pos;
    vec3 vel;
  };

  // small epsilon for numeric checks
  float eps = 1e-5;

  // A simplified acceleration representing relativistic curvature.
  // This follows the article's simplified model: acceleration ~ -(3/2) * h^2 * pos / |pos|^5
  vec3 geodesic_accel(vec3 position, float h2) {
    float r = length(position);
    // avoid divide by zero
    float denom = max(pow(r, 5.0), 1e-6);
    return -(3.0/2.0) * h2 * position / denom;
  }

  // Ray integration using a compact RK4-like step for better stability
  void integrateStep(inout vec3 pos, inout vec3 vel, float step, float h2) {
    // k1
    vec3 a1 = geodesic_accel(pos, h2);
    vec3 v1 = vel;
    // k2
    vec3 a2 = geodesic_accel(pos + 0.5 * step * v1, h2);
    vec3 v2 = vel + 0.5 * step * a1;
    // k3
    vec3 a3 = geodesic_accel(pos + 0.5 * step * v2, h2);
    vec3 v3 = vel + 0.5 * step * a2;
    // k4
    vec3 a4 = geodesic_accel(pos + step * v3, h2);
    vec3 v4 = vel + step * a3;

    // combine (position and velocity)
    pos += (step / 6.0) * (v1 + 2.0*v2 + 2.0*v3 + v4);
    vel += (step / 6.0) * (a1 + 2.0*a2 + 2.0*a3 + a4);
  }

  // Sample a simple accretion disk color: radius-based temperature + Doppler shift by azimuth
  vec3 sampleAccretionDiskColor(vec3 hitPos, vec3 hitVel) {
    float r = length(hitPos.xy); // disk lies on z=0 plane in this simplified model
    // disk inner/outer radii
    float inner = 0.7;
    float outer = 2.6;
    if (r < inner || r > outer) return vec3(0.0);

    // temperature proxy (hotter inside)
    float t = 1.0 - (r - inner) / (outer - inner);
    t = pow(clamp(t, 0.0, 1.0), 0.8);

    // azimuth
    float theta = atan(hitPos.y, hitPos.x);

    // Doppler approximation: use tangential direction sign
    float doppler = 0.5 + 0.5 * cos(theta + uTime * 0.12);

    // color mix: blue (approach) -> orange (recede)
    vec3 blue = vec3(0.08, 0.6, 1.2) * (1.0 + 0.8 * t);
    vec3 orange = vec3(1.3, 0.5, 0.12) * (0.8 + 0.6 * t);
    vec3 color = mix(orange, blue, doppler);

    // add turbulence filaments
    color += 0.12 * vec3(
      sin(r * 20.0 + theta * 6.0 + uTime * 2.3),
      cos(r * 18.0 + uTime * 1.9),
      sin(theta * 9.0 + uTime * 1.2)
    );

    // apply gamma-ish mapping
    return pow(abs(color), vec3(0.95));
  }

  // Background sampling (fallback)
  vec3 sampleBackground(vec2 uv) {
    // if a texture is bound, sample it; otherwise produce a faint starfield
    #ifdef USE_BACKGROUND
      return texture2D(uBackground, uv * 0.5 + 0.5).rgb;
    #else
      // procedural faint background (tiny gradient + speckles)
      float g = 0.03 + 0.02 * (1.0 - length(uv - 0.5));
      float stars = step(0.9996, fract(sin(dot(uv * 1000.0, vec2(12.9898,78.233))) * 43758.5453));
      return vec3(g) + vec3(stars * 1.0);
    #endif
  }

  // Main ray-tracing function - returns color
  vec3 traceRay(vec3 camPos, vec3 rayDir) {
    // initialize ray with small offset to avoid immediate horizon collision
    vec3 pos = camPos;
    vec3 vel = normalize(rayDir);

    // conserved angular momentum magnitude squared approximation:
    vec3 perpendicular = cross(pos, vel);
    float h2 = dot(perpendicular, perpendicular);

    // Integration loop
    for(int i = 0; i < 1024; i++) {
      if (i >= uMaxIterations) break;

      float r = length(pos);
      if (r <= EVENT_HORIZON_R) {
        // got swallowed: return black
        return vec3(0.0);
      }
      if (r >= BACKGROUND_DIST) {
        // escaped: sample background by projecting direction onto sky
        // compute simple background uv from vel
        vec2 skyUV = vec2(atan(vel.y, vel.x) / (2.0*PI) + 0.5, asin(vel.z) / PI + 0.5);
        return sampleBackground(skyUV);
      }

      // Adaptive step: proportional to r^2 * base step (larger steps when far)
      float step = max(0.0004, uStepSize * r * r);

      // Before taking the step, check if we cross accretion disk plane (z ~= 0)
      // If so and disk is enabled, sample disk color (adds emission)
      if (uAccretionToggle > 0.5 && abs(pos.z) < 0.06 && length(pos.xy) > 0.6 && length(pos.xy) < 3.0) {
        // approximate "hit" color from disk
        vec3 diskCol = sampleAccretionDiskColor(pos, vel);
        // disk emits; mix emission with background depending on local optical depth
        return diskCol;
      }

      // RK4 integration step
      integrateStep(pos, vel, step, h2);
    }

    // fallback: if we never escaped or were absorbed, return black
    return vec3(0.0);
  }

  void main() {
    // normalized device coordinates
    vec2 ndc = (vUv * uResolution - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
    // set up a simple pinhole camera looking at origin
    vec3 camPos = uCameraPos;
    vec3 lookAt = vec3(0.0, 0.0, 0.0);
    vec3 forward = normalize(lookAt - camPos);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
    vec3 up = cross(forward, right);

    // field of view
    float fov = 40.0; // degrees
    float fovRad = radians(fov);
    // construct ray direction through screen plane
    vec3 rayDir = normalize(forward + ndc.x * right * tan(fovRad * 0.5) * (uResolution.x / uResolution.y) + ndc.y * up * tan(fovRad * 0.5));

    vec3 color = traceRay(camPos, rayDir);

    // small filmic exposure & tonemapping
    color = color / (color + vec3(1.0));
    // subtle vignette & gamma
    float vign = smoothstep(0.9, 0.2, length(vUv - 0.5));
    color *= mix(1.0, 0.7, vign);
    color = pow(color, vec3(0.9));

    gl_FragColor = vec4(color, 1.0);
  }
`;

/* -----------------
   React/Three Component
   ----------------- */

type Props = {
  width?: number | string;
  height?: number | string;
  // controls: tuning values
  maxIterations?: number;
  stepSize?: number;
  accretion?: boolean;
  backgroundUrl?: string | null;
};

function FullscreenQuad({ material }: { material: THREE.ShaderMaterial }) {
  return (
    <mesh>
      <planeBufferGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default function BlackHoleSimulation({
  width = "100%",
  height = "100%",
  maxIterations = 600,
  stepSize = 0.0025,
  accretion = true,
  backgroundUrl = null,
}: Props) {
  // we'll create the shader material once
  const shaderMat = useMemo(() => {
    const uniforms: Record<string, any> = {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(800, 600) },
      uCameraPos: { value: new THREE.Vector3(0.0, 0.0, 6.5) }, // camera sits on +z looking to origin
      uMaxIterations: { value: maxIterations },
      uStepSize: { value: stepSize },
      uAccretionToggle: { value: accretion ? 1.0 : 0.0 },
      uBackground: { value: null },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader: quadVertex,
      fragmentShader: quadFragment,
      uniforms,
      depthWrite: false,
    });

    return mat;
  }, [maxIterations, stepSize, accretion]);

  // optionally load background texture
  const backgroundTex = useLoader(TextureLoader, backgroundUrl || "");

  // keep refs to update
  const matRef = useRef<THREE.ShaderMaterial | null>(null);

  // small wrapper to update uniforms per frame
  function SceneContent() {
    const { size, viewport } = useThree();
    const r = useRef(shaderMat);

    // initialize resolution uniform
    useMemo(() => {
      shaderMat.uniforms.uResolution.value.set(size.width, size.height);
    }, [size]);

    // attach background if available
    useMemo(() => {
      if (backgroundUrl && backgroundTex) {
        shaderMat.uniforms.uBackground.value = backgroundTex;
      }
    }, [backgroundTex, backgroundUrl]);

    // update camera pos (could be animated)
    useFrame(({ clock, camera }) => {
      const t = clock.getElapsedTime();
      shaderMat.uniforms.uTime.value = t;
      // optional camera orbiting for a cinematic effect
      const orbitRadius = 6.5;
      const camX = Math.sin(t * 0.06) * orbitRadius * 0.05; // slight side wobble
      const camY = Math.sin(t * 0.02) * 0.15;
      const camZ = 6.5 + Math.cos(t * 0.02) * 0.06;
      shaderMat.uniforms.uCameraPos.value.set(camX, camY, camZ);
      shaderMat.uniforms.uMaxIterations.value = Math.min(1024, Math.max(64, maxIterations));
      shaderMat.uniforms.uStepSize.value = stepSize;
      shaderMat.uniforms.uAccretionToggle.value = accretion ? 1.0 : 0.0;
    });

    return <FullscreenQuad material={shaderMat} />;
  }

  return (
    <div style={{ width, height, position: "relative" }}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        camera={{ position: [0, 0, 6.5], fov: 40 }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
