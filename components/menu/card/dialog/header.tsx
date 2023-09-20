import { Tab } from "@headlessui/react"
import { IconDots } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { Dispatch, SetStateAction } from "react"

const tabs: string[] = ['Nguyên liệu', 'Chuẩn bị', 'Chế biến']

export default function Header({
  actions, 
  setActions
}: {
  actions: boolean, 
  setActions: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Tab.List className="flex justify-between sticky top-0 p-7 bg-white items-center">
      <div className="flex space-x-5">
        {tabs.map(tab => (
          <Tab 
            key={tab}
            className={({selected}) => `relative text-sm font-medium outline-none ${selected ? 'text-neutral-800' : 'text-neutral-400'}`}
          >
            {({selected}) => (
              <>
                {tab}
                {selected && <UnderLine />}
              </>
            )}
          </Tab>
        ))}
      </div>
      <IconDots
        size='20px' 
        strokeWidth='3'
        className={`text-neutral-400 hover:text-neutral-500 sm:flex ${actions && 'hidden'}`}
        onClick={() => setActions(!actions)}
      />
    </Tab.List>
  )
}

function UnderLine() {
  return <motion.div layoutId="under" className="absolute -bottom-2 left-0 right-0 p-[1px] rounded-full bg-neutral-800" />
}