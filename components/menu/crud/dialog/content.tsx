import CreateForm from "../form/create.form"
import UpdateForm from "../form/update.form"
import { OpenDialog } from "../types/types"

export default function Content({index, setOpen}: {index: number | undefined, setOpen: OpenDialog}) {
  return (
    <div className='w-full max-w-3xl px-3 pb-9 sm:px-0 sm:mx-auto'>
      {
        index !== undefined 
        ? <UpdateForm pageIndex={index} setOpen={setOpen} />
        : <CreateForm setOpen={setOpen} />
      }
    </div>
  )
}