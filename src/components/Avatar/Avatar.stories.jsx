import React from 'react'
import Avatar from './Avatar'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    alt: 'Colm Tuite',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl']
    },
    variant: {
      control: 'radio',
      options: ['square', 'rounded']
    },
    status: {
      control: 'radio',
      options: ['none', 'online', 'offline']
    }
  }
}

export const Default = {
  args: {
    size: 'base',
    variant: 'square',
    status: 'none'
  }
}

export const Rounded = {
  args: {
    variant: 'rounded'
  }
}

export const WithStatus = {
  args: {
    variant: 'rounded',
    status: 'online'
  }
}

export const Sizes = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="base" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
      <Avatar {...args} size="2xl" />
      <Avatar {...args} size="3xl" />
    </div>
  )
}

export const Fallback = {
  args: {
    src: undefined
  }
} 