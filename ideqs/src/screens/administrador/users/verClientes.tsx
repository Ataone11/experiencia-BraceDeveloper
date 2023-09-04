/* eslint-disable no-unused-vars */
import User from '../../../assets/administrador/usuarios/user.svg'
import Box from '../../../components/box/userBox'
import Button from '../../../components/buttons/primaryButton'
import caraSeria from '../../../assets/general/cara.svg'
import edit from '../../../assets/editw.svg'
import cancel from '../../../assets/administrador/usuarios/cancel.svg'
import { CSSProperties, useEffect, useState } from 'react'
import { text } from './text/userData'
import { useDispatch, useSelector } from 'react-redux'
import {
  getClient,
  getSucursal
} from '../../../redux/reducers/adminUserReducer'
import {
  DeleteDataClient,
  getDataClient,
  getDataSucursal
} from '../../../redux/actions/adminUserActions'
import { useRouter } from 'next/router'
import { UserDataModel } from '../../../models/userDataModel'
import { MoonLoader, PuffLoader } from 'react-spinners'
import perfil from '../../../assets/administrador/usuarios/profile.svg'
import Image from 'next/image'
import List from './lista'
import {
  getSucursalesOfClients,
  getUsersOfClients
} from '../../../redux/reducers/adminUsersReducer'
import {
  getDataSucursales,
  getDataUsersOfRol
} from '../../../redux/actions/adminUsersActions'
import { Sucursal } from '../../../models/sucursalModel'
import DeleteData from './delete'
import Manejador from '../usuarios/manejador'
import Cargar from '../usuarios/cargarPlantilla'
import admin from '../../../assets/administrador/usuarios/admin.svg'
import branch from '../../../assets/administrador/usuarios/Location.svg'
import adminW from '../../../assets/administrador/usuarios/adminW.svg'
import branchW from '../../../assets/administrador/usuarios/LocationW.svg'
import { decodeImageBase64 } from '../../../functions/DecodeBase64'
import SucursalList from './listarSucursales'
import { USER_ROLES } from '../../../utils/user-roles'
import { selectUser } from '../../../redux/reducers/authReducer'
export interface DigitalType {
  user: UserDataModel | null
  setShow?: any
  sucursal?: Sucursal | null
}

const Digital = ({ user, setShow, sucursal }: DigitalType) => {
  const router = useRouter()
  const [src, setSrc] = useState(perfil)
  const usuario = useSelector(selectUser)
  useEffect(() => {
    setSrc('data:image/*;base64,' + user?.logo?.slice(20))
  }, [user])

  return (
    <div className="lg:w-full lg:max-w-[805px] w-[288px] overflow-hidden lg:pt-[60px] py-[20px] lg:pb-[25px] lg:px-[65px] px-[45px]">
      <div className="lg:flex block lg:justify-between justify-center lg:mb-[45px] mb-[15px]">
        <div className="lg:hidden flex justify-center">
          <div
            className={` bg-cover bg-no-repeat w-[130px] lg:h-[224px] h-[130px] border-[3px] border-[#D9D9D9] rounded-[10px] overflow-hidden lg:mb-[33px] mb-[20px] relative `}
          >
            <Image
              src={decodeImageBase64(src)}
              width={200}
              height={200}
              alt="iden"
            />
            <Image
              alt="Perfil"
              src={src}
              quality={100}
              layout="fill"
              style={{
                objectFit: 'cover'
              }}
              onError={() => setSrc(perfil)}
            />
          </div>
        </div>
        <div className="lg:w-[300px] grid grid-cols-2 lg:gap-x-5 lg:gap-y-[14px] gap-5 mb-5 lg:mb-0 lg:text-[16px] text-[13px]">
          <h5 className="w-[104px] text-grisNeutral300 font-bold">
            {text.nit.es}:
          </h5>
          <p className="lg:w-[290px] w-[105px] text-ellipsis whitespace-nowrap overflow-hidden ">
            {user?.nit}
          </p>
          <h5 className="w-[104px] text-grisNeutral300 font-bold">
            {text.name.es}:
          </h5>
          <p
            className="lg:w-[290px] w-[105px] text-ellipsis whitespace-nowrap overflow-hidden "
            title={sucursal ? sucursal.nombre : user?.nombre}
          >
            {sucursal ? sucursal.nombre : user?.nombre}
          </p>
          <h5 className="w-[104px] text-grisNeutral300 font-bold">
            {text.address.es}:
          </h5>
          <p
            className="lg:w-[290px] w-[105px] text-ellipsis whitespace-nowrap overflow-hidden "
            title={user?.direccion}
          >
            {user?.direccion}
          </p>
          <h5 className="w-[104px] text-grisNeutral300 font-bold">
            {text.email.es}:
          </h5>
          <p
            className="lg:w-[290px] w-[105px] text-ellipsis whitespace-nowrap overflow-hidden "
            title={user?.correo}
          >
            {user?.correo}
          </p>
          <h5 className="w-[104px] text-grisNeutral300 font-bold">
            {text.telphone.es}:
          </h5>
          <p
            className="lg:w-[290px] w-[105px] text-ellipsis whitespace-nowrap overflow-hidden "
            title={user?.telefono}
          >
            {user?.telefono}
          </p>
        </div>
        <div className="flex justify-center items-center lg:w-[240px]">
          <div
            className={`lg:block hidden bg-cover bg-no-repeat w-[162px] h-[162px] border-[3px] border-[#D9D9D9] rounded-[10px] overflow-hidden relative `}
          >
            <Image
              alt="Perfil"
              src={src}
              quality={100}
              layout={'fill'}
              style={{
                objectFit: 'cover'
              }}
              onError={() => setSrc(perfil)}
            />
          </div>
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

const ClientData = () => {
  enum TypeList {
    users = 'users',
    branchs = 'branchs',
    managers = 'managers'
  }
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(getClient)
  const users = useSelector(getUsersOfClients)
  const sucursales = useSelector(getSucursalesOfClients)
  const sucursal = useSelector(getSucursal)
  const [select, setSelect] = useState<TypeList>(TypeList.users)
  const [show, setShow] = useState(false)
  const [loader, setLoader] = useState(true)
  const [load, setLoad] = useState(false)
  const [manejador, setManejador] = useState(false)
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }
  useEffect(() => {
    setLoader(true)
    getDataUsersOfRol(dispatch, router.query.idUser, 6)
    getDataSucursales(dispatch, router.query.idUser)
    if (router.query.sucursal) {
      getDataClient(dispatch, router.query.idUser)
      getDataSucursal(dispatch, router.query.sucursal, setLoader)
    } else getDataClient(dispatch, router.query.idUser, setLoader)
  }, [router.query.idUser, router.query.sucursal])

  return (
    <>
      {loader && (
        <div className="flex min-h-[75vh] justify-center items-center">
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
        <>
          <Box
            title={text.subtitle.es}
            icon={User}
            label={
              <Digital
                user={user}
                sucursal={router.query.sucursal === 'false' ? null : sucursal}
                setShow={setShow}
              />
            }
            className={'lg:w-full lg:max-w-[805px] w-fit mx-auto mb-[80px]'}
          ></Box>

          <div className="w-fit mx-auto">
            <Manejador action={() => setManejador(true)} />
            {manejador && <Cargar />}
          </div>
          <DeleteData
            id={user?.id}
            show={show}
            setShow={setShow}
            DeleteData={DeleteDataClient}
          ></DeleteData>
          <div className="flex lg:mb-5 mb-3">
            <div
              className={
                'flex items-center w-fit h-fit lg:px-9 lg:py-3 px-2 py-1 cursor-pointer lg:text-[16px] text-[10px] rounded-xl mr-[16px] ' +
                (select === 'users'
                  ? 'bg-azulPrimary700 text-white'
                  : 'bg-[#D8F0FF66] text-azulSecondary900')
              }
              onClick={async () => {
                setLoad(true)
                await getDataUsersOfRol(dispatch, router.query.idUser, 6)
                setSelect(TypeList.users)
                setLoad(false)
              }}
            >
              <div className="mr-2 relative lg:w-4 lg:h-4 w-2 h-2">
                <Image
                  src={select === 'users' ? adminW : admin}
                  alt="cancel"
                  layout={'fill'}
                />
              </div>
              <span>Usuarios principales</span>
            </div>
            <div
              className={
                'flex items-center w-fit h-fit lg:px-9 lg:py-3 px-2 py-1 cursor-pointer lg:text-[16px] text-[10px] rounded-xl mr-[16px] ' +
                (select === 'managers'
                  ? 'bg-azulPrimary700 text-white'
                  : 'bg-[#D8F0FF66] text-azulSecondary900')
              }
              onClick={async () => {
                setLoad(true)
                await getDataUsersOfRol(dispatch, router.query.idUser, 4)
                setSelect(TypeList.managers)
                setLoad(false)
              }}
            >
              <div className="mr-2 relative lg:w-4 lg:h-4 w-2 h-2">
                <Image
                  src={select === 'managers' ? adminW : admin}
                  alt="cancel"
                  layout={'fill'}
                />
              </div>
              <span>Encargados</span>
            </div>
            <div
              className={
                'flex items-center w-fit h-fit lg:px-9 lg:py-3 px-2 py-1 cursor-pointer lg:text-[16px] text-[10px] rounded-xl ' +
                (select === 'branchs'
                  ? 'bg-azulPrimary700 text-white'
                  : 'bg-[#D8F0FF66] text-azulSecondary900')
              }
              onClick={async () => {
                setLoad(true)
                await setSelect(TypeList.branchs)
                setLoad(false)
              }}
            >
              <div className="mr-2 relative lg:w-5 lg:h-5 w-2.5 h-2.5">
                <Image
                  src={select === 'branchs' ? branchW : branch}
                  alt="cancel"
                  layout={'fill'}
                />
              </div>
              <span>Sucursales</span>
            </div>
          </div>
          {load && (
            <div className="flex justify-center mx-auto  items-center h-[50%]">
              <MoonLoader color="#425AC5" />
            </div>
          )}
          {select === 'users' &&
            !load &&
            (users?.length === 0 ? (
              <div className="mx-auto flex flex-col justify-center w-[220px] my-20">
                <Image src={caraSeria} alt="" className="" />
                <span className=" text-textSize5 my-5 text-center text-gray-400 w-[220px]">
                  Lo siento, no hay usuarios principales
                </span>
              </div>
            ) : (
              <div className="lg:mb-[100px] mb-[20px]">
                <List
                  subtitle={text.subtitleUsers.es}
                  rols={[1, 2, 3]}
                  users={users}
                ></List>
              </div>
            ))}
          {select === 'managers' &&
            !load &&
            (users?.length === 0 ? (
              <div className="mx-auto flex flex-col justify-center container w-[220px] my-20">
                <Image src={caraSeria} alt="" className="" />
                <span className=" text-textSize5 my-5 text-center justify-center text-gray-400 w-[220px]">
                  Lo siento, no hay encargados en la lista
                </span>
              </div>
            ) : (
              <div className="lg:mb-[100px] mb-[20px]">
                <List
                  subtitle={text.subtitleUsers.es}
                  rols={[1, 2, 3]}
                  users={users}
                ></List>
              </div>
            ))}
          {select === 'branchs' &&
            !load &&
            (sucursales?.length === 0 ? (
              <div className="mx-auto flex flex-col justify-center container w-[220px] my-20">
                <Image src={caraSeria} alt="" className="" />
                <span className=" text-textSize5 my-5 text-center text-gray-400 w-[220px]">
                  Lo siento, no hay sucursales en la lista
                </span>
              </div>
            ) : (
              <div>
                <SucursalList
                  subtitle={text.subtitleBranch.es}
                  users={sucursales}
                  sucursales={user}
                ></SucursalList>
              </div>
            ))}
        </>
      )}
      <div className="h-[100px]"></div>
    </>
  )
}

export default ClientData
