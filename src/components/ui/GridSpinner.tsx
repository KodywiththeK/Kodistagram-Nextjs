import dynamic from 'next/dynamic'
import React from 'react'

const GridLoader = dynamic(() => import('react-spinners/GridLoader'), {
  ssr: false,
})

type Props = {
  color?: string
}
export default function GridSpinner({ color = 'red' }: Props) {
  return <GridLoader color={color} />
}
