'use client'
import { SimplePost } from '@/model/post'
import Image from 'next/image'
import React, { useState } from 'react'
import Avatar from './Avatar'
import PostActionBar from './PostActionBar'
import ModalPortal from './ui/ModalPortal'
import PostModal from './PostModal'
import PostDetail from './PostDetail'
import Link from 'next/link'
import PostToggleButton from './PostToggleButton'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'

type Props = {
  post: SimplePost
  priority?: boolean
}

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, text, commentCount } = post
  const [openModal, setOpenModal] = useState(false)
  const { mutate } = useSWR<SimplePost[]>('/api/posts')
  const router = useRouter()

  const postDelete = async () => {
    await fetch('/api/deletepost', {
      method: 'PUT',
      body: JSON.stringify({ postId: post.id }),
    }).then(() => mutate())
  }

  const buttons = [
    {
      name: 'Edit',
      onClick: () => {
        router.push(`/editPost/${post.id}`)
      },
    },
    {
      name: 'Delete',
      onClick: postDelete,
    },
  ]

  return (
    <article className=" max-w-lg rounded border border-gray-200 shadow-lg">
      <div className="relative flex w-full items-center justify-between">
        <div className="flex items-center gap-2 p-2">
          <Avatar username={username} image={userImage} highlight size={45} />
          <Link href={`/user/${username}`}>
            <span className="font-bold text-gray-900">{username}</span>
          </Link>
        </div>
        <PostToggleButton username={username} buttons={buttons} />
      </div>
      <Image src={image} alt={`photo by ${username}`} width={800} height={800} className="aspect-square cursor-pointer object-cover" priority={priority} onClick={() => setOpenModal(true)} />
      <PostActionBar post={post} isModal={openModal}>
        {text && (
          <p>
            <span className="mr-1 font-bold">{username}</span>
            {text}
          </p>
        )}
        {commentCount > 1 && <button onClick={() => setOpenModal(true)} className="cursor-pointer text-start text-sm font-semibold text-sky-600">{`View all ${commentCount} comments`}</button>}
      </PostActionBar>

      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  )
}
