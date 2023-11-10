'use client'
import { Dialog, Transition } from "@headlessui/react"
import { IconKeyframe } from "@tabler/icons-react"
import { Dispatch, Fragment, SetStateAction, useState } from "react"

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

interface Props {
  children: (setState: Dispatch<SetStateAction<boolean>>) => React.ReactNode
}

export default function PremiumFeature({children}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {children(setOpen)}
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child as={Fragment} {...overlay}>
            <div className="fixed inset-0 backdrop-blur-[1px]" />
          </Transition.Child>
          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-3">
              <Transition.Child as={Fragment} {...scale}>
                <Dialog.Panel className="w-full max-w-xs divide-y divide-neutral-700 overflow-hidden rounded-2xl bg-neutral-950/75 backdrop-blur-sm"> 
                  <Dialog.Title className='text-sm text-white font-medium text-center p-2.5'>
                    Premium
                  </Dialog.Title>
                  <div className="p-3 pb-9 space-y-1">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 m-1 rounded-full bg-orange-200" />
                      <p className="text-xs text-white font-medium">
                        Màu Royal
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <IconKeyframe size='20px' className="text-stone-500" />
                      <p className="text-xs text-white font-medium">
                        Các bài viết công khai được làm nổi bật
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setOpen(false)}
                    className="outline-none w-full p-2 text-sm text-neutral-300 font-medium hover:text-white hover:bg-neutral-700/75"
                  >
                    Đóng
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}