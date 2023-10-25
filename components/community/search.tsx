'use client'
import { useAppSelector } from "@/redux/hooks"
import { overlay, scale } from "@/utils/transition.props"
import { Dialog, Transition } from "@headlessui/react"
import { IconSearch } from "@tabler/icons-react"
import Link from "next/link"
import { ChangeEvent, Fragment, useState } from "react"

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
          p-3 px-9 text-neutral-400 rounded-lg shadow-custombox transition-all duration-300
          hover:shadow hover:shadow-neutral-200 hover:text-neutral-600
        '
      >
        <IconSearch size='17px' strokeWidth='1' />
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child as={Fragment} {...overlay}>
            <div className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[1px]" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex justify-center p-3">
              <Transition.Child as={Fragment} {...scale}>
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