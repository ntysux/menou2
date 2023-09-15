'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { IconFocusCentered, IconKeyframe, IconKeyframes, IconLayoutCollage } from '@tabler/icons-react'

export default function PremiumPage() {
  return (
    <>
      <NotificationDialog />
      <div className='grid grid-cols-3'>
        <div className='col-span-1'>
          <div className="relative rounded-lg isolate overflow-hidden bg-gray-50 p-11 w-fit">
            <BgGradient />
            <IconKeyframes size='36px' className="text-neutral-800" />
          </div>
        </div>
        <div className='col-span-2 space-y-9'>
          <h2 className='text-xl text-neutral-800 font-medium'>
            Menoú | Premium
          </h2>
          <p className='text-sm text-neutral-400 font-medium'>
            Hiện tại, Menoú | Premium là một tính năng đang phát triển, 
            bạn hoàn toàn có thể dùng thử miễn phí bằng cách nhấn vào "Dùng thử miễn phí"
          </p>
        </div>
      </div>

      <div className='mt-16'>
        <h3 className='text-sm text-neutral-800 font-bold'>
          Tính năng
        </h3>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
          <div className='space-y-1 p-5 rounded-lg shadow shadow-neutral-200'>
            <IconLayoutCollage strokeWidth='2.3' className='text-neutral-300' />
            <p className='text-sm text-neutral-500 font-semibold'>
              Giao diện người dùng riêng
            </p>
          </div>
          <div className='space-y-1 p-5 rounded-lg shadow shadow-neutral-200'>
            <IconKeyframe strokeWidth='2.3' className='text-neutral-300' />
            <p className='text-sm text-neutral-500 font-semibold'>
              Tích Premium
            </p>
          </div>
          <div className='space-y-1 p-5 rounded-lg shadow shadow-neutral-200'>
            <IconFocusCentered strokeWidth='2.3' className='text-neutral-300' />
            <p className='text-sm text-neutral-500 font-semibold'>
              Nổi bật các món ăn công khai 
            </p>
          </div>
        </div>
      </div>

      <button className="
        px-5 py-4 mt-9 text-sm font-semibold rounded-lg shadow-custombox float-right hover:shadow hover:shadow-neutral-200 transition-all
        bg-gradient-to-r from-purple-400 to-sky-400 text-transparent bg-clip-text
      ">
        Dùng thử miễn phí
      </button>
    </>
  )
}

function NotificationDialog() {
  const [isOpen, setOpen] = useState<boolean>(true)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [])

  const closeModal = () => setOpen(false)

  const transitionProps = {
    overlay: {
      enter: "ease-out duration-300",
      enterFrom: "opacity-0",
      enterTo: "opacity-100",
      leave: "ease-in duration-200",
      leaveFrom: "opacity-100",
      leaveTo: "opacity-0"
    },
    scale: {
      enter: "ease-out duration-300",
      enterFrom: "opacity-0 scale-95",
      enterTo: "opacity-100 scale-100",
      leave: "ease-in duration-200",
      leaveFrom: "opacity-100 scale-100",
      leaveTo: "opacity-0 scale-95"
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child as={Fragment} {...transitionProps.overlay}>
          <div className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[1px]" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center p-3">
            <Transition.Child as={Fragment} {...transitionProps.scale}>
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
                      bằng cách nhấn vào "Dùng thử miễn phí", tắt banner để tìm hiểu thêm.
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
                    onClick={closeModal}
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