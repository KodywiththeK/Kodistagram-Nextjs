import { EditPost, getPost } from '@/service/posts'
import { isSessionExist } from '@/util/session'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

type Context = {
  params: { id: string }
}

export async function GET(request: NextRequest, context: Context) {
  return isSessionExist(async (user) => {
    return getPost(context.params.id) //
      .then((data) => NextResponse.json(data))
  })
}

export async function POST(req: NextRequest, context: Context) {
  return isSessionExist(async (user) => {
    const form = await req.formData()
    const text = form.get('text')?.toString()
    const file = form.get('file') as Blob

    if (!text || !file) return new Response('Bad Request', { status: 400 })

    return EditPost(text, file, context.params.id).then((data) => NextResponse.json(data))
  })
}
