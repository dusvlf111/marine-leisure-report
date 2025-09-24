// 전역 타입 정의
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  name: string;
  coordinates: Coordinates;
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
  navigationScore: number;
  weatherScore: number;
  fisheryScore: number;
  status: SafetyStatus;
  message: string;
}

export interface WeatherData {
  condition: 'CLEAR' | 'CLOUDY' | 'RAINY' | 'STORMY';
  temperature: number;
  windSpeed: number;
  waveHeight: number;
}

export interface FisheryInfo {
  hasRestriction: boolean;
  restrictionType?: string;
  contactInfo?: string;
}

export interface EmergencyContacts {
  coastGuard: string;
  localPolice: string;
  fishingAssociation?: string;
}
