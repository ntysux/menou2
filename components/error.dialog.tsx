'use client'
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect, Dispatch, SetStateAction } from "react"

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
  state?: boolean
  children?: (setOpen: Dispatch<SetStateAction<boolean>>) => React.ReactNode
  text: string
}

export default function ErrorDialog({state, children, text}: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    state && setOpen(state)
  }, [state])

  return (
    <>
      {children && children(setOpen)}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child as={Fragment} {...overlay}>
            <div className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[1px]" />
          </Transition.Child>
          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-3">
              <Transition.Child as={Fragment} {...scale}>
                <Dialog.Panel className="w-full max-w-xs divide-y divide-neutral-600 overflow-hidden rounded-2xl bg-neutral-950/75">
                  <div className="p-7 text-center text-sm text-white font-medium">
                    {text}
                  </div>
                  <button 
                    onClick={() => setOpen(false)}
                    className="outline-none p-3 w-full text-sm text-neutral-300 font-medium hover:text-white hover:bg-neutral-700"
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