import React from 'react'
import Tooltip from './Tooltip'
import Button from '../Button/Button'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
}

export const Basic = {
  args: {
    children: <Button>Hover me</Button>,
    content: 'This is a basic tooltip',
  },
}

export const Placement = () => (
  <div className="flex flex-wrap gap-4">
    <Tooltip content="Tooltip on top" side="top">
      <Button>Top</Button>
    </Tooltip>
    <Tooltip content="Tooltip on right" side="right">
      <Button>Right</Button>
    </Tooltip>
    <Tooltip content="Tooltip on bottom" side="bottom">
      <Button>Bottom</Button>
    </Tooltip>
    <Tooltip content="Tooltip on left" side="left">
      <Button>Left</Button>
    </Tooltip>
  </div>
)
