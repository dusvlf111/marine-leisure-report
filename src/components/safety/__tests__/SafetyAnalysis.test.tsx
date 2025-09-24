import { render, screen } from '@testing-library/react'
import { SafetyAnalysis } from '../SafetyAnalysis'
import { SafetyAnalysisData } from '@/types/global'

describe('SafetyAnalysis 컴포넌트', () => {
  const mockAnalysisData: SafetyAnalysisData = {
    overallScore: 85,
    weatherScore: 90,
    locationScore: 95,
    fishingRightScore: 100,
    fisheryScore: 80,
    navigationScore: 75
  }

  it('APPROVED 상태일 때 올바르게 렌더링된다', () => {
    render(<SafetyAnalysis analysis={mockAnalysisData} status="APPROVED" />)
    
    expect(screen.getByText('활동 승인')).toBeInTheDocument()
    expect(screen.getByText(/85/)).toBeInTheDocument() // 전체 점수
    expect(screen.getByText('안전한 활동 조건입니다')).toBeInTheDocument()
  })

  it('CAUTION 상태일 때 올바르게 렌더링된다', () => {
    const cautionData: SafetyAnalysisData = {
      overallScore: 65,
      weatherScore: 70,
      locationScore: 60,
      fishingRightScore: 70,
      fisheryScore: 65,
      navigationScore: 60
    }

    render(<SafetyAnalysis analysis={cautionData} status="CAUTION" />)
    
    expect(screen.getByText('주의 필요')).toBeInTheDocument()
    expect(screen.getByText(/65/)).toBeInTheDocument()
    expect(screen.getByText('주의사항을 준수하여 활동하세요')).toBeInTheDocument()
  })

  it('DENIED 상태일 때 올바르게 렌더링된다', () => {
    const deniedData: SafetyAnalysisData = {
      overallScore: 35,
      weatherScore: 40,
      locationScore: 30,
      fishingRightScore: 40,
      fisheryScore: 35,
      navigationScore: 30
    }

    render(<SafetyAnalysis analysis={deniedData} status="DENIED" />)
    
    expect(screen.getByText('활동 비권장')).toBeInTheDocument()
    expect(screen.getByText(/35/)).toBeInTheDocument()
    expect(screen.getByText('현재 조건에서는 활동을 권장하지 않습니다')).toBeInTheDocument()
  })

  it('모든 세부 점수를 표시한다', () => {
    render(<SafetyAnalysis analysis={mockAnalysisData} status="APPROVED" />)
    
    expect(screen.getByText('기상 조건')).toBeInTheDocument()
    expect(screen.getByText(/90/)).toBeInTheDocument()
    
    expect(screen.getByText('위치 안전도')).toBeInTheDocument()
    expect(screen.getByText(/95/)).toBeInTheDocument()
    
    expect(screen.getByText('어업권 현황')).toBeInTheDocument()
    expect(screen.getByText(/100/)).toBeInTheDocument()
    
    expect(screen.getByText('항로 안전성')).toBeInTheDocument()
    expect(screen.getByText(/75/)).toBeInTheDocument()
  })

  it('점수가 0일 때도 올바르게 처리된다', () => {
    const zeroScoreData: SafetyAnalysisData = {
      overallScore: 0,
      weatherScore: 0,
      locationScore: 0,
      fishingRightScore: 0,
      fisheryScore: 0,
      navigationScore: 0
    }

    render(<SafetyAnalysis analysis={zeroScoreData} status="DENIED" />)
    
    expect(screen.getByText('종합 안전도 점수')).toBeInTheDocument()
    expect(screen.getByText('활동 비권장')).toBeInTheDocument()
  })

  it('점수가 100일 때도 올바르게 처리된다', () => {
    const perfectScoreData: SafetyAnalysisData = {
      overallScore: 100,
      weatherScore: 100,
      locationScore: 100,
      fishingRightScore: 100,
      fisheryScore: 100,
      navigationScore: 100
    }

    render(<SafetyAnalysis analysis={perfectScoreData} status="APPROVED" />)
    
    const scoreElements = screen.getAllByText(/100/)
    expect(scoreElements.length).toBeGreaterThan(0)
    expect(screen.getByText('활동 승인')).toBeInTheDocument()
  })
})
