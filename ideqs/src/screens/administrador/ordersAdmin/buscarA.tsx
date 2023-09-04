/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import Inputs from '../../../components/inputs/inputTexto'
import InvertButton from '../../../components/buttons/buttonPrimaryInvert'
import buscar from '../../../assets/empresa/orders/searchp.svg'
import SelectN from '../../../components/inputs/SelectN'
import { useDispatch, useSelector } from 'react-redux'
import { getSucursalState } from '../../../redux/reducers/sucursalReducer'
import { getUsuariosState } from '../../../redux/reducers/usuariosReducer'
import { selectUser } from '../../../redux/reducers/authReducer'
import { getAllSucursales } from '../../../redux/actions/sucursalesActions'
import { getUsuarios } from '../../../redux/actions/usuariosActions'
import InputReactSelect, {
  DataSelect
} from '../../../components/inputs/InputReactSelect'
import { Filtros } from './misOrdenes'

export interface actionsFiltros {
  action?: (e: any) => void
  aplyFilter?: () => void
  filtros?: Filtros
  title?: string
  isChecked?: boolean
  setIsChecked: (e: any) => void
  setFiltros: (e: any) => void
  setSucursal: (e: any) => void
}

export interface BuscarType {
  id: number | string
  nombre: string
}

const dataSecure: BuscarType[] = [
  {
    id: 1,
    nombre: 'Pendiente'
  },
  {
    id: 2,
    nombre: 'Aceptadas'
  },
  {
    id: 3,
    nombre: 'Impresas'
  },
  {
    id: 4,
    nombre: 'Finalizadas'
  },
  {
    id: 5,
    nombre: 'Anuladas'
  }
]

const Buscar = ({
  action,
  aplyFilter,
  filtros,
  title,
  isChecked,
  setIsChecked,
  setFiltros,
  setSucursal
}: actionsFiltros) => {
  const sucursales = useSelector(getSucursalState)
  const usuarios = useSelector(getUsuariosState)
  const dispatch = useDispatch()
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
    <div className="container py-[40px] mx-auto px-2 md:px-[53px]  w-[90%] flex flex-col">
      <span className="text-textSize5 md:text-textSize2 font-extrabold text-azulPrimary900">
        {title}
      </span>
      <div className="my-3 md:my-10 flex flex-col-reverse  md:grid md:grid-cols-3 md:gap-2 w-[320px] md:w-[870px] ">
        <div className="flex flex-col">
          <span className="hidden md:block text-textSize6 font-bold text-black ">
            Tomador
          </span>
          <span className=" md:hidden text-textSize7 font-bold text-black ">
            Tomador
          </span>

          <Inputs
            name={'tomador'}
            label={''}
            className={
              'rounded-md w-[277px] md:w-[568px] h-[47px]  md:h-[56px] border-2 border-azulPrimary700 '
            }
            action={action}
            value={filtros?.tomador ? filtros?.tomador : null}
            type={'text'}
            placeholder={'Tomador'}
          />
        </div>
        <div className="flex flex-col">
          <span className="hidden md:block text-textSize6 font-bold text-black ">
            N° Póliza
          </span>
          <span className=" md:hidden text-textSize7 font-bold text-black ">
            Número de póliza
          </span>

          <Inputs
            name={'poliza'}
            label={''}
            className={
              'rounded-md  border-2 border-azulPrimary700 w-[277px] md:w-[568px] h-[47px]  md:h-[56px]'
            }
            action={action}
            type={'text'}
            placeholder={'Póliza'}
            value={filtros?.poliza ?? ''}
          />
        </div>
        <div className="flex flex-col">
          <span className="hidden md:block text-textSize6 font-bold text-black ">
            N° Orden
          </span>
          <span className=" md:hidden text-textSize7 font-bold text-black  ">
            Número de orden
          </span>

          <Inputs
            name={'orden'}
            label={''}
            className={
              'rounded-md  border-2 border-azulPrimary700  w-[277px] md:w-[568px] h-[47px]  md:h-[56px]'
            }
            action={action}
            type={'text'}
            placeholder={'Orden'}
            value={filtros?.orden ?? ''}
          />
        </div>
      </div>
      <div className=" grid grid-cols-1 md:flex gap-x-2   ">
        <div className="flex flex-col gap-y-2">
          <div className="rounded-full flex gap-7 md:gap-5 text-gray-500  font-medium form-check">
            <input
              className=" rounded-full"
              type="radio"
              id="usuario"
              name="flexRadioDefault"
              value="ID Sucursal"
              onChange={hanlechange}
              checked={isChecked}
            />
            Usuario
            <input
              className=" rounded-full"
              type="radio"
              id="Sucursal"
              name="flexRadioDefault"
              value="Sucursal"
              onChange={hanlechange}
              checked={!isChecked}
            />
            Sucursal
          </div>
          <div className="my-2 md:my-0">
            <span className="md:hidden text-textSize7 md:text-textSize6 font-bold text-black ">
              Selecciona el cliente*
            </span>
            {isChecked && (
              <div className="pt-2">
                <InputReactSelect
                  name={'usuario'}
                  label={''}
                  className={
                    ' w-[277px] md:w-[568px] h-[36px] md:h-[56px] rounded-md'
                  }
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
                  className={
                    ' w-[277px] md:w-[568px] h-[36px] md:h-[56px] rounded-md'
                  }
                  action={({ value }) => {
                    setSucursal(value)
                  }}
                  options={Sucursales}
                  nameOptions={'nombre'}
                  choose={'Sucursales'}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:gap-y-2 md:mx-3">
          <span className="text-textSize7 md:text-textSize6 font-bold text-black ">
            Estado
          </span>
          <SelectN
            name={'estado'}
            label={''}
            className={' w-[277px] h-[47px] md:h-[56px] rounded-md'}
            action={action}
            options={dataSecure}
            choose={'Estados'}
          />
        </div>
      </div>
      <span className="text-textSize7 md:text-textSize6 text-azulPrimary700 font-bold pt-3">
        Rango de fecha de creación de la orden
      </span>
      <div className="container  my-4 grid grid-cols-1 md:flex ">
        <Inputs
          name={'startDate'}
          label={'Fecha inicio'}
          className={'w-[277px]  border-2 border-azulPrimary700 rounded-md'}
          action={action}
          type={'date'}
          placeholder={'Texto Entrada'}
          value={filtros?.startDate ? filtros?.startDate : ''}
        />

        <div className="container   flex md:mx-3">
          <Inputs
            name={'finalDate'}
            label={'Fecha final'}
            className={'w-[277px]  border-2 border-azulPrimary700 rounded-md'}
            action={action}
            type={'date'}
            placeholder={'Texto Entrada'}
            value={filtros?.finalDate ? filtros?.finalDate : ''}
          />
        </div>
      </div>
      <span className="text-textSize7 md:text-textSize6 text-azulPrimary700 font-bold">
        Rango de fecha de la caducidad de la orden
      </span>
      <div className="container  my-3 grid grid-cols-1 md:flex ">
        <Inputs
          name={'caducidadDate'}
          label={'Fecha inicio'}
          action={action}
          type={'date'}
          className={'w-[277px]  border-2 border-azulPrimary700 rounded-md'}
          placeholder={'Texto Entrada'}
          value={filtros?.caducidadDate ? filtros?.caducidadDate : ''}
        />

        <div className="container   flex md:mx-3">
          <Inputs
            name={'finalCaducidadDate'}
            label={'Fecha final'}
            action={action}
            type={'date'}
            className={'w-[277px]  border-2 border-azulPrimary700 rounded-md'}
            placeholder={'Texto Entrada'}
            value={
              filtros?.finalCaducidadDate ? filtros?.finalCaducidadDate : ''
            }
          />
        </div>
      </div>
      <InvertButton
        disable={false}
        className={
          'w-[100px] md:w-[121px] h-[36px] md:h-[44px] text-textSize9 mx-0 rounded-md bg-azulPrimary900'
        }
        label={'Buscar'}
        icon={buscar}
        icona={buscar}
        action={aplyFilter}
        flag={1}
        index={1}
      />
    </div>
  )
}

export default Buscar
