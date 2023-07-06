import { getUserByUsername } from '@/service/user'
import { isSessionExist } from '@/util/session'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: Request) {
  return isSessionExist(async (user) => {
    return getUserByUsername(user.username).then((data) => NextResponse.json(data))
  })
}
