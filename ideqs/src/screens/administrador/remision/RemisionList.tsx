import { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import caraSeria from '../../../assets/general/cara.svg'
import Button from '../../../components/buttons/Button'
import Image from 'next/image'
import { useFetchPagination } from '../../../hooks/useFetchPagination'
import { getRemisiones } from '../../../redux/actions/remisionActions'
import {
  getFilters,
  getListRemisions
} from '../../../redux/reducers/remisionesReducer'
import { screensRemisiones } from '../../../utils/constants'
import Table from '../../general/table/Table'
import { selectUser } from '../../../redux/reducers/authReducer'
import { validUrl } from '../../../utils/validUrl'

const headers: any = ['Nº Remisión', 'Cliente', 'Fecha', 'Descripción']

export default function RemisionList({
  setHandleScreen
}: {
  setHandleScreen: Dispatch<SetStateAction<string>>
}) {
  const ordersR = useSelector(getListRemisions)
  const filters = useSelector(getFilters)
  const user = useSelector(selectUser)
  const content = ordersR.remisiones?.map((reemision: any) => ({
    id: {
      link: true,
      href: `/${validUrl(user?.rol)}/remisiones/${reemision.id}`,
      text: reemision.id
    },
    client: reemision.nombreCliente,
    date: reemision.fecha,
    description: 'No está en el servicio'
  }))
  const dispatch = useDispatch()
  const { paginator, isLoading } = useFetchPagination({
    functionFetcher: getRemisiones,
    params: { dispatch, body: filters }
  })
  return (
    <div className="grid gap-y-[15px] lg:flex lg:flex-col lg:items-end">
      <div className="w-[200px]">
        <Button onClick={() => setHandleScreen(screensRemisiones.SEARCH)}>
          Editar búsqueda
        </Button>
      </div>
      {ordersR?.remisiones === null ? (
        <div className="mx-auto flex flex-col justify-center my-auto pt-32">
          <Image src={caraSeria} alt="" className="" />
          <span className=" text-textSize5 my-5 text-center text-gray-400 w-[290px]">
            Lo siento, no hay remisiones con estos datos
          </span>
        </div>
      ) : (
        <Table
          title={headers}
          list={content}
          bgRow="bg-[#D9D9D9]/30"
          totalPage={ordersR?.page?.pages}
          functionPagination={paginator}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
