/* eslint-disable no-unused-vars */

import { PORTS, getData } from '../../proxy/BackendREST'
export enum SUCURSAL_ACTIONS {
  GET_SUCURSALES = 'GET_SUCURSALES'
}

export const getSucursales = async (dispatch: any, idCliente: any) => {
  const response = await getData(
    `auth/clients/${idCliente}/sucursal`,
    {},
    PORTS.AUTH
  )
  if (!response.data) {
    return
  }
  const sucursales = response.data
  dispatch({
    type: SUCURSAL_ACTIONS.GET_SUCURSALES,
    payload: sucursales.data
  })
}

export const getAllSucursales = async (dispatch: any) => {
  const response = await getData(`auth/sucursal-list`, {}, PORTS.AUTH)
  if (!response.data) {
    return
  }
  const sucursales = response.data
  dispatch({
    type: SUCURSAL_ACTIONS.GET_SUCURSALES,
    payload: sucursales.data
  })
}
