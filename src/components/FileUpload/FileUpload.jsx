import * as React from 'react'
import { UploadSimple, X, Image } from '@phosphor-icons/react'
import { z } from 'zod'
import { useDropzone } from 'react-dropzone'
import Button from '../Button/Button'

// Constants
const DEFAULT_ACCEPTED_FILES = {
  'image/jpeg': [],
  'image/png': [],
  'image/gif': []
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 50MB

// Move schema creation inside component to access props
const createFileSchema = (maxFiles, acceptedFileTypes) => z.object({
  files: z.any()
    .refine((files) => files?.length > 0, 'Please select at least one file')
    .refine((files) => files?.length <= maxFiles, `You can only upload up to ${maxFiles} files`)
    .refine((files) => {
      return Array.from(files).every(file => 
        Object.keys(acceptedFileTypes).includes(file.type)
      )
    }, `Only ${Object.keys(acceptedFileTypes).map(type => type.split('/')[1].toUpperCase()).join(', ')} files are allowed`)
    .refine((files) => {
      return Array.from(files).every(file => file.size <= MAX_FILE_SIZE)
    }, 'Files must be less than 50MB')
})

// Variant Components
const SimpleVariant = ({ fileInputRef, disabled, acceptedFileTypes, maxFiles, handleFileSelect, selectedFiles }) => (
  <div className="w-full">
    <div className={`flex border rounded-lg overflow-hidden ${disabled ? 'opacity-50' : ''}`}>
      <label>
        <Button
          disabled={disabled}
          style="primary"
          variant="link"
          className={`h-full px-4 py-2 rounded-none border-r ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          asChild
        >
          <span className={`cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
            Choose File
            <input
              ref={fileInputRef}
              type="file"
              accept={Object.keys(acceptedFileTypes).join(',')}
              multiple={maxFiles > 1}
              onChange={handleFileSelect}
              disabled={disabled}
              className="hidden"
            />
          </span>
        </Button>
      </label>
      <div className={`flex-1 px-4 py-2 text-gray-500 ${disabled ? 'opacity-50' : ''}`}>
        {selectedFiles.length > 0 ? selectedFiles[0].name : 'No file chosen'}
      </div>
    </div>
  </div>
)

const PreviewVariant = ({ fileInputRef, disabled, handleFileSelect, previewUrl }) => (
  <div className="flex items-center gap-3">
    <div className={`h-12 w-12 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden ${disabled ? 'opacity-50' : ''}`}>
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
      ) : (
        <Image size={24} className={`text-gray-400 ${disabled ? 'opacity-50' : ''}`} />
      )}
    </div>
    <label>
      <Button 
        disabled={disabled}
        style="primary"
        variant="solid"
        className={disabled ? 'opacity-50 cursor-not-allowed' : ''}
        asChild
      >
        <span className={`flex items-center gap-2 cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
          <UploadSimple size={20} className={disabled ? 'opacity-50' : ''} />
          Upload an image
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={false}
            onChange={handleFileSelect}
            disabled={disabled}
            className="hidden"
          />
        </span>
      </Button>
    </label>
  </div>
)

const DragDropVariant = ({ getRootProps, getInputProps, isDragActive, disabled, fileInputRef, acceptedFileTypes, maxFiles }) => (
  <div
    {...getRootProps()}
    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
      ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
      ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:border-primary-500'}`}
  >
    <label className="flex flex-col items-center">
      <UploadSimple 
        size={32} 
        className={`mb-2 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`} 
      />
      <span className={`font-semibold ${isDragActive ? 'text-primary-600' : 'text-gray-600'}`}>
        {isDragActive ? 'Drop files here...' : 'Upload files'}
      </span>
      <input {...getInputProps()} ref={fileInputRef} />
      <span className={`text-gray-500 mt-1 ${disabled ? 'opacity-50' : ''}`}>
        {maxFiles > 1 ? `Up to ${maxFiles} files` : 'Single file'}
      </span>
      <p className={`text-xs text-gray-400 mt-2 ${disabled ? 'opacity-50' : ''}`}>
        Accepts {Object.keys(acceptedFileTypes).map(type => type.split('/')[1].toUpperCase()).join(', ')} up to 50MB
      </p>
    </label>
  </div>
)

const DefaultVariant = ({ fileInputRef, disabled, acceptedFileTypes, maxFiles, handleFileSelect }) => (
  <label>
    <Button
      disabled={disabled}
      style="primary"
      variant="solid"
      className={disabled ? 'opacity-50 cursor-not-allowed' : ''}
      asChild
    >
      <span className={`flex items-center gap-2 cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
        <UploadSimple size={20} className={disabled ? 'opacity-50' : ''} />
        Upload file
        <input
          ref={fileInputRef}
          type="file"
          accept={Object.keys(acceptedFileTypes).join(',')}
          multiple={maxFiles > 1}
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
        />
      </span>
    </Button>
  </label>
)

export function FileUpload({ 
  variant = 'default',
  onFilesSelected,
  maxFiles = 1,
  disabled = false,
  className = '',
  acceptedFileTypes = DEFAULT_ACCEPTED_FILES
}) {
  // State and refs
  const [selectedFiles, setSelectedFiles] = React.useState([])
  const [error, setError] = React.useState('')
  const [previewUrl, setPreviewUrl] = React.useState(null)
  const fileInputRef = React.useRef(null)
  
  // Validation schema - now using acceptedFileTypes from props
  const fileSchema = React.useMemo(
    () => z.object({
      files: z.any()
        .refine((files) => files?.length > 0, 'Please select at least one file')
        .refine((files) => {
          return Array.from(files).every(file => 
            Object.keys(acceptedFileTypes).includes(file.type)
          )
        }, `Only ${Object.keys(acceptedFileTypes).map(type => type.split('/')[1].toUpperCase()).join(', ')} files are allowed`)
        .refine((files) => {
          return Array.from(files).every(file => file.size <= MAX_FILE_SIZE)
        }, 'Files must be less than 50MB')
    }),
    [acceptedFileTypes]
  )

  // Dropzone configuration
  const onDrop = React.useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles?.length > 0) {
      // Handle rejected files
      const error = rejectedFiles[0].errors[0];
      if (error.code === 'file-too-large') {
        setError('File is too large (max 50MB)');
      } else if (error.code === 'file-invalid-type') {
        setError(`Only ${Object.keys(acceptedFileTypes).map(type => type.split('/')[1].toUpperCase()).join(', ')} files are allowed`);
      } else {
        setError(error.message);
      }
      return;
    }

    handleFiles(acceptedFiles);
  }, [acceptedFileTypes, handleFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedFileTypes,
    maxSize: MAX_FILE_SIZE,
    disabled,
    maxFiles: maxFiles - selectedFiles.length,
    onDrop,
    noClick: variant !== 'dragDrop',
    multiple: maxFiles > 1
  })

  // Variant validation
  React.useEffect(() => {
    if (variant === 'withPreview') {
      if (maxFiles !== 1) {
        console.warn('withPreview variant only supports single file upload')
      }
      if (!Object.keys(acceptedFileTypes).every(type => type.startsWith('image/'))) {
        console.warn('withPreview variant only supports image files')
      }
    }
  }, [variant, maxFiles, acceptedFileTypes])

  // Cleanup preview URL
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Handlers
  const handleFiles = React.useCallback((files) => {
    try {
      if (!files || files.length === 0) {
        return;
      }

      // Check if adding new files would exceed maxFiles limit
      if (selectedFiles.length + files.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} files`);
        return;
      }

      const fileArray = Array.from(files);
      
      // Validate file types
      const invalidTypeFile = fileArray.find(file => 
        !Object.keys(acceptedFileTypes).includes(file.type)
      );
      if (invalidTypeFile) {
        setError(`Only ${Object.keys(acceptedFileTypes).map(type => type.split('/')[1].toUpperCase()).join(', ')} files are allowed`);
        return;
      }

      // Validate file sizes
      const oversizedFile = fileArray.find(file => file.size > MAX_FILE_SIZE);
      if (oversizedFile) {
        setError('Files must be less than 50MB');
        return;
      }

      setSelectedFiles(prev => [...prev, ...fileArray]);
      setError('');
      onFilesSelected?.(fileArray);

      if (variant === 'withPreview' && fileArray[0]) {
        const url = URL.createObjectURL(fileArray[0]);
        setPreviewUrl(url);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [maxFiles, selectedFiles.length, acceptedFileTypes, variant, onFilesSelected]);

  const handleFileSelect = (event) => {
    handleFiles(event.target.files)
  }

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (variant === 'withPreview') {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      setPreviewUrl(null)
    }
  }

  // File list renderer
  const renderFileList = () => {
    return selectedFiles.map((file, index) => (
      <div key={index} className="flex items-center gap-2 mt-2 text-sm text-gray-600">
        <button
          onClick={() => removeFile(index)}
          className="p-1 text-red-500 hover:text-red-700 rounded-full"
          aria-label="Remove file"
        >
          <X size={16} weight="bold" />
        </button>
        <span className="truncate">{file.name}</span>
      </div>
    ))
  }

  // Variant renderer
  const renderVariant = () => {
    const commonProps = {
      fileInputRef,
      disabled,
      acceptedFileTypes,
      maxFiles,
      handleFileSelect,
      selectedFiles,
      previewUrl,
      getRootProps,
      getInputProps,
      isDragActive
    }

    switch (variant) {
      case 'simple':
        return <SimpleVariant {...commonProps} />
      case 'withPreview':
        return <PreviewVariant {...commonProps} />
      case 'dragDrop':
        return <DragDropVariant {...commonProps} />
      default:
        return <DefaultVariant {...commonProps} />
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {renderVariant()}
      {renderFileList()}
      {error && (
        <p className="text-sm text-red-500 mt-2">
          {error}
        </p>
      )}
    </div>
  )
} 

export default FileUpload;