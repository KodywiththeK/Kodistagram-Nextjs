import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
  children: React.ReactNode
  onClose: () => void
}

export default function PostModal({ onClose, children }: Props) {
  return (
    <section className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900/60" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button onClick={onClose} className="fixed right-8 top-8 p-2 opacity-100">
        <AiOutlineClose color="white" size={24} />
      </button>
      <div className="sm:3/5 h-4/5 w-4/5 max-w-7xl rounded bg-white py-2">{children}</div>
    </section>
  )
}
