'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import Signin from './signin'
import GoogleSignInBtn from '../authorization.btn'

export const overlay = {
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
  children?: (setOpen: Dispatch<SetStateAction<boolean>>) => React.ReactNode
}

export default function SigninDialog({children}: Props) {
  const [open, setOpen] = useState<boolean>(children ? false : true)

  return (
    <>
      {children && children(setOpen)}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => false}>
          {
            !children &&
            <Transition.Child as={Fragment} {...overlay}>
              <div className='fixed inset-0 bg-neutral-950/25 backdrop-blur-[1px]' />
            </Transition.Child>
          }
          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-3">
              <Transition.Child as={Fragment} {...scale}>
                <Dialog.Panel className="w-full max-w-sm flex flex-col justify-center space-y-3 rounded-2xl overflow-hidden bg-neutral-950/75 backdrop-blur-sm">
                  <GoogleSignInBtn />
                  <div className='text-sm text-white font-medium text-center'>hoặc</div>
                  <Signin setOpen={children && setOpen} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}