'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Signup from './signup'

const transition = {
  overlay: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  },
  panel: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 scale-95",
    enterTo: "opacity-100 scale-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-95"
  }
}

export default function SignupDialog() {
  const [open, setOpen] = useState<boolean>(false)
  const isOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  
  return (
    <>
      <button
        onClick={isOpen}
        className="px-5 py-3 rounded-lg text-sm text-neutral-800 shadow-custombox hover:shadow transition-all"
      >
        Tạo tài khoản
      </button>

      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child as={Fragment} {...transition.overlay}>
            <div className="fixed inset-0 bg-neutral-300/75" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-3">
              <Transition.Child as={Fragment} {...transition.panel}>
                <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-7">
                  <Signup />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}