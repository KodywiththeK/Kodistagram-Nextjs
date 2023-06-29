import UserPosts from '@/components/UserPosts'
import UserProfile from '@/components/UserProfile'
import { getUserForProfile } from '@/service/user'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    name: string
  }
}

export default async function UserPage({ params: { name } }: Props) {
  console.log(name)
  const user = await getUserForProfile(name)

  if (!user) {
    notFound()
  }
  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  )
}
