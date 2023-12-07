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
      return session
    },
    async jwt({token, user, account}) {
      if (account) {
        if (account.provider === 'google') {
          const response = await fetch(`${url}/auth/api/signup`, {
            method: 'POST',
            body: JSON.stringify({name: user.name, email: user.email}),
            headers: {"Content-Type": "application/json"}
          })

          const result = await response.json()
          
          if (result.id) {
            token.sub = result.id
          } else {
            console.log(result.error)
          }
        }
      }

      return token
    }
  }
})

export { handler as GET, handler as POST }