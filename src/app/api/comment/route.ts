import { addComment } from '@/service/posts'
import { isSessionExist } from '@/util/session'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  return isSessionExist(async (user) => {
    const { postId, comment } = await req.json()
    if (!postId || comment === undefined) {
      return new Response('Bad Request', { status: 400 })
    }
    return addComment(postId, user.id, comment)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
  })
}
