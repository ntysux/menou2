import { useAppSelector } from "@/redux/hooks"
import { Transition } from "@headlessui/react"
import { IconCloud } from "@tabler/icons-react"

export default function Updating() {
  const updating = useAppSelector(state => state.updating)

  return (
    <Transition
      show={updating}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-x-5"
      enterTo="opacity-100 translate-x-0"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-5"
    >
      <IconCloud 
        size='20px'
        className="text-neutral-400 animate-pulse"
      />
    </Transition>
  )
}