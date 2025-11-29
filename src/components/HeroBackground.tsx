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
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          backdropFilter: 'blur(20px)',
        }}
        animate={{
          x: [-100, 150, -100],
          y: [-50, 100, -50],
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Refractive wave 2 - bottom left periphery */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(245, 245, 245, 0.5) 0%, transparent 65%)',
          filter: 'blur(50px)',
          backdropFilter: 'blur(25px)',
        }}
        animate={{
          x: [100, -150, 100],
          y: [50, -100, 50],
          scale: [1, 1.15, 1],
          opacity: [0.04, 0.09, 0.04],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      {/* Refractive wave 3 - right edge */}
      <motion.div
        className="absolute top-1/3 -right-24 w-80 h-[600px]"
        style={{
          background: 'linear-gradient(to left, rgba(252, 252, 252, 0.3) 0%, transparent 80%)',
          filter: 'blur(35px)',
          backdropFilter: 'blur(15px)',
        }}
        animate={{
          y: [-80, 120, -80],
          opacity: [0.02, 0.06, 0.02],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 10,
        }}
      />

      {/* Refractive wave 4 - left edge */}
      <motion.div
        className="absolute bottom-1/4 -left-24 w-80 h-[500px]"
        style={{
          background: 'linear-gradient(to right, rgba(249, 249, 249, 0.35) 0%, transparent 75%)',
          filter: 'blur(45px)',
          backdropFilter: 'blur(18px)',
        }}
        animate={{
          y: [100, -100, 100],
          opacity: [0.03, 0.07, 0.03],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 15,
        }}
      />

      {/* Heat ripple effect - very subtle distortion */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.02) 70%, transparent 100%)',
          backdropFilter: 'blur(1px)',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 12,
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
