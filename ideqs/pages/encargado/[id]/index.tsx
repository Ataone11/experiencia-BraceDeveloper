import type { NextPage } from 'next'
import { useState } from 'react'
import BasePage from '../../../src/screens/general/base/BasePage'
import Menu from '../../../src/screens/empresa/consultas/menu'
import Link from 'next/dist/client/link'
import Home from '../../../src/assets/administrador/orders/Homei.svg'
import Image from 'next/image'
import DetalleO from '../../../src/screens/administrador/ordersAdmin/detalleOrden'
import EditarOrden from '../../../src/screens/administrador/ordersAdmin/editarOrden'
import { DETALLE } from '../../../src/utils/pagesScreen'
const DetalleOrdens: NextPage = () => {
  const [hovering, setHovering] = useState(false)
  const [menu, setMenu] = useState(4)
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
          <Link href={'/encargado'} shallow>
            <a>
              <button
                onMouseEnter={hover}
                onMouseLeave={hoverout}
                className="w-[55px] h-[55px] hover:w-[100px] duration-300 hover:flex hover:justify-center  bg-azulPrimary900 rounded-full items-center absolute top-0 right-0 m-10"
              >
                {hovering && <span className=" text-white mx-2 ">Inicio</span>}

                <Image src={Home} layout="fixed" className="" alt="" />
              </button>
            </a>
          </Link>
          <div className="flex fixed ">
            <Menu menu={menu} setMenu={Detalle} />
          </div>
          <div className="w-[300px] "></div>
          {menu === DETALLE.DETALLE && (
            <div>
              {' '}
              <DetalleO menu={menu} setMenu={Detalle} />
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
