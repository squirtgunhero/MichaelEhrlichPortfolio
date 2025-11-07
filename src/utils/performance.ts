// Performance utilities for throttling and debouncing
import { useEffect, useRef, useState } from 'react';

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      inThrottle = true;
      lastResult = func.apply(this, args);
      setTimeout(() => (inThrottle = false), limit);
    }
    return lastResult;
  };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Shared mouse position tracker to avoid multiple listeners
class MouseTracker {
  private listeners = new Set<(x: number, y: number) => void>();
  private x = 0;
  private y = 0;
  private attached = false;

  private handleMouseMove = throttle((e: MouseEvent) => {
    this.x = e.clientX;
    this.y = e.clientY;
    this.listeners.forEach(listener => listener(this.x, this.y));
  }, 16); // ~60fps

  subscribe(callback: (x: number, y: number) => void) {
    this.listeners.add(callback);
    
    if (!this.attached) {
      window.addEventListener('mousemove', this.handleMouseMove as any);
      this.attached = true;
    }

    // Return current position immediately
    callback(this.x, this.y);

    return () => {
      this.listeners.delete(callback);
      if (this.listeners.size === 0 && this.attached) {
        window.removeEventListener('mousemove', this.handleMouseMove as any);
        this.attached = false;
      }
    };
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}

export const sharedMouseTracker = new MouseTracker();

// Intersection Observer hook helper
export function useIsVisible(ref: { current: HTMLElement | null }, options?: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}

