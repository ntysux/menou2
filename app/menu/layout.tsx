import SigninDialog from "@/components/auth/signin/signin.dialog"
import MenuBase from "@/components/menu/base"
import ReduxProviders from "@/redux/providers"
import { cookies } from "next/headers"

export default function MenuLayout({children}: {children: React.ReactNode}) {
  const cookie = cookies().get('token')

  return (
    <>
      {!cookie && <SigninDialog />}
      <ReduxProviders>
        <MenuBase>
          {children}
        </MenuBase>
      </ReduxProviders>
    </>
  )
}
