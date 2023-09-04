import { createSelector } from 'reselect'
import { UserDataModel } from '../../models/userDataModel'
import { TypeAdminUsers } from '../actions/adminUsersActions'

interface StateParams {
  users: UserDataModel[] | null
  clients: UserDataModel[] | null
  usersOfClients: UserDataModel[] | null
  sucursales: UserDataModel[] | null
}

const INITIAL_STATE: StateParams = {
  users: null,
  clients: null,
  usersOfClients: null,
  sucursales: null
}

const reducer = (state: StateParams = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TypeAdminUsers.getUsers: {
      return { ...state, users: action.payload }
    }
    case TypeAdminUsers.getClients: {
      return { ...state, clients: action.payload }
    }
    case TypeAdminUsers.getUsersOfClients: {
      return { ...state, usersOfClients: action.payload }
    }
    case TypeAdminUsers.getSucursalesOfClients: {
      return { ...state, sucursales: action.payload }
    }
    default: {
      return { ...state }
    }
  }
}

export default reducer

export const getUsers = createSelector(
  (state: any) => state.adminUsersReducer,
  (adminUsersReducer: StateParams): UserDataModel[] | null =>
    adminUsersReducer.users
)

export const getClients = createSelector(
  (state: any) => state.adminUsersReducer,
  (adminUsersReducer: StateParams): UserDataModel[] | null =>
    adminUsersReducer.clients
)
export const getUsersOfClients = createSelector(
  (state: any) => state.adminUsersReducer,
  (adminUsersReducer: StateParams): UserDataModel[] | null =>
    adminUsersReducer.usersOfClients
)
export const getSucursalesOfClients = createSelector(
  (state: any) => state.adminUsersReducer,
  (adminUsersReducer: StateParams): UserDataModel[] | null =>
    adminUsersReducer.sucursales
)
