import Image from 'next/image'
import { useEffect, useState } from 'react'
import Button from '../../../components/buttons/primaryButton'
import Select from '../../../components/inputs/select'
import deletee from '../../../assets/administrador/orders/delete.svg'
import { Colors } from '../../../components/buttons/typesButton'
import { useDispatch, useSelector } from 'react-redux'
import { getSucursalState } from '../../../redux/reducers/sucursalReducer'
import { getUsuariosState } from '../../../redux/reducers/usuariosReducer'
import { selectUser } from '../../../redux/reducers/authReducer'
import { getSucursales } from '../../../redux/actions/sucursalesActions'
import { getUsuarios } from '../../../redux/actions/usuariosActions'
interface actionsFiltros {
  action?: (e: any) => void
  aplyFilter?: () => void
  deleteA?: () => void
  value?: any
  sucursal?: boolean
}

const Cliente = ({
  action,
  aplyFilter,
  deleteA,
}: actionsFiltros) => {
  const flag = true
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(true)
  const sucursales = useSelector(getSucursalState)
  const usuarios = useSelector(getUsuariosState)
  const user = useSelector(selectUser)
  const hanlechange = () => {
    setIsChecked(!isChecked)
  }
  useEffect(() => {
    getSucursales(dispatch, user?.idCliente)
    getUsuarios(dispatch, user?.idCliente, user?.rol)
  }, [])
  return (
    <div
      className={`bg-white  z-20   container rounded-md shadow-lg border-2${
        flag ? ' ' : 'border-grisNeutral300'
      }    w-[400px] h-[320px] relative flex flex-col justify-center  `}
    >
      <div className="px-10">
        <span className=" text-grisNeutral100 mx-auto font-medium">
          Nombre de...
        </span>
        <div className=" flex flex-col gap-7  text-gray-500  font-medium my-2 py-5">
          <div className="flex gap-x-5 form-check">
            <input
              className=" rounded-full form-check-input"
              type="radio"
              id="usuario"
              name="flexRadioDefault"
              value="usuario"
              onChange={hanlechange}
              defaultChecked
            />
            Usuario
          </div>
          <div className="flex gap-x-5 form-check">
            <input
              className=" rounded-full form-check-input"
              type="radio"
              id="sucursal"
              name="flexRadioDefault"
              value="sucursal"
              onChange={hanlechange}
            />
            Sucursal
          </div>
        </div>
        <div className="flex flex-col justify-center text-center">
          {isChecked && (
            <Select
              name={'usuario'}
              label={''}
              className={
                ' w-[300px] h-[47px] rounded-md border-2 border-azulPrimary700'
              }
              action={action}
              options={usuarios}
              nameOptions={'user'}
              choose={'Usuarios'}
            />
          )}
          {!isChecked && (
            <Select
              name={'usuario'}
              label={''}
              className={
                ' w-[300px] h-[47px] rounded-md border-2 border-azulPrimary700'
              }
              action={action}
              options={sucursales}
              nameOptions={'nombre'}
              choose={'Sucursales'}
            />
          )}
          <div className="flex items-center">
            <button
              type={'button'}
              onClick={deleteA}
              className={`snap-center rounded-lg py-2 px-4 flex text-white  text-sm my-5  w-[48px] h-[36px] border-2 border-azulPrimary700 items-center `}
            >
              <Image
                src={deletee}
                alt=""
                className="flex justify-center"
                width={16}
                height={16}
              />
            </button>

            <Button
              color={Colors.blue_primary}
              label={'Aplicar filtro'}
              action={aplyFilter}
              className={
                'text-center w-[228px] h-[36px] mx-auto bg-azulPrimary700 disabled:bg-azulPrimary300'
              }
              classNameText={'text-textSize7  mx-auto'}
              type={'button'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cliente
