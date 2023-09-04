import Image from 'next/image'
import { useState } from 'react'
import Select from '../../../components/menu/signIn'
import tablet from '../../../assets/administrador/remision/tablet.png'
import sincara from '../../../assets/administrador/remision/sincara.png'
import account from '../../../assets/administrador/remision/account.svg'
import menua from '../../../assets/administrador/remision/Hamburguer menu.svg'
import menuw from '../../../assets/administrador/remision/menuw.svg'
import buscar from '../../../assets/administrador/remision/search.svg'
import masw from '../../../assets/administrador/remision/icon.svg'
import mas from '../../../assets/administrador/remision/+.svg'
import buscarw from '../../../assets/administrador/remision/searchw.svg'

import Buton from '../../../components/buttons/buttonPrimaryInvert'

const Menu = ({
  menu,
  setMenu
}: {
  menu: number
  setMenu: (e: number) => void
}) => {
  const [, setPrueba] = useState(true)

  return (
    <div className=" bg-azulPrimary300 h-full w-[243px] fixed left-0 flex flex-col justify-between">
      <div className={` my-10 flex flex-col justify-center  `}>
        <div className="mx-auto  ">
          {menu === 2 && (
            <Image src={tablet} layout="fixed" className="mx-auto" alt="" />
          )}
          {menu !== 2 && (
            <Image src={sincara} layout="fixed" className="mx-auto" alt="" />
          )}
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
            className={
              'text-textSize6 w-[160px] h-[46px] border-azulPrimary300 bg-azulPrimary300 '
            }
            action={() => setPrueba(false)}
          />
        </div>
        <span className="text-textSize5 text-azulPrimary900 mx-auto font-bold my-5">
          Mis remisiones
        </span>
        <div className="my-10 flex flex-col">
          <Buton
            label={'Mis remisiones'}
            icon={menuw}
            icona={menua}
            action={() => setMenu(1)}
            flag={menu}
            index={1}
          />

          <Buton
            label={'Nueva remisión'}
            icon={mas}
            icona={masw}
            action={() => setMenu(2)}
            flag={menu}
            index={2}
          />

          <Buton
            label={'Buscar remisión'}
            icon={buscarw}
            icona={buscar}
            action={() => setMenu(3)}
            flag={menu}
            index={3}
          />
        </div>
      </div>
    </div>
  )
}

export default Menu
