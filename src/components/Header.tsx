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

const menu = [
  {
    href: '/',
    icon: <HomeOutline />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: '/search',
    icon: <SearchOutlineIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: '/new',
    icon: <NewOutlineIcon />,
    clickedIcon: <NewFillIcon />,
  },
]

export default function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-10 mx-auto flex w-full max-w-screen-xl items-center justify-between rounded border-b border-b-gray-300 bg-white px-2 pt-4 shadow-sm sm:pt-2">
      <Link href={'/'}>
        <h1 className="text-2xl font-bold sm:text-3xl">Instagram</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-3 p-2 pr-0 sm:gap-4 sm:p-4">
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{pathname === item.href ? item.clickedIcon : item.icon}</Link>
            </li>
          ))}
          {session ? (
            <li className="flex items-center gap-2 sm:gap-3">
              <Avatar username={session.user.username} image={session.user.image} size={40} highlight={true} />
              <ColorButton text="Sign out" onClick={() => signOut()} />
            </li>
          ) : (
            <li>
              <ColorButton text="Sign in" onClick={() => signIn()} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
