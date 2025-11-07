import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface BreathingContainerProps {
  children: ReactNode;
  className?: string;
}

export function BreathingContainer({ children, className = '' }: BreathingContainerProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.002, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
