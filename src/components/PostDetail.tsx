import { FullPost, SimplePost } from '@/model/post'
import Image from 'next/image'
import useSWR from 'swr'
import Avatar from './Avatar'
import CommentForm from './CommentForm'
import PostActionBar from './PostActionBar'

type Props = {
  post: SimplePost
}
export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes, text } = post
  const { data } = useSWR<FullPost>(`/api/posts/${id}`)
  const comments = data?.comments
  console.log(data)

  return (
    <section className="flex">
      <div className="relative">
        <Image src={image} alt={`photo by ${username}`} priority width={650} height={650} />
      </div>
      <div>
        <div className="flex items-center gap-2 p-2">
          <Avatar username={username} image={userImage} highlight size={45} />
          <span className="font-bold text-gray-900">{username}</span>
        </div>
        <ul>
          {comments &&
            comments.map(({ image, username: commentUsername, comment }, index) => (
              <li key={index}>
                <Avatar image={image} size={40} highlight={commentUsername === username} username={username} />
                <div>
                  <span>{commentUsername}</span>
                  <span>{comment}</span>
                </div>
              </li>
            ))}
        </ul>
        <PostActionBar likes={likes} username={username} createdAt={createdAt} />
        <CommentForm />
      </div>
    </section>
  )
}
