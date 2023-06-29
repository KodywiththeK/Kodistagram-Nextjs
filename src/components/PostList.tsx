'use client'
import { SimplePost } from '@/model/post'
import React from 'react'
import useSWR from 'swr'
import PostListCard from './PostListCard'
import GridSpinner from './ui/GridSpinner'

export default function PostList() {
  const { data: posts, isLoading: Loading } = useSWR<SimplePost[]>(`/api/posts`)

  return (
    <section>
      {Loading && (
        <div className="mt-32 text-center">
          <GridSpinner color="red" />
        </div>
      )}
      {posts && (
        <ul className="flex flex-col items-center">
          {posts.map((post, index) => (
            <li key={index} className="mb-4">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
