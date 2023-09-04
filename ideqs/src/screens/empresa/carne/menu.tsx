/* eslint-disable no-unused-vars */
import Image from 'next/image'
import { useState } from 'react'
import Select from '../../../components/menu/signIn'
import pdf from '../../../assets/empresa/carne/pdfcarne.png'
import account from '../../../assets/empresa/carne/account.svg'
import identificación from '../../../assets/empresa/carne/identificación.svg'
import identificaciónw from '../../../assets/empresa/carne/identificaciónw.svg'
import folderw from '../../../assets/empresa/carne/folderw.svg'
import folder from '../../../assets/empresa/carne/folder.svg'

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
      <div className={` my-10 flex flex-col justify-center  pt-5`}>
        <div className="mx-auto  ">
          <Image src={pdf} layout="fixed" className="mx-auto" alt="" />
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
        <span className="text-textSize5 text-azulPrimary900 mx-auto font-extrabold my-5 pt-4">
          Carné PDF
        </span>
        <div className="my-10 flex flex-col gap-y-2 mx-auto">
          <Buton
            label={'Carnés PDF'}
            icon={identificaciónw}
            icona={identificación}
            action={() => setMenu(1)}
            className={'w-[203px]'}
            flag={menu}
            index={1}
          />

          <Buton
            label={'Formatos'}
            icon={folderw}
            icona={folder}
            action={() => setMenu(2)}
            className={'w-[203px]'}
            flag={menu}
            index={2}
          />
        </div>
      </div>
    </div>
  )
}

export default Menu
