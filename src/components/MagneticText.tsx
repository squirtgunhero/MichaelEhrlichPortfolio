import { useRef, useState, useEffect, ReactNode, memo } from 'react';
import { motion } from 'motion/react';
import { sharedMouseTracker } from '../utils/performance';

interface MagneticTextProps {
  children: ReactNode;
  strength?: number;
  range?: number;
  className?: string;
}

export const MagneticText = memo(function MagneticText({ children, strength = 0.15, range = 100, className = '' }: MagneticTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    // Use shared mouse tracker
    const unsubscribe = sharedMouseTracker.subscribe((mouseX, mouseY) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = mouseX - centerX;
      const distanceY = mouseY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Only apply magnetic effect if cursor is within range
      if (distance < range) {
        setIsNearby(true);
        const deltaX = distanceX * strength * (1 - distance / range);
        const deltaY = distanceY * strength * (1 - distance / range);
        setPosition({ x: deltaX, y: deltaY });
      } else {
        setIsNearby(false);
        setPosition({ x: 0, y: 0 });
      }
    });

    return unsubscribe;
  }, [strength, range]);

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 20,
        mass: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
});
