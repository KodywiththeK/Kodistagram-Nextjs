import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
  children: React.ReactNode
  onClose: () => void
  isAuthor: boolean
}

export default function PostModal({ onClose, children, isAuthor }: Props) {
  return (
    <section className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900/60" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button onClick={onClose} className={`${isAuthor ? 'right-[55px]' : 'right-4'} fixed top-[14px] z-20 flex items-center rounded-lg border border-gray-300 bg-white px-2 py-1.5 opacity-100 shadow sm:right-8 sm:top-8 sm:bg-gray-700/50 sm:text-white`}>
        {'Close '}
        <AiOutlineClose size={22} />
      </button>
      <div className="relative h-full w-full max-w-7xl bg-white/90 py-2 sm:h-4/5 sm:rounded md:w-4/5 lg:w-3/5">{children}</div>
    </section>
  )
}
