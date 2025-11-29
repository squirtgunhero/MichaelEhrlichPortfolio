import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function SimpleCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        {/* Outer ring */}
        <div
          className="w-6 h-6 rounded-full border-2 border-slate-800"
          style={{
            mixBlendMode: 'difference',
          }}
        />
      </motion.div>
    </>
  );
}

