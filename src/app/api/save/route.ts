import { dislikePost, likePost } from '@/service/posts'
import { addBookmark, removeBookmark } from '@/service/user'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) {
    return new Response('Authentication Error', { status: 401 })
  }

  const { id, bookmarked } = await req.json()

  if (!id || bookmarked === undefined) {
    return new Response('Bad Request', { status: 400 })
  }

  const request = bookmarked ? addBookmark : removeBookmark

  return request(user.id, id) //
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
}
