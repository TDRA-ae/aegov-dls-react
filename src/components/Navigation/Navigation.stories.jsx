import React from 'react';
import Navigation from './Navigation';
import {
  House,
  User,
  PersonArmsSpread as Accessibility,
  Globe,
  Gear,
  Buildings,
  Info,
  Phone,
  Envelope,
  MapPin,
  Calendar,
  FileText,
  Newspaper,
  UsersThree,
  Handshake,
  ChartLine
} from '@phosphor-icons/react';

const { MainMenu, SecondaryMenu, NavItem } = Navigation;

import { useState, useEffect } from 'react';

const useWindowSize = (mobileBreakpoint = 1024) => {
  // Initialize with default values or actual window size if on client
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : mobileBreakpoint,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Derived value for mobile detection
  const isMobile = windowSize.width < mobileBreakpoint;

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away to update initial state
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array means this effect runs once on mount

  return { width: windowSize.width, height: windowSize.height, isMobile };
};

const Logo = () => (
  <div className="text-aeblack-900 font-bold text-2xl">LOGO</div>
);

// Custom Link component for demonstration
const CustomLink = React.forwardRef(({ children, onClick, className, ...props }, ref) => (
  <a
    ref={ref}
    className={`inline-flex items-center gap-2 border-b-2 border-transparent px-3 py-4 font-bold transition-colors hover:border-primary-800 hover:text-primary-800 ${className || ''}`}
    onClick={(e) => {
      console.log('Custom link clicked');
      if (onClick) onClick(e);
    }}
    {...props}
  >
    {children}
  </a>
));

CustomLink.displayName = 'CustomLink';

// Custom dropdown content component
const CustomDropdown = () => (
  <div className="p-4 bg-white rounded-lg shadow-lg">
    <h3 className="text-lg font-bold text-primary-700 mb-3">Custom Dropdown Content</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h4 className="font-semibold text-primary-600 mb-2">Section 1</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline hover:text-primary-500">Custom Item 1</a></li>
          <li><a href="#" className="hover:underline hover:text-primary-500">Custom Item 2</a></li>
          <li><a href="#" className="hover:underline hover:text-primary-500">Custom Item 3</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-primary-600 mb-2">Section 2</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline hover:text-primary-500">Custom Item 4</a></li>
          <li><a href="#" className="hover:underline hover:text-primary-500">Custom Item 5</a></li>
          <li><a href="#" className="hover:underline hover:text-primary-500">Custom Item 6</a></li>
        </ul>
      </div>
    </div>
  </div>
);

export default {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
};

// Basic navigation with simple items
export const Default = () => {
  const { isMobile } = useWindowSize();

  return (
    <Navigation isMobile={isMobile} logo={<Logo />}>
      <MainMenu>
        <NavItem icon={House} href="#" isActive>
        Home
      </NavItem>
      <NavItem href="#">
        Our services
      </NavItem>
      <NavItem
        href="#"
        dropdown={[
          {
            title: 'Sub Title',
            items: [
              { label: 'Sub Item', href: '#' },
              { label: 'Sub Item', href: '#' },
              { label: 'Sub Item', href: '#' },
            ],
          },
          {
            title: 'Sub Title',
            items: [
              { label: 'Sub Item', href: '#' },
              { label: 'Sub Item', href: '#' },
              { label: 'Sub Item', href: '#' },
            ],
          },
          {
            title: 'Sub Title',
            items: [
              { label: 'Sub Item', href: '#' },
              { label: 'Sub Item', href: '#' },
              { label: 'Sub Item', href: '#' },
            ],
          },
        ]}
      >
        About us
      </NavItem>
    </MainMenu>
    <SecondaryMenu>
      <NavItem type="secondary" icon={User} href="#" tooltipText="Login">
        Login
      </NavItem>
      <NavItem type="secondary" icon={Accessibility} href="#" tooltipText="Accessibility">
        Accessibility
      </NavItem>
      <NavItem type="secondary" icon={Globe} href="#" tooltipText="Switch language">
        Switch language
        </NavItem>
      </SecondaryMenu>
    </Navigation>
  );
};

// Navigation with icons for all items
export const WithIcons = () => {
  const { isMobile } = useWindowSize();

  return (
    <Navigation isMobile={isMobile} logo={<Logo />}>
      <MainMenu>
        <NavItem icon={House} href="#" isActive>
        Home
      </NavItem>
      <NavItem icon={Gear} href="#">
        Services
      </NavItem>
      <NavItem
        icon={Info}
        href="#"
        dropdown={[
          {
            title: 'Company',
            items: [
              { label: 'Our Story', href: '#' },
              { label: 'Team', href: '#' },
              { label: 'Careers', href: '#' },
            ],
          },
          {
            title: 'Locations',
            items: [
              { label: 'Headquarters', href: '#' },
              { label: 'Regional Offices', href: '#' },
              { label: 'International', href: '#' },
            ],
          },
        ]}
      >
        About
      </NavItem>
      <NavItem icon={Phone} href="#">
        Contact
      </NavItem>
    </MainMenu>
    <SecondaryMenu>
      <NavItem type="secondary" icon={User} href="#" tooltipText="Account">
        Account
      </NavItem>
      <NavItem type="secondary" icon={Globe} href="#" tooltipText="Language">
        Language
      </NavItem>
    </SecondaryMenu>
    </Navigation>
  );
};

// Complex navigation with multiple dropdown sections
export const Complex = () => {
  const { isMobile } = useWindowSize();

  return (
    <Navigation isMobile={isMobile} logo={<Logo />}>
      <MainMenu>
        <NavItem icon={House} href="#">
        Home
      </NavItem>
      <NavItem
        icon={Gear}
        href="#"
        dropdown={[
          {
            title: 'Business Services',
            items: [
              { label: 'Consulting', href: '#' },
              { label: 'Strategy', href: '#' },
              { label: 'Development', href: '#' },
            ],
          },
          {
            title: 'Personal Services',
            items: [
              { label: 'Financial Planning', href: '#' },
              { label: 'Education', href: '#' },
              { label: 'Health & Wellness', href: '#' },
            ],
          },
        ]}
      >
        Services
      </NavItem>
      <NavItem
        icon={Buildings}
        href="#"
        isActive
        dropdown={[
          {
            title: 'Our Company',
            items: [
              { label: 'History', href: '#' },
              { label: 'Mission & Vision', href: '#' },
              { label: 'Leadership', href: '#' },
            ],
          },
          {
            title: 'Careers',
            items: [
              { label: 'Current Openings', href: '#' },
              { label: 'Benefits', href: '#' },
              { label: 'Culture', href: '#' },
            ],
          },
          {
            title: 'Press',
            items: [
              { label: 'News', href: '#' },
              { label: 'Media Kit', href: '#' },
              { label: 'Contact PR', href: '#' },
            ],
          },
        ]}
      >
        About
      </NavItem>
      <NavItem
        icon={FileText}
        href="#"
        dropdown={[
          {
            title: 'Documentation',
            items: [
              { label: 'Guides', href: '#' },
              { label: 'API Reference', href: '#' },
              { label: 'Examples', href: '#' },
            ],
          },
          {
            title: 'Learning',
            items: [
              { label: 'Tutorials', href: '#' },
              { label: 'Webinars', href: '#' },
              { label: 'Workshops', href: '#' },
            ],
          },
        ]}
      >
        Resources
      </NavItem>
      <NavItem icon={Envelope} href="#">
        Contact
      </NavItem>
    </MainMenu>
    <SecondaryMenu>
      <NavItem type="secondary" icon={User} href="#" tooltipText="Account">
        Account
      </NavItem>
      <NavItem type="secondary" icon={Accessibility} href="#" tooltipText="Accessibility">
        Accessibility
      </NavItem>
      <NavItem type="secondary" icon={Globe} href="#" tooltipText="Language">
        Language
      </NavItem>
      </SecondaryMenu>
    </Navigation>
  );
};

// Mobile navigation example
export const Mobile = () => {
  return (
    <Navigation isMobile={true} logo={<Logo />}>
      <MainMenu>
        <NavItem icon={House} href="#">
          Home
        </NavItem>
        <NavItem href="#">
          Our services
        </NavItem>
        <NavItem
          href="#"
          dropdown={[
            {
              title: 'Sub Title',
              items: [
                { label: 'Sub Item', href: '#' },
                { label: 'Sub Item', href: '#' },
                { label: 'Sub Item', href: '#' },
              ],
            },
            {
              title: 'Sub Title',
              items: [
                { label: 'Sub Item', href: '#' },
                { label: 'Sub Item', href: '#' },
                { label: 'Sub Item', href: '#' },
              ],
            },
            {
              title: 'Sub Title',
              items: [
                { label: 'Sub Item', href: '#' },
                { label: 'Sub Item', href: '#' },
                { label: 'Sub Item', href: '#' },
              ],
            },
          ]}
        >
          About us
        </NavItem>
      </MainMenu>
      <SecondaryMenu>
        <NavItem type="secondary" icon={User} href="#">
          Login
        </NavItem>
        <NavItem type="secondary" icon={Accessibility} href="#">
          Accessibility
        </NavItem>
        <NavItem type="secondary" icon={Globe} href="#">
          Switch language
        </NavItem>
      </SecondaryMenu>
    </Navigation>
  );
};

// Responsive navigation that shows both desktop and mobile versions
export const Responsive = () => {
  const { width: windowWidth, isMobile } = useWindowSize();

  return (
    <div>
      <div className="mb-4 p-4 bg-aeblack-100 text-center">
        <p>Current width: {windowWidth}px ({isMobile ? 'Mobile' : 'Desktop'} view)</p>
        <p className="text-sm text-aeblack-600">Resize your browser window to see the navigation change</p>
      </div>
      <Navigation isMobile={isMobile} logo={<Logo />}>
        <MainMenu>
          <NavItem icon={House} href="#" isActive>
            Home
          </NavItem>
          <NavItem href="#">
            Our services
          </NavItem>
          <NavItem
            href="#"
            dropdown={[
              {
                title: 'Sub Title',
                items: [
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' },
                ],
              },
              {
                title: 'Sub Title',
                items: [
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' },
                ],
              },
              {
                title: 'Sub Title',
                items: [
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' },
                ],
              },
            ]}
          >
            About us
          </NavItem>
        </MainMenu>
        <SecondaryMenu>
          <NavItem type="secondary" icon={User} href="#" tooltipText="Login">
            Login
          </NavItem>
          <NavItem type="secondary" icon={Accessibility} href="#" tooltipText="Accessibility">
            Accessibility
          </NavItem>
          <NavItem type="secondary" icon={Globe} href="#" tooltipText="Switch language">
            Switch language
          </NavItem>
        </SecondaryMenu>
      </Navigation>
    </div>
  );
};

// Example with custom components
export const WithCustomComponents = () => {
  const { isMobile } = useWindowSize();

  const handleCustomClick = (e) => {
    e.preventDefault();
    alert('Custom handler executed!');
  };

  return (
    <Navigation isMobile={isMobile} logo={<Logo />}>
      <MainMenu>
        <NavItem icon={House} href="#" isActive>
          Home
        </NavItem>
        <NavItem asChild>
          <CustomLink href="#" onClick={handleCustomClick}>
            Custom Nav Item
          </CustomLink>
        </NavItem>
        <NavItem dropdown={[
          {
            title: 'Standard Dropdown',
            items: [
              { label: 'Item 1', href: '#' },
              { label: 'Item 2', href: '#' },
              { label: 'Item 3', href: '#' },
            ],
          }
        ]}>
          Standard Dropdown
        </NavItem>
        <NavItem dropdown={<CustomDropdown />}>
          Custom Dropdown
        </NavItem>
      </MainMenu>
      <SecondaryMenu>
        <NavItem type="secondary" icon={User} href="#" tooltipText="Account">
          Account
        </NavItem>
        <NavItem type="secondary" icon={Globe} href="#" tooltipText="Language">
          Language
        </NavItem>
      </SecondaryMenu>
    </Navigation>
  );
}; 