import Image from 'next/image'
import Link from 'next/link'
import logoOmega from '../assets/icons/omegaLogo.svg'
import menu from '../assets/icons/menuburger.svg'
import MenuMobile from './MenuMobile'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Navbar = () => {
  const [toggle, setToggle] = useState(true)
  const router = useRouter()

  return (
    <div className="bg-white  w-full py-3 sticky inset-0 m-auto shadow-lg flex px-5 z-[999]  items-center">
      <div className="flex w-full max-w-[1500px] mx-auto items-center">
        <div
          className="w-full relative z-40 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Image src={logoOmega} alt="Logo omega" width={150} />
        </div>
        <div className="lg:flex hidden justify-between w-full ">
          <Link href="/">
            <a
              className={`${
                router.pathname === '/'
                  ? ' text-redOmega font-semibold'
                  : 'text-blackOmega font-semibold hover:text-redOmega transition-colors'
              } text-normal`}
            >
              Inicio
            </a>
          </Link>
          <Link href="/seguros">
            <a
              className={`${
                router.pathname === '/seguros'
                  ? ' text-redOmega font-semibold'
                  : 'text-blackOmega font-semibold hover:text-redOmega transition-colors'
              } text-normal`}
            >
              Seguros
            </a>
          </Link>
          <Link href="/asesorias">
            <a
              className={`${
                router.pathname === '/asesorias'
                  ? ' text-redOmega font-semibold'
                  : 'text-blackOmega font-semibold hover:text-redOmega transition-colors'
              } text-normal`}
            >
              Asesorias
            </a>
          </Link>
          <Link href="/nosotros">
            <a
              className={`${
                router.pathname === '/nosotros'
                  ? ' text-redOmega font-semibold'
                  : 'text-blackOmega font-semibold hover:text-redOmega transition-colors'
              } text-normal`}
            >
              Nosotros
            </a>
          </Link>
          <Link href="/ayuda">
            <a
              className={`${
                router.pathname === '/ayuda'
                  ? ' text-redOmega font-semibold'
                  : 'text-blackOmega font-semibold hover:text-redOmega transition-colors'
              } text-normal`}
            >
              Ayuda
            </a>
          </Link>
          <Link href="/contacto">
            <a
              className={`${
                router.pathname === '/contacto'
                  ? ' text-redOmega font-semibold'
                  : 'text-blackOmega font-semibold hover:text-redOmega transition-colors'
              } text-normal`}
            >
              Contacto
            </a>
          </Link>
        </div>
        <div
          onClick={() => setToggle(!toggle)}
          className=" z-50 relative flex lg:hidden p-3 cursor-pointer hover:shadow-md transition-all duration-300 hover:shadow-redOmega/60 justify-center items-center rounded-full bg-redOmega"
        >
          <Image src={menu} alt="menu" />
        </div>
        <MenuMobile toggle={toggle} setToggle={setToggle} />
      </div>
    </div>
  )
}

export default Navbar
