import Back from "@/components/community/page/back"

export default function Loading() {
  return (
    <>
      <Back />
      <div className="animate-pulse">
        <div className="mt-3 space-y-1 sm:space-y-0 sm:flex sm:justify-between">
          <div className="p-5 w-1/4 bg-neutral-200 rounded-sm" />
          <div className="p-2 h-fit w-1/5 bg-neutral-200 rounded-sm" />
        </div>
        <div className="mt-1 p-2 w-1/6 bg-neutral-200 rounded-sm" />
        <div className="mt-9 space-y-5">
          <div className="p-2 w-2/3 bg-neutral-200 rounded-sm" />
          {['Nguyên liệu', 'Chuẩn bị', 'Chế biến'].map(field =>
            <div key={field} className="space-y-1">
              <div className="p-2.5 w-1/12 bg-neutral-200 rounded-sm" />
              <div className="p-1.5 w-1/4 bg-neutral-200 rounded-sm" />
              <div className="p-1.5 w-1/6 bg-neutral-200 rounded-sm" />
              <div className="p-1.5 w-1/5 bg-neutral-200 rounded-sm" />
            </div>  
          )}
        </div>
      </div>
    </>
  )
}