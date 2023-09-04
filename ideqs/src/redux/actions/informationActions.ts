/* eslint-disable no-unused-vars */
import { InformationModel } from '../../models/informationModel'
import { deleteData, PORTS, postData } from '../../proxy/BackendREST'
import { toBase64 } from '../../utils/base64'

export enum INFORMATION_ACTIONS {
  CHANGE_LOADING = 'CHANGE_LOADING'
}

export const getDocsInformations = async (dispatch: any, id: number) => {
  dispatch({
    type: INFORMATION_ACTIONS.CHANGE_LOADING,
    payload: true
  })
  const body = {
    clientes: [id]
  }
  const response = await postData(
    `idmobile/listarInformacion`,
    {},
    PORTS.MOBILE,
    body
  )
  dispatch({
    type: INFORMATION_ACTIONS.CHANGE_LOADING,
    payload: false
  })
  return response.data.informaciones
}

export const deleteDocInformation = async (id: number) => {
  const response = await deleteData(
    `idmobile/eliminarInformacion`,
    { id },
    PORTS.MOBILE
  )
  if (response.data && response.data.code && response.data.code === '200') {
    return 'OK'
  } else {
    return 'ERROR'
  }
}

export const createDocInformation = async (
  newDoc: any,
  idCliente: number,
  user: string
) => {
  const docBase64 = await toBase64(newDoc.file)
  let imgBase64 = ''
  if (newDoc.image) {
    const photo = await toBase64(newDoc.image)
    if (photo) imgBase64 = (photo as any).toString().replace(/^data:(.*,)?/, '')
  }
  const newDocument: InformationModel = {
    idCliente,
    nombre: newDoc.name,
    documento: (docBase64 ?? '').toString().replace(/^data:(.*,)?/, ''),
    imagen: imgBase64,
    usuario: user
  }
  const response = await postData(
    'idmobile/crearInformacion',
    {},
    PORTS.MOBILE,
    newDocument
  )
  if (response.data && response.data.code && response.data.code === '200') {
    return 'OK'
  } else {
    return 'ERROR'
  }
}
