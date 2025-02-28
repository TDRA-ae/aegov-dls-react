import * as React from "react";
import { Toast } from './Toast';

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { 
      control: 'text',
      description: 'The title of the toast message'
    },
    description: { 
      control: 'text',
      description: 'Optional description text for the toast'
    },
    duration: { 
      control: 'number',
      description: 'Duration in milliseconds before the toast disappears'
    },
    action: {
      control: 'object',
      description: 'Optional action button configuration'
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
  title: 'Toast Title',
  description: 'This is a simple toast message.',
  duration: 5000
};

export const WithAction = Template.bind({});
WithAction.args = {
  title: 'File Deleted',
  description: 'The file has been moved to trash.',
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked'),
  },
  duration: 5000
};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  title: 'Changes saved successfully',
  duration: 3000
};

export const Success = Template.bind({});
Success.args = {
  title: 'Success!',
  description: 'Your changes have been saved successfully.',
  duration: 4000
};

export const Error = Template.bind({});
Error.args = {
  title: 'Error',
  description: 'Something went wrong. Please try again.',
  action: {
    label: 'Retry',
    onClick: () => console.log('Retry clicked'),
  },
  duration: 6000
}; 