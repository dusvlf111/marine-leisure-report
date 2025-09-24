'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// 단순한 로딩 컴포넌트
const MapLoading = () => (
  <div 
    style={{ height: '400px' }} 
    className="flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
  >
    <div className="text-center">
      <div className="w-8 h-8 mx-auto mb-2 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600">지도를 불러오는 중...</p>
    </div>
  </div>
);

// 단순한 에러 폴백 컴포넌트
const MapError = (props: any) => (
  <div 
    style={{ height: '400px' }} 
    className="flex items-center justify-center bg-red-50 rounded-lg border-2 border-red-200"
    onClick={() => props.onMapClick?.({ lat: 35.1595, lng: 129.1604 })}
  >
    <div className="text-center cursor-pointer">
      <div className="text-red-500 mb-2">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <p className="text-red-700 font-medium">지도를 불러올 수 없습니다</p>
      <p className="text-red-600 text-sm">클릭하여 기본 위치 선택</p>
    </div>
  </div>
);

// 매우 안전한 동적 로딩
const MapViewComponent = dynamic(
  () => import('./MapView').catch(() => ({ 
    default: () => <MapError /> 
  })),
  {
    ssr: false,
    loading: () => <MapLoading />
  }
);

// 최종 DynamicMapView
const DynamicMapView = (props: any) => {
  return (
    <div className="w-full">
      <Suspense fallback={<MapLoading />}>
        <MapViewComponent {...props} />
      </Suspense>
    </div>
  );
};

export default DynamicMapView;
