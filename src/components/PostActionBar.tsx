import ToggleButton from './ui/ToggleButton'
import { SimplePost } from '@/model/post'
import { useSession } from 'next-auth/react'
import HeartFill from './ui/icons/HeartFill'
import BookmarkFill from './ui/icons/BookmarkFill'
import BookmarkOutline from './ui/icons/BookmarkOutline'
import HeartOutline from './ui/icons/HeartOutline'
import { parseDate } from '@/util/parseDate'
import usePosts, { updateLike } from '@/hooks/posts'
import useUserInfo from '@/hooks/userInfo'
import CommentForm from './CommentForm'
import useSWR from 'swr'

type Props = {
  post: SimplePost
  children?: React.ReactNode
  isModal: boolean
  query?: string
}
export default function PostActionBar({ post, children, isModal = false, query }: Props) {
  const { likes, createdAt, id } = post
  const { data: session } = useSession()
  const user = session?.user

  // 예외사항 대응
  const { data: queryPosts, mutate } = useSWR<SimplePost[]>(`/api/users/${user?.username}/${query}`)

  // 좋아요
  const liked = user !== undefined ? likes.includes(user.username) : false
  const { setLike } = usePosts()
  const handleLike = async (like: boolean) => {
    if (user) {
      if (query !== undefined) {
        const newPost = {
          ...post,
          likes: like ? [...post.likes, user.username] : post.likes.filter((item) => item !== user.username),
        }
        const newPostList = queryPosts?.map((p) => (p.id === post.id ? newPost : p))
        mutate(updateLike(id, like), {
          optimisticData: newPostList,
          populateCache: false,
          revalidate: false,
          rollbackOnError: true,
        })
      } else await setLike(post, user.username, like)
    }
  }

  // 북마크
  const { setBookmark, userInfo } = useUserInfo()
  const bookmarked = userInfo?.bookmarks.includes(post.id) ?? false
  const handleBookmark = (bookmarked: boolean) => {
    user && setBookmark(post.id, bookmarked)
  }

  return (
    <div className="border border-t border-t-gray-200 ">
      <div className="my-2 flex justify-between px-4">
        <div className="flex items-center gap-2">
          <ToggleButton toggled={liked} onToggle={() => handleLike(!liked)} onIcon={<HeartFill />} offIcon={<HeartOutline size={22} />} />
          <p className="text-sm font-bold">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        </div>
        <ToggleButton toggled={bookmarked} onToggle={() => handleBookmark(!bookmarked)} onIcon={<BookmarkFill />} offIcon={<BookmarkOutline size={20} />} />
      </div>
      <div className="flex flex-col gap-1 px-4 py-1">
        {children && children}
        <p className="my-2 text-xs uppercase text-neutral-500">{parseDate(createdAt)}</p>
      </div>
      <CommentForm post={post} isModal={isModal} />
    </div>
  )
}
