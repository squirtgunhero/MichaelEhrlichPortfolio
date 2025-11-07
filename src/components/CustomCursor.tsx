import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useVelocity } from 'motion/react';
import { throttle } from '../utils/performance';

export function CustomCursor() {
  const [isIdle, setIsIdle] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringMedia, setIsHoveringMedia] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [movementBurst, setMovementBurst] = useState(0);

  // Core position tracking - instant follow
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Velocity tracking for burst detection
  const velocityX = useVelocity(cursorX);
  const velocityY = useVelocity(cursorY);

  const lastVelocityRef = useRef(0);
  const burstTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Check for touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkTouchDevice();
    checkReducedMotion();

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect movement bursts for halo expansion
  useEffect(() => {
    if (isTouchDevice) return;

    const checkVelocity = () => {
      const vx = velocityX.get();
      const vy = velocityY.get();
      const currentSpeed = Math.sqrt(vx * vx + vy * vy);

      // Detect burst: speed increased significantly
      if (currentSpeed > lastVelocityRef.current + 500) {
        setMovementBurst(prev => prev + 1);
        
        // Clear previous timeout
        if (burstTimeoutRef.current) {
          clearTimeout(burstTimeoutRef.current);
        }
        
        // Reset burst after animation
        burstTimeoutRef.current = setTimeout(() => {
          setMovementBurst(0);
        }, 400);
      }

      lastVelocityRef.current = currentSpeed * 0.9; // Decay
      requestAnimationFrame(checkVelocity);
    };

    const rafId = requestAnimationFrame(checkVelocity);

    return () => {
      cancelAnimationFrame(rafId);
      if (burstTimeoutRef.current) {
        clearTimeout(burstTimeoutRef.current);
      }
    };
  }, [velocityX, velocityY, isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;

    let idleTimer: ReturnType<typeof setTimeout>;

    // Instant cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      setIsIdle(false);

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 1500);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]');
      
      // Check for media elements (video/images)
      const isMedia = 
        target.tagName === 'VIDEO' ||
        target.tagName === 'IMG' ||
        target.closest('video') ||
        target.closest('img');
      
      setIsHovering(!!isInteractive);
      setIsHoveringMedia(!!isMedia);
      
      // Detect if hovering over dark content
      if (isMedia) {
        const mediaEl = target.tagName === 'VIDEO' || target.tagName === 'IMG' 
          ? target 
          : target.closest('video, img');
        
        if (mediaEl) {
          // Simple heuristic: check if element has dark background
          const computedStyle = window.getComputedStyle(mediaEl);
          const bgColor = computedStyle.backgroundColor;
          
          // Check parent container background
          const parent = mediaEl.parentElement;
          const parentBg = parent ? window.getComputedStyle(parent).backgroundColor : '';
          
          // If we have dark backgrounds, use light halo
          setIsDark(bgColor.includes('26, 26, 26') || parentBg.includes('26, 26, 26'));
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const wasInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]');
      
      const wasMedia = 
        target.tagName === 'VIDEO' ||
        target.tagName === 'IMG' ||
        target.closest('video') ||
        target.closest('img');
      
      if (wasInteractive) setIsHovering(false);
      if (wasMedia) {
        setIsHoveringMedia(false);
        setIsDark(false);
      }
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(idleTimer);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  const coreSize = 6;
  const haloSize = 32;

  // Determine halo color based on content luminance
  const haloColor = isHoveringMedia 
    ? (isDark 
        ? 'rgba(255, 255, 255, 0.25)' // White on dark
        : 'rgba(100, 100, 100, 0.15)') // Graphite on light
    : 'rgba(148, 163, 184, 0.2)'; // Default slate

  return (
    <>
      {/* Energy Halo - expands with movement bursts */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Main breathing halo */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            width: haloSize,
            height: haloSize,
            marginLeft: -haloSize / 2,
            marginTop: -haloSize / 2,
            background: `radial-gradient(circle, ${haloColor}, transparent 70%)`,
          }}
          animate={{
            scale: isMouseDown
              ? 0.5
              : movementBurst > 0
              ? [1, 1.4, 1]
              : isIdle
              ? [1, 1.15, 1]
              : 1,
            opacity: isMouseDown
              ? 0.3
              : movementBurst > 0
              ? [0.6, 0.8, 0.5]
              : isIdle
              ? [0.3, 0.5, 0.3]
              : isHoveringMedia
              ? 0.7
              : 0.4,
          }}
          transition={{
            scale: movementBurst > 0
              ? {
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }
              : isIdle
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : {
                  duration: 0.25,
                  ease: 'easeOut',
                },
            opacity: movementBurst > 0
              ? {
                  duration: 0.35,
                  ease: 'easeOut',
                }
              : isIdle
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : {
                  duration: 0.3,
                  ease: 'easeOut',
                },
          }}
        />

        {/* Click pulse - dissipates quickly */}
        {isMouseDown && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              width: haloSize,
              height: haloSize,
              marginLeft: -haloSize / 2,
              marginTop: -haloSize / 2,
              background: `radial-gradient(circle, ${haloColor}, transparent 60%)`,
            }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{
              scale: 2,
              opacity: 0,
            }}
            transition={{
              duration: 0.18,
              ease: 'easeOut',
            }}
          />
        )}
      </motion.div>

      {/* Core Dot - instant follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: coreSize,
          height: coreSize,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            backgroundColor: isHoveringMedia && isDark 
              ? 'rgba(255, 255, 255, 0.9)' 
              : 'rgba(30, 41, 59, 0.85)',
            boxShadow: isHoveringMedia && isDark
              ? '0 0 8px rgba(255, 255, 255, 0.4)'
              : '0 0 4px rgba(30, 41, 59, 0.3)',
          }}
          animate={{
            scale: isMouseDown
              ? 0.5
              : isHovering
              ? 1.2
              : isIdle
              ? [1, 1.1, 1]
              : 1,
            opacity: isMouseDown
              ? 0.6
              : isIdle
              ? [0.85, 0.95, 0.85]
              : 0.9,
          }}
          transition={{
            scale: isMouseDown
              ? {
                  duration: 0.08,
                  ease: 'easeOut',
                }
              : isIdle
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : {
                  duration: 0.15,
                  ease: 'easeOut',
                },
            opacity: isIdle
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : {
                  duration: 0.2,
                  ease: 'easeOut',
                },
            backgroundColor: {
              duration: 0.25,
              ease: 'easeOut',
            },
          }}
        />
      </motion.div>
    </>
  );
}
