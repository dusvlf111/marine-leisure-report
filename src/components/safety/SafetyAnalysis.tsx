'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import type { SafetyStatus, SafetyAnalysisData } from '@/types/global';

interface SafetyAnalysisProps {
  status: SafetyStatus;
  analysis: SafetyAnalysisData;
  className?: string;
}

export const SafetyAnalysis: React.FC<SafetyAnalysisProps> = ({
  status,
  analysis,
  className = ''
}) => {
  const getStatusInfo = (status: SafetyStatus) => {
    switch (status) {
      case 'APPROVED':
        return {
          icon: '✅',
          title: '활동 승인',
          message: '안전한 활동 조건입니다',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          animation: 'safety-approved'
        };
      case 'CAUTION':
        return {
          icon: '⚠️',
          title: '주의 필요',
          message: '주의사항을 준수하여 활동하세요',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          animation: 'safety-caution'
        };
      case 'DENIED':
        return {
          icon: '❌',
          title: '활동 비권장',
          message: '현재 조건에서는 활동을 권장하지 않습니다',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          animation: 'safety-denied'
        };
      default:
        return {
          icon: '📊',
          title: '분석 중',
          message: '안전도를 분석하고 있습니다',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          animation: 'animate__fadeIn'
        };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <Card className={`${className} ${statusInfo.animation} animate__animated`}>
      <CardHeader className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-b`}>
        <CardTitle className="flex items-center space-x-3">
          <span className="text-2xl">{statusInfo.icon}</span>
          <div>
            <h3 className={`text-xl font-bold ${statusInfo.textColor}`}>
              {statusInfo.title}
            </h3>
            <p className={`text-sm ${statusInfo.textColor} opacity-75`}>
              {statusInfo.message}
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* 종합 안전도 점수 */}
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysis.overallScore / 100)}`}
                  className={getScoreColor(analysis.overallScore)}
                  style={{
                    transition: 'stroke-dashoffset 1s ease-in-out',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-700">
                  {analysis.overallScore}
                </span>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              종합 안전도 점수
            </h4>
          </div>

          {/* 상세 점수 */}
          <div className="grid grid-cols-2 gap-4">
            <ScoreItem
              label="기상 조건"
              score={analysis.weatherScore}
              icon="🌤️"
            />
            <ScoreItem
              label="위치 안전도"
              score={analysis.locationScore}
              icon="📍"
            />
            <ScoreItem
              label="어업권 현황"
              score={analysis.fishingRightScore}
              icon="🎣"
            />
            <ScoreItem
              label="항로 안전성"
              score={analysis.navigationScore}
              icon="⚓"
            />
          </div>

          {/* 안전도별 추가 정보 */}
          {status === 'APPROVED' && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-800 mb-2">✨ 안전 활동 가이드</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 구명조끼 착용 필수</li>
                <li>• 날씨 변화 주시</li>
                <li>• 비상연락망 확인</li>
              </ul>
            </div>
          )}

          {status === 'CAUTION' && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h5 className="font-semibold text-yellow-800 mb-2">⚠️ 주의사항</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 경험있는 동행자와 함께</li>
                <li>• 활동 시간 단축 권장</li>
                <li>• 기상 변화 면밀히 관찰</li>
              </ul>
            </div>
          )}

          {status === 'DENIED' && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <h5 className="font-semibold text-red-800 mb-2">🚫 권장사항</h5>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• 활동 연기 권장</li>
                <li>• 기상 개선 후 재검토</li>
                <li>• 실내 활동으로 대체</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// 개별 점수 아이템 컴포넌트
interface ScoreItemProps {
  label: string;
  score: number;
  icon: string;
}

const ScoreItem: React.FC<ScoreItemProps> = ({ label, score, icon }) => {
  return (
    <div className="text-center p-3 bg-gray-50 rounded-lg">
      <div className="text-lg mb-1">{icon}</div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className={`text-lg font-bold ${getScoreTextColor(score)}`}>
        {score}점
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className={`h-2 rounded-full ${getScoreBgColor(score)} transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

// 점수별 색상 반환 함수들
function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
}

function getScoreTextColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
}

function getScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
}
