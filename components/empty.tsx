interface Props {
  children: string | React.ReactNode
}

export default function Empty({children}: Props) {
  return (
    <div className="p-9 border border-dashed border-neutral-400 rounded-lg flex items-center justify-center">
      {
        typeof children === 'string'
        ? 
        <p className="text-sm text-neutral-500 font-medium">
          {children}
        </p>
        :
        <>{children}</> 
      }
    </div>
  )
}