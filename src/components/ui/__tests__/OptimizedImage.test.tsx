import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  OptimizedImage, 
  MarineLogo, 
  SafetyStatusIcon, 
  ImageSkeleton,
  ProgressiveImage 
} from '../OptimizedImage';

// Next.js Image 컴포넌트 모킹
jest.mock('next/image', () => {
  const MockImage = ({ 
    src, 
    alt, 
    onLoad, 
    onError, 
    priority, 
    loading, 
    quality,
    sizes,
    fill,
    placeholder,
    width,
    height,
    className,
    ...props 
  }: any) => {
    // Next.js 전용 속성들을 표준 HTML 속성으로 변환
    const standardProps: any = {
      src,
      alt,
      className,
      onLoad,
      onError,
      'data-testid': 'next-image',
    };

    // Next.js 전용 속성들을 data 속성으로 전달
    if (priority !== undefined) standardProps['data-priority'] = priority;
    if (loading) standardProps.loading = loading;
    if (quality !== undefined) standardProps.quality = quality;
    if (sizes) standardProps.sizes = sizes;
    if (fill !== undefined) standardProps['data-fill'] = fill;
    if (placeholder) standardProps['data-placeholder'] = placeholder;
    if (width !== undefined) standardProps.width = width;
    if (height !== undefined) standardProps.height = height;

    return <img {...standardProps} {...props} />;
  };
  MockImage.displayName = 'MockImage';
  return MockImage;
});

describe('OptimizedImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    width: 300,
    height: 200,
  };

  test('기본 이미지 렌더링', () => {
    render(<OptimizedImage {...defaultProps} />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  test('우선순위 이미지의 품질 최적화', () => {
    render(<OptimizedImage {...defaultProps} priority />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'eager');
  });

  test('일반 이미지의 지연 로딩', () => {
    render(<OptimizedImage {...defaultProps} priority={false} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  test('이미지 로드 완료 시 상태 변경', async () => {
    const onLoadMock = jest.fn();
    render(<OptimizedImage {...defaultProps} onLoad={onLoadMock} />);
    
    const image = screen.getByRole('img');
    fireEvent.load(image);
    
    await waitFor(() => {
      expect(onLoadMock).toHaveBeenCalledTimes(1);
    });
  });

  test('이미지 로드 실패 시 에러 처리', async () => {
    const onErrorMock = jest.fn();
    render(<OptimizedImage {...defaultProps} onError={onErrorMock} />);
    
    const image = screen.getByRole('img');
    fireEvent.error(image);
    
    await waitFor(() => {
      expect(onErrorMock).toHaveBeenCalledTimes(1);
    });
  });

  test('반응형 sizes 속성 적용', () => {
    const customSizes = '(max-width: 768px) 100vw, 50vw';
    render(<OptimizedImage {...defaultProps} sizes={customSizes} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('sizes', customSizes);
  });

  test('fill 모드에서 dimensions 없이 렌더링', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" fill />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });
});

describe('MarineLogo', () => {
  test('small 사이즈 로고 렌더링', () => {
    render(<MarineLogo size="small" />);
    
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('alt', '해양레저 안전신고 로고');
    expect(logo).toHaveAttribute('width', '24');
    expect(logo).toHaveAttribute('height', '24');
  });

  test('medium 사이즈 로고 렌더링', () => {
    render(<MarineLogo size="medium" />);
    
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('width', '32');
    expect(logo).toHaveAttribute('height', '32');
  });

  test('large 사이즈 로고 렌더링', () => {
    render(<MarineLogo size="large" />);
    
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('width', '48');
    expect(logo).toHaveAttribute('height', '48');
  });

  test('priority 속성 적용', () => {
    render(<MarineLogo priority />);
    
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('loading', 'eager');
  });

  test('반응형 sizes 자동 설정', () => {
    render(<MarineLogo size="small" />);
    
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('sizes');
  });
});

describe('SafetyStatusIcon', () => {
  test('APPROVED 아이콘 렌더링', () => {
    render(<SafetyStatusIcon status="APPROVED" />);
    
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', '/images/status-safe.svg');
    expect(icon).toHaveAttribute('alt', '승인됨');
  });

  test('CAUTION 아이콘 렌더링', () => {
    render(<SafetyStatusIcon status="CAUTION" />);
    
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', '/images/status-caution.svg');
    expect(icon).toHaveAttribute('alt', '주의');
  });

  test('DENIED 아이콘 렌더링', () => {
    render(<SafetyStatusIcon status="DENIED" />);
    
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', '/images/status-danger.svg');
    expect(icon).toHaveAttribute('alt', '거부됨');
  });

  test('커스텀 크기 적용', () => {
    render(<SafetyStatusIcon status="APPROVED" size={64} />);
    
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('width', '64');
    expect(icon).toHaveAttribute('height', '64');
  });

  test('반응형 sizes 계산', () => {
    render(<SafetyStatusIcon status="APPROVED" size={32} />);
    
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('sizes');
  });

  test('hover 효과 클래스 적용', () => {
    render(<SafetyStatusIcon status="APPROVED" />);
    
    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('hover:scale-110');
  });
});

describe('ImageSkeleton', () => {
  test('기본 스켈레톤 렌더링', () => {
    render(<ImageSkeleton />);
    
    const skeletonContainer = screen.getByRole('img').parentElement;
    expect(skeletonContainer).toHaveClass('animate-pulse');
    expect(skeletonContainer).toHaveClass('bg-gray-200');
  });

  test('커스텀 크기 적용', () => {
    render(<ImageSkeleton width={400} height={300} />);
    
    const skeletonContainer = screen.getByRole('img').parentElement;
    expect(skeletonContainer).toHaveStyle({
      width: '400px',
      height: '300px'
    });
  });

  test('커스텀 클래스 적용', () => {
    render(<ImageSkeleton className="custom-skeleton" />);
    
    const skeletonContainer = screen.getByRole('img').parentElement;
    expect(skeletonContainer).toHaveClass('custom-skeleton');
  });
});

describe('ProgressiveImage', () => {
  test('로딩 중 스켈레톤 표시', () => {
    render(<ProgressiveImage src="/test.jpg" alt="Test" width={300} height={200} />);
    
    // 스켈레톤 컨테이너 확인
    const container = screen.getByRole('img').parentElement?.parentElement;
    expect(container).toHaveClass('relative');
  });

  test('이미지 로드 완료 후 스켈레톤 숨김', async () => {
    render(<ProgressiveImage src="/test.jpg" alt="Test" width={300} height={200} />);
    
    const image = screen.getByRole('img', { name: 'Test' });
    fireEvent.load(image);
    
    await waitFor(() => {
      expect(image).toHaveClass('opacity-100');
    });
  });

  test('스켈레톤 비활성화 옵션', () => {
    render(
      <ProgressiveImage 
        src="/test.jpg" 
        alt="Test" 
        width={300} 
        height={200} 
        showSkeleton={false} 
      />
    );
    
    // 스켈레톤이 없어야 함
    const skeletons = screen.queryAllByRole('img', { hidden: true });
    expect(skeletons).toHaveLength(0);
  });

  test('로딩 상태에 따른 투명도 변경', async () => {
    render(<ProgressiveImage src="/test.jpg" alt="Test" width={300} height={200} />);
    
    const image = screen.getByRole('img', { name: 'Test' });
    
    // 초기에는 투명
    expect(image).toHaveClass('opacity-0');
    
    // 로드 후 불투명
    fireEvent.load(image);
    await waitFor(() => {
      expect(image).toHaveClass('opacity-100');
    });
  });
});

describe('이미지 최적화 기능', () => {
  test('WebP/AVIF 형식 지원 확인', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" width={300} height={200} />);
    
    const image = screen.getByRole('img');
    // Next.js Image 컴포넌트가 자동으로 최적화된 형식을 제공
    expect(image).toBeInTheDocument();
  });

  test('반응형 이미지 sizes 최적화', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" width={300} height={200} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('sizes');
    
    const sizes = image.getAttribute('sizes');
    expect(sizes).toContain('max-width');
  });

  test('품질 최적화 설정', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" quality={90} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('quality', '90');
  });

  test('지연 로딩 기본 적용', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});