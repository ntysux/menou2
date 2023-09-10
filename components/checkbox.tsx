'use client'
import { motion } from "framer-motion"
import { ChangeEvent } from 'react'

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0
  },
  visible: {
    opacity: 1,
    pathLength: 1
  }
}

export default function Checkbox({
  checked,
  onChange,
  indeterminate
}: {
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  indeterminate?: boolean
}) {
  return (
    <div className="relative h-4 w-4">
      <input 
        id="input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className='
          absolute z-10 appearance-none rounded-[4px] h-4 w-4 
          ring-1 ring-neutral-500/30 checked:ring-2 checked:ring-neutral-950/75
        '
      />
      {
        checked &&
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox='0 0 24 24'
          className='w-[14px] h-[14px] stroke-neutral-900/75 absolute inset-[1px]'
          fill='none'
          strokeWidth='4'
          strokeLinejoin='round'
          strokeLinecap='round'
        >
          <motion.path
            d="M5 12l5 5l10 -10"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.svg>
      }
      {
        indeterminate &&
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox='0 0 24 24'
          className='w-[14px] h-[14px] stroke-neutral-900/75 absolute inset-[1px]'
          fill='none'
          strokeWidth='2'
          strokeLinejoin='round'
          strokeLinecap='round'
        >
          <motion.path
            d="M5 12l14 0"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.svg>
      }
    </div>
  )
}