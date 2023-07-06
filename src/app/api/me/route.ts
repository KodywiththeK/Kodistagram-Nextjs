import { getUserByUsername } from '@/service/user'
import { isSessionExist } from '@/util/session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return isSessionExist(async (user) => {
    return getUserByUsername(user.username).then((data) => NextResponse.json(data))
  })
}
