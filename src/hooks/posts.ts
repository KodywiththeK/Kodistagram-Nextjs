import { FullPost, SimplePost } from '@/model/post'
import { useCallback } from 'react'
import useSWR from 'swr'

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id: id, like: like }),
  }).then((res) => res.json())
  // 항상 api요청 후 json으로 풀어주는 것 잊지말자. Global fetch가 아니므로 response 처리 직접 해야함
}

async function addComment(postId: string, comment: string) {
  return fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ postId: postId, comment: comment }),
  }).then((res) => res.json())
}

export default function usePosts() {
  const { data: posts, isLoading: postLoading, error: postError, mutate } = useSWR<SimplePost[]>('/api/posts')

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      // 변경될 newPost 상태 미리 만들어두기
      const newPost = {
        ...post,
        likes: like ? [...post.likes, username] : post.likes.filter((item) => item !== username),
      }
      const newPostList = posts?.map((p) => (p.id === post.id ? newPost : p))

      return mutate(updateLike(post.id, like), {
        // 서버에서 최신데이터를 다시 받아 UI가 업데이트되기 기다리는 것이 아니라, 미리 설정해둔 데이터로 UI 바로 변경
        optimisticData: newPostList,
        // updateLike 호출 후 반환된 데이터로 업데이트해주기보다 OptimisticData를 사용하기 원함
        populateCache: false,
        // 이미 로컬상으로 변경될 데이터를 즉각 변경해두어서, 백엔드에서 데이터를 굳이 새로 받아올 필요 없다
        revalidate: false,
        // 네트워크 통신 에러가 발생한다면, optimisticData로 업데이트한 것을 롤백해줌
        rollbackOnError: true,
      })
    },
    [mutate, posts]
  )

  const postComment = useCallback(
    (post: SimplePost, comment: string) => {
      const newPost = {
        ...post,
        commentCount: post.commentCount + 1,
      }
      const newPostList = posts?.map((p) => (p.id === post.id ? newPost : p))

      return mutate(addComment(post.id, comment), {
        optimisticData: newPostList,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      })
    },
    [mutate, posts]
  )

  return { posts, postLoading, postError, setLike, postComment }
}
