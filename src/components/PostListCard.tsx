'use client'
import { SimplePost } from '@/model/post'
import Image from 'next/image'
import React, { useState } from 'react'
import Avatar from './Avatar'
import CommentForm from './CommentForm'
import PostActionBar from './PostActionBar'
import ModalPortal from './ui/ModalPortal'
import PostModal from './PostModal'
import PostDetail from './PostDetail'

type Props = {
  post: SimplePost
  priority?: boolean
}

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post
  const [openModal, setOpenModal] = useState(false)

  return (
    <article className=" max-w-lg rounded border border-gray-200 shadow-lg">
      <div className="flex items-center gap-2 p-2">
        <Avatar username={username} image={userImage} highlight size={45} />
        <span className="font-bold text-gray-900">{username}</span>
      </div>
      <Image src={image} alt={`photo by ${username}`} width={800} height={800} className="aspect-square cursor-pointer object-cover" priority={priority} onClick={() => setOpenModal(true)} />
      <PostActionBar username={username} likes={likes} createdAt={createdAt} text={text} onClick={setOpenModal} />
      <CommentForm />
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
