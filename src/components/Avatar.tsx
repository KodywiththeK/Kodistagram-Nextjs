import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  userInfo: {
    email: string
    image: string
    name: string
    username: string
  }
}

export default function Avatar({ userInfo }: Props) {
  return (
    <Link href={`/${userInfo.username}`}>
      <Image src={userInfo?.image!} alt="profile" width={35} height={35} className="instagram-gradient mr-2 box-border h-[30px] w-[30px] shrink-0 cursor-pointer rounded-full p-[2px] sm:mr-3 sm:h-[35px] sm:w-[35px]" referrerPolicy="no-referrer" />
    </Link>
  )
}
