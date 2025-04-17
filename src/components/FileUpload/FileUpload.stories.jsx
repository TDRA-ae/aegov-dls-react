import * as React from 'react'
import * as Form from '@radix-ui/react-form'
import { FileUpload } from './FileUpload'
import { UploadSimple } from '@phosphor-icons/react'
export default {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'simple', 'withPreview', 'dragDrop'],
      description: 'The visual variant of the upload component'
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files that can be uploaded'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the upload is disabled'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    },
    acceptedFileTypes: {
      control: 'object',
      description: 'Object containing accepted MIME types'
    },
    onFilesSelected: {
      action: 'filesSelected',
      description: 'Callback when files are selected'
    }
  }
}

// Base template that wraps all stories with Form.Root
const Template = (args) => {
  console.log('FileUpload props:', args);
  return (
    <Form.Root className="w-full">
      <Form.Field name="file" disabled={args.disabled}>
        <FileUpload {...args} />
      </Form.Field>
    </Form.Root>
  )
}

const UploadLabel = ({ disabled }) => (
  <>
    <UploadSimple size={20} className={disabled ? 'opacity-50' : ''} />
    Upload file
  </>
)

// Update all story exports to use the template
export const Default = () => (
  <FileUpload
    variant="default"
    maxFiles={1}
    disabled={false}
    acceptedFileTypes={{
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    }}
    label={<UploadLabel disabled={false} />}
  />
)

export const Simple = {
  render: (args) => <Template {...args} />,
  args: {
    variant: 'simple',
    maxFiles: 1,
    disabled: false,
    acceptedFileTypes: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    }
  },
}

export const WithPreview = {
  render: (args) => <Template {...args} />,
  args: {
    variant: 'withPreview',
    maxFiles: 1,
    disabled: false,
    acceptedFileTypes: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    }
  },
}

export const DragDrop = {
  render: (args) => <Template {...args} />,
  args: {
    variant: 'dragDrop',
    maxFiles: 3,
    disabled: false,
    acceptedFileTypes: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    },
    label: 'Drag and drop files here'
  },
}

export const Disabled = {
  render: (args) => <Template {...args} />,
  args: {
    variant: 'default',
    maxFiles: 1,
    disabled: true,
    acceptedFileTypes: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    }
  },
}

export const MultipleFiles = {
  render: (args) => <Template {...args} />,
  args: {
    variant: 'dragDrop',
    maxFiles: 5,
    disabled: false,
    acceptedFileTypes: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    },
    label: 'Drag and drop files here'
  },
}

export const DocumentUpload = {
  render: (args) => <Template {...args} />,
  args: {
    variant: 'simple',
    maxFiles: 1,
    disabled: false,
    acceptedFileTypes: {
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': []
    },
    label: 'Upload documents'
  },
}

// Example of multiple fields in a form
export const WithinForm = () => (
  <Form.Root onSubmit={(e) => {
    e.preventDefault()
    console.log('Form submitted')
  }}>
    <div className="space-y-4">
      <Form.Field name="name">
        <Form.Label>Name</Form.Label>
        <Form.Control asChild>
          <input 
            type="text" 
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your name"
          />
        </Form.Control>
      </Form.Field>
      
      <Form.Field name="file" disabled={false}>
        <FileUpload 
          variant="simple" 
          maxFiles={1}
          disabled={false}
          onFilesSelected={(files) => console.log('Files selected:', files)}
        />
      </Form.Field>

      <button 
        type="submit"
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        Submit
      </button>
    </div>
  </Form.Root>
)

// Custom accepted files
export const CustomFileTypes = Template.bind({})
CustomFileTypes.args = {
  variant: 'default',
  maxFiles: 1,
  acceptedFileTypes: {
    'application/pdf': [],
  }
}

// All variants showcase
export const AllVariants = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Default Variant</h3>
        <Form.Root>
          <Form.Field name="file1" disabled={false}>
            <FileUpload variant="default" disabled={false} />
          </Form.Field>
        </Form.Root>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Simple Variant</h3>
        <Form.Root>
          <Form.Field name="file2">
            <FileUpload variant="simple" />
          </Form.Field>
        </Form.Root>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Preview Variant</h3>
        <Form.Root>
          <Form.Field name="file3">
            <FileUpload 
              variant="withPreview" 
              acceptedFileTypes={{
                'image/jpeg': [],
                'image/png': [],
                'image/gif': []
              }}
            />
          </Form.Field>
        </Form.Root>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Drag & Drop Variant</h3>
        <Form.Root>
          <Form.Field name="file4">
            <FileUpload variant="dragDrop" />
          </Form.Field>
        </Form.Root>
      </div>
    </div>
  )
}
