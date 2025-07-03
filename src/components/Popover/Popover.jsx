import React, { useState, useRef, useEffect } from 'react';
import { Root, Trigger, Portal, Content, Arrow, Close } from '@radix-ui/react-popover';
import { X } from '@phosphor-icons/react';
import { z } from 'zod';

const PopoverRootSchema = z.object({
  children: z.any(),
  trigger: z.enum(['click', 'hover']).optional().default('click'),
  open: z.boolean().optional(),
  onOpenChange: z.function().optional(),
});

const PopoverContentSchema = z.object({
  children: z.any(),
  className: z.string().optional(),
  sideOffset: z.number().optional().default(5),
  align: z.enum(['start', 'center', 'end']).optional().default('center'),
  side: z.enum(['top', 'right', 'bottom', 'left']).optional().default('bottom'),
  onMouseEnter: z.function().optional(),
  onMouseLeave: z.function().optional(),
});

const PopoverTriggerSchema = z.object({
  children: z.any(),
  asChild: z.boolean().optional().default(false),
  onMouseEnter: z.function().optional(),
  onMouseLeave: z.function().optional(),
});

const PopoverRoot = React.forwardRef((props, ref) => {
  const { children, trigger = 'click', open, onOpenChange } = PopoverRootSchema.parse(props);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  
  const handleOpenChange = (newOpen) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const controlledOpen = open !== undefined ? open : isOpen;

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    handleOpenChange(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      handleOpenChange(false);
    }, 150); // Delay to allow moving between trigger and content
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (trigger === 'hover') {
    return (
      <Root open={controlledOpen} onOpenChange={handleOpenChange}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === PopoverTrigger) {
              return React.cloneElement(child, {
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
              });
            }
            if (child.type === PopoverContent) {
              return React.cloneElement(child, {
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
              });
            }
          }
          return child;
        })}
      </Root>
    );
  }

  return (
    <Root open={controlledOpen} onOpenChange={handleOpenChange}>
      {children}
    </Root>
  );
});

PopoverRoot.displayName = 'PopoverRoot';

const PopoverTrigger = React.forwardRef((props, ref) => {
  const { children, asChild = false, onMouseEnter, onMouseLeave } = PopoverTriggerSchema.parse(props);
  
  return (
    <Trigger
      ref={ref}
      asChild={asChild}
      className={!asChild ? 'inline-flex items-center justify-center' : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
    onMouseEnter,
    onMouseLeave,
  } = PopoverContentSchema.parse(props);

  return (
    <Portal>
      <Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        side={side}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
        <Close className="absolute right-3 rtl:left-3 rtl:right-auto top-3 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100">
          <X className="h-4 w-4 text-gray-500" weight="bold" />
        </Close>
        <Arrow className="fill-white" />
      </Content>
    </Portal>
  );
});

PopoverContent.displayName = 'PopoverContent';

export {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
}; 