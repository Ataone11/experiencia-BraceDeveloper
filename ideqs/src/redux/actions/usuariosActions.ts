/* eslint-disable no-unused-vars */
import { getData, PORTS } from '../../proxy/BackendREST'
import { USER_ROLES } from '../../utils/user-roles'
export enum USUARIOS_ACTIONS {
  GOTTEN_USUARIOS = 'usuariosReducer/usuario'
}
export const getUsuarios = async (dispatch: any, idCliente: any, rol: any) => {
  if (
    rol === USER_ROLES.PRDUCCION ||
    rol === USER_ROLES.RECEPCION ||
    rol === USER_ROLES.ADMIN
  ) {
    const params = {
      rol: 0,
      deleted: true
    }
    const response = await getData(`auth/users`, params, PORTS.AUTH)
    const usuarios = response.data
    dispatch({
      type: USUARIOS_ACTIONS.GOTTEN_USUARIOS,
      payload: usuarios.data
    })
  } else {
    const response = await getData(
      `auth/clients/${idCliente}/users`,
      {},
      PORTS.AUTH
    )
    const usuarios = response.data
    dispatch({
      type: USUARIOS_ACTIONS.GOTTEN_USUARIOS,
      payload: usuarios.data
    })
  }
}
