import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import NaverProvider from 'next-auth/providers/naver'
import KakaoProvider from 'next-auth/providers/kakao'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_OAUTH_ID || '',
      clientSecret: process.env.NAVER_OAUTH_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_OAUTH_ID || '',
      clientSecret: process.env.KAKAO_OAUTH_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log(session)
      const user = session?.user
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
