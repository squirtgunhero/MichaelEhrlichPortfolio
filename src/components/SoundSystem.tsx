import { useEffect, useRef, memo } from 'react';
import { throttle, debounce } from '../utils/performance';

// Ultra-subtle ambient sound system using Web Audio API
export const SoundSystem = memo(function SoundSystem() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    // Check if user prefers reduced motion (also applies to sound)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const initAudioContext = () => {
      if (!audioContextRef.current && !userInteractedRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        userInteractedRef.current = true;
      }
    };

    // Initialize on first user interaction
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, initAudioContext, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, initAudioContext);
      });
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play a subtle chime (very low volume, high frequency)
  const playChime = (frequency: number = 800, duration: number = 0.15, volume: number = 0.02) => {
    if (!audioContextRef.current || !userInteractedRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  };

  // Play a subtle hum (very low frequency, ambient)
  const playHum = (frequency: number = 120, duration: number = 0.3, volume: number = 0.015) => {
    if (!audioContextRef.current || !userInteractedRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  };

  useEffect(() => {
    // Throttled hover sounds on interactive elements
    const handleMouseOver = throttle((e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        playChime(900, 0.12, 0.018);
      }
    }, 150); // Throttle to once per 150ms

    // Click/interaction sounds
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        playHum(140, 0.25, 0.012);
      }
    };

    // Debounced section transition sounds
    const handleScroll = debounce(() => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        // Check if we just entered this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const wasInSection = section.getAttribute('data-sound-played');
          if (!wasInSection) {
            playChime(1200, 0.2, 0.01);
            section.setAttribute('data-sound-played', 'true');
          }
        } else {
          section.removeAttribute('data-sound-played');
        }
      });
    }, 100);

    document.addEventListener('mouseover', handleMouseOver as any);
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll as any);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver as any);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll as any);
    };
  }, []);

  return null; // This component doesn't render anything
});
