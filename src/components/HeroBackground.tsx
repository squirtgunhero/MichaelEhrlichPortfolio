import { motion } from 'motion/react';
import { memo } from 'react';

export const HeroBackground = memo(function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      {/* Extremely subtle gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(250, 250, 250, 1) 0%, rgba(248, 248, 248, 1) 100%)',
        }}
      />

      {/* Refractive wave 1 - top right */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 156, 189, 0.5) 0%, rgba(0, 156, 189, 0.25) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -200, 0],
          y: [0, 150, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Refractive wave 2 - bottom left */}
      <motion.div
        className="absolute bottom-0 left-0 w-[700px] h-[700px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 156, 189, 0.55) 0%, rgba(0, 156, 189, 0.3) 45%, transparent 65%)',
          filter: 'blur(90px)',
        }}
        animate={{
          x: [0, 200, 0],
          y: [0, -150, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Refractive wave 3 - top center */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 156, 189, 0.4) 0%, rgba(0, 156, 189, 0.2) 50%, transparent 80%)',
          filter: 'blur(70px)',
        }}
        animate={{
          y: [0, 100, 0],
          scaleX: [1, 1.2, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      {/* Refractive wave 4 - center floating */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 156, 189, 0.25) 0%, rgba(0, 156, 189, 0.12) 50%, transparent 75%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Heat ripple effect - subtle distortion */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, transparent 0%, transparent 40%, rgba(0, 156, 189, 0.15) 70%, transparent 100%)',
          filter: 'blur(40px)',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center protective vignette - keeps center perfectly clean */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, transparent 35%, rgba(255, 255, 255, 0.8) 80%, rgba(255, 255, 255, 0.95) 100%)',
        }}
      />
    </div>
  );
});
