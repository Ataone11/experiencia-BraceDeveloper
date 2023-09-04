/* eslint-disable no-unused-vars */
import { newPoint } from '../../../pages/principal/puntos/crear-sede'
import { NewPointMap } from '../../models/newPointMap'
import { deleteData, PORTS, postData } from '../../proxy/BackendREST'
import { toBase64 } from '../../utils/base64'

export enum POINTS_ACTIONS {
  CHANGE_LOADING = 'CHANGE_LOADING'
}

export const getMapsPoints = async (dispatch: any, id: number) => {
  dispatch({
    type: POINTS_ACTIONS.CHANGE_LOADING,
    payload: true
  })
  const body = {
    clientes: [id]
  }
  const response = await postData(
    `idmobile/listarPuntos`,
    {},
    PORTS.MOBILE,
    body
  )
  dispatch({
    type: POINTS_ACTIONS.CHANGE_LOADING,
    payload: false
  })
  return response.data.puntos
}

export const deleteMapPoint = async (id: number) => {
  const response = await deleteData(
    `idmobile/eliminarPunto`,
    { id },
    PORTS.MOBILE
  )
  if (response.data && response.data.code && response.data.code === '200') {
    return 'OK'
  } else {
    return 'ERROR'
  }
}

export const createMapPoint = async (newPoint: newPoint, idCliente: number) => {
  let imgBase64 = ''
  if (newPoint.file) {
    const photo = await toBase64(newPoint.file)
    if (photo) imgBase64 = (photo as any).toString().replace(/^data:(.*,)?/, '')
  }
  const newPointMap: NewPointMap = {
    idCliente,
    imagen: imgBase64,
    nombre: newPoint.name,
    direccion: newPoint.address,
    telefono1: newPoint.phone,
    telefono2: newPoint.phone_optional
  }
  const response = await postData(
    'idmobile/crearPunto',
    {},
    PORTS.MOBILE,
    newPointMap
  )
  if (response.data && response.data.code && response.data.code === '200') {
    return 'OK'
  } else {
    return 'ERROR'
  }
}
