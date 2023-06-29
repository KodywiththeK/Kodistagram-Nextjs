import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  image?: string
  username: string
  size?: number
  highlight?: boolean
}

export default function Avatar({ username, image, size = 40, highlight = true }: Props) {
  return (
    <Link href={`/user/${username}`}>
      <div className={`${highlight ? 'instagram-gradient' : ''} flex shrink-0 rounded-full bg-white p-[2px]`}>
        <Image src={image!} alt="profile" width={size} height={size} className={`referrerPolicy="no-referrer box-border aspect-square cursor-pointer rounded-full bg-white object-cover p-[2.5px]`} />
      </div>
    </Link>
  )
}
