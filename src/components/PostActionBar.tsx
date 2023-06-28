import { parseDate } from '@/util/parseDate'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'

type Props = {
  username: string
  likes: string[]
  text?: string
  createdAt: string
  onClick?: (x: boolean) => void
}

export default function PostActionBar({ username, likes, text, createdAt, onClick }: Props) {
  return (
    <>
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2">
          <button>
            <AiOutlineHeart size={22} />
          </button>
          <p className="text-sm font-bold ">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        </div>
        <button>
          <BsBookmark size={20} />
        </button>
      </div>
      <div className="px-2 py-1 text-sm">
        {text && (
          <p className="flex gap-1.5">
            <span className="font-bold">{username}</span>
            <span onClick={() => onClick && onClick(true)} className="cursor-pointer">
              {text}
            </span>
          </p>
        )}
        <p className="my-2 text-xs uppercase text-neutral-500">{parseDate(createdAt)}</p>
      </div>
    </>
  )
}
