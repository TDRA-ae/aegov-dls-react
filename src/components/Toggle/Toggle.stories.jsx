import React, { useState } from 'react';
import Toggle from './Toggle';
import { Check, X } from '@phosphor-icons/react';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'mode', 'secondary'],
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

const ControlledToggle = (args) => {
  const [checked, setChecked] = useState(args.checked || false);
  return <Toggle {...args} checked={checked} onCheckedChange={setChecked} />;
};

// Basic toggle
export const Default = {
  render: ControlledToggle,
  args: {
    checked: false,
  },
};

// Toggle with label
export const WithLabel = {
  render: ControlledToggle,
  args: {
    label: 'I agree with the terms and conditions',
    checked: false,
  },
};

// Toggle with changing icon inside (mode variant)
export const WithMode = {
  render: ControlledToggle,
  args: {
    variant: 'mode',
    checked: false,
  },
};

// Toggle with success color
export const Success = {
  render: ControlledToggle,
  args: {
    variant: 'success',
    checked: true,
  },
};

// Toggle with secondary color
export const Secondary = {
  render: ControlledToggle,
  args: {
    variant: 'secondary',
    checked: true,
  },
};

// Disabled state
export const Disabled = {
  render: ControlledToggle,
  args: {
    disabled: true,
    checked: false,
  },
};

// All Variants
export const AllVariants = () => {
  const [states, setStates] = useState({
    default: false,
    success: false,
    secondary: false,
    mode: false,
  });

  const handleChange = (variant) => (checked) => {
    setStates(prev => ({ ...prev, [variant]: checked }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Toggle 
          variant="default" 
          checked={states.default}
          onCheckedChange={handleChange('default')}
        />
        <span className="text-sm text-gray-600">Default</span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle 
          variant="success" 
          checked={states.success}
          onCheckedChange={handleChange('success')}
        />
        <span className="text-sm text-gray-600">Success</span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle 
          variant="secondary" 
          checked={states.secondary}
          onCheckedChange={handleChange('secondary')}
        />
        <span className="text-sm text-gray-600">Secondary</span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle 
          variant="mode" 
          checked={states.mode}
          onCheckedChange={handleChange('mode')}
        />
        <span className="text-sm text-gray-600">Mode</span>
      </div>
    </div>
  );
};

// Custom icon toggle
export const WithCustomIcons = {
  render: (args) => {
    const [checked, setChecked] = React.useState(args.checked || false);
    return (
      <Toggle
        {...args}
        checked={checked}
        onCheckedChange={setChecked}
        checkedIcon={<Check className="mt-[1px] ml-[1px] h-4 w-4 text-gray-500" />}
        uncheckedIcon={<X className="mt-[1px] ml-[1px] h-4 w-4 text-gray-500" />}
        label="I agree with the terms and conditions"
      />
    );
  },
  args: {
    checked: false,
  },
}; 