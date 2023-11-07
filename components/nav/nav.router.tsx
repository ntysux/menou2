'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import Link from 'next/link'
import Premium from '../premium'
import { url } from '@/utils/app.url'
import { init as menuInit } from "@/redux/menu/slice"
import { init as userInit } from "@/redux/user/slice"
import { IconDots } from '@tabler/icons-react'

const container = {
  visible: {
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.1
    }
  }
}
  
const item = {
  hidden: {x: 20, opacity: 0},
  visible: {x: 0, opacity: 1}
}

interface Route {
  name: string
  href?: string
  command?: number,
}

interface Props {
  cookie: RequestCookie | undefined
}

export default function NavRouter({cookie}: Props) {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  const router = useRouter()

  const menuDeletedCount = menu.filter(page => page.deleted).length

  const routes: Route[] = [
    {name: 'Menu', href: '/menu', command: menu.length - menuDeletedCount},
    {name: 'Thùng rác', href: '/menu/trash', command: menuDeletedCount},
    {name: 'Cộng đồng', href: '/community'},
    {name: 'Premium'},
    {name: 'Đăng xuất'}
  ]

  async function handleSignout() {
    const response = await fetch(`${url}/auth/api/signout`, {method: 'POST'})
    if (response.status === 200) {
      dispatch(menuInit([]))
      dispatch(userInit({id: '', name: '', verified: false, premium: false}))
      router.replace('/')
      router.refresh()
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='outline-none hidden sm:block'
      >
        <IconDots
          size='20px' 
          strokeWidth='3'
          className={`${open ? 'text-neutral-400' : 'text-neutral-300'}`}
        />
      </button>
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0">
            <div className='absolute inset-y-0 right-0 flex'>
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in duration-500"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <Dialog.Panel className='w-screen max-w-xs p-1 bg-neutral-950/75 backdrop-blur-[1px]'>
                  <motion.ul
                    variants={container}
                    initial="hidden"
                    animate="visible"
                  >
                    {routes.map(route =>
                      route.href 
                      ?
                        <Link 
                          key={route.name} 
                          href={route.href} 
                          className="outline-none"
                        >
                          <motion.li 
                            variants={item}
                            onClick={() => setOpen(false)}
                            className="relative px-7 py-4 text-xs text-neutral-300 rounded-xl group hover:bg-neutral-600/75"
                          >
                            <span className="font-bold group-hover:text-white">
                              {route.name}
                            </span>
                            {
                              typeof route.command === 'number' &&
                              <span className="absolute right-3 inset-y-3.5 flex items-center px-3 rounded-full bg-neutral-600 font-medium">
                                {route.command}
                              </span>
                            }
                          </motion.li>
                        </Link>
                      :
                        route.name === 'Premium' 
                        ?
                          <Premium key={route.name}>
                            {setPremiumOpen => 
                              <motion.li 
                                variants={item}
                                onClick={() => setPremiumOpen(true)}
                                className="cursor-pointer px-7 py-4 text-xs text-neutral-300 font-bold rounded-xl hover:bg-neutral-600/75 hover:text-white"
                              >
                                {route.name}
                              </motion.li>
                            }
                          </Premium>
                        :
                          cookie?.value &&
                          <motion.li 
                            key={route.name} 
                            variants={item}
                            onClick={handleSignout}
                            className="cursor-pointer px-7 py-4 text-xs text-neutral-300 font-bold rounded-xl hover:bg-neutral-600/75 hover:text-white"
                          >
                            {route.name}
                          </motion.li>
                    )}
                  </motion.ul>
                </Dialog.Panel>
              </Transition.Child>
            </div> 
          </div>
        </Dialog>
      </Transition>
    </>
  )
}