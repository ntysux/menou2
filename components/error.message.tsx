export default function ErrorMessage({children}: {children: string}) {
  return (
    <div className="p-9 border border-neutral-300 border-dashed rounded-lg text-center">
      <p className="text-sm text-neutral-500 font-medium">
        {children}
      </p>
    </div>
  )
}