import React from 'react';
import { Root, Trigger, Portal, Content, Item, ItemIndicator, Separator, Label, Group } from '@radix-ui/react-dropdown-menu';
import { CaretDown, Check } from '@phosphor-icons/react';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

const DropdownItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.any().optional(),
});

const DropdownGroupSchema = z.object({
  label: z.string().optional(),
  items: z.array(DropdownItemSchema),
});

const DropdownSchema = z.object({
  groups: z.array(DropdownGroupSchema),
  className: z.string().optional(),
  align: z.enum(['start', 'center', 'end']).optional(),
  side: z.enum(['top', 'right', 'bottom', 'left']).optional(),
  onSelect: z.function().optional(),
  header: z.any().optional(),
});

const DropdownItem = React.forwardRef(({ label, value, icon: Icon, onSelect }, ref) => (
  <Item
    ref={ref}
    value={value}
    className={`
      relative flex items-center gap-3 px-3 py-3 text-sm text-gray-700 outline-none transition-colors 
      hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 
      disabled:pointer-events-none disabled:opacity-50
    `}
    onSelect={onSelect}
  >
    {Icon && <Icon className="h-4 w-4" weight="regular" />}
    {label}
    <ItemIndicator className="absolute right-2 flex h-4 w-4 items-center justify-center">
      <Check className="h-4 w-4 text-primary-600" weight="bold" />
    </ItemIndicator>
  </Item>
));

DropdownItem.displayName = 'DropdownItem';

const Dropdown = React.forwardRef(({ children, groups, className, align = 'start', side = 'bottom', onSelect, header, ...rest }, ref) => {
  DropdownSchema.parse({ groups, className, align, side, onSelect, header });

  return (
    <Root>
      <Trigger asChild>
        <div>{children}</div>
      </Trigger>

      <Portal>
        <Content
          ref={ref}
          align={align}
          side={side}
          className={twMerge(
            'z-50 min-w-[300px] overflow-hidden rounded-lg bg-white border border-gray-200 p-1 shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 max-h-60 overflow-y-auto',
            className
          )}
          {...rest}
        >
          {header && (
            <>
              <div className="px-4 py-3 border-b border-gray-100 mb-1">{header}</div>
            </>
          )}
          {groups.map((group, groupIndex) => (
            <Group key={groupIndex}>
              {group.label && (
                <Label className="px-3 py-2 text-xs font-medium text-gray-500 rtl:text-right">
                  {group.label}
                </Label>
              )}
              {group.items.map((item, itemIndex) => (
                <React.Fragment key={item.value}>
                  <DropdownItem {...item} onSelect={() => onSelect?.(item.value)} />
                </React.Fragment>
              ))}
              {groupIndex < groups.length - 1 && (
                <Separator className="my-1 h-px bg-gray-100" />
              )}
            </Group>
          ))}
        </Content>
      </Portal>
    </Root>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown; 