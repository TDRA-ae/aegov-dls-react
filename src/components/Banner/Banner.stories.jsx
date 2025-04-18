import React from 'react';
import Banner from './Banner';

export default {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="pt-16 pb-16">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom'],
    },
    variant: {
      control: 'select',
      options: ['default', 'camel', 'red', 'notice', 'dark'],
    },
    centered: {
      control: 'boolean',
      defaultValue: true,
    },
    onDismiss: { action: 'dismissed' },
    'action.onClick': { action: 'clicked' },
  },
};

// Default Banner
export const Default = {
  args: {
    children: 'Upgrading your account to be used with UAE Pass is now active.',
    action: {
      text: 'Connect your account to UAE PASS',
      onClick: () => alert('Connecting your account to UAE PASS')
    },
    position: 'top',
    variant: 'default',
  },
};

// Camel Banner
export const Camel = {
  args: {
    children: 'Upgrading your account to be used with UAE Pass is now active.',
    action: {
      text: 'Connect your account to UAE PASS',
      onClick: () => alert('Connecting your account to UAE PASS')
    },
    position: 'top',
    variant: 'camel',
  },
};

// Red Banner
export const Red = {
  args: {
    children: 'Discover essential government services and stay informed about policies and initiatives. Your gateway to efficient governance.',
    action: {
      text: 'Learn more',
      onClick: () => alert('Learning more about government services')
    },
    position: 'top',
    variant: 'red',
    centered: false,
  },
};

// Notice Banner
export const Notice = {
  args: {
    title: 'We use cookies to personalise this website',
    children: 'Our site enables script (e.g. cookies) that is able to read, store, and write information on your browser and in your device. By using our website, you\'re agreeing to the collection of data as described in our Privacy Policy.',
    action: {
      text: 'Accept',
      onClick: () => alert('Accepted')
    },
    position: 'bottom',
    variant: 'notice',
  },
};

// Dark Banner with Dismiss
export const DarkDismissible = {
  args: {
    children: 'We are participating at World Government Summit 2023',
    action: {
      text: 'Come join us',
      onClick: () => alert('Joining us at the World Government Summit 2023')
    },
    variant: 'dark',
    isDismissible: true,
    centered: false,
  },
};

// Bottom Banner
export const BottomPosition = {
  args: {
    children: 'This is a bottom banner message',
    action: {
      text: 'Take Action',
      onClick: () => alert('Taking action on the bottom banner')
    },
    position: 'bottom',
  },
};

// Banner without Action
export const WithoutAction = {
  args: {
    children: 'This is a banner without any action button',
  },
};

// Dismissible Banner
export const Dismissible = {
  args: {
    children: 'This is a dismissible banner',
    isDismissible: true,
    onDismiss: () => alert('Dismissed'),
  },
};