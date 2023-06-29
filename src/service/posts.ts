import { SimplePost } from '@/model/post'
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
  "createdAt":_createdAt,
  "author": author
`

export async function getFollowingPosts(username: string) {
  const query = `
  *[_type == "post" && author->username == "${username}" 
    || author._ref in *[_type=="user" && username=="${username}"].following[]._ref]
    | order(_createdAt desc) {${simplePostProjection}}
  `
  const result = await client.fetch(query).then((posts) => posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) })))
  return result
}

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{comment, "username": author->username, "image": author->image},
      "id":_id,
      "createdAt":_createdAt
    }`
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }))
}
