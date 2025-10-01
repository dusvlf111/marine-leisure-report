import React from 'react';

/**
 * 접근성 관련 상수 및 헬퍼 함수
 */

// ARIA 레이블
export const ARIA_LABELS = {
  // 폼 관련
  reportForm: '해양레저 안전신고 입력 폼',
  locationSelect: '활동 위치 선택',
  activitySelect: '레저 활동 종류 선택',
  dateTimePicker: '활동 시간 선택',
  participantCount: '참여 인원 수',
  contactInfo: '연락처 정보',
  
  // 지도 관련
  mapContainer: '활동 위치 선택 지도',
  mapMarker: '선택한 위치',
  safetyZone: '안전구역',
  dangerZone: '위험구역',
  fishingZone: '어업권 구역',
  navigationZone: '항로 구역',
  
  // 분석 결과 관련
  safetyScore: '안전도 점수',
  weatherInfo: '기상 정보',
  fisheryInfo: '어업권 정보',
  navigationInfo: '항로 정보',
  emergencyContacts: '비상 연락처',
  
  // 기타 UI
  loading: '로딩 중',
  error: '오류 발생',
  success: '성공',
  retry: '다시 시도',
  close: '닫기',
  more: '더 보기',
  back: '뒤로 가기',
  next: '다음',
  submit: '제출',
  cancel: '취소',
} as const;

// 키보드 네비게이션 헬퍼
export const KeyboardNavigation = {
  // 포커스 가능한 요소 선택자
  FOCUSABLE_ELEMENTS: 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
  
  // 포커스 순환 핸들러
  createFocusTrap(containerElement: HTMLElement) {
    const focusableEls = containerElement.querySelectorAll(this.FOCUSABLE_ELEMENTS);
    const firstFocusableEl = focusableEls[0] as HTMLElement;
    const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement;
    
    return {
      handleTab: (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableEl) {
            e.preventDefault();
            lastFocusableEl.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableEl) {
            e.preventDefault();
            firstFocusableEl.focus();
          }
        }
      },
      
      focusFirst: () => {
        firstFocusableEl.focus();
      }
    };
  }
};

// 접근성 관련 유틸리티 함수
export const a11yUtils = {
  // 화면 읽기 프로그램용 텍스트 숨기기
  srOnly: 'sr-only',
  
  // 동적 ARIA 레이블 생성
  generateAriaLabel(baseLabel: string, additionalInfo?: string): string {
    return additionalInfo ? `${baseLabel} - ${additionalInfo}` : baseLabel;
  },
  
  // 스크린리더 전용 설명 추가
  createScreenReaderText(text: string): JSX.Element {
    return <span className="sr-only">{text}</span>;
  },
  
  // 접근 가능한 색상 대비 클래스 추가
  getHighContrastClass(bgColor: string): string {
    // 배경색에 따라 적절한 텍스트 색상 클래스 반환
    const darkBackgrounds = ['bg-blue-600', 'bg-gray-800', 'bg-red-600'];
    return darkBackgrounds.includes(bgColor) ? 'text-white' : 'text-gray-900';
  }
};