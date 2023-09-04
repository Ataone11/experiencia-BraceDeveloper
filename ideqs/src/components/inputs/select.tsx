import { getCampos } from '../../redux/actions/camposAction'
import { useSelector, useDispatch } from 'react-redux'
import { getCamposState } from '../../redux/reducers/camposReducer'
import { useEffect } from 'react'
import { SelectType } from '../../models/selectModel.'

interface Params {
  name: string | undefined
  options?: SelectType[] | any[] | any
  nameOptions?: any
  label: string
  action?: (e: any) => void
  className?: string | null
  choose?: string | null | any
  value?: number | string
  create?: boolean
}

const Select = ({
  name,
  label,
  action,
  className = 'lg:w-[300px] h-[46px] py-2 px-2 text-[16px]',
  choose = 'Choose a country',
  options,
  create = false
}: Params) => {
  const campos = create ? [] : useSelector(getCamposState)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!campos && !create) {
      getCampos(dispatch)
    }
  }, [campos])
  return (
    <div className="flex flex-col justify-start font-semibold text-[15px]">
      {label}
      <select
        onChange={action}
        name={name ?? ''}
        placeholder=""
        className={` px-2 align-middle text-left border-2 border-azulPrimary700  rounded overflow-y-auto text-[16px]  lg:my-2 my-0 ${className}`}
        title={name}
      >
        {/* {(campos??[]).map((campo:NombresCamposModel, i:number) => (
          <option
            className="py-2 px-2 align-middle text-left border-2 w-[300px] h-[46px] border-azulPrimary5 rounded-md"
            value={campo.nombre}
            key={`campos-${i}`}
          >
            {campo.nombre}
          </option>
        ))} */}

        <option className="" value={''} selected>
          {choose}
        </option>
        {options
          ? options?.map((option: any) => {
              return (
                <option
                  className="py-2 px-2 align-middle text-left border-2 w-[300px] h-[46px] border-azulPrimary5 rounded-md"
                  key={option.nombre}
                  value={option.nombre}
                >
                  {option.user ? option.user : option.nombre}
                </option>
              )
            })
          : campos?.map((option: any) => {
              return (
                <option
                  className="py-2 px-2 align-middle text-left border-2 w-[300px] h-[46px] border-azulPrimary5 rounded-md"
                  key={option.id}
                  value={option.nombre}
                >
                  {option.nombre}
                </option>
              )
            })}
      </select>
    </div>
  )
}

export default Select
