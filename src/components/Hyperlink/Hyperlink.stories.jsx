import React from 'react'
import { Hyperlink } from './Hyperlink'
import { Button } from '../Button/Button'

export default {
  title: 'Components/Hyperlink',
  component: Hyperlink,
  args: {
    children: 'Hyperlink',
    href: 'https://example.com',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'cta', 'soft', 'secondary', 'secondary-soft'],
    },
  },
}

export const Default = {
  args: {
    children: 'Default Hyperlink',
  },
}

export const CTA = {
  args: {
    children: 'Call to Action Link',
    variant: 'cta',
    icon: true,
  },
}

export const Soft = {
  args: {
    children: 'Soft Interaction Link',
    variant: 'soft',
  },
}

export const Secondary = {
  args: {
    children: 'Secondary Link',
    variant: 'secondary',
  },
}

export const SecondaryWithIcon = {
  args: {
    children: 'Secondary Link with Icon',
    variant: 'secondary',
    icon: true,
  },
}

export const ExternalLink = {
  args: {
    children: 'External Link',
    external: true,
    href: 'https://example.com',
  },
}

const CustomButtonComponent = React.forwardRef((props, ref) => (
  <button ref={ref} type="button" {...props} />
))
CustomButtonComponent.displayName = 'CustomButtonComponent'

export const CustomComponent = {
  args: {
    asChild: true,
    children: <CustomButtonComponent>Custom Button Component</CustomButtonComponent>,
  },
} 