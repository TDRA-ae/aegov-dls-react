import React from 'react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'link', 'outline'],
    },
    style: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg'],
    },
    block: {
      control: 'boolean',
    },
    isIcon: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

// Template for all stories
const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button'
};

export const PrimaryVariants = () => (
  <div className="flex flex-col gap-4">
    <Button variant="solid" style="primary">Solid Button</Button>
    <Button variant="soft" style="primary">Soft Button</Button>
    <Button variant="link" style="primary">Link Button</Button>
    <Button variant="outline" style="primary">Outline Button</Button>
  </div>
);

export const SecondaryVariants = () => (
  <div className="flex flex-col gap-4">
    <Button variant="solid" style="secondary">Solid Button</Button>
    <Button variant="soft" style="secondary">Soft Button</Button>
    <Button variant="link" style="secondary">Link Button</Button>
    <Button variant="outline" style="secondary">Outline Button</Button>
  </div>
);

// Sizes
export const Sizes = () => (
  <div className="flex flex-col gap-4">
    <Button size="xs">Extra Small</Button>
    <Button size="sm">Small</Button>
    <Button size="base">Base</Button>
    <Button size="lg">Large</Button>
  </div>
);

// Block button
export const BlockButton = Template.bind({});
BlockButton.args = {
  children: 'Block Button',
  block: true,
};

// Disabled state
export const DisabledButton = Template.bind({});
DisabledButton.args = {
  children: 'Disabled Button',
  disabled: true,
};

// Icon button example
export const IconWithSizes = () => (
  <div className="flex flex-col gap-4">
    <Button isIcon size="xs">👋</Button>
    <Button isIcon size="sm">👋</Button>
    <Button isIcon size="base">👋</Button>
    <Button isIcon size="lg">👋</Button>
    <Button isIcon size="xs" style="secondary">👋</Button>
    <Button isIcon size="sm" style="secondary">👋</Button>
    <Button isIcon size="base" style="secondary">👋</Button>
    <Button isIcon size="lg" style="secondary">👋</Button>
  </div>
);

// Using asChild with anchor tag
export const AsLink = () => (
  <div className="flex flex-col gap-4">
    <Button asChild>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Link as Button
      </a>
    </Button>
    
    <Button asChild variant="soft" style="secondary">
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Secondary Soft Link
      </a>
    </Button>
    
    <Button asChild variant="outline">
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Outline Link
      </a>
    </Button>
  </div>
);
