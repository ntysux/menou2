import Checkbox from "@/components/checkbox"
import { useAppSelector } from "@/redux/hooks"
import { Tab } from "@headlessui/react"
import { motion } from "framer-motion"

const transition = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
  transition: { duration: 0.2 }
}

export default function Content({index}: {index: number}) {
  const {materials, required, steps} = useAppSelector(state => state.menu)[index]
  const panels = [materials?.split('|'), required?.split('|'), steps?.split('|')]

  return (
    <Tab.Panels className="px-6 pb-6">
      {panels.map((panel, panelIndex) => (
        <Tab.Panel key={panelIndex}>
          <motion.div {...transition}>
            <ul>
              {panel?.map((line, lineIndex) => (
                <li key={lineIndex} className="p-1 text-neutral-800 text-sm font-medium">
                  {
                    !panelIndex 
                    ?
                    <Checkbox>
                      {isChecked => 
                        <span className={`${isChecked && 'line-through text-neutral-400/75'}`}>
                          {line}
                        </span>
                      }
                    </Checkbox>
                    :
                    line
                  }
                </li>
              ))}
            </ul>
          </motion.div>
        </Tab.Panel>
      ))}
    </Tab.Panels>
  )
}