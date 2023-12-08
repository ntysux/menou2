import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { url } from "@/utils/app.url"

interface CredentialsResult {
  user?: {
    id: string
    name: string
  }
  error?: string
}

interface GoogleResult {
  id?: string
  error?: string
}

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

        const results: CredentialsResult = await response.json()

        if (results.user) {
          return results.user
        } else {
          throw new Error(results.error)
        }
      }
    }),
    CredentialsProvider({
      id: 'signup',
      name: 'CredentialsSignUp',
      credentials: {
        username: {type: "text"},
        password: {type: "password"},
        name: {type: "text"}
      },
      async authorize(credentials) {
        const response = await fetch(`${url}/auth/api/signup`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {"Content-Type": "application/json"}
        })

        const results: CredentialsResult = await response.json()

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
      if (account?.provider === 'google') {
        const response = await fetch(`${url}/auth/api/signup`, {
          method: 'POST',
          body: JSON.stringify({name: user.name, email: user.email}),
          headers: {"Content-Type": "application/json"}
        })

        const results: GoogleResult = await response.json()
        
        if (results.id) {
          token.sub = results.id
        } else {
          console.log(results.error)
        }
      }

      return token
    }
  }
})

export { handler as GET, handler as POST }