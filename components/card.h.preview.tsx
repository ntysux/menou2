interface Props {
  mini?: boolean
}

export default function HorizontalCardPreview({mini}: Props) {
  return (
    <div className="grid grid-cols-7 py-3 w-full cursor-pointer">
      <div className="col-span-3">
        <p className="text-sm text-neutral-800 font-bold truncate max-w-[190px]">
          Mỳ không tôm
        </p>
      </div>
      <div className="col-span-2">
        <p className="text-xs text-neutral-500 font-medium italic leading-none">
          09/05/2023
        </p>
        <p className="text-sm text-neutral-800 font-bold truncate max-w-[130px]">
          <span className="text-xs text-neutral-500 font-medium italic">
            bởi
          </span> dqv
        </p>
      </div>
      <div className="col-span-2 flex justify-end">
        <div className={`${mini ? 'p-11' : 'p-16'} bg-hero-pattern rounded-2xl`}>

        </div>
      </div>
    </div>
  )
}