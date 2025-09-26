'use client';

import React from 'react';
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
}

/**
 * 최적화된 이미지 컴포넌트
 * Next.js Image 컴포넌트를 기반으로 성능 최적화 적용
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
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  style,
  ...props
}) => {
  const imageProps = {
    src,
    alt,
    priority,
    placeholder,
    quality,
    className: cn(className),
    style,
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

  return (
    <OptimizedImage
      src={config.src}
      alt="해양레저 안전신고 로고"
      width={config.width}
      height={config.height}
      className={cn('drop-shadow-lg', className)}
      priority={priority}
      quality={100} // SVG는 고품질로
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

  return (
    <OptimizedImage
      src={config.src}
      alt={config.alt}
      width={size}
      height={size}
      className={cn('inline-block', className)}
      quality={100}
    />
  );
};