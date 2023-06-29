'use client'
import React, { useState } from 'react'
import useSWR from 'swr'

export default function InputSearch() {
  const [inputValue, setInputValue] = useState<string>('all')
  const { data, isLoading } = useSWR(`/api/search/${inputValue}`)
  console.log(data)
  return (
    <div className="h-10 w-full">
      <input type={'text'} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
    </div>
  )
}
