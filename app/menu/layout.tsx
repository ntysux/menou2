import Signin from "@/components/signin"
import { cookies } from "next/headers"

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookie = cookies().get('token')

  return (
    <>
      {!cookie && <Signin />}
      {children}
    </>
  )
}
