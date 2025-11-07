import { motion } from 'motion/react';
import { useEffect, useState, memo } from 'react';
import { sharedMouseTracker } from '../utils/performance';

export const HeroBackground = memo(function HeroBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Use shared mouse tracker to avoid multiple listeners
    const unsubscribe = sharedMouseTracker.subscribe((x, y) => {
      setMousePosition({
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      });
    });

    return unsubscribe;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(148, 163, 184, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
          scale: [1, 1.1, 1],
        }}
        transition={{
          x: { duration: 2, ease: 'easeOut' },
          y: { duration: 2, ease: 'easeOut' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(71, 85, 105, 0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: -mousePosition.x * 30,
          y: -mousePosition.y * 30,
          scale: [1, 1.15, 1],
        }}
        transition={{
          x: { duration: 2.5, ease: 'easeOut' },
          y: { duration: 2.5, ease: 'easeOut' },
          scale: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 },
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-slate-300/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Mist effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
          filter: 'blur(40px)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
});
