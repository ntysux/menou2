import ReduxProviders from '@/redux/providers'
import './globals.css'
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/components/auth/session.provider'

const quicksand = Quicksand({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const session = await getServerSession()
  
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <SessionProvider session={session}>
          <ReduxProviders>
            {children}
          </ReduxProviders>
        </SessionProvider>
      </body>
    </html>
  )
}
