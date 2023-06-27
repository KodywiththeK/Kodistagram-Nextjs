import { SimplePost } from '@/model/post'
import Image from 'next/image'
import React from 'react'
import Avatar from './Avatar'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile } from 'react-icons/bs'
import { parseDate } from '@/util/parseDate'

type Props = {
  post: SimplePost
}

export default function PostListCard({ post }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post

  return (
    <>
      <div>
        <Avatar username={username} image={userImage} highlight />
        <span>{username}</span>
      </div>
      <Image src={image} alt={`photo by ${username}`} width={500} height={500} />
      <div>
        <AiOutlineHeart />
        <BsBookmark />
      </div>
      <div>
        <p>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'like' : 'likes'}`}</p>
        <p>
          <span>{username}</span>
          {text}
        </p>
        <p>{parseDate(createdAt)}</p>
        <form>
          <BsEmojiSmile />
          <input type={'text'} placeholder="Add a comment..." />
          <button>Post</button>
        </form>
      </div>
    </>
  )
}
