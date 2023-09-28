'use client'
import { useAppSelector } from "@/redux/hooks"
import { Dialog, Transition } from "@headlessui/react"
import { IconSearch } from "@tabler/icons-react"
import Link from "next/link"
import { ChangeEvent, Fragment, useState } from "react"

const transitionProps = {
  overlay: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  },
  scale: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 scale-95",
    enterTo: "opacity-100 scale-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-95"
  }
}

export default function Search() {
  const menuPublic = useAppSelector(state => state.menuPublic),
    [open, setOpen] = useState(false),
    [search, setSearch] = useState('')

  function onClose() {
    setOpen(false)
  }

  function isOpen() {
    setOpen(true)
  }

  function handleSetSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function ShowSearchResult() {
    const searchResult: number = menuPublic.filter(page => page.name.toLowerCase().includes(search.toLowerCase())).length
    return search && (
      <div>
        <Link href={`/community?search=${search}`}>
          <button 
            className="bg-white px-3 py-1 rounded-sm w-fit text-sm text-neutral-800 font-bold"
            onClick={onClose}
          >
            {searchResult} kết quả
          </button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={isOpen}
        className='
          p-3 px-9 text-neutral-800 rounded-lg shadow-custombox transition-all duration-300
          hover:shadow hover:shadow-neutral-200'
      >
        <IconSearch size='17px' strokeWidth='2.7' />
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child as={Fragment} {...transitionProps.overlay}>
            <div className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[1px]" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex justify-center p-3">
              <Transition.Child as={Fragment} {...transitionProps.scale}>
                <Dialog.Panel className="w-full max-w-xs space-y-3">
                  <input 
                    value={search}
                    type="text"
                    className="w-full outline-none p-2 bg-white text-sm text-neutral-800 font-medium rounded-sm"
                    onChange={handleSetSearch}
                  />
                  <ShowSearchResult />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}