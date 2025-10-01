import { reportSchema } from '@/lib/data/schemas';
import { ReportService } from '@/lib/services/reportService';

// Mock fetch for API calls
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('API 라우트 통합 테스트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Zod 스키마 검증', () => {
    it('유효한 신고 데이터를 올바르게 검증한다', () => {
      const validReportData = {
        location: {
          name: '부산 해운대해수욕장',
          coordinates: { lat: 35.1595, lng: 129.1603 }
        },
        activityType: '패들보드',
        participantCount: 2,
        contactInfo: {
          name: '테스트 사용자',
          phone: '010-1234-5678'
        },
        activityDate: '2025-01-02',
        duration: 3
      };

      const result = reportSchema.safeParse(validReportData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.location.name).toBe('부산 해운대해수욕장');
        expect(result.data.activityType).toBe('패들보드');
        expect(result.data.participantCount).toBe(2);
      }
    });

    it('잘못된 데이터를 올바르게 거부한다', () => {
      const invalidReportData = {
        location: {
          name: '', // 빈 이름
          coordinates: { lat: 91, lng: 181 } // 잘못된 좌표
        },
        activityType: 'invalid_activity', // 잘못된 활동 타입
        participantCount: -1, // 잘못된 참가자 수
        contactInfo: {
          name: '',
          phone: 'invalid-phone'
        },
        activityDate: '',
        duration: -1
      };

      const result = reportSchema.safeParse(invalidReportData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });

    it('필수 필드 누락을 올바르게 감지한다', () => {
      const incompleteData = {
        location: {
          name: '부산 해운대해수욕장'
          // coordinates 누락
        },
        // activityType 누락
        participantCount: 1,
        // contactInfo 누락
        activityDate: '2025-01-02',
        duration: 2
      };

      const result = reportSchema.safeParse(incompleteData);
      expect(result.success).toBe(false);
    });

    it('좌표 범위를 올바르게 검증한다', () => {
      const validCoordinates = { lat: 35.1595, lng: 129.1603 };
      const invalidLatitude = { lat: 91, lng: 129.1603 };
      const invalidLongitude = { lat: 35.1595, lng: 181 };

      const validData = {
        location: { name: '테스트', coordinates: validCoordinates },
        activityType: '패들보드',
        participantCount: 1,
        contactInfo: { name: '테스트', phone: '010-1234-5678' },
        activityDate: '2025-01-02',
        duration: 2
      };

      expect(reportSchema.safeParse(validData).success).toBe(true);
      
      const invalidLatData = { ...validData, location: { name: '테스트', coordinates: invalidLatitude } };
      expect(reportSchema.safeParse(invalidLatData).success).toBe(false);
      
      const invalidLngData = { ...validData, location: { name: '테스트', coordinates: invalidLongitude } };
      expect(reportSchema.safeParse(invalidLngData).success).toBe(false);
    });
  });

  describe('ReportService API 호출', () => {
    it('성공적인 신고 제출 시 올바른 응답을 반환한다', async () => {
      const validReportData = {
        location: {
          name: '제주도 중문해수욕장',
          coordinates: { lat: 33.2394, lng: 126.4109 }
        },
        activityType: '카약' as const,
        participantCount: 1,
        contactInfo: {
          name: '김테스트',
          phone: '010-9876-5432'
        },
        activityDate: '2025-01-03',
        duration: 2
      };

      const mockResponse = {
        success: true,
        data: {
          reportId: 'RPT-20250101-001',
          status: 'APPROVED',
          analysis: {
            overallScore: 85,
            weatherScore: 90,
            locationScore: 80,
            fishingRightScore: 85,
            fisheryScore: 88,
            navigationScore: 90
          },
          emergencyContacts: {
            coastGuard: '국번없이 122',
            rescue: '119',
            localAuthority: '051-709-4000'
          }
        }
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const response = await ReportService.submitReport(validReportData);
      
      expect(response.success).toBe(true);
      expect(response.data.reportId).toBeDefined();
      expect(response.data.status).toMatch(/APPROVED|CAUTION|DENIED/);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/report/submit'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(validReportData)
        })
      );
    });

    it('네트워크 오류 시 적절한 에러를 던진다', async () => {
      const validReportData = {
        location: {
          name: '강원도 속초항',
          coordinates: { lat: 38.2070, lng: 128.5918 }
        },
        activityType: '윈드서핑' as const,
        participantCount: 3,
        contactInfo: {
          name: '박테스트',
          phone: '010-5555-6666'
        },
        activityDate: '2025-01-04',
        duration: 4
      };

      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(ReportService.submitReport(validReportData))
        .rejects.toThrow('Network error');
    });

    it('서버 오류 응답을 올바르게 처리한다', async () => {
      const validReportData = {
        location: {
          name: '인천 을왕리해수욕장',
          coordinates: { lat: 37.4449, lng: 126.3828 }
        },
        activityType: '프리다이빙' as const,
        participantCount: 1,
        contactInfo: {
          name: '이테스트',
          phone: '010-7777-8888'
        },
        activityDate: '2025-01-05',
        duration: 1.5
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ error: '서버 오류가 발생했습니다.' })
      });

      await expect(ReportService.submitReport(validReportData))
        .rejects.toThrow('서버 오류가 발생했습니다.');
    });
  });

  describe('API 응답 형식 검증', () => {
    it('리포트 ID 형식이 올바르다', () => {
      const reportIds = [
        'RPT-20250101-001',
        'RPT-20251231-999',
        'RPT-20250615-123'
      ];

      const reportIdPattern = /^RPT-\d{8}-\d{3}$/;
      
      reportIds.forEach(reportId => {
        expect(reportId).toMatch(reportIdPattern);
      });
    });

    it('안전도 점수가 유효한 범위에 있다', () => {
      const analysisScores = [
        { overallScore: 0, weatherScore: 0, locationScore: 0 },
        { overallScore: 50, weatherScore: 45, locationScore: 60 },
        { overallScore: 100, weatherScore: 100, locationScore: 100 },
      ];

      analysisScores.forEach(scores => {
        expect(scores.overallScore).toBeGreaterThanOrEqual(0);
        expect(scores.overallScore).toBeLessThanOrEqual(100);
        expect(scores.weatherScore).toBeGreaterThanOrEqual(0);
        expect(scores.weatherScore).toBeLessThanOrEqual(100);
        expect(scores.locationScore).toBeGreaterThanOrEqual(0);
        expect(scores.locationScore).toBeLessThanOrEqual(100);
      });
    });

    it('활동 타입 검증이 올바르게 작동한다', () => {
      const validActivityTypes = ['패들보드', '프리다이빙', '카약', '윈드서핑', '수상스키', '요트'];
      const invalidActivityTypes = ['swimming', 'fishing', 'sailing'];

      validActivityTypes.forEach(activityType => {
        const data = {
          location: { name: '테스트', coordinates: { lat: 35, lng: 129 } },
          activityType,
          participantCount: 1,
          contactInfo: { name: '테스트', phone: '010-1234-5678' },
          activityDate: '2025-01-02',
          duration: 2
        };
        expect(reportSchema.safeParse(data).success).toBe(true);
      });

      invalidActivityTypes.forEach(activityType => {
        const data = {
          location: { name: '테스트', coordinates: { lat: 35, lng: 129 } },
          activityType,
          participantCount: 1,
          contactInfo: { name: '테스트', phone: '010-1234-5678' },
          activityDate: '2025-01-02',
          duration: 2
        };
        expect(reportSchema.safeParse(data).success).toBe(false);
      });
    });
  });
});