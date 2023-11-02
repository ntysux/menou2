import { IconChevronsRight } from "@tabler/icons-react"
import { OpenDialog } from "../types/types"
import Tip from "../tip"

export default function Header({setOpen}: {setOpen: OpenDialog}) {
  return (
    <div className='sticky top-0 z-20 p-1 flex border-b border-neutral-200'>
      <button 
        className='outline-none rounded-md p-1 text-neutral-300 hover:text-neutral-400'
        onClick={() => setOpen(false)}
      >
        <IconChevronsRight size='20px' />
      </button>
      <Tip />
    </div>
  )
}