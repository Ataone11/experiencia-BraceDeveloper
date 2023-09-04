import { SelectHTMLAttributes } from 'react'

interface OptionsProps {
  value: string | number
  label: string
  name: string
  onChange: (e: any) => void
}

interface SelectProps {
  label?: string
  options?: OptionsProps[]
  withoutLabel?: boolean
}

export default function SelectInput(
  props: SelectHTMLAttributes<HTMLSelectElement> & SelectProps
) {
  const {
    label,
    name,
    options,
    onChange,
    withoutLabel = true,
    ...restProps
  } = props
  return (
    <div className="w-full grid gap-[5px] font-semibold text-neutral-900 text-textSize7 lg:text-textSize6">
      <label htmlFor={name}>
        {label && withoutLabel ? label : !withoutLabel ? '' : '‎'}
      </label>
      <select
        onChange={onChange}
        id={name}
        name={name}
        {...restProps}
        className="focus:outline-none cursor-pointer w-full placeholder:text-textSize7 placeholder:text-neutral-300 border-2 border-azulPrimary900 h-[36px] md:h-[55px] rounded-[6px]"
        style={{ padding: '0 16px' }}
      >
        <option value="Seleccione">Seleccione</option>
        {options?.map(({ value, label }: OptionsProps) => (
          <option key={value} value={value ?? ''}>
            {label ?? ''}
          </option>
        ))}
      </select>
    </div>
  )
}
