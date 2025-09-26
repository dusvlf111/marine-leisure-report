# LINT 오류 분석 (api.ts, jest.d.ts)

이 문서는 `npm run lint` 실행 시 나타나는 주요 오류 및 경고에 대한 분석과 해결 방안을 제시합니다.

---

## 1. `src/types/api.ts`

### 오류 및 경고 내용:

1.  `1:99  Warning: 'SafetyZone' is defined but never used.`
2.  `4:34  Error: Unexpected any. Specify a different type.`
3.  `78:13 Error: Unexpected any. Specify a different type.`

### 원인 분석:

1.  **'SafetyZone' 미사용 경고**: `src/types/global`로부터 `SafetyZone` 타입을 가져왔지만, `api.ts` 파일 내에서 한 번도 사용되지 않았습니다. `ReportResponse` 인터페이스 내부에서는 `import('./global').SafetyZone[]` 형태로 직접 임포트하여 사용하고 있어, 상단의 `import` 구문은 불필요합니다.

2.  **`Unexpected any` 오류 (ApiResponse)**: `ApiResponse` 인터페이스에서 제네릭 `T`의 기본값으로 `any`를 사용했습니다. 이는 `ApiResponse`를 타입 명시 없이 사용할 경우, 내부 `data`의 타입이 `any`가 되어 타입 안정성을 해칩니다.

3.  **`Unexpected any` 오류 (ErrorResponse)**: `ErrorResponse` 인터페이스의 `details` 속성 타입이 `any`로 지정되어 있습니다. 에러의 상세 내용이 어떤 구조를 가질지라도 `any`를 사용하는 것은 린트 규칙에 위배됩니다.

### 해결 방안:

1.  **미사용 타입 제거**: `import` 구문에서 사용하지 않는 `SafetyZone`을 삭제합니다.

2.  **제네릭 기본값 변경**: `ApiResponse`의 제네릭 `T`의 기본값을 `any` 대신 `unknown`으로 변경합니다. `unknown`은 `any`와 달리, 타입을 먼저 확인하거나 단언하지 않으면 값을 사용할 수 없도록 강제하여 타입 안전성을 높입니다.

3.  **구체적인 타입 명시**: `ErrorResponse`의 `details` 속성 타입을 `any` 대신 `unknown`이나, 예상되는 에러 구조가 있다면 `Record<string, unknown>` (문자열 키와 알 수 없는 값을 가진 객체) 등으로 더 구체화합니다.

```typescript
// 수정 제안: src/types/api.ts

// 1. 'SafetyZone' 제거
import { SafetyAnalysisData, WeatherData, FisheryInfo, EmergencyContacts, Location, ActivityType } from './global';

// 2. 제네릭 기본값을 unknown으로 변경
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ... (중략) ...

// 3. details 타입을 unknown으로 변경
export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: unknown;
}
```

---

## 2. `src/types/jest.d.ts`

### 오류 내용:

*   `8:24  Error: Unexpected any. Specify a different type.`

### 원인 분석:

Jest의 커스텀 Matcher(`toHaveValue`) 타입을 정의하는 과정에서, `value` 파라미터의 타입을 `any`로 지정했습니다. 테스트 코드에서는 다양한 타입의 값을 비교해야 하는 경우가 많아 `any`를 사용하기 쉽지만, 이는 린팅 규칙에 위배됩니다.

### 해결 방안:

*   **`unknown` 타입 사용**: `any` 대신 `unknown` 타입을 사용합니다. `unknown`은 `any`처럼 모든 값을 허용하지만, 해당 값을 사용하기 전에는 반드시 타입 검사(Type Checking)나 타입 단언(Type Assertion)을 거치도록 강제하는 '타입 안전(Type-safe)'한 타입입니다. 이는 Matcher의 구현부에서 이 값을 안전하게 처리하도록 유도하는 좋은 방법입니다.

```typescript
// 수정 제안: src/types/jest.d.ts

declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toBeDisabled(): R;
    // any 대신 unknown 사용
    toHaveValue(value: unknown): R;
    toHaveClass(className: string): R;
    toBeVisible(): R;
  }
}
```
