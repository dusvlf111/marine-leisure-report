'use client';

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, useMap, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Coordinates, SafetyZone } from '@/types/global';

// Leaflet 아이콘 설정 - 완전한 아이콘 구성
const createDefaultIcon = () => {
  return L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });
};

// Leaflet 기본 아이콘 문제 해결
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });
}

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

const MapView: React.FC<MapViewProps> = ({
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

        {markers.map((marker, index) => (
          <Marker 
            key={`marker-${index}`} 
            position={[marker.position.lat, marker.position.lng]}
            icon={createDefaultIcon()}
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

export default MapView;
