import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { getSearchUser } from '../../../service/user'

export async function GET() {
  return getSearchUser().then((data) => NextResponse.json(data))
}
