import React from 'react';
import { Quotes } from '@phosphor-icons/react';
import Blockquote from './Blockquote';

export default {
  title: 'Components/Blockquote',
  component: Blockquote,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

const sampleQuote = "The confidence of our wise leadership serves as motivation for more sincere and sustained action directed to serve our cherished homeland, which reflects a renewed incentive to continue with progress and advancement under the wise leadership of His Highness Sheikh Mohamed bin Zayed Al Nahyan, UAE President, and His Highness Sheikh Mohammed bin Rashid Al Maktoum, Vice President and Prime Minister of the UAE and Ruler of Dubai and their Highnesses, Members of the Supreme Council and Rulers of the Emirates.";

export const Default = {
  args: {
    children: sampleQuote,
    cite: 'https://mohap.gov.ae/en/about-us/minister-message',
    style: 'soft'
  },
};

export const WithAuthor = {
  args: {
    children: sampleQuote,
    cite: 'https://mohap.gov.ae/en/about-us/minister-message',
    author: 'AbdulRahman Bin Mohammed Al Owais',
    authorTitle: 'Minister of Health & Prevention',
    style: 'soft'
  },
};

export const Solid = {
  args: {
    children: sampleQuote,
    cite: 'https://mohap.gov.ae/en/about-us/minister-message',
    author: 'AbdulRahman Bin Mohammed Al Owais',
    authorTitle: 'Minister of Health & Prevention',
    style: 'solid'
  },
};

export const ShortQuote = {
  args: {
    children: "Innovation is the key to our future success.",
    cite: 'https://example.com',
    author: 'John Doe',
    authorTitle: 'Innovation Director',
    style: 'soft'
  },
}; 