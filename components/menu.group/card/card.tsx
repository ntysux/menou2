import { useAppSelector } from "@/redux/hooks"

interface Props {
  index: number
  onClick?: () => void
}

export default function Card({index, onClick}: Props) {
  const {name, list} = useAppSelector(state => state.menuGroup)[index]

  return (
    <div
      onClick={onClick}
      className="p-3 flex flex-col justify-between space-y-11 rounded-xl shadow shadow-neutral-200 hover:ring-1 hover:ring-neutral-200"
    >
      <h3 className="truncate max-w-[100px] leading-3 text-xs text-neutral-800 font-bold">
        {name}
      </h3>
      <ul className="w-fit grid grid-cols-5 gap-1">
        {list.map((item, index) => 
          <li key={index} className="p-1 rounded-full bg-neutral-300" />
        )}
      </ul>
    </div>
  )
}