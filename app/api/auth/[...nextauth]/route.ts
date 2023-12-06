import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { url } from "@/utils/app.url"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? ''
    }),
    CredentialsProvider({
      id: 'signin',
      name: 'Credentials',
      credentials: {
        username: {type: "text"},
        password: {type: "password"}
      },
      async authorize(credentials) {
        const response = await fetch(`${url}/auth/api/signin`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {"Content-Type": "application/json"}
        })

        const results = await response.json()

        if (results.user) {
          return results.user
        } else {
          throw new Error(results.error)
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub
      session.user.verified = token.verified
      session.user.premium = token.premium

      return session
    },
    async jwt({token, user}: any) {
      if (user) {
        token.verified = user.verified
        token.premium = user.premium
      }

      return token
    }
  }
})

export { handler as GET, handler as POST }