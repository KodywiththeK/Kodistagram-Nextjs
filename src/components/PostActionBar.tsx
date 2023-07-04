import ToggleButton from './ui/ToggleButton'
import { SimplePost } from '@/model/post'
import { useSession } from 'next-auth/react'
import HeartFill from './ui/icons/HeartFill'
import BookmarkFill from './ui/icons/BookmarkFill'
import BookmarkOutline from './ui/icons/BookmarkOutline'
import HeartOutline from './ui/icons/HeartOutline'
import { parseDate } from '@/util/parseDate'
import usePosts from '@/hooks/posts'
import useUserInfo from '@/hooks/userInfo'

type Props = {
  post: SimplePost
  onClick: () => void
  fullComments: boolean
}
export default function PostActionBar({ post, onClick, fullComments }: Props) {
  const { likes, username, text, createdAt, commentCount } = post
  const { data: session } = useSession()
  const user = session?.user

  // 좋아요
  const liked = user !== undefined ? likes.includes(user.username) : false
  const { setLike } = usePosts()
  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like)
  }

  // 북마크
  const { setBookmark, userInfo } = useUserInfo()
  const bookmarked = userInfo?.bookmarks.includes(post.id) ?? false
  const handleBookmark = (bookmarked: boolean) => {
    user && setBookmark(post.id, bookmarked)
  }

  return (
    <>
      <div className="my-2 flex justify-between px-4">
        <ToggleButton toggled={liked} onToggle={() => handleLike(!liked)} onIcon={<HeartFill />} offIcon={<HeartOutline size={22} />} />
        <ToggleButton toggled={bookmarked} onToggle={() => handleBookmark(!bookmarked)} onIcon={<BookmarkFill />} offIcon={<BookmarkOutline size={20} />} />
      </div>
      <div className="flex flex-col gap-1 px-4 py-1">
        <p className="text-sm font-bold">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        {text && !fullComments && (
          <p>
            <span className="mr-1 font-bold">{username}</span>
            {text}
          </p>
        )}
        {!fullComments && commentCount > 1 && <p onClick={onClick} className="cursor-pointer text-sm font-semibold text-sky-600">{`View ${commentCount - 1} more comment${commentCount - 1 > 1 ? 's' : ''}`}</p>}
        <p className="my-2 text-xs uppercase text-neutral-500">{parseDate(createdAt)}</p>
      </div>
    </>
  )
}
