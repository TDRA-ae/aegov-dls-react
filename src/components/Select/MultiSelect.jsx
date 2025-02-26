import React, { forwardRef, useState, useEffect } from 'react';
import { Root as LabelRoot } from '@radix-ui/react-label';
import { X, CaretDown, CaretUp, Check } from '@phosphor-icons/react';
import { cn } from '../../utils';
import { z } from 'zod';

const multiSelectSchema = z.object({
  value: z.array(z.string()).optional(),
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

const MultiSelect = forwardRef(({
  value = [],
  onChange,
  options = [],
  label,
  error,
  helperText,
  placeholder = 'Select options',
  disabled,
  required,
  size = 'base',
  variant = 'primary',
  id,
  className,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(value || []);
  const containerRef = React.useRef(null);

  // Validate props with Zod
  try {
    multiSelectSchema.parse({
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
    console.error('MultiSelect component validation error:', error);
  }

  useEffect(() => {
    setSelectedValues(value || []);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue) => {
    const newSelectedValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
    
    setSelectedValues(newSelectedValues);
    
    if (onChange) {
      onChange(newSelectedValues);
    }
  };

  const handleRemoveValue = (optionValue, e) => {
    e.stopPropagation();
    const newSelectedValues = selectedValues.filter(v => v !== optionValue);
    setSelectedValues(newSelectedValues);
    
    if (onChange) {
      onChange(newSelectedValues);
    }
  };

  const sizeClasses = {
    sm: 'min-h-10 text-sm py-1.5',
    base: 'min-h-12 text-base py-2',
    lg: 'min-h-14 text-lg py-2.5'
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
    'relative flex w-full flex-wrap items-center justify-between rounded-lg shadow-sm ring-2 ring-inset focus:ring-2 focus:ring-inset bg-whitely-50',
    'px-4 text-left outline-none',
    variantClasses[error ? 'error' : variant],
    sizeClasses[size],
    disabled && 'opacity-40 cursor-not-allowed',
    className
  );

  const contentClasses = cn(
    'absolute left-0 right-0 mt-1 overflow-hidden rounded-lg bg-white shadow-lg',
    'border border-gray-200',
    'z-50 max-h-60 overflow-y-auto'
  );

  const itemClasses = cn(
    'relative flex items-center px-4 py-2 text-gray-900',
    'hover:bg-primary-50 hover:text-primary-900',
    'outline-none cursor-pointer'
  );

  const selectedItemClasses = cn(
    'flex items-center gap-1 m-0.5 px-2 py-1 rounded-md bg-primary-100 text-primary-800',
    'text-sm'
  );

  const getSelectedLabels = () => {
    return options
      .filter(option => selectedValues.includes(option.value))
      .map(option => option.label);
  };

  const selectedLabels = getSelectedLabels();

  return (
    <div className="w-full" ref={containerRef}>
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

      <div
        ref={ref}
        className={triggerClasses}
        onClick={handleToggle}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={id}
        {...props}
      >
        <div className="flex flex-wrap flex-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label, index) => (
              <div key={index} className={selectedItemClasses}>
                <span>{label}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveValue(selectedValues[index], e)}
                  className="text-primary-600 hover:text-primary-800 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))
          ) : (
            <span className="text-gray-400 py-1">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center ml-2">
          {isOpen ? (
            <CaretUp className="h-5 w-5 text-gray-400" />
          ) : (
            <CaretDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className={contentClasses}>
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                itemClasses,
                option.disabled && 'opacity-50 pointer-events-none',
                selectedValues.includes(option.value) && 'bg-primary-50'
              )}
              onClick={() => !option.disabled && handleOptionClick(option.value)}
              role="option"
              aria-selected={selectedValues.includes(option.value)}
            >
              <span className="flex-1">{option.label}</span>
              {selectedValues.includes(option.value) && (
                <Check className="h-4 w-4 text-primary-600" />
              )}
            </div>
          ))}
        </div>
      )}

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

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect; 