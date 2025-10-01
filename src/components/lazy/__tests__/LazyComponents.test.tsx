import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  LazyMapView,
  LazyReportForm,
  LazyWeatherInfo,
  LazySafetyAnalysis,
  LazyWrapper,
  LazyActivitySelector,
  LazyLocationSelector,
  LazyProgressiveImage
} from '../LazyComponents';

// 동적 임포트 모킹
jest.mock('next/dynamic', () => {
  return (loader: () => Promise<any>, options?: any) => {
    const MockComponent = (props: any) => {
      const [Component, setComponent] = React.useState<React.ComponentType<any> | null>(null);
      const [isLoading, setIsLoading] = React.useState(true);

      React.useEffect(() => {
        loader().then((mod) => {
          const ComponentToRender = mod.default || mod;
          setComponent(() => ComponentToRender);
          setIsLoading(false);
        }).catch(() => {
          setIsLoading(false);
        });
      }, []);

      if (isLoading) {
        return options?.loading ? options.loading() : <div>Loading...</div>;
      }

      if (!Component) {
        return <div>Failed to load component</div>;
      }

      return <Component {...props} />;
    };

    MockComponent.displayName = 'MockDynamicComponent';
    return MockComponent;
  };
});

// React Hook Form 모킹
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn((fn) => (e: any) => {
      e.preventDefault();
      fn({});
    }),
    formState: { errors: {} },
    setValue: jest.fn(),
    watch: jest.fn(),
  }),
}));

// Zod 모킹
jest.mock('@/lib/data/schemas', () => ({
  reportSchema: {
    parse: jest.fn(),
  },
}));

// Mock data
jest.mock('@/lib/data/mockData', () => ({
  locations: [
    { name: '부산광역시 해운대구', coordinates: { lat: 35.1595, lng: 129.1600 } }
  ],
  activityTypes: ['패들보드', '카약'],
}));

describe('LazyComponents 코드 스플리팅 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LazyMapView', () => {
    test('로딩 중 스켈레톤 표시', async () => {
      render(<LazyMapView />);
      
      // 로딩 상태 확인
      expect(screen.getByText('지도를 불러오는 중...')).toBeInTheDocument();
      
      // 컴포넌트 로드 대기
      await waitFor(() => {
        expect(screen.queryByText('지도를 불러오는 중...')).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('맵 컴포넌트 동적 로딩', async () => {
      render(<LazyMapView />);
      
      await waitFor(() => {
        // 로딩이 완료되면 실제 컴포넌트가 렌더링되어야 함
        expect(screen.queryByText('지도를 불러오는 중...')).not.toBeInTheDocument();
      });
    });
  });

  describe('LazyReportForm', () => {
    test('폼 로딩 스켈레톤 표시', () => {
      render(<LazyReportForm />);
      
      // 폼 로딩 스켈레톤 확인
      const skeletons = screen.getAllByRole('generic');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    test('폼 컴포넌트 동적 로딩', async () => {
      render(<LazyReportForm />);
      
      await waitFor(() => {
        // 폼이 로드되면 스켈레톤이 사라져야 함
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('LazyWeatherInfo', () => {
    const mockWeather = {
      condition: 'CLEAR' as const,
      windSpeed: 5,
      waveHeight: 1.2,
      visibility: 'GOOD' as const,
      temperature: 22,
    };

    test('날씨 정보 로딩 상태', () => {
      render(<LazyWeatherInfo weather={mockWeather} />);
      
      // 로딩 스켈레톤 확인
      expect(screen.getByRole('generic')).toHaveClass('animate-pulse');
    });

    test('날씨 컴포넌트 동적 로딩', async () => {
      render(<LazyWeatherInfo weather={mockWeather} />);
      
      await waitFor(() => {
        expect(screen.queryByText('날씨 정보 로딩 중...')).not.toBeInTheDocument();
      });
    });
  });

  describe('LazySafetyAnalysis', () => {
    const mockAnalysis = {
      status: 'APPROVED' as const,
      overallScore: 85,
      weatherScore: 90,
      locationScore: 80,
      fishingRightScore: 85,
      fisheryScore: 85,
      navigationScore: 85,
      risks: [],
      recommendations: ['안전장비 착용'],
    };

    test('안전 분석 로딩 상태', () => {
      render(<LazySafetyAnalysis status="APPROVED" analysis={mockAnalysis} />);
      
      expect(screen.getByRole('generic')).toHaveClass('animate-pulse');
    });

    test('안전 분석 컴포넌트 동적 로딩', async () => {
      render(<LazySafetyAnalysis status="APPROVED" analysis={mockAnalysis} />);
      
      await waitFor(() => {
        expect(screen.queryByText('안전 분석 로딩 중...')).not.toBeInTheDocument();
      });
    });
  });

  describe('LazyWrapper', () => {
    test('기본 래퍼 동작', () => {
      render(
        <LazyWrapper>
          <div>Test Content</div>
        </LazyWrapper>
      );
      
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('조건부 렌더링', () => {
      render(
        <LazyWrapper condition={false}>
          <div>Hidden Content</div>
        </LazyWrapper>
      );
      
      expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
    });

    test('커스텀 fallback', () => {
      render(
        <LazyWrapper fallback={<div>Custom Loading</div>}>
          <div>Test Content</div>
        </LazyWrapper>
      );
      
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('LazyActivitySelector', () => {
    test('활동 선택기 로딩', () => {
      render(<LazyActivitySelector value="" onChange={jest.fn()} />);
      
      expect(screen.getByRole('generic')).toHaveClass('animate-pulse');
    });

    test('활동 선택기 동적 로딩', async () => {
      render(<LazyActivitySelector value="" onChange={jest.fn()} />);
      
      await waitFor(() => {
        expect(screen.queryByRole('generic')).not.toHaveClass('animate-pulse');
      });
    });
  });

  describe('LazyLocationSelector', () => {
    test('위치 선택기 로딩', () => {
      render(<LazyLocationSelector value={null} onChange={jest.fn()} />);
      
      expect(screen.getByRole('generic')).toHaveClass('animate-pulse');
    });

    test('위치 선택기 동적 로딩', async () => {
      render(<LazyLocationSelector value={null} onChange={jest.fn()} />);
      
      await waitFor(() => {
        expect(screen.queryByRole('generic')).not.toHaveClass('animate-pulse');
      });
    });
  });

  describe('LazyProgressiveImage', () => {
    test('이미지 프로그레시브 로딩', () => {
      render(
        <LazyProgressiveImage 
          src="/test-image.jpg" 
          alt="Test Image" 
          width={300} 
          height={200} 
        />
      );
      
      expect(screen.getByRole('generic')).toHaveClass('animate-pulse');
    });

    test('이미지 컴포넌트 동적 로딩', async () => {
      render(
        <LazyProgressiveImage 
          src="/test-image.jpg" 
          alt="Test Image" 
          width={300} 
          height={200} 
        />
      );
      
      await waitFor(() => {
        expect(screen.queryByRole('generic')).not.toHaveClass('animate-pulse');
      });
    });
  });
});

describe('코드 스플리팅 성능 테스트', () => {
  test('청크 분리 검증', () => {
    // 실제 번들 분석은 빌드 시에 확인
    // 여기서는 동적 임포트가 정상적으로 설정되었는지 확인
    expect(typeof LazyMapView).toBe('object');
    expect(typeof LazyReportForm).toBe('object');
    expect(typeof LazyWeatherInfo).toBe('object');
    expect(typeof LazySafetyAnalysis).toBe('object');
  });

  test('컴포넌트 지연 로딩 검증', async () => {
    const startTime = performance.now();
    
    render(<LazyMapView />);
    
    await waitFor(() => {
      expect(screen.queryByText('지도를 불러오는 중...')).not.toBeInTheDocument();
    });
    
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    // 로딩 시간이 적절한 범위 내에 있는지 확인 (3초 이내)
    expect(loadTime).toBeLessThan(3000);
  });

  test('메모리 사용량 최적화 검증', () => {
    // Chrome DevTools에서만 사용 가능한 performance.memory 타입 확장
    const getMemoryUsage = (): number => {
      const performanceAny = performance as any;
      return performanceAny.memory?.usedJSHeapSize || 0;
    };

    const initialMemory = getMemoryUsage();
    
    render(
      <div>
        <LazyMapView />
        <LazyReportForm />
        <LazyWeatherInfo weather={{
          condition: 'CLEAR',
          windSpeed: 5,
          waveHeight: 1,
          visibility: 'GOOD',
          temperature: 20
        }} />
      </div>
    );
    
    const afterRenderMemory = getMemoryUsage();
    const memoryIncrease = afterRenderMemory - initialMemory;
    
    // 메모리 증가량이 합리적인 범위 내에 있는지 확인 (10MB 이내)
    // 브라우저 환경이 아닌 경우에는 0이 반환되므로 체크
    if (memoryIncrease > 0) {
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    }
  });
});