import Image from 'next/image'
import React, { ReactNode } from 'react'
interface Params {
  name: string | null
  placeholder: string | null
  label: string
  action?: (e: any) => void
  type?:
    | 'text'
    | 'datetime-local'
    | 'summit'
    | 'password'
    | 'number'
    | 'email'
    | 'date'
  className?: string | null
  textClassName?: string | null
  color?: string | null
  icon?: string | null | any
  value?: string | number | null
  iconInside?: ReactNode
}
const ButtonSecAlter = ({
  name,
  label,
  action,
  type,
  className = 'border border-azulPrimary700 rounded-[6px] h-[47px]',
  textClassName = 'text-textSize7 my-2',
  placeholder,
  icon,
  value,
  iconInside
}: Params) => {
  return (
    <div className="flex flex-col justify-start font-semibold text-textSize6 text-left w-full">
      <label className={`${textClassName}`}>{label}</label>
      {icon && <Image src={icon} alt="" className="flex justify-start" />}
      <section
        className={`rounded-[6px] flex items-center h-[47px] ${
          iconInside && 'px-[20px]'
        }`}
      >
        {!value && (
          <input
            onChange={action}
            name={name || ''}
            placeholder={placeholder || ''}
            className={`py-2 px-2 align-middle text-left focus:outline-none text-textSize6 w-full my-2 ${
              className || 'w-full h-[47px] rounded-[6px]'
            }`}
            type={type}
          />
        )}
        {value && (
          <input
            onChange={action}
            name={name || ''}
            placeholder={placeholder || ''}
            className={`py-2 px-2 align-middle text-left focus:outline-none text-textSize6 w-full my-2 ${
              className || 'w-full h-[47px] rounded-[6px]'
            }`}
            type={type}
            value={value ?? ''}
          />
        )}
        {iconInside && iconInside}
      </section>
    </div>
  )
}

export default ButtonSecAlter
