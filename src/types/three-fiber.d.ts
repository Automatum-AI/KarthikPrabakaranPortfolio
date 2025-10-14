// React Three Fiber global type declarations
// This file makes Three.js objects available as JSX elements

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Core Three.js Objects
      group: any
      scene: any
      
      // Geometry
      bufferGeometry: any
      sphereGeometry: any
      boxGeometry: any
      planeGeometry: any
      cylinderGeometry: any
      
      // Materials
      meshBasicMaterial: any
      meshStandardMaterial: any
      meshPhongMaterial: any
      pointsMaterial: any
      lineBasicMaterial: any
      shaderMaterial: any
      
      // Objects
      mesh: any
      points: any
      line: any
      lineSegments: any
      
      // Lights
      ambientLight: any
      directionalLight: any
      pointLight: any
      spotLight: any
      
      // Cameras
      perspectiveCamera: any
      orthographicCamera: any
      
      // Attributes & Buffers
      bufferAttribute: any
      float32BufferAttribute: any
      
      // Helpers
      axesHelper: any
      gridHelper: any
    }
  }
}