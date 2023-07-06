import usePosts from '@/hooks/posts'
import useSinglePost from '@/hooks/singlePost'
import { SimplePost } from '@/model/post'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import PickEmoji from './PickEmoji'

type Props = {
  post: SimplePost
  isModal: boolean
}

export default function CommentForm({ post, isModal }: Props) {
  const { data: session } = useSession()
  const user = session?.user
  const [comment, setComment] = useState('')
  const { postComment } = usePosts()
  const { postCommentOnSinglePost } = useSinglePost(post.id)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user) {
      if (isModal) {
        postCommentOnSinglePost({ comment, image: user.image, username: user.username })
      } else {
        postComment(post, comment)
      }
    }
    setComment('')
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="relative flex w-full items-center justify-between gap-2 border-t border-neutral-300 px-3 py-1">
      <PickEmoji text={comment} setText={setComment} />
      <input value={comment} required onChange={(e) => setComment(e.target.value)} className="shrink grow rounded p-2 outline-none" type={'text'} placeholder="Add a comment..." />
      <button disabled={comment.trim().length === 0} className="font-bold text-sky-500 disabled:text-sky-300">
        Post
      </button>
    </form>
  )
}
