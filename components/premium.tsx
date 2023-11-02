'use client'
import { Dialog, Transition } from "@headlessui/react"
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from "react"

const overlay = {
  enter:"ease-out duration-300",
  enterFrom:"opacity-0",
  enterTo:"opacity-100",
  leave:"ease-in duration-200",
  leaveFrom:"opacity-100",
  leaveTo:"opacity-0"
}

const scale = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100 scale-100",
  leaveTo: "opacity-0 scale-95"
}

export default function Premium({children}: {children: (setState: Dispatch<SetStateAction<boolean>>) => React.ReactNode}) {
  const [open, setOpen] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const onClose = () => setOpen(false)

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [])

  return (
    <>
      {children(setOpen)}
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child as={Fragment} {...overlay}>
            <div className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[1px]" />
          </Transition.Child>
          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-3">
              <Transition.Child as={Fragment} {...scale}>
                <Dialog.Panel className="relative isolate w-full max-w-xl overflow-hidden rounded-2xl bg-white p-9 shadow-xl"> 
                  <BgGradient />
                  <div className='space-y-3'>
                    <Dialog.Title
                      as="h3"
                      className="text-xl text-neutral-800 font-medium"
                    >
                      Chào mừng đến với Menoú | Premium
                    </Dialog.Title>
                    <div className='text-left'>
                      <p className="text-sm text-neutral-500 font-medium">
                        Hiện tại, Menoú | Premium là một tính năng đang phát triển, bạn hoàn toàn có thể dùng thử miễn phí 
                        sau khi tính năng đã hoàn tất.
                      </p>
                    </div>
                  </div>

                  <div className='mt-11 text-right'>
                    <button
                      ref={buttonRef}
                      type="button"
                      className="
                        outline-none rounded-md bg-neutral-800 px-5 py-2 text-sm text-white font-medium 
                        focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2
                      "
                      onClick={onClose}
                    >
                      Đã hiểu
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
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