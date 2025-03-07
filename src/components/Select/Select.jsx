import React, { forwardRef } from 'react';
import { Root, Trigger, Value, Icon, Portal, Content, ScrollUpButton, Viewport, Item, ItemText, ItemIndicator, Group, Label, Separator, ScrollDownButton } from '@radix-ui/react-select';
import { Root as LabelRoot } from '@radix-ui/react-label';
import { CaretDown, CaretUp, Check } from '@phosphor-icons/react';
import { cn } from '../../utils';
import { z } from 'zod';

const selectSchema = z.object({
  value: z.string().optional(),
  onChange: z.function().optional(),
  options: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      disabled: z.boolean().optional(),
    })
  ),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
  placeholder: z.string().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  size: z.enum(['sm', 'base', 'lg']).optional(),
  variant: z.enum(['primary', 'secondary']).optional(),
  id: z.string().optional(),
});

const Select = forwardRef(({
  value,
  onChange,
  options = [],
  label,
  error,
  helperText,
  placeholder = 'Select an option',
  disabled,
  required,
  size = 'base',
  variant = 'primary',
  id,
  className,
  ...props
}, ref) => {
  // Validate props with Zod
  try {
    selectSchema.parse({
      value,
      onChange,
      options,
      label,
      error,
      helperText,
      placeholder,
      disabled,
      required,
      size,
      variant,
      id,
    });
  } catch (error) {
    console.error('Select component validation error:', error);
  }

  const sizeClasses = {
    sm: 'h-10 text-sm py-2.5',
    base: 'h-12 text-base py-3',
    lg: 'h-14 text-lg py-4'
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

  const triggerClasses = cn(
    'relative flex w-full items-center justify-between rounded-lg shadow-sm ring-2 ring-inset focus:ring-2 focus:ring-inset bg-whitely-50',
    'px-4 text-left outline-none',
    'data-[placeholder]:text-gray-400',
    variantClasses[error ? 'error' : variant],
    sizeClasses[size],
    disabled && 'opacity-40 cursor-not-allowed',
    className
  );

  const contentClasses = cn(
    'overflow-hidden rounded-lg bg-white shadow-lg',
    'border border-gray-200',
    'z-50'
  );

  const viewportClasses = cn(
    'max-h-[300px] overflow-auto'
  );

  const itemClasses = cn(
    'relative flex items-center px-4 py-2 text-gray-900',
    'data-[highlighted]:bg-primary-50 data-[highlighted]:text-primary-900',
    'data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none',
    'outline-none cursor-pointer'
  );

  const scrollButtonClasses = cn(
    'flex items-center justify-center h-6 bg-white text-gray-700',
    'cursor-default'
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

      <Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        {...props}
      >
        <Trigger className={triggerClasses} aria-label={label || placeholder}>
          <Value placeholder={placeholder} />
          <Icon asChild>
            <CaretDown className="h-5 w-5 text-gray-400" />
          </Icon>
        </Trigger>

        <Portal>
          <Content className={contentClasses} position="popper" sideOffset={5}>
            <ScrollUpButton className={scrollButtonClasses}>
              <CaretUp className="h-4 w-4" />
            </ScrollUpButton>
            <Viewport className={viewportClasses}>
              {options.map((option) => (
                <Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={itemClasses}
                >
                  <ItemText>{option.label}</ItemText>
                  <ItemIndicator className="absolute right-2 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-600" />
                  </ItemIndicator>
                </Item>
              ))}
            </Viewport>
            <ScrollDownButton className={scrollButtonClasses}>
              <CaretDown className="h-4 w-4" />
            </ScrollDownButton>
          </Content>
        </Portal>
      </Root>

      {(error || helperText) && (
        <p
          className={cn(
            'mt-1 text-sm',
            error ? 'text-red-600' : 'text-gray-500'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select; 