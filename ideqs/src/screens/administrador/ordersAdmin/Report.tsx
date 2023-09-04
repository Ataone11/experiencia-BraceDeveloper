import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../components/buttons/Button'
import Input from '../../../components/inputs/Input'
import Select from '../../../components/inputs/select'
import SelectN from '../../../components/inputs/SelectN'
import { getClientsData } from '../../../redux/actions/adminUserActions'
import { getInformes } from '../../../redux/actions/orderAdminActions'
import { getAllSucursales } from '../../../redux/actions/sucursalesActions'
import { getUsuarios } from '../../../redux/actions/usuariosActions'
import { getClients } from '../../../redux/reducers/adminUsersReducer'
import { selectUser } from '../../../redux/reducers/authReducer'
import { getSucursalState } from '../../../redux/reducers/sucursalReducer'
import { getUsuariosState } from '../../../redux/reducers/usuariosReducer'
import { USER_ROLES } from '../../../utils/user-roles'
import { ROUTES_USER } from '../../../utils/verifications'
import { BeatLoader } from 'react-spinners'
import InputReactSelect, {
  DataSelect
} from '../../../components/inputs/InputReactSelect'
export interface informesModel {
  nombreEmpresa?: string
  nombreSucursal?: string
  usuario?: string
  estado?: number
  orden?: number
  startDate?: string
  finalDate?: string
  page: number
}

export default function Reports() {
  interface BuscarType {
    id: number | string
    nombre: string
  }

  const dataSecure: BuscarType[] = [
    {
      id: 1,
      nombre: 'Pendiente'
    },
    {
      id: 2,
      nombre: 'Aceptadas'
    },
    {
      id: 3,
      nombre: 'Impresas'
    },
    {
      id: 4,
      nombre: 'Finalizadas'
    },
    {
      id: 5,
      nombre: 'Anuladas'
    }
  ]
  const router = useRouter()
  const sucursales = useSelector(getSucursalState)
  const usuarios = useSelector(getUsuariosState)
  const clientes = useSelector(getClients)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [loading, setLoading] = useState(false)
  const [dataRemision, setDataRemision] = useState<informesModel>({
    page: 1
  })
  const list: Array<DataSelect> = []
  usuarios?.forEach((data) => {
    const empresa = data.empresa

    const dataUser = (
      <div className="text-left">
        <div className="text-sm">{data.user}</div>
        <div className="text-xs">{data.empresa}</div>
      </div>
    )
    const select: DataSelect = {
      label: dataUser,
      value: data.user,
      value2: { empresa, user: data.user }
    }
    list.push(select)
  })
  useEffect(() => {
    getAllSucursales(dispatch)
    getUsuarios(dispatch, user?.idCliente, user?.rol)
    getClientsData(dispatch)
  }, [])
  const generarInformes = async () => {
    setLoading(true)
    await getInformes({ dispatch, body: dataRemision })
    router.push(
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
      }/orders/informe/params`,
      undefined,
      { shallow: true }
    )
  }
  const handleChange = (e: any) => {
    setDataRemision({ ...dataRemision, [e.target.name]: e.target.value })
  }

  return (
    <div className="mx-0 w-full xl:w-[80%] py-10 px-5">
      <span className="text-textSize2 font-extrabold text-azulPrimary900 pl-3">
        INFORMES
      </span>
      <section className="grid gap-[15px] md:grid-cols-2">
        <div className="flex flex-col md:gap-y-2 md:mx-3">
          <span className="text-textSize7 md:text-textSize6 font-bold text-black ">
            Empresa
          </span>
          <Select
            name={'nombreEmpresa'}
            label={''}
            className={' w-full h-[56px] rounded-md'}
            options={clientes}
            action={handleChange}
            choose={'Seleccione'}
          />
        </div>
        <div className="flex flex-col md:gap-y-2 md:mx-3">
          <span className="text-textSize7 md:text-textSize6 font-bold text-black ">
            Estado
          </span>
          <SelectN
            name={'estado'}
            label={''}
            className={' w-full h-[56px] rounded-md'}
            options={dataSecure}
            action={handleChange}
            choose={'Seleccione'}
          />
        </div>
        <div className="mx-3 my-3">
          <Input label="Nº Orden:" type="text" />
        </div>

        <div className="flex flex-col md:gap-y-2 md:mx-3">
          <span className="text-textSize7 md:text-textSize6 font-bold text-black ">
            Sucursal
          </span>
          <Select
            name={'nombreSucursal'}
            action={handleChange}
            label={''}
            className={' w-full h-[56px] rounded-md'}
            options={sucursales}
            choose={'Seleccione'}
          />
        </div>
        <div className="flex flex-col md:gap-y-2 md:mx-3">
          <span className="text-textSize7 md:text-textSize6 font-bold text-black ">
            Usuarios
          </span>
          <div className="">
            <InputReactSelect
              name={'usuario'}
              label={''}
              className={
                ' w-[372px] md:w-[718px] h-[36px] md:h-[56px] rounded-md'
              }
              action={({ value }) => {
                setDataRemision({ ...dataRemision, usuario: value })
              }}
              options={list}
              nameOptions={'user'}
              choose={'Usuarios'}
            />
          </div>
        </div>
        <section className="grid gap-[15px] md:grid-flow-col md:mx-3">
          <Input
            onChange={handleChange}
            name="startDate"
            label="Fecha inicio:"
            type="date"
          />
          <Input
            onChange={handleChange}
            name={'finalDate'}
            label="Fecha fin:"
            type="date"
          />
        </section>
      </section>
      {loading ? (
        <div className="mt-[15px] md:flex md:justify-end">
          <div className="w-[130px]  bg-azulPrimary900  rounded h-[45px]">
            <div className="flex w-fit mx-auto py-3 md:justify-end">
              <BeatLoader color={'white'} size={15} />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-[15px] md:flex md:justify-end">
          <section className="md:w-[130px]">
            <Button type="submit" onClick={generarInformes}>
              Generar informe
            </Button>
          </section>
        </div>
      )}
    </div>
  )
}
