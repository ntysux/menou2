'use client'
import { Disclosure, Popover, Transition } from "@headlessui/react"
import { IconAlignRight, IconChevronRight } from "@tabler/icons-react"
import Link from "next/link"
import { Fragment } from "react"
import { motion } from 'framer-motion'
import { url } from "@/utils/app.url"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { init as menuInit } from "@/redux/menu/slice"
import { init as userInit } from "@/redux/user/slice"
import { useRouter } from "next/navigation"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import PremiumPreface from "../premium/premium.preface"
import PremiumFeature from "../premium/premium.feature"

const translateY = {
  enter: "transition ease-out duration-200",
  enterFrom: "opacity-0 translate-y-1",
  enterTo: "opacity-100 translate-y-0",
  leave: "transition ease-in duration-150",
  leaveFrom: "opacity-100 translate-y-0",
  leaveTo: "opacity-0 translate-y-1"
}

const container = {
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
}
  
const item = {
  hidden: {y: 7, opacity: 0},
  visible: {y: 0, opacity: 1}
}

interface Route {
  name: string
  href?: string
  command?: number,
}

interface Props {
  cookie: RequestCookie | undefined
}

export default function NavRouterMobile({cookie}: Props) {
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

  async function handleSignOut() {
    const response = await fetch(`${url}/auth/api/signout`, {method: 'POST'})
    if (response.status === 200) {
      dispatch(menuInit([]))
      dispatch(userInit({id: '', name: '', verified: false, premium: false}))
      router.replace('/')
      router.refresh()
    }
  }

  return (
    <Popover className="flex relative sm:hidden">
      <Popover.Button className='outline-none'>
        <IconAlignRight 
          size='20px' 
          strokeWidth='2.5' 
          className="text-neutral-800"
        />
      </Popover.Button>
      <Transition as={Fragment} {...translateY}>
        <Popover.Panel className="absolute right-0 z-50 mt-9 rounded-2xl p-1 overflow-hidden w-screen max-w-[270px] bg-neutral-950/75 backdrop-blur-[1px]">
          {({close}) =>
            <motion.ul
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {routes.map(route =>
                route.href 
                ?
                  <Link href={route.href} key={route.name} className="outline-none">
                    <motion.li 
                      variants={item}
                      onClick={() => close()}
                      className="relative px-7 py-4 text-xs text-neutral-300 rounded-xl group hover:bg-neutral-700"
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
                    <Disclosure key={route.name}>
                      <Disclosure.Button 
                        as={motion.li}
                        variants={item}
                        className="cursor-pointer flex items-center justify-between pl-7 pr-3 py-4 rounded-xl hover:bg-neutral-600/75"
                      >
                        {({open}) =>
                          <>
                            <span className='text-xs text-neutral-300 font-bold hover:text-white'>
                              Premium
                            </span>
                            <IconChevronRight 
                              size='15px'
                              strokeWidth='3'
                              className={`${open ? 'rotate-90 text-white' : 'rotate-0 text-neutral-300'} transition-all`} 
                            />
                          </>
                        }
                      </Disclosure.Button>
                      <Disclosure.Panel as='ul'>
                        <PremiumPreface>
                          {setPremiumOpen => 
                            <li 
                              onClick={() => setPremiumOpen(true)}
                              className="cursor-pointer ml-9 p-3 text-xs text-neutral-300 font-medium rounded-xl hover:bg-neutral-600/75 hover:text-white"
                            >
                              Lời mở đầu
                            </li>
                          }
                        </PremiumPreface>
                        <PremiumFeature>
                          {setPremiumOpen =>
                            <li
                              onClick={() => setPremiumOpen(true)} 
                              className="cursor-pointer ml-9 p-3 text-xs text-neutral-300 font-medium rounded-xl hover:bg-neutral-600/75 hover:text-white"
                            >
                              Tính năng
                            </li>
                          }
                        </PremiumFeature>
                      </Disclosure.Panel>
                    </Disclosure>
                  :
                    cookie?.value &&
                    <motion.li 
                      key={route.name} 
                      variants={item}
                      onClick={handleSignOut}
                      className="cursor-pointer px-7 py-4 text-xs text-neutral-300 font-bold rounded-xl hover:bg-neutral-700 hover:text-white"
                    >
                      {route.name}
                    </motion.li>
              )}
            </motion.ul>
          }
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}