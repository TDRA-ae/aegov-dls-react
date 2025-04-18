import React, { useState } from 'react';
import Textarea from './Textarea';
import { z } from 'zod';

export default {
  title: 'Components/Textarea',
  component: Textarea,
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
    rows: {
      control: 'number',
    },
  },
};

// Basic Textarea
export const Basic = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description',
    id: 'description',
    rows: 4,
  },
};

// Textarea with Helper Text
export const WithHelperText = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments',
    helperText: 'Please provide detailed feedback to help us improve.',
    id: 'comments',
    rows: 4,
  },
};

// Textarea with Error
export const WithError = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description',
    error: 'Description is required and must be at least 10 characters',
    id: 'description-error',
    rows: 4,
  },
};

// Textarea Sizes
export const Sizes = () => (
  <div className="flex flex-col space-y-4">
    <Textarea
      size="sm"
      label="Small Textarea"
      placeholder="Small size textarea"
      id="small"
      rows={4}
    />
    <Textarea
      size="base"
      label="Base Textarea"
      placeholder="Base size textarea"
      id="base"
      rows={4}
    />
    <Textarea
      size="lg"
      label="Large Textarea"
      placeholder="Large size textarea"
      id="large"
      rows={4}
    />
  </div>
);

// Textarea Variants
export const Variants = () => (
  <div className="flex flex-col space-y-4">
    <Textarea
      variant="primary"
      label="Primary Textarea"
      placeholder="Primary variant"
      id="primary"
      rows={4}
    />
    <Textarea
      variant="secondary"
      label="Secondary Textarea"
      placeholder="Secondary variant"
      id="secondary"
      rows={4}
    />
  </div>
);

// Required Textarea
export const Required = {
  args: {
    label: 'Feedback',
    placeholder: 'Please provide your feedback',
    required: true,
    id: 'required-feedback',
    rows: 4,
  },
};

// Disabled Textarea
export const Disabled = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'This textarea is disabled',
    disabled: true,
    id: 'disabled',
    rows: 4,
  },
};

// Different Row Heights
export const RowHeights = () => (
  <div className="flex flex-col space-y-4">
    <Textarea
      label="Short Textarea (2 rows)"
      placeholder="Short textarea"
      id="short"
      rows={2}
    />
    <Textarea
      label="Medium Textarea (4 rows)"
      placeholder="Medium textarea"
      id="medium"
      rows={4}
    />
    <Textarea
      label="Tall Textarea (8 rows)"
      placeholder="Tall textarea"
      id="tall"
      rows={8}
    />
  </div>
);

// With Validation
export const WithValidation = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Clear error when user starts typing
    if (error) setError('');
  };
  
  const handleBlur = () => {
    const validation = validateTextarea(value, { 
      required: true,
      minLength: 10 
    });
    
    if (!validation.valid) {
      setError(validation.error);
    } else {
      setError('');
    }
  };
  
  return (
    <div className="w-96">
      <Textarea
        label="Validated Textarea"
        placeholder="Enter at least 10 characters"
        id="validated"
        rows={4}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        required
      />
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          This textarea validates that:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-500 ml-2">
          <li>The field is required</li>
          <li>The content is at least 10 characters long</li>
        </ul>
      </div>
    </div>
  );
}; 

const validateTextarea = (value, options = {}) => {
  const { minLength, maxLength, required } = options;
  
  let schema = z.string();
  
  if (required) {
    schema = schema.min(1, 'This field is required');
  } else {
    schema = schema.optional();
  }
  
  if (minLength) {
    schema = schema.min(minLength, `Must be at least ${minLength} characters`);
  }
  
  if (maxLength) {
    schema = schema.max(maxLength, `Must be at most ${maxLength} characters`);
  }
  
  try {
    schema.parse(value);
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      error: error.errors[0]?.message || 'Invalid input' 
    };
  }
};