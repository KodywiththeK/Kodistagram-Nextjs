import { addBookmark, removeBookmark } from '@/service/user'
import { isSessionExist } from '@/util/session'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  return isSessionExist(async (user) => {
    const { id, bookmarked } = await req.json()

    if (!id || bookmarked === undefined) {
      return new Response('Bad Request', { status: 400 })
    }

    const request = bookmarked ? addBookmark : removeBookmark

    return request(user.id, id) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
  })
}
