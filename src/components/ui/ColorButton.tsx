import React from 'react'

type Props = {
  text: string
  onClick: () => void
}

export default function ColorButton({ text, onClick }: Props) {
  return (
    <button onClick={onClick} className="instagram-gradient box-border rounded-lg p-[3px]">
      <div className="whitespace-nowrap rounded-md bg-gray-100 bg-opacity-90 p-[6px] text-[12px] sm:text-[16px]">{text}</div>
    </button>
  )
}
