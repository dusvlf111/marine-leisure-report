import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  children,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {children}
    </div>
  );
};

interface ContentAreaProps {
  children: React.ReactNode;
  className?: string;
}

export const ContentArea: React.FC<ContentAreaProps> = ({
  children,
  className,
}) => {
  return (
    <main className={cn('flex-1 py-8', className)}>
      <Container>
        {children}
      </Container>
    </main>
  );
};
