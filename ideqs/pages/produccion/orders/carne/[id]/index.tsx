import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Link from 'next/dist/client/link'
import Download from '../../../../../src/assets/general/Download'
import Button from '../../../../../src/components/buttons/Button'
import { useFetchPagination } from '../../../../../src/hooks/useFetchPagination'
import {
  getCarnesByOrder
} from '../../../../../src/redux/actions/carneActions'
import { getCarnesByOrderSelector } from '../../../../../src/redux/reducers/carneReducer'
import Table from '../../../../../src/screens/general/table/Table'
import BasePage from '../../../../../src/screens/general/base/BasePage'
import MenuAdmin from '../../../../../src/screens/administrador/ordersAdmin/menuAdmin'
import Home from '../../../../../src/assets/administrador/orders/Homei.svg'
import Image from 'next/image'
import { selectUser } from '../../../../../src/redux/reducers/authReducer'
import { validUrl } from '../../../../../src/utils/validUrl'

const headers = ['Nº Orden', 'Nombre', 'Nº Identificación', 'Tipo Carnet']

export default function CarneDetails() {
  const [hovering, setHovering] = useState(false)
  const [menu, setMenu] = useState(4)
  const [order, setOrder] = useState(3)
  const hover = () => {
    setHovering(true)
  }
  const hoverout = () => {
    setHovering(false)
  }
  const Detalle = (e: number) => {
    setMenu(e)
  }

  const carnesByOrder = useSelector(getCarnesByOrderSelector)
  const router = useRouter()
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
      href: `/${validUrl(user?.rol)}/orders/${query.id}`,
      text: query.id
    },
    nombre: item.nombre,
    identification: item.identificacion,
    carnetTipo: item.carnetTipo
  }))
  return (
    <BasePage title={'Ordenes'}>
      <div className="flex w-full h-full">
        <Link href={'/administrador'} shallow>
          <a>
            <button
              onMouseEnter={hover}
              onMouseLeave={hoverout}
              className="w-[55px] hidden md:block h-[55px] hover:w-[100px] duration-300 hover:flex hover:justify-center  bg-azulPrimary900 rounded-full items-center absolute top-0 right-0 m-10"
            >
              {hovering && <span className=" text-white mx-2 ">Inicio</span>}

              <Image src={Home} layout="fixed" className="" alt="" />
            </button>
          </a>
        </Link>
        <div className="hidden md:flex fixed ">
          <MenuAdmin
            menu={menu}
            setMenu={Detalle}
            order={order}
            setOrder={setOrder}
          />
        </div>
        <div className="w-[300px] hidden md:block"></div>
        <div className="grid gap-y-[15px] w-full pt-10">
          <div className=" flex gap-5 items-center">
            <button
              onClick={() => router.push(`/administrador/orders/${query?.id}`, undefined, {shallow:true})}
              className=" w-[50px] h-[50px] rounded-full bg-azulPrimary900  text-white text-textSize3"
            >
              {'<-'}
            </button>
            <span className=" text-azulPrimary900 font-extrabold text-textSize2">
              Carnés PDF
            </span>
          </div>

          {isLoading && (
            <span className=" flex justify-start fond-bold">
              Cargando unidades...
            </span>
          )}
          {!isLoading && (
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
                <p className="text-textSize6 text-azulPrimary900"></p>
              )}
            </section>
          )}
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
      </div>
    </BasePage>
  )
}
