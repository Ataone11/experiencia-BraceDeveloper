import { getCampos } from '../../redux/actions/camposAction'
import { useSelector, useDispatch } from 'react-redux'
import { getCamposState } from '../../redux/reducers/camposReducer'
import React, { useEffect } from 'react'
// import { SelectType } from '../../models/selectModel.'
import { getClients } from '../../redux/reducers/adminUserReducer'
interface Params {
  name: string | undefined
  dataSecure?: any
  label: string
  action?: (e: any) => void
  className?: string | null
  choose?: string | null
  value?: number
}
interface Props {
  title?: string
  id: number
}

const tiposUsuario = ({
  name,
  label,
  action,
  className = 'lg:w-full h-[46px] py-2 px-2',
  dataSecure
}: Params) => {
  const clients = useSelector(getClients)
  const campos = useSelector(getCamposState)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!campos) {
      getCampos(dispatch)
    }
  }, [campos])
  const dataSource =
    dataSecure ??
    (clients
      ? clients.map((client) => {
          return {
            id: client.id,
            title: client.nombre
          }
        })
      : [])
  return (
    <div className="flex flex-col justify-start font-semibold text-[15px] text-black gap-1 pt-3 w-full">
      {label}
      <select
        onChange={action}
        name={name || ''}
        placeholder="Seleccionar"
        className={`py-2 px-2 align-middle text-left border text-neutral-400 border-azulPrimary700   overflow-y-auto text-textSize6 my-0 ${className}`}
        title={name}
      >
        <option className="" value=""></option>

        {dataSource.map((option: Props) => {
          return (
            <option
              className="py-2 px-2 align-middle text-left border-2 w-[300px] h-[46px] border-azulPrimary5 "
              key={option.id}
              value={option.id}
            >
              {option.title}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default tiposUsuario
