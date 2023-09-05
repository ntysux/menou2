'use client'

import Signin from "@/components/signin"
import Signup from "@/components/signup"

export default function InitPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-3">
          <h2>Menoú</h2>
          <Signin>
            {setOpen => 
              <button onClick={() => setOpen(true)}>
                Đăng nhập
              </button>
            }
          </Signin>
          <Signup />
        </div>
      </div>
    </>    
  )
}
