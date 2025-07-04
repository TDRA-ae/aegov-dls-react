import React from 'react';
import Card from './Card';
import { Note, CaretRight, Bookmark } from '@phosphor-icons/react';
import { twMerge } from 'tailwind-merge';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'news', 'service', 'creative'],
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
    },
    bordered: {
      control: 'boolean',
    },
    glow: {
      control: 'boolean',
    },
  },
};

// Default Card
export const Default = {
  args: {
    bordered: true,
    children: (
      <>
        <Note className="text-primary-500 w-10 h-10" />
        <h5 className="text-h5 font-extrabold">The title of the card</h5>
        <p>The description of a card, and this may be variable based on the device or width of the viewport.</p>
        <Card.Link href="#">View details</Card.Link>
      </>
    ),
  },
};

// News Card
export const NewsCard = {
  args: {
    variant: 'news',
    bordered: true,
    glow: true,
    children: (
      <>
        <a href="#">
          <img 
            src="https://placehold.co/800x400/png" 
            alt="News" 
            className="w-full h-auto rounded-xl"
          />
        </a>
        <div className="py-6 space-y-6">
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span>11th Jun 2023</span>
            <a href="#" className="hover:text-primary-600">Press release</a>
          </div>
          <h5 className="text-h5 font-extrabold line-clamp-3">
            TDRA empowers youth for a sustainable future through "Digital Skills Forum"
          </h5>
          <p className="line-clamp-3">
            In alignment with the UAE government's visionary theme for 2023, "Today for Tomorrow," 
            the forum epitomized TDRA's dedication to fostering the next generation of leaders.
          </p>
          <Card.Link href="#">View details</Card.Link>
        </div>
      </>
    ),
  },
};

// Service Card
export const ServiceCard = {
  args: {
    variant: 'service',
    bordered: true,
    glow: true,
    children: (
      <>
        <h5 className="text-h5 font-extrabold">
          <a href="#" className="text-gray-800 hover:text-primary-800">
            Issuance of a vehicle registration
          </a>
        </h5>
        <p>
          Through this service, you may register a vehicle, the license for the vehicle 
          and the number plate issued to the driver.
        </p>
        <div className="flex items-center justify-between gap-4">
          <Card.Link href="#">Start service</Card.Link>
          <button className="text-primary-600 hover:text-primary-500">
            <Bookmark className="w-8 h-8" />
          </button>
        </div>
      </>
    ),
  },
};

// Creative Card
export const CreativeCard = {
  args: {
    variant: 'creative',
    children: (
      <>
        <img 
          src="https://placehold.co/800x600/png" 
          alt="Creative" 
          className="w-full h-[33.5rem] object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 p-7">
          <h2 className="text-[2.5rem] leading-[1.15] font-extrabold text-white">
            Empowering women in tech and science
          </h2>
        </div>
      </>
    ),
  },
};

// Card Sizes
export const Sizes = () => (
  <div className="space-y-4">
    <Card size="sm" bordered>
      <Note className="text-primary-500 w-7 h-7" />
      <h6 className="text-h6 font-extrabold">Small Card</h6>
      <p>A small sized card with compact content.</p>
      <Card.Link href="#">View details</Card.Link>
    </Card>
    
    <Card size="base" bordered>
      <Note className="text-primary-500 w-10 h-10" />
      <h5 className="text-h5 font-extrabold">Base Card</h5>
      <p>A base sized card with standard content.</p>
      <Card.Link href="#">View details</Card.Link>
    </Card>
    
    <Card size="lg" bordered>
      <Note className="text-primary-500 w-14 h-14" />
      <h4 className="text-h4 font-extrabold">Large Card</h4>
      <p>A large sized card with expanded content.</p>
      <Card.Link href="#">View details</Card.Link>
    </Card>
  </div>
);

// Stacked Cards
export const StackedCards = () => (
  <div className="space-y-8">
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Horizontal Stack (Collapsed)</h3>
      <Card.Stack direction="horizontal" collapsed>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white" bordered>
            <Note className="text-primary-500 w-10 h-10" />
            <h5 className="text-h5 font-extrabold">Card {i}</h5>
            <p>A card in a collapsed stack.</p>
            <Card.Link href="#">View details</Card.Link>
          </Card>
        ))}
      </Card.Stack>
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Vertical Stack (Collapsed)</h3>
      <Card.Stack direction="vertical" collapsed>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white" bordered>
            <Note className="text-primary-500 w-10 h-10" />
            <h5 className="text-h5 font-extrabold">Card {i}</h5>
            <p>A card in a collapsed stack.</p>
            <Card.Link href="#">View details</Card.Link>
          </Card>
        ))}
      </Card.Stack>
    </div>
  </div>
);


// Stacked Cards
export const ArabicHorizontalStack = () => (
  <div className="space-y-8" dir="rtl">
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Horizontal Stack (Collapsed)</h3>
      <Card.Stack direction="horizontal" collapsed>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white" bordered>
            <Note className="text-primary-500 w-10 h-10" />
            <h5 className="text-h5 font-extrabold">Card {i}</h5>
            <p>A card in a collapsed stack.</p>
            <Card.Link href="#">View details</Card.Link>
          </Card>
        ))}
      </Card.Stack>
    </div>
  </div>
);


// Cards with Gap
export const CardsWithGap = () => (
  <Card.Stack direction="horizontal" gap={4}>
    {[1, 2, 3].map((i) => (
      <Card key={i} className="bg-white" bordered>
        <Note className="text-primary-500 w-10 h-10" />
        <h5 className="text-h5 font-extrabold">Card {i}</h5>
        <p>A card with gap spacing.</p>
        <Card.Link href="#">View details</Card.Link>
      </Card>
    ))}
  </Card.Stack>
);

// Card with Image on Left
export const ImageOnLeft = {
  args: {
    bordered: true,
    className: 'p-0',
    children: (
      <div className="flex flex-col md:flex-row items-stretch gap-0">
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
            alt="Plant growing on keyboard"
            className="object-cover w-full h-40 md:h-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8 w-full">
          <span className="text-sm font-semibold text-gray-500 mb-2">What's new</span>
          <h3 className="text-h4 font-extrabold mb-3">Sustainable by design</h3>
          <p className="text-base text-gray-700 mb-6">Sustainable web design is the practice of designing and developing websites that have a low environmental impact.</p>
          <Card.Link href="#" className="text-primary-700 font-semibold">Read More</Card.Link>
        </div>
      </div>
    ),
  },
}; 