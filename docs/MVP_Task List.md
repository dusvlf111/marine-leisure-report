# 해양레저스포츠 AI 자율신고제도 MVP - Task List

## 📋 프로젝트 개요
- **목표**: 1일 내 완성 가능한 MVP 데모 버전
- **기술 스택**: Next.js 14, TypeScript, Tailwind CSS, Animate.css, Kakao Map API
- **배포**: Vercel
- **데이터**: 목데이터 기반

---

## 🎯 주요 Task 목록

### Relevant Files

- `package.json` - 프로젝트 의존성 및 스크립트 정의
- `src/app/globals.css` - Animate.css 및 글로벌 스타일 설정
- `src/app/layout.tsx` - 루트 레이아웃 및 기본 설정
- `src/app/page.tsx` - 메인 홈페이지 (자율신고 입력)
- `src/app/report/[id]/page.tsx` - 신고 결과 페이지
- `src/components/forms/ReportForm.tsx` - 핵심 신고 입력 폼
- `src/components/map/MapView.tsx` - Kakao Map 통합 컴포넌트
- `src/components/safety/SafetyAnalysis.tsx` - 안전도 분석 결과 표시
- `src/lib/data/mockData.ts` - 목데이터 정의
- `src/lib/data/schemas.ts` - Zod 스키마 정의
- `src/app/api/report/submit/route.ts` - 신고 접수 API
- `src/app/api/safety/analysis/route.ts` - 안전도 분석 API

## Tasks

- [x] 1.0 프로젝트 초기 설정 및 환경 구축
    - [x] 1.1 Next.js 프로젝트 생성 및 기본 설정
    - [x] 1.2 필수 패키지 설치 (Animate.css, React Hook Form, Zod 등)
    - [x] 1.3 TypeScript 설정 및 경로 별칭 구성
    - [x] 1.4 환경 변수 설정 (.env.local)
    - [x] 1.5 Animate.css 글로벌 설정 및 커스텀 클래스 정의
    - [x] 1.6 폴더 구조 생성 및 기본 파일 템플릿 작성

- [x] 2.0 타입 시스템 및 데이터 모델 구축
    - [x] 2.1 전역 타입 정의 (Location, ActivityType, SafetyStatus 등)
    - [x] 2.2 API 요청/응답 타입 정의
    - [x] 2.3 Zod 스키마 정의 (reportSchema)
    - [x] 2.4 목데이터 구조 설계 및 구현
    - [x] 2.5 유틸리티 함수 작성 (validators, formatters)

- [x] 3.0 기본 UI 컴포넌트 라이브러리 구축
    - [x] 3.1 Button 컴포넌트 (variant, size, loading 상태 포함)
    - [x] 3.2 Input 컴포넌트 (오류 애니메이션 포함)
    - [x] 3.3 Select 컴포넌트
    - [x] 3.4 Card 컴포넌트
    - [x] 3.5 Loading 컴포넌트 (스피너 애니메이션)
    - [x] 3.6 Alert 컴포넌트 (성공/경고/오류별 애니메이션)
    - [x] 3.7 레이아웃 컴포넌트 (Header, Footer, Container)

- [x] 4.0 자율신고 입력 시스템 구현
    - [x] 4.1 LocationSelector 컴포넌트 (드롭다운 + 지도 연동)
    - [x] 4.2 ActivitySelector 컴포넌트 (스포츠 종목 선택)
    - [x] 4.3 ContactForm 컴포넌트 (이름, 연락처 입력)
    - [x] 4.4 ReportForm 메인 컴포넌트 (React Hook Form + Zod)
    - [x] 4.5 폼 검증 오류 시 애니메이션 적용
    - [x] 4.6 성공 제출 시 애니메이션 및 리다이렉션
    - [x] 4.7 홈페이지 구현 및 폼 통합

- [x] 5.0 API 라우트 및 비즈니스 로직 구현
    - [x] 5.1 신고 접수 API (POST /api/report/submit)
    - [x] 5.2 AI 분석 로직 구현 (규칙 기반 안전도 계산)
    - [x] 5.3 목데이터 기반 응답 시스템
    - [x] 5.4 신고 조회 API (GET /api/report/[id])
    - [x] 5.5 안전도 분석 API (GET /api/safety/analysis)
    - [x] 5.6 오류 처리 및 검증 미들웨어
    - [x] 5.7 reportService 클래스 구현

- [ ] 6.0 Kakao Map 통합 및 지도 시각화
    - [ ] 6.1 Kakao Map API 설정 및 스크립트 로딩
    - [ ] 6.2 useKakaoMap 커스텀 훅 구현
    - [ ] 6.3 기본 MapView 컴포넌트 구현
    - [ ] 6.4 SafetyZones 컴포넌트 (안전구역 색상별 표시)
    - [ ] 6.5 MarkerManager 컴포넌트 (응급구조, 항구, 어촌계 마커)
    - [ ] 6.6 지도 클릭 이벤트 처리
    - [ ] 6.7 지도 안전구역 등장 애니메이션 적용

- [ ] 7.0 결과 페이지 및 안전 정보 표시
    - [ ] 7.1 SafetyAnalysis 컴포넌트 (안전도 점수 및 상태 표시)
    - [ ] 7.2 WeatherInfo 컴포넌트 (기상 정보 표시)
    - [ ] 7.3 FisheryInfo 컴포넌트 (어업권 정보 안내)
    - [ ] 7.4 NavigationInfo 컴포넌트 (항로 정보 안내)
    - [ ] 7.5 EmergencyContacts 컴포넌트 (응급연락처)
    - [ ] 7.6 결과 페이지 레이아웃 구현 (/report/[id])
    - [ ] 7.7 안전도별 차별화된 애니메이션 적용
    - [ ] 7.8 결과 표시 순차 애니메이션 구현

- [ ] 8.0 테스트 코드 작성 및 품질 보증
    - [ ] 8.1 Jest 및 Testing Library 설정
    - [ ] 8.2 ReportForm 컴포넌트 단위 테스트
    - [ ] 8.3 SafetyAnalysis 컴포넌트 테스트
    - [ ] 8.4 API 라우트 통합 테스트
    - [ ] 8.5 유틸리티 함수 테스트
    - [ ] 8.6 E2E 테스트 기본 시나리오 (Playwright)
    - [ ] 8.7 애니메이션 및 사용자 인터랙션 테스트

- [ ] 9.0 성능 최적화 및 반응형 디자인
    - [ ] 9.1 모바일 반응형 레이아웃 최적화
    - [ ] 9.2 이미지 최적화 (Next.js Image 컴포넌트)
    - [ ] 9.3 코드 스플리팅 (동적 임포트)
    - [ ] 9.4 SEO 최적화 (메타데이터 설정)
    - [ ] 9.5 웹 접근성 기본 준수 (aria-label, 키보드 네비게이션)
    - [ ] 9.6 성능 측정 (Lighthouse 스코어 확인)
    - [ ] 9.7 애니메이션 성능 최적화

- [ ] 10.0 배포 및 최종 검증
    - [ ] 10.1 Vercel 배포 설정
    - [ ] 10.2 환경 변수 Vercel 설정
    - [ ] 10.3 배포 후 전체 기능 테스트
    - [ ] 10.4 다양한 기기에서 동작 확인
    - [ ] 10.5 성능 모니터링 설정
    - [ ] 10.6 최종 데모 시나리오 준비
    - [ ] 10.7 문서화 완료 (README.md)

---

## 📚 상세 구현 가이드

### Task 1: 프로젝트 초기 설정

#### 1.1 Next.js 프로젝트 생성
```bash
npx create-next-app@latest marine-leisure-report --typescript --tailwind --eslint --app
cd marine-leisure-report
```

#### 1.2 필수 패키지 설치
```bash
# 핵심 라이브러리
npm install react-hook-form @hookform/resolvers zod
npm install lucide-react animate.css
npm install @tanstack/react-query

# 개발 도구
npm install -D @types/kakao-maps-sdk
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test msw
```

#### 1.3 TypeScript 설정
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

#### 1.4 환경 변수 설정
```bash
# .env.local
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 1.5 Animate.css 글로벌 설정
```css
/* src/app/globals.css */
@import 'animate.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 커스텀 애니메이션 클래스 */
.animate-delay-500ms { animation-delay: 0.5s; }
.animate-delay-1s { animation-delay: 1s; }
.animate-delay-2s { animation-delay: 2s; }

.safety-approved {
  @apply animate__animated animate__bounceIn;
  animation-duration: 0.8s;
}

.safety-caution {
  @apply animate__animated animate__wobble;
  animation-duration: 1s;
}

.safety-denied {
  @apply animate__animated animate__shakeX;
  animation-duration: 0.6s;
}

.form-error {
  @apply animate__animated animate__shakeX;
  animation-duration: 0.6s;
}

.success-message {
  @apply animate__animated animate__bounceIn;
  animation-duration: 0.8s;
}
```

### Task 2: 타입 시스템 구축

#### 2.1 전역 타입 정의
```typescript
// src/types/global.ts
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  name: string;
  coordinates: Coordinates;
  safetyLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
  fishingRights?: boolean;
  navigationRoute?: boolean;
}

export type ActivityType = 
  | '패들보드' 
  | '카약' 
  | '윈드서핑' 
  | '스쿠버다이빙' 
  | '프리다이빙';

export type SafetyStatus = 'APPROVED' | 'CAUTION' | 'DENIED';

export interface SafetyAnalysisData {
  overallScore: number;
  weatherScore: number;
  locationScore: number;
  fishingRightScore: number;
  navigationScore: number;
}

export interface WeatherData {
  condition: 'CLEAR' | 'CLOUDY' | 'RAINY' | 'STORMY';
  windSpeed: number;
  waveHeight: number;
  visibility: 'GOOD' | 'MODERATE' | 'POOR';
  temperature: number;
}
```

#### 2.2 API 타입 정의
```typescript
// src/types/api.ts
export interface ReportRequest {
  location: Location;
  activity: {
    type: ActivityType;
    startTime: string;
    endTime: string;
    participants: number;
  };
  contact: {
    name: string;
    phone: string;
    emergency?: string;
  };
}

export interface ReportResponse {
  success: boolean;
  data: {
    reportId: string;
    status: SafetyStatus;
    analysis: SafetyAnalysisData;
    weather: WeatherData;
    recommendations: string[];
    emergencyContacts: EmergencyContacts;
    safetyZones: SafetyZone[];
  };
  error?: string;
}

export interface EmergencyContacts {
  coastGuard: string;
  rescue: string;
  localAuthority: string;
  fishingAssociation?: string;
}

export interface SafetyZone {
  id: string;
  name: string;
  type: 'SAFE' | 'CAUTION' | 'DANGER' | 'FISHING' | 'NAVIGATION';
  coordinates: Coordinates[];
  description: string;
}
```

#### 2.3 Zod 스키마 정의
```typescript
// src/lib/data/schemas.ts
import { z } from 'zod';

export const reportSchema = z.object({
  location: z.object({
    name: z.string().min(1, '위치를 선택해주세요'),
    coordinates: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180)
    }),
    safetyLevel: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
    fishingRights: z.boolean().optional(),
    navigationRoute: z.boolean().optional()
  }),
  activity: z.object({
    type: z.enum(['패들보드', '카약', '윈드서핑', '스쿠버다이빙', '프리다이빙']),
    startTime: z.string().min(1, '시작 시간을 입력해주세요'),
    endTime: z.string().min(1, '종료 시간을 입력해주세요'),
    participants: z.number().min(1, '참여 인원을 입력해주세요').max(20)
  }),
  contact: z.object({
    name: z.string().min(1, '이름을 입력해주세요').max(10),
    phone: z.string().regex(/^010-\d{4}-\d{4}$/, '올바른 전화번호를 입력해주세요'),
    emergency: z.string().regex(/^010-\d{4}-\d{4}$/, '올바른 전화번호를 입력해주세요').optional()
  })
});

export type ReportFormData = z.infer<typeof reportSchema>;
```

### Task 3: 기본 UI 컴포넌트

#### 3.1 Button 컴포넌트
```typescript
// src/components/ui/Button.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        isLoading && 'opacity-50 cursor-not-allowed',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          처리중...
        </div>
      ) : (
        children
      )}
    </button>
  );
};
```

#### 3.6 Alert 컴포넌트
```typescript
// src/components/ui/Alert.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface AlertProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  className,
  animate = true
}) => {
  const baseClasses = 'p-4 rounded-lg border';
  
  const variants = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const icons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️'
  };

  const animations = {
    success: 'animate__animated animate__bounceIn',
    warning: 'animate__animated animate__wobble',
    error: 'animate__animated animate__shakeX',
    info: 'animate__animated animate__fadeIn'
  };

  return (
    <div className={cn(
      baseClasses,
      variants[type],
      animate && animations[type],
      className
    )}>
      <div className="flex items-start">
        <span className="mr-3 text-lg">{icons[type]}</span>
        <div>
          {title && <h4 className="font-bold mb-1">{title}</h4>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
```

### Task 4: ReportForm 구현 예시

#### 4.4 메인 ReportForm 컴포넌트
```typescript
// src/components/forms/ReportForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reportSchema, type ReportFormData } from '@/lib/data/schemas';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { LocationSelector } from './LocationSelector';
import { ActivitySelector } from './ActivitySelector';
import { ContactForm } from './ContactForm';
import { ReportService } from '@/lib/services/reportService';
import { useRouter } from 'next/navigation';

export const ReportForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      location: {
        name: '',
        coordinates: { lat: 35.1595, lng: 129.1603 }
      },
      activity: {
        type: '패들보드',
        participants: 1,
        startTime: '',
        endTime: ''
      },
      contact: {
        name: '',
        phone: '',
        emergency: ''
      }
    }
  });

  const onSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await ReportService.submitReport(data);
      
      if (response.success) {
        // 성공 애니메이션과 함께 결과 페이지로 이동
        setTimeout(() => {
          router.push(`/report/${response.data.reportId}`);
        }, 1000);
      }
    } catch (error) {
      setSubmitError('신고 접수 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate__animated animate__fadeIn">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {submitError && (
          <Alert type="error" animate>
            {submitError}
          </Alert>
        )}

        <div className="animate__animated animate__slideInUp">
          <LocationSelector
            value={form.watch('location')}
            onChange={(location) => form.setValue('location', location)}
            error={form.formState.errors.location?.name?.message}
          />
        </div>

        <div className="animate__animated animate__slideInUp animate-delay-500ms">
          <ActivitySelector
            activity={form.watch('activity')}
            onChange={(activity) => form.setValue('activity', activity)}
            errors={form.formState.errors.activity}
          />
        </div>

        <div className="animate__animated animate__slideInUp animate-delay-1s">
          <ContactForm
            contact={form.watch('contact')}
            onChange={(contact) => form.setValue('contact', contact)}
            errors={form.formState.errors.contact}
          />
        </div>

        <div className="animate__animated animate__slideInUp animate-delay-2s">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? '분석 중...' : '자율신고 접수'}
          </Button>
        </div>
      </form>
    </div>
  );
};
```

### Task 5: API 구현 예시

#### 5.1 신고 접수 API
```typescript
// src/app/api/report/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { reportSchema } from '@/lib/data/schemas';
import { SafetyService } from '@/lib/services/safetyService';
import { generateReportId } from '@/lib/utils/generators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 요청 데이터 검증
    const validatedData = reportSchema.parse(body);
    
    // AI 안전도 분석 수행
    const analysis = await SafetyService.analyzeSafety(validatedData);
    
    // 리포트 ID 생성
    const reportId = generateReportId();
    
    // 응답 생성
    const response = {
      success: true,
      data: {
        reportId,
        status: analysis.status,
        analysis: analysis.details,
        weather: analysis.weather,
        recommendations: analysis.recommendations,
        emergencyContacts: {
          coastGuard: '국번없이 122',
          rescue: '119',
          localAuthority: '051-709-4000',
          fishingAssociation: '051-123-4567'
        },
        safetyZones: analysis.safetyZones
      }
    };

    // 성공 응답 (캐싱 헤더 포함)
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error('Report submission error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          error: '입력 데이터가 올바르지 않습니다.',
          details: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: '서버 오류가 발생했습니다.' 
      },
      { status: 500 }
    );
  }
}
```

---

## 🎯 개발 진행 시 주의사항

### 1. 애니메이션 적용 원칙
- **점진적 적용**: 기본 기능 완성 후 애니메이션 추가
- **성능 고려**: 과도한 애니메이션으로 성능 저하 방지
- **접근성 준수**: 모션 민감성 사용자를 위한 `prefers-reduced-motion` 고려

### 2. 컴포넌트 설계 원칙
- **재사용성**: 공통 컴포넌트는 여러 곳에서 사용 가능하도록 설계
- **타입 안전성**: 모든 props에 TypeScript 타입 정의
- **테스트 가능성**: data-testid 속성으로 테스트 용이성 확보

### 3. API 설계 원칙
- **일관성**: 모든 API 응답 형식 통일
- **오류 처리**: 명확한 오류 메시지와 상태 코드
- **검증**: Zod 스키마를 통한 철저한 입력 검증

### 4. 성능 최적화 체크포인트
- **번들 크기**: 불필요한 라이브러리 포함 방지
- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 스플리팅**: 페이지별 필요한 코드만 로드

이 Task List는 AI가 단계별로 정확히 무엇을 개발해야 하는지 명시하여, 체계적이고 효율적인 개발이 가능하도록 설계되었습니다.