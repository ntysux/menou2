import { IconPencil } from "@tabler/icons-react"

export default function Empty() {
  return (
    <div className='space-y-1 p-3 text-center'>
      <h3 className='text-neutral-500 font-medium'>
        Trống
      </h3>
      <div className='flex items-center justify-center space-x-1 text-xs font-medium text-neutral-400'>
        <span>Nhấn vào</span> 
        <div className="p-1 rounded-md bg-neutral-200">
          <IconPencil size='15px' strokeWidth='2.7' className='text-neutral-500' />
        </div>
        <span>để thêm mới.</span>
      </div>
    </div>
  )
}