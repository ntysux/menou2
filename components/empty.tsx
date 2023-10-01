export default function Empty({children}: {children: React.ReactNode}) {
  return (
    <div className="p-9 border border-dashed border-neutral-400 rounded-lg text-center text-sm text-neutral-400 font-medium">
      {children}
    </div>
  )
}