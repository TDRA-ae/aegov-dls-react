import React, { useState } from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

const ControlledCheckbox = (args) => {
  const [checked, setChecked] = useState(args.checked || false);
  return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
};

// Basic checkbox
export const Default = {
  render: ControlledCheckbox,
  args: {
    label: 'Accept terms and conditions',
  },
};

// Checkbox with description
export const WithDescription = {
  render: ControlledCheckbox,
  args: {
    label: 'Notifications',
    description: 'Get notified when there is a critical issue.',
  },
};

// Size variations
export const Sizes = () => (
  <div className="flex flex-col gap-4">
    <Checkbox
      size="sm"
      label="Small checkbox"
      description="This is a small checkbox"
    />
    <Checkbox
      size="base"
      label="Base checkbox"
      description="This is a base checkbox"
    />
    <Checkbox
      size="lg"
      label="Large checkbox"
      description="This is a large checkbox"
    />
  </div>
);

// Color variants
export const Variants = () => (
  <div className="flex flex-col gap-4">
    <Checkbox
      variant="primary"
      label="Primary checkbox"
      description="This uses the primary color scheme"
    />
    <Checkbox
      variant="secondary"
      label="Secondary checkbox"
      description="This uses the secondary color scheme"
    />
  </div>
);

// Disabled state
export const Disabled = {
  render: ControlledCheckbox,
  args: {
    label: 'Disabled checkbox',
    description: 'This checkbox cannot be interacted with',
    disabled: true,
  },
};

// Required state
export const Required = {
  render: ControlledCheckbox,
  args: {
    label: 'Required checkbox',
    description: 'This checkbox must be checked',
    required: true,
  },
};

// All states
export const AllStates = () => {
  const [states, setStates] = useState({
    default: false,
    withDescription: false,
    disabled: false,
    required: false,
  });

  const handleChange = (key) => (checked) => {
    setStates(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="flex flex-col gap-6">
      <Checkbox
        label="Default checkbox"
        checked={states.default}
        onCheckedChange={handleChange('default')}
      />
      <Checkbox
        label="With description"
        description="Additional information about this checkbox"
        checked={states.withDescription}
        onCheckedChange={handleChange('withDescription')}
      />
      <Checkbox
        label="Disabled checkbox"
        description="This checkbox cannot be interacted with"
        checked={states.disabled}
        onCheckedChange={handleChange('disabled')}
        disabled
      />
      <Checkbox
        label="Required checkbox"
        description="This checkbox must be checked"
        checked={states.required}
        onCheckedChange={handleChange('required')}
        required
      />
    </div>
  );
};

// Checkbox as a list (like a filter block)
export const AsList = () => {
  const people = [
    'Abdullah Al Mehri',
    'Maryam Al Kamali',
    'Shehzad Obaid',
    'Ramakrishnan Iyer',
  ];
  const [checked, setChecked] = useState(Array(people.length).fill(false));

  const handleChange = idx => value => {
    setChecked(prev => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-xl">
      <ul className="divide-y divide-gray-200 w-[400px]">
        {people.map((name, idx) => (
          <li key={name} className="flex items-center justify-between py-4">
            <label className="font-semibold text-gray-800 flex justify-between w-full">
              {name}
              <Checkbox
                checked={checked[idx]}
                onCheckedChange={handleChange(idx)}
                aria-label={`Select ${name}`}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}; 