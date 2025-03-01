import { z } from 'zod';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
    Root,
    List,
    Item,
    Trigger,
    Content,
    Link,
    Viewport,
    Indicator
} from '@radix-ui/react-navigation-menu';
import { CaretDown, List as HamburgerMenu, X } from '@phosphor-icons/react';

const dropdownSchema = z.array(z.object({
    title: z.string(),
    items: z.array(z.object({
        label: z.string(),
        href: z.string()
    })) 
}));

const NavItem = React.forwardRef(({
    children,
    icon: Icon,
    href,
    isActive,
    dropdown,
    asChild = false,
    type = 'primary',
    tooltipText,
    ...props
}, ref) => {
    const hasDropdown = dropdown && (Array.isArray(dropdown) || React.isValidElement(dropdown));

    if (hasDropdown) {
        // If dropdown is a React node, we can assume it's a custom dropdown
        if (!React.isValidElement(dropdown)) {
            // Validate the dropdown schema
            const validatedDropdown = dropdownSchema.parse(dropdown);

            if (!validatedDropdown) {
                console.error('Invalid dropdown schema', dropdown);
            }
        }
    }

    // If asChild is true, we render the child directly
    if (asChild) {
        return (
            <Item className={twMerge(
                "relative",
                isActive && "active-page"
            )} ref={ref} {...props}>
                {children}
            </Item>
        );
    }

    // If it's a secondary menu item
    if (type === 'secondary') {
        return (
            <li ref={ref} {...props}>
                <a
                    href={href || "#"}
                    className="flex items-center justify-center flex-shrink-0 h-14 px-3"
                    aria-label={children}
                    title={tooltipText || children}
                >
                    {Icon && <Icon weight="regular" className="w-6 h-6 text-primary-600 hover:text-primary-500" />}
                    <span className="sr-only">{children}</span>
                </a>
            </li>
        );
    }

    // If it has a dropdown
    if (hasDropdown) {
        return (
            <Item className="group relative z-[1]">
                <Trigger 
                    className={twMerge(
                        "group inline-flex items-center gap-2 border-b-2 border-transparent px-3 py-4 font-bold transition-colors",
                        "hover:border-primary-800 hover:text-primary-800",
                        "[&[data-state=open]]:border-primary-800",
                        isActive && "border-primary-900 text-primary-900"
                    )}
                >
                    {Icon && <Icon weight="regular" className="h-5 w-5" />}
                    {children}
                    <CaretDown 
                        weight="bold" 
                        className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-180" 
                        aria-hidden 
                    />
                </Trigger>

                <Content
                className="mt-2 absolute z-50 w-[300px] data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight">
                    <div className="rounded-lg border border-aeblack-100 bg-whitely-50 p-4 shadow-lg">
                        {React.isValidElement(dropdown) ? (
                            dropdown
                        ) : (
                            <div className="flex flex-col">
                                {dropdown.map((group, index) => (
                                    <div key={index} className="mb-6 last:mb-0">
                                        <h2 className="mb-2 text-primary-500 font-bold">{group.title}</h2>
                                        <ul className="space-y-1">
                                            {group.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    <Link 
                                                        href={item.href || "#"} 
                                                        className="block px-2 py-1.5 text-aeblack-900 rounded hover:bg-aeblack-50 hover:text-primary-700 transition-colors"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Content>
            </Item>
        );
    }

    // Regular nav item
    return (
        <Item className={twMerge(
            "relative",
            isActive && "active-page"
        )} ref={ref} {...props}>
            <Link
                href={href || "#"}
                className={twMerge(
                    "inline-flex items-center gap-2 border-b-2 border-transparent px-3 py-4 font-bold transition-colors hover:border-primary-800 hover:text-primary-800",
                    isActive && "border-primary-900 text-primary-900"
                )}
            >
                {Icon && <Icon weight="regular" className="h-5 w-5" />}
                {children}
            </Link>
        </Item>
    );
});

NavItem.displayName = 'NavItem';

// MainMenu Component
const MainMenu = React.forwardRef(({ children, className, ...props }, ref) => {
    return (
        <Root className="relative z-[1]" ref={ref} {...props}>
            <List className={twMerge("flex items-center gap-1", className)}>
                {children}
                <Indicator className="top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                    <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
                </Indicator>
            </List>
            <div className="absolute top-full left-0 w-full">
                {/* <Viewport className="relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300" /> */}
            </div>
        </Root>
    );
});

MainMenu.displayName = 'MainMenu';

// SecondaryMenu Component
const SecondaryMenu = React.forwardRef(({ children, className, ...props }, ref) => {
    return (
        <div className={twMerge("header-navs-right", className)} ref={ref} {...props}>
            <ul className="flex items-center">
                {children}
            </ul>
        </div>
    );
});

SecondaryMenu.displayName = 'SecondaryMenu';

// Mobile Navigation Component
const MobileNavigation = ({ children, logo }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    // Extract main and secondary menu items
    let mainMenuItems = [];
    let secondaryMenuItems = [];

    React.Children.forEach(children, child => {
        if (child.type === MainMenu) {
            mainMenuItems = React.Children.toArray(child.props.children);
        } else if (child.type === SecondaryMenu) {
            secondaryMenuItems = React.Children.toArray(child.props.children);
        }
    });

    // Pre-initialize state for all menu items to avoid hooks order issues
    const [submenuOpenStates, setSubmenuOpenStates] = React.useState(
        Array(mainMenuItems.length).fill(false)
    );

    const toggleSubmenu = (index) => {
        const newStates = [...submenuOpenStates];
        newStates[index] = !newStates[index];
        setSubmenuOpenStates(newStates);
    };

    return (
        <div className="">
            <div className="py-2.5">
                <div className="">
                    <div className="flex items-center justify-between">
                        <div className="logos">
                            <div className="logo-item">
                                <a href="#" className="logo block">
                                    <span className="sr-only">Logo</span>
                                    {logo && logo}
                                </a>
                            </div>
                        </div>
                        <div className="header-top-right">
                            <div className="flex items-center justify-between gap-3">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="hamburger-icon text-aeblack-700"
                                >
                                    <HamburgerMenu weight="light" className="w-8 h-8" />
                                    <span className="sr-only">Toggle main menu</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-white overflow-auto">
                    <div className="flex flex-col h-full">
                        {/* Header with logo and close button */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <a href="#" className="logo">
                                {logo && logo}
                            </a>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-black"
                            >
                                <X weight="light" className="w-8 h-8" />
                                <span className="sr-only">Close main menu</span>
                            </button>
                        </div>

                        {/* Main content area with scrolling */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4">
                                {/* Main menu items - dynamically rendered */}
                                <div className="mb-6">
                                    <nav aria-label="Main navigation">
                                        <ul className="space-y-4">
                                            {mainMenuItems.map((item, index) => {
                                                const props = item.props;
                                                const hasDropdown = props.dropdown;
                                                const Icon = props.icon;
                                                const isSubmenuOpen = submenuOpenStates[index];

                                                return (
                                                    <li key={index} className="relative">
                                                        <div className="flex items-center">
                                                            <a
                                                                href={hasDropdown ? undefined : (props.href || "#")}
                                                                onClick={hasDropdown ? () => toggleSubmenu(index) : undefined}
                                                                className="py-2 w-full text-black font-medium"
                                                            >
                                                                {Icon && <Icon className="inline-block mr-2 h-5 w-5" />}
                                                                {props.children}
                                                            </a>
                                                            {hasDropdown && (
                                                                <button
                                                                    onClick={() => toggleSubmenu(index)}
                                                                    className="absolute right-0 top-2 w-6"
                                                                >
                                                                    <CaretDown
                                                                        weight="bold"
                                                                        className={`transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
                                                                    />
                                                                    <span className="sr-only">
                                                                        {isSubmenuOpen ? `Hide` : `Show`} submenu for "{props.children}"
                                                                    </span>
                                                                </button>
                                                            )}
                                                        </div>

                                                        {hasDropdown && isSubmenuOpen && Array.isArray(props.dropdown) && (
                                                            <div className="mt-2 pl-4">
                                                                {props.dropdown.map((group, groupIndex) => (
                                                                    <div key={groupIndex} className="mb-4">
                                                                        <h3 className="text-primary-500 font-bold mb-2">{group.title}</h3>
                                                                        <ul className="space-y-2">
                                                                            {group.items.map((subItem, subItemIndex) => (
                                                                                <li key={subItemIndex}>
                                                                                    <a
                                                                                        href={subItem.href || "#"}
                                                                                        className="block py-1 text-black"
                                                                                    >
                                                                                        {subItem.label}
                                                                                    </a>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        {/* Footer with utility links */}
                        <div className="border-t border-gray-200 p-4">
                            <ul className="space-y-4">
                                {secondaryMenuItems.map((item, index) => {
                                    const props = item.props;
                                    const Icon = props.icon;

                                    return (
                                        <li key={index}>
                                            <a href={props.href || "#"} className="flex items-center text-black">
                                                {Icon && <Icon className="w-5 h-5 mr-2" />}
                                                <span>{props.children}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Main Navigation Component
const Navigation = React.forwardRef(({ children, className, isMobile = false, logo, ...props }, ref) => {
    if (isMobile) {
        return <MobileNavigation logo={logo}>{children}</MobileNavigation>;
    }

    return (
        <div className={twMerge("hidden lg:block", className)} ref={ref} {...props}>
            <div className="bg-aeblack-50">
                <div className="container">
                    <div className="flex items-center justify-between">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
});

Navigation.displayName = 'Navigation';

// Export all components
Navigation.MainMenu = MainMenu;
Navigation.SecondaryMenu = SecondaryMenu;
Navigation.NavItem = NavItem;

export default Navigation; 