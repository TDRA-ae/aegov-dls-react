import React from 'react';
import { z } from 'zod';
import { House, CaretRight } from '@phosphor-icons/react';
import { Slot } from '@radix-ui/react-slot';
import { twMerge } from 'tailwind-merge';

const breadcrumbItemSchema = z.union([
  z.object({
    label: z.string(),
    href: z.string().optional(),
    icon: z.any().optional(),
  }),
  z.any()
]);

const breadcrumbsSchema = z.object({
  items: z.array(breadcrumbItemSchema),
  separator: z.enum(['slash', 'caret']).optional(),
  showHomeIcon: z.boolean().optional(),
  className: z.string().optional(),
  linkComponent: z.any().optional(),
});

const styles = {
  link: 'text-sm text-gray-500 hover:text-primary-600 max-w-[140px] truncate font-medium py-2 hover:underline decoration-2 underline-offset-2 flex items-center',
  current: 'text-sm font-semibold text-gray-800 max-w-[160px] truncate',
};

const BreadcrumbLink = React.forwardRef(({ linkComponent: Link, className, ...props }, ref) => {
  const classes = twMerge(styles.link, className);
  return Link 
    ? <Link ref={ref} className={classes} {...props} /> 
    : <a ref={ref} className={classes} {...props} />;
});

BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbItem = ({ item, index, isLast, isFirst, showHomeIcon, renderSeparator, linkComponent }) => {
  const icon = isFirst && showHomeIcon ? (
    <House className="size-4 mr-1" aria-hidden="true" />
  ) : item.icon;

  const renderIcon = icon && <span className="mr-1">{icon}</span>;

  // If item is a React element
  if (React.isValidElement(item)) {
    return (
      <Slot className={twMerge(isLast ? styles.current : styles.link)}>
        {item}
      </Slot>
    );
  }

  // For object items
  return isLast ? (
    <span aria-current="page" className={styles.current} itemProp="name">
      {renderIcon}
      {item.label}
    </span>
  ) : (
    <BreadcrumbLink
      linkComponent={linkComponent}
      href={item.href || '#'}
      itemProp="item"
    >
      {renderIcon}
      <span itemProp="name">{item.label}</span>
    </BreadcrumbLink>
  );
};

const Breadcrumbs = ({
  items,
  separator = 'slash',
  showHomeIcon = false,
  className = '',
  linkComponent,
}) => {
  try {
    breadcrumbsSchema.parse({ items, separator, showHomeIcon, className, linkComponent });
  } catch (error) {
    console.error('Breadcrumbs validation error:', error);
    return null;
  }

  const renderSeparator = () => {
    return separator === 'caret' 
      ? <CaretRight className="w-4 h-4 text-gray-400 mx-2" aria-hidden="true" />
      : <span className="mx-2 text-gray-400" aria-hidden="true">/</span>;
  };

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={className}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex flex-wrap items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li 
              key={index}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <BreadcrumbItem
                item={item}
                index={index}
                isLast={isLast}
                isFirst={isFirst}
                showHomeIcon={showHomeIcon}
                renderSeparator={renderSeparator}
                linkComponent={linkComponent}
              />
              {!isLast && renderSeparator()}
              <meta itemProp="position" content={index + 1} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 