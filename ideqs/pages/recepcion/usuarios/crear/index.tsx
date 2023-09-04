import React, { NextPage } from 'next'
import CreateUser from '../../../../src/screens/administrador/users/usuarioIdqs'
import CreateEmpresas from '../../../../src/screens/administrador/users/crearEmpresas'
import Select from '../../../../src/components/inputs/tiposUsuario'
import { dataSidebar } from '../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../src/utils/enums'
import Layout from '../../../../src/screens/formatos/Layout'
import { useEffect, useState } from 'react'
import Sucursal from '../../../../src/screens/administrador/users/sucursal'
import { toast } from 'react-toastify'
import { UserDataModel } from '../../../../src/models/userDataModel'
import {
  CreateDataUser,
  getClientsData,
  getSucursalesClient
} from '../../../../src/redux/actions/adminUserActions'
import { useDispatch, useSelector } from 'react-redux'
import { toBase64 } from '../../../../src/utils/base64'
import {
  getClients,
  getSucursales
} from '../../../../src/redux/reducers/adminUserReducer'
export interface Props {
  title?: string
  id: number
  value?: number
}

const dataSecure: Props[] = [
  {
    id: 1,
    title: 'Usuario IDEQS'
  },
  {
    id: 2,
    title: 'Usuario Cliente'
  }
]

const data: Props[] = [
  {
    id: 1,
    title: 'Administrador'
  },
  {
    id: 2,
    title: 'Produccion'
  },
  {
    id: 3,
    title: 'Recepcion'
  }
]
const dataCliente: Props[] = [
  {
    id: 70,
    title: 'Empresas'
  },
  {
    id: 80,
    title: 'Sucursal'
  },
  {
    id: 6,
    title: 'Usuario Principal'
  },
  {
    id: 5,
    title: 'Usuario sucursal'
  },
  {
    id: 4,
    title: 'Encargado'
  }
  // {
  //   id: 40,
  //   title: 'Asignar sucursal a encargado'
  // }
]
interface Usuario {
  tipoUsuario?: string
  rol?: string
}
const Create: NextPage = () => {
  const [, setCreateLoader] = useState(false)
  const [usuario, setUsuario] = useState<Usuario>({})
  const [file, setFile] = useState<File | null>(null)
  const dispatch = useDispatch()
  // const sucursales = useSelector(getSucursalState)
  const [user, setUser] = useState<UserDataModel>({
    rol: 1,
    idSucursal: 1,
    activo: 1,
    pdf: 1,
    physical: 1,
    mobile: 0
  })

  const sucursales = useSelector((state: any) =>
    getSucursales(state, user.idCliente ?? 0)
  )

  const clients = useSelector(getClients)

  // useEffect(() => {
  //   getAllSucursales(dispatch)
  // }, [])

  useEffect(() => {
    if (!sucursales && user.idCliente) {
      getSucursalesClient(user.idCliente, dispatch)
    }
  }, [user])

  useEffect(() => {
    if (
      user?.rol === 80 ||
      user?.rol === 4 ||
      user?.rol === 5 ||
      user?.rol === 6
    ) {
      if (!clients) {
        getClientsData(dispatch)
      }
    }
  }, [user?.rol])

  const handleChange = (e: any) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value })
  }
  const changeInputs = (event: any) => {
    if (event.target.name === 'rol') {
      setUser({
        rol: parseInt(event.target.value),
        idSucursal: 1
      })
    } else if (event.target.type === 'file') {
      setUser({ ...user, [event.target.name]: event.target.files[0] })
    } else {
      if (event.target.name === 'activo') {
        setUser({ ...user, [event.target.name]: parseInt(event.target.value) })
      } else setUser({ ...user, [event.target.name]: event.target.value })
    }
  }
  const onUpload = async (file: File | null) => {
    setFile(file)
    if (!file) return
    const logo = (await toBase64(file)) as string
    const nombreLogo = file.name ?? ''
    setUser((user) => ({ ...user, logo, nombreLogo }))
  }
  const createUser = async () => {
    setCreateLoader(true)
    const response = await CreateDataUser(user)

    setCreateLoader(false)
    if (response.statusCode === 200) {
      toast.success('El usuario fue creado correctamente')

      setUser({
        rol: 1,
        idSucursal: 1,
        activo: 1,
        pdf: 1,
        physical: 1,
        mobile: 0
      })
    }

    if (response.statusCode === 400)
      toast.error(
        response.idAWS?.error !== undefined
          ? response.idAWS?.error
          : 'El usuario no pudo ser creado'
      )
  }

  const sucursalList = sucursales
    ? sucursales.map((sucursal) => {
        return {
          id: sucursal.id,
          title: sucursal.nombre
        }
      })
    : []

  return (
    <Layout
      titleSection="CREAR CUENTA"
      titleBasePage="Usuarios"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.USUARIOS]}
    >
      <form onSubmit={createUser} onChange={changeInputs}>
        <div className=" grid grid-cols-1 xl:grid-cols-2 text-azulPrimary900 text-textSize5 lg:gap-x-80 items-start w-full lg:w-[74%] ">
          <Select
            name={'tipoUsuario'}
            label={'Tipo de usuario'}
            dataSecure={dataSecure}
            className={
              'text-textSize5 w-[90%] sm:w-[400px] lg:w-[453px] h-[40px] lg:h-[56px] border-2 rounded-md border-azulPrimary900'
            }
            action={handleChange}
          />
          {usuario?.tipoUsuario && (
            <Select
              name={'rol'}
              label={'Rol'}
              dataSecure={usuario?.tipoUsuario === '1' ? data : dataCliente}
              className={
                'text-textSize5 w-[90%] sm:w-[400px] lg:w-[453px] h-[40px] lg:h-[56px] border-2 rounded-md border-azulPrimary900'
              }
              action={handleChange}
            />
          )}
        </div>

        {usuario?.tipoUsuario === '2' &&
          usuario?.rol !== '70' &&
          usuario?.rol !== '80' &&
          usuario?.rol !== '' &&
          usuario?.rol && (
            <>
              {usuario?.rol !== '70' &&
                usuario?.rol !== '80' &&
                usuario?.rol !== '' && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 lg:gap-x-80 w-full lg:w-[74%]">
                    <Select
                      name={'idCliente'}
                      label={'Empresas a la que perteneces'}
                      action={changeInputs}
                      className={
                        'text-textSize5 w-[90%] sm:w-[453px] h-[40px] md:h-[56px] border-2 rounded-md border-azulPrimary900'
                      }
                    />

                    {sucursales && (
                      <div className="pt-3 text-textSize8">
                        <Select
                          name={'idSucursal'}
                          label={'Sucursal a la que perteneces'}
                          action={changeInputs}
                          choose={''}
                          dataSecure={sucursalList}
                          className={
                            'text-[12px]w-[90%] sm:w-[453px] h-[40px] md:h-[56px] border-2 rounded-md  border-azulPrimary900  text-neutral-400'
                          }
                        />
                      </div>
                    )}
                  </div>
                )}

              {user?.idSucursal && (
                <div className="pb-5">
                  <CreateUser action={changeInputs} submit={createUser} />
                </div>
              )}
            </>
          )}

        {usuario?.tipoUsuario === '1' && usuario?.rol && (
          <div className="mx-auto ">
            <CreateUser action={changeInputs} submit={createUser} />
          </div>
        )}
        {usuario?.tipoUsuario === '2' && usuario?.rol === '70' && (
          <CreateEmpresas
            onUpload={onUpload}
            action={changeInputs}
            submit={createUser}
            file={file}
          />
        )}

        {usuario?.tipoUsuario === '2' && usuario?.rol === '80' && (
          <div className=" flex gap-x-[19rem]">
            <Sucursal action={changeInputs} submit={createUser} />
          </div>
        )}
      </form>
    </Layout>
  )
}

export default Create
