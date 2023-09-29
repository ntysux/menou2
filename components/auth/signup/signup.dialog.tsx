'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Signup from './signup'
import { IconX } from '@tabler/icons-react'

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

  const FeaturesInit = {
    OnOpen: () => (
      <button
        onClick={isOpen}
        className="px-5 py-3 rounded-lg text-sm text-neutral-800 shadow-custombox hover:shadow transition-all"
      >
        Tạo tài khoản
      </button>
    ),
    OnClose: () => (
      <div className='mb-5 text-right'>
        <button 
          className='outline-none p-1 bg-neutral-950/75 text-neutral-200 rounded-full hover:text-white'
          onClick={onClose}
        >
          <IconX size='16px' strokeWidth='3' />
        </button>
      </div>
    )
  }
  
  return (
    <>
      <FeaturesInit.OnOpen />
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={isOpen}>
          <Transition.Child as={Fragment} {...transition.overlay}>
            <div className="fixed inset-0 bg-neutral-300" />
          </Transition.Child>
          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-3">
              <Transition.Child as={Fragment} {...transition.panel}>
                <Dialog.Panel className="w-full max-w-lg rounded-2xl p-7 bg-white">
                  <FeaturesInit.OnClose />
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