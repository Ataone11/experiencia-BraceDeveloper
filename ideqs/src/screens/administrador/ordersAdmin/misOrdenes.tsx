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
import Cliente from '../../administrador/ordersAdmin/clienteA'
import Fecha from '../../administrador/ordersAdmin/filtroFecha'
import cara from '../../../assets/general/cara.svg'
import { getOrdersFiltros } from '../../../redux/actions/ordersActions'
import { useDispatch, useSelector } from 'react-redux'
import { getListOrders } from '../../../redux/reducers/ordersReducer'
import { MoonLoader } from 'react-spinners'
import { OrdenModel, OrdenModelTableRequest } from '../../../models/ordenModel'
import { useRouter } from 'next/router'
import { selectUser } from '../../../redux/reducers/authReducer'
import Image from 'next/image'
import { useFetchPagination } from '../../../hooks/useFetchPagination'
import { validUrl } from '../../../utils/validUrl'
export interface Filtros {
  estado?: [number]
  poliza?: string
  orden?: string
  identificacion?: number
  startDate?: string
  finalDate?: string
  caducidadDate?: string
  finalCaducidadDate?: string
  nombreSucursal?: string
  sucursales?: []
  nombreEmpresa?: string
  usuario?: string
  digital?: boolean
  fisica?: boolean
  tomador?: string
}

const headers = [
  'N° Orden',
  'Cliente',
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
  const [filtro, setFiltro] = useState<number>(0)
  const [filtrado, setFiltrado] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const orders = useSelector(getListOrders)
  const dispatch = useDispatch()
  const [isChecked] = useState(false)
  const user = useSelector(selectUser)
  const { estado } = useRouter().query
  const [filtros, setFiltros] = useState<Filtros>()

  useEffect(() => {
    if (estado) {
      setFiltros({ ...filtros, estado: [Number(estado)] })
    } else {
      setFiltros({ ...filtros, estado: [Number(estado)] })
    }
    setLoading(true)
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

  const params = {
    dispatch,
    filtros
  }
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
    setLoading(true)
    getOrdersFiltros({ dispatch, data: filtros })
    setFiltrado(filtro)
    setFiltro(0)
    setLoading(false)
  }
  const deleteState = () => {
    setLoading(true)
    setFiltros({})
    setFiltro(0)
    setFiltrado(0)
    getOrdersFiltros({ dispatch, data: {} })
    setLoading(false)
  }

  const orderFields: OrdenModelTableRequest[] = (orders?.ordenes ?? []).map(
    (order: OrdenModel): OrdenModelTableRequest => {
      return {
        id: {
          link: true,
          href: `/${validUrl(user?.rol)}/orders/${order?.id}`,
          text: order?.id.toString()
        },
        Cliente: order?.nombreCliente,
        Sucursal: order?.nombreSucursal,
        Cantidad: order.cantidad < 1 ? 'Sin cantidad' : order.cantidad,
        Poliza: order?.poliza,
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
        Estado: orderState[order?.estado],
        color: colorState[order?.estado] ?? ''
      }
    }
  )

  return loading ? (
    <div className="flex justify-center mx-auto  items-center h-screen ">
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

      <div className="flex items-center justify-between w-[91%] ">
        <div className="flex gap-1  md:gap-4">
          <div className="flex flex-col">
            {filtro !== 1 && (
              <Button
                label={'Numero'}
                action={() => setFiltro(1)}
                type={'button'}
                icon={filtrado === 1 ? numerow : numero}
                className={`w-[110px] md:w-[164px] h-[20px] md:h-[44px]  ${
                  filtrado === 1
                    ? 'bg-[#086EAE] text-white cursor-pointer'
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
                  className={`w-[110px] md:w-[164px] h-[20px] md:h-[44px]   text-white cursor-pointer bg-[#086EAE] border-0`}
                />

                <div className=" absolute ">
                  <Numero
                    action={handleChange}
                    aplyFilter={() => callService(1)}
                    deleteA={deleteState}
                    value={
                      filtros?.identificacion ? filtros.identificacion : ''
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {filtro !== 2 && (
              <Button
                label={'Cliente'}
                action={() => setFiltro(2)}
                type={'button'}
                icon={filtrado === 2 ? clientew : persona}
                className={`w-[110px] md:w-[164px] h-[20px] md:h-[44px]   ${
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
                  className={`w-[110px] md:w-[164px] h-[20px] md:h-[44px]   text-white bg-[#086EAE] border-0`}
                />
                <div className=" absolute ">
                  <Cliente
                    action={handleChange}
                    aplyFilter={() => callService(2)}
                    deleteA={deleteState}
                    sucursal={isChecked}
                    value={filtros}
                    setFiltros={(e: any) =>
                      setFiltros({ ...filtros, usuario: e })
                    }
                    setSucursal={(e: any) =>
                      setFiltros({ ...filtros, nombreSucursal: e })
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {filtro !== 3 && (
              <Button
                label={'Fecha'}
                action={() => setFiltro(3)}
                type={'button'}
                icon={fechaw}
                className={`w-[100px] md:w-[164px] h-[20px] md:h-[44px]  ${
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
                  className={`w-[100px] md:w-[164px] h-[20px] md:h-[44px]   text-white bg-[#086EAE] border-0`}
                />
                <div className=" absolute ">
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
        <div className="w-full">
          <Table
            title={headers}
            list={orderFields}
            colorTitle={'bg-azulSecondary100'}
            totalPage={orders?.page?.pages}
            functionPagination={paginator}
            isLoading={isLoading}
          />
        </div>
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
