import { useEffect, useState } from 'react';

/**
 * 최적화된 애니메이션 유틸리티
 */

// 하드웨어 가속을 위한 transform 클래스
export const HARDWARE_ACCELERATED = {
  // 기본 하드웨어 가속 클래스
  base: 'will-change-transform',
  
  // 3D 변환을 사용하는 요소
  transform3d: 'transform-gpu',
  
  // 애니메이션이 있는 요소
  animated: 'will-change-opacity will-change-transform',
  
  // 스크롤 성능 최적화
  scroll: 'will-change-scroll-position',
};

// 성능 최적화된 애니메이션 클래스
export const OPTIMIZED_ANIMATIONS = {
  // 페이드 인/아웃
  fadeIn: 'animate__animated animate__fadeIn animate-gpu',
  fadeOut: 'animate__animated animate__fadeOut animate-gpu',
  
  // 슬라이드
  slideIn: 'animate__animated animate__slideInUp animate-gpu',
  slideOut: 'animate__animated animate__slideOutDown animate-gpu',
  
  // 바운스
  bounce: 'animate__animated animate__bounce animate-gpu',
  
  // 셰이크 (오류 표시용)
  shake: 'animate__animated animate__shakeX animate-gpu',
};

// 애니메이션 지연 유틸리티
export const ANIMATION_DELAYS = {
  none: '',
  short: 'animate-delay-100',
  medium: 'animate-delay-200',
  long: 'animate-delay-300',
};

// 디바이스 성능에 따른 애니메이션 조정 훅
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
}

// 조건부 애니메이션 클래스 생성기
export function getAnimationClass(
  animationName: keyof typeof OPTIMIZED_ANIMATIONS,
  options?: {
    delay?: keyof typeof ANIMATION_DELAYS;
    reducedMotion?: boolean;
  }
): string {
  const { delay = 'none', reducedMotion = false } = options || {};
  
  if (reducedMotion) {
    // 애니메이션 비활성화 시 즉시 최종 상태로
    return 'transition-none';
  }
  
  return `${OPTIMIZED_ANIMATIONS[animationName]} ${ANIMATION_DELAYS[delay]}`;
}

// CSS 트랜스폼 최적화 유틸리티
export const optimizeTransforms = {
  // translate3d 사용
  translate: (x: number, y: number) => `translate3d(${x}px, ${y}px, 0)`,
  
  // scale3d 사용
  scale: (scale: number) => `scale3d(${scale}, ${scale}, 1)`,
  
  // rotate3d 사용
  rotate: (degrees: number) => `rotate3d(0, 0, 1, ${degrees}deg)`,
};

// 애니메이션 성능 모니터링
export class AnimationPerformanceMonitor {
  private static instance: AnimationPerformanceMonitor;
  private measurements: { [key: string]: number[] } = {};
  
  private constructor() {}
  
  static getInstance(): AnimationPerformanceMonitor {
    if (!AnimationPerformanceMonitor.instance) {
      AnimationPerformanceMonitor.instance = new AnimationPerformanceMonitor();
    }
    return AnimationPerformanceMonitor.instance;
  }
  
  // 프레임 시간 측정 시작
  startMeasure(animationId: string): number {
    return performance.now();
  }
  
  // 프레임 시간 측정 종료
  endMeasure(animationId: string, startTime: number): void {
    const duration = performance.now() - startTime;
    
    if (!this.measurements[animationId]) {
      this.measurements[animationId] = [];
    }
    
    this.measurements[animationId].push(duration);
    
    // 성능 문제가 있는 경우 콘솔에 경고
    if (duration > 16.67) { // 60fps 기준
      console.warn(`Animation performance warning for ${animationId}: ${duration.toFixed(2)}ms`);
    }
  }
  
  // 성능 통계 가져오기
  getStats(animationId: string): { avg: number; max: number } | null {
    const measurements = this.measurements[animationId];
    if (!measurements || measurements.length === 0) return null;
    
    return {
      avg: measurements.reduce((a, b) => a + b, 0) / measurements.length,
      max: Math.max(...measurements),
    };
  }
  
  // 모든 측정 초기화
  reset(): void {
    this.measurements = {};
  }
}