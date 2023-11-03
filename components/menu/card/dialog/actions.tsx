'use client'
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Variants, motion } from "framer-motion"
import { IconColorSwatch, IconMaximize, IconPencil, IconTrash } from '@tabler/icons-react'
import { changeColor, remove } from "@/redux/menu/slice"
import CUDialog from "../../crud/dialog/dialog"
import { Dispatch, SetStateAction } from "react"
import { url } from "@/utils/app.url"

const container: Variants = {
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}
const item = {
  hidden: {y: 10, opacity: 0},
  visible: {y: 0, opacity: 1}
}

const main = {
  initial: {scale: 0.95, opacity: 0},
  animate: {scale: 1, opacity: 1},
  transition: {duration: 0.3, delay: 0.3}
}

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

const colors = [
  {color: 'bg-rose-100', name: 'Nóng hổi', face: 'bg-rose-400'}, 
  {color: 'bg-teal-100', name: 'Giải nhiệt', face: 'bg-teal-400'}, 
  {color: 'bg-purple-100', name: 'Chill', face: 'bg-purple-400'},
  {color: 'bg-white', name: 'Mặc định', face: 'bg-white'}
]

export default function CardActions({index}: {index: number}) {
  const 
    page = useAppSelector(state => state.menu)[index],
    dispatch = useAppDispatch()

  return (
    <motion.div
      {...main}
      className='absolute inset-y-0 right-0 w-screen max-w-[215px] rounded-2xl bg-neutral-950/75 backdrop-blur-[1px]'
    >
      <ul className='list-none grid grid-cols-4 gap-1 p-1'>
        <li className="flex justify-center rounded-xl p-1 bg-neutral-700 text-neutral-400">
          <IconColorSwatch size='18px' strokeWidth='2.5' />
        </li>
        <CUDialog index={index}>
          {setOpen => 
            <li
              onClick={() => setOpen(true)} 
              className="cursor-pointer flex justify-center rounded-xl p-1 text-neutral-600 hover:bg-neutral-700 hover:text-neutral-400"
            >
              <IconPencil size='18px' strokeWidth='2.5' />
            </li>
          }
        </CUDialog>
        <li
          onClick={() => {
            dispatch(remove(index))
            handleDelete(page.id)
          }} 
          className="cursor-pointer flex justify-center rounded-xl p-1 text-neutral-600 hover:bg-neutral-700 hover:text-neutral-400"
        >
          <IconTrash size='18px' strokeWidth='2.5' />
        </li>
        <Link href={`/menu/${page.id}`}>
          <li className="flex justify-center rounded-xl p-1 text-neutral-600 hover:bg-neutral-700 hover:text-neutral-400">
            <IconMaximize size='18px' strokeWidth='2.5' />
          </li>
        </Link>
      </ul>

      <motion.ul
        variants={container}
        initial="hidden"
        animate="visible"
        className="p-1 text-white text-sm font-medium"
      >
        {colors.map((colorOption, colorIndex) =>
          <motion.li 
            key={colorIndex}
            variants={item}
            onClick={() => {
              dispatch(changeColor({color: colorOption.color, index}))
              handleChangeColor(page.id, colorOption.color)
            }}
            className="flex items-center rounded-md cursor-pointer p-3 space-x-5 hover:bg-neutral-950/10"
          >
            <div className={`p-1.5 rounded-full ${colorOption.face}`}/>
            <p>{colorOption.name}</p>
          </motion.li>
        )}
      </motion.ul>
    </motion.div>
  )
}