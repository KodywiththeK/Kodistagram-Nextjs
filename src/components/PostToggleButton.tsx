import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'

type Props = {
  username: string
  buttons: {
    name: string
    onClick: () => void
  }[]
}

export default function PostToggleButton({ username, buttons }: Props) {
  const { data } = useSession()
  const [showActions, setShowActions] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleToggleActions = () => {
    setShowActions(!showActions)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowActions(false)
      }
    }
    const handleScroll = (): void => {
      setShowActions(false)
    }
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef}>
      {username === data?.user.username && <BsThreeDots size={22} onClick={handleToggleActions} className=" box-content cursor-pointer p-4" />}
      {showActions && (
        <div className="absolute right-2 top-10 z-10 mt-2 w-[100px] overflow-hidden rounded-lg border-[0.5px] border-gray-300 bg-white shadow-xl">
          {buttons.map(({ name, onClick }) => (
            <button
              key={name}
              onClick={() => {
                onClick()
                setShowActions(false)
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
