import type { ReportFormData } from './data/schemas';

// API 함수들
export const submitReport = async (reportData: ReportFormData) => {
  const response = await fetch('/api/report-submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reportData),
  })
  
  if (!response.ok) {
    throw new Error('신고 제출에 실패했습니다')
  }
  
  return response.json()
}
