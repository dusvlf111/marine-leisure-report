import type { Coordinates } from '@/types/global';

/**
 * 두 좌표 간의 거리를 계산합니다 (단위: 미터)
 * Haversine 공식을 사용하여 지구의 곡률을 고려한 정확한 거리를 계산합니다.
 * 
 * @param coord1 첫 번째 좌표 (위도, 경도)
 * @param coord2 두 번째 좌표 (위도, 경도)
 * @returns 거리 (미터)
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
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

/**
 * 좌표가 유효한지 검증합니다.
 * 
 * @param coord 검증할 좌표
 * @returns 유효한 좌표인지 여부
 */
export function validateCoordinates(coord: Coordinates): boolean {
  return (
    typeof coord.lat === 'number' &&
    typeof coord.lng === 'number' &&
    coord.lat >= -90 &&
    coord.lat <= 90 &&
    coord.lng >= -180 &&
    coord.lng <= 180 &&
    !isNaN(coord.lat) &&
    !isNaN(coord.lng)
  );
}

/**
 * 주어진 좌표에서 가장 가까운 위치를 찾습니다.
 * 
 * @param coordinates 기준 좌표
 * @param locations 검색할 위치 목록
 * @param maxDistance 최대 거리 (미터, 기본값: 10000)
 * @returns 가장 가까운 위치 또는 null
 */
export function findNearestLocation<T extends { coordinates: Coordinates }>(
  coordinates: Coordinates,
  locations: T[],
  maxDistance: number = 10000
): T | null {
  if (locations.length === 0 || !validateCoordinates(coordinates)) {
    return null;
  }
  
  let nearestLocation = locations[0];
  let minDistance = calculateDistance(coordinates, nearestLocation.coordinates);
  
  for (let i = 1; i < locations.length; i++) {
    const distance = calculateDistance(coordinates, locations[i].coordinates);
    if (distance < minDistance) {
      minDistance = distance;
      nearestLocation = locations[i];
    }
  }
  
  return minDistance <= maxDistance ? nearestLocation : null;
}

/**
 * 두 좌표 사이의 방위각을 계산합니다 (북쪽 기준 시계방향 각도).
 * 
 * @param from 시작 좌표
 * @param to 목표 좌표
 * @returns 방위각 (도, 0-360)
 */
export function calculateBearing(from: Coordinates, to: Coordinates): number {
  const dLng = (to.lng - from.lng) * Math.PI / 180;
  const lat1 = from.lat * Math.PI / 180;
  const lat2 = to.lat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  const bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
}

/**
 * 좌표를 사람이 읽기 쉬운 형태로 포맷팅합니다.
 * 
 * @param coord 포맷팅할 좌표
 * @param precision 소수점 자릿수 (기본값: 4)
 * @returns 포맷팅된 좌표 문자열
 */
export function formatCoordinates(coord: Coordinates, precision: number = 4): string {
  if (!validateCoordinates(coord)) {
    return 'Invalid coordinates';
  }
  
  return `${coord.lat.toFixed(precision)}, ${coord.lng.toFixed(precision)}`;
}

/**
 * 거리를 사람이 읽기 쉬운 형태로 포맷팅합니다.
 * 
 * @param distance 거리 (미터)
 * @returns 포맷팅된 거리 문자열
 */
export function formatDistance(distance: number): string {
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  } else {
    return `${(distance / 1000).toFixed(1)}km`;
  }
}