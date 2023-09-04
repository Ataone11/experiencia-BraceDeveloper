import Link from 'next/link'
import { CSSProperties, useEffect, useState } from 'react'
import Paginacion from '../../../components/paginacion/Paginacion'
import { getOrder } from '../../../redux/actions/orderAdminActions'
import { useDispatch, useSelector } from 'react-redux'
import { getListOrders } from '../../../redux/reducers/orderAdminReducer'
import { OrdenModel } from '../../../models/ordenModel'
import { selectUser } from '../../../redux/reducers/authReducer'
import { PuffLoader } from 'react-spinners'

const previousPage = () => null

const nextPage = () => null

const TablaOrders = (estado: any) => {
  const orders = useSelector(getListOrders)
  let user = useSelector(selectUser);
  const dispatch = useDispatch()
  useEffect(() => {
    if (!user) {
      setLoading(true)
      user = useSelector(selectUser)
    }
    if (estado.estado.estado !== 0) {
      setLoading(true)
      getOrder(dispatch, estado.estado.estado.id, user?.idCliente)
    } else {
      setLoading(true)
      getOrder(dispatch, 0, user?.idCliente)
    }
    setLoading(false)
  }, [estado, user])
  const [currentPage, setCurrentPage] = useState<number>(3)
  const lastPage = 2
  const [loading, setLoading] = useState(false)
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }

  return (
    <div>
      {!loading ? (
        <div className="container  my-2   w-[100%]">
          <table
            className={`${
              estado.estado.estado === 0
                ? 'table'
                : estado.estado.estado.id === 2
                ? 'tableA'
                : estado.estado.estado.id === 3
                ? 'tableee'
                : estado.estado.estado.id === 4
                ? 'tableV'
                : estado.estado.estado.id === 5
                ? 'tableR'
                : ''
            } w-[100%] overflow-hidden rounded-lg`}
          >
            <thead className=" bg-azulPrimary300  border-4 border-b-azulPrimary900 border-t-white border-r-white border-l-white  ">
              <tr className=" text-azulPrimary900 font-semibold h-[44px] ">
                <th>N° Ordens</th>
                <th>Cliente</th>
                <th>Sucursal</th>
                <th>Cantidad</th>
                <th>Póliza</th>
                <th>Fecha</th>
                <th>N° ARH</th>
                <th>Tipo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {(orders ?? []).map((o: OrdenModel) => (
                <tr
                  className={` ${
                    estado.estado.estado === 0
                      ? o.estado === 1
                        ? ' bg-slate-400'
                        : estado.estado.estado.id === 2
                        ? ' bg-yellow-100'
                        : estado.estado.estado.id === 3
                        ? ' bg-azulPrimary100'
                        : estado.estado.estado.id === 4
                        ? ' bg-green-200'
                        : estado.estado.estado.id === 5
                        ? 'bg-red-200'
                        : ''
                      : estado.estado.estado.id === 2
                      ? ' bg-yellow-100'
                      : estado.estado.estado.id === 3
                      ? ' bg-azulPrimary100'
                      : estado.estado.estado.id === 4
                      ? ' bg-green-200'
                      : estado.estado.estado.id === 5
                      ? ' bg-red-200'
                      : ''
                  }    rounded-lg h-[64px] text-center`}
                  key={o.idCliente}
                >
                  <td className="text-azulPrimary500 underline cursor-pointer">
                    <Link href={`orders/${o.id}`} key={o.idCliente} shallow>
                      <a>{o.id}</a>
                    </Link>
                  </td>

                  <td>{o.idCliente}</td>
                  <td>{o.fisica}</td>
                  <td>{o.cantidad}</td>
                  <td>{o.poliza}</td>
                  <td>{o.pdf}</td>
                  <td>{o.idmobile}</td>
                  <td>{o.tomador}</td>
                  <td>{o.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Paginacion
            currentPage={currentPage}
            lastPage={lastPage}
            previousPage={previousPage}
            nextPage={nextPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <div className="flex h-[60vh] justify-center items-center">
          {!orders && (
            <PuffLoader
              color="#086eae"
              loading={true}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default TablaOrders
