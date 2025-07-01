import React from 'react';
import Navigation, { useWindowSize } from './Navigation';
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
  <div className="">
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

// MegaMenu story with custom dropdown
export const MegaMenu = () => {
  const { isMobile } = useWindowSize();

  // Custom MegaMenu dropdown component for desktop
  const MegaMenuDropdown = () => (
    <div
      className="fixed left-0 right-0 top-[72px] w-full z-50 bg-white/95 shadow-lg"
      style={{ minHeight: '320px' }}
    >
      <div className="container mx-auto px-12 py-10 grid grid-cols-4 gap-12">
        <div>
          <h3 className="text-lg font-bold text-yellow-800 mb-6">Cities</h3>
          <ul className="space-y-8 text-lg">
            <li>Dubai</li>
            <li>Abu Dhabi</li>
            <li>Sharjah</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-yellow-800 mb-6">Foods</h3>
          <ul className="space-y-8 text-lg">
            <li>Shawarma</li>
            <li>Falafel</li>
            <li>Hummus</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-yellow-800 mb-6">Landmarks</h3>
          <ul className="space-y-8 text-lg">
            <li>Burj Khalifa</li>
            <li>The Creek</li>
            <li>Palm Jumeirah</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-yellow-800 mb-6">Activities</h3>
          <ul className="space-y-8 text-lg">
            <li>Desert Safari</li>
            <li>Dhow Cruise</li>
            <li>Ski Dubai</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Mobile-friendly dropdown structure
  const mobileDropdown = [
    {
      title: 'Cities',
      items: [
        { label: 'Dubai', href: '#' },
        { label: 'Abu Dhabi', href: '#' },
        { label: 'Sharjah', href: '#' },
      ],
    },
    {
      title: 'Foods',
      items: [
        { label: 'Shawarma', href: '#' },
        { label: 'Falafel', href: '#' },
        { label: 'Hummus', href: '#' },
      ],
    },
    {
      title: 'Landmarks',
      items: [
        { label: 'Burj Khalifa', href: '#' },
        { label: 'The Creek', href: '#' },
        { label: 'Palm Jumeirah', href: '#' },
      ],
    },
    {
      title: 'Activities',
      items: [
        { label: 'Desert Safari', href: '#' },
        { label: 'Dhow Cruise', href: '#' },
        { label: 'Ski Dubai', href: '#' },
      ],
    },
  ];

  return (
    <Navigation isMobile={isMobile} logo={<Logo />}>
      <MainMenu>
        <NavItem icon={House} href="#" isActive>
          Home
        </NavItem>
        <NavItem
          dropdown={isMobile ? mobileDropdown : <MegaMenuDropdown />}
          isActive
        >
          Mega Menu
        </NavItem>
        <NavItem href="#">
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

// Multi-Column Dropdown story
export const MultiColumnDropdown = () => {
  const { isMobile } = useWindowSize();

  // Custom multi-column dropdown for desktop
  const MultiColumnDropdownContent = () => (
    <div
    >
      <div className="px-5 py-2 grid grid-cols-3 gap-8 min-w-[600px]">
        {[1, 2, 3].map((col) => (
          <div key={col}>
            <h4 className="text-base font-bold text-yellow-800 mb-4">Sub Title</h4>
            <ul className="space-y-4 text-base">
              <li><a href="#" className="hover:underline">Sub Item</a></li>
              <li><a href="#" className="hover:underline">Sub Item</a></li>
              <li><a href="#" className="hover:underline">Sub Item</a></li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  // Mobile-friendly dropdown structure
  const mobileDropdown = [
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
  ];

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
          dropdown={isMobile ? mobileDropdown : <MultiColumnDropdownContent />}
          isActive
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