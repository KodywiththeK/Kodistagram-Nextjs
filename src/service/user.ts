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
      "bookmarks":bookmarks[]->_id
    }
    `
  )
}
