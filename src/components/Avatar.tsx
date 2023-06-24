import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  userInfo: {
    email: string
    image?: string
    name: string
    username: string
  }
  size?: number
  highlight?: boolean
}

export default function Avatar({ userInfo, size = 40, highlight = true }: Props) {
  return (
    <Link href={`/${userInfo.username}`}>
      <Image src={userInfo?.image!} alt="profile" width={size} height={size} className={`${highlight ? 'instagram-gradient' : ''} mr-2 box-border h-[${size}px] w-[${size}px] sm:mr-3" referrerPolicy="no-referrer shrink-0 cursor-pointer rounded-full p-[2px]`} />
    </Link>
  )
}
