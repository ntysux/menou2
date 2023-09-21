import SigninDialog from "@/components/auth/signin/signin.dialog"
import { cookies } from "next/headers"

export default function MenuLayout({children}: {children: React.ReactNode}) {
  const cookie = cookies().get('token')

  return (
    <>
      {!cookie && <SigninDialog />}
      <div className="my-3">
        {children}
      </div>
    </>
  )
}
