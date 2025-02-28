import React, { useState, useEffect } from 'react';
import RangeSlider from './RangeSlider';

export default {
  title: 'Components/RangeSlider',
  component: RangeSlider,
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
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

// Controlled component with value and onValueChange
const ControlledTemplate = (args) => {
  const [value, setValue] = useState(args.defaultValue || 50);
  return (
    <RangeSlider
      {...args}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const Default = ControlledTemplate.bind({});
Default.args = {
  label: 'Volume',
  defaultValue: 50,
  helperText: 'Adjust the volume level',
};

export const WithError = function () {
  const [value, setValue] = useState(75);
  const [error, setError] = useState('');

  useEffect(() => {
    if (value > 70) {
      setError('Please select a value below 70');
    } else {
      setError('');
    }
  }, [value]);


  return (
    <RangeSlider
      label="Price Range"
      defaultValue={75}
      error={error}
      value={value}
      onValueChange={setValue}
      className="w-[500px] custom-slider"
    />
  );
};
export const Required = ControlledTemplate.bind({});
Required.args = {
  label: 'Required Field',
  defaultValue: 30,
  required: true,
};

export const Disabled = ControlledTemplate.bind({});
Disabled.args = {
  label: 'Disabled Slider',
  defaultValue: 40,
  disabled: true,
  helperText: 'This slider is disabled',
};

export const Secondary = ControlledTemplate.bind({});
Secondary.args = {
  label: 'Secondary Variant',
  defaultValue: 60,
  variant: 'secondary',
};

export const Small = ControlledTemplate.bind({});
Small.args = {
  label: 'Small Size',
  defaultValue: 25,
  size: 'sm',
};

export const Large = ControlledTemplate.bind({});
Large.args = {
  label: 'Large Size',
  defaultValue: 80,
  size: 'lg',
};

export const CustomRange = ControlledTemplate.bind({});
CustomRange.args = {
  label: 'Temperature',
  defaultValue: 20,
  min: -20,
  max: 40,
  step: 5,
  helperText: 'Select temperature in Celsius',
}; 