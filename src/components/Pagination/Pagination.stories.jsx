import React from 'react';
import Pagination from './Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current active page',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show/hide first and last page buttons',
    },
    onPageChange: { action: 'page changed' },
  },
};

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentPage: 3,
  totalPages: 17,
  showFirstLast: false,
};

export const WithFirstLast = Template.bind({});
WithFirstLast.args = {
  currentPage: 3,
  totalPages: 17,
  showFirstLast: true,
};

export const FewPages = Template.bind({});
FewPages.args = {
  currentPage: 2,
  totalPages: 5,
  showFirstLast: false,
};

export const ManyPages = Template.bind({});
ManyPages.args = {
  currentPage: 50,
  totalPages: 100,
  showFirstLast: true,
}; 