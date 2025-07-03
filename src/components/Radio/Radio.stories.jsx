import React, { useState } from 'react';
import { Radio, RadioItem } from './Radio';

export default {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultValue: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
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
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

// Basic radio group
export const Default = () => (
  <Radio defaultValue="option1">
    <RadioItem value="option1">Option 1</RadioItem>
    <RadioItem value="option2">Option 2</RadioItem>
    <RadioItem value="option3">Option 3</RadioItem>
  </Radio>
);

// Radio with additional descriptions
export const WithDescription = () => (
  <Radio defaultValue="starter">
    <RadioItem 
      value="starter" 
      description="The basic usage plan, starting at $9.99 per month"
    >
      Starter plan
    </RadioItem>
    <RadioItem 
      value="professional" 
      description="For teams and organization, starting at $29.99 per month"
    >
      Professional plan
    </RadioItem>
    <RadioItem 
      value="enterprise" 
      description="For large organisation with SAML support, starting at $99.99 per month"
    >
      Enterprise plan
    </RadioItem>
  </Radio>
);

// Size variations
export const Sizes = () => (
  <div className="space-y-8">
    <div>
      <h3 className="mb-4 text-lg font-semibold">Small</h3>
      <Radio size="sm" defaultValue="small1">
        <RadioItem value="small1">Small radio button</RadioItem>
        <RadioItem value="small2" description="With description">Small radio button</RadioItem>
      </Radio>
    </div>
    <div>
      <h3 className="mb-4 text-lg font-semibold">Base (Default)</h3>
      <Radio size="base" defaultValue="base1">
        <RadioItem value="base1">Base radio button</RadioItem>
        <RadioItem value="base2" description="With description">Base radio button</RadioItem>
      </Radio>
    </div>
    <div>
      <h3 className="mb-4 text-lg font-semibold">Large</h3>
      <Radio size="lg" defaultValue="large1">
        <RadioItem value="large1">Large radio button</RadioItem>
        <RadioItem value="large2" description="With description">Large radio button</RadioItem>
      </Radio>
    </div>
  </div>
);

// Color variants
export const Variants = () => (
  <div className="space-y-8">
    <div>
      <h3 className="mb-4 text-lg font-semibold">Primary</h3>
      <Radio variant="primary" defaultValue="primary1">
        <RadioItem value="primary1">Primary radio</RadioItem>
        <RadioItem value="primary2" description="With description">Primary radio</RadioItem>
      </Radio>
    </div>
    <div>
      <h3 className="mb-4 text-lg font-semibold">Secondary</h3>
      <Radio variant="secondary" defaultValue="secondary1">
        <RadioItem value="secondary1">Secondary radio</RadioItem>
        <RadioItem value="secondary2" description="With description">Secondary radio</RadioItem>
      </Radio>
    </div>
  </div>
);

// Orientation (Horizontal vs Vertical)
export const Orientation = () => (
  <div className="space-y-8">
    <div>
      <h3 className="mb-4 text-lg font-semibold">Vertical (Default)</h3>
      <Radio orientation="vertical" defaultValue="vertical1">
        <RadioItem value="vertical1">Option 1</RadioItem>
        <RadioItem value="vertical2">Option 2</RadioItem>
        <RadioItem value="vertical3">Option 3</RadioItem>
      </Radio>
    </div>
    <div>
      <h3 className="mb-4 text-lg font-semibold">Horizontal</h3>
      <Radio orientation="horizontal" defaultValue="horizontal1">
        <RadioItem value="horizontal1">Option 1</RadioItem>
        <RadioItem value="horizontal2">Option 2</RadioItem>
        <RadioItem value="horizontal3">Option 3</RadioItem>
      </Radio>
    </div>
  </div>
);

// Disabled state
export const Disabled = () => (
  <Radio disabled defaultValue="disabled1">
    <RadioItem value="disabled1">Disabled radio button</RadioItem>
    <RadioItem value="disabled2" description="With description">Disabled radio button</RadioItem>
  </Radio>
);

// Mixed enabled and disabled items
export const MixedDisabled = () => (
  <Radio defaultValue="mixed1">
    <RadioItem value="mixed1">Enabled radio button</RadioItem>
    <RadioItem value="mixed2" disabled>Disabled radio button</RadioItem>
    <RadioItem value="mixed3" description="With description">Enabled radio button</RadioItem>
  </Radio>
);

// Controlled component example
export const Controlled = () => {
  const [value, setValue] = useState('controlled1');
  
  return (
    <div className="space-y-4">
      <Radio value={value} onValueChange={setValue}>
        <RadioItem value="controlled1">Option 1</RadioItem>
        <RadioItem value="controlled2">Option 2</RadioItem>
        <RadioItem value="controlled3">Option 3</RadioItem>
      </Radio>
      <div className="mt-4 p-4 bg-slate-100 rounded">
        <p>Selected value: <strong>{value}</strong></p>
      </div>
    </div>
  );
};

// Required state
export const Required = () => (
  <Radio required defaultValue="required1">
    <RadioItem value="required1">Required radio button</RadioItem>
    <RadioItem value="required2">Required radio button</RadioItem>
  </Radio>
);

// All variations in one place
export const AllVariations = () => (
  <div className="space-y-12">
    <div>
      <h3 className="mb-4 text-xl font-bold">Basic Radio Group</h3>
      <Radio defaultValue="option1">
        <RadioItem value="option1">Option 1</RadioItem>
        <RadioItem value="option2">Option 2</RadioItem>
      </Radio>
    </div>
    
    <div>
      <h3 className="mb-4 text-xl font-bold">With Descriptions</h3>
      <Radio defaultValue="starter">
        <RadioItem 
          value="starter" 
          description="The basic usage plan, starting at $9.99 per month"
        >
          Starter plan
        </RadioItem>
        <RadioItem 
          value="professional" 
          description="For teams and organization, starting at $29.99 per month"
        >
          Professional plan
        </RadioItem>
        <RadioItem 
          value="enterprise" 
          description="For large organisation with SAML support, starting at $99.99 per month"
        >
          Enterprise plan
        </RadioItem>
      </Radio>
    </div>
    
    <div>
      <h3 className="mb-4 text-xl font-bold">Size Variations</h3>
      <div className="space-y-6">
        <Radio size="sm" defaultValue="small">
          <RadioItem value="small">Small radio</RadioItem>
        </Radio>
        <Radio size="base" defaultValue="base">
          <RadioItem value="base">Base radio (default)</RadioItem>
        </Radio>
        <Radio size="lg" defaultValue="large">
          <RadioItem value="large">Large radio</RadioItem>
        </Radio>
      </div>
    </div>
    
    <div>
      <h3 className="mb-4 text-xl font-bold">Color Variants</h3>
      <div className="space-y-6">
        <Radio variant="primary" defaultValue="primary">
          <RadioItem value="primary">Primary color (default)</RadioItem>
        </Radio>
        <Radio variant="secondary" defaultValue="secondary">
          <RadioItem value="secondary">Secondary color</RadioItem>
        </Radio>
      </div>
    </div>
    
    <div>
      <h3 className="mb-4 text-xl font-bold">Orientation</h3>
      <div className="space-y-6">
        <div>
          <h4 className="mb-2 font-medium">Vertical (default)</h4>
          <Radio orientation="vertical" defaultValue="v1">
            <RadioItem value="v1">Option 1</RadioItem>
            <RadioItem value="v2">Option 2</RadioItem>
          </Radio>
        </div>
        <div>
          <h4 className="mb-2 font-medium">Horizontal</h4>
          <Radio orientation="horizontal" defaultValue="h1">
            <RadioItem value="h1">Option 1</RadioItem>
            <RadioItem value="h2">Option 2</RadioItem>
          </Radio>
        </div>
      </div>
    </div>
    
    <div>
      <h3 className="mb-4 text-xl font-bold">States</h3>
      <div className="space-y-6">
        <div>
          <h4 className="mb-2 font-medium">Disabled Group</h4>
          <Radio disabled defaultValue="disabled1">
            <RadioItem value="disabled1">Disabled option</RadioItem>
            <RadioItem value="disabled2">Disabled option</RadioItem>
          </Radio>
        </div>
        <div>
          <h4 className="mb-2 font-medium">Mixed Disabled Items</h4>
          <Radio defaultValue="enabled">
            <RadioItem value="enabled">Enabled option</RadioItem>
            <RadioItem value="individual-disabled" disabled>Individually disabled option</RadioItem>
          </Radio>
        </div>
        <div>
          <h4 className="mb-2 font-medium">Required</h4>
          <Radio required defaultValue="required1">
            <RadioItem value="required1">Required option</RadioItem>
            <RadioItem value="required2">Required option</RadioItem>
          </Radio>
        </div>
      </div>
    </div>
  </div>
); 


// Controlled component example
export const AsList = () => {
  const [selectedPerson, setSelectedPerson] = useState('');
  
  return (
    <div className="space-y-4">
      <Radio value={selectedPerson} onValueChange={setSelectedPerson}>
        <RadioItem value="controlled1" className="border-b border-gray-200 pb-5 px-2">Abdullah Al Mehri</RadioItem>
        <RadioItem value="controlled2" className="border-b border-gray-200 pb-5 px-2">Maryam Al Kamali</RadioItem>
        <RadioItem value="controlled3" className="border-b border-gray-200 pb-5 px-2">Shehzad Obaid</RadioItem>  
        <RadioItem value="controlled4" className="border-b border-gray-200 pb-5 px-2">Ramakrishnan Iyer</RadioItem>  
      </Radio>
    </div>
  );
};