import { Comment, FullPost } from '@/model/post'
import { useCallback } from 'react'
import useSWR, { useSWRConfig } from 'swr'

async function addComment(postId: string, comment: string) {
  return fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ postId: postId, comment: comment }),
  }).then((res) => res.json())
}

export default function useSinglePost(postId: string) {
  const { data, isLoading, error, mutate } = useSWR<FullPost>(`/api/posts/${postId}`)

  const { mutate: globalMutate } = useSWRConfig()

  const postCommentOnSinglePost = useCallback(
    (comment: Comment) => {
      if (!data) return

      const newPost = {
        ...data,
        comments: [...data.comments, comment],
      }

      return mutate(addComment(postId, comment.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate('/api/posts'))
    },
    [data, globalMutate, mutate, postId]
  )

  return { data, isLoading, error, postCommentOnSinglePost }
}
