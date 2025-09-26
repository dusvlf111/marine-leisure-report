import { NextRequest, NextResponse } from 'next/server';
import { reportSchema } from '@/lib/data/schemas';
import { generateReportId } from '@/lib/utils';
import { mockLocations, mockSafetyZones } from '@/lib/data/mockData';
import type { ReportResponse } from '@/types/api';
import type { SafetyStatus, SafetyAnalysisData, WeatherData, ActivityType, Location } from '@/types/global';
import { calculateDistance } from '@/lib/utils/mapUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 요청 데이터 검증
    const validatedData = reportSchema.parse(body);
    
    // AI 안전도 분석 수행 (목데이터 기반 시뮬레이션)
    const analysis = await performSafetyAnalysis(validatedData);
    
    // 리포트 ID 생성
    const reportId = generateReportId();
    
    // 응답 생성
    const response: ReportResponse = {
      success: true,
      data: {
        reportId,
        status: analysis.status,
        analysis: analysis.analysisData,
        weather: analysis.weather,
        recommendations: analysis.recommendations,
        emergencyContacts: {
          coastGuard: '국번없이 122',
          rescue: '119',
          localAuthority: '051-709-4000',
          localPolice: '051-700-5000',
          fishingAssociation: '051-123-4567'
        },
        safetyZones: analysis.safetyZones
      }
    };

    // 성공 응답 (캐싱 헤더 포함)
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Report submission error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          error: '입력 데이터가 올바르지 않습니다.',
          details: (error as unknown as { errors: unknown }).errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
      },
      { status: 500 }
    );
  }
}

// AI 안전도 분석 로직 (규칙 기반 시뮬레이션)
async function performSafetyAnalysis(data: Record<string, unknown>) {
  // 위치 기반 안전도 계산
  const location = data.location as Location;
  const locationInfo = mockLocations.find(loc => 
    loc.name === location.name || 
    (Math.abs(loc.coordinates.lat - location.coordinates.lat) < 0.01 &&
     Math.abs(loc.coordinates.lng - location.coordinates.lng) < 0.01)
  ) || mockLocations[0];

  // 기상 조건 시뮬레이션 (현재 시간 기반)
  const weatherCondition = getWeatherSimulation();
  
  // 활동별 위험도 계산
  const activity = data.activity as { type: ActivityType; participants: number; startTime: string; endTime: string };
  const activityRisk = getActivityRiskScore(activity.type, activity.participants);
  
  // 시간대별 위험도 (야간 활동 등)
  const timeRisk = getTimeRiskScore(activity.startTime, activity.endTime);
  
  // 종합 안전도 점수 계산 (0-100점)
  const locationScore = getLocationSafetyScore(locationInfo.safetyLevel);
  const weatherScore = getWeatherSafetyScore(weatherCondition);
  const overallScore = Math.round(
    (locationScore * 0.3 + weatherScore * 0.4 + activityRisk * 0.2 + timeRisk * 0.1)
  );

  // 안전 상태 결정
  let status: SafetyStatus;
  if (overallScore >= 80) {
    status = 'APPROVED';
  } else if (overallScore >= 60) {
    status = 'CAUTION';
  } else {
    status = 'DENIED';
  }

  // 분석 데이터 구성
  const analysisData: SafetyAnalysisData = {
    overallScore,
    weatherScore,
    locationScore,
    fishingRightScore: locationInfo.fishingRights ? 70 : 100,
    fisheryScore: locationInfo.fishingRights ? 65 : 95, // 어업권 관련 점수
    navigationScore: locationInfo.navigationRoute ? 75 : 100
  };

  // 추천 사항 생성
  const recommendations = generateRecommendations(status, analysisData, weatherCondition, locationInfo as unknown as Record<string, unknown>);

  // 안전구역 정보 (해당 지역 주변)
  const safetyZones = mockSafetyZones.filter(zone => 
    calculateDistance(
      zone.coordinates[0], 
      location.coordinates
    ) < 10000 // 10km 이내 (미터 단위)
  );

  return {
    status,
    analysisData,
    weather: weatherCondition,
    recommendations,
    safetyZones
  };
}

// 기상 조건 시뮬레이션
function getWeatherSimulation(): WeatherData {
  const conditions = ['CLEAR', 'CLOUDY', 'RAINY', 'STORMY'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    condition: randomCondition as 'CLEAR' | 'CLOUDY' | 'RAINY' | 'STORMY',
    windSpeed: Math.random() * 20 + 5, // 5-25 m/s
    waveHeight: Math.random() * 3 + 0.5, // 0.5-3.5m
    visibility: randomCondition === 'CLEAR' ? 'GOOD' : 
               randomCondition === 'CLOUDY' ? 'MODERATE' : 'POOR',
    temperature: Math.random() * 15 + 15 // 15-30도
  };
}

// 활동별 위험도 점수 계산
function getActivityRiskScore(activityType: ActivityType, participants: number): number {
  const activityRisks: Record<ActivityType, number> = {
    '패들보드': 85,
    '카약': 80,
    '윈드서핑': 70,
    '프리다이빙': 50,
    '수상스키': 70,
    '요트': 75
  };

  const baseScore = activityRisks[activityType] || 75;
  const participantPenalty = participants > 5 ? (participants - 5) * 2 : 0;
  
  return Math.max(30, baseScore - participantPenalty);
}

// 시간대별 위험도 계산
function getTimeRiskScore(startTime: string, endTime: string): number {
  const start = new Date(`2025-01-01T${startTime}`);
  const end = new Date(`2025-01-01T${endTime}`);
  const startHour = start.getHours();
  const endHour = end.getHours();

  // 야간 활동 (18시-6시) 페널티
  if (startHour >= 18 || startHour <= 6 || endHour >= 18 || endHour <= 6) {
    return 60;
  }
  
  // 이른 아침이나 늦은 오후
  if (startHour <= 8 || endHour >= 17) {
    return 80;
  }
  
  return 100; // 일반 시간대
}

// 위치 안전도 점수 변환
function getLocationSafetyScore(safetyLevel?: string): number {
  switch (safetyLevel) {
    case 'HIGH': return 95;
    case 'MEDIUM': return 75;
    case 'LOW': return 50;
    default: return 75;
  }
}

// 기상 안전도 점수 계산
function getWeatherSafetyScore(weather: WeatherData): number {
  let score = 100;
  
  // 기상 조건별 점수
  switch (weather.condition) {
    case 'STORMY': score -= 50; break;
    case 'RAINY': score -= 30; break;
    case 'CLOUDY': score -= 10; break;
    case 'CLEAR': break;
  }
  
  // 풍속 페널티
  if (weather.windSpeed > 15) score -= 20;
  else if (weather.windSpeed > 10) score -= 10;
  
  // 파고 페널티
  if (weather.waveHeight > 2.0) score -= 25;
  else if (weather.waveHeight > 1.5) score -= 15;
  
  return Math.max(20, score);
}

// 추천사항 생성
function generateRecommendations(
  status: SafetyStatus, 
  analysis: SafetyAnalysisData, 
  weather: WeatherData,
  locationInfo: Record<string, unknown>
): string[] {
  const recommendations: string[] = [];

  if (status === 'APPROVED') {
    recommendations.push('✅ 안전한 활동 조건입니다. 즐거운 해양레저를 즐기세요!');
    recommendations.push('🦺 구명조끼 착용을 필수로 하세요.');
    recommendations.push('📱 비상연락망을 미리 확인하세요.');
  } else if (status === 'CAUTION') {
    recommendations.push('⚠️ 주의가 필요한 기상 조건입니다.');
    recommendations.push('👥 동행자와 함께 활동하세요.');
    recommendations.push('⏰ 활동 시간을 단축하는 것을 권장합니다.');
    
    if (weather.windSpeed > 10) {
      recommendations.push('💨 강한 바람으로 인한 주의가 필요합니다.');
    }
    if (weather.waveHeight > 1.5) {
      recommendations.push('🌊 높은 파도로 인한 위험이 있습니다.');
    }
  } else {
    recommendations.push('❌ 현재 기상 조건으로는 활동을 권장하지 않습니다.');
    recommendations.push('📅 기상 조건이 개선된 후 다시 신고해주세요.');
    recommendations.push('🏠 안전한 실내 활동으로 대체를 권장합니다.');
  }

  if (locationInfo.fishingRights) {
    recommendations.push('🎣 어업권 구역입니다. 어업 활동과의 충돌을 주의하세요.');
  }

  if (locationInfo.navigationRoute) {
    recommendations.push('🚢 주요 항로 근처입니다. 선박 통행에 주의하세요.');
  }

  return recommendations;
}


