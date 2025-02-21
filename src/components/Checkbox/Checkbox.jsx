import React from 'react';
import { Root, Indicator } from '@radix-ui/react-checkbox';
import { Check } from '@phosphor-icons/react';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

const CheckboxSchema = z.object({
  checked: z.boolean().optional(),
  defaultChecked: z.boolean().optional(),
  onCheckedChange: z.function().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  name: z.string().optional(),
  value: z.string().optional(),
  id: z.string().optional(),
  label: z.string().optional(),
  description: z.string().optional(),
  size: z.enum(['sm', 'base', 'lg']).optional(),
  variant: z.enum(['primary', 'secondary']).optional(),
  className: z.string().optional(),
  asChild: z.boolean().optional(),
});

const sizeStyles = {
  sm: {
    checkbox: 'h-4 w-4',
    label: 'text-sm',
    description: 'text-xs',
    icon: 'h-3 w-3',
  },
  base: {
    checkbox: 'h-5 w-5',
    label: 'text-base',
    description: 'text-sm',
    icon: 'h-4 w-4',
  },
  lg: {
    checkbox: 'h-6 w-6',
    label: 'text-lg',
    description: 'text-base',
    icon: 'h-5 w-5',
  },
};

const variantStyles = {
  primary: {
    checkbox: 'border-primary-400 data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600',
    hover: 'hover:border-primary-500',
    focus: 'focus-visible:ring-primary-500',
  },
  secondary: {
    checkbox: 'border-secondary-400 data-[state=checked]:bg-secondary-800 data-[state=checked]:border-secondary-800',
    hover: 'hover:border-secondary-500',
    focus: 'focus-visible:ring-secondary-500',
  },
};

const Checkbox = React.forwardRef((props, ref) => {
  const {
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    required,
    name,
    value,
    id,
    label,
    description,
    size = 'base',
    variant = 'primary',
    className,
    asChild,
    ...rest
  } = CheckboxSchema.parse(props);

  return (
    <div className={twMerge('flex items-start gap-3', className)}>
      <Root
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        id={id}
        asChild={asChild}
        className={twMerge(
          'flex shrink-0 items-center justify-center rounded border-2 bg-whitely-50 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          sizeStyles[size].checkbox,
          variantStyles[variant].checkbox,
          variantStyles[variant].hover,
          variantStyles[variant].focus
        )}
        {...rest}
      >
        <Indicator className="flex items-center justify-center text-whitely-50">
          <Check weight="bold" className={sizeStyles[size].icon} />
        </Indicator>
      </Root>
      {(label || description) && (
        <div className="flex flex-col gap-1">
          {label && (
            <label
              htmlFor={id}
              className={twMerge(
                'text-aeblack-800 font-medium leading-none -mt-0.5',
                disabled && 'text-aeblack-300',
                sizeStyles[size].label
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className={twMerge(
              'text-aeblack-400 leading-snug',
              disabled && 'text-aeblack-200',
              sizeStyles[size].description
            )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox; 