import * as React from "react";
import { Toast } from './Toast';
import * as RadixToast from '@radix-ui/react-toast';

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    duration: { 
      control: 'number',
      description: 'Duration in milliseconds before the toast disappears'
    },
    children: {
      control: 'text',
      description: 'The content of the toast'
    }
  }
};

const Template = (args) => {
  const [showToast, setShowToast] = React.useState(false);

  const handleShowToast = () => {
    setShowToast(false);
    setTimeout(() => {
      setShowToast(true);
    }, 100);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleShowToast}
        className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
      >
        Show Toast
      </button>
      <Toast {...args} showToast={showToast} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: (
    <RadixToast.Title className="text-gray-900 font-semibold text-sm">
      Simple toast message
    </RadixToast.Title>
  ),
  duration: 5000
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  children: (
    <>
      <RadixToast.Title className="text-gray-900 font-semibold text-sm mb-1">
        File Deleted
      </RadixToast.Title>
      <RadixToast.Description className="text-gray-600 text-sm">
        The file has been moved to trash.
      </RadixToast.Description>
    </>
  ),
  duration: 5000
};

export const WithAction = Template.bind({});
WithAction.args = {
  children: (
    <>
      <RadixToast.Title className="text-gray-900 font-semibold text-sm mb-1">
        Changes saved
      </RadixToast.Title>
      <RadixToast.Description className="text-gray-600 text-sm mb-3">
        Your changes have been saved successfully.
      </RadixToast.Description>
      <RadixToast.Action
        altText="Undo"
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        onClick={() => console.log('Undo clicked')}
      >
        Undo
      </RadixToast.Action>
    </>
  ),
  duration: 5000
};

export const Error = Template.bind({});
Error.args = {
  children: (
    <>
      <RadixToast.Title className="text-gray-900 font-semibold text-sm mb-1">
        Error
      </RadixToast.Title>
      <RadixToast.Description className="text-gray-600 text-sm mb-3">
        Something went wrong. Please try again.
      </RadixToast.Description>
      <RadixToast.Action
        altText="Retry"
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        onClick={() => console.log('Retry clicked')}
      >
        Retry
      </RadixToast.Action>
    </>
  ),
  duration: 6000
}; 