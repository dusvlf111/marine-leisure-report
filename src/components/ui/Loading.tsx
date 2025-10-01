import React from 'react';
import { cn } from '@/lib/utils';
import { HARDWARE_ACCELERATED, useReducedMotion } from '@/lib/animations/optimizations';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  text?: string;
  className?: string;
  prefersReducedMotion?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  prefersReducedMotion = false,
  size = 'md',
  variant = 'spinner',
  text,
  className,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const renderSpinner = () => (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
        HARDWARE_ACCELERATED.transform3d,
        sizeClasses[size],
        className
      )}
      style={{
        animationDuration: prefersReducedMotion ? '0.6s' : '0.3s'
      }}
    />
  );

  const renderDots = () => (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            'animate-bounce rounded-full bg-blue-600',
            HARDWARE_ACCELERATED.transform3d,
            size === 'sm' && 'w-1 h-1',
            size === 'md' && 'w-2 h-2',
            size === 'lg' && 'w-3 h-3'
          )}
          style={{
            animationDelay: `${index * (prefersReducedMotion ? 0.2 : 0.1)}s`,
            animationDuration: prefersReducedMotion ? '0.8s' : '0.4s'
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div
      className={cn(
        'animate-pulse rounded-full bg-blue-600',
        HARDWARE_ACCELERATED.animated,
        sizeClasses[size],
        className
      )}
      style={{
        animationDuration: prefersReducedMotion ? '1.2s' : '0.6s'
      }}
    />
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {renderLoader()}
      {text && (
        <p className={cn(
          'text-gray-600',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg'
        )}>
          {text}
        </p>
      )}
    </div>
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  children: React.ReactNode;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  text = '로딩 중...',
  children,
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={cn(
      "relative",
      HARDWARE_ACCELERATED.base
    )}>
      {children}
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50",
            "animate-fadeIn animate-gpu",
            HARDWARE_ACCELERATED.animated
          )}
          style={{
            animationDuration: prefersReducedMotion ? '0.4s' : '0.2s'
          }}
        >
          <Loading 
            variant="spinner" 
            size="lg" 
            text={text}
            prefersReducedMotion={prefersReducedMotion} 
          />
        </div>
      )}
    </div>
  );
};

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = 'rectangular',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const baseClasses = cn(
    'animate-pulse bg-gray-300',
    HARDWARE_ACCELERATED.animated
  );
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      style={{
        animationDuration: prefersReducedMotion ? '1.6s' : '0.8s'
      }}
    />
  );
};
