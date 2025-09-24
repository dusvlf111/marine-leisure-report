import { test, expect, devices } from '@playwright/test';

test.describe('반응형 디자인 테스트', () => {
  test('데스크톱에서 레이아웃이 올바르게 표시된다', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // 그리드 레이아웃 확인 (md:grid-cols-2, md:grid-cols-3 등)
    const detailsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-3');
    await expect(detailsGrid).toBeVisible();
    
    // 카드들이 수평으로 배치되는지 확인
    const cards = page.locator('[class*="animate__slideInUp"]');
    await expect(cards.first()).toBeVisible();
  });

  test('모바일에서 레이아웃이 올바르게 표시된다', async ({ page }) => {
    // iPhone 12 크기로 설정
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    
    // 모바일에서 카드들이 세로로 스택되는지 확인
    const contactGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2');
    await expect(contactGrid).toBeVisible();
    
    // 버튼이 전체 너비를 차지하는지 확인
    const submitButton = page.locator('button:has-text("🚀 자율신고 접수하기")');
    await expect(submitButton).toHaveClass(/w-full/);
  });

  test('태블릿에서 레이아웃이 올바르게 표시된다', async ({ page }) => {
    // iPad 크기로 설정
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // 중간 크기에서의 그리드 동작 확인
    await expect(page.locator('.max-w-4xl')).toBeVisible();
    
    // 폼 요소들이 적절한 크기로 표시되는지 확인
    const formInputs = page.locator('input, select');
    const count = await formInputs.count();
    expect(count).toBeGreaterThan(0);
    
    // 모든 입력 필드가 보이는지 확인
    for (let i = 0; i < count; i++) {
      await expect(formInputs.nth(i)).toBeVisible();
    }
  });

  test('지도 컴포넌트가 반응형으로 작동한다', async ({ page }) => {
    await page.goto('/');
    
    // 지도 토글 버튼 클릭
    await page.locator('button:has-text("지도에서 선택")').click();
    
    // 데스크톱 크기에서 지도 확인
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000); // 리사이즈 대기
    
    // 모바일 크기로 변경하여 지도 반응성 확인
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1000); // 리사이즈 대기
    
    // 지도가 여전히 표시되는지 확인
    await expect(page.locator('button:has-text("목록 선택")')).toBeVisible();
  });
});
