import React, { forwardRef } from 'react';
import { Root as LabelRoot } from '@radix-ui/react-label';
import { z } from 'zod';
import { cn } from '../../utils';

export const textareaSchema = z.object({
  value: z.string().min(1, 'This field is required'),
});

const Textarea = forwardRef(({
  label,
  error,
  helperText,
  className,
  size = 'base',
  variant = 'primary',
  disabled,
  required,
  id,
  rows = 4,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'text-sm py-2.5',
    base: 'text-base py-3',
    lg: 'text-lg py-3.5',
  };

  const labelSizeClasses = {
    sm: 'text-sm',
    base: 'text-sm',
    lg: 'text-base'
  };

  const variantClasses = {
    primary: 'focus-within:ring-primary-600 ring-primary-400',
    secondary: 'focus-within:ring-secondary-600 ring-secondary-400',
    error: 'focus-within:ring-red-600 ring-red-400 bg-red-50'
  };

  const textareaContainerClasses = cn(
    'relative flex rounded-lg shadow-sm ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset bg-whitely-50',
    variantClasses[error ? 'error' : variant],
    disabled && 'opacity-40',
    className
  );

  const textareaClasses = cn(
    'w-full flex-1 border-0 bg-transparent px-4 text-gray-900 placeholder:text-gray-400',
    'focus:ring-0 outline-none disabled:cursor-not-allowed resize-none',
    sizeClasses[size]
  );

  return (
    <div className="w-full">
      {label && (
        <LabelRoot
          htmlFor={id}
          className={cn(
            'mb-1 block font-medium text-gray-900',
            labelSizeClasses[size],
            error && 'text-red-600',
            required && 'after:ml-0.5 after:text-red-500 after:content-["*"]'
          )}
        >
          {label}
        </LabelRoot>
      )}

      <div className={textareaContainerClasses}>
        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          rows={rows}
          className={textareaClasses}
          aria-disabled={disabled ? 'true' : undefined}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
      </div>

      {(error || helperText) && (
        <p
          className={cn(
            'mt-1 text-sm',
            error ? 'text-red-600' : 'text-gray-500'
          )}
        >
          {error ? (
            <span className="font-medium">Error: </span>
          ) : null}
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea; 