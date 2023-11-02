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
        <div>
          {children}
        </div> 
      }
    </div>
  )
}

function EmptyIcon({children}: {children: React.ReactNode}) {
  return <div className="flex justify-center">{children}</div>
}

function EmptyText({children, className}: {children: string | React.ReactNode, className?: string}) {
  return <p className={`${className} text-center`}>{children}</p>
}

Empty.Icon = EmptyIcon
Empty.Text = EmptyText