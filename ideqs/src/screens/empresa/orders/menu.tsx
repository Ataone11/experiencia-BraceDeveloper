import Image from 'next/image'
import { useState } from 'react'
import Select from '../../../components/menu/signIn'

import ordenador from '../../../assets/empresa/orders/ordenador.png'
import account from '../../../assets/empresa/orders/account.svg'
import menua from '../../../assets/empresa/orders/Hamburguer menu.svg'
import menuw from '../../../assets/empresa/orders/menuw.svg'
import buscar from '../../../assets/empresa/orders/search.svg'
import masw from '../../../assets/empresa/orders/icon.svg'
import mas from '../../../assets/empresa/orders/+.svg'
import buscarw from '../../../assets/empresa/orders/searchw.svg'
import amarillo from '../../../assets/empresa/orders/amarillo.svg'
import azul from '../../../assets/empresa/orders/azul.svg'
import rojo from '../../../assets/empresa/orders/rojo.svg'
import verde from '../../../assets/empresa/orders/verde.svg'
import negro from '../../../assets/empresa/orders/negro.svg'
import Buton from '../../../components/buttons/buttonPrimaryInvert'
import { USER_ROLES } from '../../../utils/user-roles'
import { ROUTES_USER } from '../../../utils/verifications'
import Link from 'next/link'
import Router from 'next/router'
import { selectUser } from '../../../redux/reducers/authReducer'
import { useSelector } from 'react-redux'
import { validUrl } from '../../../utils/validUrl'

interface Props {
  title?: string
  icon?: any | string
  id: number
  color?: string
}

const dataSecure: Props[] = [
  {
    id: 1,
    title: 'Pendientes',
    icon: negro,
    color: 'bg-gray-300'
  },
  {
    id: 2,
    title: 'Aceptadas',
    icon: amarillo,
    color: 'bg-yellow-300'
  },
  {
    id: 3,
    title: 'Impresas',
    icon: azul,
    color: 'bg-blue-300'
  },
  {
    id: 4,
    title: 'Finalizadas',
    icon: verde,
    color: 'bg-green-300'
  },
  {
    id: 5,
    title: 'Anuladas',
    icon: rojo,
    color: 'bg-red-300'
  }
]
const Menu = ({
  menu,
  order,
  setOrder
}: {
  menu: number
  setMenu: (e: number) => void
  order: number
  setOrder: (e: number) => void
}) => {
  const [, setPrueba] = useState(true)
  const user = useSelector(selectUser)
  return (
    <div className="hidden  bg-azulPrimary300 h-full w-[243px] fixed left-0 lg:flex flex-col justify-between overflow-y-auto  scrollbar scrollbar-track-transparent ">
      <div className={`my-14 flex flex-col justify-center  `}>
        <div className="mx-auto  ">
          <Image src={ordenador} layout="fixed" className="mx-auto" alt="" />
        </div>
        <div className="flex text-azulPrimary700 text-textSize7 gap-3 items-start mx-auto  ">
          <div className="py-3">
            <Image
              src={account}
              alt="whatsappIcon"
              width={39}
              height={39}
              layout="fixed"
            />
          </div>

          <Select
            name={'sesion'}
            label={''}
            href={'/login'}
            className={
              'text-textSize6 w-[160px] h-[46px]  bg-azulPrimary300  truncate text-ellipsis'
            }
            action={() => setPrueba(false)}
          />
        </div>
        <span className="text-textSize5 text-azulPrimary900 mx-auto font-semibold my-5">
          Listado de pedidos
        </span>
        <div className="my-10 flex flex-col gap-y-2 mx-auto w-[90%]">
          <Buton
            label={'Mis órdenes'}
            icon={menuw}
            icona={menua}
            action={
              order !== 0
                ? () => {
                    Router.push(`/${validUrl(user?.rol)}/orders?estado=0`)
                    setOrder(0)
                  }
                : () => Router.push(`/${validUrl(user?.rol)}/orders?estado=0`)
            }
            flag={menu}
            className={'w-[200px] mx-auto rounded-lg bg-azulPrimary900'}
            index={1}
          />

          <div
            className={`${
              menu === 1
                ? 'flex flex-col   duration-500 ease-in-out '
                : 'hidden  duration-500 ease-in-out'
            } `}
          >
            {dataSecure.map((index: any) => (
              <div key={index}>
                <Link
                  href={`orders?estado=${order === index ? '' : index.id}`}
                  shallow
                >
                  <button
                    key={`buttonMenu-${index}`}
                    className={`${
                      order === index
                        ? 'bg-azulPrimary900'
                        : 'bg-azulPrimary300'
                    } flex mx-5 my-1 w-[200px] h-[50px] rounded-lg  items-center`}
                    type="button"
                    onClick={
                      order === index
                        ? () => setOrder(0)
                        : () => setOrder(index)
                    }
                  >
                    <a
                      className={`${
                        order === index
                          ? 'text-white font-normal '
                          : 'text-azulPrimary900 font-semibold'
                      }      grid grid-cols-2 gap-7  w-[20%] items-center mx-9 text-textSize7`}
                    >
                      <Image
                        src={index.icon}
                        className="mx-3"
                        layout="fixed"
                        alt=""
                      />
                      {index.title}
                    </a>
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <Link
            href={{
              pathname: `/${
                USER_ROLES.ADMIN === user?.rol
                  ? ROUTES_USER.ADMIN
                  : USER_ROLES.ENCARGADO === user?.rol
                  ? ROUTES_USER.ENCARGADO
                  : USER_ROLES.PRDUCCION === user?.rol
                  ? ROUTES_USER.PRDUCCION
                  : USER_ROLES.RECEPCION === user?.rol
                  ? ROUTES_USER.RECEPCION
                  : USER_ROLES.USUARIO_PRINCIPAL === user?.rol
                  ? ROUTES_USER.USUARIO_PRINCIPAL
                  : USER_ROLES.USUARIO_SUCURSAL === user?.rol
                  ? ROUTES_USER.USUARIO_SUCURSAL
                  : 'login'
              }/order/nuevaOrden`
            }}
            shallow
          >
            <Buton
              label={'Nueva orden'}
              icon={mas}
              icona={masw}
              action={() =>
                Router.push(
                  `/${
                    USER_ROLES.ADMIN === user?.rol
                      ? ROUTES_USER.ADMIN
                      : USER_ROLES.ENCARGADO === user?.rol
                      ? ROUTES_USER.ENCARGADO
                      : USER_ROLES.PRDUCCION === user?.rol
                      ? ROUTES_USER.PRDUCCION
                      : USER_ROLES.RECEPCION === user?.rol
                      ? ROUTES_USER.RECEPCION
                      : USER_ROLES.USUARIO_PRINCIPAL === user?.rol
                      ? ROUTES_USER.USUARIO_PRINCIPAL
                      : USER_ROLES.USUARIO_SUCURSAL === user?.rol
                      ? ROUTES_USER.USUARIO_SUCURSAL
                      : 'login'
                  }/orders/nuevaOrden`
                )
              }
              flag={menu}
              index={2}
            />
          </Link>

          <Buton
            label={'Buscar orden'}
            icon={buscarw}
            icona={buscar}
            action={() =>
              Router.push(
                `/${
                  USER_ROLES.ADMIN === user?.rol
                    ? ROUTES_USER.ADMIN
                    : USER_ROLES.ENCARGADO === user?.rol
                    ? ROUTES_USER.ENCARGADO
                    : USER_ROLES.PRDUCCION === user?.rol
                    ? ROUTES_USER.PRDUCCION
                    : USER_ROLES.RECEPCION === user?.rol
                    ? ROUTES_USER.RECEPCION
                    : USER_ROLES.USUARIO_PRINCIPAL === user?.rol
                    ? ROUTES_USER.USUARIO_PRINCIPAL
                    : USER_ROLES.USUARIO_SUCURSAL === user?.rol
                    ? ROUTES_USER.USUARIO_SUCURSAL
                    : 'login'
                }/orders/buscar`
              )
            }
            flag={menu}
            index={3}
          />
        </div>
      </div>
    </div>
  )
}

export default Menu
