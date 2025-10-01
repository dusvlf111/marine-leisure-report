import { renderHook } from '@testing-library/react';
import { 
  useReducedMotion,
  getAnimationClass,
  OPTIMIZED_ANIMATIONS,
  ANIMATION_DELAYS,
  AnimationPerformanceMonitor
} from '../../src/lib/animations/optimizations';

describe('Animation Optimizations', () => {
  describe('useReducedMotion', () => {
    it('should return false by default', () => {
      const { result } = renderHook(() => useReducedMotion());
      expect(result.current).toBe(false);
    });

    it('should respond to matchMedia changes', () => {
      const matchMedia = window.matchMedia;
      
      // Mock matchMedia
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const { result } = renderHook(() => useReducedMotion());
      expect(result.current).toBe(true);

      // Cleanup
      window.matchMedia = matchMedia;
    });
  });

  describe('getAnimationClass', () => {
    it('should return correct animation class', () => {
      const className = getAnimationClass('fadeIn');
      expect(className).toBe(OPTIMIZED_ANIMATIONS.fadeIn + ' ' + ANIMATION_DELAYS.none);
    });

    it('should handle delays', () => {
      const className = getAnimationClass('fadeIn', { delay: 'medium' });
      expect(className).toBe(OPTIMIZED_ANIMATIONS.fadeIn + ' ' + ANIMATION_DELAYS.medium);
    });

    it('should handle reduced motion', () => {
      const className = getAnimationClass('fadeIn', { reducedMotion: true });
      expect(className).toBe('transition-none');
    });
  });

  describe('AnimationPerformanceMonitor', () => {
    let monitor: AnimationPerformanceMonitor;

    beforeEach(() => {
      monitor = AnimationPerformanceMonitor.getInstance();
      monitor.reset();
    });

    it('should be a singleton', () => {
      const monitor2 = AnimationPerformanceMonitor.getInstance();
      expect(monitor).toBe(monitor2);
    });

    it('should measure animation duration', () => {
      const startTime = monitor.startMeasure('test');
      
      // Simulate time passage
      jest.advanceTimersByTime(100);
      
      monitor.endMeasure('test', startTime);
      const stats = monitor.getStats('test');
      
      expect(stats).toBeTruthy();
      if (stats) {
        expect(stats.avg).toBeGreaterThan(0);
        expect(stats.max).toBeGreaterThan(0);
      }
    });

    it('should handle multiple measurements', () => {
      const durations = [10, 20, 30];
      
      durations.forEach(duration => {
        const start = monitor.startMeasure('test');
        jest.advanceTimersByTime(duration);
        monitor.endMeasure('test', start);
      });

      const stats = monitor.getStats('test');
      expect(stats).toBeTruthy();
      if (stats) {
        expect(stats.avg).toBe(20); // (10 + 20 + 30) / 3
        expect(stats.max).toBe(30);
      }
    });

    it('should return null for unknown animations', () => {
      const stats = monitor.getStats('unknown');
      expect(stats).toBeNull();
    });

    it('should reset measurements', () => {
      const start = monitor.startMeasure('test');
      monitor.endMeasure('test', start);
      monitor.reset();
      
      const stats = monitor.getStats('test');
      expect(stats).toBeNull();
    });
  });
});