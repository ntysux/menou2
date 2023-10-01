'use client'

export default function Error({error, reset}: {error: Error & {digest?: string}, reset: () => void}) {
  return (
    <div className='p-9 text-center rounded-lg border border-neutral-300 border-dashed'>
      <h2 className='text-neutral-700 font-medium'>
        Đã xảy ra sự cố !
      </h2>
      <p className='text-sm text-neutral-600'>
        Nhấn <code className='px-2 rounded-md text-neutral-700 font-medium bg-neutral-200'>F5</code> hoặc 
        nhấn vào nút dưới để thử lại.
      </p>
      <button 
        className="py-1 px-5 mt-5 rounded-sm bg-neutral-800 font-bold text-white text-sm"
        onClick={() => reset()}
      >
        Tải lại
      </button>
    </div>
  )
}