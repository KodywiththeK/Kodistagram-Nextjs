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
      <Image src={image!} alt="profile" width={size} height={size} className={`${highlight ? 'instagram-gradient' : ''} referrerPolicy="no-referrer box-border aspect-square shrink-0 cursor-pointer rounded-full object-cover p-[2px]`} />
    </Link>
  )
}
