import { test, expect } from '@playwright/test';

test.describe('홈페이지 기본 기능', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('페이지가 올바르게 로드된다', async ({ page }) => {
    // 페이지 타이틀 확인
    await expect(page).toHaveTitle(/해양레저스포츠 자율신고/);
    
    // 메인 헤더 확인
    await expect(page.locator('h1').filter({ hasText: '🌊 해양레저스포츠 자율신고' })).toBeVisible();
  });

  test('신고 폼이 표시된다', async ({ page }) => {
    // 활동 위치 선택 섹션 확인
    await expect(page.locator('text=📍 활동 위치')).toBeVisible();
    
    // 활동 종목 선택 섹션 확인  
    await expect(page.locator('text=🏄‍♂️ 활동 종목')).toBeVisible();
    
    // 연락처 정보 섹션 확인
    await expect(page.locator('text=📞 연락처 정보')).toBeVisible();
    
    // 제출 버튼 확인
    await expect(page.locator('button:has-text("🚀 자율신고 접수하기")')).toBeVisible();
  });

  test('필수 입력 필드들이 표시된다', async ({ page }) => {
    // 위치 선택 드롭다운
    await expect(page.locator('select').first()).toBeVisible();
    
    // 활동 종목 드롭다운
    await expect(page.locator('select').nth(1)).toBeVisible();
    
    // 이름 입력 필드
    await expect(page.locator('input[placeholder="이름을 입력하세요"]')).toBeVisible();
    
    // 연락처 입력 필드
    await expect(page.locator('input[placeholder="010-1234-5678"]')).toBeVisible();
  });

  test('지도 토글 버튼이 작동한다', async ({ page }) => {
    // 지도 토글 버튼 클릭
    await page.locator('button:has-text("지도에서 선택")').click();
    
    // 지도가 표시되면 버튼 텍스트가 "목록 선택"으로 변경되는지 확인
    await expect(page.locator('button:has-text("목록 선택")')).toBeVisible();
  });
});
