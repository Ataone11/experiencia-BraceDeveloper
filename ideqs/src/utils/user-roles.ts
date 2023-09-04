/* eslint-disable no-unused-vars */
export enum USER_ROLES {
  ADMIN = 1,
  PRDUCCION = 2,
  RECEPCION = 3,
  ENCARGADO = 4,
  USUARIO_SUCURSAL = 5,
  USUARIO_PRINCIPAL = 6
}

export const ROLES: Record<number, string> = {
  0: 'NO ROL',
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.PRDUCCION]: 'Producción',
  [USER_ROLES.RECEPCION]: 'Recepción',
  [USER_ROLES.ENCARGADO]: 'Encargado',
  [USER_ROLES.USUARIO_SUCURSAL]: 'Usuario Sucursal',
  [USER_ROLES.USUARIO_PRINCIPAL]: 'Usuario Principal'
}
