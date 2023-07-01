import InputSearch from '@/components/InputSearch'
import { Metadata } from 'next'
import React from 'react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'User Search',
  description: 'Search users to follow',
}

export default function search() {
  return (
    <>
      <InputSearch />
    </>
  )
}
