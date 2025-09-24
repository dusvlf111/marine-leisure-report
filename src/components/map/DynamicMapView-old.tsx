
'use client';

import dynamic from 'next/dynamic';
import { Loading } from '@/components/ui/Loading';
import { SimpleMapView } from './SimpleMapView';
import { MapErrorBoundary } from './MapErrorBoundary';
import { Suspense } from 'react';

// MapView를 동적으로 임포트하고, SSR은 비활성화합니다.
const MapViewComponent = dynamic(
  () => import('@/components/map/MapView').then(mod => mod.MapView),
  {
    ssr: false,
    loading: () => <div style={{ height: '400px' }} className="flex items-center justify-center"><Loading /></div>
  }
);

// 오류 발생 시 SimpleMapView를 사용하는 래퍼 컴포넌트
const DynamicMapView = (props: any) => {
  return (
    <MapErrorBoundary fallback={() => <SimpleMapView {...props} />}>
      <Suspense fallback={<div style={{ height: '400px' }} className="flex items-center justify-center"><Loading /></div>}>
        <MapViewComponent {...props} />
      </Suspense>
    </MapErrorBoundary>
  );
};

export default DynamicMapView;
