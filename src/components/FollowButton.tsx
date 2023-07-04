'use client'
import useUserInfo from '@/hooks/userInfo'
import { ProfileUser } from '@/model/user'
import React from 'react'
import Button from './ui/Button'

type Props = {
  user: ProfileUser
}

export default function FollowButton({ user }: Props) {
  const { username } = user
  const { userInfo: LoggedInUser, toggleFollow } = useUserInfo()
  const showButton = LoggedInUser && LoggedInUser.username !== username
  const following = LoggedInUser && LoggedInUser.following.find((user) => user.username === username)
  console.log(following)
  const text = following ? 'Unfollow' : 'Follow'

  const handleFollow = async () => {
    LoggedInUser && toggleFollow(user.id, LoggedInUser, username, following ? true : false)
  }

  return <>{showButton && <Button text={text} onClick={handleFollow} red={text === 'Unfollow'} />}</>
}
