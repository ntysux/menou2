'use client'
import SigninDialog from "@/components/auth/signin/signin.dialog"
import SignupDialog from "@/components/auth/signup/signup.dialog"

export default function InitPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="space-y-3 text-center">
        <h1 className="text-2xl text-neutral-800 font-light tracking-wider sm:text-3xl">
          Menoú
        </h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <SigninDialog>
            {setOpen =>
              <button 
                className="px-5 py-3 rounded-lg text-sm text-neutral-800 shadow-custombox hover:shadow transition-all"
                onClick={() => setOpen(true)}
              >
                Đăng nhập
              </button>
            }
          </SigninDialog>
          <SignupDialog />
        </div>
      </div>
    </div> 
  )
}