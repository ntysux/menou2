export default function Loading() {
  return (
    <div className="my-3 mb-20 grid grid-cols-1 gap-3 sm:mb-0 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      <div className="shadow shadow-neutral-200 rounded-xl p-5">
        <div className="animate-pulse space-y-7">
          <div className="flex justify-between items-start">
            <div className="rounded-md bg-neutral-200 px-14 py-2" />
            <div className="rounded-md p-2.5 bg-neutral-200" />
          </div>
          <div className="px-9 py-3 rounded-md bg-neutral-200 w-fit" />
        </div>
      </div>
      <div className="shadow shadow-neutral-200 rounded-xl p-5">
        <div className="animate-pulse space-y-7">
          <div className="flex justify-between items-start">
            <div className="rounded-md bg-neutral-200 px-14 py-2" />
            <div className="rounded-md p-2.5 bg-neutral-200" />
          </div>
          <div className="px-9 py-3 rounded-md bg-neutral-200 w-fit" />
        </div>
      </div>
      <div className="shadow shadow-neutral-200 rounded-xl p-5">
        <div className="animate-pulse space-y-7">
          <div className="flex justify-between items-start">
            <div className="rounded-md bg-neutral-200 px-14 py-2" />
            <div className="rounded-md p-2.5 bg-neutral-200" />
          </div>
          <div className="px-9 py-3 rounded-md bg-neutral-200 w-fit" />
        </div>
      </div>
    </div>
  )
}