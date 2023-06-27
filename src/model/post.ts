export type Comment = {
  comment: string
  username: string
  image: string
}

// FullPost 타입에서 comments 를 빼고, comments를 number 타입으로 추가함
export type SimplePost = Omit<FullPost, 'comments'>

export type FullPost = {
  id: string
  username: string
  userImage: string
  image: string
  text: string
  createdAt: string
  likes: string[]
  comments: Comment[]
  commentCount: number
}
