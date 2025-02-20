import React, { forwardRef } from 'react';
import { Root as LabelRoot } from '@radix-ui/react-label';
import { Eye, EyeSlash, MagnifyingGlass } from '@phosphor-icons/react';
import { cn } from '../../utils';

const Input = forwardRef(({
  type = 'text',
  label,
  error,
  helperText,
  prefix,
  suffix,
  className,
  size = 'base',
  variant = 'primary',
  disabled,
  required,
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [localType, setLocalType] = React.useState(type);

  React.useEffect(() => {
    if (type === 'password') {
      setLocalType(showPassword ? 'text' : 'password');
    }
  }, [showPassword, type]);

  const sizeClasses = {
    sm: 'h-10 text-sm',
    base: 'h-12 text-base',
    lg: 'h-14 text-lg'
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

  const inputContainerClasses = cn(
    'relative flex rounded-lg shadow-sm ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset bg-whitely-50',
    variantClasses[error ? 'error' : variant],
    disabled && 'opacity-40',
    className
  );

  const inputClasses = cn(
    'w-full flex-1 border-0 bg-transparent px-4 text-gray-900 placeholder:text-gray-400',
    'focus:ring-0 outline-none disabled:cursor-not-allowed',
    sizeClasses[size],
    prefix && 'pl-1.5',
    suffix && 'pr-1.5'
  );

  const renderPasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="pr-4 text-gray-400 hover:text-gray-600 focus:outline-none"
    >
      {showPassword ? (
        <EyeSlash className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  );

  const renderSearchIcon = () => (
    <MagnifyingGlass className="h-5 w-5 text-gray-400" />
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

      <div className={inputContainerClasses}>
        {prefix && (
          <div className="flex select-none items-center pl-4 text-gray-500">
            {prefix}
          </div>
        )}

        {type === 'search' && !prefix && (
          <div className="flex select-none items-center pl-4 text-gray-500">
            {renderSearchIcon()}
          </div>
        )}

        <input
          ref={ref}
          type={localType}
          id={id}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />

        {suffix && (
          <div className="flex select-none items-center pr-4 text-gray-500">
            {suffix}
          </div>
        )}

        {type === 'password' && !suffix && renderPasswordToggle()}
      </div>

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

Input.displayName = 'Input';

export default Input; 