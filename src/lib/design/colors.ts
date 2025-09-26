/**
 * 해양레저스포츠 자율신고제도 MVP 색상 팔레트
 * 
 * 4-color palette 시스템:
 * - 연한 베이지 (#F3F3E0): 배경색, 카드 배경
 * - 어두운 파란색 (#133E87): 주요 텍스트, 액센트 색상
 * - 중간 파란색 (#608BC1): 보조 요소, 링크, 버튼
 * - 연한 파란색 (#CBDCEB): 카드 하이라이트, 호버 상태
 */

export const colors = {
  // Primary Palette (4-color system)
  primary: {
    light: '#F3F3E0',      // 연한 베이지 - 배경색
    dark: '#133E87',       // 어두운 파란색 - 주요 텍스트/액센트
    medium: '#608BC1',     // 중간 파란색 - 보조 요소
    accent: '#CBDCEB',     // 연한 파란색 - 카드/하이라이트
  },

  // Semantic Colors (상태별 색상)
  semantic: {
    // Safety Status Colors
    safe: '#10B981',       // 승인됨 (Green)
    caution: '#F59E0B',    // 주의 (Yellow/Orange)
    danger: '#EF4444',     // 거부됨 (Red)
    
    // Activity Zone Colors
    fishing: '#8B5CF6',    // 어업 구역 (Purple)
    navigation: '#3B82F6', // 항로 (Blue)
    leisure: '#10B981',    // 레저 허용 구역 (Green)
    restricted: '#EF4444', // 제한 구역 (Red)
    
    // System States
    success: '#10B981',    // 성공
    warning: '#F59E0B',    // 경고
    error: '#EF4444',      // 오류
    info: '#3B82F6',       // 정보
  },

  // Grayscale (그레이스케일)
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Transparent variants (투명도 변형)
  transparent: {
    light: 'rgba(243, 243, 224, 0.8)',      // primary.light with opacity
    dark: 'rgba(19, 62, 135, 0.9)',        // primary.dark with opacity
    medium: 'rgba(96, 139, 193, 0.7)',     // primary.medium with opacity
    accent: 'rgba(203, 220, 235, 0.6)',    // primary.accent with opacity
  },

  // Background variants (배경 변형)
  background: {
    primary: '#F3F3E0',    // 메인 배경
    secondary: '#FFFFFF',   // 카드/모달 배경
    overlay: 'rgba(19, 62, 135, 0.5)', // 오버레이 배경
    glass: 'rgba(255, 255, 255, 0.1)',  // 글래스모피즘 효과
  },

  // Text colors (텍스트 색상)
  text: {
    primary: '#133E87',     // 주요 텍스트
    secondary: '#608BC1',   // 보조 텍스트
    muted: '#6B7280',       // 흐린 텍스트
    light: '#F3F3E0',       // 밝은 텍스트 (어두운 배경용)
    white: '#FFFFFF',       // 흰색 텍스트
  },

  // Border colors (테두리 색상)
  border: {
    light: '#CBDCEB',       // 연한 테두리
    medium: '#608BC1',      // 중간 테두리
    dark: '#133E87',        // 어두운 테두리
    subtle: 'rgba(203, 220, 235, 0.3)', // 미묘한 테두리
  },
} as const;

// CSS 변수 생성을 위한 함수
export const generateCSSVariables = () => {
  const cssVars: Record<string, string> = {};
  
  // Primary colors
  Object.entries(colors.primary).forEach(([key, value]) => {
    cssVars[`--color-primary-${key}`] = value;
  });
  
  // Semantic colors
  Object.entries(colors.semantic).forEach(([key, value]) => {
    cssVars[`--color-${key}`] = value;
  });
  
  // Gray scale
  Object.entries(colors.gray).forEach(([key, value]) => {
    cssVars[`--color-gray-${key}`] = value;
  });
  
  // Text colors
  Object.entries(colors.text).forEach(([key, value]) => {
    cssVars[`--color-text-${key}`] = value;
  });
  
  // Background colors
  Object.entries(colors.background).forEach(([key, value]) => {
    cssVars[`--color-bg-${key}`] = value;
  });
  
  // Border colors
  Object.entries(colors.border).forEach(([key, value]) => {
    cssVars[`--color-border-${key}`] = value;
  });
  
  return cssVars;
};

// Tailwind CSS 커스텀 색상 설정
export const tailwindColors = {
  primary: colors.primary,
  semantic: colors.semantic,
  gray: colors.gray,
  transparent: colors.transparent,
  background: colors.background,
  text: colors.text,
  border: colors.border,
};

// 색상 유틸리티 함수들
export const colorUtils = {
  // 색상의 투명도를 조절하는 함수
  withOpacity: (color: string, opacity: number): string => {
    // hex 색상을 rgba로 변환
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },
  
  // 안전 상태에 따른 색상 반환
  getSafetyColor: (status: 'APPROVED' | 'CAUTION' | 'DENIED'): string => {
    switch (status) {
      case 'APPROVED':
        return colors.semantic.safe;
      case 'CAUTION':
        return colors.semantic.caution;
      case 'DENIED':
        return colors.semantic.danger;
      default:
        return colors.gray[500];
    }
  },
  
  // 구역 타입에 따른 색상 반환
  getZoneColor: (type: string): string => {
    switch (type) {
      case 'SAFE':
      case 'LEISURE':
        return colors.semantic.leisure;
      case 'CAUTION':
        return colors.semantic.caution;
      case 'DANGER':
      case 'RESTRICTED':
        return colors.semantic.restricted;
      case 'FISHING':
        return colors.semantic.fishing;
      case 'NAVIGATION':
        return colors.semantic.navigation;
      default:
        return colors.gray[500];
    }
  },
  
  // 대비 색상 반환 (텍스트용)
  getContrastColor: (backgroundColor: string): string => {
    // 간단한 대비 색상 로직 (실제로는 더 정교한 계산 필요)
    const darkColors = [
      colors.primary.dark,
      colors.semantic.danger,
      colors.semantic.fishing,
      colors.gray[700],
      colors.gray[800],
      colors.gray[900],
    ] as const;
    
    return (darkColors as readonly string[]).includes(backgroundColor) 
      ? colors.text.white 
      : colors.text.primary;
  },
};

export default colors;