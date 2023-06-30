'use client'
import { ProfileUser } from '@/model/user'
import React, { useState } from 'react'
import useSWR from 'swr'
import PostGrid from './PostGrid'
import BookmarkIcon from './ui/icons/BookmarkIcon'
import HeartIcon from './ui/icons/HeartIcon'
import PostIcon from './ui/icons/PostIcon'

type Props = {
  user: ProfileUser
}

const tabs = [
  { type: 'posts', icon: <PostIcon /> },
  { type: 'saved', icon: <BookmarkIcon className="h-4 w-4" /> },
  { type: 'liked', icon: <HeartIcon className="h-4 w-4" /> },
]

export default function UserPosts({ user: { username } }: Props) {
  // /api/users/${username}/posts
  // /api/users/${username}/liked
  // /api/users/${username}/bookmarks
  const [query, setQuery] = useState(tabs[0].type)

  return (
    <section>
      <ul className="flex justify-around uppercase sm:justify-center sm:gap-28">
        {tabs.map(({ type, icon }) => (
          <li key={type} onClick={() => setQuery(type)} className={`flex cursor-pointer gap-1 border-black p-4 text-[14px] sm:text-[18px] ${type === query ? 'border-t font-bold' : ''}`}>
            <button>{icon}</button>
            <span>{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  )
}
