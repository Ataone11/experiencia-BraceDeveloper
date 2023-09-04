import type { NextPage } from 'next'
import { useState } from 'react'
import BasePage from '../../../../src/screens/general/base/BasePage'
import Menu from '../../../../src/screens/administrador/ordersAdmin/menuAdmin'
import Buscar from '../../../../src/screens/administrador/ordersAdmin/buscarA'
import Image from 'next/image'
import Home from '../../../../src/assets/empresa/orders/Homei.svg'
import Link from 'next/link'
import { Filtros } from '../../../../src/screens/administrador/ordersAdmin/misOrdenes'
import Resultado from '../../../../src/screens/administrador/ordersAdmin/Resultado'
import { getOrdersFiltros } from '../../../../src/redux/actions/ordersActions'
import { useDispatch } from 'react-redux'
import { BUSCAR } from '../../../../src/utils/pagesScreen'
import Header from '../../../../src/screens/formatos/Header'

const Orders: NextPage = () => {
  const [hovering, setHovering] = useState(false)
  const [menu, setMenu] = useState(3)
  const [order, setOrder] = useState(1)
  const [loading] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
  const [filtros, setFiltros] = useState<Filtros>()
  const handleChange = (e: any) => {
    if (e.target?.name === 'estado') {
      setFiltros({ ...filtros, [e.target?.name]: Number(e.target.value) })
    } else if (e.target?.name === 'usuario') {
      setFiltros({ ...filtros, usuario: e.target?.user })
    } else {
      setFiltros({ ...filtros, [e.target?.name]: e.target?.value })
    }
  }
  const dispatch = useDispatch()
  const callService = () => {
    getOrdersFiltros({ dispatch, data: filtros })
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
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  return (
    <BasePage title={'Ordenes'}>
      <Header
        isOpen={sidebarIsOpen}
        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
      />
      <div className="flex w-full h-full  ">
        <title>{'Ordenes'}</title>
        <Link href={'/administrador'} shallow>
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

        {menu === BUSCAR.BUSCAR && (
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
        {menu === BUSCAR.RESULTADO && (
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
