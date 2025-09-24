// Jest DOM 확장 및 전역 설정
import '@testing-library/jest-dom'

// React Leaflet 모킹 (SSR 이슈 방지)
jest.mock('react-leaflet', () => ({
  MapContainer: jest.fn().mockImplementation(({ children }) => children),
  TileLayer: jest.fn().mockImplementation(() => null),
  Marker: jest.fn().mockImplementation(({ children }) => children),
  Polygon: jest.fn().mockImplementation(({ children }) => children),
  Popup: jest.fn().mockImplementation(({ children }) => children),
  useMap: () => ({ 
    getCenter: () => ({ lat: 35.1596, lng: 129.1600 }),
    getZoom: () => 13,
    setView: jest.fn(),
    addLayer: jest.fn(),
    removeLayer: jest.fn()
  }),
  useMapEvents: () => null
}))

// Leaflet 라이브러리 모킹
jest.mock('leaflet', () => ({
  icon: () => ({
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png'
  }),
  marker: () => ({
    addTo: jest.fn(),
    bindPopup: jest.fn()
  }),
  polygon: () => ({
    addTo: jest.fn(),
    setStyle: jest.fn()
  })
}))

// Next.js 동적 임포트 모킹
jest.mock('next/dynamic', () => {
  return function mockDynamic(importFunc) {
    const Component = importFunc()
    return Component.default || Component
  }
})

// Next.js navigation 모킹
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/',
}))

// window.matchMedia 모킹 (반응형 테스트용)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// IntersectionObserver 모킹 (애니메이션 테스트용)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}
