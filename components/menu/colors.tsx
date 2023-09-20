import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { changeColorMulti } from '@/redux/menu/slice'
import { Popover, Transition } from '@headlessui/react'
import { IconColorSwatch } from '@tabler/icons-react'
import { Fragment } from 'react'

const url = process.env.NEXT_PUBLIC_APP_URL

async function handleChangeColorMulti(idList: string[], color: string) {
  if (idList.length) {
    await fetch(`${url}/menu/api/update/multi/color`, {
      method: 'POST',
      body: JSON.stringify({idList, color})
    })
  }
}

const scale = {
  enter: "transition ease-out duration-200",
  enterFrom: "opacity-0 translate-y-1",
  enterTo: "opacity-100 translate-y-0",
  leave: "transition ease-in duration-150",
  leaveFrom: "opacity-100 translate-y-0",
  leaveTo: "opacity-0 translate-y-1"
}

const colors = [
  {color: 'bg-rose-100', face: 'bg-rose-400'}, 
  {color: 'bg-teal-100', face: 'bg-teal-400'}, 
  {color: 'bg-purple-100', face: 'bg-purple-400'},
  {color: 'bg-white', face: 'bg-white'}
]

export default function Colors() {
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  const idList = menu.filter(menu => menu.checked).map(menu => menu.id)

  return (
    <Popover className='relative flex'>
      <Popover.Button className='outline-none text-neutral-300 hover:text-neutral-400'>
        <IconColorSwatch size='17px' strokeWidth='2.7' />
      </Popover.Button>
      <Transition as={Fragment} {...scale}>
        <Popover.Panel className="absolute top-7 z-10 right-0 sm:left-0">
          <div className='flex space-x-1 p-1 w-fit rounded-sm bg-neutral-950/75'>
            {colors.map((colorTheme, index) =>
              <button 
                key={index} 
                onClick={() => {
                  dispatch(changeColorMulti(colorTheme.color))
                  handleChangeColorMulti(idList, colorTheme.color)
                }}
                className='hover:bg-neutral-600 rounded-full p-1'
              >
                <div className={`p-2 rounded-full ${colorTheme.face}`} />  
              </button>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}