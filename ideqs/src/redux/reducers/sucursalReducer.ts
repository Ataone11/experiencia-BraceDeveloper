import { createSelector } from 'reselect'
import { SUCURSAL_ACTIONS } from '../actions/sucursalesActions'

export interface SucursalModel {
  id: number
  nombre: string
  idCliente?: number
  deleted?: number
  cliente?: string
}
interface DState {
  sucursal: SucursalModel[] | null
  loading: boolean
  error: any
}
interface ActionD {
  type: SUCURSAL_ACTIONS
  payload: any
}

const initialState: DState = {
  loading: false,
  sucursal: null,
  error: ''
}

export default (state: any = initialState, action: ActionD) => {
  switch (action.type) {
    case SUCURSAL_ACTIONS.GET_SUCURSALES:
      return {
        ...state,
        sucursal: action.payload
      }
    default:
      return state
  }
}

export const getSucursalState = createSelector(
  (state: any) => state.sucursalReducer,
  (sucursalReducer: DState) => sucursalReducer.sucursal
)
