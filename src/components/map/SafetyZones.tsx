'use client';

import React from 'react';
import  MapView  from './MapView';
import type { SafetyZone, Coordinates } from '@/types/global';

interface SafetyZonesProps {
  center?: Coordinates;
  safetyZones: SafetyZone[];
  className?: string;
  style?: React.CSSProperties;
  onZoneClick?: (zone: SafetyZone) => void;
  showLegend?: boolean;
  level?: number;
}

export const SafetyZones: React.FC<SafetyZonesProps> = ({
  center,
  safetyZones,
  className = '',
  style,
  onZoneClick,
  showLegend = true,
  level = 5
}) => {
  const handleMapClick = (coordinates: Coordinates) => {
    // 클릭된 좌표가 어떤 안전구역에 속하는지 확인
    const clickedZone = safetyZones.find(zone => 
      isPointInPolygon(coordinates, zone.coordinates)
    );
    
    if (clickedZone && onZoneClick) {
      onZoneClick(clickedZone);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <MapView
        center={center}
        level={level}
        style={style}
        safetyZones={safetyZones}
        onMapClick={handleMapClick}
        showControls={true}
        className="rounded-lg shadow-lg animate__animated animate__fadeIn"
      />
      
      {showLegend && (
        <SafetyZoneLegend 
          zones={safetyZones}
          className="absolute top-4 left-4 z-10"
        />
      )}
    </div>
  );
};

// 안전구역 범례 컴포넌트
interface SafetyZoneLegendProps {
  zones: SafetyZone[];
  className?: string;
}

const SafetyZoneLegend: React.FC<SafetyZoneLegendProps> = ({ zones, className = '' }) => {
  const uniqueTypes = Array.from(new Set(zones.map(zone => zone.type)));
  
  return (
    <div className={`bg-white rounded-lg shadow-lg p-3 ${className} animate__animated animate__slideInLeft`}>
      <h4 className="text-sm font-semibold text-gray-700 mb-2">안전구역 범례</h4>
      <div className="space-y-1">
        {uniqueTypes.map(type => (
          <div key={type} className="flex items-center space-x-2 text-xs">
            <div 
              className="w-3 h-3 rounded-sm border"
              style={{
                backgroundColor: getZoneDisplayColor(type),
                borderColor: getZoneDisplayColor(type, true)
              }}
            />
            <span className="text-gray-600">{getZoneDisplayName(type)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 안전구역 타입별 표시 색상
function getZoneDisplayColor(type: string, isDark = false): string {
  const colors = {
    'SAFE': isDark ? '#059669' : '#D1FAE5',
    'CAUTION': isDark ? '#D97706' : '#FEF3C7', 
    'DANGER': isDark ? '#DC2626' : '#FEE2E2',
    'FISHING': isDark ? '#7C3AED' : '#EDE9FE',
    'NAVIGATION': isDark ? '#2563EB' : '#DBEAFE'
  };
  return colors[type as keyof typeof colors] || (isDark ? '#4B5563' : '#F3F4F6');
}

// 안전구역 타입별 표시명
function getZoneDisplayName(type: string): string {
  const names = {
    'SAFE': '안전구역',
    'CAUTION': '주의구역', 
    'DANGER': '위험구역',
    'FISHING': '어업구역',
    'NAVIGATION': '항로구역'
  };
  return names[type as keyof typeof names] || type;
}

// 점이 폴리곤 내부에 있는지 확인하는 함수 (Ray casting algorithm)
function isPointInPolygon(point: Coordinates, polygon: Coordinates[]): boolean {
  if (polygon.length < 3) return false;
  
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    if (
      ((polygon[i].lat > point.lat) !== (polygon[j].lat > point.lat)) &&
      (point.lng < (polygon[j].lng - polygon[i].lng) * (point.lat - polygon[i].lat) / (polygon[j].lat - polygon[i].lat) + polygon[i].lng)
    ) {
      inside = !inside;
    }
  }
  
  return inside;
}
