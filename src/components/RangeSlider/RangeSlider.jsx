import React from 'react';
import { Root, Track, Range, Thumb } from '@radix-ui/react-slider';
import { Root as LabelRoot } from '@radix-ui/react-label';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

const RangeSliderSchema = z.object({
  value: z.number().optional(),
  defaultValue: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  onValueChange: z.function().optional(),
  onValueCommit: z.function().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  name: z.string().optional(),
  label: z.string().optional(),
  helperText: z.string().optional(),
  error: z.string().optional(),
  size: z.enum(['sm', 'base', 'lg']).optional(),
  variant: z.enum(['primary', 'secondary']).optional(),
  className: z.string().optional(),
});

const sizeStyles = {
  sm: {
    track: 'h-1',
    thumb: 'h-3.5 w-3.5',
    label: 'text-sm',
    helperText: 'text-xs',
  },
  base: {
    track: 'h-1.5',
    thumb: 'h-4 w-4',
    label: 'text-base',
    helperText: 'text-sm',
  },
  lg: {
    track: 'h-2',
    thumb: 'h-5 w-5',
    label: 'text-lg',
    helperText: 'text-base',
  },
};

const variantStyles = {
  primary: {
    track: 'bg-primary-100',
    range: 'bg-primary-600',
    thumb: 'border-primary-600 focus:ring-primary-500',
  },
  secondary: {
    track: 'bg-secondary-100',
    range: 'bg-secondary-800',
    thumb: 'border-secondary-800 focus:ring-secondary-500',
  },
};

const RangeSlider = React.forwardRef((props, ref) => {
  const {
    value,
    defaultValue = 20,
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    onValueCommit,
    disabled,
    required,
    name,
    label,
    helperText,
    error,
    size = 'base',
    variant = 'primary',
    className,
    ...rest
  } = RangeSliderSchema.parse(props);

  // Generate a unique ID for accessibility
  const id = React.useMemo(() => name || `range-${Math.random().toString(36).slice(2)}`, [name]);

  // Convert single number to array for Radix UI Slider
  const sliderValue = value !== undefined ? [value] : undefined;
  const sliderDefaultValue = [defaultValue];
  
  const handleValueChange = (newValue) => onValueChange?.(newValue[0]);
  const handleValueCommit = (newValue) => onValueCommit?.(newValue[0]);

  return (
    <div className={twMerge('w-full', className)}>
      {label && (
        <LabelRoot
          htmlFor={id}
          className={twMerge(
            'mb-1.5 block font-medium text-gray-900',
            sizeStyles[size].label,
            error && 'text-red-600',
            required && 'after:ml-0.5 after:text-red-500 after:content-["*"]',
            disabled && 'opacity-50'
          )}
        >
          {label}
        </LabelRoot>
      )}

      <div className="flex items-center gap-4">
        <Root
          ref={ref}
          id={id}
          value={sliderValue}
          defaultValue={sliderDefaultValue}
          min={min}
          max={max}
          step={step}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          disabled={disabled}
          name={name}
          className="relative flex w-full touch-none select-none items-center"
          {...rest}
        >
          <Track
            className={twMerge(
              'relative grow rounded-full',
              sizeStyles[size].track,
              variantStyles[variant].track,
              disabled && 'opacity-50'
            )}
          >
            <Range className={twMerge(
              'absolute rounded-full',
              sizeStyles[size].track,
              variantStyles[variant].range,
              disabled && 'opacity-50'
            )} />
          </Track>
          <Thumb
            className={twMerge(
              'block rounded-full border-2 bg-white shadow-sm transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              'disabled:pointer-events-none disabled:opacity-50',
              sizeStyles[size].thumb,
              variantStyles[variant].thumb
            )}
          />
        </Root>
        <output
          htmlFor={id}
          className={twMerge(
            'w-12 text-right text-gray-900',
            sizeStyles[size].label,
            disabled && 'opacity-50'
          )}
        >
          {value ?? defaultValue}
        </output>
      </div>

      {(helperText || error) && (
        <p
          className={twMerge(
            'mt-1.5',
            sizeStyles[size].helperText,
            error ? 'text-red-600' : 'text-gray-500'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

RangeSlider.displayName = 'RangeSlider';

export default RangeSlider; 