# 프로젝트 개선 태스크 목록

## 🚨 Critical Priority Tasks (즉시 실행)

### Task 1: 코드 중복 제거 ✅ (완료: 2025-09-26)
- [x] 1.1 MapView 컴포넌트 통합
  - [x] `MapView.tsx` 를 메인 버전으로 선택
  - [x] `MapView-new.tsx`, `MapView-old.tsx` 삭제
  - [x] 의존성 참조 업데이트
- [x] 1.2 DynamicMapView 통합
  - [x] 최적화된 단일 버전 생성
  - [x] 모든 백업 버전 삭제
- [x] 1.3 홈페이지 컴포넌트 정리
  - [x] `page.tsx`를 메인으로 유지
  - [x] `page-*.tsx` 백업 파일들 삭제
- [x] 1.4 공통 유틸리티 함수 추출
  - [x] `calculateDistance` 함수 통합 (`src/lib/utils/mapUtils.ts`)
  - [x] 모든 중복 구현체를 공통 함수로 교체

### Task 2: SSR/Leaflet 문제 해결 ✅ (2025-01-27 완료)
- [x] 2.1 Leaflet 초기화 로직 개선 (✅ 2025-01-27: leafletUtils.ts 생성, SSR 안전성 확보)
  - [x] `src/lib/utils/leafletUtils.ts` 생성
  - [x] 브라우저 환경 체크 로직 강화
- [x] 2.2 MapView 컴포넌트 SSR 대응 (✅ 2025-01-27: leafletUtils 통합, 비동기 아이콘 생성)
  - [x] 클라이언트 사이드 렌더링 보장
  - [x] 로딩 상태 개선
- [x] 2.3 에러 핸들링 강화 (✅ 2025-01-27: 재시도 로직, 개발자 디버깅 정보, UX 개선)
  - [x] MapErrorBoundary 개선
  - [x] 폴백 컴포넌트 사용자 경험 향상

## 🔥 High Priority Tasks (2주 내 완료)

### Task 3: 디자인 시스템 구축
- [x] 3.1 색상 팔레트 중앙화 (✅ 2025-01-27: colors.ts 생성, CSS 변수 정의, Button 컴포넌트 적용)
  - [x] `src/lib/design/colors.ts` 생성
  - [x] CSS 변수 또는 Tailwind 커스텀 색상 정의
  - [ ] 모든 하드코딩 색상값 교체 (진행 중: Button 완료)
- [ ] 3.2 테마 시스템 도입
  - [ ] ThemeProvider 컴포넌트 생성
  - [ ] 다크/라이트 모드 지원 준비
- [ ] 3.3 컴포넌트 스타일 표준화
  - [ ] Button, Card, Input 컴포넌트 리팩토링
  - [ ] 일관된 스타일 적용

### Task 4: 테스트 환경 구축
- [ ] 4.1 기본 테스트 설정
  - [ ] Jest 설정 최적화
  - [ ] Testing Library 설정
  - [ ] 테스트 유틸리티 함수 생성
- [ ] 4.2 핵심 컴포넌트 테스트 작성
  - [ ] ReportForm 테스트 강화
  - [ ] SafetyAnalysis 테스트 개선
  - [ ] API 라우트 테스트 추가
- [ ] 4.3 CI/CD 파이프라인 개선
  - [ ] GitHub Actions 워크플로우 추가
  - [ ] 테스트 커버리지 리포팅

### Task 5: 타입 안전성 개선
- [ ] 5.1 `any` 타입 제거
  - [ ] API 응답 타입 정의 개선
  - [ ] 컴포넌트 props 타입 강화
- [ ] 5.2 타입 가드 함수 추가
  - [ ] `validateCoordinates` 함수 활용 확대
  - [ ] 런타임 타입 검증 강화
- [ ] 5.3 제네릭 타입 활용
  - [ ] API 응답 타입에 제네릭 적용
  - [ ] 재사용 가능한 타입 유틸리티 생성

## 🎯 Medium Priority Tasks (1개월 내 완료)

### Task 6: 상태 관리 개선
- [ ] 6.1 상태 관리 라이브러리 도입 검토
  - [ ] Zustand vs Context API 비교 분석
  - [ ] 선택한 라이브러리 적용
- [ ] 6.2 API 상태 관리 최적화
  - [ ] React Query 또는 SWR 도입 검토
  - [ ] 캐싱 전략 수립
- [ ] 6.3 Props Drilling 해결
  - [ ] 컴포넌트 구조 리팩토링
  - [ ] 컨텍스트 적절히 활용

### Task 7: 에러 핸들링 통합
- [ ] 7.1 전역 에러 처리 시스템
  - [ ] ErrorBoundary 컴포넌트 개선
  - [ ] 에러 로깅 시스템 구축
- [ ] 7.2 사용자 친화적 오류 메시지
  - [ ] 에러 메시지 다국어 지원 준비
  - [ ] 상황별 적절한 안내 메시지
- [ ] 7.3 API 에러 처리 표준화
  - [ ] 일관된 에러 응답 구조
  - [ ] HTTP 상태 코드 표준화

### Task 8: API 설계 개선
- [ ] 8.1 응답 구조 표준화
  - [ ] 성공/실패 응답 형식 통일
  - [ ] 페이지네이션 표준 적용
- [ ] 8.2 API 문서화
  - [ ] OpenAPI/Swagger 문서 생성
  - [ ] 예제 요청/응답 추가
- [ ] 8.3 캐싱 전략 구현
  - [ ] Redis 도입 검토
  - [ ] 적절한 캐시 TTL 설정

## 🔧 Low Priority Tasks (장기적 개선)

### Task 9: 성능 최적화
- [ ] 9.1 번들 크기 분석 및 최적화
  - [ ] webpack-bundle-analyzer 활용
  - [ ] 불필요한 라이브러리 제거
  - [ ] 코드 스플리팅 적용
- [ ] 9.2 이미지 최적화
  - [ ] Next.js Image 컴포넌트 활용
  - [ ] WebP 형식 지원
  - [ ] 지연 로딩 적용
- [ ] 9.3 렌더링 최적화
  - [ ] React.memo 적절히 활용
  - [ ] useMemo, useCallback 최적화
  - [ ] 가상화 적용 (긴 목록용)

### Task 10: 접근성 개선
- [ ] 10.1 ARIA 속성 추가
  - [ ] 스크린 리더 지원 강화
  - [ ] 의미적 HTML 구조 개선
- [ ] 10.2 키보드 네비게이션
  - [ ] Tab 순서 최적화
  - [ ] 키보드 단축키 추가
- [ ] 10.3 접근성 테스트
  - [ ] axe-core 통합
  - [ ] 자동화된 접근성 검사

### Task 11: 문서화 및 가이드
- [ ] 11.1 개발자 문서 작성
  - [ ] 프로젝트 설정 가이드
  - [ ] 컴포넌트 사용법 문서
  - [ ] API 가이드 작성
- [ ] 11.2 배포 가이드
  - [ ] Docker 컨테이너화
  - [ ] CI/CD 파이프라인 문서화
- [ ] 11.3 기여 가이드라인
  - [ ] 코딩 스타일 가이드
  - [ ] PR 템플릿 작성

## 📅 실행 일정

### Week 1-2: Critical Tasks
- Task 1: 코드 중복 제거
- Task 2: SSR/Leaflet 문제 해결

### Week 3-4: High Priority Tasks  
- Task 3: 디자인 시스템 구축
- Task 4: 테스트 환경 구축 (시작)

### Week 5-6: High Priority Tasks 완료
- Task 4: 테스트 환경 구축 (완료)
- Task 5: 타입 안전성 개선

### Week 7-10: Medium Priority Tasks
- Task 6: 상태 관리 개선
- Task 7: 에러 핸들링 통합
- Task 8: API 설계 개선

### Week 11-16: Low Priority Tasks
- Task 9: 성능 최적화
- Task 10: 접근성 개선
- Task 11: 문서화 및 가이드

## 🎯 성공 지표

### 기술적 지표
- [ ] 테스트 커버리지: 80% 이상
- [ ] TypeScript 엄격 모드 활성화
- [ ] Lighthouse 성능 점수: 90점 이상
- [ ] 번들 크기: 30% 감소

### 품질 지표
- [ ] 코드 중복률: 5% 이하
- [ ] ESLint 경고: 0개
- [ ] 접근성 점수: 95점 이상
- [ ] 로딩 속도: 3초 이하

## 📝 진행 상황 추적

각 태스크 완료 시 체크박스에 표시하고, 완료일과 담당자를 기록하세요.

**예시:**
- [x] 1.1 MapView 컴포넌트 통합 (완료: 2024-12-20, 담당자: 김개발)

## 🤝 팀 협업 가이드라인

1. **브랜치 전략**: feature/task-number-description
2. **커밋 메시지**: [Task-1.1] MapView 컴포넌트 중복 제거
3. **PR 리뷰**: 최소 1명 이상 승인 필요
4. **테스트**: 모든 PR은 테스트 통과 필수
5. **문서화**: 주요 변경사항은 CHANGELOG.md에 기록