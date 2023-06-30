import { getLikedOf, getPostsOf, getSavedOf } from '@/service/posts'
import { NextRequest, NextResponse } from 'next/server'

type Context = {
  params: {
    slug: string[]
  }
}

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params
  if (!slug || !Array.isArray(slug) || slug.length < 2) return new NextResponse('Bad Request', { status: 400 })

  const [username, query] = slug

  //기본깂으로 내가 작성한 post를 불러오는 함수를 할당만. 호출X
  let request = getPostsOf
  if (query == 'saved') request = getSavedOf
  else if (query == 'liked') request = getLikedOf

  return request(username).then((data) => NextResponse.json(data))
}
