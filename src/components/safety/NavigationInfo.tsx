'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import type { Location } from '@/types/global';

interface NavigationInfoProps {
  location: Location;
  className?: string;
}

export const NavigationInfo: React.FC<NavigationInfoProps> = ({
  location,
  className = ''
}) => {
  const hasNavigationRoute = location.navigationRoute;

  return (
    <Card className={`${className} animate__animated animate__slideInUp animate-delay-1500ms`}>
      <CardHeader className={`${hasNavigationRoute ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'} border-b`}>
        <CardTitle className="flex items-center space-x-3">
          <span className="text-2xl">{hasNavigationRoute ? '⚓' : '🏊‍♂️'}</span>
          <div>
            <h3 className={`text-xl font-bold ${hasNavigationRoute ? 'text-blue-800' : 'text-green-800'}`}>
              항로 정보
            </h3>
            <p className={`text-sm ${hasNavigationRoute ? 'text-blue-600' : 'text-green-600'} opacity-75`}>
              {hasNavigationRoute ? '주요 항로 근처입니다' : '항로와 충분히 떨어져 있습니다'}
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        {hasNavigationRoute ? (
          <div className="space-y-4">
            {/* 항로 주의사항 */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <span className="mr-2">⚠️</span>
                항로 안전 수칙
              </h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>대형 선박의 항행을 방해하지 마세요</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>선박의 진행 방향을 예측하여 충분한 거리를 유지하세요</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>야간에는 반사판이나 조명을 착용하세요</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>VHF 무선기를 준비하여 비상시 연락 가능하도록 하세요</span>
                </li>
              </ul>
            </div>

            {/* 항로 현황 */}
            <div className="space-y-3">
              <h5 className="font-semibold text-gray-800">현재 항로 현황</h5>
              <div className="grid grid-cols-1 gap-3">
                {getNavigationStatus(location).map((status, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{status.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800">{status.route}</div>
                        <div className="text-xs text-gray-600">{status.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded-full ${status.trafficColor}`}>
                        {status.traffic}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{status.frequency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 선박 유형별 주의사항 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h6 className="font-semibold text-yellow-800 mb-2 flex items-center">
                  <span className="mr-2">🚢</span>
                  대형 선박
                </h6>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• 정지거리가 매우 깁니다</li>
                  <li>• 사각지대가 넓습니다</li>
                  <li>• 최소 500m 거리 유지</li>
                </ul>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <h6 className="font-semibold text-orange-800 mb-2 flex items-center">
                  <span className="mr-2">⛵</span>
                  어선/요트
                </h6>
                <ul className="text-xs text-orange-700 space-y-1">
                  <li>• 갑작스런 방향 전환</li>
                  <li>• 어구 투입/회수 중</li>
                  <li>• 200m 거리 유지</li>
                </ul>
              </div>
            </div>

            {/* 비상 연락처 */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h5 className="font-semibold text-red-800 mb-2 flex items-center">
                <span className="mr-2">🚨</span>
                해상 비상 연락처
              </h5>
              <div className="space-y-2 text-sm text-red-700">
                <div className="flex justify-between items-center">
                  <span>해양경찰서</span>
                  <span className="font-mono">122</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>해상교통관제센터</span>
                  <span className="font-mono">051-123-4567</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>항만 관제실</span>
                  <span className="font-mono">051-456-7890</span>
                </div>
              </div>
            </div>

            {/* 항로 통과 시간 */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">항로 통과 시간표</h5>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xs text-gray-600 mb-1">화물선</div>
                  <div className="text-sm font-medium">06:00 - 18:00</div>
                  <div className="text-xs text-orange-600">혼잡</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">여객선</div>
                  <div className="text-sm font-medium">07:00 - 22:00</div>
                  <div className="text-xs text-yellow-600">보통</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">어선</div>
                  <div className="text-sm font-medium">05:00 - 20:00</div>
                  <div className="text-xs text-green-600">원활</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 안전 구역 안내 */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <span className="mr-2">✅</span>
                안전한 해역
              </h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>주요 항로와 충분한 거리를 유지하고 있습니다</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>대형 선박의 통행이 제한적입니다</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>안전한 해양레저 활동이 가능합니다</span>
                </li>
              </ul>
            </div>

            {/* 주변 시설 정보 */}
            <div className="space-y-3">
              <h5 className="font-semibold text-gray-800">주변 해상 시설</h5>
              <div className="grid grid-cols-1 gap-2">
                {getNearbyFacilities().map((facility, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{facility.icon}</span>
                      <div>
                        <div className="font-medium text-blue-800">{facility.name}</div>
                        <div className="text-xs text-blue-600">{facility.distance}</div>
                      </div>
                    </div>
                    <div className="text-xs text-blue-700">
                      {facility.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 일반 항행 수칙 */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="mr-2">📋</span>
                기본 항행 수칙
              </h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 다른 이용자와의 충돌 방지</li>
                <li>• 정해진 속도 제한 준수</li>
                <li>• 환경 보호 및 소음 최소화</li>
                <li>• 응급상황 대비 안전장비 착용</li>
              </ul>
            </div>
          </div>
        )}

        {/* 해상교통 정보 링크 */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">실시간 해상교통 정보</span>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              해상교통 정보시스템 →
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 항로 현황 정보 (시뮬레이션)
function getNavigationStatus(location: Location) {
  return [
    {
      icon: '🚢',
      route: '부산항 ↔ 제주항',
      description: '대형 화물선/여객선 항로',
      traffic: '혼잡',
      trafficColor: 'bg-red-100 text-red-700',
      frequency: '30분마다'
    },
    {
      icon: '⛵',
      route: '연근해 어선 항로',
      description: '지역 어선 통행로',
      traffic: '보통',
      trafficColor: 'bg-yellow-100 text-yellow-700',
      frequency: '수시'
    },
    {
      icon: '🚤',
      route: '레저보트 항로',
      description: '요트/레저보트 구역',
      traffic: '원활',
      trafficColor: 'bg-green-100 text-green-700',
      frequency: '비정기'
    }
  ];
}

// 주변 시설 정보
function getNearbyFacilities() {
  return [
    {
      icon: '🏥',
      name: '해상구조대',
      distance: '1.2km',
      type: '응급구조'
    },
    {
      icon: '⚓',
      name: '해운대 마리나',
      distance: '2.8km',
      type: '계류시설'
    },
    {
      icon: '🛟',
      name: '해상안전센터',
      distance: '3.5km',
      type: '안전관리'
    },
    {
      icon: '⛽',
      name: '연료 보급소',
      distance: '4.1km',
      type: '보급시설'
    }
  ];
}
