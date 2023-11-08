import { IconArrowNarrowLeft } from "@tabler/icons-react"
import { OpenDialog } from "../types/types"
import Tip from "../tip"

export default function Header({setOpen}: {setOpen: OpenDialog}) {
  return (
    <div className='sticky top-0 z-20 p-3 flex flex-col bg-white'>
      <button 
        className='outline-none w-fit text-neutral-800'
        onClick={() => setOpen(false)}
      >
        <IconArrowNarrowLeft size='20px' />
      </button>
      <div className="absolute -bottom-8 hidden sm:block">
        <Tip />
      </div>
    </div>
  )
}