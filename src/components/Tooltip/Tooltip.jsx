import React from 'react'
import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-tooltip'
import { twMerge } from 'tailwind-merge';
import { z } from 'zod'

const TooltipSchema = z.object({
  children: z.any(),
  content: z.any(),
  className: z.string().optional(),
  side: z.enum(['top', 'right', 'bottom', 'left']).optional(),
  align: z.enum(['start', 'center', 'end']).optional(),
})

const Tooltip = ({
  children,
  content,
  className,
  side = 'top',
  align = 'center',
  ...props
}) => {
  try {
    TooltipSchema.parse({
      children,
      content,
      className,
      side,
      align,
    })
  } catch (error) {
    console.error('Tooltip validation error:', error)
    return null
  }

  return (
    <Root delayDuration={200}>
      <Trigger asChild>
        <div className="inline-flex items-center gap-1">
          {children}
        </div>
      </Trigger>
      <Portal>
        <Content
          side={side}
          align={align}
          className={twMerge(
            'z-50 rounded-md bg-gray-900 px-4 py-2 text-sm text-white shadow-md',
            'animate-in fade-in-0 zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            className
          )}
          {...props}
        >
          {content}
          <Arrow className="fill-gray-900" />
        </Content>
      </Portal>
    </Root>
  )
}

export default Tooltip 