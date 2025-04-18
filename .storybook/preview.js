import React from 'react';
import { Theme } from '@radix-ui/themes';
import '../src/styles/tailwind.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Theme>
      <div className="p-4">
        <Story />
      </div>
    </Theme>
  ),
]; 