'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  quality?: number;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * 최적화된 이미지 컴포넌트
 * Next.js Image 컴포넌트를 기반으로 성능 최적화 적용
 * - WebP/AVIF 자동 변환
 * - 반응형 크기 조정
 * - 지연 로딩 기본 적용
 * - 품질 최적화
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  quality = 85,
  sizes = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw',
  fill = false,
  style,
  onLoad,
  onError,
  ...props
}) => {
  // 이미지 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // 모바일 우선 품질 최적화
  const optimizedQuality = priority ? 95 : 85;
  
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };
  
  const imageProps = {
    src,
    alt,
    priority,
    placeholder,
    quality: optimizedQuality,
    className: cn(
      'transition-all duration-300',
      isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100',
      hasError ? 'opacity-50' : '',
      className
    ),
    style,
    loading: priority ? 'eager' as const : 'lazy' as const,
    onLoad: handleLoad,
    onError: handleError,
    ...props,
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes={sizes}
        alt={alt}
      />
    );
  }

  if (width && height) {
    return (
      <Image
        {...imageProps}
        width={width}
        height={height}
        alt={alt}
      />
    );
  }

  // SVG의 경우 자동 크기 조정
  if (src.endsWith('.svg')) {
    return (
      <Image
        {...imageProps}
        width={width || 40}
        height={height || 40}
        alt={alt}
      />
    );
  }

  // 기본값
  return (
    <Image
      {...imageProps}
      width={width || 300}
      height={height || 200}
      alt={alt}
    />
  );
};

/**
 * 로고 전용 최적화 컴포넌트
 */
interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  priority?: boolean;
}

export const MarineLogo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  className,
  priority = false 
}) => {
  const sizeConfig = {
    small: { width: 24, height: 24, src: '/images/logo-marine-small.svg' },
    medium: { width: 32, height: 32, src: '/images/logo-marine.svg' },
    large: { width: 48, height: 48, src: '/images/logo-marine.svg' },
  };

  const config = sizeConfig[size];

  const responsiveSizes = size === 'small' 
    ? '(max-width: 640px) 20px, (max-width: 768px) 22px, 24px'
    : size === 'medium'
    ? '(max-width: 640px) 28px, (max-width: 768px) 30px, 32px'
    : '(max-width: 640px) 40px, (max-width: 768px) 44px, 48px';

  return (
    <OptimizedImage
      src={config.src}
      alt="해양레저 안전신고 로고"
      width={config.width}
      height={config.height}
      className={cn('drop-shadow-lg object-contain w-auto h-auto', className)}
      priority={priority}
      quality={100} // SVG는 고품질로
      sizes={responsiveSizes}
    />
  );
};

/**
 * 안전 상태 아이콘 컴포넌트
 */
interface SafetyStatusIconProps {
  status: 'APPROVED' | 'CAUTION' | 'DENIED';
  size?: number;
  className?: string;
}

export const SafetyStatusIcon: React.FC<SafetyStatusIconProps> = ({
  status,
  size = 32,
  className
}) => {
  const statusConfig = {
    APPROVED: { src: '/images/status-safe.svg', alt: '승인됨' },
    CAUTION: { src: '/images/status-caution.svg', alt: '주의' },
    DENIED: { src: '/images/status-danger.svg', alt: '거부됨' },
  };

  const config = statusConfig[status];
  
  // 반응형 사이즈 설정
  const responsiveSizes = `(max-width: 640px) ${Math.max(size - 8, 16)}px, (max-width: 768px) ${Math.max(size - 4, 20)}px, ${size}px`;

  return (
    <OptimizedImage
      src={config.src}
      alt={config.alt}
      width={size}
      height={size}
      className={cn('inline-block object-contain transition-transform hover:scale-110 duration-200', className)}
      quality={100}
      sizes={responsiveSizes}
      priority={false}
    />
  );
};

/**
 * 이미지 로딩 스켈레톤 컴포넌트
 */
interface ImageSkeletonProps {
  width?: number;
  height?: number;
  className?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  width = 300,
  height = 200,
  className
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 rounded-lg',
        'flex items-center justify-center',
        'transition-all duration-300',
        className
      )}
      style={{ width, height }}
    >
      <svg
        className="w-8 h-8 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

/**
 * Progressive Loading 이미지 컴포넌트
 * 로딩 중 스켈레톤 표시
 */
interface ProgressiveImageProps extends OptimizedImageProps {
  showSkeleton?: boolean;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  showSkeleton = true,
  width,
  height,
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {/* 스켈레톤 로딩 */}
      {isLoading && showSkeleton && (
        <ImageSkeleton 
          width={width} 
          height={height} 
          className={cn('absolute inset-0', className)}
        />
      )}
      
      {/* 실제 이미지 */}
      <OptimizedImage
        {...props}
        width={width}
        height={height}
        className={cn(
          'transition-opacity duration-500',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};