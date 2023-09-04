/* eslint-disable no-unused-vars */
import Image from 'next/image'
import { useState } from 'react'
import Select from '../../../components/menu/signIn'
import verificador from '../../../assets/empresa/consulta/verificador.png'
import account from '../../../assets/empresa/consulta/account.svg'
import buscar from '../../../assets/empresa/consulta/search.svg'
import buscarw from '../../../assets/empresa/consulta/searchw.svg'
import Buton from '../../../components/buttons/buttonPrimaryInvert'
import Router from 'next/router'
import { selectUser } from '../../../redux/reducers/authReducer'
import { useSelector } from 'react-redux'
import { ROUTES_USER } from '../../../utils/verifications'
import { USER_ROLES } from '../../../utils/user-roles'
const Menu = ({
  menu = 3
}: {
  menu?: number
  setMenu: (e: number) => void
}) => {
  const [, setPrueba] = useState(true)
  const user = useSelector(selectUser)
  return (
    <div className=" bg-azulPrimary300 h-full w-[243px] fixed left-0 flex flex-col justify-between">
      <div className={` flex flex-col justify-center my-14 `}>
        <div className="mx-auto  ">
          <Image src={verificador} layout="fixed" className="mx-auto" alt="" />
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
        <span className="text-textSize5 text-azulPrimary900 mx-auto font-semibold my-5">
          Consultar órdenes
        </span>
        <div className="my-5 flex flex-col">
          <Buton
            label={'Verificar orden'}
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
                }/consulta`
              )
            }
            classNameText={'text-textSize7 mx-8'}
            className={'w-[203px] mx-auto rounded-lg bg-azulPrimary900'}
            flag={menu}
            index={3}
          />
        </div>
      </div>
    </div>
  )
}

export default Menu
