import { Init, SetFieldValue } from "./types/types"
import { motion } from 'framer-motion'

const options: string[] = ['Công khai', 'Riêng tư']

interface Props {
  values: Init
  setFieldValue: SetFieldValue
}

export default function Status({values, setFieldValue}: Props) {
  
  function BgOverlay() {
    return <motion.div 
      layoutId='btn' 
      className={`
        absolute inset-0 rounded-md
        ${values.status ? 'bg-violet-100' : 'bg-stone-200'}
      `}
    />
  }

  return (
    <div className='w-fit grid grid-cols-2'>
      {options.map((option, index) =>
        <div key={index} className='relative'>
          <button
            type='button' 
            onClick={() => setFieldValue('status', Boolean(index))}
            className={`
              relative w-full z-10 p-1 px-3 text-xs font-medium
              ${
                values.status === Boolean(index) && values.status 
                ? 'text-violet-900' 
                : values.status === Boolean(index) && !values.status
                ? 'text-stone-900'
                : 'text-neutral-400'
              }
            `}
          >
            {option}
          </button>
          {values.status === Boolean(index) && <BgOverlay />}
        </div>
      )}
    </div>
  )
}