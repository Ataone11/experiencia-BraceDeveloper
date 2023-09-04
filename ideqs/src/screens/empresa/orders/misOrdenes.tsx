/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import persona from '../../../../src/assets/empresa/orders/persona.svg'
import clientew from '../../../../src/assets/empresa/orders/clientew.svg'
import numero from '../../../../src/assets/empresa/orders/numero.svg'
import numerow from '../../../../src/assets/empresa/orders/numerow.svg'
import fecha from '../../../../src/assets/empresa/orders/calendar.svg'
import fechaw from '../../../../src/assets/empresa/orders/fecha.svg'
import Table from '../../general/table/Table'
import Button from '../../../components/buttons/grisButton'
import Numero from '../../administrador/ordersAdmin/numero'
import Cliente from '../../administrador/ordersAdmin/cliente'
import Fecha from '../../administrador/ordersAdmin/filtroFecha'
import { getOrdersFiltros } from '../../../redux/actions/ordersActions'
import { useDispatch, useSelector } from 'react-redux'
import { getListOrders } from '../../../redux/reducers/ordersReducer'
import { MoonLoader } from 'react-spinners'
import { OrdenModel, OrdenModelTableRequest } from '../../../models/ordenModel'
import { useRouter } from 'next/router'
import { selectUser } from '../../../redux/reducers/authReducer'
import cara from '../../../assets/general/cara.svg'
import Image from 'next/image'
import { USER_ROLES } from '../../../utils/user-roles'
import { ROUTES_USER } from '../../../utils/verifications'
import { useFetchPagination } from '../../../hooks/useFetchPagination'

export interface Filtros {
  estado?: [number]
  poliza?: string
  identificacion?: number
  startDate?: string
  finalDate?: string
  caducidadDate?: string
  finalCaducidadDate?: string
  sucursal?: string
  nombreEmpresa?: string
  usuario?: string
  digital?: boolean
  fisica?: boolean
  orden?: number
}

const headers = [
  'N° Orden',
  'Sucursal',
  'Cantidad',
  'Póliza',
  'Fecha',
  'Tomador',
  'Tipo',
  'Estado'
]
const colorState: { [key: number]: string } = {
  1: 'bg-purpleTable bg-opacity-30',
  2: 'bg-yellowTable bg-opacity-30',
  3: 'bg-blueTable bg-opacity-30',
  4: 'bg-greenTable bg-opacity-30',
  5: 'bg-redTable bg-opacity-30',
  6: 'bg-redTable bg-opacity-30',
  7: 'bg-purpleTable bg-opacity-30'
}
const orderState: { [key: number]: string } = {
  1: 'Pendiente',
  2: 'Aceptada',
  3: 'Impresa',
  4: 'Finalizada',
  5: 'Anulada',
  6: 'Rechazado',
  7: 'Por Aprobar',
  0: 'Todas'
}

const MisOrders = () => {
  const orders = useSelector(getListOrders)
  const [filtro, setFiltro] = useState<number>(0)
  const [filtrado, setFiltrado] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [isChecked] = useState(false)
  const dispatch = useDispatch()

  const user = useSelector(selectUser)
  const [filtros, setFiltros] = useState<Filtros>({
    nombreEmpresa: user?.empresa
  })
  const { estado } = useRouter().query
  // const hanlechange = () => {
  //   setIsChecked(!isChecked)
  // }
  const params = {
    dispatch,
    data: {
      ...filtros,
      estado: [Number(estado)]
    },
    nombreEmpresa: user?.empresa,
    estado: [Number(estado)]
  }

  if (
    user?.rol === USER_ROLES.ENCARGADO ||
    user?.rol === USER_ROLES.USUARIO_SUCURSAL
  ) {
    params.data.sucursal = user?.sucursal
  }
  useEffect(() => {
    setLoading(true)
    if (estado) {
      setFiltros({ ...filtros, estado: [Number(estado)] })
    } else {
      setFiltros({ ...filtros, estado: [Number(estado)] })
    }

    getOrdersFiltros({
      dispatch,
      data: {
        ...filtros,
        estado:
          Number(estado) === 1
            ? [Number(estado), 7]
            : Number(estado) === 5
            ? [Number(estado), 6]
            : [Number(estado)]
      }
    })
    setLoading(false)
  }, [estado])

  const { paginator, isLoading } = useFetchPagination({
    functionFetcher: getOrdersFiltros,
    params
  })

  const handleChange = (e: any) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    })
  }
  const callService = (filtro: number) => {
    getOrdersFiltros({ dispatch, data: filtros })
    setFiltrado(filtro)
    setFiltro(0)
    if (USER_ROLES.ENCARGADO === user?.rol) {
      getOrdersFiltros({
        dispatch,
        data: {
          nombreEmpresa: user?.empresa,
          sucursal: user?.sucursal
        }
      })
      setFiltrado(filtro)
      setFiltro(0)
    } else {
      getOrdersFiltros({ dispatch, data: filtros })
      setFiltrado(filtro)
      setFiltro(0)
    }
  }
  const deleteState = () => {
    setFiltros({
      nombreEmpresa: user?.empresa
    })
    if (USER_ROLES.ENCARGADO === user?.rol) {
      const params: any = {
        nombreEmpresa: user?.empresa,
        sucursal: user?.sucursal
      }
      getOrdersFiltros({ dispatch, data: params })
      setFiltro(0)
      setFiltrado(0)
    } else {
      getOrdersFiltros({
        dispatch,
        data: {
          nombreEmpresa: user?.empresa
        }
      })
      setFiltro(0)
      setFiltrado(0)
    }
  }

  const orderFields: OrdenModelTableRequest[] = (orders?.ordenes ?? []).map(
    (order: OrdenModel): OrdenModelTableRequest => {
      return {
        id: {
          link: true,
          href: `/${
            USER_ROLES.ADMIN === user?.rol
              ? ROUTES_USER.ADMIN
              : USER_ROLES.ENCARGADO === user?.rol
              ? ROUTES_USER.ENCARGADO
              : USER_ROLES.PRDUCCION === user?.rol
              ? ROUTES_USER.PRDUCCION
              : USER_ROLES.RECEPCION === user?.rol
              ? ROUTES_USER.RECEPCION
              : USER_ROLES.USUARIO_PRINCIPAL === user?.rol
              ? ROUTES_USER.USUARIO_PRINCIPAL
              : USER_ROLES.USUARIO_SUCURSAL === user?.rol
              ? ROUTES_USER.USUARIO_SUCURSAL
              : 'login'
          }/orders/${order?.id}`,
          text: order.id.toString()
        },
        Sucursal: order.nombreSucursal,
        Cantidad: order.cantidad < 1 ? 'Sin cantidad' : order.cantidad,
        Poliza: order.poliza,
        Fecha: order?.fecha ? order?.fecha : 'Fecha sin especificar',
        Tomador: order?.tomador,
        Tipo:
          order?.fisica === 1
            ? order?.pdf === 1
              ? 'Híbrida'
              : 'Física'
            : order?.pdf === 1 || order?.idmobile === 1
            ? 'Digital'
            : 'Sin especificar',
        Estado: orderState[order.estado],
        color: colorState[order.estado] ?? ''
      }
    }
  )

  return loading ? (
    <div className="flex justify-center mx-auto  items-center h-screen">
      <MoonLoader color="#425AC5" />
    </div>
  ) : (
    <div className="container w-full h-full bg-white flex flex-col justify-start mx-auto py-10  text-black px-5">
      <span className="text-textSize2 font-extrabold text-azulPrimary900">
        ÓRDENES
      </span>
      {filtro !== 0 && (
        <div
          className="w-full h-full absolute left-0 top-0"
          onClick={() => setFiltro(0)}
        ></div>
      )}
      <div className=" items-center flex justify-between w-[91%]">
        <div className="flex gap-4">
          <div className="hidden sm:flex flex-col">
            {filtro !== 1 && (
              <Button
                label={'Numero'}
                action={() => setFiltro(1)}
                type={'button'}
                icon={filtrado === 1 ? numerow : numero}
                className={`w-[164px] h-[44px]  ${
                  filtrado === 1
                    ? 'bg-[#086EAE] text-white'
                    : 'bg-azulPrimary100 text-azulSecondary900'
                }`}
              />
            )}

            {filtro === 1 && (
              <div className="transition ease-in-out duration-75">
                <Button
                  label={'Numero'}
                  action={() => setFiltro(0)}
                  type={'button'}
                  icon={numerow}
                  className={`w-[164px] h-[44px] text-white bg-[#086EAE] border-0`}
                />
                <div className=" absolute z-40  ">
                  <Numero
                    action={handleChange}
                    aplyFilter={() => callService(1)}
                    deleteA={deleteState}
                    value={filtros.identificacion ? filtros.identificacion : ''}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="hidden sm:flex flex-col">
            {filtro !== 2 && (
              <Button
                label={'Cliente'}
                action={() => setFiltro(2)}
                type={'button'}
                icon={filtrado === 2 ? clientew : persona}
                className={`w-[164px] h-[44px]  ${
                  filtrado === 2
                    ? 'bg-[#086EAE] text-white'
                    : 'bg-azulPrimary100 text-azulSecondary900'
                } `}
              />
            )}

            {filtro === 2 && (
              <div className="transition ease-in-out duration-75">
                <Button
                  label={'Cliente'}
                  action={() => setFiltro(0)}
                  type={'button'}
                  icon={clientew}
                  className={`w-[164px] h-[44px] text-white bg-[#086EAE] border-0`}
                />
                <div className=" absolute z-40 ">
                  <Cliente
                    action={handleChange}
                    aplyFilter={() => callService(2)}
                    deleteA={deleteState}
                    sucursal={filtros?.sucursal ? !isChecked : isChecked}
                    value={filtros}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="hidden sm:flex flex-col">
            {filtro !== 3 && (
              <Button
                label={'Fecha'}
                action={() => setFiltro(3)}
                type={'button'}
                icon={fechaw}
                className={`w-[164px] h-[44px] ${
                  filtrado === 3
                    ? 'bg-[#086EAE] text-white'
                    : 'bg-azulPrimary100 text-azulSecondary900'
                }   `}
              />
            )}

            {filtro === 3 && (
              <div className="transition ease-in-out duration-75">
                <Button
                  label={'Fecha'}
                  action={() => setFiltro(0)}
                  type={'button'}
                  icon={fecha}
                  className={`w-[164px] h-[44px] text-white bg-[#086EAE] border-0`}
                />
                <div className=" absolute z-40  ">
                  <Fecha
                    action={handleChange}
                    aplyFilter={() => callService(3)}
                    deleteA={deleteState}
                    valueStart={filtros?.startDate ? filtros.startDate : ''}
                    valueFinal={filtros?.finalDate ? filtros.finalDate : ''}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {orders?.ordenes && (
        <Table
          title={headers}
          list={orderFields}
          colorTitle={'bg-azulSecondary100'}
          totalPage={orders?.page?.pages}
          functionPagination={paginator}
          isLoading={isLoading}
        />
      )}

      {orders?.ordenes === null && (
        <div className="mx-auto my-auto flex flex-col justify-center">
          <Image src={cara} alt="" className="" />
          <span className=" text-textSize5 my-5 text-center text-gray-400 w-[220px]">
            Lo siento, no hay datos disponibles
          </span>
        </div>
      )}
    </div>
  )
}

export default MisOrders
