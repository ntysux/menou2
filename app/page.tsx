import { IconArrowNarrowRight, IconCrown } from "@tabler/icons-react"

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
        <div className="grid grid-cols-2 gap-y-3 gap-x-7 divide-y divide-neutral-200">
          <div>
            <h2 className="text-xl text-neutral-800 font-light">
              {'được tạo gần đây'.toUpperCase()}
            </h2>
          </div>

          <div className="flex items-start justify-between py-3">
            <h3 className="text-sm text-neutral-800 font-bold">
              Mỳ không tôm
            </h3>
            <div>
              <p className="text-xs text-neutral-500 font-medium italic">
                09/05/2023
              </p>
              <p className="text-xs text-neutral-500">
                bởi <span className="text-sm text-neutral-800 font-bold">dqv</span>
              </p>
            </div>
            <div className="bg-hero-pattern p-16 rounded-2xl">

            </div>
          </div>

          <div className="flex items-start justify-between py-3">
            <h3 className="text-sm text-neutral-800 font-bold">
              Mỳ không tôm
            </h3>
            <div>
              <p className="text-xs text-neutral-500 font-medium italic">
                09/05/2023
              </p>
              <p className="text-xs text-neutral-500">
                bởi <span className="text-sm text-neutral-800 font-bold">dqv</span>
              </p>
            </div>
            <div className="bg-hero-pattern p-16 rounded-2xl">

            </div>
          </div>

          <div className="flex items-start justify-between py-3">
            <h3 className="text-sm text-neutral-800 font-bold">
              Mỳ không tôm
            </h3>
            <div>
              <div>
                <p className="text-xs text-neutral-500 font-medium italic">
                  09/05/2023
                </p>
              </div>
              <p className="text-xs text-neutral-500">
                bởi <span className="text-sm text-neutral-800 font-bold">dqv</span>
              </p>
            </div>
            <div className="bg-hero-pattern p-16 rounded-2xl">

            </div>
          </div>

          <div className="flex items-start justify-between py-3">
            <h3 className="text-sm text-neutral-800 font-bold">
              Mỳ không tôm
            </h3>
            <div>
              <div>
                <p className="text-xs text-neutral-500 font-medium italic">
                  09/05/2023
                </p>
              </div>
              <p className="text-xs text-neutral-500">
                bởi <span className="text-sm text-neutral-800 font-bold">dqv</span>
              </p>
            </div>
            <div className="bg-hero-pattern p-16 rounded-2xl">

            </div>
          </div>

          <div className="flex items-start justify-between py-3">
            <h3 className="text-sm text-neutral-800 font-bold">
              Mỳ không tôm
            </h3>
            <div>
              <div>
                <p className="text-xs text-neutral-500 font-medium italic">
                  09/05/2023
                </p>
              </div>
              <p className="text-xs text-neutral-500">
                bởi <span className="text-sm text-neutral-800 font-bold">dqv</span>
              </p>
            </div>
            <div className="bg-hero-pattern p-16 rounded-2xl">

            </div>
          </div>
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
              {'ngon bổ rẻ'.toUpperCase()}
            </h2>
            <p className="text-sm text-neutral-500 font-medium max-w-xs">
              Món ăn được tạo với giá nguyên liệu không quá 50.000 vnđ (mặc định)
            </p>
          </div>

          <div className="flex items-start justify-between py-3">
            <h3 className="text-sm text-neutral-800 font-bold">
              Mỳ không tôm
            </h3>
            <div>
              <div>
                <p className="text-xs text-neutral-500 font-medium italic">
                  09/05/2023
                </p>
              </div>
              <p className="text-xs text-neutral-500">
                bởi <span className="text-sm text-neutral-800 font-bold">dqv</span>
              </p>
            </div>
            <div className="bg-hero-pattern p-11 rounded-2xl">

            </div>
          </div>

          <div className="flex items-start justify-between py-3">
            <h3 className="text-sm text-neutral-800 font-bold">
              Mỳ không tôm
            </h3>
            <div>
              <div>
                <p className="text-xs text-neutral-500 font-medium italic">
                  09/05/2023
                </p>
              </div>
              <p className="text-xs text-neutral-500">
                bởi <span className="text-sm text-neutral-800 font-bold">dqv</span>
              </p>
            </div>
            <div className="bg-hero-pattern p-11 rounded-2xl">

            </div>
          </div>

          <div className="flex items-start justify-between py-3">
            <h3 className="text-sm text-neutral-800 font-bold">
              Mỳ không tôm
            </h3>
            <div>
              <div>
                <p className="text-xs text-neutral-500 font-medium italic">
                  09/05/2023
                </p>
              </div>
              <p className="text-xs text-neutral-500">
                bởi <span className="text-sm text-neutral-800 font-bold">dqv</span>
              </p>
            </div>
            <div className="bg-hero-pattern p-11 rounded-2xl">

            </div>
          </div>
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
            <div className="relative h-72 p-9 space-y-3 rounded-2xl shadow-xl shadow-neutral-200 hover:shadow transition-shadow duration-300">
              <h3 className="text-sm text-neutral-800 font-bold">
                Cách chế biến cá phi lê
              </h3>
              <p className="text-sm text-neutral-800 font-medium line-clamp-5">
                It is a long established 
                fact that a reader will be 
                distracted by the readable 
                content of a page when 
                looking at its layout.
              </p>
              <div className="space-x-1 absolute bottom-3 left-9">
                <span className="italic text-xs text-neutral-500 font-medium">
                  bởi
                </span> 
                <span className="text-sm text-neutral-800 font-bold">
                  dqv
                </span>
              </div>
            </div>

            <div className="relative h-72 p-9 space-y-3 rounded-2xl shadow-xl shadow-neutral-200 hover:shadow transition-shadow duration-300">
              <h3 className="text-sm text-neutral-800 font-bold">
                Chặt gà bằng dao gọt hoa quả
              </h3>
              <p className="text-sm text-neutral-800 font-medium line-clamp-5">
                It is a long established 
                fact that a reader will be 
                distracted by the readable 
                content of a page when 
                looking at its layout.
              </p>
              <div className="space-x-1 absolute bottom-3 left-9">
                <span className="italic text-xs text-neutral-500 font-medium">
                  bởi
                </span> 
                <span className="text-sm text-neutral-800 font-bold">
                  dqv
                </span>
              </div>
            </div>
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
            <div className="relative h-72 p-9 space-y-3 rounded-2xl shadow-xl shadow-neutral-200 hover:shadow transition-shadow duration-300">
              <h3 className="text-sm text-neutral-800 font-bold">
                Thái hành không cay mắt
              </h3>
              <p className="text-sm text-neutral-800 font-medium line-clamp-5">
                It is a long established 
                fact that a reader will be 
                distracted by the readable 
                content of a page when 
                looking at its layout.
              </p>
              <div className="space-x-1 absolute bottom-3 left-9">
                <span className="italic text-xs text-neutral-500 font-medium">
                  bởi
                </span> 
                <span className="text-sm text-neutral-800 font-bold">
                  dqv
                </span>
              </div>
            </div>

            <div className="relative h-72 p-9 space-y-3 rounded-2xl shadow-xl shadow-neutral-200 hover:shadow transition-shadow duration-300">
              <h3 className="text-sm text-neutral-800 font-bold">
                Khử tanh trên rong nho
              </h3>
              <p className="text-sm text-neutral-800 font-medium line-clamp-5">
                It is a long established 
                fact that a reader will be 
                distracted by the readable 
                content of a page when 
                looking at its layout.
              </p>
              <div className="space-x-1 absolute bottom-3 left-9">
                <span className="italic text-xs text-neutral-500 font-medium">
                  bởi
                </span> 
                <span className="text-sm text-neutral-800 font-bold">
                  dqv
                </span>
              </div>
            </div>
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