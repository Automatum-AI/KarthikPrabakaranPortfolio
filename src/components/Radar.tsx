



import React, { useRef, useEffect, useState } from 'react';


export const Radar = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const sweepRef = useRef<SVGPathElement>(null);
  const [angle, setAngle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(300);

  // Animate sweep
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setAngle(a => (a + 2) % 360);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setSize(Math.max(180, Math.min(w, 340)));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Radar config
  const cx = size / 2, cy = size / 2, r = size * 0.4;
  const sweepLength = r;
  const sweepWidth = 60; // degrees
  const sweepColor = 'rgba(32,219,233,0.25)';
  const gridColor = '#20DBE9';
  const tickColor = '#fff';

  // Circular grid
  const gridCircles = [0.25, 0.5, 0.75, 1].map((factor, i) => (
    <circle key={factor} cx={cx} cy={cy} r={r * factor} stroke={gridColor} strokeWidth={1.5} fill="none" opacity={0.18 + i * 0.08} />
  ));

  // Radial grid lines
  const gridLines = [];
  for (let i = 0; i < 360; i += 30) {
    const rad = (i * Math.PI) / 180;
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    gridLines.push(
      <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={gridColor} strokeWidth={1} opacity={0.13} />
    );
  }

  // Tick marks
  const ticks = [];
  for (let i = 0; i < 360; i += 6) {
    const rad = (i * Math.PI) / 180;
    const x1 = cx + (r - size * 0.025) * Math.cos(rad);
    const y1 = cy + (r - size * 0.025) * Math.sin(rad);
    const x2 = cx + r * Math.cos(rad);
    const y2 = cy + r * Math.sin(rad);
    ticks.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={tickColor} strokeWidth={i % 30 === 0 ? 2 : 1} opacity={i % 30 === 0 ? 0.7 : 0.3} />
    );
  }

  // Sweep sector path
  const sweepRad = (angle * Math.PI) / 180;
  const sweepStart = sweepRad - (sweepWidth * Math.PI) / 360;
  const sweepEnd = sweepRad + (sweepWidth * Math.PI) / 360;
  const x1 = cx + sweepLength * Math.cos(sweepStart);
  const y1 = cy + sweepLength * Math.sin(sweepStart);
  const x2 = cx + sweepLength * Math.cos(sweepEnd);
  const y2 = cy + sweepLength * Math.sin(sweepEnd);
  const sweepPath = `M${cx},${cy} L${x1},${y1} A${sweepLength},${sweepLength} 0 0,1 ${x2},${y2} Z`;

  // Blips (scaled to size)
  const blips = [
    { r: r * 0.5, a: 40 },
    { r: r * 0.75, a: 80 },
    { r: r * 0.92, a: 120 },
    { r: r * 0.58, a: 200 },
    { r: r * 0.83, a: 300 }
  ].map((b, i) => {
    const rad = (b.a * Math.PI) / 180;
    const x = cx + b.r * Math.cos(rad);
    const y = cy + b.r * Math.sin(rad);
    return <circle key={i} cx={x} cy={y} r={size * 0.02} fill="#20DBE9" opacity={0.7} style={{ filter: 'drop-shadow(0 0 8px #20DBE9)' }} />;
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        marginTop: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style,
      }}
    >
      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', margin: '0 auto', background: 'none', maxHeight: '100%', maxWidth: '100%' }}
      >
        {/* Glowing sweep sector */}
        <path d={sweepPath} fill={sweepColor} ref={sweepRef} style={{ filter: 'blur(2px)' }} />
        {/* Grid circles */}
        {gridCircles}
        {/* Grid lines */}
        {gridLines}
        {/* Tick marks */}
        {ticks}
        {/* Blips */}
        {blips}
        {/* Sweeping line */}
        <line x1={cx} y1={cy} x2={cx + r * Math.cos(sweepRad)} y2={cy + r * Math.sin(sweepRad)} stroke="#20DBE9" strokeWidth={size * 0.012} opacity={0.8} style={{ filter: 'drop-shadow(0 0 8px #20DBE9)' }} />
        {/* Center dot */}
        <circle cx={cx} cy={cy} r={size * 0.033} fill="#20DBE9" opacity="0.9" style={{ filter: 'drop-shadow(0 0 8px #20DBE9)' }} />
      </svg>
    </div>
  );
};
