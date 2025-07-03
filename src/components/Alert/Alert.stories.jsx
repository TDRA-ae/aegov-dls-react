import React from 'react';
import { Alert } from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
    },
    style: {
      control: 'select',
      options: ['soft', 'solid'],
    },
    showIcon: {
      control: 'boolean',
    },
  },
};

const Template = (args) => <Alert {...args} />;

export const Info = Template.bind({});
Info.args = {
  variant: 'info',
  children: "The conference starts at 10:00 AM in Hall B. Don't be late!",
  showIcon: false,
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  children: 'Your password will expire in 3 days. Consider updating it now.',
  showIcon: false,
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  children: 'Your payment was processed successfully. Thank you!',
  showIcon: false,
};

export const Error = Template.bind({});
Error.args = {
  variant: 'error',
  children: 'Unable to connect to the server. Please try again later or contact support.',
  showIcon: false,
};


export const InfoWithIcon = Template.bind({});
InfoWithIcon.args = {
  variant: 'info',
  children: "The conference starts at 10:00 AM in Hall B. Don't be late!",
};

export const WarningWithIcon = Template.bind({});
WarningWithIcon.args = {
  variant: 'warning',
  children: 'Your password will expire in 3 days. Consider updating it now.',
};

export const SuccessWithIcon = Template.bind({});
SuccessWithIcon.args = {
  variant: 'success',
  children: 'Your payment was processed successfully. Thank you!',
};

export const ErrorWithIcon = Template.bind({});
ErrorWithIcon.args = {
  variant: 'error',
  children: 'Unable to connect to the server. Please try again later or contact support.',
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  variant: 'error',
  title: 'There were 3 errors that were encountered regarding your registration',
  children: (
    <ul className="list-disc mt-3 space-y-2 ps-4">
      <li>Your password must be at least 8 characters</li>
      <li>Your password must include at least 1 numeric value</li>
      <li>Your last name is blank. Kindly add your last name to proceed with the registration.</li>
    </ul>
  ),
};

export const WithAction = Template.bind({});
WithAction.args = {
  variant: 'warning',
  children: 'Your password will expire in 3 days. Consider updating it now.',
  action: {
    text: 'Change password',
    href: '#',
  },
};

export const WithDismiss = Template.bind({});
WithDismiss.args = {
  variant: 'info',
  children: "The conference starts at 10:00 AM in Hall B. Don't be late!",
  onDismiss: () => console.log('Alert dismissed'),
};

export const Solid = Template.bind({});
Solid.args = {
  variant: 'error',
  style: 'solid',
  children: 'Unable to connect to the server. Please try again later or contact support.',
};

// export const Large = Template.bind({});
// Large.args = {
//   variant: 'success',
//   size: 'lg',
//   children: 'Your payment was processed successfully. Thank you!',
// };

// export const Small = Template.bind({});
// Small.args = {
//   variant: 'info',
//   size: 'sm',
//   children: 'The conference starts at 10:00 AM in Hall B.',
// };

export const Complex = Template.bind({});
Complex.args = {
  variant: 'error',
  title: 'Oh snap! there seems to be a road block',
  children: (
    <>
      <p>So this is embarrassing, but looks that we have come across an unexpected situation causing a system error. We have logged this event and will be looking into fixing this.</p>
      <p className="mt-2">In the meantime, you may also report this as an error using our feedback system.</p>
      <div className="mt-6 flex items-center space-x-6">
        <a href="#" className="font-bold underline underline-offset-1 hover:underline hover:underline-offset-2">
          Report this error
        </a>
        <a href="#" className="font-bold underline underline-offset-1 hover:underline hover:underline-offset-2">
          Capture a screenshot
        </a>
      </div>
    </>
  ),
};

export const DismissibleInfo = Template.bind({});
DismissibleInfo.args = {
  variant: 'info',
  children: <p>This is a warning that can be closed. Please take necessary action if required.</p>,
  onDismiss: () => alert('Alert dismissed'),
};

export const DismissibleError = Template.bind({});
DismissibleError.args = {
  variant: 'error',
  children: <p>This is a warning that can be closed. Please take necessary action if required.</p>,
  onDismiss: () => alert('Alert dismissed'),
};

export const DismissibleSuccess = Template.bind({});
DismissibleSuccess.args = {
  variant: 'success',
  children: <p>This is a warning that can be closed. Please take necessary action if required.</p>,
  onDismiss: () => alert('Alert dismissed'),
};

export const DismissibleWarning = Template.bind({});
DismissibleWarning.args = {
  variant: 'warning',
  children: <p>This is a warning that can be closed. Please take necessary action if required.</p>,
  onDismiss: () => alert('Alert dismissed'),
};
