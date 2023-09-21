export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      <div className="shadow shadow-neutral-200 rounded-xl p-3">
        <div className="animate-pulse space-y-7">
          <div className="flex justify-between items-start">
            <div className="rounded-sm bg-neutral-200 px-14 py-2" />
            <div className="rounded-md p-2.5 bg-neutral-200" />
          </div>
          <div className="px-9 py-3 rounded-sm bg-neutral-200 w-fit" />
        </div>
      </div>
      <div className="shadow shadow-neutral-200 rounded-xl p-3">
        <div className="animate-pulse space-y-7">
          <div className="flex justify-between items-start">
            <div className="rounded-sm bg-neutral-200 px-14 py-2" />
            <div className="rounded-md p-2.5 bg-neutral-200" />
          </div>
          <div className="px-9 py-3 rounded-sm bg-neutral-200 w-fit" />
        </div>
      </div>
      <div className="shadow shadow-neutral-200 rounded-xl p-3">
        <div className="animate-pulse space-y-7">
          <div className="flex justify-between items-start">
            <div className="rounded-sm bg-neutral-200 px-14 py-2" />
            <div className="rounded-md p-2.5 bg-neutral-200" />
          </div>
          <div className="px-9 py-3 rounded-sm bg-neutral-200 w-fit" />
        </div>
      </div>
    </div>
  )
}