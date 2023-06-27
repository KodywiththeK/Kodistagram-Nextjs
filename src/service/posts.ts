import { SimplePost } from '@/model/post'
import post from '../../sanity-studio/schemas/post'
import { client, urlFor } from './sanity'

const simplePostProjection = `
  ...,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "likes": likes[]->username,
  "text": comments[0].comment,
  "comments": comments[],
  "commentCount": count(comments),
  "id": _id,
  "createdAt":_createdAt
`

export async function getFollowingPosts(username: string) {
  return client
    .fetch(
      `
    *[_type == "post" && author->username == "${username}" 
      || author._ref in *[_type=="user" && username=="${username}"].following[]._ref]
      | order(_createdAt desc){${simplePostProjection}}
    `
      // 타입 post
      // post 안에 author에 들어있는 username이 우리가 찾고자하는 username 이라면 가져오기.
    )
    .then((posts) => posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) })))
}
