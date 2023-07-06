import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'
import PostToggleButton from './PostToggleButton'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { SimplePost } from '@/model/post'

type Props = {
  username: string
  userImage: string
  id: string
}

export default function PostcardHeader({ username, userImage, id }: Props) {
  const { mutate } = useSWR<SimplePost[]>('/api/posts')
  const router = useRouter()

  const postDelete = async () => {
    await fetch('/api/deletepost', {
      method: 'PUT',
      body: JSON.stringify({ postId: id }),
    }).then(() => mutate())
  }

  const buttons = [
    {
      name: 'Edit',
      onClick: () => {
        router.push(`/editPost/${id}`)
      },
    },
    {
      name: 'Delete',
      onClick: postDelete,
    },
  ]
  return (
    <div className="relative flex w-full items-center justify-between">
      <div className="flex items-center gap-2 p-2">
        <Avatar username={username} image={userImage} highlight size={45} />
        <Link href={`/user/${username}`}>
          <span className="font-bold text-gray-900">{username}</span>
        </Link>
      </div>
      <PostToggleButton username={username} buttons={buttons} />
    </div>
  )
}
