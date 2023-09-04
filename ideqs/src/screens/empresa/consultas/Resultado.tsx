import Table from '../../general/table/Table'
import Button from '../../../components/buttons/grisButton'
import { getOrdersFiltros } from '../../../redux/actions/ordersActions'
import { useDispatch, useSelector } from 'react-redux'
import { getListOrders } from '../../../redux/reducers/ordersReducer'
import { MoonLoader } from 'react-spinners'
import { OrdenModel, OrdenModelTableRequest } from '../../../models/ordenModel'
import { useFetchPagination } from '../../../hooks/useFetchPagination'
import { selectUser } from '../../../redux/reducers/authReducer'
import { ROUTES_USER } from '../../../utils/verifications'
import { USER_ROLES } from '../../../utils/user-roles'
import caraSeria from '../../../../src/assets/general/cara.svg'
import Image from 'next/image'
import edit from '../../../assets/administrador/orders/editw.svg'
export interface Filtros {
  estado?: number
  poliza?: string
  identificacion?: number
  startDate?: string
  finalDate?: string
  sucursal?: number
  nombreEmpresa?: string
  usuario?: string
  digital?: boolean
  fisica?: boolean
  page: number
}
interface editarFiltro {
  action?: () => void
  filtros: any
  loading?: boolean
  setHandleComponent?: (e: any) => void
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

const Resultado = ({ action, filtros, loading }: editarFiltro) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const params = {
    dispatch,
    data: filtros
  }
  if (user?.rol === USER_ROLES.ENCARGADO) {
    params.data.sucursal = Number(user?.sucursal)
  }
  const { paginator, isLoading } = useFetchPagination({
    functionFetcher: getOrdersFiltros,
    params
  })
  const orders = useSelector(getListOrders)
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
          }/${order?.id}`,
          text: order?.id.toString()
        },
        Cliente: order?.nombreCliente,
        Sucursal: order?.nombreSucursal,
        Cantidad: order?.cantidad,
        Poliza: order?.poliza,
        Fecha: order?.fecha ? order?.fecha : 'fecha sin especificar',
        Tomador: order?.tomador,
        Tipo:
          order?.fisica === 1
            ? order?.pdf === 1
              ? 'Híbrida'
              : 'Física'
            : order?.pdf === 1 || order?.idmobile === 1
            ? 'Digital'
            : 'sin especificar',
        Estado: orderState[order?.estado],
        color: colorState[order?.estado] ?? ''
      }
    }
  )
  return loading ? (
    <div className="flex justify-center mx-auto  items-center h-screen">
      <MoonLoader color="#425AC5" />
    </div>
  ) : (
    <div className="container w-full h-full bg-white flex flex-col justify-start mx-auto py-10   text-black">
      <div className="flex flex-col  md:justify-between pr-40">
        <span className="flex items-center text-textSize2 font-extrabold text-azulPrimary900 mx-3">
          RESULTADO
        </span>
        <div className="hidden lg:flex justify-end">
          <Button
            label={'Editar búsqueda'}
            action={action}
            type={'button'}
            className={`w-[139px] h-[36px] text-textSize2 font-normal text-white bg-azulPrimary700 border-0`}
            classNameText={'text-textSize7'}
          />
        </div>
        <div className="lg:hidden flex mx-5 w-full ">
          <Button
            label={'Editar búsqueda'}
            action={action}
            type={'button'}
            className={`w-[149px] h-[26px] text-textSize2 gap-1 font-normal text-white rounded-3xl bg-azulPrimary900 border-0`}
            classNameText={'text-textSize7'}
            icon={edit}
          />
        </div>
      </div>
      {!orders?.ordenes && (
        <div className="mx-auto pt-40 h-fit flex flex-col justify-center">
          <Image src={caraSeria} alt="" className="" />
          <span className=" text-textSize5  text-center text-gray-400 w-[220px]">
            Lo siento, no se encontraros resultados
          </span>
        </div>
      )}
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
    </div>
  )
}

export default Resultado
