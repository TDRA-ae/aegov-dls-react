import React from 'react'
import { Check } from '@phosphor-icons/react'
import { z } from 'zod'
import { cn } from '../../utils'

const stepsSchema = z.object({
  steps: z.array(z.object({
    label: z.string(),
    href: z.string().optional()
  })),
  currentStep: z.number(),
  size: z.enum(['sm', 'base', 'lg']).optional(),
  orientation: z.enum(['horizontal', 'vertical']).optional(),
  showLabels: z.boolean().optional(),
  disabled: z.boolean().optional(),
})

const Step = ({ step, index, currentStep, size, isVertical, showLabels, totalSteps, disabled }) => {
  const isCompleted = index < currentStep
  const isCurrent = index === currentStep
  const isUpcoming = index > currentStep

  const sizeClasses = {
    link: {
      sm: 'h-8 w-8 text-sm',
      base: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg'
    },
    line: {
      hr: {
        sm: 'left-0 rtl:-left-2 top-5 h-[3px] w-20 top-4',
        base: 'left-2 rtl:-left-2 top-5 h-[3px] w-20 top-5',
        lg: 'left-4 rtl:-left-2 top-5 h-[3px] w-20 top-6',
      },
    },
  }

  // Only upcoming steps are lighter and non-interactive if disabled
  const isStepDisabled = disabled && isUpcoming
  const stepOpacity = isStepDisabled ? 'opacity-20 pointer-events-none' : ''

  return (
    <li
      key={step.label}
      className={cn(
        'relative flex items-center',
        !isVertical && index !== totalSteps - 1 && ''
      )}
    >
      {/* Connector line */}
      {index !== totalSteps - 1 && (
        <div
          className={cn(
            'absolute bg-gray-300 transition-colors duration-200',
            isCompleted && 'bg-primary-500',
            isStepDisabled && 'opacity-20',
            isVertical 
              ? 'left-[calc(50%-1px)] top-12 h-12 w-[3px]' 
              : cn(sizeClasses.line.hr[size], 'translate-x-1/2 rtl:-translate-x-full')
          )}
          aria-hidden="true"
        />
      )}

      {/* Step button/indicator */}
      <div className={cn(
        'relative z-10',
        !isVertical && 'flex flex-1 justify-center'
      )}>
        <a
          href={step.href}
          className={cn(
            'flex items-center justify-center rounded-full transition-all duration-200',
            sizeClasses.link[size],
            isCompleted && 'bg-primary-500 text-white hover:ring-4 hover:ring-primary-100',
            isCurrent && 'bg-primary-500 text-white ring-4 ring-primary-100',
            isUpcoming && 'bg-white border-2 border-gray-200 text-gray-500 hover:border-primary-500 hover:text-primary-500',
            stepOpacity
          )}
          aria-current={isCurrent ? 'step' : undefined}
          aria-disabled={isStepDisabled ? 'true' : undefined}
          tabIndex={isStepDisabled ? -1 : undefined}
        >
          {isCompleted ? (
            <Check weight="bold" className="w-5 h-5" />
          ) : (
            <span>{index + 1}</span>
          )}
          <span className="sr-only">{step.label}</span>
        </a>

        {/* Label */}
        {showLabels && (
          <span
            className={cn(
              'absolute text-sm font-medium text-gray-900',
              isVertical
                ? 'left-14 rtl:left-0 rtl:right-14 top-2.5'
                : 'left-1/2 -translate-x-1/2 mt-14',
              isStepDisabled && 'opacity-20'
            )}
          >
            {step.label}
          </span>
        )}
      </div>
    </li>
  )
}

const Steps = ({
  steps,
  currentStep,
  size = 'base',
  orientation = 'horizontal',
  showLabels = false,
  className,
  disabled = false
}) => {
  // Validate props
  stepsSchema.parse({ steps, currentStep, size, orientation, showLabels, disabled })

  const isVertical = orientation === 'vertical'

  return (
    <nav
      aria-label="Progress"
      className={cn(
        'relative',
        isVertical ? 'flex flex-col' : 'w-full',
        className
      )}
    >
      <ol
        role="list"
        className={cn(
          'flex',
          isVertical ? 'flex-col gap-16' : 'items-center justify-center gap-24'
        )}
      >
        {steps.map((step, index) => (
          <Step
            key={step.label}
            step={step}
            index={index}
            currentStep={currentStep}
            size={size}
            isVertical={isVertical}
            showLabels={showLabels}
            totalSteps={steps.length}
            disabled={disabled}
          />
        ))}
      </ol>
    </nav>
  )
}

export default Steps 