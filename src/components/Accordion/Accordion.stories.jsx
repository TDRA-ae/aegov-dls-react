import React from 'react';
import Accordion from './Accordion';
import { CaretDown, CaretRight, Plus } from '@phosphor-icons/react';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    multiple: {
      control: 'boolean',
      defaultValue: false,
    },
    collapsible: {
      control: 'boolean',
    },
  },
};

const defaultItems = [
  {
    value: '1',
    title: 'What is the meaning of a design system?',
    children: (
      <div className="space-y-4">
        <p>A Design System is a comprehensive set of standards, documentation, principles, and components that guide the creation of a digital product's user interface (UI).</p>
        <p>It acts as a single source of truth for designers, developers, and other stakeholders, ensuring consistency across different parts of a product and even across different products within the same brand. The goal is to accelerate the design and development process, improve user experience, and maintain a coherent visual and functional language.</p>
      </div>
    ),
  },
  {
    value: '2',
    title: 'What are components?',
    children: (
      <p>Components are a crucial part of any design system. They are reusable parts of a UI, like buttons, form fields, or navigation menus, and they're defined both in terms of their appearance and their behavior.</p>
    ),
  },
  {
    value: '3',
    title: 'What else is part of a design system?',
    children: (
      <div className="space-y-4">
        <p>A well-structured design system will also include usage guidelines for each component, detailing when and how it should be used. Besides components, a design system often includes standards for layout, typography, color, iconography, and more.</p>
        <p>Furthermore, it addresses non-visual factors like accessibility, performance, and localization.</p>
      </div>
    ),
  },
];

// Default single accordion
export const Default = () => (
  <Accordion items={defaultItems} defaultValue="1" />
);

// Multiple selection allowed
export const Multiple = () => (
  <Accordion
    multiple={true}
    defaultValue={['1', '2']}
    items={defaultItems}
  />
);

// Custom icon
export const CustomIcon = () => (
  <Accordion
    items={defaultItems.map(item => ({
      ...item,
      icon: Plus,
      iconRotateDeg: 45,
    }))}
    defaultValue="1"
  />
);

// Nested accordions
export const Nested = () => {
  const nestedItems = [
    {
      value: 'parent-1',
      title: 'Parent Accordion 1',
      children: (
        <div className="space-y-4">
          <p>This is the main content of parent accordion 1.</p>
          <Accordion
            items={[
              {
                value: 'child-1',
                title: 'Child Accordion 1',
                icon: Plus,
                iconRotateDeg: 45,
                children: <p>Content of child accordion 1</p>,
              },
              {
                value: 'child-2',
                title: 'Child Accordion 2',
                icon: Plus,
                iconRotateDeg: 45,
                children: <p>Content of child accordion 2</p>,
              },
            ]}
            className="border-b-0"
          />
        </div>
      ),
    },
    {
      value: 'parent-2',
      title: 'Parent Accordion 2',
      children: <p>Content of parent accordion 2</p>,
    },
  ];

  return <Accordion items={nestedItems} defaultValue="parent-1" />;
};
