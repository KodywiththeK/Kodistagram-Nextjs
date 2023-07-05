import React from 'react'

type Props = {
  text: string
  onClick: () => void
  red?: boolean
  children?: React.ReactNode
  disabled: boolean
}

export default function Button({ text, onClick, red = true, children, disabled }: Props) {
  return (
    <button disabled={disabled} onClick={() => onClick()} className={`flex w-[120px] items-center justify-center rounded-md border-none py-2 font-bold leading-4 text-white sm:w-[140px] ${red ? 'bg-red-500 disabled:bg-red-300' : 'bg-sky-500 disabled:bg-sky-300'}`}>
      {children ? children : text}
    </button>
  )
}
