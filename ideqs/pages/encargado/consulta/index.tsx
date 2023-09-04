import type { NextPage } from 'next'
import { useState } from 'react'
import BasePage from '../../../src/screens/general/base/BasePage'
import Menu from '../../../src/screens/empresa/consultas/menu'
import Buscar from '../../../src/screens/empresa/orders/buscar'
import Image from 'next/image'
import Home from '../../../src/assets/empresa/orders/Homei.svg'
import Link from 'next/link'
import { Filtros } from '../../../src/screens/administrador/ordersAdmin/misOrdenes'
import Resultado from '../../../src/screens/empresa/consultas/Resultado'
import { getOrdersFiltros } from '../../../src/redux/actions/ordersActions'
import { useDispatch } from 'react-redux'

const Orders: NextPage = () => {
  const [hovering, setHovering] = useState(false)
  const [menu, setMenu] = useState(3)
  const [isChecked, setIsChecked] = useState(true)
  const [filtros, setFiltros] = useState<Filtros>()
  const dispatch = useDispatch()
  const handleChange = (e: any) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value })
  }
  const callService = () => {
    getOrdersFiltros({ dispatch, data: filtros }).then(null)
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
  return (
    <BasePage title={'Ordenes'}>
      <div className="flex w-full h-full  ">
        <title>{'Ordenes'}</title>
        <Link href={'/encargado'} shallow>
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
          <Menu menu={menu} setMenu={ListadoPedidos} />
        </div>

        <div className="hidden lg:flex md:w-[300px] "></div>

        {menu === 3 && (
          <Buscar
            aplyFilter={callService}
            action={handleChange}
            filtros={filtros}
            title={'Verificador'}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            setFiltros={(e: any) => setFiltros({ ...filtros, usuario: e })}
            setSucursal={(e: any) =>
              setFiltros({ ...filtros, nombreSucursal: e })
            }
          />
        )}
        {menu === 4 && (
          <Resultado filtros={filtros} action={() => setMenu(3)} />
        )}
      </div>
    </BasePage>
  )
}

export default Orders
