'use client'
import { Menu } from '@/redux/menu/types'
import Checkbox from '../checkbox'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { checkedMenu } from '@/redux/menu/slice'

interface Props {
  index: number
  onClick: () => void
}

export default function Card({index, onClick}: Props) {
  const page = useAppSelector(state => state.menu)[index]
  const dispatch = useAppDispatch()

  return (
    <div className={`relative p-3 rounded-xl ${page.checked ? 'ring-2 ring-neutral-800' : 'shadow shadow-neutral-200 hover:ring-1 hover:ring-neutral-200'}`}>
      <div className='space-y-9' onClick={onClick}>
        <h3 className="truncate max-w-[150px] leading-3 text-xs font-bold text-neutral-800">
          {page.name}
        </h3>
        <div className={`${page.status ? 'bg-purple-100 text-purple-800' : 'bg-sky-100 text-sky-800'} px-3 py-1 text-xs font-medium w-fit rounded-md`}>
          {page.status ? 'Riêng tư' : 'Công khai'}
        </div>
      </div>

      <div className='absolute top-3 right-3'>
        <Checkbox 
          checked={page.checked ?? false} 
          onChange={e => dispatch(checkedMenu({checked: e.target.checked, index}))} 
        />
      </div>
    </div>
  )
}