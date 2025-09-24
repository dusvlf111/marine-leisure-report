// 전역 타입 정의
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  name: string;
  coordinates: Coordinates;
  safetyLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
  fishingRights?: boolean;
  navigationRoute?: boolean;
}

export type ActivityType = 
  | '패들보드' 
  | '프리다이빙'
  | '카약'
  | '윈드서핑'
  | '수상스키'
  | '요트';

export type SafetyStatus = 'APPROVED' | 'CAUTION' | 'DENIED';

export interface SafetyAnalysisData {
  overallScore: number;
  weatherScore: number;
  locationScore: number;
  fishingRightScore: number;
  navigationScore: number;
}

export interface WeatherData {
  condition: 'CLEAR' | 'CLOUDY' | 'RAINY' | 'STORMY';
  windSpeed: number;
  waveHeight: number;
  visibility: 'GOOD' | 'MODERATE' | 'POOR';
  temperature: number;
}

export interface FisheryInfo {
  hasRestriction: boolean;
  restrictionType?: string;
  contactInfo?: string;
}

export interface EmergencyContacts {
  coastGuard: string;
  rescue: string;
  localAuthority: string;
  fishingAssociation?: string;
}

export interface SafetyZone {
  id: string;
  name: string;
  type: 'SAFE' | 'CAUTION' | 'DANGER' | 'FISHING' | 'NAVIGATION';
  coordinates: Coordinates[];
  description: string;
}
