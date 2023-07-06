'use client'
import { convertToWebPFile } from '@/util/convertImageFormat'
import imgCompression from '@/util/imgCompression'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import GridSpinner from './ui/GridSpinner'
import PhotoIcon from './ui/icons/PhotoIcon'
import { SimplePost } from '@/model/post'
import { urlToFileData } from '@/util/urlToFileData'

type Props = { post?: SimplePost }

export default function CreateNewPost({ post }: Props) {
  useEffect(() => {
    if (post) {
      setUrl(post.image)
      urlToFileData(post.image).then((res) => setFile(res))
    }
  }, [post])
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | Blob>()
  const [url, setUrl] = useState<string>('')
  console.log(file)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // rerendering방지
  const textRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('text', textRef?.current?.value ?? '')

    fetch(post ? `/api/posts/${post.id}` : '/api/posts/', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`)
          console.log()
          return
        }
        router.push('/')
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false))
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e.target.files
    if (files && files[0]) {
      const optimizedImg = await imgCompression(files[0])
      const convertedImg = await convertToWebPFile(optimizedImg)
      setFile(convertedImg as Blob)
      setUrl(URL.createObjectURL(convertedImg as Blob))
    }
  }
  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    if (e.type === 'dragenter') {
      setDragging(true)
    } else if (e.type === 'dragleave') {
      setDragging(false)
    }
  }
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
  }
  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDragging(false)
    //사용자가 이미지 파일을 드롭했는지 확인
    const files = e.dataTransfer?.files
    if (files && files[0]) {
      const optimizedImg = await imgCompression(files[0])
      const convertedImg = await convertToWebPFile(optimizedImg)

      setFile(convertedImg as Blob)
      setUrl(URL.createObjectURL(convertedImg as Blob))
    }
  }

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-sky-500/20">
          <GridSpinner />
        </div>
      )}
      {error && <p className="mb-4 w-full bg-red-100 p-2 text-center font-bold text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
        <label onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDragOver} onDrop={handleDrop} htmlFor="input-file" className={`relative ${!file && 'border-[0.15rem] border-dashed border-sky-500'} flex aspect-video w-full max-w-[600px] items-center justify-center overflow-hidden  rounded bg-gray-100 shadow`}>
          {dragging && <div className="pointer-events-none absolute inset-0 z-10 bg-sky-500/20"></div>}
          {!file && (
            <div className="pointer-events-none flex flex-col items-center gap-2">
              <PhotoIcon size={100} />
              <p className="text-sm text-neutral-500">Drop your image here or Click</p>
            </div>
          )}
          {url && <Image src={url} alt="local file" fill sizes="650px" className="object-cover" />}
        </label>
        <input onChange={handleChange} type={'file'} id="input-file" className="hidden" accept="image/*" />
        <textarea ref={textRef} placeholder="Write a caption..." required className="aspect-video w-full max-w-[600px] rounded border-none p-2 text-[12px] shadow outline-none sm:text-sm" />
        <button type="submit" onClick={(event) => event.stopPropagation()} className="w-full max-w-[600px] rounded-lg bg-sky-500 py-1.5 text-center font-bold text-white ">
          Publish
        </button>
      </form>
    </>
  )
}
