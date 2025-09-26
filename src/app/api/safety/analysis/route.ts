import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { mockLocations, mockSafetyZones } from '@/lib/data/mockData';
import type { SafetyStatus, SafetyAnalysisData, WeatherData } from '@/types/global';
import { calculateDistance } from '@/lib/utils/mapUtils';

// 안전도 분석 요청 스키마
const safetyAnalysisSchema = z.object({
  location: z.object({
    name: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    })
  }),
  activityType: z.string()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 요청 데이터 검증
    const { location, activityType } = safetyAnalysisSchema.parse(body);
    
    // 위치 기반 안전도 분석
    const locationInfo = mockLocations.find(loc => 
      loc.name === location.name ||
      (Math.abs(loc.coordinates.lat - location.coordinates.lat) < 0.01 &&
       Math.abs(loc.coordinates.lng - location.coordinates.lng) < 0.01)
    ) || mockLocations[0];

    // 현재 기상 조건 시뮬레이션
    const weatherCondition = getCurrentWeatherSimulation();
    
    // 안전도 분석 수행
    const analysis = performQuickSafetyAnalysis(locationInfo as unknown as Record<string, unknown>, activityType, weatherCondition);
    
    // 주변 안전구역 정보
    const nearbyZones = mockSafetyZones.filter(zone => 
      calculateDistance(zone.coordinates[0], location.coordinates) < 15000 // 15km 이내 (미터 단위)
    );

    const response = {
      success: true,
      data: {
        analysis,
        weather: weatherCondition,
        safetyZones: nearbyZones,
        recommendations: generateQuickRecommendations(analysis.status, weatherCondition)
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Safety analysis error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: '요청 데이터가 올바르지 않습니다.',
          details: error.issues
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: '안전도 분석 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    );
  }
}

// 실시간 기상 조건 시뮬레이션
function getCurrentWeatherSimulation(): WeatherData {
  const conditions = ['CLEAR', 'CLOUDY', 'RAINY'] as const;
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  // 현재 시간 기반으로 조건 조정
  const hour = new Date().getHours();
  let condition = randomCondition;
  
  // 저녁시간에는 약간 더 위험한 조건
  if (hour >= 18 || hour <= 6) {
    condition = Math.random() > 0.7 ? 'RAINY' : condition;
  }

  return {
    condition,
    windSpeed: Math.random() * 15 + 2, // 2-17 m/s
    waveHeight: Math.random() * 2.5 + 0.3, // 0.3-2.8m
    visibility: condition === 'CLEAR' ? 'GOOD' : 
               condition === 'CLOUDY' ? 'MODERATE' : 'POOR',
    temperature: Math.random() * 12 + 18 // 18-30도
  };
}

// 빠른 안전도 분석
function performQuickSafetyAnalysis(
  locationInfo: Record<string, unknown>,
  activityType: string,
  weather: WeatherData
): { status: SafetyStatus; score: SafetyAnalysisData } {
  
  // 위치 안전도 (기본값)
  let locationScore = 80;
  if (locationInfo.safetyLevel === 'HIGH') locationScore = 95;
  if (locationInfo.safetyLevel === 'LOW') locationScore = 60;
  
  // 기상 안전도
  let weatherScore = 85;
  if (weather.condition === 'RAINY') weatherScore -= 30;
  if (weather.condition === 'STORMY') weatherScore -= 50;
  if (weather.windSpeed > 12) weatherScore -= 20;
  if (weather.waveHeight > 2.0) weatherScore -= 25;
  
  // 어업권/항로 점수
  const fishingRightScore = locationInfo.fishingRights ? 75 : 100;
  const navigationScore = locationInfo.navigationRoute ? 80 : 100;
  
  // 종합 점수
  const overallScore = Math.round(
    locationScore * 0.3 + 
    weatherScore * 0.4 + 
    fishingRightScore * 0.15 + 
    navigationScore * 0.15
  );
  
  // 안전 상태 결정
  let status: SafetyStatus;
  if (overallScore >= 85) status = 'APPROVED';
  else if (overallScore >= 65) status = 'CAUTION';
  else status = 'DENIED';
  
  return {
    status,
    score: {
      overallScore,
      weatherScore,
      locationScore,
      fishingRightScore,
      fisheryScore: fishingRightScore * 0.9, // 어업 관련 점수
      navigationScore
    }
  };
}

// 빠른 추천사항 생성
function generateQuickRecommendations(status: SafetyStatus, weather: WeatherData): string[] {
  const recommendations: string[] = [];
  
  if (status === 'APPROVED') {
    recommendations.push('✅ 현재 안전한 활동 조건입니다.');
    recommendations.push('🦺 안전장비 착용을 권장합니다.');
  } else if (status === 'CAUTION') {
    recommendations.push('⚠️ 주의가 필요한 조건입니다.');
    recommendations.push('👥 경험있는 동행자와 함께 하세요.');
    if (weather.windSpeed > 10) {
      recommendations.push('💨 강풍 주의가 필요합니다.');
    }
  } else {
    recommendations.push('❌ 현재 활동을 권장하지 않습니다.');
    recommendations.push('📅 기상 개선 후 재검토하세요.');
  }
  
  return recommendations;
}


