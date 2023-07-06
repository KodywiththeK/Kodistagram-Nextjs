import { deletePost } from '@/service/posts'
import { client } from '@/service/sanity'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  // 401 코드는 unAuthorized 를 명시함
  if (!user) return new Response('Authentication Error', { status: 401 })

  const { postId } = await req.json()

  if (!postId) return new Response('Bad Request', { status: 400 })
  console.log(postId)

  return deletePost(postId).then((data) => NextResponse.json(data))
}
