import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { changeColorMulti } from '@/redux/menu/slice'
import { url } from '@/utils/app.url'
import { Popover, Transition } from '@headlessui/react'
import { IconColorSwatch } from '@tabler/icons-react'
import { Fragment } from 'react'
import { motion } from 'framer-motion'

const container = {
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
}
const item = {
  hidden: {y: 10, opacity: 0},
  visible: {y: 0, opacity: 1}
}

const translateY = {
  enter: "transition ease-out duration-200",
  enterFrom: "opacity-0 translate-y-1",
  enterTo: "opacity-100 translate-y-0",
  leave: "transition ease-in duration-150",
  leaveFrom: "opacity-100 translate-y-0",
  leaveTo: "opacity-0 translate-y-1"
}

async function handleChangeColorMulti(idList: string[], color: string) {
  if (idList.length) {
    await fetch(`${url}/menu/api/update/multi/color`, {
      method: 'POST',
      body: JSON.stringify({idList, color})
    })
  }
}

const colors: {color: string, face: string}[] = [
  {color: 'bg-rose-100', face: 'bg-rose-300'}, 
  {color: 'bg-teal-100', face: 'bg-teal-300'}, 
  {color: 'bg-purple-100', face: 'bg-purple-300'},
  {color: 'bg-orange-100', face: 'bg-orange-200'},
  {color: 'bg-white', face: 'bg-white'}
]

export default function Colors() {
  const 
    dispatch = useAppDispatch(),
    menu = useAppSelector(state => state.menu),
    user = useAppSelector(state => state.user),
    idList = menu.filter(menu => menu.checked).map(menu => menu.id)

  async function changeColorAndDispatch(color: string) {
    dispatch(changeColorMulti(color))
    handleChangeColorMulti(idList, color)
  }

  return (
    <Popover className='relative flex'>
      <Popover.Button className='outline-none text-neutral-300 hover:text-neutral-400'>
        <IconColorSwatch size='17px' strokeWidth='2.7' />
      </Popover.Button>
      <Transition as={Fragment} {...translateY}>
        <Popover.Panel className="absolute top-7 z-10 right-0 sm:left-0">
          <motion.ul 
            variants={container}
            initial="hidden"
            animate="visible"
            className='flex space-x-1 p-1 w-fit rounded-sm bg-neutral-950/75'
          >
            {colors.map((colorTheme, index) => {
              if (!user.premium && index === 3) {
                return null
              }
              return (
                <motion.li
                  key={index}
                  variants={item} 
                  onClick={() => changeColorAndDispatch(colorTheme.color)}
                  className='hover:bg-neutral-600 rounded-full p-1'
                >
                  <div className={`p-2 rounded-full ${colorTheme.face}`} />  
                </motion.li>
              )
            })}
          </motion.ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}