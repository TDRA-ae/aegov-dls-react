import React from 'react';
import { z } from 'zod';
import { X, CaretRight } from '@phosphor-icons/react';
import { twMerge } from 'tailwind-merge';

// Define schemas for validation
const BannerPositionSchema = z.enum(['top', 'bottom']);
const BannerVariantSchema = z.enum(['default', 'camel', 'red', 'notice', 'dark']);
const BannerCenteredSchema = z.boolean();

// Define styles
const variantStyles = {
  default: 'bg-slate-50 border-slate-500 text-slate-600',
  camel: 'bg-camel-600 border-camel-500 text-camel-50',
  red: 'bg-aered-50 border-aered-500 text-aered-600',
  notice: 'bg-slate-50 border-slate-700',
  dark: 'bg-slate-700 text-slate-50 rounded-xl m-4',
};

const actionStyles = {
  default: 'text-slate-600 hover:text-slate-700 focus-visible:ring-slate-400',
  camel: 'text-camel-50 hover:text-camel-100 focus-visible:ring-camel-400',
  red: 'text-aered-600 hover:text-aered-700 focus-visible:ring-aered-400',
  notice: 'text-slate-700 hover:text-slate-800 focus-visible:ring-slate-400',
  dark: 'text-slate-50 hover:text-slate-100 focus-visible:ring-slate-400',
};

const positionStyles = {
  top: 'border-b-2 fixed top-0 left-0 right-0 z-50',
  bottom: 'border-t-2 fixed bottom-0 left-0 right-0 z-50',
};

// Helper function to get base classes
const getBaseClasses = (variant, position, className) => twMerge(
  'relative px-4 py-3',
  variantStyles[variant],
  positionStyles[position],
  variant === 'notice' && 'flex flex-col md:flex-row justify-between gap-4',
  className
);

// Helper function to get action classes
const getActionClasses = (variant) => twMerge(
  'inline-flex items-center gap-2 font-medium underline underline-offset-1 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm whitespace-nowrap',
  actionStyles[variant]
);

const Banner = ({
  children,
  position = 'top',
  variant = 'default',
  className,
  onDismiss,
  action,
  title,
  isDismissible = false,
  centered = true,
}) => {
  // Validate props
  BannerPositionSchema.parse(position);
  BannerVariantSchema.parse(variant);
  BannerCenteredSchema.parse(centered);
  const baseClasses = getBaseClasses(variant, position, className);
  const actionClasses = getActionClasses(variant);

  const renderAction = () => {
    if (!action?.text) return null;
    const { href = '#', text, onClick, ...actionProps } = action;
    return (
      <a href={href} className={actionClasses} onClick={onClick} {...actionProps}>
        {text}
        <CaretRight weight="bold" className="w-5 h-5 rtl:-scale-x-100" />
      </a>
    );
  };

  const renderDismissButton = () => {
    if (!isDismissible || !onDismiss) return null;
    return (
      <button
        onClick={onDismiss}
        className="p-0.5 hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 rounded"
        aria-label="Dismiss"
      >
        <X weight="bold" className="w-5 h-5" />
      </button>
    );
  };

  const renderContent = () => (
    <>
      <div className={`flex flex-col md:flex-row gap-3 ${centered ? 'justify-center' : 'justify-start'} flex-grow`}>
        <div className={`${centered ? 'text-center' : 'text-left'}`}>{children}</div>
        <div className={`flex items-center ${centered ? 'justify-center' : 'justify-start'} gap-3`}>
          {renderAction()}
        </div>
      </div>
      {renderDismissButton() && (
        <div className="flex items-center">
          {renderDismissButton()}
        </div>
      )}
    </>
  );

  return (
    <div className={baseClasses} role="alert" tabIndex={variant === 'notice' ? '-1' : undefined}>
      {variant === 'notice' ? (
        <div className="py-4 max-w-screen-lg">
          {title && <h2 className="mb-4 text-xl font-bold text-slate-800">{title}</h2>}
          <p className="font-normal text-slate-800 mb-0">{children}</p>
        </div>
      ) : (
        renderContent()
      )}
      {variant === 'notice' && (
        <div className="flex items-center gap-4">
          {renderAction()}
          {renderDismissButton()}
        </div>
      )}
    </div>
  );
};

export default Banner;