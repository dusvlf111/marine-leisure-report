'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import type { Location } from '@/types/global';

interface FisheryInfoProps {
  location: Location;
  className?: string;
}

export const FisheryInfo: React.FC<FisheryInfoProps> = ({
  location,
  className = ''
}) => {
  const hasFishingRights = location.fishingRights;

  return (
    <Card className={`${className} animate__animated animate__slideInUp animate-delay-1s`}>
      <CardHeader className={`${hasFishingRights ? 'bg-purple-50 border-purple-200' : 'bg-green-50 border-green-200'} border-b`}>
        <CardTitle className="flex items-center space-x-3">
          <span className="text-2xl">{hasFishingRights ? '🎣' : '🏊‍♂️'}</span>
          <div>
            <h3 className={`text-xl font-bold ${hasFishingRights ? 'text-purple-800' : 'text-green-800'}`}>
              어업권 정보
            </h3>
            <p className={`text-sm ${hasFishingRights ? 'text-purple-600' : 'text-green-600'} opacity-75`}>
              {hasFishingRights ? '어업권 구역입니다' : '자유 활동 구역입니다'}
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        {hasFishingRights ? (
          <div className="space-y-4">
            {/* 어업권 경고 */}
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                <span className="mr-2">⚠️</span>
                어업권 구역 주의사항
              </h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>어업 활동과의 충돌 방지를 위해 주의가 필요합니다</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>어구(그물, 낚시줄 등) 손상 방지에 유의하세요</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>어민과의 원활한 소통을 권장합니다</span>
                </li>
              </ul>
            </div>

            {/* 권장 활동 시간 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-lg mb-1">🌅</div>
                <div className="text-sm text-gray-600 mb-1">권장 시간</div>
                <div className="font-semibold text-gray-800">06:00 - 08:00</div>
                <div className="text-xs text-gray-500 mt-1">어업 활동 전</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-lg mb-1">🌇</div>
                <div className="text-sm text-gray-600 mb-1">권장 시간</div>
                <div className="font-semibold text-gray-800">17:00 - 19:00</div>
                <div className="text-xs text-gray-500 mt-1">어업 활동 후</div>
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                <span className="mr-2">📞</span>
                어촌계 연락처
              </h5>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex justify-between items-center">
                  <span>해운대구 어촌계</span>
                  <span className="font-mono">051-742-3456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>수산업 관련 문의</span>
                  <span className="font-mono">051-888-3333</span>
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                💡 활동 전 미리 연락하여 어업 현황을 확인하세요
              </p>
            </div>

            {/* 어업 활동 현황 */}
            <div className="space-y-3">
              <h5 className="font-semibold text-gray-800">현재 어업 활동 현황</h5>
              <div className="grid grid-cols-1 gap-2">
                {getFishingActivities(location).map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <span>{activity.icon}</span>
                      <span className="text-sm font-medium">{activity.type}</span>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded-full ${activity.statusColor}`}>
                        {activity.status}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 자유 구역 안내 */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <span className="mr-2">✅</span>
                자유 활동 구역
              </h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>어업권 제약이 없는 자유로운 해양레저 활동 가능</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>일반적인 안전 수칙만 준수하면 됩니다</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>다양한 수상 활동을 자유롭게 즐기세요</span>
                </li>
              </ul>
            </div>

            {/* 권장 활동 */}
            <div className="space-y-3">
              <h5 className="font-semibold text-gray-800">권장 활동</h5>
              <div className="grid grid-cols-2 gap-3">
                {getRecommendedActivities().map((activity, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg text-center">
                    <div className="text-lg mb-1">{activity.icon}</div>
                    <div className="text-sm font-medium text-blue-800">{activity.name}</div>
                    <div className="text-xs text-blue-600 mt-1">{activity.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 일반 주의사항 */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="mr-2">📋</span>
                일반 주의사항
              </h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 다른 이용자들과의 안전거리 유지</li>
                <li>• 환경 보호를 위한 쓰레기 수거</li>
                <li>• 야생동물 서식지 보호</li>
                <li>• 지정된 구역 내에서만 활동</li>
              </ul>
            </div>
          </div>
        )}

        {/* 수산업 정보 링크 */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">더 자세한 정보가 필요하세요?</span>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              수산업 정보 포털 →
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 어업 활동 현황 생성 (시뮬레이션)
function getFishingActivities(location: Location) {
  const activities = [
    {
      icon: '🎣',
      type: '연안 낚시',
      status: '활성',
      statusColor: 'bg-green-100 text-green-700',
      time: '05:00 - 11:00'
    },
    {
      icon: '🕸️',
      type: '정치망 어업',
      status: '대기',
      statusColor: 'bg-yellow-100 text-yellow-700',
      time: '12:00 - 15:00'
    },
    {
      icon: '🦐',
      type: '통발 어업',
      status: '비활성',
      statusColor: 'bg-gray-100 text-gray-700',
      time: '16:00 - 18:00'
    }
  ];
  
  return activities;
}

// 권장 활동 목록
function getRecommendedActivities() {
  return [
    {
      icon: '🏄‍♂️',
      name: '서핑',
      description: '파도 조건 양호'
    },
    {
      icon: '🚣‍♀️',
      name: '카약',
      description: '초보자 추천'
    },
    {
      icon: '🏊‍♂️',
      name: '수영',
      description: '안전구역 내'
    },
    {
      icon: '🤿',
      name: '스노클링',
      description: '수질 좋음'
    }
  ];
}
