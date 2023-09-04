import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Link from '../../../../src/assets/administrador/remision/Link'
import Download from '../../../../src/assets/general/Download'
import Button from '../../../../src/components/buttons/Button'
import { useFetchPagination } from '../../../../src/hooks/useFetchPagination'
import {
  getCarnesByOrder,
} from '../../../../src/redux/actions/carneActions'
import { getCarnesByOrderSelector } from '../../../../src/redux/reducers/carneReducer'
import Layout from '../../../../src/screens/formatos/Layout'
import Table from '../../../../src/screens/general/table/Table'
import { dataSidebar } from '../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../src/utils/enums'
import { validUrl } from '../../../../src/utils/validUrl'
import { selectUser } from '../../../../src/redux/reducers/authReducer'

const headers = ['Nº Orden', 'Nombre', 'Nº Identificación', 'Tipo Carnet']

export default function CarneDetails() {
  const carnesByOrder = useSelector(getCarnesByOrderSelector)

  const dispatch = useDispatch()

  const { query } = useRouter()

  const params = {
    dispatch,
    order: query?.id
  }

  const { paginator, isLoading } = useFetchPagination({
    functionFetcher: getCarnesByOrder,
    params
  })

  useEffect(() => {
    if (query) {
      getCarnesByOrder({ dispatch, order: query?.id as string })
    }
  }, [])

  const copyToClipboard = () => {
    carnesByOrder &&
      carnesByOrder.url &&
      navigator.clipboard?.writeText(carnesByOrder.url)
    toast.success('Se ha copiado el enlace de la orden')
  }
  const copyToContraseña = () => {
    carnesByOrder &&
      carnesByOrder.contrasena &&
      navigator.clipboard?.writeText(carnesByOrder.contrasena)
    toast.success('Se ha copiado la contraseña')
  }
  const user = useSelector(selectUser)
  const content = carnesByOrder?.carnets?.map((item: any) => ({
    id: {
      link: true,
      href: `/${validUrl(user?.rol)}/orders/${query?.id}`,
      text: query?.id
    },
    nombre: item.nombre,
    identification: item.identificacion,
    carnetTipo: item.carnetTipo
  }))
  return (
    <Layout
      titleSection={`ORDEN ${query?.id}`}
      dataSidebar={dataSidebar[SIDEBAR_ENUM.ORDERS_BUSINESS]}
      titleBasePage="Carnés PDF"
    >
      <div className="grid gap-y-[15px]">
        <section className="grid gap-y-[15px] md:flex md:justify-between">
          <p className="font-bold text-textSize6 text-azulPrimary900">
            Cantidad:{' '}
            <span className="text-neutral-500">
              {carnesByOrder?.carnets?.length} unidades
            </span>
          </p>
          {carnesByOrder && carnesByOrder.url ? (
            <div className="grid gap-[15px] md:grid-flow-col md:w-[400px]">
              <button
                onClick={copyToContraseña}
                className="h-[50px] bg-azulPrimary900 text-white w-full rounded-[5px] text-textSize7 font-bold"
              >
                Copiar Contraseña
              </button>
              <Button onClick={copyToClipboard}>
                {
                  <span className="flex gap-[10px] text-white items-center w-fit mx-auto">
                    <Link />
                    Copiar URL
                  </span>
                }
              </Button>
              <a
                download
                href={carnesByOrder.url}
                rel="noreferrer"
                target="_blank"
                className="flex gap-[10px] text-white items-center mx-auto h-[50px] bg-azulPrimary900 justify-center w-full rounded-[5px] text-textSize7 font-bold"
              >
                <Download />
                Descargar
              </a>
            </div>
          ) : (
            <p className="text-textSize6 text-azulPrimary900">
              No url disponible
            </p>
          )}
        </section>
        {content?.length === 0 ? (
          <p>No hay carnés</p>
        ) : (
          <Table
            title={headers}
            list={content}
            bgRow="bg-[#D9D9D9]/30"
            totalPage={carnesByOrder?.paginador?.pages}
            functionPagination={paginator}
            isLoading={isLoading}
          />
        )}
      </div>
    </Layout>
  )
}
