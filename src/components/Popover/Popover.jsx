import React from 'react';
import { Root, Trigger, Portal, Content, Arrow, Close } from '@radix-ui/react-popover';
import { X } from '@phosphor-icons/react';
import { z } from 'zod';

const PopoverContentSchema = z.object({
  children: z.any(),
  className: z.string().optional(),
  sideOffset: z.number().optional().default(5),
  align: z.enum(['start', 'center', 'end']).optional().default('center'),
  side: z.enum(['top', 'right', 'bottom', 'left']).optional().default('bottom'),
});

const PopoverTriggerSchema = z.object({
  children: z.any(),
  asChild: z.boolean().optional().default(false),
});

const PopoverTrigger = React.forwardRef((props, ref) => {
  const { children, asChild = false } = PopoverTriggerSchema.parse(props);
  
  return (
    <Trigger
      ref={ref}
      asChild={asChild}
      className={!asChild ? 'inline-flex items-center justify-center' : undefined}
    >
      {children}
    </Trigger>
  );
});

PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverContent = React.forwardRef((props, ref) => {
  const {
    children,
    className = '',
    sideOffset = 5,
    align = 'center',
    side = 'bottom',
  } = PopoverContentSchema.parse(props);

  return (
    <Portal>
      <Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        side={side}
        className={`
          z-50 w-72 rounded-lg bg-white p-4 shadow-lg
          animate-in data-[side=bottom]:slide-in-from-top-2
          data-[side=top]:slide-in-from-bottom-2
          data-[side=right]:slide-in-from-left-2
          data-[side=left]:slide-in-from-right-2
          ${className}
        `}
      >
        {children}
        <Close className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100">
          <X className="h-4 w-4 text-gray-500" weight="bold" />
        </Close>
        <Arrow className="fill-white" />
      </Content>
    </Portal>
  );
});

PopoverContent.displayName = 'PopoverContent';

export {
  Root as PopoverRoot,
  PopoverTrigger,
  PopoverContent,
}; 