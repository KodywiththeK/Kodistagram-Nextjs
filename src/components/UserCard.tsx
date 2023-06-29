import { UserSearchResult } from '@/model/user'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'

type Props = {
  user: UserSearchResult
}

export default function UserCard({ user: { name, username, image, following, followers } }: Props) {
  return (
    // 링크태그가 사용자 브라우저 상에 보여지면, nextjs가 미리 프리렌더링 해둠
    <Link href={`/user/${username}`} className="flex items-center gap-4">
      <Image src={image!} alt="profile" width={60} height={60} className={`instagram-gradient referrerPolicy="no-referrer box-border aspect-square shrink-0 cursor-pointer rounded-full object-cover p-[2px]`} />
      <div className="text-neutral-500">
        <p className="font-bold leading-4 text-black">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers, ${following} following`}</p>
      </div>
    </Link>
  )
}
