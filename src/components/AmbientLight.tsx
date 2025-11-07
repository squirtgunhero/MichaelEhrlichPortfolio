import { motion } from 'motion/react';

interface AmbientLightProps {
  delay?: number;
}

export function AmbientLight({ delay = 0 }: AmbientLightProps) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.5, delay }}
    >
      {/* Light sweep effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%', opacity: 0 }}
        whileInView={{ x: '200%', opacity: [0, 1, 0] }}
        viewport={{ once: true }}
        transition={{
          duration: 2.5,
          delay: delay + 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  );
}
