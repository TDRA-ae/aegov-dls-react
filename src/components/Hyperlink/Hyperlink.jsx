import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { CaretRight } from '@phosphor-icons/react'
import { cva } from 'class-variance-authority'
import { z } from 'zod'

const hyperlinkVariants = cva(
  // Base styles
  'relative inline-flex items-center gap-2 rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'underline underline-offset-2 text-primary-600 hover:text-primary-500 hover:decoration-2 active:text-primary-700',
        cta: 'px-2.5 py-2 -ml-2.5 font-semibold text-primary-600 hover:text-primary-500 hover:underline rtl:-mr-2.5 rtl:ml-0',
        soft: 'px-2.5 py-2 -ml-2.5 font-semibold text-primary-600 hover:text-primary-500 hover:bg-primary-50 rtl:-mr-2.5 rtl:ml-0',
        secondary: 'px-2.5 py-2 -ml-2.5 font-semibold text-gray-800 hover:text-gray-700 hover:underline rtl:-mr-2.5 rtl:ml-0',
        'secondary-soft': 'px-2.5 py-2 -ml-2.5 font-semibold text-gray-800 hover:text-gray-700 hover:bg-gray-50 rtl:-mr-2.5 rtl:ml-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const hyperlinkSchema = z.object({
  href: z.string().url().optional(),
  children: z.any(),
  variant: z.enum(['default', 'cta', 'soft', 'secondary', 'secondary-soft']).optional(),
  asChild: z.boolean().optional(),
  external: z.boolean().optional(),
  icon: z.boolean().optional(),
  className: z.string().optional(),
})

const Hyperlink = React.forwardRef(({
  href,
  children,
  variant = 'default',
  asChild = false,
  external = false,
  icon = false,
  className,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'a'
  
  // Validate props
  hyperlinkSchema.parse({
    href,
    children,
    variant,
    asChild,
    external,
    icon,
    className,
  })

  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}

  const content = (
    <>
      {children}
      {icon && (
        <CaretRight
          className="h-5 w-5 rtl:-scale-x-100"
          aria-hidden="true"
        />
      )}
      {external && (
        <span className="sr-only"> (opens in new tab)</span>
      )}
    </>
  )

  return (
    <Comp
      ref={ref}
      href={!asChild ? href : undefined}
      className={hyperlinkVariants({ variant, className })}
      {...externalProps}
      {...props}
    >
      {content}
    </Comp>
  )
})

Hyperlink.displayName = 'Hyperlink'

export { Hyperlink, hyperlinkSchema } 