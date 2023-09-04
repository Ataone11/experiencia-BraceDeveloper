import Buton from '../../../components/buttons/buttonPrimaryInvert'
import Image from 'next/image'
import { useState } from 'react'
import Select from '../../../components/menu/signIn'
import account from '../../../assets/administrador/orders/account.svg'
import plus from '../../../assets/administrador/usuarios/plusB.svg'
import plusW from '../../../assets/administrador/usuarios/plusW.svg'
import user from '../../../assets/administrador/usuarios/userB.svg'
import userw from '../../../assets/administrador/usuarios/userW.svg'
import cross from '../../../assets/administrador/usuarios/cross.svg'
import menu from '../../../assets/administrador/usuarios/menu.svg'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { text } from './text/menu'
import HomeButton from '../../../components/buttons/homeButton'

const Menu = () => {
  const router = useRouter()
  const [menuClassName, setMenuClassName] = useState('w-0')

  const activateMenu = () => {
    setMenuClassName('w-[240px]')
  }

  const inactivateMenu = () => {
    setMenuClassName('w-0')
  }

  return (
    <>
      <div className="fixed justify-between lg:hidden lg:h-0 bg-[#D8F0FF] w-screen h-[60px]">
        <div className="ml-[5px] mt-[5px] w-[56px]" onClick={activateMenu}>
          <Image src={menu} alt="" />
        </div>
        <div></div>
        <div></div>
      </div>
      <div className="fixed lg:sticky top-0">
        <div
          className={
            ' lg:bg-azulPrimary300 lg:px-5 lg:pt-[50px] bg-[#F6FAFF] h-screen lg:w-[243px] relative left-0 flex flex-col justify-between transition-[width] overflow-hidden ' +
            menuClassName
          }
        >
          <div className={` lg:my-10 flex flex-col justify-center  `}>
            <div className="mx-auto  lg:block hidden">
              {/* <Image src={userIcon} layout="fixed" className="mx-auto" alt="" /> */}
            </div>
            <div className=" text-azulPrimary700 text-textSize7 gap-3 items-start mx-auto hidden lg:flex">
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
                choose={'Natally Gómez'}
                className={
                  'text-textSize6 w-[160px] h-[46px] border-azulPrimary300 bg-azulPrimary300 '
                }
              />
            </div>
            <span className="text-textSize5 text-azulPrimary900 mx-auto font-bold my-5 hidden lg:inline">
              {text.title.es}
            </span>
            <div
              className="relative lg:hidden w-[56px] h-[56px] m-[5px]"
              onClick={inactivateMenu}
            >
              <Image src={cross} layout="fill" alt="" />
            </div>
            <div className="lg:my-10 px-5 lg:px-0 my-[20px] flex flex-col">
              <Link
                href={{
                  pathname: '/administrador/usuarios'
                }}
                shallow
              >
                <a>
                  <Buton
                    secondColor={''}
                    label={text.opcionUsers.es}
                    icon={userw}
                    icona={user}
                    flag={router.pathname}
                    index={'/administrador/usuarios'}
                  />
                </a>
              </Link>
              <Link
                href={{
                  pathname: '/administrador/usuarios/crear'
                }}
                shallow
              >
                <a>
                  <Buton
                    secondColor={''}
                    label={text.opcionCreate.es}
                    icon={plusW}
                    icona={plus}
                    flag={router.pathname}
                    index={'/administrador/usuarios/crear'}
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="flex justify-center mb-[40px] lg:hidden">
            <HomeButton></HomeButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
