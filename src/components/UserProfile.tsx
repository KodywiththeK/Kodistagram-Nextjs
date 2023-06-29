import { ProfileUser } from '@/model/user'
import React from 'react'
import Avatar from './Avatar'
import FollowButton from './FollowButton'

type Props = {
  user: ProfileUser
}

export default function UserProfile({ user }: Props) {
  const { image, username, name, followers, following, posts } = user
  const info = [
    { title: 'posts', data: posts },
    { title: 'followers', data: followers },
    { title: 'following', data: following },
  ]
  return (
    <section className="flex w-full flex-col items-center justify-center gap-2 border-b border-neutral-300 py-12 sm:flex-row sm:gap-10">
      <Avatar image={image} username={username} size={140} highlight />
      <div className="basis-1/3">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-8">
          <h1 className="text-2xl">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="my-4 flex gap-4">
          {info.map(({ title, data }, index) => (
            <li key={index} className="flex gap-1">
              <span className="font-bold ">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-center text-xl font-bold sm:text-start">{name}</p>
      </div>
    </section>
  )
}
