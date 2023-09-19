import { IconX } from "@tabler/icons-react"
import { Init, SetFieldValue } from "./types/types"
import { handleRemove } from "./handle/remove"

export default function Items({
  values, 
  index,
  setFieldValue
}: {
  values: Init, 
  index: number,
  setFieldValue: SetFieldValue
}) {
  return (
    <div className={`flex ${index !== 2 ? 'flex-wrap gap-3' : 'flex-col gap-1'}`}>
      {values.library[index].map((item, key) =>
        <div 
          key={key} 
          className='text-sm text-neutral-800 font-medium inline-flex items-center'
        >
          {item}
          <span>
            <IconX
              size='16px' 
              strokeWidth='2.7' 
              className='text-neutral-800 cursor-pointer'
              onClick={() => handleRemove(index, key, values, setFieldValue)}
            />
          </span>
        </div>
      )}
    </div>
  )
}