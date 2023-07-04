import { SimplePost } from '@/model/post'
import React from 'react'
import useSWR from 'swr'
import PostGridCard from './PostGridCard'
import GridSpinner from './ui/GridSpinner'

type Props = {
  username: string
  query: string
}

export default function PostGrid({ username, query }: Props) {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`)
  return (
    <div className="relative aspect-square w-full">
      {isLoading && (
        <div className="my-8 flex w-full justify-center">
          <GridSpinner />
        </div>
      )}
      <ul className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  )
}
