import { Popover, Transition } from "@headlessui/react"
import { IconDots, IconMaximize, IconPencil, IconTrash } from "@tabler/icons-react"
import { Fragment } from "react"
import { motion } from "framer-motion"
import { url } from "@/utils/app.url"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { changeColor, remove } from "@/redux/menu/slice"
import CUDialog from "../../crud/dialog/dialog"
import FullMenuPage from "../../full.page"

async function handleChangeColor(id: string, color: string) {
  await fetch(`${url}/menu/api/update/single/color`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id, color})
  })
}
async function handleDelete(id: string) {
  await fetch(`${url}/menu/api/delete`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id})
  })
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

const colors = [
  {color: 'bg-rose-100', face: 'bg-rose-300'}, 
  {color: 'bg-teal-100', face: 'bg-teal-300'}, 
  {color: 'bg-purple-100', face: 'bg-purple-300'},
  {color: 'bg-orange-100', face: 'bg-orange-200'},
  {color: 'bg-white', face: 'bg-white'}
]

interface Props {
  index: number
}

export default function CardActionMobile({index}: Props) {
  const 
    dispatch = useAppDispatch(),
    page = useAppSelector(state => state.menu)[index],
    user = useAppSelector(state => state.user)

  return (
    <>
      <Popover className="flex relative">
        <Popover.Button className='outline-none'>
          <IconDots
            size='20px' 
            strokeWidth='3'
            className='text-neutral-400 hover:text-neutral-500 flex sm:hidden'
          />
        </Popover.Button>
        <Transition as={Fragment} {...translateY}>
          <Popover.Panel className="absolute right-0 top-7 z-10 overflow-hidden w-screen max-w-[230px] divide-y divide-neutral-600 bg-neutral-950/75 backdrop-blur-[1px] rounded-xl">
            <ul className="grid grid-cols-3">
              <CUDialog index={index}>
                {setOpen => 
                  <li 
                    onClick={() => setOpen(true)}
                    className="p-3 flex justify-center text-neutral-400 hover:bg-neutral-700"
                  >
                    <IconPencil size='17px' strokeWidth='2.3' />
                  </li>
                }
              </CUDialog>
              <li 
                onClick={() => {
                  dispatch(remove(index))
                  handleDelete(page.id)
                }} 
                className="p-3 flex justify-center text-neutral-400 hover:bg-neutral-700"
              >
                <IconTrash size='17px' strokeWidth='2.3' />
              </li>
              <FullMenuPage index={index}>
                {setOpen =>
                  <li 
                    onClick={() => setOpen(true)}
                    className="p-3 flex justify-center text-neutral-400 hover:bg-neutral-700"
                  >
                    <IconMaximize size='17px' strokeWidth='2.3' />
                  </li>
                }
              </FullMenuPage>
            </ul>
            <motion.ul
              variants={container}
              initial="hidden"
              animate="visible"
              className="p-2 flex space-x-1"
            >
              {colors.map((colorOption, colorIndex) => {
                if (!user.premium && colorIndex === 3) {
                  return null
                }

                return (
                  <motion.li 
                    key={colorIndex}
                    variants={item}
                    onClick={() => {
                      dispatch(changeColor({color: colorOption.color, index}))
                      handleChangeColor(page.id, colorOption.color)
                    }}
                    className="rounded-full p-1 hover:bg-neutral-950/10"
                  >
                    <div className={`p-2 rounded-full ${colorOption.face}`}/>
                  </motion.li>
                )
              })}
            </motion.ul>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  )
}