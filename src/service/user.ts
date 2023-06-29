import { SearchUser } from '@/model/user'
import { client } from './sanity'

type OAuthUser = {
  id: string
  username: string
  email: string
  name: string | null
  image?: string | null
}

export async function addUser({ id, username, email, name, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  })
}

export async function getUserByUsername(username: string) {
  // 데이터 읽어올 떄는 fetch
  return client.fetch(
    `
    *[_type == "user" && username == "${username}"][0]{
      ...,
      "_id": _id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks":bookmarks[]->_id,
    }
    `
  )
}

export async function getSearchUser(keyword?: string) {
  const query = keyword ? `&& username == "${keyword}" || name == "${keyword}"` : ''
  return client
    .fetch(
      `
    *[_type == "user" ${query}]{
      image, name, username,
      "following":count(following), "followers":count(followers)
    }
  `
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    )
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `
      *[_type=="user" && username == "${username}"][0]{
        ...,
        "id":_id,
        "following": count(following),
        "followers": count(followers),
        "posts": count(*[_type=="post" && author->username == "${username}"])
      }
    `
    )
    .then((user) => ({ ...user, following: user.following ?? 0, followers: user.followers ?? 0, posts: user.posts ?? 0 }))
}
