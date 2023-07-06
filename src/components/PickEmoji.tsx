import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { BsEmojiSmile } from 'react-icons/bs'

type Props = {
  setText: (x: string) => void
  text: string
}

export default function PickEmoji({ text, setText }: Props) {
  const emojiRef = useRef<HTMLDivElement>(null)
  const [showEmoji, setShowEmoji] = useState(false)
  const [chosenEmoji, setChosenEmoji] = useState<null | EmojiClickData>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowEmoji(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleEmojiPicker = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setShowEmoji(!showEmoji)
  }
  const handleEmojiClick = (object: EmojiClickData) => {
    setChosenEmoji(object)
    setText(text + String(chosenEmoji?.emoji))
  }

  return (
    <div ref={emojiRef} className="flex items-center justify-center">
      <button onClick={(e) => handleEmojiPicker(e)} className="box-content px-1 py-2">
        <BsEmojiSmile size={18} />
      </button>
      {showEmoji && (
        <div className="absolute bottom-12 left-0">
          <EmojiPicker width={'300px'} onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  )
}
