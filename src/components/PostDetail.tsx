import useSinglePost from '@/hooks/singlePost'
import { SimplePost } from '@/model/post'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { SyncLoader } from 'react-spinners'
import Avatar from './Avatar'
import PostActionBar from './PostActionBar'

type Props = {
  post: SimplePost
}
export default function PostDetail({ post }: Props) {
  const { userImage, username, image } = post
  const { data, isLoading } = useSinglePost(post.id)
  const comments = data?.comments
  const endRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments])

  return (
    <section className="absolute inset-0 flex h-full flex-col justify-between overflow-hidden rounded">
      <div className="flex h-full w-full flex-col justify-between sm:h-full sm:grow sm:flex-row">
        <div className="flex h-[50%] flex-col justify-between sm:h-full sm:basis-3/5">
          <div className="flex items-center gap-2 p-2 ">
            <Avatar username={username} image={userImage} highlight size={45} />
            <span className="font-bold text-gray-900">{username}</span>
          </div>
          <div className="relative grow">
            <Image src={image} alt={`photo by ${username}`} priority fill sizes="650px" className="object-contain" />
          </div>
        </div>
        <div className="flex h-[50%] w-full flex-col sm:h-full sm:basis-2/5 sm:justify-between ">
          <ul className="flex h-full flex-col gap-2 overflow-y-auto border-t border-gray-200 p-4 sm:mb-1 sm:border-none">
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
            <div ref={endRef}></div>
          </ul>
          <PostActionBar post={post} isModal={true} />
        </div>
      </div>
    </section>
  )
}
