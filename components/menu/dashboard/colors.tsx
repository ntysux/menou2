import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { changeColorMulti } from '@/redux/menu/slice'
import { url } from '@/utils/app.url'
import { translateY } from '@/utils/transition.props'
import { Popover, Transition } from '@headlessui/react'
import { IconColorSwatch } from '@tabler/icons-react'
import { Fragment } from 'react'

async function handleChangeColorMulti(idList: string[], color: string) {
  if (idList.length) {
    await fetch(`${url}/menu/api/update/multi/color`, {
      method: 'POST',
      body: JSON.stringify({idList, color})
    })
  }
}

const colors: {color: string, face: string}[] = [
  {color: 'bg-rose-100', face: 'bg-rose-400'}, 
  {color: 'bg-teal-100', face: 'bg-teal-400'}, 
  {color: 'bg-purple-100', face: 'bg-purple-400'},
  {color: 'bg-white', face: 'bg-white'}
]

export default function Colors() {
  const dispatch = useAppDispatch(),
    menu = useAppSelector(state => state.menu),
    idList = menu.filter(menu => menu.checked).map(menu => menu.id)

  async function changeColorAndDispatch(color: string) {
    dispatch(changeColorMulti(color))
    handleChangeColorMulti(idList, color)
  }

  return (
    <Popover className='relative flex'>
      <Popover.Button className='outline-none text-neutral-300 hover:text-neutral-400'>
        <IconColorSwatch size='17px' strokeWidth='2.7' />
      </Popover.Button>
      <Transition as={Fragment} {...translateY}>
        <Popover.Panel className="absolute top-7 z-10 right-0 sm:left-0">
          <div className='flex space-x-1 p-1 w-fit rounded-sm bg-neutral-950/75'>
            {colors.map((colorTheme, index) =>
              <button 
                key={index} 
                onClick={() => changeColorAndDispatch(colorTheme.color)}
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