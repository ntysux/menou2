import ComboBox from "@/components/menu.group/card/dialog/combobox"
import Editable from "@/components/editable/editable"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { listRemove, rename } from "@/redux/menu.group/slice"
import { Dialog, Transition } from "@headlessui/react"
import { IconMinus } from "@tabler/icons-react"
import { ChangeEvent, Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import { url } from "@/utils/app.url"
import { setUpdating } from "@/redux/updating/slice"
import FullMenuPage from "@/components/menu/full.page"

async function handleRenameApi(name: string, id: string): Promise<{id: string}> {
  const response = await fetch(`${url}/menugroup/api/update/rename`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, id})
  })
  return response.json()
}

interface Props {
  index: number
  children: (setOpen: Dispatch<SetStateAction<boolean>>) => React.ReactNode
}

export default function CardDialog({index, children}: Props) {
  const 
    dispatch = useAppDispatch(),
    updating = useAppSelector(state => state.updating),
    [open, setOpen] = useState(false),
    [time, setTime] = useState<any>(null),
    {id: pageId, name, list} = useAppSelector(state => state.menuGroup)[index]

  function handleRename(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value
    dispatch(setUpdating(true))
    dispatch(rename({name, index}))

    if (time) {
      clearTimeout(time)
      setTime(null)
    }
    const timeout = setTimeout(async() => {
      const {id} = await handleRenameApi(name.trim() ? name.trim().replace(/ {2,}/g, ' ') : 'Không tiêu đề', pageId)
      id && dispatch(setUpdating(false))
    }, 3000)
    setTime(timeout)
  }

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (updating) {
        const mess = 'Dữ liệu đang cập nhập, rời khỏi trang ?'
        event.returnValue = mess
        return mess
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [updating])

  return (
    <>
      {children(setOpen)}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[1px]" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-3">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-96 max-w-lg rounded-2xl bg-white overflow-auto hidden-scroll">
                  <div className="sticky top-0 z-10 bg-white">
                    <Editable 
                      value={name} 
                      className="w-full p-3 flex justify-center"
                    >
                      <Editable.Preview className="text-sm text-neutral-800 font-bold max-w-[100px] truncate" />
                      <Editable.Input
                        blur={() => !name.trim() && dispatch(rename({name: 'Không tiêu đề', index}))} 
                        onChange={handleRename} 
                        className="outline-neutral-800 text-sm text-neutral-800 font-medium selection:bg-neutral-300"
                      />
                    </Editable>
                    <ComboBox index={index} />
                  </div>

                  <ul className="m-3">
                    {list.map((item, itemIndex) => 
                      <li key={itemIndex} className="p-1 flex items-center justify-between">
                        {
                          item.includes('+') &&
                          <FullMenuPage index={Number(item.split('+')[0])}>
                            {setOpen => (
                              <span 
                                className='cursor-pointer font-bold text-sm text-neutral-800'
                                onClick={() => setOpen(true)}
                              >
                                {item.split('+')[1]}
                              </span>
                            )}
                          </FullMenuPage>
                        }
                        {
                          !item.includes('+') &&
                          <span className='font-medium text-sm text-neutral-800'>
                            {item}
                          </span>
                        }
                        <button 
                          onClick={() => dispatch(listRemove({pageIndex: index, itemIndex}))}
                          className="text-neutral-300 hover:text-neutral-400"
                        >
                          <IconMinus 
                            size='16px' 
                            strokeWidth='3' 
                          />
                        </button>
                      </li>
                    )}
                  </ul>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}