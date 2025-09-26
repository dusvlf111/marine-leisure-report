import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/design/colors';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, placeholder, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1" style={{ color: colors.primary.dark }}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-lg transition-all duration-300',
            'backdrop-blur-md border',
            'focus:outline-none focus:ring-2 focus:border-transparent',
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
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm form-error" style={{ color: colors.semantic.error }}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm" style={{ color: colors.primary.medium }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
