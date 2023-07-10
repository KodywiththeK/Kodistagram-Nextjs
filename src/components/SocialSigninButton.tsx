'use client'
import { ClientSafeProvider, signIn } from 'next-auth/react'
import { SiKakaotalk, SiNaver, SiGoogle } from 'react-icons/si'

type IProps = {
  providers: Record<string, ClientSafeProvider>
  callbackUrl: string
}

export default function SocialSigninButton({ providers, callbackUrl }: IProps) {
  const handleSocialStyle = (color: string) => {
    if (color === 'Naver') return { icon: <SiNaver />, color: 'bg-[#06CC80]' }
    if (color === 'Kakao') return { icon: <SiKakaotalk size={18} />, color: 'bg-[#FEE500]' }
    if (color === 'Google') return { icon: <SiGoogle />, color: 'bg-white' }
  }

  return (
    <div className="instagram-gradient relative mb-20 flex w-full max-w-[400px] flex-col items-center overflow-hidden rounded-xl px-4 py-8 dark:bg-gray-700">
      <div className="absolute inset-0 z-0 bg-white opacity-30"></div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className={`${handleSocialStyle(provider.name)?.color} relative z-10 m-2 w-full max-w-[300px] rounded-xl p-3 text-center text-gray-800 shadow-lg`}>
          <button onClick={() => signIn(provider.id, { callbackUrl })} className="flex w-full items-center justify-center gap-2">
            {handleSocialStyle(provider.name)?.icon}
            <span>{'Sign in with'}</span>
            <b>{provider.name}</b>
          </button>
        </div>
      ))}
    </div>
  )
}
