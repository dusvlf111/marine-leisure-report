import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/design/colors';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs sm:text-sm font-medium mb-1" style={{ color: colors.primary.dark }}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base',
            'backdrop-blur-md border',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'placeholder-gray-500',
            'hover:shadow-lg focus:shadow-lg',
            error
              ? 'border-red-400 form-error shadow-red-500/25'
              : 'hover:shadow-md',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          style={{
            backgroundColor: colors.primary.accent + '60',
            borderColor: error ? colors.semantic.error : colors.primary.medium,
            color: colors.primary.dark
          }}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs sm:text-sm form-error" style={{ color: colors.semantic.error }}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs sm:text-sm" style={{ color: colors.primary.medium }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
