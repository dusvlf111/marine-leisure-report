/**
 * Leaflet 라이브러리 SSR 안전 초기화 유틸리티
 * 브라우저 환경에서만 Leaflet을 로드하고 설정합니다.
 */

import type { Map as LeafletMap, Icon } from 'leaflet';

// Leaflet 관련 타입들
export interface LeafletIconOptions {
  iconUrl: string;
  iconRetinaUrl?: string;
  shadowUrl?: string;
  iconSize?: [number, number];
  iconAnchor?: [number, number];
  popupAnchor?: [number, number];
  shadowSize?: [number, number];
  shadowAnchor?: [number, number];
}

// 브라우저 환경 체크
export const isBrowser = typeof window !== 'undefined';

// Leaflet 로드 상태 관리
let leafletLoaded = false;
let leafletLoadPromise: Promise<typeof import('leaflet')> | null = null;

/**
 * Leaflet 라이브러리를 안전하게 로드합니다.
 * SSR 환경에서는 null을 반환하고, 브라우저에서만 실제 라이브러리를 로드합니다.
 */
export async function loadLeaflet(): Promise<typeof import('leaflet') | null> {
  if (!isBrowser) {
    return null;
  }

  if (leafletLoaded) {
    return await import('leaflet');
  }

  if (leafletLoadPromise) {
    return leafletLoadPromise;
  }

  leafletLoadPromise = import('leaflet').then((L) => {
    leafletLoaded = true;
    return L;
  });

  return leafletLoadPromise;
}

/**
 * Leaflet 아이콘을 안전하게 구성합니다.
 * CDN 기반 아이콘을 사용하여 번들 크기를 최적화합니다.
 */
export async function configureLeafletIcons(customOptions?: Partial<LeafletIconOptions>): Promise<void> {
  const L = await loadLeaflet();
  if (!L) return;

  const defaultOptions: LeafletIconOptions = {
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
    ...customOptions
  };

  // 기본 아이콘 URL 메서드 삭제 (중요!)
  delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
  
  // 새로운 아이콘 옵션 적용
  L.Icon.Default.mergeOptions(defaultOptions);
}

/**
 * 커스텀 마커 아이콘을 생성합니다.
 */
export async function createCustomIcon(options: LeafletIconOptions): Promise<Icon | null> {
  const L = await loadLeaflet();
  if (!L) return null;

  return L.icon(options);
}

/**
 * 지도 인스턴스가 유효한지 확인합니다.
 */
export function isValidMapInstance(map: unknown): map is LeafletMap {
  return Boolean(map && typeof (map as Record<string, unknown>).getCenter === 'function');
}

/**
 * 지도 이벤트 리스너를 안전하게 제거합니다.
 */
export function cleanupMapEvents(map: LeafletMap | null): void {
  if (!map || !isValidMapInstance(map)) return;

  try {
    map.off();
    map.remove();
  } catch (error) {
    console.warn('지도 이벤트 정리 중 오류:', error);
  }
}

/**
 * Leaflet CSS를 동적으로 로드합니다.
 */
export function loadLeafletCSS(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isBrowser) {
      resolve();
      return;
    }

    // 이미 로드된 경우 체크
    const existingLink = document.querySelector('link[href*="leaflet"]');
    if (existingLink) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';

    link.onload = () => resolve();
    link.onerror = () => reject(new Error('Leaflet CSS 로드 실패'));

    document.head.appendChild(link);
  });
}

/**
 * 종합적인 Leaflet 초기화 함수
 * CSS 로드 + 아이콘 설정을 한번에 처리합니다.
 */
export async function initializeLeaflet(iconOptions?: Partial<LeafletIconOptions>): Promise<boolean> {
  if (!isBrowser) {
    return false;
  }

  try {
    // CSS와 라이브러리를 병렬로 로드
    await Promise.all([
      loadLeafletCSS(),
      loadLeaflet()
    ]);

    // 아이콘 설정
    await configureLeafletIcons(iconOptions);

    return true;
  } catch (error) {
    console.error('Leaflet 초기화 실패:', error);
    return false;
  }
}

/**
 * 지도 컴포넌트에서 사용할 훅 스타일 초기화
 */
export function useLeafletInit(iconOptions?: Partial<LeafletIconOptions>) {
  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState(null as string | null);

  React.useEffect(() => {
    initializeLeaflet(iconOptions)
      .then((success) => {
        if (success) {
          setIsReady(true);
        } else {
          setError('Leaflet 초기화 실패');
        }
      })
      .catch((err) => {
        setError(err.message || 'Leaflet 초기화 오류');
      });
  }, []);

  return { isReady, error };
}

// React import (조건부)
const React = isBrowser ? 
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('react') : 
  { useState: () => [false, () => {}], useEffect: () => {} };