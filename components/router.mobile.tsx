import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { IconAlignRight } from '@tabler/icons-react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { motion } from "framer-motion"
import Link from 'next/link'
import Premium from './premium'
import { useRouter } from 'next/navigation'
import { url } from '@/utils/app.url'

const container = {
  visible: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const ul = {
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
}

const li = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1
  }
}

interface Routes {
  name: string,
  href: string
}

const transitionProps = {
  overlay: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  },
  tranlateX: {
    enter: "transform transition ease-in-out duration-700",
    enterFrom: "translate-x-full opacity-0",
    enterTo: "translate-x-0 opacity-1",
    leave: "transform transition ease-in-out duration-700",
    leaveFrom: "translate-x-0 opacity-1",
    leaveTo: "translate-x-full opacity-0"
  }
}

const personalRoutes: Routes[] = [
  {name: 'Menu', href: '/menu'},
  {name: 'Thùng rác', href: '/menu/trash'}
]

function PremiumRoute() {
  return (
    <Premium>
      {setPremiumOpen =>
        <motion.li
          onClick={() => setPremiumOpen(true)}
          variants={item} 
          className='p-3 text-white text-sm font-medium'
        >
          Premium  
        </motion.li>
      }
    </Premium>
  )
}

function CommunityRoute({setOpen}: {setOpen: Dispatch<SetStateAction<boolean>>}) {
  return (
    <Link href='/community' className='outline-none'>
      <motion.li
        onClick={() => setOpen(false)}
        variants={item} 
        className='p-3 text-white text-sm font-medium'
      >
        Cộng đồng
      </motion.li>
    </Link>
  )
}

function MenuRoute({setOpen}: {setOpen: Dispatch<SetStateAction<boolean>>}) {
  return (
    <motion.li 
      variants={item} 
      className='p-3 text-white text-sm font-medium'
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button as='div' className='w-full flex items-center justify-between outline-none'>
              <span>Cá nhân</span>
              <div className={`p-1 ${open ? 'px-1 bg-neutral-500' : 'px-3 bg-neutral-600'} rounded-full transition-all`} />
            </Disclosure.Button>
            <Disclosure.Panel className="p-3 pb-1">
              <motion.ul
                className='list-none space-y-1'
                variants={ul}
                initial="hidden"
                animate="visible"
              >
                {personalRoutes.map(personalRoute =>
                  <Link key={personalRoute.name} href={personalRoute.href}>
                    <motion.li
                      variants={li} 
                      className='p-2 text-sm text-neutral-300 font-medium'
                      onClick={() => setOpen(false)}
                    >
                      {personalRoute.name}
                    </motion.li>
                  </Link>
                )}
              </motion.ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </motion.li>
  )
}

function Signout({setOpen}: {setOpen: Dispatch<SetStateAction<boolean>>}) {
  const router = useRouter()

  async function handleSignout() {
    setOpen(false)
    const response = await fetch(`${url}/auth/api/signout`, {method: 'POST'})
    if (response.status === 200) {
      router.replace('/')
    }
  }

  return (
    <motion.li
      onClick={handleSignout}
      variants={item} 
      className='p-3 text-white text-sm font-medium'
    >
      Đăng xuất
    </motion.li>
  )
}

export default function RouterMobile() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setOpen(true)} className='outline-none sm:hidden'>
        <IconAlignRight size='20px' strokeWidth='2.3' className='text-neutral-800' />
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child as={Fragment} {...transitionProps.overlay}>
            <div className="fixed inset-0 bg-neutral-950/50 backdrop-blur-[1px]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed right-3 top-16 flex max-w-full">
                <Transition.Child as={Fragment} {...transitionProps.tranlateX}>
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-xs bg-neutral-800/75 backdrop-blur-[1px] p-5 rounded-xl">
                    <motion.ul
                      className='list-none'
                      variants={container}
                      initial="hidden"
                      animate="visible"
                    >
                      <MenuRoute setOpen={setOpen} />
                      <CommunityRoute setOpen={setOpen} />
                      <PremiumRoute />
                      <Signout setOpen={setOpen} />
                    </motion.ul>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}