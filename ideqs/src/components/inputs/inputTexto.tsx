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
  disabled?: boolean
}
const ButtonSec = ({
  name,
  label,
  action,
  type,
  className = 'border border-azulPrimary700 rounded-[6px] h-[47px] ',
  textClassName = 'text-[15px] my-2',
  placeholder,
  icon,
  value,
  iconInside,
  disabled
}: Params) => {
  return (
    <div className="flex flex-col justify-start font-semibold text-[15px]  text-left">
      <label className={`${textClassName}`}>{label}</label>
      {icon && <Image src={icon} alt="" className="flex justify-start" />}
      <section
        className={`rounded-[6px] flex items-center h-[47px] ${
          iconInside && 'px-[20px]'
        }`}
      >
        <input
          onChange={action}
          name={name || ''}
          placeholder={placeholder || ''}
          className={`py-2 px-2 align-middle text-left focus:outline-none text-textSize6  my-2 ${
            className || 'w-full h-[47px] rounded-[6px]'
          }`}
          type={type}
          defaultValue={value ?? ''}
          disabled={!disabled ? false : disabled}
        />

        {iconInside && iconInside}
      </section>
    </div>
  )
}

export default ButtonSec
