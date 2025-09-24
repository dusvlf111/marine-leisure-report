'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loading } from '../ui/Loading';
import { SimpleMapView } from './SimpleMapView';
import { MapErrorBoundary } from './MapErrorBoundary';

// 안전한 동적 로딩 - 오류 발생 시 null 반환
const MapViewComponent = dynamic(
  () => import('./MapView')
    .then(mod => mod.default)
    .catch(err => {
      console.error('MapView 로딩 실패:', err);
      return { default: () => null };
    }),
  {
    ssr: false,
    loading: () => (
      <div 
        style={{ height: '400px' }} 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
      >
        <Loading />
      </div>
    )
  }
);

// 안전한 렌더링 래퍼
const SafeMapWrapper = (props: any) => {
  try {
    return <MapViewComponent {...props} />;
  } catch (error) {
    console.error('MapView 렌더링 오류:', error);
    return <SimpleMapView {...props} />;
  }
};

// 메인 DynamicMapView 컴포넌트
const DynamicMapView = (props: any) => {
  return (
    <MapErrorBoundary 
      fallback={(error: any) => {
        console.error('Map Error Boundary 활성화:', error);
        return <SimpleMapView {...props} />;
      }}
    >
      <Suspense 
        fallback={
          <div 
            style={{ height: '400px' }} 
            className="flex items-center justify-center bg-gray-100 rounded-lg"
          >
            <Loading />
          </div>
        }
      >
        <SafeMapWrapper {...props} />
      </Suspense>
    </MapErrorBoundary>
  );
};

export default DynamicMapView;
