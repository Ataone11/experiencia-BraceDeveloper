import { InputHTMLAttributes } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'

interface InputProps {
  Icon?: any
  label?: string
}

export default function Input(
  props: InputHTMLAttributes<HTMLInputElement> & InputProps
) {
  const { Icon, label, name, ...restProps } = props

  const { width } = useWindowSize()

  return (
    <div className="w-full grid gap-[5px]  font-semibold text-neutral-900 text-textSize7 lg:text-textSize6">
      <label htmlFor={name} className="">
        {!label && width < 763 ? '' : !label && width > 763 ? '‎' : label}
      </label>
      <div className="border-2 border-azulPrimary900 h-[56px] md:h-[55px] rounded-[6px] px-[16px] w-full flex items-center">
        <input
          id={name}
          name={name}
          {...restProps}
          className="focus:outline-none font-medium h-full text-neutral-600 w-full placeholder:text-textSize7 placeholder:text-neutral-300"
        />
        {Icon && Icon}
      </div>
    </div>
  )
}
