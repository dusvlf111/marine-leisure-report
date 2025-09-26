import type { ReportFormData } from '@/lib/data/schemas';
import type { ReportResponse } from '@/types/api';

export class ReportService {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  /**
   * 자율신고 접수 API 호출
   */
  static async submitReport(data: ReportFormData): Promise<ReportResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/api/report/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result: ReportResponse = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || '신고 접수에 실패했습니다.');
      }

      return result;
    } catch (error) {
      console.error('Report submission failed:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('네트워크 오류가 발생했습니다. 연결 상태를 확인해주세요.');
    }
  }

  /**
   * 신고 상세 조회 API 호출 (향후 구현 예정)
   */
  static async getReportDetail(reportId: string): Promise<Record<string, unknown>> {
    try {
      const response = await fetch(`${this.BASE_URL}/api/report/${reportId}`);
      
      if (!response.ok) {
        throw new Error(`신고 조회 실패: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Report detail fetch failed:', error);
      throw error;
    }
  }

  /**
   * 안전도 분석만 별도 조회 (향후 구현 예정)  
   */
  static async getSafetyAnalysis(location: Record<string, unknown>, activityType: string): Promise<Record<string, unknown>> {
    try {
      const response = await fetch(`${this.BASE_URL}/api/safety/analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, activityType }),
      });

      if (!response.ok) {
        throw new Error(`안전도 분석 실패: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Safety analysis failed:', error);
      throw error;
    }
  }

  /**
   * 현재 기상 정보 조회 (향후 구현 예정)
   */
  static async getCurrentWeather(coordinates: { lat: number; lng: number }): Promise<Record<string, unknown>> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/api/weather?lat=${coordinates.lat}&lng=${coordinates.lng}`
      );

      if (!response.ok) {
        throw new Error(`기상 정보 조회 실패: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Weather fetch failed:', error);
      throw error;
    }
  }
}
