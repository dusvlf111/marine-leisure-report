import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border-0 shadow-lg hover-lift';
  
  const variantClasses = {
    primary: 'backdrop-blur-md shadow-lg border',
    secondary: 'backdrop-blur-md shadow-md border',
    danger: 'bg-gradient-to-r from-red-600 via-red-500 to-pink-500 hover:from-red-500 hover:via-pink-500 hover:to-red-600 text-white focus:ring-red-500 shadow-red-500/25',
    success: 'bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 hover:from-green-500 hover:via-emerald-500 hover:to-green-600 text-white focus:ring-green-500',
    outline: 'backdrop-blur-md border-2 shadow-md',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#133E87',
          borderColor: '#608BC1',
          color: '#F3F3E0'
        };
      case 'secondary':
        return {
          backgroundColor: '#CBDCEB80',
          borderColor: '#608BC1',
          color: '#133E87'
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: '#608BC1',
          color: '#133E87'
        };
      default:
        return {
          backgroundColor: '#133E87',
          borderColor: '#608BC1',
          color: '#F3F3E0'
        };
    }
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      style={getButtonStyle()}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
