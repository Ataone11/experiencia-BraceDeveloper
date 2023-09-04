import Link from 'next/link'
import { useRouter } from 'next/router'

const MenuMobile = ({ toggle, setToggle }: any) => {
  const router = useRouter()

  return (
    <div
    className={`w-full flex lg:hidden h-[100%] fixed ${
      toggle ? 'translate-x-full' : 'translate-x-0'
      } transition-all duration-300 ease-in-out top-0 z-30 left-0  bg-white/40 `}
    >
      <div className="bg-white w-[80%] h-[70%] rounded-md flex flex-col items-center justify-center m-auto shadow-2xl">
        <Link href="/">
          <a
            onClick={() => setToggle(true)}
            className={`text-base font-semibold transition-colors py-7  flex justify-center items-center w-full ${
              router.pathname === '/'
                ? 'text-redOmega'
                : 'text-blackOmega hover:text-redOmega transition-colors'
            } text-normal`}
          >
            Inicio
          </a>
        </Link>
        <hr className=" w-[90%]" />

        <Link href="/asesorias">
          <a
            onClick={() => setToggle(true)}
            className={`text-base font-semibold transition-colors py-7  flex justify-center items-center w-full ${
              router.pathname === '/asesorias'
                ? 'text-redOmega'
                : 'text-blackOmega hover:text-redOmega transition-colors'
            } text-normal`}
          >
            Asesorias
          </a>
        </Link>
        <hr className=" w-[90%]" />

        <Link href="/seguros">
          <a
            onClick={() => setToggle(true)}
            className={`text-base font-semibold transition-colors py-7  flex justify-center items-center w-full ${
              router.pathname === '/seguros'
                ? 'text-redOmega'
                : 'text-blackOmega hover:text-redOmega transition-colors'
            } text-normal`}
          >
            Seguros
          </a>
        </Link>
        <hr className=" w-[90%]" />

        <Link href="/nosotros">
          <a
            onClick={() => setToggle(true)}
            className={`text-base font-semibold transition-colors py-7  flex justify-center items-center w-full ${
              router.pathname === '/nosotros'
                ? 'text-redOmega'
                : 'text-blackOmega hover:text-redOmega transition-colors'
            } text-normal`}
          >
            Nosotros
          </a>
        </Link>
        <hr className=" w-[90%]" />

        <Link href="/ayuda">
          <a
            onClick={() => setToggle(true)}
            className={`text-base font-semibold transition-colors py-7  flex justify-center items-center w-full ${
              router.pathname === '/ayuda'
                ? 'text-redOmega'
                : 'text-blackOmega hover:text-redOmega transition-colors'
            } text-normal`}
          >
            Ayuda
          </a>
        </Link>
        <hr className=" w-[90%]" />

        <Link href="/contacto">
          <a
            onClick={() => setToggle(true)}
            className={`text-base font-semibold transition-colors py-7  flex justify-center items-center w-full ${
              router.pathname === '/contacto'
                ? 'text-redOmega'
                : 'text-blackOmega hover:text-redOmega transition-colors'
            } text-normal`}
          >
            Contacto
          </a>
        </Link>
      </div>
    </div>
  )
}

export default MenuMobile
