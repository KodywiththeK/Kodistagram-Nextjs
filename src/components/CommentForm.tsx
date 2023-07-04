import { FullPost, SimplePost } from '@/model/post'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import useSWR from 'swr'

export default function CommentForm({ postId }: { postId: string }) {
  const { data: session } = useSession()
  const user = session?.user
  const [comment, setComment] = useState('')
  const { mutate } = useSWR<FullPost>(`/api/posts/${postId}`)
  const { mutate: mutatePosts } = useSWR<SimplePost>(`/api/posts`)
  const handleComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (user) {
      fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ postId: postId, comment: comment }),
      })
        .then(() => mutate())
        .then(() => mutatePosts())
        .then(() => setComment(''))
    }
  }

  return (
    <form className="flex w-full items-center justify-between gap-2 border-t border-neutral-300 px-3 py-1">
      <BsEmojiSmile size={18} />
      <input value={comment} onChange={(e) => setComment(e.target.value)} className="grow rounded p-2 outline-none" type={'text'} placeholder="Add a comment..." />
      <button onClick={(e) => handleComment(e)} disabled={comment.trim().length === 0} className="font-bold text-sky-500 disabled:text-sky-300">
        Post
      </button>
    </form>
  )
}
