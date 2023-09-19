import CreateForm from "../form/create.form"
import UpdateForm from "../form/update.form"
import { OpenDialog } from "../types/types"

export default function Content({index, setOpen}: {index: number | undefined, setOpen: OpenDialog}) {
  return (
    <div className='p-5 pb-32 h-full overflow-y-scroll hidden-scroll'>
      {
        index !== undefined 
        ? <UpdateForm pageIndex={index} setOpen={setOpen} />
        : <CreateForm setOpen={setOpen} />
      }
    </div>
  )
}