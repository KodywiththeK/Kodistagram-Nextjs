import React from 'react'
import { BsEmojiSmile } from 'react-icons/bs'

export default function CommentForm() {
  return (
    <form className="flex w-full items-center justify-between gap-2 border-t border-neutral-300 px-3 py-1">
      <BsEmojiSmile size={18} />
      <input className="grow rounded p-2 outline-none" type={'text'} placeholder="Add a comment..." />
      <button className="font-bold text-sky-500">Post</button>
    </form>
  )
}
