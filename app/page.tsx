'use client'
import HorizontalCardPreview from "@/components/card.h.preview"
import VerticalCardPreview from "@/components/card.v.preview"
import { IconArrowNarrowRight, IconCrown } from "@tabler/icons-react"
import { motion } from 'framer-motion'

const users = [
  'dqv', 'joe', 
  'doe', 'yasuo',
  'kitty', 'cat',
  'dog', 'tom',
  'jerry', 'susan',
  'bird' 
]

export default function Init() {
  return (
    <>
      <div className="space-y-9">
        
        <div className="flex items-center justify-center p-9">
          <div className="space-y-3 max-w-xs">
            <p className="text-neutral-800 font-medium">
              <span className="text-xl font-bold">
                CREATED BY YOU •
              </span> Tạo công thức nấu ăn và lên thực đơn đầu tiên của bạn với Menoú
            </p>
            <button className="relative text-sm text-neutral-800 font-bold rounded-sm px-5 py-2.5 border-2 border-neutral-800 group hover:text-white">
              Bắt đầu
              <motion.div className="absolute -z-10 inset-0 bg-neutral-800 w-0 group-hover:w-full transition-all duration-300 ease-out" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-7 divide-y divide-neutral-200">
          <div>
            <h2 className="text-xl text-neutral-800 font-light">
              ĐƯỢC TẠO GẦN ĐÂY
            </h2>
          </div>

          <HorizontalCardPreview />
          <HorizontalCardPreview />
          <HorizontalCardPreview />
          <HorizontalCardPreview />
          <HorizontalCardPreview />
          
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-1 group">
            <span className="text-sm text-neutral-800 font-bold">
              Xem tất cả
            </span>
            <IconArrowNarrowRight size='20px' className="text-neutral-800 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-7 divide-y divide-neutral-200">
          <div>
            <h2 className="text-xl text-neutral-800 font-light">
              NGON BỔ RẺ
            </h2>
            <p className="text-sm text-neutral-500 font-medium max-w-xs">
              Món ăn được tạo với giá nguyên liệu không quá 50.000 vnđ (mặc định)
            </p>
          </div>

          <HorizontalCardPreview mini />
          <HorizontalCardPreview mini />
          <HorizontalCardPreview mini />
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-1 group">
            <span className="text-sm text-neutral-800 font-bold">
              Xem tất cả
            </span>
            <IconArrowNarrowRight size='20px' className="text-neutral-800 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-7 divide-y divide-neutral-200">
          <div>
            <h2 className="text-xl text-neutral-800 font-light">
              ẨM THỰC ĐƯỜNG PHỐ
            </h2>
          </div>

          <HorizontalCardPreview mini />
          <HorizontalCardPreview mini />
          <HorizontalCardPreview mini />
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-1 group">
            <span className="text-sm text-neutral-800 font-bold">
              Xem tất cả
            </span>
            <IconArrowNarrowRight size='20px' className="text-neutral-800 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl text-neutral-800 font-light">
              KĨ THUẬT CHẾ BIẾN
            </h2>
            <button className="outline-none">
              <IconArrowNarrowRight 
                size='20px' 
                className="text-neutral-800 hover:translate-x-1 transition-transform duration-300" 
              />
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1">
            <VerticalCardPreview />
            <VerticalCardPreview />
            <VerticalCardPreview />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl text-neutral-800 font-light">
              MẸO
            </h2>
            <button className="outline-none">
              <IconArrowNarrowRight 
                size='20px' 
                className="text-neutral-800 hover:translate-x-1 transition-transform duration-300" 
              />
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1">
            <VerticalCardPreview />
            <VerticalCardPreview />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h2 className="text-xl text-neutral-800 font-light">
              XẾP HẠNG NGƯỜI DÙNG
            </h2>
            <p className="text-sm text-neutral-500 font-medium max-w-xs">
              Theo đánh giá sao(mặc định)
            </p>
          </div>
          <div className="p-9 flex items-center justify-center">
            <div className="flex items-start justify-between w-screen max-w-xs">
              <ul className="space-y-3">
                {users.map((human, index) =>
                  Math.ceil(users.length / 2) > index &&
                  <li key={index} className={`${index === 0 && 'flex items-end gap-3'} text-neutral-800 font-medium`}>
                    <span className={`${index < 3 ? 'text-3xl' : 'text-xl'} font-bold text-neutral-800`}>
                      {index !== 0 && `0${(index + 1)}.`}
                      {index === 0 && <IconCrown size='24px' className="text-orange-400" />}
                    </span> {human}
                  </li>
                )}
              </ul>
              <ul className="space-y-3">
                {users.map((human, index) =>
                  Math.ceil(users.length / 2) <= index &&
                  <li key={index} className="text-neutral-800 font-medium">
                    <span className={`${index < 3 ? 'text-3xl' : 'text-xl'} font-bold text-neutral-800`}>
                      {`0${(index + 1)}.`}
                    </span> {human}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-1 group">
            <span className="text-sm text-neutral-800 font-bold">
              Xem toàn bộ hạng mục của chúng tôi
            </span>
            <IconArrowNarrowRight size='20px' className="text-neutral-800 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </>
  )
}