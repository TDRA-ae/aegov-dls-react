import React from 'react';
import { PopoverRoot, PopoverTrigger, PopoverContent } from './Popover'
import { List } from '@phosphor-icons/react';

export default {
  title: 'Components/Popover',
  component: PopoverRoot,
  parameters: {
    layout: 'centered',
  },
};

export const Basic = () => (
  <PopoverRoot>
    <PopoverTrigger asChild>
      <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
        <List className="mr-2 h-4 w-4" />
        Open Popover
      </button>
    </PopoverTrigger>
    <PopoverContent>
      <div className="flex flex-col gap-4">
        <h4 className="text-lg font-semibold text-gray-900">Popover Title</h4>
        <p className="text-sm text-gray-500">
          This is a description text that can contain any content you want to display in the popover
        </p>
        <div className="flex justify-end">
          <button className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
            Action
          </button>
        </div>
      </div>
    </PopoverContent>
  </PopoverRoot>
);

export const WithForm = () => (
  <PopoverRoot>
    <PopoverTrigger asChild>
      <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
        <List className="mr-2 h-4 w-4" />
        Settings
      </button>
    </PopoverTrigger>
    <PopoverContent>
      <form className="flex flex-col gap-4">
        <h4 className="text-lg font-semibold text-gray-900">Preferences</h4>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Save
          </button>
        </div>
      </form>
    </PopoverContent>
  </PopoverRoot>
);

export const Positions = () => (
  <div className="flex gap-4">
    {['top', 'right', 'bottom', 'left'].map((side) => (
      <PopoverRoot key={side}>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            {side}
          </button>
        </PopoverTrigger>
        <PopoverContent side={side}>
          <p className="text-sm text-gray-500">
            This popover appears on the {side}
          </p>
        </PopoverContent>
      </PopoverRoot>
    ))}
  </div>
); 