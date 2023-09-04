import { getCampos } from '../../redux/actions/camposAction'
import { useSelector, useDispatch } from 'react-redux'
import { getCamposState } from '../../redux/reducers/camposReducer'
import React, { useEffect } from 'react'
import { SelectType } from '../../models/selectModel.'
interface Params {
  name: string | undefined
  options: SelectType[]
  label: string
  action?: (e: any) => void
  className?: string | null
  choose?: string | null
  value?: number
}

const Select = ({
  name,
  label,
  action,
  className = 'lg:w-full h-[46px] py-2 px-2',
  // choose = 'Choose a country',
  options,
  value
}: Params) => {
  const campos = useSelector(getCamposState)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!campos) {
      getCampos(dispatch)
    }
  }, [campos])
  return (
    <div className="flex flex-col justify-start font-semibold text-[15px] gap-1 pt-3">
      {label}
      <select
        onChange={action}
        name={name || ''}
        placeholder=""
        className={`py-2 px-2 align-middle text-left border border-azulPrimary700 rounded-[6px] overflow-y-auto text-[16px] my-0 ${className}`}
        title={name}
      >
        <option className="" value=""></option>
        {value && (
          <option className="" value={value} selected>
            {options.find((option) => option.value === value)?.name}
          </option>
        )}
        {options
          .filter((option) =>
            value
              ? option.name !==
                options.find((option) => option.value === value)?.name
              : true
          )
          .map((option: SelectType) => {
            return (
              <option
                className="py-2 px-2 align-middle text-left border-2 w-[300px] h-[46px] border-azulPrimary5 rounded-[6px]"
                key={option.value}
                value={option.value}
              >
                {option.name}
              </option>
            )
          })}
      </select>
    </div>
  )
}

export default Select
