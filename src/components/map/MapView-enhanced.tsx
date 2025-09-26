'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, useMap, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Coordinates, SafetyZone } from '@/types/global';
import { 
  initializeLeaflet, 
  createCustomIcon, 
  isValidMapInstance, 
  cleanupMapEvents,
  isBrowser 
} from '@/lib/utils/leafletUtils';

// 로딩 컴포넌트
const MapLoading = ({ height = '400px' }: { height?: string }) => (
  <div 
    style={{ height }} 
    className="flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
  >
    <div className="text-center">
      <div className="w-8 h-8 mx-auto mb-2 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600">지도를 불러오는 중...</p>
    </div>
  </div>
);

// 에러 컴포넌트
const MapError = ({ height = '400px', onRetry }: { height?: string; onRetry?: () => void }) => (
  <div 
    style={{ height }} 
    className="flex items-center justify-center bg-red-50 rounded-lg border-2 border-red-200"
  >
    <div className="text-center">
      <div className="text-red-500 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className="text-red-700 font-medium mb-2">지도를 불러올 수 없습니다</p>
      <p className="text-red-600 text-sm mb-4">네트워크 연결을 확인해주세요</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  </div>
);

interface MapViewProps {
  center?: Coordinates;
  level?: number;
  style?: React.CSSProperties;
  className?: string;
  onMapClick?: (coordinates: Coordinates) => void;
  onMapReady?: (map: L.Map) => void;
  safetyZones?: SafetyZone[];
  markers?: Array<{
    position: Coordinates;
    title?: string;
    content?: string;
    type?: 'default' | 'emergency' | 'port' | 'fishing' | 'rescue' | 'hospital';
  }>;
  showControls?: boolean;
  draggable?: boolean;
  zoomable?: boolean;
}

// 지도 이벤트 핸들러
const MapEvents = ({ onMapClick }: { onMapClick?: (coordinates: Coordinates) => void }) => {
  const mapEvents = useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
};

// 지도 준비 핸들러
const MapReadyHandler = ({ onMapReady }: { onMapReady?: (map: L.Map) => void }) => {
  const map = useMap();
  
  useEffect(() => {
    if (onMapReady && map) {
      onMapReady(map);
    }
  }, [map, onMapReady]);
  
  return null;
};

// 지도 컨트롤러
const MapController = ({ 
  center, 
  zoom, 
  draggable = true, 
  zoomable = true 
}: { 
  center: Coordinates; 
  zoom: number; 
  draggable?: boolean; 
  zoomable?: boolean; 
}) => {
  const map = useMap();
  
  useEffect(() => {
    if (map && center) {
      map.setView([center.lat, center.lng], zoom);
    }
  }, [map, center, zoom]);

  useEffect(() => {
    if (map) {
      if (draggable) {
        map.dragging.enable();
      } else {
        map.dragging.disable();
      }
      
      if (zoomable) {
        map.scrollWheelZoom.enable();
        map.doubleClickZoom.enable();
        map.touchZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
      } else {
        map.scrollWheelZoom.disable();
        map.doubleClickZoom.disable();
        map.touchZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
      }
    }
  }, [map, draggable, zoomable]);

  return null;
};

// 실제 지도 컴포넌트
const LeafletMapComponent: React.FC<MapViewProps> = ({
  center = { lat: 37.5665, lng: 126.9780 },
  level = 13,
  style = { width: '100%', height: '400px' },
  className = '',
  onMapClick,
  onMapReady,
  safetyZones = [],
  markers = [],
  showControls = true,
  draggable = true,
  zoomable = true,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const [defaultIcon, setDefaultIcon] = useState<L.Icon | null>(null);

  // 기본 아이콘 생성
  useEffect(() => {
    createCustomIcon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
    }).then(setDefaultIcon);
  }, []);

  // 안전구역 타입별 색상
  const getZoneColor = (type: string): L.PathOptions => {
    const baseStyle = {
      weight: 2,
      opacity: 0.8,
      fillOpacity: 0.3,
    };
    
    switch (type) {
      case 'SAFE':
        return { ...baseStyle, color: '#10B981', fillColor: '#10B981' };
      case 'CAUTION':
        return { ...baseStyle, color: '#F59E0B', fillColor: '#F59E0B' };
      case 'DANGER':
        return { ...baseStyle, color: '#EF4444', fillColor: '#EF4444' };
      case 'FISHING':
        return { ...baseStyle, color: '#8B5CF6', fillColor: '#8B5CF6' };
      case 'NAVIGATION':
        return { ...baseStyle, color: '#3B82F6', fillColor: '#3B82F6' };
      default:
        return { ...baseStyle, color: '#6B7280', fillColor: '#6B7280' };
    }
  };

  return (
    <div className={`map-container ${className}`} style={style}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={level}
        style={{ width: '100%', height: '100%' }}
        dragging={draggable}
        scrollWheelZoom={zoomable}
        doubleClickZoom={zoomable}
        touchZoom={zoomable}
        zoomControl={showControls}
        attributionControl={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapReadyHandler onMapReady={onMapReady} />
        {onMapClick && <MapEvents onMapClick={onMapClick} />}
        <MapController 
          center={center} 
          zoom={level} 
          draggable={draggable} 
          zoomable={zoomable} 
        />

        {defaultIcon && markers.map((marker, index) => (
          <Marker 
            key={`marker-${index}`} 
            position={[marker.position.lat, marker.position.lng]}
            icon={defaultIcon}
          >
            {marker.content && (
              <Popup>
                <div>
                  {marker.title && <h3>{marker.title}</h3>}
                  <p>{marker.content}</p>
                </div>
              </Popup>
            )}
          </Marker>
        ))}

        {safetyZones.map((zone, index) => (
          <Polygon
            key={`zone-${zone.id || index}`}
            pathOptions={getZoneColor(zone.type)}
            positions={zone.coordinates.map(c => [c.lat, c.lng])}
          >
            <Popup>
              <div>
                <h3>{zone.name}</h3>
                <p>{zone.description}</p>
              </div>
            </Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
};

// 메인 MapView 컴포넌트 (SSR 안전)
const MapView: React.FC<MapViewProps> = (props) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const initializeMap = useCallback(async () => {
    try {
      setInitError(null);
      const success = await initializeLeaflet();
      if (success) {
        setIsInitialized(true);
      } else {
        setInitError('지도 초기화에 실패했습니다');
      }
    } catch (error) {
      setInitError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다');
    }
  }, [retryCount]);

  useEffect(() => {
    if (isBrowser) {
      initializeMap();
    }
  }, [initializeMap]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  // SSR 환경에서는 로딩 표시
  if (!isBrowser) {
    return <MapLoading height={props.style?.height as string || '400px'} />;
  }

  // 초기화 오류 시
  if (initError) {
    return (
      <MapError 
        height={props.style?.height as string || '400px'} 
        onRetry={handleRetry}
      />
    );
  }

  // 초기화 대기 중
  if (!isInitialized) {
    return <MapLoading height={props.style?.height as string || '400px'} />;
  }

  // 정상 렌더링
  return <LeafletMapComponent {...props} />;
};

export default MapView;