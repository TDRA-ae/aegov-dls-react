import React from 'react'
import { Root, Trigger, Portal, Overlay, Content, Close, Title } from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import { cn } from '../../utils'
import { z } from 'zod'

const modalSchema = z.object({
  children: z.any(),
  title: z.string().optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  variant: z.enum(['default', 'danger']).optional(),
  className: z.string().optional(),
  trigger: z.any().optional(),
})

const Modal = ({ 
  children, 
  title,
  size = 'md',
  variant = 'default',
  className,
  trigger,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-xl'
  }

  return (
    <Root>
      {trigger && (
        <Trigger asChild>
          {trigger}
        </Trigger>
      )}
      <Portal>
        <Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Content
          {...props}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
            "w-full p-6",
            "bg-white rounded-lg shadow-lg",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            sizeClasses[size],
            className
          )}
        >
          {title && (
            <div className="flex items-center justify-between mb-6">
              <Title className="text-xl font-semibold text-gray-900">
                {title}
              </Title>
              <Close className="rounded-lg p-1.5 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
                <X className="h-5 w-5 text-gray-500" />
                <span className="sr-only">Close</span>
              </Close>
            </div>
          )}
          {children}
        </Content>
      </Portal>
    </Root>
  )
}

export default Modal 