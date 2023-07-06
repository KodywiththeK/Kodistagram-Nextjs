'use client'
import { SimplePost } from '@/model/post'
import Image from 'next/image'
import React, { useState } from 'react'
import PostActionBar from './PostActionBar'
import ModalPortal from './ui/ModalPortal'
import PostModal from './PostModal'
import PostDetail from './PostDetail'
import PostcardHeader from './PostcardHeader'
import { useSession } from 'next-auth/react'

type Props = {
  post: SimplePost
  priority?: boolean
}

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, text, commentCount } = post
  const [openModal, setOpenModal] = useState(false)
  const { data } = useSession()

  return (
    <article className=" max-w-lg rounded border border-gray-200 shadow-lg">
      <PostcardHeader username={username} userImage={userImage} id={post.id} />
      <Image src={image} alt={`photo by ${username}`} width={800} height={800} className="aspect-square cursor-pointer object-cover" priority={priority} onClick={() => setOpenModal(true)} />
      <PostActionBar post={post} isModal={openModal}>
        <p>
          <span className="mr-1 font-bold">{username}</span>
          {text}
        </p>
        {commentCount > 1 && <button onClick={() => setOpenModal(true)} className="cursor-pointer text-start text-sm font-semibold text-sky-600">{`View all ${commentCount} comments`}</button>}
      </PostActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)} isAuthor={username === data?.user.username}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  )
}
