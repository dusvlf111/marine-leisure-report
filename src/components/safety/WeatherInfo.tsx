'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import type { WeatherData } from '@/types/global';

interface WeatherInfoProps {
  weather: WeatherData;
  className?: string;
}

export const WeatherInfo: React.FC<WeatherInfoProps> = ({
  weather,
  className = ''
}) => {
  const getWeatherInfo = (condition: string) => {
    switch (condition) {
      case 'CLEAR':
        return {
          icon: '☀️',
          label: '맑음',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800'
        };
      case 'CLOUDY':
        return {
          icon: '☁️',
          label: '흐림',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800'
        };
      case 'RAINY':
        return {
          icon: '🌧️',
          label: '비',
          bgColor: 'bg-slate-50',
          borderColor: 'border-slate-200',
          textColor: 'text-slate-800'
        };
      case 'STORMY':
        return {
          icon: '⛈️',
          label: '폭풍',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800'
        };
      default:
        return {
          icon: '🌤️',
          label: '정보 없음',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800'
        };
    }
  };

  const getWindLevel = (windSpeed: number) => {
    if (windSpeed < 5) return { level: '약함', color: 'text-green-600', bg: 'bg-green-100' };
    if (windSpeed < 10) return { level: '보통', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (windSpeed < 15) return { level: '강함', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: '매우 강함', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getWaveLevel = (waveHeight: number) => {
    if (waveHeight < 1) return { level: '낮음', color: 'text-green-600', bg: 'bg-green-100' };
    if (waveHeight < 2) return { level: '보통', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (waveHeight < 3) return { level: '높음', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: '매우 높음', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getVisibilityInfo = (visibility: string) => {
    switch (visibility) {
      case 'GOOD':
        return { label: '양호', color: 'text-green-600', bg: 'bg-green-100' };
      case 'MODERATE':
        return { label: '보통', color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'POOR':
        return { label: '불량', color: 'text-red-600', bg: 'bg-red-100' };
      default:
        return { label: '정보 없음', color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const weatherInfo = getWeatherInfo(weather.condition);
  const windInfo = getWindLevel(weather.windSpeed);
  const waveInfo = getWaveLevel(weather.waveHeight);
  const visibilityInfo = getVisibilityInfo(weather.visibility);

  return (
    <Card className={`${className} animate__animated animate__slideInUp animate-delay-500ms`}>
      <CardHeader className={`${weatherInfo.bgColor} ${weatherInfo.borderColor} border-b`}>
        <CardTitle className="flex items-center space-x-3">
          <span className="text-2xl">{weatherInfo.icon}</span>
          <div>
            <h3 className={`text-xl font-bold ${weatherInfo.textColor}`}>
              현재 기상 정보
            </h3>
            <p className={`text-sm ${weatherInfo.textColor} opacity-75`}>
              {weatherInfo.label} • {weather.temperature}°C
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          {/* 풍속 */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">💨</div>
            <h4 className="text-sm font-semibold text-gray-600 mb-1">풍속</h4>
            <div className="text-lg font-bold text-gray-800 mb-2">
              {weather.windSpeed.toFixed(1)} m/s
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${windInfo.bg} ${windInfo.color}`}>
              {windInfo.level}
            </span>
          </div>

          {/* 파고 */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">🌊</div>
            <h4 className="text-sm font-semibold text-gray-600 mb-1">파고</h4>
            <div className="text-lg font-bold text-gray-800 mb-2">
              {weather.waveHeight.toFixed(1)} m
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${waveInfo.bg} ${waveInfo.color}`}>
              {waveInfo.level}
            </span>
          </div>

          {/* 가시거리 */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">👁️</div>
            <h4 className="text-sm font-semibold text-gray-600 mb-1">시야</h4>
            <div className="text-lg font-bold text-gray-800 mb-2">
              {visibilityInfo.label}
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${visibilityInfo.bg} ${visibilityInfo.color}`}>
              {weather.visibility}
            </span>
          </div>

          {/* 수온 (추정) */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">🌡️</div>
            <h4 className="text-sm font-semibold text-gray-600 mb-1">수온 (추정)</h4>
            <div className="text-lg font-bold text-gray-800 mb-2">
              {Math.max(10, weather.temperature - 3)}°C
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
              참고용
            </span>
          </div>
        </div>

        {/* 기상 주의사항 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
            <span className="mr-2">📋</span>
            기상 주의사항
          </h5>
          <div className="text-sm text-blue-700 space-y-1">
            {getWeatherWarnings(weather).map((warning, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 실시간 업데이트 시간 */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            마지막 업데이트: {new Date().toLocaleString('ko-KR')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// 기상 조건별 주의사항 생성
function getWeatherWarnings(weather: WeatherData): string[] {
  const warnings: string[] = [];

  if (weather.condition === 'STORMY') {
    warnings.push('폭풍 경보 - 즉시 안전한 곳으로 대피하세요');
  } else if (weather.condition === 'RAINY') {
    warnings.push('강우로 인한 시야 저하 및 미끄러짐 주의');
  }

  if (weather.windSpeed >= 15) {
    warnings.push('강풍 주의 - 소형 보트 활동 자제 권장');
  } else if (weather.windSpeed >= 10) {
    warnings.push('바람이 강합니다 - 초보자는 활동 자제');
  }

  if (weather.waveHeight >= 2.5) {
    warnings.push('높은 파도 - 해상 활동 매우 위험');
  } else if (weather.waveHeight >= 1.5) {
    warnings.push('파도 주의 - 경험있는 활동자만 권장');
  }

  if (weather.visibility === 'POOR') {
    warnings.push('시야 불량 - 항해 및 수상 활동 자제');
  }

  if (weather.temperature <= 15) {
    warnings.push('낮은 기온 - 보온복 착용 필수');
  }

  if (warnings.length === 0) {
    warnings.push('현재 기상 조건은 양호합니다');
  }

  return warnings;
}
