import React from 'react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/design/colors';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}) => {
  const baseClasses = 'rounded-lg transition-all duration-300 backdrop-blur-md';
  
  const variantClasses = {
    default: 'backdrop-blur-md border shadow-lg hover:shadow-xl',
    elevated: 'backdrop-blur-md shadow-2xl hover:shadow-3xl hover-lift border',
    outlined: 'backdrop-blur-md border-2 hover:shadow-lg',
  };
  
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      style={{ backgroundColor: colors.primary.accent + '40', borderColor: colors.primary.medium, ...props.style }}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('mb-4 pb-2 border-b border-gray-100', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  level = 3,
  className,
  ...props
}) => {
  const levelClasses = {
    1: 'text-3xl font-bold',
    2: 'text-2xl font-bold',
    3: 'text-xl font-semibold',
    4: 'text-lg font-semibold',
    5: 'text-base font-medium',
    6: 'text-sm font-medium',
  };
  
  const headingProps = {
    className: cn('text-gray-900', levelClasses[level], className),
    ...props,
  };
  
  switch (level) {
    case 1:
      return <h1 {...headingProps}>{children}</h1>;
    case 2:
      return <h2 {...headingProps}>{children}</h2>;
    case 3:
      return <h3 {...headingProps}>{children}</h3>;
    case 4:
      return <h4 {...headingProps}>{children}</h4>;
    case 5:
      return <h5 {...headingProps}>{children}</h5>;
    case 6:
      return <h6 {...headingProps}>{children}</h6>;
    default:
      return <h3 {...headingProps}>{children}</h3>;
  }
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('text-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('mt-4 pt-4 border-t border-gray-100 flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
};
