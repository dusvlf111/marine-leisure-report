import { generateReportId, formatDate, formatPhoneNumber, validateCoordinates } from '../utils'

describe('유틸리티 함수 테스트', () => {
  describe('generateReportId', () => {
    it('올바른 형식의 신고 ID를 생성한다', () => {
      const reportId = generateReportId()
      
      expect(reportId).toMatch(/^RPT-\d{8}-\d{4}$/)
      expect(typeof reportId).toBe('string')
      expect(reportId.length).toBe(17) // RPT- + 8자리 + - + 4자리
    })

    it('매번 다른 ID를 생성한다', () => {
      const id1 = generateReportId()
      const id2 = generateReportId()
      
      expect(id1).not.toBe(id2)
    })

    it('현재 날짜가 포함된다', () => {
      const reportId = generateReportId()
      const today = new Date()
      const year = today.getFullYear().toString()
      const month = (today.getMonth() + 1).toString().padStart(2, '0')
      const day = today.getDate().toString().padStart(2, '0')
      
      expect(reportId).toContain(year)
      expect(reportId).toContain(month)
      expect(reportId).toContain(day)
    })
  })

  describe('formatDate', () => {
    it('Date 객체를 한국어 형식으로 변환한다', () => {
      const date = new Date(2025, 0, 15, 9, 30, 0) // 2025-01-15 09:30:00 (로컬 시간)
      const formatted = formatDate(date)
      
      expect(formatted).toBe('2025년 1월 15일 09시 30분')
    })

    it('다른 시간대도 올바르게 변환한다', () => {
      const date = new Date(2025, 11, 25, 14, 45, 0) // 2025-12-25 14:45:00
      const formatted = formatDate(date)
      
      expect(formatted).toBe('2025년 12월 25일 14시 45분')
    })

    it('잘못된 날짜 문자열에 대해 오류를 발생시킨다', () => {
      expect(() => formatDate('invalid-date')).toThrow()
    })

    it('undefined나 null에 대해 적절히 처리한다', () => {
      expect(() => formatDate(undefined as any)).toThrow()
      expect(() => formatDate(null as any)).toThrow()
    })
  })

  describe('formatPhoneNumber', () => {
    it('숫자만 있는 전화번호를 형식에 맞게 변환한다', () => {
      expect(formatPhoneNumber('01012345678')).toBe('010-1234-5678')
      expect(formatPhoneNumber('01087654321')).toBe('010-8765-4321')
    })

    it('이미 형식이 있는 전화번호를 정리한다', () => {
      expect(formatPhoneNumber('010-1234-5678')).toBe('010-1234-5678')
      expect(formatPhoneNumber('010.1234.5678')).toBe('010-1234-5678')
      expect(formatPhoneNumber('010 1234 5678')).toBe('010-1234-5678')
    })

    it('잘못된 길이의 전화번호에 대해 오류를 발생시킨다', () => {
      expect(() => formatPhoneNumber('123')).toThrow()
      expect(() => formatPhoneNumber('123456789012345')).toThrow()
    })

    it('문자가 포함된 전화번호를 처리한다', () => {
      expect(() => formatPhoneNumber('abc1234567d')).toThrow()
    })

    it('빈 문자열이나 null을 처리한다', () => {
      expect(() => formatPhoneNumber('')).toThrow()
      expect(() => formatPhoneNumber(null as any)).toThrow()
    })
  })

  describe('validateCoordinates', () => {
    it('유효한 좌표에 대해 true를 반환한다', () => {
      expect(validateCoordinates({ lat: 35.1596, lng: 129.1600 })).toBe(true)
      expect(validateCoordinates({ lat: 37.5665, lng: 126.9780 })).toBe(true)
      expect(validateCoordinates({ lat: 0, lng: 0 })).toBe(true)
      expect(validateCoordinates({ lat: -90, lng: -180 })).toBe(true)
      expect(validateCoordinates({ lat: 90, lng: 180 })).toBe(true)
    })

    it('유효하지 않은 위도에 대해 false를 반환한다', () => {
      expect(validateCoordinates({ lat: 91, lng: 129.1600 })).toBe(false)
      expect(validateCoordinates({ lat: -91, lng: 129.1600 })).toBe(false)
      expect(validateCoordinates({ lat: NaN, lng: 129.1600 })).toBe(false)
      expect(validateCoordinates({ lat: Infinity, lng: 129.1600 })).toBe(false)
    })

    it('유효하지 않은 경도에 대해 false를 반환한다', () => {
      expect(validateCoordinates({ lat: 35.1596, lng: 181 })).toBe(false)
      expect(validateCoordinates({ lat: 35.1596, lng: -181 })).toBe(false)
      expect(validateCoordinates({ lat: 35.1596, lng: NaN })).toBe(false)
      expect(validateCoordinates({ lat: 35.1596, lng: Infinity })).toBe(false)
    })

    it('undefined나 null 좌표에 대해 false를 반환한다', () => {
      expect(validateCoordinates(undefined as any)).toBe(false)
      expect(validateCoordinates(null as any)).toBe(false)
      expect(validateCoordinates({ lat: undefined as any, lng: 129.1600 })).toBe(false)
      expect(validateCoordinates({ lat: 35.1596, lng: undefined as any })).toBe(false)
    })

    it('문자열 좌표에 대해 false를 반환한다', () => {
      expect(validateCoordinates({ lat: '35.1596' as any, lng: 129.1600 })).toBe(false)
      expect(validateCoordinates({ lat: 35.1596, lng: '129.1600' as any })).toBe(false)
    })
  })
})
