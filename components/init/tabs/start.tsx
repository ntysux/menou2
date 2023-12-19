import { motion } from "framer-motion"
import { effect } from "../effect/effect"
import SigninDialog from "@/components/auth/signin/dialog"
import Link from "next/link"

export default function Start({selected}: {selected: boolean}) {
  return (
    <motion.div 
      variants={effect.y.container}
      initial="hidden"
      animate={selected ? 'visible' : 'hidden'}
      className='flex lg:flex-row flex-col gap-1 w-fit mx-auto'
    >
      <SigninDialog>
        {setOpen => 
          <motion.div 
            variants={effect.y.item}
            onClick={() => setOpen(true)}
            className="max-w-xs bg-white rounded-2xl transition-shadow duration-300 cursor-pointer shadow-xl shadow-neutral-200 hover:shadow hover:ring-1 hover:ring-neutral-200"
          >
            <div className="p-5">
              <h2 className="text-sm text-neutral-800 font-bold">
                Menu
              </h2>
            </div>
            <div className="p-9">
              <p className="text-sm text-neutral-700 font-medium">
                Sáng tạo các công thức nấu ăn và thực đơn của riêng bạn.
              </p>
            </div>
          </motion.div>
        }
      </SigninDialog>
      <Link href='/community'>
        <motion.div 
          variants={effect.y.item}
          className="max-w-xs bg-white rounded-2xl transition-shadow duration-300 shadow-xl shadow-neutral-200 hover:shadow hover:ring-1 hover:ring-neutral-200"
        >
          <div className="p-5">
            <h2 className="text-sm text-neutral-800 font-bold">
              Cộng đồng
            </h2>
          </div>
          <div className="p-9">
            <p className="text-sm text-neutral-700 font-medium">
              Không cần đăn nhập. Khám phá các công thức nấu ăn từ cộng đồng.
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}