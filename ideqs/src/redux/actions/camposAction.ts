/* eslint-disable no-unused-vars */
import { NombresCamposModel } from '../../models/campo'
import { PORTS, getData } from '../../proxy/BackendREST'
export enum CAMPOS_ACTIONS {
  GET_CAMPOS = 'GET_CAMPOS',
  GET_CARNES = 'GET_CARNES',
}

export const getCampos = async (dispatch: any) => {
  const response = await getData(`business/listarCampos`, {}, PORTS.BUSINESS)
  if (!response.data || !response.data.campos) {
    return
  }
  const campos = response.data.campos as NombresCamposModel[]
  dispatch({
    type: CAMPOS_ACTIONS.GET_CAMPOS,
    payload: campos
  })
}
