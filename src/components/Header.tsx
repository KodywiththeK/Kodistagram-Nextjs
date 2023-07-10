'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import HomeFillIcon from './ui/icons/HomeFillIcon'
import HomeOutline from './ui/icons/HomeOutlineIcon'
import SearchFillIcon from './ui/icons/SearchFillIcon'
import SearchOutlineIcon from './ui/icons/SearchOutlineIcon'
import NewFillIcon from './ui/icons/NewFillIcon'
import NewOutlineIcon from './ui/icons/NewOutlineIcon'
import ColorButton from './ui/ColorButton'
import { useSession, signIn, signOut } from 'next-auth/react'
import Avatar from './Avatar'
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'

const menu = [
  {
    href: '/',
    icon: <HomeOutline />,
    clickedIcon: <HomeFillIcon />,
    title: 'Home',
  },
  {
    href: '/search',
    icon: <SearchOutlineIcon />,
    clickedIcon: <SearchFillIcon />,
    title: 'Search users',
  },
  {
    href: '/new',
    icon: <NewOutlineIcon />,
    clickedIcon: <NewFillIcon />,
    title: 'New post',
  },
]

export default function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-30 mx-auto flex w-full max-w-screen-xl items-center justify-between rounded border-b border-b-gray-300 bg-white px-2 pt-4 shadow-sm sm:pt-2">
      <Link href={'/'} aria-label="Home">
        <h1 className="text-[22px] font-bold sm:text-3xl">Kodistagram</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-2 p-2 pr-0 sm:gap-4 sm:p-4">
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-label={item.title}>
                {pathname === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
          {session ? (
            <li className="flex items-center gap-2 sm:gap-3">
              <Avatar username={session.user.username} image={session.user.image} size={40} highlight={true} />
              <ColorButton
                text={<AiOutlineLogout size={16} />}
                onClick={() => {
                  confirm('로그아웃 하시겠습니까?') && signOut()
                }}
              />
            </li>
          ) : (
            <li>
              <ColorButton text={<AiOutlineLogin size={16} />} onClick={() => signIn()} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
