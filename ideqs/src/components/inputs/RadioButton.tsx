// Input type radio with type

import { InputHTMLAttributes } from 'react'

interface InputProps {
  label?: string
  onClick?: () => void
}

export default function RadioButton(
  props: InputHTMLAttributes<HTMLInputElement> & InputProps
) {
  const { label, onClick, ...restProps } = props
  return (
    <label
      onClick={onClick}
      className={`flex cursor-pointer gap-[5px] font-bold text-textSize7 lg:text-textSize6 ${
        restProps.checked ? 'text-azulPrimary700' : 'text-neutral-500'
      }`}
      htmlFor={restProps.name}
    >
      <input {...restProps} type="radio" />
      {label}
    </label>
  )
}
