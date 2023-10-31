import GoogleProvider from 'next-auth/providers/google'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { getServerSession, type NextAuthOptions } from 'next-auth'
import db from '@/lib/db'
import { nanoid } from 'nanoid'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          nickname: token.nickname,
          image: token.picture,
        }
      }

      return session
    },

    jwt: async ({ token, user }) => {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        token.id = user.id
        return token
      }

      if (!dbUser.nickname) {
        const nickname = nanoid(10)

        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            nickname,
            image: `https://avatar.vercel.sh/${nickname}.svg?text=${token.email?.slice(0, 4)}`,
          },
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        nickname: dbUser.nickname,
        picture: dbUser.image,
      }
    },
  },
}

export const getSession = () => getServerSession(authOptions)
