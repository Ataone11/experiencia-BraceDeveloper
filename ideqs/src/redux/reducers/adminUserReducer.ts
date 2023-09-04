import { createSelector } from 'reselect'
import { UserDataModel } from '../../models/userDataModel'
import { TypeAdminUser } from '../actions/adminUserActions'
import { Client } from '../../models/clientModel'
import { Sucursal } from '../../models/sucursalModel'

interface StateParams {
  users: UserDataModel | null
  clients: Client[] | null
  sucursales: Record<number, Sucursal[]> | null
  error: string | null
  client: UserDataModel | null
  listUserCleint: Record<number, UserDataModel[]> | null
  sucursal: Sucursal | null
  sucursalClient: Client | null
}

const INITIAL_STATE: StateParams = {
  users: null,
  clients: null,
  sucursales: null,
  error: null,
  client: null,
  sucursal: null,
  sucursalClient: null,
  listUserCleint: null
}

const reducer = (state: StateParams = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TypeAdminUser.getUser:
      return { ...state, users: action.payload }
    case TypeAdminUser.getClients:
      return { ...state, clients: action.payload }
    case TypeAdminUser.getSucursales:
      return {
        ...state,
        sucursales: {
          ...(state.sucursales ?? {}),
          [action.id]: action.payload
        }
      }
    case TypeAdminUser.errorGetClients:
      return { ...state, error: action.payload }
    case TypeAdminUser.getClient:
      return { ...state, client: action.payload }
    case TypeAdminUser.getSucursal:
      return { ...state, sucursal: action.payload }
    case TypeAdminUser.getSucursalClient:
      return { ...state, sucursalClient: action.payload }
    case TypeAdminUser.getListUserClient:
      return {
        ...state,
        listUserCleint: {
          ...(state.listUserCleint ?? {}),
          [action.id]: action.payload
        }
      }
    default:
      return { ...state }
  }
}

export default reducer

export const getUser = createSelector(
  (state: any) => state.adminUserReducer,
  (adminUserReducer: StateParams): UserDataModel | null =>
    adminUserReducer.users
)

export const getClients = createSelector(
  (state: any) => state.adminUserReducer,
  (adminUserReducer: StateParams): Client[] | null => adminUserReducer.clients
)
export const getSucursales = createSelector(
  (state: any, id: number) => ({
    adminUserReducer: state.adminUserReducer,
    id
  }),
  ({
    adminUserReducer,
    id
  }: {
    adminUserReducer: StateParams
    id: number
  }): Sucursal[] | null => {
    if (adminUserReducer.sucursales && adminUserReducer.sucursales[id])
      return adminUserReducer.sucursales[id]
    return null
  }
)

export const getlistUserClientInCharge = createSelector(
  (state: any, id: number) => ({
    adminUserReducer: state.adminUserReducer,
    id
  }),
  ({
    adminUserReducer,
    id
  }: {
    adminUserReducer: StateParams
    id: number
  }): UserDataModel[] | null => {
    if (adminUserReducer.listUserCleint && adminUserReducer.listUserCleint[id])
      return adminUserReducer.listUserCleint[id]
    return null
  }
)

export const getClient = createSelector(
  (state: any) => state.adminUserReducer,
  (adminUserReducer: StateParams): UserDataModel | null =>
    adminUserReducer.client
)
export const getSucursal = createSelector(
  (state: any) => state.adminUserReducer,
  (adminUserReducer: StateParams): Sucursal | null => adminUserReducer.sucursal
)
export const getSucursalClient = createSelector(
  (state: any) => state.adminUserReducer,
  (adminUserReducer: StateParams): Client | null =>
    adminUserReducer.sucursalClient
)
