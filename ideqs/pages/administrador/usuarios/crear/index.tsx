import React from 'next'
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
  getSucursalesClient,
  getuserRoleinChargeClient
} from '../../../../src/redux/actions/adminUserActions'
import { useDispatch, useSelector } from 'react-redux'
import { toBase64 } from '../../../../src/utils/base64'
import {
  getClients,
  getSucursales,
  getlistUserClientInCharge
} from '../../../../src/redux/reducers/adminUserReducer'
import { useRouter } from 'next/router'
import { MoonLoader } from 'react-spinners'
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
    title: 'Producción'
  },
  {
    id: 3,
    title: 'Recepción'
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
const Create = () => {
  const [createLoader, setCreateLoader] = useState(false)
  const [usuario, setUsuario] = useState<Usuario>({})
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const [user, setUser] = useState<UserDataModel>({
    rol: 1,
    activo: 1,
    pdf: 1,
    physical: 1,
    mobile: 0
  })

  const sucursales = useSelector((state: any) =>
    getSucursales(state, user.idCliente ?? 0)
  )

  const users = useSelector((state: any) =>
    getlistUserClientInCharge(state, user.idCliente ?? 0)
  )

  const clients = useSelector(getClients)

  useEffect(() => {
    if (!sucursales && user.idCliente) {
      getSucursalesClient(user.idCliente, dispatch)
    }
  }, [user])

  useEffect(() => {
    if (user?.rol === 80 && user.idCliente) {
      getuserRoleinChargeClient(user.idCliente, dispatch)
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
    if (e.target.name === 'rol') {
      setUsuario({ ...usuario, [e.target.name]: '' })
      setTimeout(() =>
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
      )
    } else {
      setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }
  }
  const changeInputs = (event: any) => {
    if (event.target.name === 'rol') {
      setUser({
        rol: parseInt(event.target.value)
      })
    } else if (event.target.type === 'file') {
      setUser({ ...user, [event.target.name]: event.target.files[0] })
    } else if (event.target.name === 'nit') {
      setUser({ ...user, [event.target.name]: Number(event.target.value) })
    } else {
      if (event.target.name === 'activo') {
        setUser({ ...user, [event.target.name]: parseInt(event.target.value) })
      } else if (event.target.name === 'idCliente' && usuario?.rol === '4') {
        setUser({
          ...user,
          idCliente: event.target.value
        })
      } else if (event.target.name === 'idCliente' && usuario?.rol === '6') {
        setUser({
          ...user,
          idCliente: event.target.value
        })
      } else if (
        (user?.idCliente && usuario?.rol === '4') ||
        usuario?.rol === '6'
      ) {
        setUser({
          ...user,
          [event.target.name]: event.target.value,
          idSucursal: sucursales?.[0]?.id
        })
      } else {
        setUser({ ...user, [event.target.name]: event.target.value })
      }
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
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    const minusculas = /^[\p{Ll}\p{N}\p{P}]+$/u

    if (usuario?.tipoUsuario === '1') {
      if (!user.name) {
        toast.error('Falta el nombre')
        return
      } else if (!user.lastname) {
        toast.error('Falta el apellido')
        return
      } else if (!user.correo) {
        toast.error('Falta el correo')
        return
      } else if (!user.user) {
        toast.error('Falta el nombre de usuario')
        return
      } else if (!user?.user?.match(minusculas)) {
        toast.error('El usuario debe tener solo minúsculas')
        return
      } else if (!user.correo.match(pattern)) {
        toast.error('Correo no valido')
        return
      } else if (!user.identificacion) {
        toast.error('Falta identificación')
        return
      } else if (!user.activo) {
        toast.error('Porfavor selecciona un estado')
        return
      } else if (!user.password) {
        toast.error('Falta la contraseña')
        return
      }
    }
    if (usuario?.tipoUsuario === '2') {
      if (usuario?.rol === '70') {
        if (!user.name) {
          toast.error('Falta el nombre')
          return
        } else if (!user.identificacion) {
          toast.error('Falta el nit')
          return
        } else if (!user.correo) {
          toast.error('Falta el Correo')
          return
        } else if (!user.correo.match(pattern)) {
          toast.error('Correo no valido')
          return
        } else if (!user.direccion) {
          toast.error('Falta la dirección')
          return
        } else if (!user.telefono) {
          toast.error('Falta el teléfono')
          return
        } else if (!user.logo) {
          toast.error('Falta el logo')
          return
        }
      } else if (usuario?.rol === '80') {
        if (!user.name) {
          toast.error('Falta el nombre')
          return
        } else if (!user.idCliente) {
          toast.error('seleccione un Cliente')
          return
        }
      } else if (
        usuario?.rol !== '70' &&
        usuario?.rol !== '80' &&
        usuario?.rol !== '' &&
        usuario?.rol
      ) {
        if (!user.idCliente) {
          toast.error('Seleccione un cliente')
          return
        } else if (!user.idSucursal) {
          toast.error('Seleccione una sucursal')
          return
        }
        if (!user.name) {
          toast.error('Falta el nombre')
          return
        } else if (!user.lastname) {
          toast.error('Falta el apellido')
          return
        } else if (!user.correo) {
          toast.error('Falta el correo')
          return
        } else if (!user.correo.match(pattern)) {
          toast.error('Correo no valido')
          return
        } else if (!user.identificacion) {
          toast.error('Falta la identificación')
          return
        } else if (!user.activo) {
          toast.error('Por favor seleccione un estado')
          return
        } else if (!user.user) {
          toast.error('Falta nombre de usuario')
          return
        } else if (!user?.user?.match(minusculas)) {
          toast.error('El usuario debe tener solo minúsculas')
          return
        } else if (!user.password) {
          toast.error('Falta la contraseña')
          return
        }
      }
    }

    const response = await CreateDataUser(user)

    if (response.statusCode === 200) {
      setCreateLoader(true)
      toast.success('El usuario fue creado correctamente')
      if (user?.rol === 1 || user?.rol === 2 || user?.rol === 3) {
        router.replace(
          `/administrador/usuarios/usuario?idUser=${response.data.data.id}`,
          undefined,
          { shallow: true }
        )
      } else if (user?.rol === 70) {
        router.replace(
          `/administrador/usuarios/cliente?idUser=${response.data.data.id}&sucursal=false`,
          undefined,
          { shallow: true }
        )
      } else if (user?.rol === 6 || user?.rol === 5 || user?.rol === 4) {
        router.replace(
          `/administrador/usuarios/usuario?idUser=${response.data.data.id}`,
          undefined,
          { shallow: true }
        )
      } else if (user?.rol === 80) {
        router.replace(
          `/administrador/usuarios/sucursal?idUser=${response.data.data.idCliente}&sucursal=${response.data.data.id}`,
          undefined,
          { shallow: true }
        )
      }
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
  const userList = users
    ? users.map((user) => {
        return {
          id: user.id,
          title: user.name
        }
      })
    : []
  if (createLoader) {
    return (
      <div className="flex justify-center mx-auto  items-center h-screen">
        <MoonLoader color="#425AC5" />
      </div>
    )
  }
  if (!createLoader) {
    return (
      <Layout
        titleSection="CREAR CUENTA"
        titleBasePage="Usuarios"
        dataSidebar={dataSidebar[SIDEBAR_ENUM.USUARIOS]}
      >
        <form
          className="w-fit mx-auto "
          onSubmit={createUser}
          onChange={changeInputs}
        >
          <div className=" grid grid-cols-1 xl:grid-cols-2 text-azulPrimary900 text-textSize5 lg:gap-x-80 items-start w-full lg:w-[74%] ">
            <Select
              name={'tipoUsuario'}
              label={'Tipo de usuario'}
              dataSecure={dataSecure}
              className={
                'text-textSize5 min-w-full sm:min-w-[453px] lg:w-[453px] h-[40px] lg:h-[56px] border-2 rounded-md border-azulPrimary900'
              }
              action={handleChange}
            />
            {usuario?.tipoUsuario && (
              <Select
                name={'rol'}
                label={'Rol'}
                dataSecure={usuario?.tipoUsuario === '1' ? data : dataCliente}
                className={
                  'text-textSize5 w-full sm:w-[453px] lg:w-[453px] h-[40px] lg:h-[56px] border-2 rounded-md border-azulPrimary900'
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
                          'text-textSize5 w-full sm:w-[453px] h-[40px] md:h-[56px] border-2 rounded-md border-azulPrimary900'
                        }
                      />

                      {sucursales &&
                        usuario?.rol !== '4' &&
                        usuario?.rol !== '6' && (
                          <div className="pb-3 text-textSize8">
                            <Select
                              name={'idSucursal'}
                              label={'Sucursal a la que perteneces'}
                              action={changeInputs}
                              choose={''}
                              dataSecure={sucursalList}
                              className={
                                'text-[12px] w-full sm:w-[453px] h-[40px] md:h-[56px] border-2 rounded-md  border-azulPrimary900  text-neutral-400'
                              }
                            />
                          </div>
                        )}
                    </div>
                  )}

                {user?.idCliente && sucursales && (
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
            <div className="mx-auto">
              <Sucursal
                action={changeInputs}
                submit={createUser}
                listUsers={userList}
              />
            </div>
          )}
        </form>
      </Layout>
    )
  }
}
export default Create
