'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { EmergencyContacts as EmergencyContactsType } from '@/types/global';

interface EmergencyContactsProps {
  contacts: EmergencyContactsType;
  location?: { lat: number; lng: number };
  className?: string;
}

export const EmergencyContacts: React.FC<EmergencyContactsProps> = ({
  contacts,
  location,
  className = ''
}) => {
  const [copiedContact, setCopiedContact] = useState<string>('');

  const handleCopyContact = async (contact: string, label: string) => {
    try {
      await navigator.clipboard.writeText(contact);
      setCopiedContact(label);
      setTimeout(() => setCopiedContact(''), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  const emergencyContacts = [
    {
      icon: '🚨',
      label: '해양경찰서',
      number: contacts.coastGuard,
      description: '해상 응급상황 신고',
      color: 'bg-red-50 border-red-200 text-red-700',
      priority: 'high'
    },
    {
      icon: '🚑',
      label: '응급구조',
      number: contacts.rescue,
      description: '의료 응급상황',
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      priority: 'high'
    },
    {
      icon: '🏢',
      label: '지자체',
      number: contacts.localAuthority,
      description: '행정 문의사항',
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      priority: 'medium'
    }
  ];

  if (contacts.fishingAssociation) {
    emergencyContacts.push({
      icon: '🎣',
      label: '어촌계',
      number: contacts.fishingAssociation,
      description: '어업 관련 문의',
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      priority: 'medium'
    });
  }

  return (
    <Card className={`${className} animate__animated animate__slideInUp animate-delay-2s`}>
      <CardHeader className="bg-red-50 border-red-200 border-b">
        <CardTitle className="flex items-center space-x-3">
          <span className="text-2xl">🚨</span>
          <div>
            <h3 className="text-xl font-bold text-red-800">
              응급 연락처
            </h3>
            <p className="text-sm text-red-600 opacity-75">
              위급시 즉시 연락하세요
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* 긴급 연락처 목록 */}
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div 
                key={contact.label}
                className={`p-4 border rounded-lg ${contact.color} animate__animated animate__slideInLeft`}
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{contact.icon}</span>
                    <div>
                      <h4 className="font-semibold">{contact.label}</h4>
                      <p className="text-xs opacity-75">{contact.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-lg font-bold">
                      {contact.number}
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleCopyContact(contact.number, contact.label)}
                      className="text-xs"
                    >
                      {copiedContact === contact.label ? '복사됨!' : '복사'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 위치 정보 전송 */}
          {location && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                <span className="mr-2">📍</span>
                현재 위치 정보
              </h5>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex justify-between">
                  <span>위도:</span>
                  <span className="font-mono">{location.lat.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>경도:</span>
                  <span className="font-mono">{location.lng.toFixed(6)}</span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full mt-3"
                onClick={() => handleCopyContact(
                  `위도: ${location.lat.toFixed(6)}, 경도: ${location.lng.toFixed(6)}`,
                  '위치정보'
                )}
              >
                위치 정보 복사
              </Button>
            </div>
          )}

          {/* 응급상황 행동 요령 */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h5 className="font-semibold text-yellow-800 mb-3 flex items-center">
              <span className="mr-2">📋</span>
              응급상황 행동 요령
            </h5>
            <div className="space-y-3 text-sm text-yellow-700">
              {getEmergencyProcedures().map((procedure, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{procedure}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 추가 안전 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <div className="text-lg mb-1">🦺</div>
              <div className="text-xs text-green-700 font-semibold mb-1">구명조끼</div>
              <div className="text-xs text-green-600">항상 착용</div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <div className="text-lg mb-1">📱</div>
              <div className="text-xs text-blue-700 font-semibold mb-1">휴대전화</div>
              <div className="text-xs text-blue-600">방수팩 보관</div>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
              <div className="text-lg mb-1">🚩</div>
              <div className="text-xs text-purple-700 font-semibold mb-1">신호기</div>
              <div className="text-xs text-purple-600">호루라기 준비</div>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
              <div className="text-lg mb-1">🔦</div>
              <div className="text-xs text-orange-700 font-semibold mb-1">조명</div>
              <div className="text-xs text-orange-600">야간 필수</div>
            </div>
          </div>

          {/* 응급처치 기본 사항 */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">🏥</span>
              응급처치 기본 사항
            </h5>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span>의식 확인 → 기도 확보 → 호흡 확인</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span>익수자 발견 시 즉시 119 신고</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span>체온 유지 및 안전한 장소로 이동</span>
              </div>
            </div>
          </div>

          {/* 앱 바로가기 */}
          <div className="pt-4 border-t border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3">응급상황 앱</h5>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-red-100 hover:bg-red-200 rounded-lg text-center transition-colors">
                <div className="text-lg mb-1">🚨</div>
                <div className="text-xs text-red-800 font-semibold">긴급신고</div>
                <div className="text-xs text-red-600">112/119 통합</div>
              </button>
              <button className="p-3 bg-blue-100 hover:bg-blue-200 rounded-lg text-center transition-colors">
                <div className="text-lg mb-1">🏥</div>
                <div className="text-xs text-blue-800 font-semibold">응급의료</div>
                <div className="text-xs text-blue-600">병원 찾기</div>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 응급상황 행동 요령
function getEmergencyProcedures(): string[] {
  return [
    '침착함을 유지하고 상황을 정확히 파악하세요',
    '즉시 해양경찰서(122) 또는 응급구조(119)에 신고하세요',
    '현재 위치를 정확히 전달하세요 (GPS 좌표 활용)',
    '부상자가 있다면 응급처치를 실시하세요',
    '구조대 도착까지 안전한 장소에서 대기하세요',
    '추가 사고 방지를 위해 다른 이용자들에게 알리세요'
  ];
}
