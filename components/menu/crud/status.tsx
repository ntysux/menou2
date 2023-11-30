import { Popover, Transition } from "@headlessui/react"
import { Init, SetFieldValue } from "./types/types"
import { motion } from 'framer-motion'
import { Fragment } from 'react'

const options: string[] = ['Công khai', 'Riêng tư']

interface Props {
  values: Init
  setFieldValue: SetFieldValue
}

export default function Status({values, setFieldValue}: Props) {
  
  function BgOverlay() {
    return (
      <motion.div 
        layoutId='btn'
        className='absolute inset-0 rounded-xl bg-neutral-600'
      />
    )
  }

  return (
    <Popover className="relative flex w-fit">
      <Popover.Button className='outline-none text-sm text-neutral-400 font-medium'>
        {!values.status ? 'Công khai' : 'Riêng tư'}
      </Popover.Button>

      <Transition 
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 top-7 sm:left-0 right-0">
          <div className="bg-neutral-950/75 backdrop-blur-sm rounded-xl p-1 w-screen max-w-[210px]">
            {options.map((option, index) =>
              <div key={index} className='relative min-w-fit'>
                <button
                  type='button' 
                  onClick={() => setFieldValue('status', Boolean(index))}
                  className={`
                    relative z-10 w-full p-2.5 text-xs font-medium flex justify-between
                    ${values.status === Boolean(index) ? 'text-white' : 'text-neutral-300'}
                  `}
                >
                  {option}
                  {
                    index === 0 && 
                    <span className="text-xs text-neutral-400 font-medium">
                      Mặc định
                    </span>
                  }
                </button>
                {values.status === Boolean(index) && <BgOverlay />}
              </div>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}