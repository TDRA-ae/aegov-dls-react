import React from 'react'
import { Root, Image, Fallback } from '@radix-ui/react-avatar'
import { User } from '@phosphor-icons/react'
import { z } from 'zod'
import { cn } from '../../utils'

const sizeSchema = z.enum(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'])
const variantSchema = z.enum(['square', 'rounded'])
const statusSchema = z.enum(['online', 'offline', 'none'])

const sizeStyles = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  base: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-14 w-14',
  '2xl': 'h-16 w-16',
  '3xl': 'h-20 w-20'
}

const statusStyles = {
  online: 'bg-green-500',
  offline: 'bg-red-500',
  none: 'hidden'
}

const borderRadiusStyles = {
  xs: 'rounded-[4px]',
  sm: 'rounded-[4px]',
  base: 'rounded-[6px]',
  lg: 'rounded-[6px]',
  xl: 'rounded-[8px]',
  '2xl': 'rounded-[8px]',
  '3xl': 'rounded-[8px]'
}

const Avatar = ({ 
  src, 
  alt, 
  size = 'base', 
  variant = 'square',
  status = 'none',
  className,
  ...props 
}) => {
  // Validate props
  sizeSchema.parse(size)
  variantSchema.parse(variant)
  statusSchema.parse(status)

  return (
    <div className="relative inline-block">
      <Root
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden',
          sizeStyles[size],
          variant === 'rounded' ? 'rounded-full' : borderRadiusStyles[size],
          className
        )}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
        <Fallback 
          className="flex h-full w-full items-center justify-center bg-gray-100"
          delayMs={600}
        >
          <User className="h-1/2 w-1/2 text-gray-400" weight="light" />
        </Fallback>
      </Root>
      {status !== 'none' && (
        <span 
          className={cn(
            'absolute -right-0.5 -top-0.5 block rounded-full ring-2 ring-white',
            statusStyles[status],
            size === 'xs' ? 'h-1.5 w-1.5' : '',
            size === 'sm' ? 'h-2 w-2' : '',
            size === 'base' ? 'h-2.5 w-2.5' : '',
            size === 'lg' ? 'h-3 w-3' : '',
            size === 'xl' ? 'h-3.5 w-3.5' : '',
            size === '2xl' ? 'h-4 w-4' : '',
            size === '3xl' ? 'h-5 w-5' : '',
          )}
        />
      )}
    </div>
  )
}

export default Avatar 