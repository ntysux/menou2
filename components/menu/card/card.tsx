'use client'
import Checkbox from '../../checkbox'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { check } from '@/redux/menu/slice'

export default function Card({index, onClick}: {index: number, onClick?: () => void}) {
  const {color, checked, name, status} = useAppSelector(state => state.menu)[index]
  const dispatch = useAppDispatch()

  return (
    <div className={`${color} relative z-0 p-3 rounded-xl ${checked ? 'ring-2 ring-neutral-800' : 'shadow shadow-neutral-200 hover:ring-1 hover:ring-neutral-200'}`}>
      <div className='space-y-9' onClick={onClick}>
        <h3 className="truncate max-w-[100px] leading-3 text-xs font-bold text-neutral-800">
          {name}
        </h3>
        {
          color && color !== 'bg-white'
          ?
          <div className={`${color} px-3 py-1 text-xs font-medium w-fit rounded-md`}>
            {status ? 'Riêng tư' : 'Công khai'}
          </div>
          :
          <div className={`${status ? 'bg-violet-100 text-violet-900' : 'bg-cyan-100 text-cyan-900'} px-3 py-1 text-xs font-medium w-fit rounded-md`}>
            {status ? 'Riêng tư' : 'Công khai'}
          </div>
        }
      </div>

      <div className='absolute top-3 right-3'>
        <Checkbox 
          checked={checked ?? false} 
          onChange={e => dispatch(check({checked: e.target.checked, index}))} 
        />
      </div>
    </div>
  )
}