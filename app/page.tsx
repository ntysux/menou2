'use client'

import SigninDialog from "@/components/auth/signin/signin.dialog"
import SignupDialog from "@/components/auth/signup/signup.dialog"
import { IconArrowNarrowRight } from "@tabler/icons-react"
import Link from "next/link"

export default function HeroPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-3">
      <div className="space-y-9">
        <div className='flex items-end justify-between'>
          <h1 className="leading-5 text-2xl text-neutral-800 font-extralight tracking-wider sm:text-3xl">
            Menoú
          </h1>
          <SignupDialog>
            {setOpen =>
              <button 
                onClick={() => setOpen(true)}
                className="flex items-center group"
              >
                <span className="text-sm text-neutral-800 font-bold">
                  Tạo tài khoản
                </span>
                <IconArrowNarrowRight 
                  size='20px' 
                  className="transition-all duration-300 ease-out group-hover:translate-x-1.5"
                />
              </button>
            }
          </SignupDialog>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <SigninDialog>
            {setOpen =>
              <div 
                onClick={() => setOpen(true)}
                className="relative overflow-hidden md:w-screen md:max-w-xs rounded-xl cursor-pointer shadow-custombox hover:shadow hover:shadow-neutral-200 transition-all duration-300"
              >
                <BgGradient />
                <div className="p-5">
                  <h2 className="text-sm text-neutral-800 font-bold">
                    Menu
                  </h2>
                </div>
                <div className="p-9">
                  <p className="text-sm text-neutral-800 font-medium">
                    Trở thành nhà sáng tạo, sáng lập lên những công thức và thực đơn của riêng bạn.
                  </p>
                </div>
              </div>
            }
          </SigninDialog>
          <Link href='/community' className="md:w-screen md:max-w-xs rounded-xl shadow-custombox hover:shadow hover:shadow-neutral-200 transition-all duration-300">
            <div className="p-5">
              <h2 className="text-sm text-neutral-800 font-bold">
                Cộng đồng
              </h2>
            </div>
            <div className="p-9">
              <p className="text-sm text-neutral-800 font-medium">
                Không cần đăng nhập. Khám phá các công thức từ những nhà sáng tạo. 
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div> 
  )
}

function BgGradient() {
  return (
    <>
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
    </>
  )
}