import { FullPost, SimplePost } from '@/model/post'
import Image from 'next/image'
import { SyncLoader } from 'react-spinners'
import useSWR from 'swr'
import Avatar from './Avatar'
import CommentForm from './CommentForm'
import PostActionBar from './PostActionBar'

type Props = {
  post: SimplePost
}
export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post
  const { data, isLoading } = useSWR<FullPost>(`/api/posts/${id}`)
  const comments = data?.comments
  console.log(data)

  return (
    <section className="flex h-full w-full flex-col sm:flex-row">
      <div className="flex items-center gap-2 p-2 sm:hidden ">
        <Avatar username={username} image={userImage} highlight size={45} />
        <span className="font-bold text-gray-900">{username}</span>
      </div>
      <div className="relative basis-1/2 sm:basis-3/5">
        <Image src={image} alt={`photo by ${username}`} priority fill sizes="650px" className="object-contain" />
      </div>
      <div className="flex h-full w-full basis-1/2 flex-col justify-between sm:basis-2/5">
        <div className="hidden items-center gap-2 p-2 sm:flex">
          <Avatar username={username} image={userImage} highlight size={45} />
          <span className="font-bold text-gray-900">{username}</span>
        </div>
        <ul className="mb-1 flex grow flex-col gap-2 overflow-y-auto border-t border-gray-200 p-4">
          {isLoading && (
            <div className="mt-4 flex w-full justify-center">
              <SyncLoader size={10} color="red" />
            </div>
          )}
          {comments &&
            comments.map(({ image, username: commentUsername, comment }, index) => (
              <li key={index} className="flex items-center gap-2">
                <Avatar image={image} size={40} highlight={commentUsername === username} username={username} />
                <div className="flex flex-col justify-between">
                  <span className="text-sm font-bold">{commentUsername}</span>
                  <span className="text-sm">{comment}</span>
                </div>
              </li>
            ))}
        </ul>
        <PostActionBar post={post} />
        <CommentForm />
      </div>
    </section>
  )
}
