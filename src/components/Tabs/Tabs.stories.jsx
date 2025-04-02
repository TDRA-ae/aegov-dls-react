import React from 'react'
import Tabs from './Tabs'
import { User, Gear, Bell, Question } from '@phosphor-icons/react'

export default {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    items: [
      {
        value: 'all',
        label: 'All services',
        content: <p className="px-2 py-4">This is the content area for the tab "all services"</p>
      },
      {
        value: 'cat1',
        label: 'Category 1',
        content: 'This is the content area for the tab "category 1"'
      },
      {
        value: 'cat2',
        label: 'Category 2',
        content: 'This is the content area for the tab "category 2"'
      },
      {
        value: 'cat3',
        label: 'Category 3',
        content: 'This is the content area for the tab "category 3"'
      }
    ]
  }
}

export const Default = {}

export const Compact = {
  args: {
    variant: 'compact'
  }
}

export const Pills = {
  args: {
    variant: 'pills'
  }
}

export const WithIcons = {
  args: {
    items: [
      {
        value: 'account',
        label: 'My account',
        icon: User,
        content: <>
          <h3 className="text-lg font-semibold">My account</h3>
          <p className="py-4">This is the content area for the tab "My account"</p>
        </>
      },
      {
        value: 'settings',
        label: 'Settings',
        icon: Gear,
        content: 'This is the content area for the tab "Settings"'
      },
      {
        value: 'notifications',
        label: 'Notifications',
        icon: Bell,
        content: 'This is the content area for the tab "Notifications"'
      },
      {
        value: 'support',
        label: 'Support',
        icon: Question,
        content: 'This is the content area for the tab "Support"'
      }
    ]
  }
} 