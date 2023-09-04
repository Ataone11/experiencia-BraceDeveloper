import Image from 'next/image'
import { useRouter } from 'next/router'
import User from '../../assets/general/User'
import Link from 'next/link'
import HomeIcon from '../../assets/general/HomeIcon'
import { useState } from 'react'
import Arrow from '../../assets/general/Arrow'
import { signOutWithAmazon } from '../../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../redux/reducers/authReducer'
import { validUrl } from '../../utils/validUrl'

export default function Sidebar({
  isOpen,
  data
}: {
  isOpen: boolean
  data: any
}) {
  const user = useSelector(selectUser)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [signOut, setSignOut] = useState(false)
  const router = useRouter() as any
  const dispatch = useDispatch()

  const signOutAuth = async () => {
    await signOutWithAmazon(dispatch)
    if (router.pathname.includes('consultar'))
      router.push('/consultar', undefined, { shallow: true })
    else await router.push('/login', undefined, { shallow: true })
  }
  return (
    <aside
      className={`bg-white overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-azulPrimary500 lg:bg-azulPrimary300 h-[calc(100vh-90px)] md:h-[calc(100vh-125px)] lg:h-[calc(100vh-65px)] md:bottom-[65px] z-40 bottom-[30px] lg:bottom-[65px] fixed w-[243px] flex flex-col items-center py-[20px] md:py-[57px] px-[20px] gap-[30px] transition ease-in-out duration-300 ${
        isOpen
          ? 'translate-x-0  lg:translate-x-0'
          : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="flex flex-col items-center gap-[30px]">
        <section className="hidden lg:block">
          <Image
            src={data.image.src}
            width={data.image.width}
            height={data.image.height}
            alt="Imagen del sidebar"
            className="w-[67px] h-[70px] "
          />
        </section>
        <div className="flex-col items-center hidden lg:flex">
          <section
            className="flex gap-[18px] items-center cursor-pointer text-azulPrimary900"
            onClick={() => setSignOut(!signOut)}
          >
            <User />
            <span className="truncate w-32">
              {user ? `${user?.name} ${user?.lastname}` : 'Consultar'}
            </span>
            <Arrow />
          </section>
          {signOut && (
            <section
              className="flex gap-[18px] items-center cursor-pointer text-azulPrimary900"
              onClick={signOutAuth}
            >
              <span className="text-transparent">
                <User />
              </span>
              <span>Cerrar sesión</span>
              <span className="text-transparent">
                <Arrow />
              </span>
            </section>
          )}
        </div>
        <h2 className="text-textSize5 font-semibold text-azulPrimary900 hidden lg:block">
          {data.module}
        </h2>
        <section className="flex flex-col gap-[4px] w-[250px]">
          {data.buttons.map(
            ({ Icon, text, action, route, orders }: any, index: string) => {
              const newRoute = `/${validUrl(user?.rol)}${route}`
              return (
                <>
                  <Link
                    legacyBehavior
                    href={`/${validUrl(user?.rol)}/${route}`}
                    key={index}
                    shallow
                  >
                    <a
                      onClick={() => {
                        action()
                        orders && setMenuIsOpen(!menuIsOpen)
                      }}
                      className={`${
                        router.pathname === newRoute
                          ? 'bg-azulPrimary900 text-white'
                          : 'bg-transparent text-azulPrimary900'
                      } grid grid-cols-3 place-items-center place-content-center gap-10 mx-auto w-[90%] h-[50px] rounded-[10px]`}
                    >
                      <span className="flex justify-end w-fit pl-10">
                        <Icon />
                      </span>
                      <span className="text-textSize7 font-semibold col-span-2 flex justify-start w-full">
                        {text}
                      </span>
                    </a>
                  </Link>
                  {orders &&
                    menuIsOpen &&
                    orders.map((order: any) => (
                      <MenuHamburger
                        key={order.text}
                        text={order.text}
                        route={order.route}
                        color={order.color}
                        pathname={router.pathname}
                        isActive={parseInt(router.query.estado) === order.route}
                      />
                    ))}
                </>
              )
            }
          )}
        </section>
        <Link href={`/${router.pathname.split('/')[1]}`} shallow replace>
          <a className="bg-azulPrimary900 rounded-full w-[50px] h-[50px] grid place-content-center absolute bottom-[18px] lg:hidden">
            <HomeIcon />
          </a>
        </Link>
      </div>
    </aside>
  )
}

const MenuHamburger = ({
  text,
  route,
  color,
  pathname,
  isActive
}: {
  pathname: string
  route: string
  color: string
  text: string
  isActive?: boolean
}) => {
  return (
    <Link
      href={{
        pathname,
        query: isActive ? undefined : { estado: route }
      }}
      shallow
    >
      <a
        // onClick={action}
        className={`${
          isActive
            ? 'bg-azulPrimary900 text-white'
            : 'bg-transparent text-azulPrimary900'
        } grid grid-cols-3 place-items-center place-content-center w-[100%] h-[50px] rounded-[10px]`}
      >
        <span className={`${color} flex justify-end w-[12px] h-[12px]`} />
        <span className="text-textSize7 font-semibold col-span-2 flex justify-start w-full">
          {text}
        </span>
      </a>
    </Link>
  )
}
