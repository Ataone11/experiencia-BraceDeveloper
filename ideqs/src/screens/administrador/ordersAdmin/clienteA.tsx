import Image from 'next/image'
import { useEffect, useState } from 'react'
import Button from '../../../components/buttons/primaryButton'
import deletee from '../../../assets/administrador/orders/delete.svg'
import { Colors } from '../../../components/buttons/typesButton'
import { useDispatch, useSelector } from 'react-redux'
import { getSucursalState } from '../../../redux/reducers/sucursalReducer'
import { getUsuariosState } from '../../../redux/reducers/usuariosReducer'
import { selectUser } from '../../../redux/reducers/authReducer'
import { getAllSucursales } from '../../../redux/actions/sucursalesActions'
import { getUsuarios } from '../../../redux/actions/usuariosActions'
import InputReactSelect, {
  DataSelect
} from '../../../components/inputs/InputReactSelect'
interface actionsFiltros {
  action?: (e: any) => void
  aplyFilter?: () => void
  deleteA?: () => void
  value?: any
  sucursal?: boolean
  setFiltros: (e: any) => void
  setSucursal: (e: any) => void
}

const Cliente = ({
  aplyFilter,
  deleteA,
  setFiltros,
  setSucursal
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
    getAllSucursales(dispatch)
    getUsuarios(dispatch, user?.idCliente, user?.rol)
  }, [])
  const list: Array<DataSelect> = []
  const Sucursales: Array<DataSelect> = []

  usuarios?.forEach((data) => {
    const empresa = data.empresa

    const dataUser = (
      <div className="text-left">
        <div className="text-sm">{data.user}</div>
        <div className="text-xs">{data.empresa}</div>
      </div>
    )
    const select: DataSelect = {
      label: dataUser,
      value: data.user,
      value2: { empresa, user: data.user }
    }
    list.push(select)
  })
  sucursales?.forEach((data) => {
    const empresa = data.cliente

    const dataUser = (
      <div className="text-left">
        <div className="text-sm">{data.nombre}</div>
        <div className="text-xs">{empresa}</div>
      </div>
    )
    const select: DataSelect = {
      label: dataUser,
      value: data.nombre,
      value2: { empresa, nombre: data.nombre }
    }
    Sucursales.push(select)
  })
  return (
    <div
      className={`bg-white  z-20   container rounded-md shadow-lg border-2${
        flag ? ' ' : 'border-grisNeutral300'
      }  w-[80%]  md:w-[400px] h-[320px] relative flex flex-col justify-center  `}
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
            <div className="pt-2">
              <InputReactSelect
                name={'usuario'}
                label={''}
                className={'w-[95%] md:w-[300px] h-[45px]   rounded-md'}
                action={({ value }) => {
                  setFiltros(value)
                }}
                options={list}
                nameOptions={'user'}
                choose={'Usuarios'}
              />
            </div>
          )}
          {!isChecked && (
            <div className="pt-2">
              <InputReactSelect
                name={'usuario'}
                label={''}
                className={' w-[95%] md:w-[300px] h-[47px]  rounded-md'}
                action={({ value }) => {
                  setSucursal(value)
                }}
                options={Sucursales}
                nameOptions={'nombre'}
                choose={'Sucursales'}
              />
            </div>
          )}
          <div className="flex items-center gap-1">
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
