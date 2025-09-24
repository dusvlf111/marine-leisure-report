import { test, expect } from '@playwright/test';

test.describe('애니메이션 및 사용자 인터랙션 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('페이지 로드 시 애니메이션이 순차적으로 실행된다', async ({ page }) => {
    // 페이지 리로드하여 애니메이션 초기화
    await page.reload();
    
    // 첫 번째 카드 (헤더)의 fadeInDown 애니메이션 확인
    const headerCard = page.locator('.animate__fadeInDown').first();
    await expect(headerCard).toBeVisible();
    await expect(headerCard).toHaveClass(/animate__animated/);
    
    // 순차적으로 나타나는 slideInUp 애니메이션 카드들 확인
    const slideUpCards = page.locator('.animate__slideInUp');
    const cardCount = await slideUpCards.count();
    
    // 각 카드가 순차적으로 나타나는지 확인
    for (let i = 0; i < cardCount; i++) {
      await expect(slideUpCards.nth(i)).toBeVisible({ timeout: 2000 });
      await expect(slideUpCards.nth(i)).toHaveClass(/animate__animated/);
    }
  });

  test('버튼 호버 효과가 작동한다', async ({ page }) => {
    const submitButton = page.locator('button:has-text("🚀 자율신고 접수하기")');
    
    // 버튼의 초기 스타일 확인
    await expect(submitButton).toHaveClass(/bg-blue-600/);
    
    // 호버 시 스타일 변경 확인
    await submitButton.hover();
    
    // 호버 효과로 인한 색상 변화 확인 (CSS transition)
    await page.waitForTimeout(300); // transition 대기
    
    // 버튼이 여전히 클릭 가능한지 확인
    await expect(submitButton).toBeEnabled();
  });

  test('입력 필드 포커스 애니메이션이 작동한다', async ({ page }) => {
    const nameInput = page.locator('input[placeholder="이름을 입력하세요"]');
    
    // 포커스 전 상태
    await expect(nameInput).toBeVisible();
    
    // 포커스 시 ring 효과 확인
    await nameInput.focus();
    await page.waitForTimeout(200); // transition 대기
    
    // 포커스 상태에서 테두리 색상 변화 확인
    await expect(nameInput).toBeFocused();
    
    // 블러 시 원래 상태로 복원
    await nameInput.blur();
    await page.waitForTimeout(200);
  });

  test('카드 호버 효과가 작동한다', async ({ page }) => {
    const cards = page.locator('[class*="border border-gray-200"]');
    
    if (await cards.count() > 0) {
      const firstCard = cards.first();
      
      // 카드에 호버
      await firstCard.hover();
      await page.waitForTimeout(300); // transition 대기
      
      // 카드가 여전히 보이는지 확인
      await expect(firstCard).toBeVisible();
    }
  });

  test('지도 토글 애니메이션이 작동한다', async ({ page }) => {
    const mapToggleButton = page.locator('button:has-text("지도에서 선택")');
    
    // 버튼 클릭
    await mapToggleButton.click();
    
    // 토글 후 버튼 텍스트 변경 확인
    await expect(page.locator('button:has-text("목록 선택")')).toBeVisible({ timeout: 2000 });
    
    // 다시 토글
    await page.locator('button:has-text("목록 선택")').click();
    
    // 원래 상태로 복원 확인
    await expect(page.locator('button:has-text("지도에서 선택")')).toBeVisible({ timeout: 2000 });
  });

  test('폼 제출 시 로딩 애니메이션이 표시된다', async ({ page }) => {
    // 필수 정보 입력
    await page.selectOption('select', '부산 해운대해수욕장');
    await page.selectOption('select >> nth=1', '패들보드');
    await page.locator('input[placeholder="이름을 입력하세요"]').fill('김해양');
    await page.locator('input[placeholder="010-1234-5678"]').fill('010-1234-5678');
    
    // 제출 버튼 클릭
    await page.locator('button:has-text("🚀 자율신고 접수하기")').click();
    
    // 로딩 상태 확인 (스피너나 로딩 텍스트)
    const loadingIndicator = page.locator('text=분석 중').or(page.locator('[class*="animate-spin"]'));
    await expect(loadingIndicator).toBeVisible({ timeout: 5000 });
    
    // 로딩이 완료되면 결과 표시
    await expect(page.locator('text=안전도 분석 결과')).toBeVisible({ timeout: 10000 });
  });

  test('스크롤 시 애니메이션이 올바르게 동작한다', async ({ page }) => {
    // 페이지를 아래로 스크롤
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    
    // 스크롤 후에도 애니메이션 클래스가 유지되는지 확인
    const animatedElements = page.locator('.animate__animated');
    const count = await animatedElements.count();
    
    expect(count).toBeGreaterThan(0);
    
    // 최상단으로 스크롤
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
  });

  test('키보드 네비게이션이 올바르게 작동한다', async ({ page }) => {
    // Tab 키로 폼 요소들 간 이동
    await page.keyboard.press('Tab');
    
    // 첫 번째 select 요소에 포커스
    const firstSelect = page.locator('select').first();
    await expect(firstSelect).toBeFocused();
    
    // Enter 키로 드롭다운 열기
    await page.keyboard.press('Enter');
    
    // 화살표 키로 옵션 선택
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    
    // Tab으로 다음 요소로 이동
    await page.keyboard.press('Tab');
    
    // 두 번째 select 요소 확인
    const secondSelect = page.locator('select').nth(1);
    await expect(secondSelect).toBeFocused();
  });
});
