import { createSelector } from 'reselect'
import { TypeOrders } from '../actions/carneActions'

interface StateParams {
  carne: any
  carneList: any
  carneByOrder: any
  carneConsult: any
}

const INITIAL_STATE: StateParams = {
  carne: null,
  carneList: null,
  carneByOrder: null,
  carneConsult: null
}

const reducer = (state: StateParams = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TypeOrders.getCarneOrdenes:
      return { ...state, carne: action.payload }
    case TypeOrders.getCarneList:
      return { ...state, carneList: action.payload }
    case TypeOrders.getCarnesByOrder:
      return { ...state, carneByOrder: action.payload }
    case TypeOrders.getConsulta:
      return { ...state, carneConsult: action.payload }
    default:
      return { ...state }
  }
}

export default reducer

export const getListOrders = createSelector(
  (state: any) => state.carneReducer,
  (carneReducer: StateParams) => carneReducer?.carne
)

export const getCarneListSelector = createSelector(
  (state: any) => state.carneReducer,
  (carneReducer: StateParams) => carneReducer?.carneList
)

export const getCarnesByOrderSelector = createSelector(
  (state: any) => state.carneReducer,
  (carneReducer: StateParams) => carneReducer?.carneByOrder
)

export const getCarneConsultSelector = createSelector(
  (state: any) => state.carneReducer,
  (carneReducer: StateParams) => carneReducer?.carneConsult
)
