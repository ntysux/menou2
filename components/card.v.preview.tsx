export default function VerticalCardPreview() {
  return (
    <div className="relative cursor-pointer h-72 p-9 space-y-3 rounded-2xl shadow-xl shadow-neutral-200 hover:shadow transition-shadow duration-300">
      <h3 className="text-sm text-neutral-800 font-bold line-clamp-3">
        Chặt gà bằng dao gọt hoa quả
      </h3>
      <p className="text-sm text-neutral-800 font-medium line-clamp-5">
        It is a long established 
        fact that a reader will be 
        distracted by the readable 
        content of a page when 
        looking at its layout.
      </p>
      <p className="absolute bottom-3 left-9 text-sm text-neutral-800 font-bold">
        <span className="italic text-xs text-neutral-500 font-medium">
          bởi
        </span> dqv
      </p>
    </div>
  )
}