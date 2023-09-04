/* eslint-disable no-unused-vars */
import { Template } from '../../models/templateModel'
import { PORTS, postData } from '../../proxy/BackendREST'

export enum TypeOrders {
  getFormat = 'getFormat',
  loadingFormat = 'loadingOrder',
  errorFormat = 'errorOrder'
}

export const getFormats = async (dispatch: any, idCliente: number) => {
  dispatch({
    type: TypeOrders.loadingFormat,
    payload: true
  })

  const params: any = {
    idCliente
  }

  const response = await postData(
    'reporte/listarPlantillas',
    {},
    PORTS.REPORTE,
    params
  )

  if (!response || !response.data || !response.data.plantillas) {
    dispatch({
      type: TypeOrders.loadingFormat,
      payload: false
    })

    return
  }

  const templates = response.data.plantillas as Template[]

  dispatch({
    type: TypeOrders.getFormat,
    payload: templates
  })
}
export const getFormatsActivos = async (dispatch: any, idCliente: number) => {
  dispatch({
    type: TypeOrders.loadingFormat,
    payload: true
  })

  const params: any = {
    idCliente,
    activo: 1
  }

  const response = await postData(
    'reporte/listarPlantillas',
    {},
    PORTS.REPORTE,
    params
  )

  if (!response || !response.data || !response.data.plantillas) {
    dispatch({
      type: TypeOrders.loadingFormat,
      payload: false
    })

    return
  }

  const templates = response.data.plantillas as Template[]

  dispatch({
    type: TypeOrders.getFormat,
    payload: templates
  })
}
export const ActivarFormatos = async (dispatch: any, id: any, activo: any) => {
  dispatch({
    type: TypeOrders.loadingFormat,
    payload: true
  })
  const body: any = {
    id,
    activo
  }
  const response = await postData(
    'reporte/activarDesactivarPlantillas',
    {},
    PORTS.REPORTE,
    body
  )

  if (!response || !response.data || !response.data.plantillas) {
    dispatch({
      type: TypeOrders.loadingFormat,
      payload: false
    })

    return
  }

  const templates = response.data.plantillas as Template[]

  dispatch({
    type: TypeOrders.getFormat,
    payload: templates
  })
}
