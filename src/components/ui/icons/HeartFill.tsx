import React from 'react'
import { AiFillHeart } from 'react-icons/ai'

export default function HeartFill({ size = 22 }: { size?: number }) {
  return <AiFillHeart size={size} className="fill-red-500" />
}
