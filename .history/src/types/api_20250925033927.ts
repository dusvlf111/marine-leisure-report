import { Location, ActivityType, SafetyAnalysisData } from './global';

// API 요청 타입
export interface ReportRequest {
  location: Location;
  activityType: ActivityType;
  participantCount: number;
  contactInfo: {
    name: string;
    phone: string;
  };
  activityDate: string;
  duration: number; // 시간 단위
}

// API 응답 타입
export interface ReportResponse {
  success: boolean;
  reportId?: string;
  message?: string;
  error?: string;
}

export interface SafetyAnalysisResponse {
  success: boolean;
  data?: SafetyAnalysisData;
  error?: string;
}

export interface SafetyZone {
  id: string;
  coordinates: Array<{ lat: number; lng: number }>;
  status: 'safe' | 'caution' | 'restricted';
  description: string;
}

export interface MapMarker {
  id: string;
  type: 'emergency' | 'harbor' | 'fishing';
  coordinates: { lat: number; lng: number };
  title: string;
  description?: string;
}
