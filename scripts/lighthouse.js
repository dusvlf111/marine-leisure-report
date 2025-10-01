const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;
const path = require('path');

async function runLighthouseAudit() {
  // Chrome 실행
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  
  // Lighthouse 설정
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  // 테스트할 URL들
  const urls = [
    'http://localhost:3000', // 메인 페이지
    'http://localhost:3000/report/example', // 결과 페이지 예시
  ];

  try {
    // 결과 저장 디렉토리 생성
    const reportDir = path.join(__dirname, '..', 'lighthouse-reports');
    await fs.mkdir(reportDir, { recursive: true });

    // 각 URL에 대해 Lighthouse 감사 실행
    for (const url of urls) {
      console.log(`Running Lighthouse audit for ${url}`);
      const runnerResult = await lighthouse(url, options);

      // HTML 리포트 저장
      const reportPath = path.join(
        reportDir,
        `lighthouse-${new URL(url).pathname.replace(/\//g, '-') || 'home'}-${
          new Date().toISOString().split('T')[0]
        }.html`
      );
      
      await fs.writeFile(reportPath, runnerResult.report);
      console.log(`Report saved to ${reportPath}`);

      // 점수 로깅
      console.log('\nLighthouse scores:');
      Object.entries(runnerResult.lhr.categories).forEach(([key, category]) => {
        console.log(`${key}: ${Math.round(category.score * 100)}`);
      });
    }
  } catch (error) {
    console.error('Error running Lighthouse audit:', error);
  }

  // Chrome 종료
  await chrome.kill();
}

// 감사 실행
runLighthouseAudit();