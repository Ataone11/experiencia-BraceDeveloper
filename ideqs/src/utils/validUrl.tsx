import { USER_ROLES } from './user-roles'
import { ROUTES_USER } from './verifications'

export const validUrl = (user: any) => {
  return `${
    USER_ROLES.ADMIN === user
      ? ROUTES_USER.ADMIN
      : USER_ROLES.ENCARGADO === user
      ? ROUTES_USER.ENCARGADO
      : USER_ROLES.PRDUCCION === user
      ? ROUTES_USER.PRDUCCION
      : USER_ROLES.RECEPCION === user
      ? ROUTES_USER.RECEPCION
      : USER_ROLES.USUARIO_PRINCIPAL === user
      ? ROUTES_USER.USUARIO_PRINCIPAL
      : USER_ROLES.USUARIO_SUCURSAL === user
      ? ROUTES_USER.USUARIO_SUCURSAL
      : 'login'
  }`
}
