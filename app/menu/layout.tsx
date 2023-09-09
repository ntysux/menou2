import Signin from "@/components/auth/signin/signin"
import ReduxProviders from "@/redux/providers"
import { cookies } from "next/headers"

export default async function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookie = cookies().get('token')

  return (
    <>
      {!cookie && <Signin />}

      <ReduxProviders>
        {children}
      </ReduxProviders>
    </>
  )
}
