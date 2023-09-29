export default function Empty({children}: {children: React.ReactNode}) {
  return (
    <div className="p-9 border border-dashed border-neutral-500 rounded-lg text-center">
      {children}
    </div>
  )
}