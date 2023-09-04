/* eslint-disable no-unused-vars */
import { getData, PORTS, postData } from '../../proxy/BackendREST'
import { OrdenModel } from '../../models/ordenModel'
import { Editar } from '../../screens/administrador/ordersAdmin/editarOrden'
import { Anular } from '../../screens/administrador/ordersAdmin/eliminarOrden'
import { informesModel } from '../../screens/administrador/ordersAdmin/Report'

export enum TypeOrders {
  getOrder = 'getOrder',
  getOrderDetail = 'getOrderDetail',
  getInforme = 'getInforme',
  loadingOrder = 'loadingOrder',
  errorOrder = 'errorOrder'
}

// ////////listar Ordenes//////////////////
export const getOrder = async (dispatch: any, estado: any, idCliente: any) => {
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

  if (!response || !response.data || !response.data.ordenes) {
    dispatch({
      type: TypeOrders.loadingOrder,
      payload: false
    })
    return
  }
  const ordenes = response.data.ordenes as OrdenModel[]

  dispatch({
    type: TypeOrders.getOrder,
    payload: ordenes
  })
}

export const getInformes = async ({
  dispatch,
  body
}: {
  dispatch: any
  body: informesModel
}) => {
  const response = await postData(
    `reporte/listarOrdenesReporte`,
    {},
    PORTS.REPORTE,
    body
  )

  dispatch({
    type: TypeOrders.getInforme,
    payload: { informe: response.data, filters: body }
  })
}

// //////// traer Orden por id o poliza //////////////////
export const getOrderDetalle = async (dispatch: any, id: any) => {
  dispatch({
    type: TypeOrders.loadingOrder,
    payload: true
  })
  const params: any = { orden: id }
  const response = await getData(
    `business/listarOrdenId`,
    params,
    PORTS.BUSINESS
  )

  if (!response.data) {
    return
  }
  const ordenes = response.data
  dispatch({
    type: TypeOrders.getOrderDetail,
    payload: ordenes
  })
}

interface CreateOrder {
  fisica: boolean
  idmobile: boolean
  pdf: boolean
  observacion: string
  excel: string
  imagenes: string | null
  nombreExcel: string
  // idCliente: number
  idPlantilla: number | null
  usuario: string
}

export const CrearOrdenAction = async (newOrder: CreateOrder) => {
  const response = await postData(
    'business/generarNumeroOrden',
    {},
    PORTS.BUSINESS,
    newOrder
  )
  return response.data
}
export const CompletarOrden = async (Nueva: any) => {
  const response = await postData(
    'business/complementarOrden',
    {},
    PORTS.BUSINESS,
    Nueva
  )

  return response
}

export const callCreateOrder = async (newOrder: CreateOrder) => {
  const response = await postData(
    'business/generarNumeroOrden',
    {},
    PORTS.BUSINESS,
    newOrder
  )

  return response.data
}

export const editarOrden = async (data: Editar) => {
  const response = await postData(
    'business/complementarOrden',
    {},
    PORTS.BUSINESS,
    data
  )

  return response.data
}
export const aprobarOrden = async (data: number, user: any) => {
  const response = await getData(
    'business/cargarExcel',
    { orden: data, usuarioAprueba: user },
    PORTS.BUSINESS
  )

  return response.data
}
export const rechazarOrden = async (data: any) => {
  const response = await postData(
    'business/modifyEstadoByOrden',
    {},
    PORTS.BUSINESS,
    data
  )

  return response.data
}
export const anularOrden = async (data: Anular) => {
  const response = await postData(
    'business/modifyEstadoByOrden',
    {},
    PORTS.BUSINESS,
    data
  )

  return response.data
}
export const editarEstadoOrden = async (data: Anular) => {
  const response = await postData(
    'business/modifyEstadoByOrden',
    {},
    PORTS.BUSINESS,
    data
  )

  return response.data
}

export const getSucursalesByIDUser = async (id: number) => {
  const response = await getData(`auth/clients/${id}/sucursal`, {}, PORTS.AUTH)

  return response.data.data
}

export const getUserByIDClient = async (id: number) => {
  const response = await getData(`auth/clients/${id}/users`, {}, PORTS.AUTH)

  return response.data.data
}
