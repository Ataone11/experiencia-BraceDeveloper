import { ReactNode } from 'react'
interface Params {
  name: string | null
  placeholder: string | null
  label: string
  action?: (e: any) => void
  type?: 'text' | 'datetime-local' | 'summit' | 'password' | 'number' | 'email'
  className?: string | null
  textClassName?: string | null
  color?: string | null
  icon?: string | null | any
  value?: string | number
  iconInside?: ReactNode
}
const ButtonSec = ({
  name,
  label,
  action,
  type,
  className = 'border-azulPrimary500 rounded h-[47px] ',
  textClassName = 'text-textSize7',
  placeholder,
  value
}: Params) => {
  return (
    <div className="flex flex-col justify-start font-semibold text-textSize6 text-left text-black">
      <label className={`${textClassName}`}>{label}</label>
      {!value && (
        <input
          onChange={action}
          name={name || ''}
          placeholder={placeholder || ''}
          className={`py-2 px-2 align-middle text-left focus:outline-none text-textSize6 w-full  border-2  rounded-md border-azulPrimary700 flex items-center  ${
            className || 'w-full  rounded-md'
          }`}
          type={type}
        />
      )}
      {value && (
        <input
          onChange={action}
          name={name || ''}
          placeholder={placeholder || ''}
          defaultValue={value}
          className={`py-2 px-2 align-middle text-left focus:outline-none text-textSize6 w-full  border-2  rounded-md border-azulPrimary700 flex items-center  ${
            className || 'w-full  rounded-md'
          }`}
          type={type}
        />
      )}
    </div>
  )
}

export default ButtonSec
