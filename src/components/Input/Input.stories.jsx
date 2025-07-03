import React from 'react';
import Input from './Input';
import { EnvelopeSimple, User, Phone } from '@phosphor-icons/react';
import Dropdown from '../Dropdown/Dropdown';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

// Basic Input
export const Basic = {
  args: {
    label: 'First Name',
    placeholder: 'Enter your first name',
    id: 'firstName',
  },
};

// Input with Helper Text
export const WithHelperText = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email with anyone else.',
    id: 'email',
  },
};

// Input with Error
export const WithError = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'This username is already taken',
    id: 'username',
  },
};

// Password Input
export const Password = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    id: 'password',
  },
};

// Search Input
export const Search = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    id: 'search',
  },
};

// Input Sizes
export const Sizes = () => (
  <div className="flex flex-col space-y-4">
    <Input
      size="sm"
      label="Small Input"
      placeholder="Small size"
      id="small"
    />
    <Input
      size="base"
      label="Base Input"
      placeholder="Base size"
      id="base"
    />
    <Input
      size="lg"
      label="Large Input"
      placeholder="Large size"
      id="large"
    />
  </div>
);

// Input with Icons
export const WithIcons = () => (
  <div className="flex flex-col space-y-4">
    <Input
      label="Email"
      type="email"
      placeholder="Enter your email"
      prefix={<EnvelopeSimple className="h-5 w-5" />}
      id="email-prefix"
    />
    <Input
      label="Username"
      placeholder="Enter username"
      prefix={<User className="h-5 w-5" />}
      id="username-prefix"
    />
    <Input
      label="Phone"
      type="text"
      placeholder="Enter phone number"
      prefix={<Phone className="h-5 w-5" />}
      id="phone-prefix"
    />
  </div>
);

// Input Variants
export const Variants = () => (
  <div className="flex flex-col space-y-4">
    <Input
      variant="primary"
      label="Primary Input"
      placeholder="Primary variant"
      id="primary"
    />
    <Input
      variant="secondary"
      label="Secondary Input"
      placeholder="Secondary variant"
      id="secondary"
    />
  </div>
);

// Required Input
export const Required = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    id: 'required-email',
  },
};

// Disabled Input
export const Disabled = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    id: 'disabled',
  },
};

// Input with Dropdown Prefix
export const WithDropdownPrefix = () => {
  const [countryCode, setCountryCode] = React.useState('+971');
  const countryOptions = [
    { label: '+971', value: '+971' },
    { label: '+91', value: '+91' },
    { label: '+44', value: '+44' },
  ];

  return (
    <Input
      label="Mobile number"
      placeholder="xx xxxxxxxx"
      type="tel"
      id="mobile-dropdown"
      prefix={
        <Dropdown
          groups={[{ items: countryOptions }]}
          onSelect={setCountryCode}
        >
          <div className="flex items-center gap-2 cursor-pointer select-none min-w-[60px]">
            <span className="text-brown-700 font-medium">{countryCode}</span>
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="#A47A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </Dropdown>
      }
    />
  );
}; 