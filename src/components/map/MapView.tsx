'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { Loading } from '@/components/ui/Loading';
import { Alert } from '@/components/ui/Alert';
import type { Coordinates, SafetyZone } from '@/types/global';

interface MapViewProps {
  center?: Coordinates;
  level?: number;
  style?: React.CSSProperties;
  className?: string;
  onMapClick?: (coordinates: Coordinates) => void;
  onMapReady?: (map: any) => void;
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

export const MapView: React.FC<MapViewProps> = ({
  center = { lat: 35.1595, lng: 129.1604 }, // 부산 해운대 기본값
  level = 3,
  style = { width: '100%', height: '400px' },
  className = '',
  onMapClick,
  onMapReady,
  safetyZones = [],
  markers = [],
  showControls = true,
  draggable = true,
  zoomable = true
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const overlaysRef = useRef<any[]>([]);
  
  const { isLoaded, isLoading, error, kakao } = useKakaoMap();
  const [mapReady, setMapReady] = useState(false);

  // 지도 초기화
  const initializeMap = useCallback(() => {
    if (!isLoaded || !kakao || !mapRef.current || mapInstanceRef.current) return;

    try {
      const mapOption = {
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level,
        draggable,
        scrollwheel: zoomable,
        disableDoubleClick: false,
        disableDoubleClickZoom: !zoomable
      };

      const map = new kakao.maps.Map(mapRef.current, mapOption);
      mapInstanceRef.current = map;

      // 지도 컨트롤 추가
      if (showControls) {
        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      }

      // 지도 클릭 이벤트
      if (onMapClick) {
        kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
          const latlng = mouseEvent.latLng;
          onMapClick({
            lat: latlng.getLat(),
            lng: latlng.getLng()
          });
        });
      }

      setMapReady(true);
      onMapReady?.(map);

    } catch (err) {
      console.error('Map initialization failed:', err);
    }
  }, [isLoaded, kakao, center, level, draggable, zoomable, showControls, onMapClick, onMapReady]);

  // 마커 업데이트
  const updateMarkers = useCallback(() => {
    if (!mapReady || !kakao || !mapInstanceRef.current) return;

    // 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // 새 마커 생성
    markers.forEach(markerData => {
      const markerPosition = new kakao.maps.LatLng(markerData.position.lat, markerData.position.lng);
      
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        title: markerData.title || ''
      });

      marker.setMap(mapInstanceRef.current);
      markersRef.current.push(marker);

      // 인포윈도우 추가 (선택적)
      if (markerData.content) {
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${markerData.content}</div>`
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(mapInstanceRef.current, marker);
        });
      }
    });
  }, [mapReady, kakao, markers]);

  // 안전구역 오버레이 업데이트
  const updateSafetyZones = useCallback(() => {
    if (!mapReady || !kakao || !mapInstanceRef.current) return;

    // 기존 오버레이 제거
    overlaysRef.current.forEach(overlay => overlay.setMap(null));
    overlaysRef.current = [];

    // 안전구역 폴리곤 생성
    safetyZones.forEach((zone, index) => {
      if (zone.coordinates.length < 3) return; // 폴리곤은 최소 3개 점 필요

      const polygonPath = zone.coordinates.map(coord => 
        new kakao.maps.LatLng(coord.lat, coord.lng)
      );

      const polygon = new kakao.maps.Polygon({
        path: polygonPath,
        strokeWeight: 2,
        strokeColor: getZoneColor(zone.type).stroke,
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: getZoneColor(zone.type).fill,
        fillOpacity: 0.3
      });

      polygon.setMap(mapInstanceRef.current);
      overlaysRef.current.push(polygon);

      // 구역 정보 표시를 위한 커스텀 오버레이
      const centerPoint = calculatePolygonCenter(zone.coordinates);
      const overlayContent = document.createElement('div');
      overlayContent.className = `
        px-2 py-1 bg-white rounded shadow-md text-xs font-semibold
        animate__animated animate__fadeIn animate-delay-${index * 500}ms
        ${getZoneTextColor(zone.type)}
      `;
      overlayContent.innerHTML = zone.name;

      const customOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(centerPoint.lat, centerPoint.lng),
        content: overlayContent,
        yAnchor: 0.5
      });

      customOverlay.setMap(mapInstanceRef.current);
      overlaysRef.current.push(customOverlay);
    });
  }, [mapReady, kakao, safetyZones]);

  // 지도 중심 이동
  const panTo = useCallback((coordinates: Coordinates) => {
    if (mapInstanceRef.current && kakao) {
      const moveLatLng = new kakao.maps.LatLng(coordinates.lat, coordinates.lng);
      mapInstanceRef.current.panTo(moveLatLng);
    }
  }, [kakao]);

  // 지도 레벨 변경
  const setLevel = useCallback((newLevel: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setLevel(newLevel);
    }
  }, []);

  // 지도 초기화 이펙트
  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  // 마커 업데이트 이펙트
  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  // 안전구역 업데이트 이펙트  
  useEffect(() => {
    updateSafetyZones();
  }, [updateSafetyZones]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      overlaysRef.current.forEach(overlay => overlay.setMap(null));
    };
  }, []);

  // 로딩 상태
  if (isLoading) {
    return (
      <div style={style} className={`flex items-center justify-center ${className}`}>
        <Loading />
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div style={style} className={`flex items-center justify-center ${className}`}>
        <Alert type="error" message={`지도를 불러올 수 없습니다: ${error}`} />
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      style={style} 
      className={`rounded-lg overflow-hidden ${className}`}
    />
  );
};

// 안전구역 타입별 색상 반환
function getZoneColor(type: string): { stroke: string; fill: string } {
  switch (type) {
    case 'SAFE':
      return { stroke: '#10B981', fill: '#10B981' };
    case 'CAUTION':
      return { stroke: '#F59E0B', fill: '#F59E0B' };
    case 'DANGER':
      return { stroke: '#EF4444', fill: '#EF4444' };
    case 'FISHING':
      return { stroke: '#8B5CF6', fill: '#8B5CF6' };
    case 'NAVIGATION':
      return { stroke: '#3B82F6', fill: '#3B82F6' };
    default:
      return { stroke: '#6B7280', fill: '#6B7280' };
  }
}

// 안전구역 텍스트 색상 반환
function getZoneTextColor(type: string): string {
  switch (type) {
    case 'SAFE':
      return 'text-green-600 border border-green-200';
    case 'CAUTION':
      return 'text-yellow-600 border border-yellow-200';
    case 'DANGER':
      return 'text-red-600 border border-red-200';
    case 'FISHING':
      return 'text-purple-600 border border-purple-200';
    case 'NAVIGATION':
      return 'text-blue-600 border border-blue-200';
    default:
      return 'text-gray-600 border border-gray-200';
  }
}

// 폴리곤의 중심점 계산
function calculatePolygonCenter(coordinates: Coordinates[]): Coordinates {
  if (coordinates.length === 0) return { lat: 0, lng: 0 };
  
  const sum = coordinates.reduce(
    (acc, coord) => ({
      lat: acc.lat + coord.lat,
      lng: acc.lng + coord.lng
    }),
    { lat: 0, lng: 0 }
  );
  
  return {
    lat: sum.lat / coordinates.length,
    lng: sum.lng / coordinates.length
  };
}
