'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { AiFillHome, AiOutlineHome, AiFillPlusSquare, AiOutlinePlusSquare } from 'react-icons/ai'
import { RiSearchFill, RiSearchLine } from 'react-icons/ri'

export default function Header() {
  const pathname = usePathname()
  console.log(pathname)
  const getPathname = (name: string) => {
    return pathname === name
  }

  return (
    <header className="flex items-center justify-between border-b border-b-gray-300 p-2 pb-4">
      <Link href={'/'}>
        <h1 className="text-3xl font-bold">Instagram</h1>
      </Link>
      <nav className="flex items-center gap-4">
        <Link href={'/'}>{getPathname('/') ? <AiFillHome size={24} /> : <AiOutlineHome size={24} />}</Link>
        <Link href={'/search'}>{getPathname('/search') ? <RiSearchFill size={24} /> : <RiSearchLine size={24} />}</Link>
        <Link href={'/new'}>{getPathname('/new') ? <AiFillPlusSquare size={24} /> : <AiOutlinePlusSquare size={24} />}</Link>
        <button className="instagram-gradient box-border rounded-lg p-[3px]">
          <div className="rounded-md bg-slate-100 bg-opacity-90 p-[6px]">Sign in</div>
        </button>
      </nav>
    </header>
  )
}
