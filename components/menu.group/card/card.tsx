import { useAppSelector } from "@/redux/hooks"

interface Props {
  index: number
}

export default function Card({index}: Props) {
  const {name, list} = useAppSelector(state => state.menuGroup)[index]

  return (
    <>
      <div className="p-3 space-y-9 h-fit rounded-xl shadow shadow-neutral-200 hover:ring-1 hover:ring-neutral-200">
        <h3 className="truncate max-w-[100px] leading-3 text-xs text-neutral-800 font-bold">
          {name}
        </h3>
        <ul className="w-fit grid grid-cols-5 gap-1">
          {list.split('|').map((item, index) => 
            <li key={index} className="p-1 rounded-full bg-neutral-300" />
          )}
        </ul>
      </div>
    </>
  )
}