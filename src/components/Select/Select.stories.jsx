import React, { useState } from 'react';
import { Select } from './index';

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'padded',
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
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

const countryOptions = [
  { value: 'uae', label: 'United Arab Emirates' },
  { value: 'india', label: 'India' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'usa', label: 'USA' },
];

// Basic Select
export const Basic = {
  args: {
    label: 'Select an option',
    placeholder: 'Choose a country',
    id: 'country',
    options: countryOptions,
  },
};

// Select with Helper Text
export const WithHelperText = {
  args: {
    label: 'Country',
    placeholder: 'Choose a country',
    helperText: 'Select your country of residence',
    id: 'country-helper',
    options: countryOptions,
  },
};

// Select with Error
export const WithError = {
  args: {
    label: 'Country',
    placeholder: 'Choose a country',
    error: 'Please select a country',
    id: 'country-error',
    options: countryOptions,
  },
};

// Select Sizes
export const Sizes = () => (
  <div className="flex flex-col space-y-4">
    <Select
      size="sm"
      label="Small Select"
      placeholder="Small size"
      id="small"
      options={countryOptions}
    />
    <Select
      size="base"
      label="Base Select"
      placeholder="Base size"
      id="base"
      options={countryOptions}
    />
    <Select
      size="lg"
      label="Large Select"
      placeholder="Large size"
      id="large"
      options={countryOptions}
    />
  </div>
);

// Select Variants
export const Variants = () => (
  <div className="flex flex-col space-y-4">
    <Select
      variant="primary"
      label="Primary Select"
      placeholder="Primary variant"
      id="primary"
      options={countryOptions}
    />
    <Select
      variant="secondary"
      label="Secondary Select"
      placeholder="Secondary variant"
      id="secondary"
      options={countryOptions}
    />
  </div>
);

// Required Select
export const Required = {
  args: {
    label: 'Country',
    placeholder: 'Choose a country',
    required: true,
    id: 'required-country',
    options: countryOptions,
  },
};

// Disabled Select
export const Disabled = {
  args: {
    label: 'Disabled Select',
    placeholder: 'This select is disabled',
    disabled: true,
    id: 'disabled',
    options: countryOptions,
  },
};

// Controlled Select
export const Controlled = () => {
  const [value, setValue] = useState('');
  
  return (
    <div className="flex flex-col space-y-4">
      <Select
        label="Controlled Select"
        placeholder="Choose a country"
        id="controlled"
        options={countryOptions}
        value={value}
        onChange={setValue}
      />
      <div className="text-sm">
        Selected value: <span className="font-bold">{value || 'none'}</span>
      </div>
    </div>
  );
};

// Long List Select
export const LongList = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    id: 'long-list',
    options: [
      { value: 'af', label: 'Afghanistan' },
      { value: 'al', label: 'Albania' },
      { value: 'dz', label: 'Algeria' },
      { value: 'ar', label: 'Argentina' },
      { value: 'au', label: 'Australia' },
      { value: 'at', label: 'Austria' },
      { value: 'bd', label: 'Bangladesh' },
      { value: 'be', label: 'Belgium' },
      { value: 'br', label: 'Brazil' },
      { value: 'bg', label: 'Bulgaria' },
      { value: 'kh', label: 'Cambodia' },
      { value: 'ca', label: 'Canada' },
      { value: 'cl', label: 'Chile' },
      { value: 'cn', label: 'China' },
      { value: 'co', label: 'Colombia' },
      { value: 'hr', label: 'Croatia' },
      { value: 'dk', label: 'Denmark' },
      { value: 'eg', label: 'Egypt' },
      { value: 'fi', label: 'Finland' },
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Germany' },
      { value: 'gr', label: 'Greece' },
      { value: 'in', label: 'India' },
      { value: 'id', label: 'Indonesia' },
      { value: 'ir', label: 'Iran' },
      { value: 'iq', label: 'Iraq' },
      { value: 'ie', label: 'Ireland' },
      { value: 'it', label: 'Italy' },
      { value: 'jp', label: 'Japan' },
    ],
  },
}; 