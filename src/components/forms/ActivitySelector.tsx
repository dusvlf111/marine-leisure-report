import React, { forwardRef } from 'react';
import { Select } from '@/components/ui/Select';
import { ActivityType } from '@/types/global';

interface ActivitySelectorProps {
  value?: ActivityType | '';
  onChange: (activityType: ActivityType | '') => void;
  error?: string;
  disabled?: boolean;
}

const activityOptions = [
  { value: '패들보드', label: '패들보드 (SUP)' },
  { value: '프리다이빙', label: '프리다이빙' },
  { value: '카약', label: '카약' },
  { value: '윈드서핑', label: '윈드서핑' },
  { value: '수상스키', label: '수상스키' },
  { value: '요트', label: '요트' },
];

const activityDescriptions: Record<ActivityType, string> = {
  '패들보드': '서핑보드 위에서 패들을 이용해 이동하는 활동',
  '프리다이빙': '잠수 장비 없이 숨을 참고 하는 다이빙',
  '카약': '카약을 이용한 패들링 활동',
  '윈드서핑': '바람의 힘을 이용한 수상 스포츠',
  '수상스키': '보트에 이끌리며 하는 수상 스키',
  '요트': '요트를 이용한 세일링 활동',
};

const activitySafeTips: Record<ActivityType, string[]> = {
  '패들보드': [
    '구명조끼 착용 필수',
    '강풍 시 활동 금지',
    '동반자와 함께 활동 권장',
  ],
  '프리다이빙': [
    '반드시 동반자와 함께',
    '깊은 수심 주의',
    '적절한 장비 착용',
  ],
  '카약': [
    '구명조끼 착용 필수',
    '기상 상황 사전 확인',
    '적절한 장비 준비',
  ],
  '윈드서핑': [
    '풍속 및 풍향 확인',
    '적절한 보드 선택',
    '구조 신호 방법 숙지',
  ],
  '수상스키': [
    '숙련된 조종사 필요',
    '안전 장비 착용',
    '적절한 속도 유지',
  ],
  '요트': [
    '면허 및 자격 확인',
    '기상 정보 철저 확인',
    '안전 장비 완비',
  ],
};

export const ActivitySelector = forwardRef<HTMLSelectElement, ActivitySelectorProps>(
  ({ value, onChange, error, disabled }, ref) => {
    return (
      <div className="space-y-3">
        <Select
          ref={ref}
          label="활동 종목"
          placeholder="해양레저스포츠 종목을 선택하세요"
          value={value || ''}
          onChange={(e) => onChange(e.target.value as ActivityType | '')}
          options={activityOptions}
          error={error}
          disabled={disabled}
          helperText="선택한 종목에 따라 맞춤형 안전 정보를 제공합니다"
        />
        
        {value && (
          <div className="mt-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm text-green-800">
              <p className="font-semibold mb-2">{value} 활동 정보</p>
              <p className="mb-3 text-green-700">{activityDescriptions[value]}</p>
              
              <div>
                <p className="font-medium mb-2 text-green-800">⚠️ 안전 수칙:</p>
                <ul className="space-y-1">
                  {activitySafeTips[value].map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span className="text-green-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ActivitySelector.displayName = 'ActivitySelector';
