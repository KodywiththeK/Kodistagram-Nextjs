import { NextResponse } from 'next/server'
import { getSearchUser } from '../../../service/user'

export const dynamic = 'force-dynamic'

export async function GET() {
  return getSearchUser().then((data) => NextResponse.json(data))
}
