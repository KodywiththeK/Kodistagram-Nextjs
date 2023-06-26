import FollowingBar from '@/components/FollowingBar'
import PostList from '@/components/PostList'
import SideBar from '@/components/SideBar'
import { getServerSession, Session } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) redirect('/api/auth/signin')

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col sm:flex-row">
      <div className="w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="relative basis-1/4">
        <SideBar user={user} />
      </div>
    </section>
  )
}
