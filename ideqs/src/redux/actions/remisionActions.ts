/* eslint-disable no-unused-vars */
import { deleteData, getData, PORTS, postData } from '../../proxy/BackendREST'

export enum TypeRemisions {
  getRemisions = 'getRemisions',
  createRemision = 'createRemision',
  eliminarRemision = 'eliminarRemision',
  loadingRemision = 'loadingRemision',
  remisionByID = 'remisionByID',
  getOrdersForRemission = 'getOrdersForRemission'
}

export const getRemisiones = async ({
  dispatch,
  body,
  page
}: {
  dispatch: any
  body?: any
  page?: number
}) => {
  const BODY = {
    ...body,
    page
  }

  dispatch({
    type: TypeRemisions.loadingRemision,
    payload: true
  })

  const response = await postData(
    `business/listarRemisiones`,
    {},
    PORTS.BUSINESS,
    BODY
  )

  if (response.data) {
    dispatch({
      type: TypeRemisions.loadingRemision,
      payload: false
    })
  }
  const remisions = response.data

  dispatch({
    type: TypeRemisions.getRemisions,
    payload: { remisions, filters: body }
  })

  return remisions?.page?.totalRegistros
}
export const createNewRemision = async (body: any) => {
  const response = await postData(
    `business/createRemision`,
    {},
    PORTS.BUSINESS,
    body
  )
  const remisions = response.data
  return remisions
}
export const getOrdersForRemission = async ({
  dispatch,
  body
}: {
  dispatch: any
  body?: any
  page?: number
}) => {
  dispatch({
    type: TypeRemisions.loadingRemision,
    payload: true
  })

  const response = await postData(
    `business/listarOrdenesCantidades`,
    {},
    PORTS.BUSINESS,
    body
  )

  if (response.data && response.data.ordenes) {
    const remisions = response.data
    const orders = response.data.ordenes

    dispatch({
      type: TypeRemisions.getOrdersForRemission,
      payload: { orders, filters: body }
    })

    return remisions
  }
}
export const deleteRemision = async ({
  dispatch,
  id
}: {
  dispatch: any
  id: any
}) => {
  dispatch({
    type: TypeRemisions.loadingRemision,
    payload: true
  })
  const params = {
    remision: id
  }
  const response = await deleteData(
    'business/eliminarRemision',
    params,
    PORTS.BUSINESS
  )

  if (response.data.code !== 200) {
    dispatch({
      type: TypeRemisions.loadingRemision,
      payload: false
    })
  }

  dispatch({
    type: TypeRemisions.eliminarRemision,
    payload: id
  })
}

export const getRemisionByID = async ({
  dispatch,
  id
}: {
  dispatch: any
  id: string
}) => {
  dispatch({
    type: TypeRemisions.loadingRemision,
    payload: true
  })

  const response = await getData(
    `business/listarRemisionId`,
    { remision: id },
    PORTS.BUSINESS
  )

  if (!response.data) {
    dispatch({
      type: TypeRemisions.loadingRemision,
      payload: false
    })
    return
  }
  const remision = response.data

  dispatch({
    type: TypeRemisions.remisionByID,
    payload: remision
  })
}
