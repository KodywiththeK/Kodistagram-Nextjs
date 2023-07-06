import { followUser, unFollowUser } from '@/service/user'
import { isSessionExist } from '@/util/session'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  return isSessionExist(async (user) => {
    const { otherUserId, follow } = await req.json()

    if (!otherUserId || follow === undefined) {
      return new Response('Bad Request', { status: 400 })
    }

    const request = follow ? unFollowUser : followUser

    return request(otherUserId, user.id) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
  })
}
