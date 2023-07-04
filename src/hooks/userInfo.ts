import { HomeUser, ProfileUser } from '@/model/user'
import { useCallback } from 'react'
import useSWR from 'swr'

async function updateBookmarks(postId: string, bookmarked: boolean) {
  return fetch('/api/save', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmarked }),
  }).then((res) => res.json())
  // 항상 api요청 후 json으로 풀어주는 것 잊지말자. Global fetch가 아니므로 response 처리 직접 해야함
}
async function updateFollow(otherUserId: string, follow: boolean) {
  return fetch('/api/follow', {
    method: 'PUT',
    body: JSON.stringify({ otherUserId, follow }),
  }).then((res) => res.json())
}

export default function useUserInfo() {
  const { data: userInfo, isLoading, error, mutate } = useSWR<HomeUser>('/api/me')

  const setBookmark = useCallback(
    (postId: string, save: boolean) => {
      if (!userInfo) return

      const bookmarks = userInfo.bookmarks ?? []

      const newUserInfo = {
        ...userInfo,
        bookmarks: save ? [...bookmarks, postId] : bookmarks.filter((b) => b !== postId),
      }

      return mutate(updateBookmarks(postId, save), {
        // 서버에서 최신데이터를 다시 받아 UI가 업데이트되기 기다리는 것이 아니라, 미리 설정해둔 데이터로 UI 바로 변경
        optimisticData: newUserInfo,
        // updateLike 호출 후 반환된 데이터로 업데이트해주기보다 OptimisticData를 사용하기 원함
        populateCache: false,
        // 이미 로컬상으로 변경될 데이터를 즉각 변경해두어서, 백엔드에서 데이터를 굳이 새로 받아올 필요 없다
        revalidate: false,
        // 네트워크 통신 에러가 발생한다면, optimisticData로 업데이트한 것을 롤백해줌
        rollbackOnError: true,
      })
    },
    [mutate, userInfo]
  )

  const toggleFollow = useCallback(
    (otherUserId: string, LoggedInUser: HomeUser, otherUserUsername: string, follow: boolean) => {
      const following = LoggedInUser.following ?? []
      const newUserInfo = {
        ...LoggedInUser,
        following: follow ? following.filter((i) => i.username !== otherUserUsername) : [...following, { username: otherUserUsername, image: '' }],
      }

      return mutate(updateFollow(otherUserId, follow), {
        optimisticData: newUserInfo,
        populateCache: false,
        revalidate: true,
        rollbackOnError: true,
      })
    },
    [mutate]
  )

  return { userInfo, isLoading, error, setBookmark, toggleFollow }
}
