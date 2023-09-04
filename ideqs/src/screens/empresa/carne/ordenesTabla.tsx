/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Paginacion from '../../../components/paginacion/Paginacion'
import { getCarne } from '../../../redux/actions/carneActions'
import { useDispatch, useSelector } from 'react-redux'
import { getListOrders } from '../../../redux/reducers/carneReducer'

const previousPage = () => null

const nextPage = () => null
const RemisionTabla = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lastPage] = useState<number>(4)
  const orders = useSelector(getListOrders)
  const dispatch = useDispatch()
  useEffect(() => {
    getCarne(dispatch)
  }, [])

  return (
    <div className="container w-full h-full bg-white flex flex-col justify-start pl-20 mx-auto py-10  text-black">
      <span className="text-textSize1 font-extrabold text-azulPrimary900 ">
        ÓRDENES
      </span>

      <div className="container  my-2 mx-2  w-[80%] pt-3">
        <table className="table w-[100%]">
          <thead className="border-4 rounded-lg border-b-azulPrimary900 border-t-white border-r-white border-l-white bg-azulSecondary100 ">
            <tr className=" text-azulPrimary900 font-semibold h-[44px]  ">
              <th>Orden</th>
              <th>Nombre de archivo</th>
              <th>Fecha</th>
              <th>Archivo</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o: any) => (
              <tr
                className="rounded-lg h-[64px] text-center "
                key={`tr_orden-${o}`}
              >
                <td className="text-azulPrimary700 underline cursor-pointer">
                  {o.orden}
                </td>
                <td>{o.archivo}</td>
                <td>{o.fecha}</td>
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
    </div>
  )
}

export default RemisionTabla
