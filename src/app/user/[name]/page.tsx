import UserPosts from '@/components/UserPosts'
import UserProfile from '@/components/UserProfile'
import { getUserForProfile } from '@/service/user'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

type Props = {
  params: {
    name: string
  }
}

export default async function UserPage({ params: { name } }: Props) {
  const user = await getUser(name)

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

//여러번 호출하지 않고, 한번 호출된 정보 유지
//동일한 유저에 한해 캐시된 데잍터를 사용하도록
const getUser = cache(async (username: string) => getUserForProfile(username))

export async function generateMetadata({ params: { name } }: Props): Promise<Metadata> {
  const user = await getUser(name)
  return {
    title: `${user?.name} (@${user?.username}) ∙ InstagramKody Photos`,
    description: `${user?.name}'s all InstagramKody Posts`,
  }
}
