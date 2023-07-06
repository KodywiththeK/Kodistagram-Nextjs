import Avatar from '@/components/Avatar'
import CreateNewPost from '@/components/CreateNewPost'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post',
}

export default async function New() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) redirect('/api/auth/signin')

  return (
    <section className="flex w-full flex-col items-center gap-4 pt-4">
      <div className="flex items-center justify-center gap-2">
        <Avatar username={user.username} image={user.image} size={45} />
        <p className="font-bold">{user.username}</p>
      </div>
      <CreateNewPost />
    </section>
  )
}
