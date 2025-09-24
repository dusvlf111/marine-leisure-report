import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReportForm } from '../ReportForm';

const user = userEvent.setup()

describe('ReportForm 컴포넌트', () => {
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

  it('지도 토글 버튼이 표시된다', () => {
    render(<ReportForm />)

    const mapToggleButton = screen.getByRole('button', { name: '지도에서 선택' })
    expect(mapToggleButton).toBeInTheDocument()
  })
})
