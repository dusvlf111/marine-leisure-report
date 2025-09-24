'use client';

import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, useMap, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Coordinates, SafetyZone } from '@/types/global';

// Leaflet의 기본 아이콘 경로가 깨지는 문제 해결
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

interface MapViewProps {
  center?: Coordinates;
  level?: number; // react-leaflet에서는 zoom으로 사용
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
  showControls?: boolean; // react-leaflet은 기본적으로 컨트롤 표시
  draggable?: boolean; // MapContainer prop으로 제어
  zoomable?: boolean; // MapContainer prop으로 제어
}

// 지도 이벤트 핸들러 컴포넌트
const MapEvents = ({ onMapClick }: { onMapClick?: (coordinates: Coordinates) => void }) => {
  useMapEvents({
    click(e) {
      onMapClick?.({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

// 지도 뷰 컨트롤 컴포넌트
const MapController = ({ center, zoom, draggable, zoomable }: { center: Coordinates, zoom: number, draggable?: boolean, zoomable?: boolean }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.lat, center.lng], zoom);
  }, [map, center, zoom]);

  useEffect(() => {
    if (draggable) map.dragging.enable(); else map.dragging.disable();
    if (zoomable) map.scrollWheelZoom.enable(); else map.scrollWheelZoom.disable();
  }, [map, draggable, zoomable]);

  return null;
};

export const MapView: React.FC<MapViewProps> = ({
  center = { lat: 35.1595, lng: 129.1604 },
  level = 13, // Kakao Map level과 Leaflet zoom은 스케일이 다름. 13정도가 비슷.
  style = { width: '100%', height: '400px' },
  className = '',
  onMapClick,
  onMapReady,
  safetyZones = [],
  markers = [],
  draggable = true,
  zoomable = true,
}) => {
  const mapRef = useRef<L.Map>(null);

  return (
    <div style={style} className={`rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={level}
        style={{ width: '100%', height: '100%' }}
        whenCreated={mapInstance => {
          (mapRef as React.MutableRefObject<L.Map>).current = mapInstance;
          onMapReady?.(mapInstance);
        }}
        dragging={draggable}
        scrollWheelZoom={zoomable}
        zoomControl={true} // 기본 줌 컨트롤 표시
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapEvents onMapClick={onMapClick} />
        <MapController center={center} zoom={level} draggable={draggable} zoomable={zoomable} />

        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.position.lat, marker.position.lng]} title={marker.title}>
            {marker.content && <Popup>{marker.content}</Popup>}
          </Marker>
        ))}

        {safetyZones.map(zone => (
          <Polygon
            key={zone.id}
            pathOptions={getZoneColor(zone.type)}
            positions={zone.coordinates.map(c => [c.lat, c.lng])}
          >
            <Popup>{zone.name}: {zone.description}</Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
};

// 안전구역 타입별 색상 반환
function getZoneColor(type: string): L.PathOptions {
  const style = {
    weight: 2,
    opacity: 0.8,
    fillOpacity: 0.3,
  };
  switch (type) {
    case 'SAFE':
      return { ...style, color: '#10B981', fillColor: '#10B981' };
    case 'CAUTION':
      return { ...style, color: '#F59E0B', fillColor: '#F59E0B' };
    case 'DANGER':
      return { ...style, color: '#EF4444', fillColor: '#EF4444' };
    case 'FISHING':
      return { ...style, color: '#8B5CF6', fillColor: '#8B5CF6' };
    case 'NAVIGATION':
      return { ...style, color: '#3B82F6', fillColor: '#3B82F6' };
    default:
      return { ...style, color: '#6B7280', fillColor: '#6B7280' };
  }
}