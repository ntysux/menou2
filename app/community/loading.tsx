export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-x-3 gap-y-7">
      <div className="animate-pulse">
        <div className="p-3 pb-11 rounded-lg shadow shadow-neutral-300/75">
          <div className="space-y-2">
            <div className="w-2/3 p-2.5 bg-neutral-200 rounded-sm" />
            <div className="w-1/2 p-2 bg-neutral-200 rounded-sm" />
          </div>
        </div>
        <div className="w-1/2 p-3 mt-1 bg-neutral-200 rounded-sm" />
      </div>
      <div className="animate-pulse">
        <div className="p-3 pb-11 rounded-lg shadow shadow-neutral-300/75">
          <div className="space-y-2">
            <div className="w-2/3 p-2.5 bg-neutral-200 rounded-sm" />
            <div className="w-1/2 p-2 bg-neutral-200 rounded-sm" />
          </div>
        </div>
        <div className="w-1/2 p-3 mt-1 bg-neutral-200 rounded-sm" />
      </div>
      <div className="animate-pulse">
        <div className="p-3 pb-11 rounded-lg shadow shadow-neutral-300/75">
          <div className="space-y-2">
            <div className="w-2/3 p-2.5 bg-neutral-200 rounded-sm" />
            <div className="w-1/2 p-2 bg-neutral-200 rounded-sm" />
          </div>
        </div>
        <div className="w-1/2 p-3 mt-1 bg-neutral-200 rounded-sm" />
      </div>
    </div>
  )
}