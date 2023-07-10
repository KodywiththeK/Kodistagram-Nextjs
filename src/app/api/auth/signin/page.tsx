import { getProviders } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../[...nextauth]/route'
import SocialSigninButton from '@/components/SocialSigninButton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kodistagram',
  description: 'Signup or Login to Kodistagram',
}

type Props = {
  searchParams: {
    callbackUrl: string
  }
}

export default async function SignInPage({ searchParams: { callbackUrl } }: Props) {
  const session = await getServerSession(authOptions)
  if (session) {
    return {
      redirect: {
        destination: '/',
        // permanent: false,
      },
    }
  }

  const providers = (await getProviders()) ?? {}

  return (
    <div className="relative flex w-full items-center justify-center">
      <SocialSigninButton providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </div>
  )
}
