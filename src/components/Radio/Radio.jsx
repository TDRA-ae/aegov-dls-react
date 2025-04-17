import React from 'react';
import { Root, Item, Indicator } from '@radix-ui/react-radio-group';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

const RadioSchema = z.object({
  defaultValue: z.string().optional(),
  value: z.string().optional(),
  onValueChange: z.function().optional(),
  name: z.string().optional(),
  required: z.boolean().optional(),
  disabled: z.boolean().optional(),
  orientation: z.enum(['horizontal', 'vertical']).optional(),
  className: z.string().optional(),
  children: z.any().optional(),
  size: z.enum(['sm', 'base', 'lg']).optional(),
  variant: z.enum(['primary', 'secondary']).optional(),
});

const RadioItemSchema = z.object({
  id: z.string().optional(),
  value: z.string(),
  disabled: z.boolean().optional(),
  className: z.string().optional(),
  children: z.any().optional(),
  description: z.string().optional(),
});

const sizeStyles = {
  sm: {
    radio: 'h-4 w-4',
    indicator: 'h-2 w-2',
    label: 'text-sm',
    description: 'text-xs',
  },
  base: {
    radio: 'h-5 w-5',
    indicator: 'h-2.5 w-2.5',
    label: 'text-base',
    description: 'text-sm',
  },
  lg: {
    radio: 'h-6 w-6',
    indicator: 'h-3 w-3',
    label: 'text-lg',
    description: 'text-base',
  },
};

const variantStyles = {
  primary: {
    radio: 'border-primary-400 focus-visible:ring-primary-500 before:bg-primary-50',
    indicator: 'bg-aegold-450',
    hover: 'hover:border-primary-500 before:absolute before:start-2/4 before:top-2/4 before:mix-blend-multiply before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:scale-0 before:rounded-full before:transition-all hover:before:scale-100',
  },
  secondary: {
    radio: 'border-secondary-400 focus-visible:ring-secondary-500 before:bg-secondary-50',
    indicator: 'bg-secondary-800',
    hover: 'hover:border-secondary-500 before:absolute before:start-2/4 before:top-2/4 before:mix-blend-multiply before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:scale-0 before:rounded-full before:transition-all hover:before:scale-100',
  },
};

// RadioItem component that can be used as a child of Radio
const RadioItem = React.forwardRef((props, ref) => {
  const {
    id,
    value,
    disabled,
    className,
    children,
    description,
    ...rest
  } = RadioItemSchema.parse(props);

  // These props will be injected by the parent Radio component
  const { size, variant, radioGroupDisabled } = props;
  
  // Generate a unique ID if none is provided
  const radioId = React.useMemo(() => id || `radio-${value}-${Math.random().toString(36).slice(2)}`, [id, value]);
  
  // Determine if this item is disabled (either individually or by the parent group)
  const isDisabled = radioGroupDisabled || disabled;

  return (
    <div className={twMerge("flex rtl:flex-row-reverse rtl:text-right items-start gap-4", className)}>
      <Item
        ref={ref}
        id={radioId}
        value={value}
        disabled={isDisabled}
        className={twMerge(
          'relative border-2 rounded-full bg-whitely-50 shrink-0 mt-[3px]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:border-primary-200 disabled:before:!hidden disabled:pointer-events-none',
          'transition-colors',
          sizeStyles[size]?.radio,
          variantStyles[variant]?.radio,
          variantStyles[variant]?.hover,
        )}
        {...rest}
      >
        <Indicator className={twMerge(
          'flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'rounded-full',
          sizeStyles[size]?.indicator,
          variantStyles[variant]?.indicator
        )} />
      </Item>
      {(children || description) && (
        <div>
          <label
            htmlFor={radioId}
            className={twMerge(
              'text-aeblack-800 font-semibold block',
              isDisabled && 'text-aeblack-300 cursor-not-allowed',
              sizeStyles[size]?.label
            )}
          >
            {children}
          </label>
          {description && (
            <p
              id={`${radioId}-description`}
              className={twMerge(
                'text-aeblack-400 mt-1',
                isDisabled && 'text-aeblack-200',
                sizeStyles[size]?.description
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

RadioItem.displayName = 'RadioItem';

// Main Radio component
const Radio = React.forwardRef((props, ref) => {
  const {
    defaultValue,
    value,
    onValueChange,
    name,
    required,
    disabled,
    orientation = 'vertical',
    className,
    children,
    size = 'base',
    variant = 'primary',
    ...rest
  } = RadioSchema.parse(props);

  return (
    <Root
      ref={ref}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      name={name}
      required={required}
      disabled={disabled}
      orientation={orientation}
      className={twMerge(
        'space-y-6',
        orientation === 'horizontal' && 'flex space-x-8 space-y-0',
        className
      )}
      {...rest}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Clone the child element and inject size, variant and disabled props
          return React.cloneElement(child, {
            size,
            variant,
            radioGroupDisabled: disabled,
          });
        }
        return child;
      })}
    </Root>
  );
});

Radio.displayName = 'Radio';

export { RadioItem, Radio };