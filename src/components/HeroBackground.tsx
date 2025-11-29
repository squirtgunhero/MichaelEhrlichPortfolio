import { motion } from 'motion/react';
import { memo } from 'react';

export const HeroBackground = memo(function HeroBackground() {
  // Generate cubes for the wave - positioned around edges, avoiding center
  const cubes = Array.from({ length: 60 }, (_, i) => {
    // Create a wave pattern that flows around the edges
    const angle = (i / 60) * Math.PI * 2;
    const waveOffset = Math.sin(i * 0.3) * 0.15;
    
    // Position cubes in an elliptical pattern around edges
    // Using values > 0.6 to keep them away from center
    const distanceFromCenter = 0.65 + waveOffset;
    
    return {
      id: i,
      x: 50 + Math.cos(angle) * distanceFromCenter * 50, // Center at 50%
      y: 50 + Math.sin(angle) * distanceFromCenter * 50,
      delay: i * 0.05,
      size: 8 + Math.random() * 12,
      rotationSpeed: 15 + Math.random() * 10,
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      {/* Subtle cool-blue gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 1) 0%, rgba(219, 234, 254, 0.3) 100%)',
        }}
      />

      {/* Wave of semi-transparent cubes */}
      <div className="absolute inset-0">
        {cubes.map((cube) => (
          <motion.div
            key={cube.id}
            className="absolute"
            style={{
              left: `${cube.x}%`,
              top: `${cube.y}%`,
              width: cube.size,
              height: cube.size,
            }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.15, 0.25, 0.15, 0],
              rotate: [0, 360],
              scale: [0.8, 1, 1.1, 1, 0.8],
              x: [
                0,
                Math.cos((cube.id / 60) * Math.PI * 2) * 30,
                Math.cos((cube.id / 60) * Math.PI * 2 + Math.PI) * 20,
                0,
              ],
              y: [
                0,
                Math.sin((cube.id / 60) * Math.PI * 2) * 30,
                Math.sin((cube.id / 60) * Math.PI * 2 + Math.PI) * 20,
                0,
              ],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              delay: cube.delay,
              ease: 'easeInOut',
            }}
          >
            {/* Cube with refractive blur effect */}
            <div
              className="w-full h-full"
              style={{
                background:
                  cube.id % 3 === 0
                    ? 'linear-gradient(135deg, rgba(147, 197, 253, 0.4), rgba(196, 181, 253, 0.3))'
                    : cube.id % 3 === 1
                    ? 'linear-gradient(135deg, rgba(196, 181, 253, 0.4), rgba(147, 197, 253, 0.3))'
                    : 'linear-gradient(135deg, rgba(224, 231, 255, 0.4), rgba(221, 214, 254, 0.3))',
                borderRadius: '2px',
                filter: 'blur(4px)',
                backdropFilter: 'blur(8px)',
                boxShadow:
                  cube.id % 2 === 0
                    ? '0 0 20px rgba(147, 197, 253, 0.3)'
                    : '0 0 20px rgba(196, 181, 253, 0.3)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Additional subtle refractive distortion layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(147, 197, 253, 0.03) 70%, transparent 100%)',
          backdropFilter: 'blur(1px)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Soft vignette to keep center clean */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.6) 100%)',
        }}
      />
    </div>
  );
});
