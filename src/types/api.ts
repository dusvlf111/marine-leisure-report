import { SafetyAnalysisData, WeatherData, FisheryInfo, EmergencyContacts, Location, ActivityType } from './global';

// API 공통 응답 타입
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 신고 요청 타입
export interface ReportRequest {
  location: Location;
  activityType: ActivityType;
  participantCount: number;
  contactInfo: {
    name: string;
    phone: string;
  };
  activityDate: string;
  duration: number;
}

// 신고 응답 타입
export interface ReportResponse {
  success: boolean;
  data: {
    reportId: string;
    status: import('./global').SafetyStatus;
    analysis: SafetyAnalysisData;
    weather: WeatherData;
    recommendations: string[];
    emergencyContacts: EmergencyContacts;
    safetyZones: import('./global').SafetyZone[];
  };
  error?: string;
}

// 신고 상세 조회 응답 타입
export interface ReportDetailResponse extends ReportResponse {
  requestData: ReportRequest;
  weatherData: WeatherData;
  fisheryInfo: FisheryInfo;
  emergencyContacts: EmergencyContacts;
}

// 안전도 분석 요청 타입
export interface SafetyAnalysisRequest {
  location: Location;
  activityType: ActivityType;
  participantCount: number;
  activityDate: string;
}

// 안전도 분석 응답 타입
export interface SafetyAnalysisResponse extends ApiResponse<SafetyAnalysisData> {
  weatherData: WeatherData;
  fisheryInfo: FisheryInfo;
}

// 지도 관련 타입
export interface MapMarker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  type: 'EMERGENCY' | 'PORT' | 'FISHING_ASSOCIATION';
  title: string;
  phone?: string;
}

// 오류 응답 타입
export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: unknown;
}
