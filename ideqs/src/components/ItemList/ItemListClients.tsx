import Image from 'next/image'
import Link from 'next/link'
import buscar from '../../../src/assets/administrador/orders/ingresar.png'
import cancel from '../../../src/assets/administrador/usuarios/deleteuser.svg'
import edit from '../../../src/assets/editw.svg'
import { UserDataModel } from '../../models/userDataModel'
import DeleteData from '../../screens/administrador/users/delete'
import { useState } from 'react'
import {
  DeleteDataClient,
  DeleteDataSucursal
} from '../../redux/actions/adminUserActions'
import { validUrl } from '../../utils/validUrl'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/reducers/authReducer'
import { USER_ROLES } from '../../utils/user-roles'

interface Type {
  users: UserDataModel
  sucursales?: UserDataModel | null
}

const ClientListElement = ({ users, sucursales }: Type) => {
  const [show, setShow] = useState(false)
  const user = useSelector(selectUser)
  return (
    <tr className="rounded-xl h-[48px] text-center">
      <td className="rounded-l-xl px-1">
        {users.nombre ? users.nombre : sucursales?.nombre || 'Sin nombre'}
      </td>
      <td className="px-1">
        {users.nit ? users.nit : sucursales?.nit || 'Sin NIT'}
      </td>
      <td className="px-1">
        {users.correo ? users.correo : sucursales?.correo || 'Sin Correo'}
      </td>
      <td className="px-1">
        {users.direccion
          ? users.direccion
          : sucursales?.direccion || 'Sin Dirrecion'}
      </td>
      <td className="px-1">
        {users.telefono
          ? users.telefono
          : sucursales?.telefono || 'Sin Telefono'}
      </td>
      <td className="rounded-r-xl justify-center items-center h-[48px] px-1">
        <div className="flex w-full h-full justify-center items-center">
          <Link
            href={{
              pathname: `/${validUrl(user?.rol)}/usuarios/cliente`,
              query: {
                idUser: sucursales ? sucursales.id : users?.id,
                sucursal: sucursales ? users.id : false
              }
            }}
            passHref
            shallow
          >
            <button
              title="search"
              className="flex bg-azulPrimary900 rounded-md h-[30px] w-[30px] justify-center items-center mr-2"
            >
              <Image src={buscar} height={20} width={20} alt="search" />
            </button>
          </Link>
          {user?.rol !== USER_ROLES.PRDUCCION && (
            <Link
              href={{
                pathname: `/${validUrl(user?.rol)}/usuarios/editar`,
                query: {
                  idUser: sucursales ? sucursales.id : users?.id,
                  Client: !sucursales,
                  sucursal: sucursales ? users.id : false
                }
              }}
              passHref
              shallow
            >
              <button
                title="edit"
                className="flex bg-azulPrimary900 rounded-md h-[30px] w-[30px] justify-center items-center mr-2"
              >
                <Image src={edit} alt="edit" />
              </button>
            </Link>
          )}

          {user?.rol !== USER_ROLES.PRDUCCION && (
            <button
              title="cancel"
              className="flex bg-azulPrimary900 rounded-md h-[30px] w-[30px] justify-center items-center"
              onClick={() => setShow(true)}
            >
              <Image src={cancel} alt="cancel" />
            </button>
          )}

          <DeleteData
            id={users ? users.id : sucursales?.id}
            show={show}
            setShow={setShow}
            DeleteData={sucursales ? DeleteDataSucursal : DeleteDataClient}
            message={true}
          ></DeleteData>
        </div>
      </td>
    </tr>
  )
}

export default ClientListElement
