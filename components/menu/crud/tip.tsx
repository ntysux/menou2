import { Popover, Transition } from "@headlessui/react"
import { IconBulb } from "@tabler/icons-react"
import { Fragment } from "react"

const translateY = {
  enter: "transition ease-out duration-200",
  enterFrom: "opacity-0 translate-y-1",
  enterTo: "opacity-100 translate-y-0",
  leave: "transition ease-in duration-150",
  leaveFrom: "opacity-100 translate-y-0",
  leaveTo: "opacity-0 translate-y-1"
}

export default function Tip() {
  return (
    <Popover className="relative flex z-10">
      {({ open }) => (
        <>
          <Popover.Button className={`${open ? 'text-neutral-500' : 'text-neutral-300'} outline-none p-1.5 hover:text-neutral-500 rounded-lg`}>
            <IconBulb size='20px' strokeWidth='2' />
          </Popover.Button>
          <Transition as={Fragment} {...translateY}>
            <Popover.Panel className='absolute z-10 left-0 -bottom-7 min-w-max p-1 px-2 rounded-sm text-xs text-white font-bold bg-neutral-950/75'>
              Mẹo: nhấn Enter để thêm mới
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}