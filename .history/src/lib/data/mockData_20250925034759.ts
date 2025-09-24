import { 
  Location, 
  WeatherData, 
  FisheryInfo, 
  EmergencyContacts, 
  SafetyAnalysisData,
  SafetyStatus 
} from '@/types/global';
import { MapMarker, SafetyZone } from '@/types/api';

// 목 위치 데이터
export const mockLocations: Location[] = [
  {
    name: '부산 해운대해수욕장',
    coordinates: { lat: 35.1595, lng: 129.1604 },
    navigationRoute: false,
  },
  {
    name: '제주도 중문해수욕장',
    coordinates: { lat: 33.2382, lng: 126.4164 },
    navigationRoute: false,
  },
  {
    name: '강원도 속초항',
    coordinates: { lat: 38.2070, lng: 128.5918 },
    navigationRoute: true,
  },
  {
    name: '인천 을왕리해수욕장',
    coordinates: { lat: 37.4449, lng: 126.3758 },
    navigationRoute: false,
  },
  {
    name: '경남 통영 한산도',
    coordinates: { lat: 34.8344, lng: 128.4356 },
    navigationRoute: true,
  },
];

// 목 기상 데이터
export const mockWeatherData: Record<string, WeatherData> = {
  '부산 해운대해수욕장': {
    condition: 'CLEAR',
    temperature: 24,
    windSpeed: 3.2,
    waveHeight: 0.5,
  },
  '제주도 중문해수욕장': {
    condition: 'CLOUDY',
    temperature: 22,
    windSpeed: 5.1,
    waveHeight: 0.8,
  },
  '강원도 속초항': {
    condition: 'RAINY',
    temperature: 18,
    windSpeed: 8.3,
    waveHeight: 1.2,
  },
  '인천 을왕리해수욕장': {
    condition: 'CLEAR',
    temperature: 20,
    windSpeed: 2.8,
    waveHeight: 0.3,
  },
  '경남 통영 한산도': {
    condition: 'STORMY',
    temperature: 19,
    windSpeed: 12.5,
    waveHeight: 2.1,
  },
};

// 목 어업권 정보
export const mockFisheryInfo: Record<string, FisheryInfo> = {
  '부산 해운대해수욕장': {
    hasRestriction: false,
  },
  '제주도 중문해수욕장': {
    hasRestriction: false,
  },
  '강원도 속초항': {
    hasRestriction: true,
    restrictionType: '어선 통항로',
    contactInfo: '033-639-2765',
  },
  '인천 을왕리해수욕장': {
    hasRestriction: true,
    restrictionType: '굴양식장',
    contactInfo: '032-899-3423',
  },
  '경남 통영 한산도': {
    hasRestriction: true,
    restrictionType: '전복양식장, 멸치어업',
    contactInfo: '055-650-4000',
  },
};

// 목 응급연락처
export const mockEmergencyContacts: Record<string, EmergencyContacts> = {
  '부산 해운대해수욕장': {
    coastGuard: '051-760-2000',
    localPolice: '051-749-3112',
    fishingAssociation: '051-741-2345',
  },
  '제주도 중문해수욕장': {
    coastGuard: '064-800-8000',
    localPolice: '064-760-5000',
    fishingAssociation: '064-752-1004',
  },
  '강원도 속초항': {
    coastGuard: '033-630-6119',
    localPolice: '033-639-2112',
    fishingAssociation: '033-639-2765',
  },
  '인천 을왕리해수욕장': {
    coastGuard: '032-889-6119',
    localPolice: '032-899-3400',
    fishingAssociation: '032-899-3423',
  },
  '경남 통영 한산도': {
    coastGuard: '055-640-4119',
    localPolice: '055-650-5000',
    fishingAssociation: '055-650-4000',
  },
};

// 목 지도 마커
export const mockMapMarkers: MapMarker[] = [
  {
    id: 'emergency-1',
    position: { lat: 35.1595, lng: 129.1604 },
    type: 'EMERGENCY',
    title: '해운대 119안전센터',
    phone: '051-760-4119',
  },
  {
    id: 'port-1',
    position: { lat: 35.1580, lng: 129.1620 },
    type: 'PORT',
    title: '해운대항',
  },
  {
    id: 'fishing-1',
    position: { lat: 35.1610, lng: 129.1590 },
    type: 'FISHING_ASSOCIATION',
    title: '해운대수협',
    phone: '051-741-2345',
  },
];

// 목 안전구역
export const mockSafetyZones: SafetyZone[] = [
  {
    id: 'zone-1',
    name: '해운대 안전구역',
    coordinates: [
      { lat: 35.1585, lng: 129.1590 },
      { lat: 35.1605, lng: 129.1590 },
      { lat: 35.1605, lng: 129.1620 },
      { lat: 35.1585, lng: 129.1620 },
    ],
    safetyLevel: 'HIGH',
    description: '해수욕장 지정 구역으로 안전 관리 시설 완비',
  },
  {
    id: 'zone-2',
    name: '항로 주의구역',
    coordinates: [
      { lat: 35.1570, lng: 129.1630 },
      { lat: 35.1590, lng: 129.1630 },
      { lat: 35.1590, lng: 129.1660 },
      { lat: 35.1570, lng: 129.1660 },
    ],
    safetyLevel: 'MEDIUM',
    description: '어선 통항로로 주의 필요',
  },
];

// 안전도 계산 함수
export function calculateSafetyScore(
  locationName: string,
  activityType: string,
  participantCount: number
): SafetyAnalysisData {
  const weather = mockWeatherData[locationName];
  const fishery = mockFisheryInfo[locationName];
  
  let overallScore = 100;
  let navigationScore = 100;
  let weatherScore = 100;
  let fisheryScore = 100;
  
  // 기상 점수 계산
  if (weather) {
    switch (weather.condition) {
      case 'STORMY':
        weatherScore = 20;
        break;
      case 'RAINY':
        weatherScore = 40;
        break;
      case 'CLOUDY':
        weatherScore = 70;
        break;
      case 'CLEAR':
        weatherScore = 90;
        break;
    }
    
    // 풍속 고려
    if (weather.windSpeed > 10) weatherScore -= 30;
    else if (weather.windSpeed > 5) weatherScore -= 15;
    
    // 파고 고려
    if (weather.waveHeight > 1.5) weatherScore -= 40;
    else if (weather.waveHeight > 1.0) weatherScore -= 20;
  }
  
  // 어업권 점수 계산
  if (fishery && fishery.hasRestriction) {
    fisheryScore = 60;
  }
  
  // 항로 점수 계산
  const location = mockLocations.find(loc => loc.name === locationName);
  if (location && location.navigationRoute) {
    navigationScore = 50;
  }
  
  // 참가자 수 고려
  if (participantCount > 10) overallScore -= 10;
  if (participantCount > 20) overallScore -= 10;
  
  // 전체 점수 계산
  overallScore = Math.min(overallScore, (weatherScore + fisheryScore + navigationScore) / 3);
  
  let status: SafetyStatus;
  let message: string;
  
  if (overallScore >= 70) {
    status = 'APPROVED';
    message = '안전한 활동이 가능합니다. 즐거운 해양레저를 즐기세요!';
  } else if (overallScore >= 40) {
    status = 'CAUTION';
    message = '주의가 필요합니다. 안전수칙을 준수하고 기상상황을 지속 확인하세요.';
  } else {
    status = 'DENIED';
    message = '현재 활동이 위험합니다. 활동을 연기하거나 다른 장소를 고려하세요.';
  }
  
  return {
    overallScore: Math.round(overallScore),
    navigationScore: Math.round(navigationScore),
    weatherScore: Math.round(weatherScore),
    fisheryScore: Math.round(fisheryScore),
    status,
    message,
  };
}
