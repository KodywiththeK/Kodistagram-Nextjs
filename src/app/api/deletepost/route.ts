import { deletePost } from '@/service/posts'
import { client } from '@/service/sanity'
import { isSessionExist } from '@/util/session'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  return isSessionExist(async (user) => {
    const { postId } = await req.json()

    if (!postId) return new Response('Bad Request', { status: 400 })
    console.log(postId)

    return deletePost(postId).then((data) => NextResponse.json(data))
  })
}
