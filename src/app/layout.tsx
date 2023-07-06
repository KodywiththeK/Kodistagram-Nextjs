import './globals.css'
import { Open_Sans } from 'next/font/google'
import Header from '@/components/Header'
import { AuthContext } from '@/context/AuthContext'
import SWRConfigContext from '@/context/SWRConfigContext'
import { Metadata } from 'next'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Kodistagram',
    template: 'Kodistagram | %s',
  },
  description: 'Kodistagram Photos',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-50 text-gray-900">
      <body className={`${openSans.className} flex h-screen w-full flex-col overflow-y-auto px-2`}>
        <AuthContext>
          <Header />
          <main className="mx-auto flex h-full w-full max-w-screen-xl justify-center bg-neutral-50 p-2">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
      </body>
    </html>
  )
}
