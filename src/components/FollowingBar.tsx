'use client'
import React from 'react'
import { PropagateLoader } from 'react-spinners'
import Avatar from './Avatar'
import ScrollableBar from './ui/ScrollableBar'
import Link from 'next/link'
import useUserInfo from '@/hooks/userInfo'

export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me를 통해 사용자의 정보를 얻어옴
  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세 정보를 Sanity 에서 가지고 옴
  // 4. 클라이언트 컴포넌트에서 followings의 정보를 UI로 보여주기
  const { userInfo, isLoading: Loading, error } = useUserInfo()
  const users = userInfo?.following
  // const users = undefined as undefined | DetailUser[]

  return (
    <section className="relative z-0 mx-auto mb-4 flex min-h-[90px] w-full max-w-[800px] items-center justify-center rounded-lg p-4 shadow-md shadow-neutral-300">
      {Loading ? <PropagateLoader size={8} color="red" /> : (!users || users.length === 0) && <p>{`You don't have following`}</p>}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }, idx) => (
            <div key={idx} className={'flex w-20 shrink-0 flex-col items-center justify-center'}>
              <Avatar username={username} image={image} size={65} />
              <Link href={`/user/${username}`}>
                <p className="w-full overflow-hidden text-ellipsis text-center text-sm">{username}</p>
              </Link>
            </div>
          ))}
        </ScrollableBar>
      )}
    </section>
  )
}
