import { ChangeEvent, Children, Dispatch, ReactElement, SetStateAction, cloneElement, isValidElement, useEffect, useRef, useState } from "react"

interface EditableProps {
  children: React.ReactNode
  value: string
  className?: string
}

interface EditableChildrenProps {
  value?: string
  editing?: boolean
  setEditing?: Dispatch<SetStateAction<boolean>>
  className?: string 
}

interface EditableInputProps extends EditableChildrenProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  blur?: () => void
}

export default function Editable({children, value, className}: EditableProps) {
  const [editing, setEditing] = useState(false)

  return (
    <div className={className}>
      {Children.map(children, child => 
        isValidElement(child) && 
        cloneElement(child as ReactElement<EditableChildrenProps>, {value, editing, setEditing})
      )}
    </div>
  )
}

function EditablePreview({value, editing, setEditing, className}: EditableChildrenProps) {
  return !editing && 
    <div
      onClick={() => setEditing && setEditing(true)}
      className={className}
    >
      {value}
    </div>
}

function EditableInput({value, editing, setEditing, onChange, blur, className}: EditableInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    editing && inputRef.current?.select()
  }, [editing])

  return editing && 
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={e => e.key === 'Enter' && setEditing && setEditing(false)}
      onBlur={() => {
        setEditing && setEditing(false)
        blur && blur()
      }}
      className={className}
    />
}

Editable.Preview = EditablePreview
Editable.Input = EditableInput