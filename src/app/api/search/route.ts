import { SearchUser } from '@/model/user'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { getSearchUser } from '../../../service/user'
import { authOptions } from '../auth/[...nextauth]/route'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return getSearchUser()
    .then((users) => users.filter((i: SearchUser) => i.username !== user?.username))
    .then((data) => NextResponse.json(data))
}
