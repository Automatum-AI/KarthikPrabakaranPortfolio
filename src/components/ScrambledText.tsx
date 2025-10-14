import { useState, useEffect } from 'react';

interface ScrambledTextProps {
  text: string;
  isActive: boolean;
  className?: string;
  scrambleDuration?: number;
  revealDelay?: number;
  onComplete?: () => void;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`';

export function ScrambledText({ 
  text, 
  isActive, 
  className = '', 
  scrambleDuration = 1500,
  revealDelay = 0,
  onComplete 
}: ScrambledTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [charStates, setCharStates] = useState<number[]>([]);
  const [intensity, setIntensity] = useState(1);

  useEffect(() => {
    if (!isActive) return;

    // Initialize character states - each character needs multiple scrambles before revealing
    const states = new Array(text.length).fill(0);
    setCharStates(states);
    
    const startTime = Date.now();
    const totalDuration = scrambleDuration;
    
    // Cinematic animation loop
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      
      // Easing function for cinematic feel - slow start, fast middle, slow end
      const easeInOutQuad = (t: number): number => {
        return t < 0.5 
          ? 2 * t * t 
          : 1 - Math.pow(-2 * t + 2, 2) / 2;
      };
      
      const easedProgress = easeInOutQuad(progress);
      
      // Update intensity for glow effect
      setIntensity(1 + Math.sin(progress * Math.PI * 4) * 0.3);
      
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            
            // Calculate when this character should start revealing
            // Stagger the reveal across characters with a wave effect
            const charStartProgress = (index / text.length) * 0.7; // First 70% of animation
            const charEndProgress = charStartProgress + 0.3; // Each char takes 30% to reveal
            
            // Check if this character should be revealed
            if (easedProgress >= charEndProgress) {
              return text[index];
            }
            
            // Check if this character is in the revealing phase
            if (easedProgress >= charStartProgress) {
              const charProgress = (easedProgress - charStartProgress) / 0.3;
              
              // Multiple rapid scrambles before final reveal
              // More scrambles at the start, fewer as it settles
              const scrambleSpeed = Math.max(1, Math.floor((1 - charProgress) * 8));
              
              // Occasional flash of correct character for dramatic effect
              if (Math.random() > 0.7 && charProgress > 0.5) {
                return text[index];
              }
              
              // Scramble this character
              if (Math.floor(Date.now() / 50) % scrambleSpeed === 0) {
                return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
              }
              
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            }
            
            // Pre-reveal phase - rapid scrambling
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('');
      });

      // Animation complete
      if (progress >= 1) {
        clearInterval(interval);
        setDisplayText(text);
        setIntensity(1);
        onComplete?.();
      }
    }, 30); // 30ms for smooth 33fps animation

    return () => clearInterval(interval);
  }, [isActive, text, scrambleDuration]);

  return (
    <span 
      className={className}
      style={{
        filter: `drop-shadow(0 0 ${intensity * 8}px currentColor)`,
        transition: 'filter 0.1s ease-out'
      }}
    >
      {displayText}
    </span>
  );
}