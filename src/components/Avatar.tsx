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
      <div className={`${highlight ? 'instagram-gradient p-[2px]' : ''} flex shrink-0 rounded-full bg-white `}>
        <Image src={image!} alt="profile" width={size} height={size} className={`referrerPolicy="no-referrer box-border ${highlight && 'bg-white p-[2.5px]'}  aspect-square cursor-pointer rounded-full object-cover `} />
      </div>
    </Link>
  )
}
