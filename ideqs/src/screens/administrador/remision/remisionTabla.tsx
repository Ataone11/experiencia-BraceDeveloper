import { useEffect, useState } from 'react'
import Paginacion from '../../../components/paginacion/Paginacion'
import { getRemisiones } from '../../../redux/actions/remisionActions'
import { useDispatch, useSelector } from 'react-redux'
import { getListRemisions } from '../../../redux/reducers/remisionesReducer'

const previousPage = () => null

const nextPage = () => null
const RemisionTabla = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const lastPage = 4

  const remisiones = useSelector(getListRemisions)
  const dispatch = useDispatch()
  useEffect(() => {
    getRemisiones({ dispatch })
  }, [])

  return (
    <div className="container w-full h-full bg-white flex flex-col justify-start mx-auto xl:mx-5 py-10  text-black">
      <span className="text-textSize1 font-extrabold text-azulPrimary900 ">
        Remisones
      </span>

      <div className="container  my-2 mx--2  w-[80%] pt-3">
        <table className="table w-[100%]">
          <thead className="border-4 rounded-lg border-b-azulPrimary900 border-t-white border-r-white border-l-white  ">
            <tr className=" text-azulPrimary900 font-semibold h-[44px] ">
              <th>N° Remisión</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {remisiones?.map((o: any) => (
              <tr className="rounded-lg h-[64px] text-center " key={`tr-${o}`}>
                <td>{o.numero}</td>
                <td>{o.cliente}</td>
                <td>{o.fecha}</td>
                <td>{o.descripcion}</td>
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
