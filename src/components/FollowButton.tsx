'use client'
import { HomeUser, ProfileUser } from '@/model/user'
import React from 'react'
import useSWR from 'swr'
import Button from './ui/Button'

type Props = {
  user: ProfileUser
}

export default function FollowButton({ user }: Props) {
  const { username } = user
  const { data: LoggedInUser } = useSWR<HomeUser>('/api/me')
  const showButton = LoggedInUser && LoggedInUser.username !== username
  const following = LoggedInUser && LoggedInUser.following.find((user) => user.username === username)
  console.log(following)

  const text = following ? 'Unfollow' : 'Follow'

  return <>{showButton && <Button text={text} onClick={() => {}} red={text === 'Unfollow'} />}</>
}
