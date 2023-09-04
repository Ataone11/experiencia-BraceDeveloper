/* eslint-disable no-unused-vars */
import { getData, PORTS } from '../../proxy/BackendREST'

export enum TypeAdminUsers {
  getUsers = 'getUsers',
  getClients = 'getClients',
  getUsersOfClients = 'getUsersOfClients',
  getSucursalesOfClients = 'getSucursalesOfClients'
}

export const getDataUsers = async (dispatch: any, setLoader?: any) => {
  const response: any = await getData(`auth/clients`, {}, PORTS.AUTH)
  const data = response.data

  if (data.status === 200) {
    dispatch({
      type: TypeAdminUsers.getUsers,
      payload: data.data.users
    })

    dispatch({
      type: TypeAdminUsers.getClients,
      payload: data.data
    })
  }

  if (data.status === 400)
    dispatch({
      type: TypeAdminUsers.getUsers,
      payload: null
    })

  if (response && setLoader) setLoader(false)
}

export const getUsersIDEQS = async (id: number, dispatch: any) => {
  const response: any = await getData(
    `auth/clients/${id}/users`,
    {},
    PORTS.AUTH
  )
  const data = response.data

  if (data.status === 200) {
    dispatch({
      type: TypeAdminUsers.getUsers,
      payload: data.data
    })
  }

  if (data.status === 400)
    dispatch({
      type: TypeAdminUsers.getUsers,
      payload: null
    })
}

export const getClientsAdmin = async (dispatch: any) => {
  const response: any = await getData(`auth/clients`, {}, PORTS.AUTH)
  const data = response.data

  if (data.status === 200) {
    dispatch({
      type: TypeAdminUsers.getClients,
      payload: data.data
    })
  }

  if (data.status === 400)
    dispatch({
      type: TypeAdminUsers.getClients,
      payload: null
    })
}

export const getDataUsersOfClients = async (
  dispatch: any,
  id: any,
  setLoader?: any
) => {
  const response: any = await getData(
    `auth/clients/${id}/users`,
    {},
    PORTS.AUTH
  )
  const data = response.data

  if (data.status === 200) {
    dispatch({
      type: TypeAdminUsers.getUsersOfClients,
      payload: data.data
    })
  }

  if (data.status === 400)
    dispatch({
      type: TypeAdminUsers.getUsers,
      payload: null
    })

  if (response && setLoader) setLoader(false)
}
export const getDataUsersOfRol = async (dispatch: any, id: any, rol?: any) => {
  const params = {
    cliente: id,
    rol,
    deleted: true
  }
  const response: any = await getData(`auth/users`, params, PORTS.AUTH)
  const data = response.data

  if (data.status === 200) {
    dispatch({
      type: TypeAdminUsers.getUsersOfClients,
      payload: data.data
    })
  }

  if (data.status === 400)
    dispatch({
      type: TypeAdminUsers.getUsers,
      payload: null
    })
}
export const getDataUsersOfSucrusal = async (dispatch: any, id: any) => {
  const response: any = await getData(
    `auth/sucursal/${id}/users`,
    {},
    PORTS.AUTH
  )
  const data = response.data

  if (data.status === 200) {
    dispatch({
      type: TypeAdminUsers.getUsersOfClients,
      payload: data.data
    })
  }

  if (data.status === 400)
    dispatch({
      type: TypeAdminUsers.getUsers,
      payload: null
    })
}

export const getDataSucursales = async (
  dispatch: any,
  id: any,
  setLoader?: any
) => {
  const response: any = await getData(
    `auth/clients/${id}/sucursal`,
    {},
    PORTS.AUTH
  )
  const data = response.data

  if (data.status === 200) {
    dispatch({
      type: TypeAdminUsers.getSucursalesOfClients,
      payload: data.data
    })
  }

  if (data.status === 400)
    dispatch({
      type: TypeAdminUsers.getUsers,
      payload: null
    })

  if (response && setLoader) setLoader(false)
}
