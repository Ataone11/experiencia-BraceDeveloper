/* eslint-disable no-unused-vars */
import { PORTS, getData, postData } from '../../proxy/BackendREST'

export enum TypeOrders {
  getCarneOrdenes = 'getCarneOrders',
  getCarneList = 'getCarneList',
  getCarnesByOrder = 'getCarnesByOrder',
  loadingCarne = 'loadingCarne',
  errorCarne = 'errorCarne',
  getConsulta = 'getConsulta'
}

export const getCarneList = async ({
  dispatch,
  user,
  page = 1
}: {
  dispatch: any
  user: any
  page: number
}) => {
  dispatch({
    type: TypeOrders.loadingCarne,
    payload: true
  })
  const response = await postData(
    'business/listarOrdenes',
    {},
    PORTS.BUSINESS,
    {
      pdf: true,
      page,
      sucursal: user?.idSucursal,
      nombreEmpresa: user?.empresa
    }
  )
  if (!response || !response.data || !response.data.ordenes) {
    dispatch({
      type: TypeOrders.loadingCarne,
      payload: false
    })

    return
  }

  const orders = response.data

  dispatch({
    type: TypeOrders.getCarneList,
    payload: orders
  })
}

export const getCarnesByOrder = async ({
  dispatch,
  order,
  page = 1,
  rol
}: {
  dispatch: any
  order: string
  page?: number
  rol?: any
}) => {
  dispatch({
    type: TypeOrders.loadingCarne,
    payload: true
  })

  const params: any = {
    orden: order,
    page
  }
  if (rol) {
    params.sucursal = rol
  }

  const response = await getData(
    'reporte/listCarnetsByOrden',
    params,
    PORTS.REPORTE
  )

  if (!response || !response.data || !response.data.carnets) {
    dispatch({
      type: TypeOrders.loadingCarne,
      payload: false
    })

    return
  }

  const carne = response.data

  dispatch({
    type: TypeOrders.getCarnesByOrder,
    payload: carne
  })
}

export const getOrderByID = async ({ order }: { order: string }) => {
  const params: any = {
    orden: order
  }

  const response = await getData(
    'business/listarOrdenId',
    params,
    PORTS.BUSINESS
  )

  return response
}

export const consultAPI = async ({
  dispatch,
  identificacion,
  tipoCarnet
}: {
  dispatch: any
  identificacion: string
  tipoCarnet: string
}) => {
  const params = {
    identificacion,
    tipoCarnet
  }

  dispatch({
    type: TypeOrders.loadingCarne,
    payload: true
  })

  const response = await getData(`reporte/verificador`, params, PORTS.REPORTE)

  if (!response || !response.data || !response.data.carnet) {
    dispatch({
      type: TypeOrders.loadingCarne,
      payload: false
    })

    return
  }

  dispatch({
    type: TypeOrders.getConsulta,
    payload: response.data.carnet
  })

  return response.data.carnet
}
