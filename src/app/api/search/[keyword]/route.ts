import { getSearchUser } from '@/service/user'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

type Context = {
  params: {
    keyword: string
  }
}

export async function GET(request: NextRequest, context: Context) {
  return getSearchUser(context.params.keyword).then((data) => NextResponse.json(data))
}
