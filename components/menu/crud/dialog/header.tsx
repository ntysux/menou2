import { IconChevronRight } from "@tabler/icons-react"
import { OpenDialog } from "../types/types"
import Tip from "../tip"

export default function Header({setOpen}: {setOpen: OpenDialog}) {
  return (
    <div className='sticky top-0 z-20 flex p-1 border-b border-neutral-200'>
      <button 
        className='outline-none p-1.5 text-neutral-300 hover:text-neutral-500'
        onClick={() => setOpen(false)}
      >
        <IconChevronRight size='20px' strokeWidth='3' />
      </button>
      <Tip />
    </div>
  )
}