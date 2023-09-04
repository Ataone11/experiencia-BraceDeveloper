/* eslint-disable no-unused-vars */
import { UserDataModel } from '../../models/userDataModel'
import { signUp } from '../../proxy/AWSCognito'
import { deleteData, getData, PORTS, postData } from '../../proxy/BackendREST'
import { toBase64 } from '../../utils/base64'
import { ERROR, OK } from '../../utils/constants'
import { getDataUsers } from './adminUsersActions'

export enum TypeAdminUser {
  getUser = 'getUser',
  getClients = 'getClients',
  getSucursales = 'getSucursales',
  errorGetClients = 'errorGetClients',
  getClient = 'getClient',
  getSucursal = 'getSucursal',
  getSucursalClient = 'getSucursalClient',
  errorGetSucursal = 'errorGetSucursal',
  getListUserClient = 'getListUserClient'
}

export const getDataUser = async (
  dispatch: any,
  id: any,
  setLoader?: any,
  setUser?: any
) => {
  const response = await getData(`auth/users/detail/${id}`, {}, PORTS.AUTH)
  const data: UserDataModel[] = response.data.data

  if (response.statusCode === 200) {
    dispatch({
      type: TypeAdminUser.getUser,
      payload: data
    })
  }

  if (response.statusCode === 400) {
    dispatch({
      type: TypeAdminUser.getUser,
      payload: null
    })
  }

  if (data && setLoader) setLoader(false)

  if (data && setUser) setUser(data)
}

export const getDataClient = async (
  dispatch: any,
  id?: any,
  setLoader?: any,
  setUser?: any
) => {
  if (!id) {
    id = ''
  }
  const response = await getData(`auth/clients/${id}`, {}, PORTS.AUTH)
  const data: UserDataModel[] = response.data.data

  if (response.statusCode === 200 && id !== '') {
    dispatch({
      type: TypeAdminUser.getClient,
      payload: data
    })
  }

  if (response.statusCode === 200 && id === '') {
    dispatch({
      type: TypeAdminUser.getClients,
      payload: data
    })
  }

  if (response.statusCode === 400)
    dispatch({
      type: TypeAdminUser.getClient,
      payload: null
    })

  if (data && setLoader) setLoader(false)

  if (data && setUser) setUser({ ...data, rol: 7 })
}

export const cargarPlantilla = async (finalData: any) => {
  const response = await postData(
    'reporte/cargarPlantilla',
    {},
    PORTS.REPORTE,
    finalData
  )
  if (response && response.statusCode === 200) {
    if (response && response.data && response.data.code === '200') {
      return OK
    }
  }

  return ERROR
}

export const updateDataUser = async (
  userdata: UserDataModel | null | undefined
) => {
  if (userdata?.picture) {
    const photo = await toBase64(userdata.picture)
    if (photo) userdata.logo = photo.toString().replace(/^data:(.*,)?/, '')
    userdata.nombreLogo = userdata.picture.name
  }
  if (userdata?.rol === 7) {
    delete userdata.user
    delete userdata.activo
    delete userdata.pdf
    delete userdata.physical
    delete userdata.mobile
  }
  if (userdata?.nit && !userdata.identificacion) {
    userdata.identificacion = userdata.nit.toString()
  }
  if (userdata?.nombre && !userdata.name) {
    userdata.name = userdata.nombre
  }
  delete userdata?.nit
  delete userdata?.picture
  delete userdata?.nombre
  delete userdata?.deleted

  const response = await postData(`auth/users`, {}, PORTS.AUTH, userdata)

  return response
}

export const CreateDataUser = async (userdata: UserDataModel) => {
  let idAWS: any = null
  if (
    userdata.rol !== 80 &&
    userdata.rol !== 70 &&
    userdata.password &&
    userdata.user &&
    userdata.correo
  ) {
    idAWS = await signUp(userdata.user, userdata.correo, userdata.password)
    if (idAWS) {
      // eslint-disable-next-line no-prototype-builtins
      if (idAWS.hasOwnProperty('userSub')) {
        userdata.idAws = idAWS.userSub
      } else {
        const response = { statusCode: 400, idAWS }
        return response
      }
    }
  }

  if (userdata.picture) {
    const photo = await toBase64(userdata.picture)
    if (photo)
      userdata.logo = (photo as any).toString().replace(/^data:(.*,)?/, '')
    userdata.nombreLogo = userdata.picture.name
  }
  if (userdata.rol === 70) {
    delete userdata.user
    delete userdata.activo
    delete userdata.pdf
    delete userdata.physical
    delete userdata.mobile
  }

  delete userdata.picture
  delete userdata.password

  const response = await postData('auth/users', {}, PORTS.AUTH, userdata)

  return response
}

export const DeleteDataUser = async (
  id: number | undefined,
  dispatch?: any
) => {
  const response = await deleteData(`auth/users/${id}`, {})

  if (dispatch) getDataUsers(dispatch)

  return response
}

export const DeleteDataClient = async (
  id: number | undefined,
  dispatch?: any
) => {
  const response = await deleteData(`auth/clients/${id}`, {})

  if (dispatch) getDataUsers(dispatch)

  return response
}

export const DeleteDataSucursal = async (id: number | undefined) => {
  const response = await deleteData(`auth/sucursal/${id}`, {})

  return response
}

export const getClientsData = async (dispatch: any) => {
  const response = await getData('business/listarClientes', {}, PORTS.BUSINESS)
  if (response && response.data && response.data.clientes) {
    const clients = response.data.clientes
    if (clients) {
      dispatch({
        type: TypeAdminUser.getClients,
        payload: clients
      })
    }
  } else {
    dispatch({
      type: TypeAdminUser.errorGetClients,
      payload: null
    })
  }
}

export const getSucursalesClient = async (id: number, dispatch: any) => {
  const response = await getData(`auth/clients/${id}/sucursal`, {}, PORTS.AUTH)
  if (response && response.data && response.data.data) {
    const sucursales = response.data.data
    if (sucursales) {
      dispatch({
        type: TypeAdminUser.getSucursales,
        payload: sucursales,
        id
      })
    }
  } else {
    dispatch({
      type: TypeAdminUser.errorGetClients,
      payload: null
    })
  }
}

export const getuserRoleinChargeClient = async (id: number, dispatch: any) => {
  const response = await getData(
    `auth/users`,
    {
      rol: 4,
      cliente: id
    },
    PORTS.AUTH
  )
  const data = response.data

  if (data.status === 200) {
    dispatch({
      type: TypeAdminUser.getListUserClient,
      payload: data.data,
      id
    })
    return true
  }
  return false
}

export const getDataSucursal = async (
  dispatch: any,
  id: string | string[] | undefined,
  setLoader?: any,
  setUser?: any
) => {
  const response = await getData(`auth/sucursal/${id}`, {}, PORTS.AUTH)
  if (response && response.data && response.data.data) {
    const sucursales = response.data.data
    if (sucursales) {
      dispatch({
        type: TypeAdminUser.getSucursal,
        payload: sucursales.sucursal,
        id
      })
      dispatch({
        type: TypeAdminUser.getSucursalClient,
        payload: sucursales.client,
        id
      })
    }
  } else {
    dispatch({
      type: TypeAdminUser.errorGetSucursal,
      payload: null
    })
  }
  if (response && setLoader) setLoader(false)

  if (response && setUser) setUser({ ...response.data.data?.sucursal, rol: 8 })
}
