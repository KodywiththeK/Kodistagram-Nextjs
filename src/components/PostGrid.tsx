import { useCacheKeys } from '@/context/CacheKeysContext'
import usePosts from '@/hooks/posts'
import { SimplePost } from '@/model/post'
import React from 'react'
import useSWR from 'swr'
import PostGridCard from './PostGridCard'
import GridSpinner from './ui/GridSpinner'

export default function PostGrid() {
  const key = useCacheKeys()
  const { posts, postLoading } = usePosts()
  // const { data: posts, isLoading, error } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`)

  return (
    <div className="relative aspect-square w-full">
      {postLoading && (
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
