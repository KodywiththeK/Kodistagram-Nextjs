import { followUser, unFollowUser } from '@/service/user'
import { isSessionExist } from '@/util/session'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

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
