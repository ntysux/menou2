export default function Loading() {
  return (
    <div className="space-y-9">
      <div className="space-y-2.5">
        <h2 className='text-xs text-neutral-400 font-bold tracking-wider'>
          Công thức
        </h2>
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">
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
      </div>
      <div className="space-y-2.5">
        <h2 className='text-xs text-neutral-400 font-bold tracking-wider'>
          Thực đơn
        </h2>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          <div className="p-3 rounded-xl shadow shadow-neutral-200">
            <div className="animate-pulse space-y-11">
              <div className="p-2 w-2/3 bg-neutral-200 rounded-sm" />
              <ul className='w-fit flex gap-1'>
                <li className='p-1 rounded-full bg-neutral-200' />
                <li className='p-1 rounded-full bg-neutral-200' />
                <li className='p-1 rounded-full bg-neutral-200' />
              </ul>
            </div>
          </div>
          <div className="p-3 rounded-xl shadow shadow-neutral-200">
            <div className="animate-pulse space-y-11">
              <div className="p-2 w-2/3 bg-neutral-200 rounded-sm" />
              <ul className='w-fit flex gap-1'>
                <li className='p-1 rounded-full bg-neutral-200' />
                <li className='p-1 rounded-full bg-neutral-200' />
                <li className='p-1 rounded-full bg-neutral-200' />
              </ul>
            </div>
          </div>
          <div className="p-3 rounded-xl shadow shadow-neutral-200">
            <div className="animate-pulse space-y-11">
              <div className="p-2 w-2/3 bg-neutral-200 rounded-sm" />
              <ul className='w-fit flex gap-1'>
                <li className='p-1 rounded-full bg-neutral-200' />
                <li className='p-1 rounded-full bg-neutral-200' />
                <li className='p-1 rounded-full bg-neutral-200' />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}