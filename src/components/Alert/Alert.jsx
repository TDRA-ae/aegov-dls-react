import React from 'react';
import { Info, Warning, CheckCircle, X, XCircle, CaretRight } from '@phosphor-icons/react';
import { z } from 'zod';
import { cn } from '../../utils';

const AlertSchema = z.object({
  variant: z.enum(['info', 'warning', 'success', 'error']).default('info'),
  title: z.string().optional(),
  children: z.any(),
  className: z.string().optional(),
  size: z.enum(['sm', 'base', 'lg']).default('base'),
  style: z.enum(['soft', 'solid']).default('soft'),
  onDismiss: z.function().optional(),
  action: z.object({
    text: z.string(),
    href: z.string(),
  }).optional(),
  id: z.string().optional(),
});

const variantStyles = {
  info: {
    soft: 'bg-techblue-50 text-techblue-700',
    solid: 'bg-techblue-600 text-whitely-50',
    icon: Info,
    link: {
      soft: 'hover:text-techblue-600',
      solid: 'hover:text-whitely-100'
    }
  },
  warning: {
    soft: 'bg-camel-50 text-camel-700',
    solid: 'bg-camel-600 text-whitely-50',
    icon: Warning,
    link: {
      soft: 'hover:text-camel-600',
      solid: 'hover:text-whitely-100'
    }
  },
  success: {
    soft: 'bg-aegreen-50 text-aegreen-700',
    solid: 'bg-aegreen-600 text-whitely-50',
    icon: CheckCircle,
    link: {
      soft: 'hover:text-aegreen-600',
      solid: 'hover:text-whitely-100'
    }
  },
  error: {
    soft: 'bg-aered-50 text-aered-700',
    solid: 'bg-aered-600 text-whitely-50',
    icon: XCircle,
    link: {
      soft: 'hover:text-aered-600',
      solid: 'hover:text-whitely-100'
    }
  },
};

const sizeStyles = {
  sm: {
    container: 'px-4 py-3 gap-3',
    icon: 'h-5 w-5',
    text: 'text-sm',
    actionIcon: 'h-4 w-4',
  },
  base: {
    container: 'px-6 py-4 gap-4',
    icon: 'h-7 w-7',
    text: 'text-base',
    actionIcon: 'h-5 w-5',
  },
  lg: {
    container: 'px-7 py-5 gap-4',
    icon: 'h-8 w-8',
    text: 'text-lg',
    actionIcon: 'h-6 w-6',
  },
};

const AlertContent = ({ variantStyle, sizeStyle, title, children, action, style }) => (
  <>
    <div className="flex-shrink-0">
      <variantStyle.icon className={cn('fill-current', sizeStyle.icon)} weight="fill" />
    </div>
    <div className="flex-1">
      {title && (
        <div className={cn('font-semibold mb-5', sizeStyle.text)}>
          {title}
        </div>
      )}
      <div className={cn(sizeStyle.text)}>
        <div className={action ? 'flex justify-between items-start gap-6' : ''}>
          <div>{children}</div>
          {action && (
            <div className={cn('flex-shrink-0', sizeStyle.text === 'text-lg' ? 'text-base' : 'text-sm')}>
              <a
                href={action.href}
                className={cn(
                  'underline underline-offset-1 inline-flex items-center gap-2 font-medium hover:underline hover:underline-offset-2',
                  variantStyle.link[style]
                )}
              >
                {action.text}
                <CaretRight className={sizeStyle.actionIcon} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  </>
);

export const Alert = (props) => {
  const {
    variant,
    title,
    children,
    className,
    size,
    style,
    action,
    onDismiss,
    ...rest
  } = AlertSchema.parse(props);

  const variantStyle = variantStyles[variant];
  const styleVariant = variantStyle[style];
  const sizeStyle = sizeStyles[size];

  return (
    <div
      role="alert"
      className={cn(
        'relative flex items-start rounded',
        styleVariant,
        sizeStyle.container,
        className
      )}
      {...rest}
    >
      <AlertContent
        variantStyle={variantStyle}
        sizeStyle={sizeStyle}
        title={title}
        children={children}
        action={action}
        style={style}
      />
      {onDismiss && (
        <button 
          onClick={onDismiss} 
          aria-label="Close"
          className={
            'flex-shrink-0 rounded-full hover:opacity-50 transition-opacity duration-200'
          }
        >
          <X className={cn(sizeStyle.icon, style === 'solid' ? 'text-whitely-50' : '')} />
        </button>
      )}
    </div>
  );
};

export default Alert;