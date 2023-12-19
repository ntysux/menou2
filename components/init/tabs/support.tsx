import { useState } from "react"
import { motion } from "framer-motion"
import { TablerIconsProps, IconDeviceIpadHorizontal, IconDeviceDesktop, IconDeviceMobile } from "@tabler/icons-react"

const devices: ((props: TablerIconsProps) => JSX.Element)[] = [
  IconDeviceDesktop,
  IconDeviceIpadHorizontal,
  IconDeviceMobile
]

export default function Support() {
  const [deviceSelected, setDeviceSelected] = useState(0)
  
  return (
    <motion.div
      initial={{y: 7, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{delay: 0.5}}
      className="p-20 flex items-center justify-center rounded-xl shadow-custombox hover:shadow hover:shadow-neutral-200 transition-shadow duration-300"
    >
      <div className="space-y-3">
        <span className="text-sm text-neutral-800 font-bold">
          Thiết bị sử dụng
        </span>
        <div className="grid grid-cols-3 w-screen max-w-xs bg-neutral-200 rounded-md">
          {devices.map((Device, index) =>
            <div 
              key={index} 
              onClick={() => setDeviceSelected(index)}
              className="p-1 flex justify-center relative"
            >
              <Device 
                size='20px' 
                strokeWidth='2'
                className="text-neutral-500 relative z-10" 
              />
              {
                deviceSelected === index && 
                <motion.div layoutId="bg-btn" className="absolute inset-0 rounded-md bg-neutral-300/70" />
              }
            </div>
          )}
        </div>
        <span className="text-sm text-neutral-800 font-bold">
          Tin nhắn
        </span>
        <div>
          <textarea 
            placeholder="Để lại thông tin về vấn đề của bạn tại đây..."
            className="w-screen max-w-xs p-9"
          />
        </div>
      </div>
    </motion.div>
  )
}