import { InputHTMLAttributes } from 'react'

interface InputInterface {
  label?: string
}

export default function Checkbox(
  props: InputHTMLAttributes<HTMLInputElement> & InputInterface
) {
  const { label, name, ...restProps } = props
  return (
    <div className='flex gap-[12px] items-center w-full'>
      <input
        id={name}
        name={name}
        {...restProps}
        type='checkbox'
        className='cursor-pointer'
      />
      <label
        htmlFor={name}
        className='font-semibold text-neutral-900 text-textSize7 lg:text-textSize6'
      >
        {label}
      </label>
    </div>
  )
}
