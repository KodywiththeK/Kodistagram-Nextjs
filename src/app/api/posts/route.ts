import { createPost, getFollowingPosts } from '@/service/posts'
import { isSessionExist } from '@/util/session'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  return isSessionExist(async (user) => {
    return getFollowingPosts(user.username).then((data) => NextResponse.json(data))
  })
}

export async function POST(req: NextRequest) {
  return isSessionExist(async (user) => {
    const form = await req.formData()
    const text = form.get('text')?.toString()
    const file = form.get('file') as Blob

    if (!text || !file) return new Response('Bad Request', { status: 400 })

    return createPost(user.id, text, file).then((data) => NextResponse.json(data))
  })
}
