import React from 'react';
import { Root, Item, Header, Trigger, Content } from '@radix-ui/react-accordion';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { CaretDown } from '@phosphor-icons/react';

const accordonStyles = `
  @keyframes slideDown {
  from { height: 0 }
  to { height: var(--radix-accordion-content-height) }
  }
  @keyframes slideUp {
  from { height: var(--radix-accordion-content-height) }
  to { height: 0 }
  }
  .accordion-content[data-state='open'] {
  animation: slideDown 300ms ease-out;
  }

  .accordion-content[data-state='closed'] {
  animation: slideUp 300ms ease-out;
  }
`;

const AccordionItemSchema = z.object({
  value: z.string(),
  title: z.string(),
  children: z.any(),
  icon: z.any().optional(),
  iconRotateDeg: z.number().optional().default(180),
});

const AccordionSchema = z.object({
  items: z.array(AccordionItemSchema),
  multiple: z.boolean().optional(),
  defaultValue: z.union([z.string(), z.array(z.string())]).optional(),
  className: z.string().optional(),
  collapsible: z.boolean().optional(),
});

const AccordionItem = React.memo(React.forwardRef(({ value, title, children, icon: Icon = CaretDown, iconRotateDeg = 180 }, ref) => (
  <>
    <Item
      ref={ref}
      value={value}
      className="border-b border-gray-200 [.accordion-wrapper_&:last-child]:border-0"
    >
      <Header className="w-full">
        <Trigger className="group flex w-full items-center justify-between py-5 pe-2 ps-2 text-left text-base font-semibold text-gray-900 aria-expanded:text-aegold-500 hover:text-aegold-500 focus:text-aegold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
          {title}
          <Icon
            weight="bold"
            className="h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 group-hover:text-primary-600 group-data-[state=open]:[transform:rotate(var(--rotation-deg))]"
            style={{
              '--rotation-deg': `${iconRotateDeg}deg`,
              transition: 'transform 0.2s ease-out'
            }}
          />
        </Trigger>
      </Header>
      <Content className="accordion-content overflow-hidden">
        <div className="pb-4 pt-2 ps-2 pe-2 text-gray-700 [&_.accordion-wrapper]:px-4">
          {children}
        </div>
      </Content>
    </Item>
  </>
)));

AccordionItem.displayName = 'AccordionItem';

const Accordion = React.forwardRef((props, ref) => {
  const {
    items,
    multiple = false,
    defaultValue,
    className,
    collapsible = true,
    onValueChange,
    ...rest
  } = AccordionSchema.parse(props);

  return (
    <Root
      ref={ref}
      type={multiple ? 'multiple' : 'single'}
      defaultValue={defaultValue}
      collapsible={collapsible.toString()}
      className={twMerge('accordion-wrapper w-full', className)}
      onValueChange={onValueChange}
      {...rest}
    >
      <style>{accordonStyles}</style>
      {items.map((item) => (
        <AccordionItem key={item.value} {...item} />
      ))}
    </Root>
  );
});

Accordion.displayName = 'Accordion';

Accordion.defaultProps = {
  multiple: false,
  collapsible: true,
  className: '',
};


export default Accordion;
