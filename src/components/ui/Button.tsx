import React from 'react'

type Props = {
  text: string
  onClick: () => void
  red?: boolean
}

export default function Button({ text, onClick, red = true }: Props) {
  return (
    <button onClick={() => onClick()} className={`rounded-md border-none px-8 py-2 font-bold leading-4 text-white ${red ? 'bg-red-500' : 'bg-sky-500'}`}>
      {text}
    </button>
  )
}
