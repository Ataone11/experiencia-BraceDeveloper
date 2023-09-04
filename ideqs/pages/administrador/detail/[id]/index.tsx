import type { NextPage } from 'next'
import { useState } from 'react'
import BasePage from '../../../../src/screens/general/base/BasePage'
import MenuAdmin from '../../../../src/screens/administrador/ordersAdmin/menuAdmin'
import Link from 'next/dist/client/link'
import Home from '../../../../src/assets/administrador/orders/Homei.svg'
import Image from 'next/image'
import DetalleO from '../../../../src/screens/administrador/ordersAdmin/detalleOrden'
import EditarOrden from '../../../../src/screens/administrador/ordersAdmin/editarOrden'
import { DETALLE } from '../../../../src/utils/pagesScreen'
const DetalleOrdens: NextPage = () => {
  const [hovering, setHovering] = useState(false)
  const [menu, setMenu] = useState<DETALLE>(DETALLE.EDITAR)
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

  return (
    <div>
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
          {menu === DETALLE.DETALLE && (
            <div>
              {' '}
              <DetalleO menu={menu} setMenu={Detalle} admin={true} />
            </div>
          )}
          {menu === DETALLE.EDITAR && (
            <div>
              {' '}
              <EditarOrden menu={menu} setMenu={Detalle} />
            </div>
          )}
        </div>
      </BasePage>
    </div>
  )
}
export default DetalleOrdens
