// TODO: RTL
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { cva } from "class-variance-authority";
import { z } from 'zod';
import { Slot } from '@radix-ui/react-slot';

const ButtonSchema = z.object({
  children: z.any(),
  className: z.string().optional(),
  style: z.enum(['primary', 'secondary'], { message: 'Style must be either primary or secondary' }).optional(),
  variant: z.enum(['solid', 'soft', 'link', 'outline']).optional(),
  size: z.enum(['xs', 'sm', 'base', 'lg']).optional(),
  block: z.boolean().optional(),
  isIcon: z.boolean().optional(),
  asChild: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

const style = {
  primary: {
    variant: {
      solid: 'bg-primary-600 text-whitely-50 hover:bg-primary-500 hover:text-primary-50 hover:ring-4 hover:ring-primary-100 hover:shadow-primary-100 focus-visible:ring-primary-support-300',
      soft: 'bg-primary-50 hover:bg-primary-100 text-primary-700 hover:text-primary-600 focus-visible:ring-primary-support-400 hover:shadow-none focus-visible:ring-offset-0 disabled:opacity-50',
      link: 'text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-support-400 focus-visible:border-primary-support-400 bg-transparent hover:shadow-none focus-visible:ring-1 focus-visible:ring-offset-0',
      outline: 'text-primary-600 hover:bg-primary-50 border-primary-600 focus-visible:border-primary-support-400 focus-visible:ring-primary-support-400 bg-transparent hover:shadow-none focus-visible:ring-1 focus-visible:ring-offset-0'
    }
  },
  secondary: {
    variant: {
      solid: 'bg-secondary-800 text-secondary-50 hover:bg-secondary-950 hover:text-secondary-100 hover:ring-4 hover:ring-secondary-100 hover:shadow-secondary-100 focus-visible:ring-secondary-support-300',
      soft: 'bg-secondary-50 hover:bg-secondary-100 text-secondary-800 hover:text-secondary-800 hover:shadow-none focus-visible:ring-offset-0 disabled:opacity-50',
      link: 'text-secondary-800 hover:bg-secondary-50 focus-visible:border-secondary-support-300 bg-transparent hover:shadow-none focus-visible:ring-1 focus-visible:ring-offset-0',
      outline: 'text-secondary-800 hover:bg-secondary-100 border-secondary-800 focus-visible:border-secondary-support-300 bg-transparent hover:shadow-none focus-visible:ring-1 focus-visible:ring-offset-0'
    },
  }
}

const button = (styleType) => cva(
  [
    // Base styles
    'inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center text-center no-underline transition duration-200 ease-in-out',
    // Basic styles
    'h-12 gap-2 rounded-lg border-2 border-transparent px-6 text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    // Disabled styles
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30 disabled:!shadow-none',
  ],
  {
    variants: {
      variant: style[styleType].variant,
      size: {
        xs: 'h-8 rounded px-4 text-sm',
        sm: 'h-10 rounded-md px-5 text-base',
        base: 'h-12 gap-2 rounded-lg px-6',
        lg: 'h-13 gap-3 px-7 text-lg',
      },
      block: {
        true: 'w-full'
      },
      isIcon: {
        true: 'gap-0 px-0',
        false: ''
      },
    },
    compoundVariants: [
      { isIcon: true, size: 'xs', class: 'w-8' },
      { isIcon: true, size: 'sm', class: 'w-10' },
      { isIcon: true, size: 'base', class: 'w-12' },
      { isIcon: true, size: 'lg', class: 'w-14' },
    ],
    defaultVariants: {
      variant: 'solid',
    }
  }
)

const Button = React.forwardRef((props, ref) => {
  const {
    style: styleType,
    children,
    className,
    variant,
    size,
    block,
    isIcon,
    asChild,
    disabled,
    ...rest
  } = ButtonSchema.parse(props);

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      className={twMerge(
        button(styleType || 'primary')({
          variant,
          size,
          block,
          isIcon,
        }),
        className
      )}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </Comp>
  );
});

Button.displayName = 'Button';

export default Button;