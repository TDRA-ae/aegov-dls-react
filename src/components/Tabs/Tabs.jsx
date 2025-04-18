import React from 'react'
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs'
import { cva } from 'class-variance-authority'
import { z } from 'zod'

const tabsSchema = z.object({
  variant: z.enum(['default', 'pills', 'compact']).default('default'),
  items: z.array(z.object({
    value: z.string(),
    label: z.string(),
    content: z.any(),
    icon: z.any().optional()
  })),
  defaultValue: z.string().optional()
})

const tabsVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: 'border-b-2 border-gray-200',
        pills: '',
        compact: 'border-b-2 border-gray-200'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const tabListVariants = cva(
  'flex gap-4 md:gap-6 lg:gap-7 xl:gap-8 -mb-px',
  {
    variants: {
      variant: {
        default: '',
        pills: '',
        compact: ''
      }
    }
  }
)

const tabTriggerVariants = cva(
  'items-center gap-3 font-medium rounded-t-lg border-b-[3px] border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-0',
  {
    variants: {
      variant: {
        default: 'py-6 px-1 text-base hover:text-gray-950 hover:border-primary-500 data-[state=active]:text-primary-600 data-[state=active]:border-primary-500',
        pills: 'py-3 px-4 lg:px-6 text-base rounded-lg hover:bg-aeblack-50 data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900',
        compact: 'py-4 px-1 text-sm hover:text-gray-950 hover:border-primary-500 data-[state=active]:text-primary-600 data-[state=active]:border-primary-500'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const tabContentVariants = cva(
  'p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-0',
  {
    variants: {
      variant: {
        default: 'border-t border-aeblack-100 border-t-2',
        pills: '',
        compact: 'border-t border-aeblack-100 border-t-2'
      }
    }
  }
)

const Tabs = ({ variant = 'default', items, defaultValue, className, ...props }) => {
  // Validate props
  try {
    tabsSchema.parse({ variant, items, defaultValue })
  } catch (error) {
    console.error('Tabs validation error:', error)
    return null
  }

  return (
    <Root
      defaultValue={defaultValue || items[0].value}
      className={tabsVariants({ variant, className })}
      {...props}
    >
      <List className={tabListVariants({ variant })}>
        {items.map(({ value, label, icon: Icon }) => (
          <Trigger
            key={value}
            value={value}
            className={tabTriggerVariants({ variant })}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-5 h-5" />}
              <span className="whitespace-nowrap">{label}</span>
            </div>
          </Trigger>
        ))}
      </List>
      {items.map(({ value, content }) => (
        <Content
          key={value}
          value={value}
          className={tabContentVariants({ variant })}
        >
          {content}
        </Content>
      ))}
    </Root>
  )
}

export default Tabs 