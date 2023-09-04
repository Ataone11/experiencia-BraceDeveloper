import Reports from '../../../../src/screens/administrador/ordersAdmin/Report'
import { useState } from 'react'
import BasePage from '../../../../src/screens/general/base/BasePage'
import MenuAdmin from '../../../../src/screens/administrador/ordersAdmin/menuAdmin'
import Image from 'next/image'
import Home from '../../../../src/assets/administrador/orders/Homei.svg'
import Link from 'next/link'

export default function Report() {
  const [hovering, setHovering] = useState(false)
  const [menu, setMenu] = useState(2)
  const [order, setOrder] = useState(0)
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
      <div className="flex w-full h-screen">
        <Link href={'/administrador'} shallow>
          <a>
            <button
              onMouseEnter={hover}
              onMouseLeave={hoverout}
              className="hidden md:block w-[55px] h-[55px] hover:w-[100px] duration-300 hover:flex hover:justify-center  bg-azulPrimary900 rounded-full items-center absolute top-0 right-0 m-10"
            >
              {hovering && <span className=" text-white mx-2 ">Inicio</span>}

              <Image src={Home} layout="fixed" className="" alt="" />
            </button>
          </a>
        </Link>
        <div className="fixed hidden md:flex ">
          <MenuAdmin
            menu={menu}
            setMenu={ListadoPedidos}
            order={order}
            setOrder={ListarEstado}
          />
        </div>
        <div className="hidden lg:flex md:w-[300px] "></div>

        <Reports />
      </div>
    </BasePage>
  )
}
