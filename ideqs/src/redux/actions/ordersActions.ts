/* eslint-disable no-unused-vars */
import { Dispatch } from 'redux'
import { OrdenModel } from '../../models/ordenModel'

import { getData, postData, PORTS } from '../../proxy/BackendREST'

export enum TypeOrders {
  getOrders = 'getOrders',
  createOrders = 'createOrders',
  loadingOrder = 'loadingOrder',
  getCardContentFormats = 'getCardContentFormats'
}

export const createLugar = async (lugar: any, dispatch: any) => {
  const formData = new FormData()
  Object.keys(lugar).forEach((key: string) => {
    formData.append(key, lugar[key])
  })

  const response = await postData('crearrExcel', {}, PORTS.BUSINESS, formData)
  dispatch({
    type: TypeOrders.createOrders,
    payload: response
  })
}

export const getCardContentFormat = async (
  client: number,
  dispatch: Dispatch
) => {
  // const res = await getData("business/listarExcelsPlantillasPorCliente", {
  //   idCliente: 2
  // }, PORTS.BUSINESS);
  const res = await getData(
    'reporte/listarPlantillas',
    {
      idCliente: client
    },
    PORTS.REPORTE
  )
  dispatch({
    type: TypeOrders.getCardContentFormats,
    // payload: res?.data?.excelsPlantillas
    payload: res?.data?.plantillas
  })
}

export const getOrders = async (dispatch: any, estado: any, idCliente: any) => {
  dispatch({
    type: TypeOrders.loadingOrder,
    payload: true
  })
  const params: any = {
    idCliente,
    estado
  }

  const response = await getData(
    `business/listarOrdenesClienteEstado`,
    params,
    PORTS.BUSINESS
  )

  if (!response.data) {
    return
  }
  const ordenes = response.data.ordenes as OrdenModel[]

  dispatch({
    type: TypeOrders.getOrders,
    payload: ordenes
  })
}

export const getOrdersFiltros = async ({
  dispatch,
  data,
  page = 1
}: {
  dispatch: any
  data: any
  page?: number
}) => {
  dispatch({
    type: TypeOrders.loadingOrder,
    payload: true
  })
  data?.estado === 0 && delete data.estado
  const response = await postData(
    `business/listarOrdenes`,
    {},
    PORTS.BUSINESS,
    { ...data, page }
  )

  if (!response.data) {
    return
  }
  const ordenes = response.data

  dispatch({
    type: TypeOrders.getOrders,
    payload: ordenes
  })
}
