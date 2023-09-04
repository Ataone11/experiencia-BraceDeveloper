/* eslint-disable no-unused-vars */
import { createSelector } from 'reselect'
import { TypeOrders } from '../actions/orderAdminActions'

interface StateParams {
  order: any
  orderDetail: any
  informe: any
  filters: any
}

const INITIAL_STATE: StateParams = {
  order: null,
  orderDetail: null,
  informe: null,
  filters: null
}

const reducer = (state: StateParams = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TypeOrders.getOrder:
      return { ...state, order: action.payload }
    case TypeOrders.getOrderDetail:
      return { ...state, orderDetail: action.payload }
    case TypeOrders.getInforme: {
      const { informe, filters } = action.payload
      return { ...state, informe, filters }
    }
    default:
      return { ...state }
  }
}

export default reducer

export const getListOrders = createSelector(
  (state: any) => state.orderAdminReducer,
  (orderAdminReducer: StateParams) => orderAdminReducer?.order
)
export const getOrderDetail = createSelector(
  (state: any) => state.orderAdminReducer,
  (orderAdminReducer: StateParams) => orderAdminReducer?.orderDetail
)
export const getInforme = createSelector(
  (state: any) => state.orderAdminReducer,
  (orderAdminReducer: StateParams) => orderAdminReducer?.informe
)

export const getFilters = createSelector(
  (state: any) => state.orderAdminReducer,
  (orderAdminReducer: StateParams) => orderAdminReducer?.filters
)
