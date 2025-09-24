import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface UseKakaoMapProps {
  apiKey?: string;
  libraries?: string[];
}

export const useKakaoMap = ({ 
  apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY,
  libraries = ['services', 'clusterer', 'drawing'] 
}: UseKakaoMapProps = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 이미 로드된 경우
    if (window.kakao && window.kakao.maps) {
      setIsLoaded(true);
      return;
    }

    // 이미 로딩 중인 경우 중복 방지
    if (isLoading) return;

    // API Key가 없는 경우
    if (!apiKey || apiKey === 'your_kakao_api_key_here') {
      setError('Kakao Map API Key가 설정되지 않았습니다.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Kakao Map 스크립트 로드
    const script = document.createElement('script');
    const libraryString = libraries.length > 0 ? `&libraries=${libraries.join(',')}` : '';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false${libraryString}`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setIsLoaded(true);
          setIsLoading(false);
        });
      } else {
        setError('Kakao Map API 로드 실패');
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      setError('Kakao Map 스크립트 로드 실패');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거 (선택적)
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [apiKey, isLoading, libraries]);

  return {
    isLoaded,
    isLoading,
    error,
    kakao: window.kakao
  };
};

// Kakao Map 좌표 변환 유틸리티
export const convertToKakaoCoords = (lat: number, lng: number) => {
  if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
    return new window.kakao.maps.LatLng(lat, lng);
  }
  return { lat, lng };
};

// 거리 계산 유틸리티 
export const calculateKakaoDistance = (
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number => {
  if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
    const position1 = new window.kakao.maps.LatLng(coord1.lat, coord1.lng);
    const position2 = new window.kakao.maps.LatLng(coord2.lat, coord2.lng);
    
    const polyline = new window.kakao.maps.Polyline({
      path: [position1, position2]
    });
    
    return polyline.getLength();
  }
  
  // Kakao API가 없는 경우 fallback 계산
  const R = 6371000; // 지구 반지름 (미터)
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
