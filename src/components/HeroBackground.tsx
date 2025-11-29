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

      {/* Refractive wave 1 - top right periphery */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96"
        style={{
          background: 'radial-gradient(circle, rgba(119, 3, 204, 0.4) 0%, rgba(119, 3, 204, 0.2) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [-100, 150, -100],
          y: [-50, 100, -50],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Refractive wave 2 - bottom left periphery */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(119, 3, 204, 0.45) 0%, rgba(119, 3, 204, 0.25) 45%, transparent 65%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [100, -150, 100],
          y: [50, -100, 50],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Refractive wave 3 - right edge */}
      <motion.div
        className="absolute top-1/3 -right-24 w-80 h-[600px]"
        style={{
          background: 'linear-gradient(to left, rgba(119, 3, 204, 0.35) 0%, rgba(119, 3, 204, 0.2) 50%, transparent 80%)',
          filter: 'blur(50px)',
        }}
        animate={{
          y: [-80, 120, -80],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Refractive wave 4 - left edge */}
      <motion.div
        className="absolute bottom-1/4 -left-24 w-80 h-[500px]"
        style={{
          background: 'linear-gradient(to right, rgba(119, 3, 204, 0.38) 0%, rgba(119, 3, 204, 0.22) 50%, transparent 75%)',
          filter: 'blur(55px)',
        }}
        animate={{
          y: [100, -100, 100],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 6,
        }}
      />

      {/* Heat ripple effect - subtle distortion */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, transparent 0%, transparent 40%, rgba(119, 3, 204, 0.15) 70%, transparent 100%)',
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
