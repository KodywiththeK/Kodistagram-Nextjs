'use client'
import useDebounce from '@/hooks/debounce'
import { UserSearchResult } from '@/model/user'
import React, { FormEvent, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import useSWR from 'swr'

import UserCard from './UserCard'

export default function InputSearch() {
  const [inputValue, setInputValue] = useState<string>('')
  const debouncedKeyword = useDebounce(inputValue)
  const { data, isLoading, error } = useSWR<UserSearchResult[]>(`/api/search/${debouncedKeyword}`)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className="my-4 flex w-full max-w-2xl flex-col items-center gap-4">
      <form className="h-10 w-full" onSubmit={onSubmit}>
        <input type={'text'} autoFocus placeholder="Search for a username or name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full rounded border border-gray-400 p-3 text-xl outline-none" />
      </form>
      {error && <p className="mt-8 text-lg">Error: 잠시 후 다시 시도해주세요.</p>}
      {isLoading && (
        <div className="mt-8 text-lg">
          <BeatLoader color="red" />
        </div>
      )}
      {!isLoading && !error && data?.length === 0 && <p className="mt-8 text-lg">찾는 사용자가 없습니다.</p>}
      <ul className="flex w-full flex-col gap-4 p-4">
        {data &&
          data.map((user) => (
            <li key={user.username} className="flex w-full cursor-pointer items-center rounded border border-neutral-300 bg-white p-4 shadow hover:bg-neutral-100">
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  )
}
