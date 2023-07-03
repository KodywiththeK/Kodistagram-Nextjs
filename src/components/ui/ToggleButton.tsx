import React from 'react'

type Props = {
  toggled: boolean
  onToggle: () => void
  onIcon: React.ReactNode
  offIcon: React.ReactNode
}

export default function ToggleButton({ toggled, onToggle, onIcon, offIcon }: Props) {
  return <button onClick={onToggle}>{toggled ? onIcon : offIcon}</button>
}
