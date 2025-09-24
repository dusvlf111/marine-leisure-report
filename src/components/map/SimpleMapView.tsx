'use client';

import React from 'react';
import type { Coordinates } from '@/types/global';

interface SimpleMapViewProps {
  center?: Coordinates;
  style?: React.CSSProperties;
  className?: string;
  onMapClick?: (coordinates: Coordinates) => void;
  markers?: Array<{
    position: Coordinates;
    title?: string;
    content?: string;
  }>;
}

export const SimpleMapView: React.FC<SimpleMapViewProps> = ({
  center = { lat: 35.1595, lng: 129.1604 },
  style = { width: '100%', height: '400px' },
  className = '',
  onMapClick,
  markers = [],
}) => {
  const handleClick = () => {
    if (onMapClick) {
      // 기본 좌표 반환
      onMapClick(center);
    }
  };

  return (
    <div 
      style={style} 
      className={`rounded-lg overflow-hidden border-2 border-dashed flex items-center justify-center cursor-pointer ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="text-center p-8">
        <div className="text-4xl mb-4">🗺️</div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: '#133E87' }}>
          지도 로딩 중...
        </h3>
        <p className="text-sm" style={{ color: '#608BC1' }}>
          클릭하여 위치 선택
        </p>
        {markers.length > 0 && (
          <div className="mt-4">
            <p className="text-xs" style={{ color: '#608BC1' }}>
              {markers.length}개의 마커가 있습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
