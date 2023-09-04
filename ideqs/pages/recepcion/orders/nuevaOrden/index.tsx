import type { NextPage } from 'next'
import { useState } from 'react'
import BasePage from '../../../../src/screens/general/base/BasePage'
import Menu from '../../../../src/screens/administrador/ordersAdmin/menuAdmin'
import NuevaOrden from '../../../../src/screens/empresa/orders/nuevaOrden'
import Image from 'next/image'
import Home from '../../../../src/assets/empresa/orders/Homei.svg'
import Link from 'next/link'

const Orders: NextPage = () => {
  const [hovering, setHovering] = useState(false)
  const [menu, setMenu] = useState(4)
  const [order, setOrder] = useState(1)
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
        <Link href={'/recepcion'} shallow>
          <button
            onMouseEnter={hover}
            onMouseLeave={hoverout}
            className="w-[55px] hidden md:block h-[55px] hover:w-[100px] duration-300 hover:flex hover:justify-center  bg-azulPrimary900 rounded-full items-center absolute top-0 right-0 m-10"
          >
            {hovering && <span className=" text-white mx-2 ">Inicio</span>}

            <Image src={Home} layout="fixed" className=" " alt="" />
          </button>
        </Link>
        <div className="fixed hidden md:flex ">
          <Menu
            menu={menu}
            setMenu={ListadoPedidos}
            order={order}
            setOrder={ListarEstado}
          />
        </div>

        <div className="hidden lg:flex md:w-[300px] "></div>

        <NuevaOrden />
      </div>
    </BasePage>
  )
}

export default Orders
