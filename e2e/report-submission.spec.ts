import { test, expect } from '@playwright/test';

test.describe('신고 제출 플로우', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('완전한 신고 제출 플로우를 테스트한다', async ({ page }) => {
    // 1. 활동 위치 선택
    await page.selectOption('select', '부산 해운대해수욕장');
    
    // 2. 활동 종목 선택
    await page.selectOption('select >> nth=1', '패들보드');
    
    // 3. 참가자 수 입력
    const participantsInput = page.locator('input[name="participantCount"]');
    await participantsInput.fill('2');
    
    // 4. 활동 날짜 설정 (오늘 날짜)
    const today = new Date().toISOString().split('T')[0];
    await page.locator('input[name="activityDate"]').fill(today);
    
    // 5. 활동 시간 입력
    await page.locator('input[name="duration"]').fill('3');
    
    // 6. 담당자 이름 입력
    await page.locator('input[placeholder="이름을 입력하세요"]').fill('김해양');
    
    // 7. 연락처 입력
    await page.locator('input[placeholder="010-1234-5678"]').fill('010-1234-5678');
    
    // 8. 제출 버튼 클릭
    await page.locator('button:has-text("🚀 자율신고 접수하기")').click();
    
    // 9. 로딩 상태 확인
    await expect(page.locator('text=분석 중')).toBeVisible({ timeout: 5000 });
    
    // 10. 결과 페이지로 리디렉션 확인 (또는 결과 표시 확인)
    await expect(page.locator('text=안전도 분석 결과')).toBeVisible({ timeout: 10000 });
  });

  test('필수 필드 누락 시 유효성 검증이 작동한다', async ({ page }) => {
    // 이름만 입력하고 제출 시도
    await page.locator('input[placeholder="이름을 입력하세요"]').fill('김해양');
    
    // 제출 버튼 클릭
    await page.locator('button:has-text("🚀 자율신고 접수하기")').click();
    
    // HTML5 validation이나 커스텀 에러 메시지 확인
    // (실제 구현에 따라 다를 수 있음)
    const isValid = await page.evaluate(() => document.querySelector('form')?.checkValidity());
    expect(isValid).toBe(false);
  });

  test('입력 필드들의 실시간 검증이 작동한다', async ({ page }) => {
    // 연락처 필드에 잘못된 형식 입력
    const phoneInput = page.locator('input[placeholder="010-1234-5678"]');
    await phoneInput.fill('invalid-phone');
    
    // 다른 필드로 포커스 이동
    await page.locator('input[placeholder="이름을 입력하세요"]').click();
    
    // 참가자 수에 범위 외 값 입력
    const participantsInput = page.locator('input[name="participantCount"]');
    await participantsInput.fill('100'); // max는 50
    
    // HTML5 validation 확인
    const isPhoneValid = await phoneInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    const isParticipantsValid = await participantsInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    
    expect(isParticipantsValid).toBe(false);
  });
});
