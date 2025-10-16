import React, { useRef, useEffect } from 'react';

const STAR_COUNT = 300;
const STAR_COLOR = 'rgba(255,255,255,0.95)';
const STAR_SIZE = 2.2;
const STAR_SPEED = 0.15;

function randomStar(width: number, height: number) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random(),
    dx: (Math.random() - 0.5) * STAR_SPEED,
    dy: (Math.random() - 0.5) * STAR_SPEED,
  };
}

export default function DriftingStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => randomStar(width, height));

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let star of starsRef.current) {
        star.x += star.dx;
        star.y += star.dy;
        // Wrap around edges
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
        ctx.beginPath();
        ctx.arc(star.x, star.y, STAR_SIZE, 0, 2 * Math.PI);
        ctx.fillStyle = STAR_COLOR;
        ctx.shadowColor = STAR_COLOR;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      requestAnimationFrame(animate);
    }
    animate();

    // Resize handler
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
      starsRef.current = Array.from({ length: STAR_COUNT }, () => randomStar(width, height));
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -20,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
}
