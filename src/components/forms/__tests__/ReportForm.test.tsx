import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReportForm } from '../ReportForm';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock ReportService
jest.mock('@/lib/services/reportService', () => ({
  ReportService: {
    submitReport: jest.fn(),
  },
}));

const user = userEvent.setup();

describe('ReportForm 컴포넌트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('폼이 올바르게 렌더링된다', () => {
    render(<ReportForm />)
    
    expect(screen.getByText('🌊 해양레저스포츠 자율신고')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /자율신고 접수하기/i })).toBeInTheDocument()
  })

  it('기본 요소들이 표시된다', () => {
    render(<ReportForm />)
    
    expect(screen.getByText('활동 위치')).toBeInTheDocument()
    expect(screen.getByText('활동 종목')).toBeInTheDocument()
    expect(screen.getByText('참가자 수')).toBeInTheDocument()
    expect(screen.getByText('담당자 이름')).toBeInTheDocument()
    expect(screen.getByText('연락처')).toBeInTheDocument()
  })

  it('입력 필드가 작동한다', async () => {
    render(<ReportForm />)

    const nameInput = screen.getByPlaceholderText('이름을 입력하세요')
    await user.type(nameInput, '테스트 사용자')
    expect(nameInput).toHaveValue('테스트 사용자')
    
    const phoneInput = screen.getByPlaceholderText('010-1234-5678')
    await user.type(phoneInput, '010-1234-5678')
    expect(phoneInput).toHaveValue('010-1234-5678')
  })

  it('참가자 수 입력이 작동한다', async () => {
    render(<ReportForm />)

    const participantInput = screen.getByDisplayValue('1')
    await user.clear(participantInput)
    await user.type(participantInput, '5')
    expect(participantInput).toHaveValue(5)
  })

  it('활동 시간 입력이 작동한다', async () => {
    render(<ReportForm />)

    const durationInput = screen.getByDisplayValue('2')
    await user.clear(durationInput)
    await user.type(durationInput, '4')
    expect(durationInput).toHaveValue(4)
  })

  it('폼 검증 오류가 표시된다', async () => {
    render(<ReportForm />)

    const submitButton = screen.getByRole('button', { name: /자율신고 접수하기/i })
    await user.click(submitButton)

    await waitFor(() => {
      // 실제 에러 메시지 확인
      expect(screen.getByText('위치를 선택해주세요')).toBeInTheDocument()
    })
    
    // 이름 필드 에러는 별도로 확인
    await waitFor(() => {
      expect(screen.getByText('이름을 입력해주세요')).toBeInTheDocument()
    })
  })

  it('성공적인 폼 제출 시 결과 페이지로 이동한다', async () => {
    const { ReportService } = require('@/lib/services/reportService')
    ReportService.submitReport.mockResolvedValue({
      success: true,
      data: { reportId: 'RPT-TEST-001' }
    })

    render(<ReportForm />)

    // 위치 선택
    const locationSelect = screen.getByDisplayValue('활동할 위치를 선택하세요')
    await user.selectOptions(locationSelect, '부산 해운대해수욕장')

    // 필수 필드 입력
    const nameInput = screen.getByPlaceholderText('이름을 입력하세요')
    const phoneInput = screen.getByPlaceholderText('010-1234-5678')
    const dateInput = screen.getByDisplayValue('')
    
    await user.type(nameInput, '테스트 사용자')
    await user.type(phoneInput, '010-1234-5678')
    await user.type(dateInput, '2025-01-02')

    const submitButton = screen.getByRole('button', { name: /자율신고 접수하기/i })
    await user.click(submitButton)

    // 성공 메시지 또는 로딩 상태 확인
    await waitFor(() => {
      expect(screen.getByText(/AI 안전도 분석 중.../i) || screen.getByText('신고가 성공적으로 접수되었습니다!')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('지도 토글 버튼이 표시된다', () => {
    render(<ReportForm />)

    const mapToggleButton = screen.getByRole('button', { name: '지도에서 선택' })
    expect(mapToggleButton).toBeInTheDocument()
  })

  it('애니메이션 클래스가 적용된다', () => {
    render(<ReportForm />)
    
    // Card 컴포넌트가 애니메이션 클래스를 가지고 있는지 확인
    const animatedCard = screen.getByText('🌊 해양레저스포츠 자율신고').closest('.animate__animated')
    expect(animatedCard).toBeInTheDocument()
  })
})
