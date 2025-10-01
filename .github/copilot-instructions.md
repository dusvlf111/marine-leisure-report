# Marine Leisure AI Report System - AI Coding Guidelines

This is a Next.js-based marine leisure safety reporting system that uses AI to analyze marine activity safety based on weather, location, and regulatory data.

## Project Architecture

### Core Technology Stack
- **Framework**: Next.js 14 with App Router (TypeScript)
- **Forms**: React Hook Form + Zod validation schemas
- **Maps**: React Leaflet with SSR-safe dynamic imports
- **Styling**: Tailwind CSS + Animate.css
- **Testing**: Jest + Testing Library, Playwright E2E
- **State Management**: React Query for API state

---

## Development Commands

### Core Development Workflow
```bash
# Start development server with Turbopack
npm run dev

# Build and analyze bundle
npm run build
npm run analyze

# Run tests
npm run test           # Jest unit tests
npm run test:watch     # Jest in watch mode
npm run test:coverage  # Coverage report
npm run test:e2e       # Playwright E2E tests
npm run test:e2e:ui    # Playwright with UI
```

### Key File Locations
- **Task Management**: `docs/Task.md` - Primary task tracking
- **Schemas**: `src/lib/data/schemas.ts` - All Zod validation schemas
- **Types**: `src/types/global.ts`, `src/types/api.ts` - TypeScript definitions
- **Mock Data**: `src/lib/data/mockData.ts` - Demo data for development
- **Leaflet Config**: `src/lib/utils/leafletConfig.ts` - Map SSR configuration

### Critical Development Rules

#### 1. SSR Safety
- Map components MUST use dynamic imports: `dynamic(() => import('./Map'), { ssr: false })`
- Leaflet setup MUST be in `useEffect` or `configureLeafletIcons()`
- Always include loading fallbacks for SSR components

#### 2. Type Safety
- Use TypeScript strict mode - no `any` types
- All API interfaces defined in `src/types/api.ts`
- Zod schemas required for all API inputs

#### 3. Component Patterns
- Test files in `__tests__` folders next to components
- Forms use React Hook Form + zodResolver
- Animations require `animate__animated` prefix

### AI Workflow Integration
When working on tasks in `docs/Task.md`:
1. Complete one subtask at a time automatically  
2. Update task status immediately (`[ ]` → `[x]`)
3. Commit changes with descriptive messages
4. Continue to next task without stopping
5. Use Discord notifications for task completion (if configured)

**Important**: 
- Task management occurs in `docs/Task.md`
- AI should proceed through all tasks automatically without user approval
- Discord Webhook URL is read from **project root `.env` file**ient-side form state with React Query for API calls
- **Testing**: Jest + Testing Library for components, Playwright for E2E

### Key Components Architecture

#### Form System (`src/components/forms/`)
- `ReportForm.tsx` - Main form using React Hook Form with zodResolver
- Form validation uses Zod schemas defined in `src/lib/data/schemas.ts`
- All forms include loading states, error animations, and success transitions
- Pattern: `setValue()` for controlled updates in parent components

#### Map Integration (`src/components/map/`)
- Uses React Leaflet (leaflet + react-leaflet packages)
- **Critical**: All map components must use dynamic imports to prevent SSR issues
- Configuration in `src/lib/utils/leafletConfig.ts` handles browser-only setup
- Map markers use custom icons defined in `src/lib/utils/leafletUtils.ts`
- Pattern: Wrap all map usage in `DynamicMapView` component

#### API Layer (`src/app/api/`)
- Next.js API Routes with proper TypeScript interfaces
- All APIs use Zod validation for input
- Mock data simulation in `src/lib/data/mockData.ts`
- Error handling follows consistent `{ success: boolean, data?, error? }` pattern
- Safety analysis uses rule-based logic in `/api/report/submit/route.ts`

#### UI Components (`src/components/ui/`)
- Reusable components with variant-based styling
- Animation classes from Animate.css integrated into component logic
- Loading states and error states built into all interactive components
- Accessibility considerations with proper ARIA labels

### Development Workflow Patterns

#### Map Component Development
```tsx
// ALWAYS use dynamic import for map components
const DynamicMapView = dynamic(() => import('./MapView'), { 
  ssr: false,
  loading: () => <MapSkeleton />
});
```

#### API Development
- Validate input with Zod schemas first
- Use consistent error handling pattern
- Include proper HTTP status codes
- Mock data should be realistic for demo purposes

#### Form Validation
- Define schemas in `src/lib/data/schemas.ts`
- Use zodResolver in React Hook Form
- Error states trigger Animate.css animations
- Success states include smooth transitions to result pages

#### Testing Standards
- Component tests in `__tests__` folders alongside components
- Use `data-testid` attributes for reliable test selectors
- Mock API calls using MSW patterns
- E2E tests cover full user workflows from form to results

### Critical SSR Considerations
- Leaflet requires browser environment - always use dynamic imports
- Configure leaflet icons in `useEffect` or `configureLeafletIcons()`
- Map components should have loading fallbacks for SSR compatibility

### Code Patterns to Follow
- Use TypeScript interfaces from `src/types/` for all data structures
- Services in `src/lib/services/` handle API communications
- Utility functions in `src/lib/utils/` for reusable logic
- Animation classes follow `animate__animated animate__[effect]` pattern
- Error boundaries around map components for graceful failures

### Task Management Protocol
When working on tasks in `docs/Task.md`:
1. Complete one subtask at a time automatically
2. Update task status immediately (`[ ]` → `[x]`)
3. Commit changes with descriptive messages
4. Continue to next task without stopping
5. Use Discord notifications for task completion (if configured)

## Common Patterns and Examples

### Map Component Implementation
```tsx
// CORRECT: Dynamic import with SSR safety
const DynamicMapView = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
});

// Map component structure
export const MapView = ({ onMapClick, safetyZones = [] }: MapViewProps) => {
  useEffect(() => {
    configureLeafletIcons(); // Configure leaflet in browser only
  }, []);

  return (
    <MapContainer>
      <TileLayer />
      <MapEvents onMapClick={onMapClick} />
      {safetyZones.map(zone => (
        <Polygon key={zone.id} positions={zone.coordinates} />
      ))}
    </MapContainer>
  );
};
```

### Form with Validation Pattern
```tsx
// React Hook Form + Zod pattern used throughout
const form = useForm<ReportFormData>({
  resolver: zodResolver(reportSchema),
  defaultValues: { /* ... */ }
});

const onSubmit = async (data: ReportFormData) => {
  setIsSubmitting(true);
  try {
    const response = await ReportService.submitReport(data);
    if (response.success) {
      router.push(`/report/${response.data.reportId}`);
    }
  } catch (error) {
    setSubmitError(error.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

### API Route Pattern
```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = reportSchema.parse(body); // Always validate
    
    // Business logic here
    const result = await processReport(validatedData);
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
```

### Animation Integration
- Success states: `animate__bounceIn` with green theme
- Error states: `animate__shakeX` with red theme  
- Loading states: Custom spinner animations
- Page transitions: `animate__fadeIn` and `animate__slideInUp`

### Testing Approach
- Test form validation with invalid/valid inputs
- Mock API responses for different scenarios
- Test map interactions (click events, zoom, markers)
- E2E tests for complete user flows (submit report → view results)

---

## Task Management & Discord Integration

### 1. Webhook URL 생성
1. Discord 서버 설정 → 연동 → 웹후크
2. '새 웹후크' 생성
3. 웹후크 URL 복사

### 2. .env 파일 설정

**프로젝트 루트 디렉토리**에 `.env` 파일 생성:

```bash
# .env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL_HERE
```

**중요**: `.gitignore`에 `.env` 추가 (보안):
```bash
# .gitignore
.env
```

### 3. .bashrc 설정

`~/.bashrc` 또는 `~/.zshrc` 파일에 다음 내용 추가:

```bash
# Discord 알림 함수들
# .env 파일에서 DISCORD_WEBHOOK_URL을 읽어옵니다

# 하위 작업 완료 알림
notify_task() {
    local task_number="$1"
    local task_name="$2"
    local commit_hash=$(git log -1 --pretty=%h 2>/dev/null || echo "N/A")
    
    # .env 파일에서 DISCORD_WEBHOOK_URL 읽기
    if [ -f .env ]; then
        export $(grep -v '^#' .env | xargs)
    fi
    
    if [ -z "$DISCORD_WEBHOOK_URL" ]; then
        echo "⚠️  DISCORD_WEBHOOK_URL이 설정되지 않았습니다. 프로젝트 루트의 .env 파일을 확인하세요."
        return 1
    fi
    
    curl -s -H "Content-Type: application/json" \
         -X POST \
         -d '{"content":"✅ **Task 완료**\n\n**작업:** '"$task_number"' - '"$task_name"'\n**커밋:** `'"$commit_hash"'`\n**시간:** '"$(date '+%Y-%m-%d %H:%M:%S')"'"}' \
         "$DISCORD_WEBHOOK_URL" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Discord 알림 전송 완료"
    else
        echo "❌ Discord 알림 전송 실패"
    fi
}

# 상위 작업 완료 알림
notify_parent_task() {
    local task_number="$1"
    local task_name="$2"
    local branch=$(git branch --show-current 2>/dev/null || echo "N/A")
    
    # .env 파일에서 DISCORD_WEBHOOK_URL 읽기
    if [ -f .env ]; then
        export $(grep -v '^#' .env | xargs)
    fi
    
    if [ -z "$DISCORD_WEBHOOK_URL" ]; then
        echo "⚠️  DISCORD_WEBHOOK_URL이 설정되지 않았습니다. 프로젝트 루트의 .env 파일을 확인하세요."
        return 1
    fi
    
    curl -s -H "Content-Type: application/json" \
         -X POST \
         -d '{"content":"🎉 **상위 작업 완료**\n\n**작업:** '"$task_number"' - '"$task_name"'\n**브랜치:** '"$branch"'\n**시간:** '"$(date '+%Y-%m-%d %H:%M:%S')"'\n**상태:** Push 완료 ✓"}' \
         "$DISCORD_WEBHOOK_URL" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Discord 알림 전송 완료"
    else
        echo "❌ Discord 알림 전송 실패"
    fi
}

# 테스트 완료 알림
notify_test() {
    local task_number="$1"
    local status="$2"
    
    if [ "$status" = "success" ]; then
        emoji="✅"
        status_text="성공"
    else
        emoji="❌"
        status_text="실패"
    fi
    
    # .env 파일에서 DISCORD_WEBHOOK_URL 읽기
    if [ -f .env ]; then
        export $(grep -v '^#' .env | xargs)
    fi
    
    if [ -z "$DISCORD_WEBHOOK_URL" ]; then
        echo "⚠️  DISCORD_WEBHOOK_URL이 설정되지 않았습니다. 프로젝트 루트의 .env 파일을 확인하세요."
        return 1
    fi
    
    curl -s -H "Content-Type: application/json" \
         -X POST \
         -d '{"content":"🧪 **테스트 완료**\n\n**작업:** '"$task_number"' - 테스트 실행\n**결과:** '"$emoji $status_text"'\n**시간:** '"$(date '+%Y-%m-%d %H:%M:%S')"'"}' \
         "$DISCORD_WEBHOOK_URL" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Discord 알림 전송 완료"
    else
        echo "❌ Discord 알림 전송 실패"
    fi
}

# 오류 수정 완료 알림
notify_fix() {
    local task_number="$1"
    local error_desc="$2"
    
    # .env 파일에서 DISCORD_WEBHOOK_URL 읽기
    if [ -f .env ]; then
        export $(grep -v '^#' .env | xargs)
    fi
    
    if [ -z "$DISCORD_WEBHOOK_URL" ]; then
        echo "⚠️  DISCORD_WEBHOOK_URL이 설정되지 않았습니다. 프로젝트 루트의 .env 파일을 확인하세요."
        return 1
    fi
    
    curl -s -H "Content-Type: application/json" \
         -X POST \
         -d '{"content":"🔧 **오류 수정 완료**\n\n**작업:** '"$task_number"'\n**문제:** '"$error_desc"'\n**시간:** '"$(date '+%Y-%m-%d %H:%M:%S')"'"}' \
         "$DISCORD_WEBHOOK_URL" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Discord 알림 전송 완료"
    else
        echo "❌ Discord 알림 전송 실패"
    fi
}
```

### 4. 설정 적용
```bash
source ~/.bashrc  # 또는 source ~/.zshrc
```

### 5. 테스트
```bash
# 프로젝트 루트 디렉토리로 이동
cd /path/to/your/project

# 테스트 메시지 전송
notify_task "1.1" "프로필 컴포넌트 생성"
```

---

## AI를 위한 중요 정보

### Discord Webhook URL 위치
- **파일 위치**: 프로젝트 루트 디렉토리의 `.env` 파일
- **변수명**: `DISCORD_WEBHOOK_URL`
- **예시 경로**: `/path/to/project/.env`

### AI가 알림을 보낼 때
1. 프로젝트 루트 디렉토리에서 `.env` 파일을 읽음
2. `DISCORD_WEBHOOK_URL` 환경 변수 사용
3. 해당 함수 호출:
   - `notify_task "작업번호" "작업명"` - 하위 작업 완료
   - `notify_test "작업번호" "success|failure"` - 테스트 완료
   - `notify_fix "작업번호" "오류설명"` - 오류 수정
   - `notify_parent_task "작업번호" "작업명"` - 상위 작업 완료

### 주의사항
- `.env` 파일은 `.gitignore`에 포함되어야 함
- AI는 작업 시작 전 `.env` 파일 존재 여부 확인
- Webhook URL이 없으면 경고 메시지 출력하고 계속 진행

---

## Git Workflow

### Commit Rules
1. Subtask completion: Immediate commit + Discord notification
2. Parent task completion: Git push + Discord notification

### Commit Format
```
type: [#issue] Description
task[number] - Task title
```

### Type 종류
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가/수정
- `chore`: 빌드 업무, 패키지 매니저 수정

### Subject 작성 규칙
- 최대 50글자
- 마침표 사용 안 함
- 영문 작성 시: 동사 원형으로 시작, 첫 글자 대문자

### Body 작성 규칙
- 긴 설명이 필요한 경우 작성
- "어떻게"가 아닌 "무엇을, 왜" 했는지 작성
- 최대 75자 이내

### Footer 작성 규칙
- Issue tracker ID 또는 Task 정보 명시
- 형식: `유형: #이슈번호`
- 여러 이슈는 쉼표(,)로 구분

**Footer 유형:**
- `Fixes`: 이슈 수정 중 (미해결)
- `Resolves`: 이슈 해결 완료
- `Ref`: 참고 이슈
- `Related to`: 관련 이슈 (미해결)

**예시:**
```
Fixes: #45
Related to: #34, #23
```

---

## 작업 목록 유지관리

### 1. 작업 목록 업데이트
- 프로토콜에 따라 작업 완료 표시 (`[x]`)
- 새로운 작업 발견 시 즉시 추가

### 2. 관련 파일 섹션 관리
- 생성/수정된 모든 파일 나열
- 각 파일에 목적 한 줄 설명 작성

### 3. 작업 목록 계층 구조
```markdown
- [ ] 1.0 상위 작업
    - [ ] 1.1 하위 작업
        - [ ] 1.1.1 테스트 코드 작성
        - [ ] 1.1.2 테스트 실행 및 검증
        - [ ] 1.1.3 오류 수정 (필요 시)
    - [ ] 1.2 하위 작업
        - [ ] 1.2.1 테스트 코드 작성
        - [ ] 1.2.2 테스트 실행 및 검증
        - [ ] 1.2.3 오류 수정 (필요 시)
```

---

## AI 실행 지침

작업 목록 관리 시 AI는 다음을 반드시 수행:

### 0. 즉시 체크 및 연속 실행
- 완료한 작업은 즉시 체크 표시
- **사용자 허가 없이 다음 작업 자동 진행**
- 모든 작업이 완료될 때까지 중단 없이 실행

### 1. 정기 업데이트
- 중요 작업 완료 후 작업 목록 파일 업데이트

### 2. 완료 프로토콜 준수
- 완료된 하위 작업을 `[x]`로 표시
- 모든 하위 작업 완료 시 상위 작업도 `[x]`로 표시

### 3. 작업 목록 동적 관리
- 새로 발견된 작업 추가
- 필요 시 작업 목록 생성/수정
- **모든 하위 작업마다 그 하위에 테스트 관련 작업 목록 생성:**
  - `[번호].1` 테스트 코드 작성
  - `[번호].2` 테스트 실행 및 검증
  - `[번호].3` 오류 수정 (필요 시)

### 3-1. 테스트 오류 처리
- 테스트 진행 중 오류 발생 시
- 해당 하위 작업의 하위 레벨에 오류 수정 작업 추가
- 예: `1.1.3.1`, `1.1.3.2` 형식으로 세부 오류 수정 작업 생성

### 4. 관련 파일 최신 상태 유지
- 정확하고 최신의 파일 목록 관리

### 5. Discord 알림 전송
**프로젝트 루트 디렉토리의 `.env` 파일에서 `DISCORD_WEBHOOK_URL`을 읽어 사용**

- **하위 작업 완료 시**: 
  ```bash
  notify_task "작업번호" "작업명"
  ```
- **테스트 완료 시**:
  ```bash
  notify_test "작업번호" "success"  # 또는 "failure"
  ```
- **오류 수정 시**:
  ```bash
  notify_fix "작업번호" "오류 설명"
  ```
- **상위 작업 완료 시**:
  ```bash
  notify_parent_task "작업번호" "작업명"
  ```

### 6. 작업 완료 후 절차
1. 작업 목록 체크 (`[x]`)
2. Git 커밋
3. Discord 알림 전송 (`.env`의 `DISCORD_WEBHOOK_URL` 사용)
4. **즉시 다음 작업 진행 (중단 없음)**

---

## 작업 목록 구조 예시

```markdown
### 관련 파일
- `src/components/UserProfile.tsx` - 사용자 프로필 컴포넌트
- `src/api/userApi.ts` - 사용자 API 엔드포인트
- `tests/UserProfile.test.tsx` - 사용자 프로필 테스트
- `.env` - Discord Webhook URL 설정 (루트 디렉토리)

## 작업
- [ ] 1.0 사용자 프로필 UI 구현
    - [ ] 1.1 프로필 컴포넌트 생성
        - [ ] 1.1.1 테스트 코드 작성
        - [ ] 1.1.2 테스트 실행 및 검증
        - [ ] 1.1.3 오류 수정 (필요 시)
    - [ ] 1.2 프로필 데이터 바인딩
        - [ ] 1.2.1 테스트 코드 작성
        - [ ] 1.2.2 테스트 실행 및 검증
        - [ ] 1.2.3 오류 수정 (필요 시)
            
- [ ] 2.0 API 연동
    - [ ] 2.1 사용자 정보 조회 API 구현
        - [ ] 2.1.1 테스트 코드 작성
        - [ ] 2.1.2 테스트 실행 및 검증
        - [ ] 2.1.3 오류 수정 (필요 시)
```

---

## 작업 흐름 요약

```
작업 시작 → 하위 작업 확인 → 작업 수행 → 테스트 코드 작성 → 
테스트 실행 → (오류 시) 오류 수정 → 작업 목록 체크 → 
Git 커밋 → Discord 알림 전송 (.env 사용) → 즉시 다음 작업 진행 → 
... (모든 작업 완료까지 반복) ...
```

**상위 작업 완료 시**: Git Push + Discord 알림 전송

---

## AI 작업 실행 예시

```
1. 작업 1.1 시작
2. 작업 1.1 완료 → 체크 → 커밋 → Discord 알림 (.env 읽기)
3. 작업 1.1.1 시작 (자동)
4. 작업 1.1.1 완료 → 체크 → 커밋 → Discord 알림 (.env 읽기)
5. 작업 1.1.2 시작 (자동)
6. 작업 1.1.2 완료 → 체크 → 커밋 → Discord 알림 (.env 읽기)
... (계속)
```

**중요**: 
- task는 docs/Task.md 파일에서 관리
- AI는 사용자의 승인을 기다리지 않고 모든 작업을 연속적으로 수행합니다.
- Discord Webhook URL은 **프로젝트 루트의 `.env` 파일**에서 읽어옵니다.