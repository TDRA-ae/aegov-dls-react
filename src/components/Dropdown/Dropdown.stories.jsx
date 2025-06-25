import React from 'react';
import Dropdown from './Dropdown';
import Button from '../Button/Button';
import { CaretDown } from '@phosphor-icons/react';
import { 
  User, 
  Bell, 
  Gear, 
  SignOut, 
  Globe, 
  CaretRight,
  ShoppingCart,
  CreditCard,
  Package,
  Heart
} from '@phosphor-icons/react';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
};

const ExampleTrigger = () => (
  <Button variant="solid" styleType="secondary">
    <span>Select An Option</span>
    <CaretRight className="h-4 w-4 rotate-90" weight="bold" />
  </Button>
);

// Basic dropdown with single group
export const Default = () => (
  <Dropdown
    groups={[
      {
        items: [
          { label: 'Profile', value: 'profile' },
          { label: 'Settings', value: 'settings' },
          { label: 'Logout', value: 'logout' },
        ],
      },
    ]}
  >
    <ExampleTrigger />
  </Dropdown>
);

// Dropdown with icons
export const WithIcons = () => (
  <Dropdown
    groups={[
      {
        items: [
          { label: 'Profile', value: 'profile', icon: User },
          { label: 'Notifications', value: 'notifications', icon: Bell },
          { label: 'Settings', value: 'settings', icon: Gear },
          { label: 'Logout', value: 'logout', icon: SignOut },
        ],
      },
    ]}
  >
    <ExampleTrigger />
  </Dropdown>
);

// Dropdown with multiple groups and labels
export const WithGroups = () => (
  <Dropdown
    groups={[
      {
        label: 'Account',
        items: [
          { label: 'Profile', value: 'profile', icon: User },
          { label: 'Settings', value: 'settings', icon: Gear },
        ],
      },
      {
        label: 'Shopping',
        items: [
          { label: 'Cart', value: 'cart', icon: ShoppingCart },
          { label: 'Orders', value: 'orders', icon: Package },
          { label: 'Wishlist', value: 'wishlist', icon: Heart },
        ],
      },
      {
        label: 'Billing',
        items: [
          { label: 'Payment Methods', value: 'payment', icon: CreditCard },
          { label: 'Subscriptions', value: 'subscriptions', icon: Package },
        ],
      },
    ]}
  >
    <ExampleTrigger />
  </Dropdown>
);

// Dropdown with multiple groups and labels
export const ArabicDropdown = () => (
  <Dropdown
    groups={[
      {
        label: 'Account',
        items: [
          { label: 'Profile', value: 'profile', icon: User },
          { label: 'Settings', value: 'settings', icon: Gear },
        ],
      },
      {
        label: 'Shopping',
        items: [
          { label: 'Cart', value: 'cart', icon: ShoppingCart },
          { label: 'Orders', value: 'orders', icon: Package },
          { label: 'Wishlist', value: 'wishlist', icon: Heart },
        ],
      },
      {
        label: 'Billing',
        items: [
          { label: 'Payment Methods', value: 'payment', icon: CreditCard },
          { label: 'Subscriptions', value: 'subscriptions', icon: Package },
        ],
      },
    ]}
    dir="rtl"
  >
    <ExampleTrigger />
  </Dropdown>
);

// Language selector dropdown
export const LanguageSelector = () => (
  <Dropdown
    groups={[
      {
        items: [
          { label: 'English', value: 'en' },
          { label: 'Arabic', value: 'ar' },
        ],
      }
    ]}
  >
    <Button variant="outline" styleType="secondary">
      <Globe className="h-4 w-4" weight="regular" />
      <span>Language</span>
      <CaretRight className="h-4 w-4 rotate-90" weight="bold" />
    </Button>
  </Dropdown>
);

// Dropdown with different alignments
export const Alignments = () => (
  <div className="flex gap-4">
    <Dropdown
      align="start"
      groups={[
        {
          items: [
            { label: 'Left aligned', value: '1' },
            { label: 'Item 2', value: '2' },
          ],
        },
      ]}
    >
      <ExampleTrigger />
    </Dropdown>
    <Dropdown
      align="center"
      groups={[
        {
          items: [
            { label: 'Center aligned', value: '1' },
            { label: 'Item 2', value: '2' },
          ],
        },
      ]}
    >
      <ExampleTrigger />
    </Dropdown>
    <Dropdown
      align="end"
      groups={[
        {
          items: [
            { label: 'Right aligned', value: '1' },
            { label: 'Item 2', value: '2' },
          ],
        },
      ]}
    >
      <ExampleTrigger />
    </Dropdown>
  </div>
);

// Dropdown with different placements
export const Placements = () => (
  <div className="flex gap-4">
    <Dropdown
      side="bottom"
      groups={[
        {
          items: [
            { label: 'Bottom placement', value: '1' },
            { label: 'Item 2', value: '2' },
          ],
        },
      ]}
    >
      <ExampleTrigger />
    </Dropdown>
    <Dropdown
      side="right"
      groups={[
        {
          items: [
            { label: 'Right placement', value: '1' },
            { label: 'Item 2', value: '2' },
          ],
        },
      ]}
    >
      <ExampleTrigger />
    </Dropdown>
    <Dropdown
      side="top"
      groups={[
        {
          items: [
            { label: 'Top placement', value: '1' },
            { label: 'Item 2', value: '2' },
          ],
        },
      ]}
    >
      <ExampleTrigger />
    </Dropdown>
    <Dropdown
      side="left"
      groups={[
        {
          items: [
            { label: 'Left placement', value: '1' },
            { label: 'Item 2', value: '2' },
          ],
        },
      ]}
    >
      <ExampleTrigger />
    </Dropdown>
  </div>
);

// Interactive dropdown with onSelect handler
export const Interactive = () => {
  const handleSelect = (value) => {
    console.log('Selected:', value);
  };

  return (
    <Dropdown
      onSelect={handleSelect}
      groups={[
        {
          items: [
            { label: 'Click me', value: 'click-1', icon: Bell },
            { label: 'Or me', value: 'click-2', icon: Gear },
          ],
        },
      ]}
    >
      <ExampleTrigger />
    </Dropdown>
  );
};

// Dropdown with header, divider, and icons
export const WithHeaderDividerAndIcons = () => (
  <Dropdown
    header={
      <div>
        <div className="text-sm text-gray-700">Signed in as</div>
        <div className="font-bold text-lg text-gray-900">john@example.com</div>
      </div>
    }
    groups={[
      {
        items: [
          { label: 'A menu item', value: 'item-1', icon: Bell },
          { label: 'A menu item', value: 'item-2', icon: User },
          { label: 'A menu item', value: 'item-3', icon: Globe },
        ],
      },
      {
        items: [
          { label: 'A menu item', value: 'item-4', icon: Gear },
          { label: 'A menu item', value: 'item-5', icon: ShoppingCart },
          { label: 'A menu item', value: 'item-6', icon: Package },
        ],
      },
    ]}
  >
    <Button variant="solid" styleType="primary">
      <span>Open dropdown</span>
      <CaretDown className="h-5 w-5 ml-2" weight="bold" />
    </Button>
  </Dropdown>
); 