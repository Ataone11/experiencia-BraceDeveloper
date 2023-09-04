import type { NextPage } from 'next'
import { useState } from 'react'
import BasePage from '../../../../src/screens/general/base/BasePage'
import Menu from '../../../../src/screens/administrador/ordersAdmin/menuAdmin'
import Buscar from '../../../../src/screens/empresa/orders/buscar'
import Image from 'next/image'
import Home from '../../../../src/assets/empresa/orders/Homei.svg'
import Link from 'next/link'
import { Filtros } from '../../../../src/screens/administrador/ordersAdmin/misOrdenes'
import Resultado from '../../../../src/screens/administrador/ordersAdmin/Resultado'
import { validUrl } from '../../../../src/utils/validUrl'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../src/redux/reducers/authReducer'

const Orders: NextPage = () => {
  const [hovering, setHovering] = useState(false)
  const [menu, setMenu] = useState(3)
  const [order, setOrder] = useState(1)
  const user = useSelector(selectUser)
  const [loading] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
  const [filtros, setFiltros] = useState<Filtros>()
  const handleChange = (e: any) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value })
  }
  const callService = () => {
    setMenu(4)
  }
  const hover = () => {
    setHovering(true)
  }
  const hoverout = () => {
    setHovering(false)
  }
  const ListadoPedidos = (e: number) => {
    setMenu(e)
  }
  const ListarEstado = (e: number) => {
    setOrder(e)
  }
  return (
    <BasePage title={'Ordenes'}>
      <div className="flex w-full h-full  ">
        <title>{'Ordenes'}</title>
        <Link href={`/${validUrl(user?.rol)}`}>
          <a>
            <button
              onMouseEnter={hover}
              onMouseLeave={hoverout}
              className="w-[55px] hidden md:block h-[55px] hover:w-[100px] duration-300 hover:flex hover:justify-center  bg-azulPrimary900 rounded-full items-center absolute top-0 right-0 m-10"
            >
              {hovering && <span className=" text-white mx-2 ">Inicio</span>}

              <Image src={Home} layout="fixed" className=" " alt="" />
            </button>
          </a>
        </Link>
        <div className="fixed hidden md:flex ">
          <Menu
            menu={3}
            setMenu={ListadoPedidos}
            order={order}
            setOrder={ListarEstado}
          />
        </div>

        <div className="hidden lg:flex md:w-[300px] "></div>

        {menu === 3 && (
          <Buscar
            aplyFilter={callService}
            action={handleChange}
            filtros={filtros}
            title={'BUSCAR ORDEN'}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            setFiltros={(e: any) => setFiltros({ ...filtros, usuario: e })}
            setSucursal={(e: any) =>
              setFiltros({ ...filtros, nombreSucursal: e })
            }
          />
        )}
        {menu === 4 && (
          <Resultado
            filtros={filtros}
            action={() => setMenu(3)}
            loading={loading}
          />
        )}
      </div>
    </BasePage>
  )
}

export default Orders
