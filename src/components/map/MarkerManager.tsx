'use client';

import React, { useMemo } from 'react';
import { MapView } from './MapView';
import type { Coordinates } from '@/types/global';

export interface MapMarker {
  id: string;
  position: Coordinates;
  title: string;
  content?: string;
  type: 'emergency' | 'port' | 'fishing' | 'rescue' | 'hospital';
  phone?: string;
  address?: string;
  operatingHours?: string;
}

interface MarkerManagerProps {
  center?: Coordinates;
  markers: MapMarker[];
  onMarkerClick?: (marker: MapMarker) => void;
  showMarkerInfo?: boolean;
  level?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const MarkerManager: React.FC<MarkerManagerProps> = ({
  center,
  markers,
  onMarkerClick,
  showMarkerInfo = true,
  level = 4,
  className = '',
  style
}) => {
  // 마커를 MapView에서 사용할 수 있는 형태로 변환
  const mapMarkers = useMemo(() => {
    return markers.map(marker => ({
      position: marker.position,
      title: marker.title,
      content: showMarkerInfo ? createMarkerContent(marker) : undefined,
      type: marker.type
    }));
  }, [markers, showMarkerInfo]);

  const handleMapClick = (coordinates: Coordinates) => {
    // 클릭된 위치 근처의 마커 찾기
    const nearbyMarker = markers.find(marker => 
      calculateDistance(coordinates, marker.position) < 100 // 100m 이내
    );
    
    if (nearbyMarker && onMarkerClick) {
      onMarkerClick(nearbyMarker);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <MapView
        center={center}
        level={level}
        style={style}
        markers={mapMarkers}
        onMapClick={handleMapClick}
        className="rounded-lg shadow-lg"
      />
      
      <MarkerLegend 
        markers={markers}
        className="absolute top-4 right-4 z-10"
      />
    </div>
  );
};

// 마커 정보 컨텐츠 생성
function createMarkerContent(marker: MapMarker): string {
  const icon = getMarkerIcon(marker.type);
  
  let content = `
    <div class="p-3 min-w-[200px] max-w-[300px]">
      <div class="flex items-center mb-2">
        <span class="text-lg mr-2">${icon}</span>
        <h3 class="font-semibold text-gray-800">${marker.title}</h3>
      </div>
  `;
  
  if (marker.address) {
    content += `<p class="text-sm text-gray-600 mb-1">📍 ${marker.address}</p>`;
  }
  
  if (marker.phone) {
    content += `<p class="text-sm text-blue-600 mb-1">📞 ${marker.phone}</p>`;
  }
  
  if (marker.operatingHours) {
    content += `<p class="text-sm text-gray-600 mb-1">🕒 ${marker.operatingHours}</p>`;
  }
  
  content += '</div>';
  return content;
}

// 마커 타입별 아이콘
function getMarkerIcon(type: string): string {
  const icons = {
    'emergency': '🚨',
    'port': '⚓',
    'fishing': '🎣',
    'rescue': '🚁',
    'hospital': '🏥'
  };
  return icons[type as keyof typeof icons] || '📍';
}

// 마커 범례 컴포넌트
interface MarkerLegendProps {
  markers: MapMarker[];
  className?: string;
}

const MarkerLegend: React.FC<MarkerLegendProps> = ({ markers, className = '' }) => {
  const markerCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    markers.forEach(marker => {
      counts[marker.type] = (counts[marker.type] || 0) + 1;
    });
    return counts;
  }, [markers]);

  return (
    <div className={`bg-white rounded-lg shadow-lg p-3 ${className} animate__animated animate__slideInRight`}>
      <h4 className="text-sm font-semibold text-gray-700 mb-2">시설 정보</h4>
      <div className="space-y-1">
        {Object.entries(markerCounts).map(([type, count]) => (
          <div key={type} className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span>{getMarkerIcon(type)}</span>
              <span className="text-gray-600">{getMarkerTypeName(type)}</span>
            </div>
            <span className="bg-gray-100 px-2 py-1 rounded text-gray-700 font-medium">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 마커 타입별 표시명
function getMarkerTypeName(type: string): string {
  const names = {
    'emergency': '응급구조소',
    'port': '항구/선착장',
    'fishing': '어촌계',
    'rescue': '해상구조대',
    'hospital': '응급의료센터'
  };
  return names[type as keyof typeof names] || type;
}

// 거리 계산 함수 (미터 단위)
function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371000; // 지구 반지름 (미터)
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
