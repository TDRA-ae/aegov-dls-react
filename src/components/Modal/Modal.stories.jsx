import React from 'react'
import Modal from './Modal'
import Button from '../Button/Button'
import { Check, Warning } from '@phosphor-icons/react'
import { Close } from '@radix-ui/react-dialog'

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
}

export const Simple = () => {
  return (
    <Modal 
      title="Hello"
      trigger={<Button variant="solid">Open Modal</Button>}
    >
      <div className="space-y-4">
        <p className="text-gray-600">To close the modal, you can use any of the following methods:</p>
        <ul className="list-decimal space-y-2 ml-4 text-gray-600">
          <li>Press the "ESC" key on your keyboard</li>
          <li>Click the close button</li>
          <li>Click outside the modal</li>
        </ul>
        <div className="flex justify-end gap-3 mt-6">
          <Close asChild>
            <Button>Close</Button>
          </Close>
        </div>
      </div>
    </Modal>
  )
}

export const Success = () => {
  return (
    <Modal 
      size="sm"
      trigger={<Button variant="solid">Success Modal</Button>}
    >
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Payment successful</h3>
        <p className="mt-2 text-gray-600">
          Your payment has been successfully processed
        </p>
        <Close asChild>
          <Button className="w-full mt-6" variant="solid">Continue</Button>
        </Close>
      </div>
    </Modal>
  )
}

export const Alert = () => {
  return (
    <Modal 
      variant="danger"
      trigger={<Button variant="outline">Alert Modal</Button>} 
    >
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0">
          <Warning className="h-8 w-8 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left rtl:text-right rtl:sm:ml-0 rtl:sm:mr-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Deactivate account
          </h3>
          <p className="mt-2 text-gray-600">
            Are you sure you want to deactivate your account? All of your data will be permanently removed.
            This action cannot be undone.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Close asChild>
          <Button variant="soft">Cancel</Button>
        </Close>
        <Close asChild>
          <Button variant="solid">Deactivate</Button>
        </Close>
      </div>
    </Modal>
  )
}

export const BottomRight = () => {
  return (
    <Modal
      title="Deactivate account"
      trigger={<Button variant="solid">Open Bottom Right Modal</Button>}
      className="left-auto right-6 top-auto bottom-6 translate-x-0 translate-y-0"
      size="xl"
    >
      <div className="flex items-start">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
          <Check className="h-8 w-8 text-yellow-700" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-yellow-900">Deactivate account</h3>
          <p className="mt-2 text-yellow-800">
            Are you sure you want to deactivate your account? Our site enables scripts (e.g. cookies) that are able to read, store, and write information on your browser and device. The information processed by this script includes data relating to you, which may include personal identifiers.
          </p>
          <p className="mt-4 text-yellow-800">
            We use this information for various purposes - e.g. to deliver content, maintain security, enable user choice, improve our sites, and for marketing purposes. You may choose to accept or deny using our website accordingly. Learn more by visiting our Privacy Policy.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Close asChild>
          <Button variant="outline">Deny and quit</Button>
        </Close>
        <Close asChild>
          <Button variant="solid">Allow all and accept</Button>
        </Close>
      </div>
    </Modal>
  )
} 