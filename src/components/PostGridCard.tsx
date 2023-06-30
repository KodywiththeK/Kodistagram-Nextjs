import { SimplePost } from '@/model/post'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import PostDetail from './PostDetail'
import PostModal from './PostModal'
import ModalPortal from './ui/ModalPortal'

type Props = {
  post: SimplePost
  priority: boolean
}

export default function PostGridCard({ post, priority = false }: Props) {
  const { username, image } = post
  const [openModal, setOpenModal] = useState(false)
  const { data: session } = useSession()
  const handleOpenPost = () => {
    if (!session?.user) return signIn()
    setOpenModal(true)
  }

  return (
    <div className="relative aspect-square w-full">
      <Image src={image} alt={`photo by ${username}`} width={650} height={650} priority={priority} className="aspect-square cursor-pointer object-cover" onClick={() => handleOpenPost()} />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  )
}