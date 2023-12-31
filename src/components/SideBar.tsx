import { AuthUser } from '@/model/user'
import React from 'react'
import Avatar from './Avatar'

type Props = {
  user: AuthUser
}

export default function SideBar({ user }: Props) {
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center gap-2">
        <Avatar username={user.username} image={user.image} size={65} highlight={false} />
        <div>
          <p className="font-bold">{user.username}</p>
          <p className="leading-4 text-neutral-500">{user.name}</p>
        </div>
      </div>
      <p className="mt-8 text-sm text-neutral-500">About ∙ Help ∙ Press ∙ API ∙ Jobs ∙ Privacy ∙ Terms ∙ Location ∙ Language</p>
      <p className="mt-8 text-sm font-bold text-neutral-500">{`@${new Date().getFullYear()} InstagramKody from KodywiththeK`}</p>
    </div>
  )
}
