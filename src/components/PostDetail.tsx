import useSinglePost from '@/hooks/singlePost'
import { SimplePost } from '@/model/post'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { SyncLoader } from 'react-spinners'
import Avatar from './Avatar'
import PostActionBar from './PostActionBar'
import PostcardHeader from './PostcardHeader'

type Props = {
  post: SimplePost
}
export default function PostDetail({ post }: Props) {
  const { userImage, username, image, text } = post
  const { data, isLoading } = useSinglePost(post.id)
  const comments = data?.comments
  const endRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments])

  return (
    <section className="absolute inset-0 flex h-full flex-col justify-between overflow-hidden rounded">
      <div className="flex h-full w-full flex-col justify-between sm:h-full sm:grow sm:flex-row">
        <div className="flex h-[40%] flex-col justify-between sm:h-full sm:basis-3/5">
          <PostcardHeader username={username} userImage={userImage} id={post.id} />
          <div className="relative grow">
            <Image src={image} alt={`photo by ${username}`} priority fill sizes="650px" className="object-contain" />
          </div>
        </div>
        <div className="flex h-[60%] w-full flex-col sm:h-full sm:basis-2/5 sm:justify-between ">
          <ul className="flex h-full flex-col gap-2 overflow-y-auto border-t border-gray-200 p-4 sm:mb-1 sm:border-none">
            {isLoading && (
              <div className="mt-4 flex w-full justify-center">
                <SyncLoader size={10} color="red" />
              </div>
            )}
            {comments && comments?.length > 0 ? (
              comments.map(({ image, username: commentUsername, comment }, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Avatar image={image} size={40} highlight={commentUsername === username} username={username} />
                  <div className="flex flex-col justify-between">
                    <span className="text-sm font-bold">{commentUsername}</span>
                    <span className="text-sm">{comment}</span>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-semibold">No comments yet</div>
            )}
            <div ref={endRef}></div>
          </ul>
          <PostActionBar post={post} isModal={true}>
            <p>
              <span className="mr-1 font-bold">{username}</span>
              {text}
            </p>
          </PostActionBar>
        </div>
      </div>
    </section>
  )
}
