'use client'
import { FullPost, SimplePost } from '@/model/post'
import React from 'react'
import { GridLoader } from 'react-spinners'
import useSWR from 'swr'
import PostListCard from './PostListCard'

export default function PostList() {
  const { data: posts, isLoading: Loading, error } = useSWR<SimplePost[]>('/api/posts')
  console.log(posts)
  return (
    <section>
      {Loading && (
        <div>
          <GridLoader color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
