import { InputHTMLAttributes } from 'react'

export default function InputCode(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      className='w-[43px] h-[43px] rounded-[10px] border-2 border-azulPrimary500 placeholder:text-center focus:outline-none focus:border-azulPrimary900 text-center text-textSize6'
      type='text'
      placeholder='0'
      {...props}
    />
  )
}
