import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

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
          <label className="block text-sm font-medium mb-1" style={{ color: '#133E87' }}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-lg transition-all duration-300',
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
            backgroundColor: '#CBDCEB60',
            borderColor: error ? '#ef4444' : '#608BC1',
            color: '#133E87'
          }}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm form-error" style={{ color: '#ef4444' }}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm" style={{ color: '#608BC1' }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
