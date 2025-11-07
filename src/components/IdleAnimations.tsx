import { useEffect, useState, memo } from 'react';
import { motion } from 'motion/react';
import { throttle } from '../utils/performance';

export const IdleAnimations = memo(function IdleAnimations() {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = throttle(() => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 10000); // 10 seconds
    }, 200); // Throttle to once per 200ms

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer as any);
    });

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer as any);
      });
    };
  }, []);

  if (!isIdle) return null;

  return (
    <>
      {/* Breathing gradient overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-50/20 via-transparent to-slate-100/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Ambient particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-slate-300/20 rounded-full pointer-events-none z-[1]"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
            y: [0, -80, -160],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 1.2,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
});
