'use client'
import useUserInfo from '@/hooks/userInfo'
import { ProfileUser } from '@/model/user'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { PulseLoader } from 'react-spinners'
import Button from './ui/Button'

type Props = {
  user: ProfileUser
}

export default function FollowButton({ user }: Props) {
  const { username } = user
  const { userInfo: LoggedInUser, toggleFollow } = useUserInfo()
  const showButton = LoggedInUser && LoggedInUser.username !== username
  const following = LoggedInUser && LoggedInUser.following.find((user) => user.username === username)

  const text = following ? 'Unfollow' : 'Follow'

  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isUpdating = isPending || isFetching

  const handleFollow = async () => {
    if (LoggedInUser) {
      setIsFetching(true)
      await toggleFollow(user.id, LoggedInUser, username, following ? true : false)
      setIsFetching(false)
      startTransition(() => {
        router.refresh()
      })
    }
  }

  return (
    <>
      {showButton && (
        <div>
          <Button disabled={isUpdating} text={text} onClick={handleFollow} red={text === 'Unfollow'}>
            {isUpdating && (
              <div>
                <PulseLoader size={6} />
              </div>
            )}
          </Button>
        </div>
      )}
    </>
  )
}
