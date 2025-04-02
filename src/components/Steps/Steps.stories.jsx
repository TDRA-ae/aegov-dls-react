import React from 'react'
import Steps from './Steps'

export default {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

const defaultSteps = [
  { label: 'Personal Info', href: '#1' },
  { label: 'Account Setup', href: '#2' },
  { label: 'Review', href: '#3' },
  { label: 'Complete', href: '#4' }
]

export const Default = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
  },
}

export const ProgressWithThreeSteps = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
  },
} 

export const WithLabels = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    showLabels: true,
  },
}

export const Small = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    size: 'sm',
  },
}

export const Large = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    size: 'lg',
  },
}

export const Vertical = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    orientation: 'vertical',
    showLabels: true,
  },
}

export const VerticalNoLabels = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    orientation: 'vertical',
    showLabels: false,
  },
}


const arabicSteps = [
  { label: 'المعلومات الشخصية', href: '#1' },
  { label: 'الإعداد المنصوص', href: '#2' },
  { label: 'المراجعة', href: '#3' },
  { label: 'الاكتمال', href: '#4' }
]
export const Arabic = {
  args: {
    steps: arabicSteps,
    currentStep: 2,
    showLabels: true,
    locale: 'ar',
    dir: 'rtl',
  },
}

export const Completed = {
  args: {
    steps: defaultSteps,
    currentStep: 4,
  },
}