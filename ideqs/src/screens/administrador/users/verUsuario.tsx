import User from '../../../assets/administrador/usuarios/user.svg'
import Box from '../../../components/box/userBox'
import Button from '../../../components/buttons/primaryButton'
import edit from '../../../assets/editw.svg'
import cancel from '../../../assets/administrador/usuarios/cancel.svg'
import { CSSProperties, useEffect, useState } from 'react'
import { text } from './text/userData'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../redux/reducers/adminUserReducer'
import {
  DeleteDataUser,
  getDataUser
} from '../../../redux/actions/adminUserActions'
import { useRouter } from 'next/router'
import { account } from './text/account'
import { UserDataModel } from '../../../models/userDataModel'
import { PuffLoader } from 'react-spinners'
import DeleteData from './delete'
import { selectUser } from '../../../redux/reducers/authReducer'
import Services from '../usuarios/servicios'
import { USER_ROLES } from '../../../utils/user-roles'

export interface DigitalType {
  user: UserDataModel | null
  setShow?: any
}

const Digital = ({ user, setShow }: DigitalType) => {
  const router = useRouter()
  const usuario = useSelector(selectUser)
  return (
    <div className="lg:pt-[30px] w-[288px] lg:h-[370px] lg:w-auto py-[20px] lg:pb-[45px] lg:px-[65px] px-[40px]">
      <div className="lg:flex block lg:justify-between justify-center lg:mb-[75px]">
        <div className="lg:w-[300px] grid grid-cols-2 lg:gap-x-5 lg:gap-y-[16px] gap-5 mb-5 lg:mb-0 lg:text-[16px] text-[13px]">
          {user?.rol && (
            <h5 className="w-[104px] text-grisNeutral300 font-bold">
              {text.user.es}:
            </h5>
          )}
          {user?.rol && (
            <p
              className="lg:w-[150px] w-[104px] text-ellipsis whitespace-nowrap overflow-hidden "
              title={user?.user}
            >
              {user?.user}
            </p>
          )}
          {user?.rol && (
            <h5 className="w-[104px] text-grisNeutral300 font-bold">
              {text.name.es}:
            </h5>
          )}
          {user?.rol && (
            <p
              className="lg:w-[150px] w-[104px] text-ellipsis whitespace-nowrap overflow-hidden "
              title={user?.user}
            >
              {user?.name}
            </p>
          )}
          {user?.rol && (
            <h5 className="w-[104px] text-grisNeutral300 font-bold">
              {text.lastName.es}:
            </h5>
          )}
          {user?.rol && (
            <p
              className="lg:w-[150px] w-[104px] text-ellipsis whitespace-nowrap overflow-hidden "
              title={user?.lastname}
            >
              {user?.lastname}
            </p>
          )}
          {user?.rol && (
            <h5 className="w-[104px] text-grisNeutral300 font-bold">
              {text.email.es}:
            </h5>
          )}
          {user?.rol && (
            <p
              className="lg:w-[150px] w-[104px] text-ellipsis whitespace-nowrap overflow-hidden "
              title={user?.correo}
            >
              {user?.correo}
            </p>
          )}
          {user?.rol && (
            <h5 className="w-[104px] text-grisNeutral300 font-bold">
              {text.password.es}:
            </h5>
          )}
          <p>**********</p>
          {user?.rol && (
            <h5 className="w-[104px] text-grisNeutral300 font-bold">
              {text.acount.es}:
            </h5>
          )}
          {user?.rol && (
            <p
              className="lg:w-[150px] w-[104px] text-ellipsis whitespace-nowrap overflow-hidden "
              title={account.find((rol) => rol.value === user?.rol)?.name}
            >
              {account.find((rol) => rol.value === user?.rol)?.name}
            </p>
          )}
          {user?.rol && (
            <h5 className="w-[104px] text-grisNeutral300 font-bold">
              {text.state.es}:
            </h5>
          )}
          {user?.rol && (
            <p
              className="lg:w-[150px] w-[104px] text-ellipsis whitespace-nowrap overflow-hidden "
              title={user?.activo === 1 ? 'Activo' : 'Inactivo'}
            >
              {user?.activo === 1 ? 'Activo' : 'Inactivo'}
            </p>
          )}
          {user?.rol && (
            <h5 className="w-[104px] text-grisNeutral300 font-bold">
              {text.id.es}:
            </h5>
          )}
          {user?.rol && (
            <p className="lg:w-[150px] w-[104px] text-ellipsis whitespace-nowrap overflow-hidden ">
              {user?.id}
            </p>
          )}
        </div>
      </div>
      {usuario?.rol !== USER_ROLES.PRDUCCION && (
        <div className="flex justify-center">
          <Button
            color="bg-azulPrimary700 mr-[20px] lg:mr-[30px] w-[91px] h-10 justify-between mt-0"
            label={text.editButton.es}
            icon={edit}
            classNameText="text-[10px] "
            link={{
              pathname: '/administrador/usuarios/editar',
              query: { idUser: router.query.idUser }
            }}
          ></Button>

          <Button
            color="bg-azulPrimary700 w-[105px] h-10 justify-between mt-0"
            label={text.deleteButton.es}
            icon={cancel}
            classNameText="text-[10px]"
            action={() => setShow(true)}
          ></Button>
        </div>
      )}
    </div>
  )
}

const UserData = () => {
  const user = useSelector(getUser)
  const selectedUser = useSelector(selectUser)
  const [loader, setLoader] = useState(true)
  const [show, setShow] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }

  useEffect(() => {
    setLoader(true)
    if (router.query.idUser) {
      getDataUser(dispatch, router.query.idUser, setLoader)
    } else setLoader(false)
  }, [])

  return (
    <div className="flex justify-center">
      {loader && (
        <div className="flex h-[60vh] justify-center items-center">
          <PuffLoader
            color="#086eae"
            loading={loader}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {!loader && (
        <div className="lg:w-[805px] w-[288px]">
          <Box
            title={text.subtitle.es}
            icon={User}
            label={<Digital user={user || selectedUser} setShow={setShow} />}
            className={'w-fit mx-auto mb-[160px]'}
          />
          <Services user={user || selectedUser} />
          <DeleteData
            id={user?.id}
            show={show}
            setShow={setShow}
            DeleteData={DeleteDataUser}
          ></DeleteData>
        </div>
      )}
    </div>
  )
}

export default UserData
