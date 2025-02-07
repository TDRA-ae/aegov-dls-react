import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { Bell, Newspaper, Table, House } from '@phosphor-icons/react';

// Mock Next.js Link component for demonstration
const Link = React.forwardRef(({ href, children, className }, ref) => (
  <a ref={ref} href={href} className={className}>
    {children}
  </a>
));

Link.displayName = 'Link';

// Custom link component for demonstration
const CustomLink = React.forwardRef(({ href, children, className }, ref) => (
  <a 
    ref={ref} 
    href={href} 
    className={className}
    onClick={(e) => {
      e.preventDefault();
      console.log('Custom link clicked:', href);
    }}
  >
    {children}
  </a>
));

CustomLink.displayName = 'CustomLink';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
};

const Template = (args) => <Breadcrumbs {...args} />;

// Basic breadcrumbs with slash separator
export const Default = Template.bind({});
Default.args = {
  items: [
    { label: 'Home', href: '#' },
    { label: 'Media centre', href: '#' },
    { label: 'News', href: '#' },
    { label: 'Press release and features', href: '#' },
    { label: 'A really long page name that must be affected' },
  ],
};

// Breadcrumbs with home icon
export const WithHomeIcon = Template.bind({});
WithHomeIcon.args = {
  items: [
    { label: 'Home', href: '#' },
    { label: 'Media centre', href: '#' },
    { label: 'News', href: '#' },
    { label: 'Press release', href: '#' },
    { label: 'A really long page name that must be affected' },
  ],
  showHomeIcon: true,
};

// Breadcrumbs with caret separator
export const WithCaretSeparator = Template.bind({});
WithCaretSeparator.args = {
  items: [
    { label: 'Home', href: '#' },
    { label: 'Media centre', href: '#' },
    { label: 'News', href: '#' },
    { label: 'Press release', href: '#' },
    { label: 'A really long page name that must be affected' },
  ],
  separator: 'caret',
};

// Breadcrumbs with custom icons
export const WithCustomIcons = Template.bind({});
WithCustomIcons.args = {
  items: [
    { label: 'Dashboard', href: '#', icon: <Table className="size-4" /> },
    { label: 'Notifications', href: '#', icon: <Bell className="size-4" /> },
    { label: 'News', href: '#', icon: <Newspaper className="size-4" /> },
    { label: 'Current Page' },
  ],
  separator: 'caret',
};

// Breadcrumbs with custom Link component (e.g. Next.js Link)
export const WithCustomLink = Template.bind({});
WithCustomLink.args = {
  ...WithHomeIcon.args,
  items: [
    { label: 'Home', href: '/' },
    { label: 'Media centre', href: '/media' },
    { label: 'News', href: '/news' },
    { label: 'Current Page' },
  ],
  linkComponent: Link,
};

// Breadcrumbs with schema.org microdata example
export const WithMicrodata = Template.bind({});
WithMicrodata.args = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Smartphones' },
  ],
  showHomeIcon: true,
};
WithMicrodata.parameters = {
  docs: {
    description: {
      story: 'The Breadcrumbs component automatically includes Schema.org BreadcrumbList microdata attributes for better SEO. This includes proper itemScope, itemType, itemProp, and position metadata.',
    },
  },
};

// Breadcrumbs with custom elements
export const WithCustomElements = Template.bind({});
WithCustomElements.args = {
  items: [
    <CustomLink key="home" href="/">
      Home
    </CustomLink>,
    <CustomLink key="media" href="/media">
      Media centre
    </CustomLink>,
    <CustomLink key="news" href="/news">
      News
    </CustomLink>,
    <span key="current">Current Page</span>,
  ],
  separator: 'caret',
};
WithCustomElements.parameters = {
  docs: {
    description: {
      story: 'You can pass custom elements directly as items. The Breadcrumbs component will apply its styles while maintaining the element\'s functionality.',
    },
  },
};

// Mixed usage example
export const MixedUsage = Template.bind({});
MixedUsage.args = {
  items: [
    { label: 'Home', href: '/', icon: <House className="size-4" /> },
    <CustomLink key="media" href="/media">
      Media centre
    </CustomLink>,
    { label: 'News', href: '/news' },
    <span key="current">Current Page</span>,
  ],
  separator: 'caret',
};
MixedUsage.parameters = {
  docs: {
    description: {
      story: 'You can mix both object items and custom elements in the same breadcrumb.',
    },
  },
}; 