import { createSelector } from 'reselect'
import { OrdersRemissionsModel } from '../../models/ordersRemissionsModel'
import { TypeRemisions } from '../actions/remisionActions'

interface StateParams {
  remisions: any
  remisionByID: any
  orders: OrdersRemissionsModel[] | null
  filters: any
  loading: boolean
}

const INITIAL_STATE: StateParams = {
  remisions: null,
  remisionByID: null,
  orders: null,
  filters: null,
  loading: false
}

const reducer = (state: StateParams = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TypeRemisions.getRemisions: {
      const { remisions, filters } = action.payload
      return { ...state, remisions, filters }
    }
    case TypeRemisions.getOrdersForRemission: {
      const { orders, filters } = action.payload
      return { ...state, orders, filters }
    }
    case TypeRemisions.createRemision:
      return { ...state, remisions: action.payload }
    case TypeRemisions.eliminarRemision:
      return {
        ...state,
        remisions: state.remisions?.ordenes?.filter(
          (remision: any) => remision.id !== action.payload
        )
      }
    case TypeRemisions.loadingRemision:
      return { ...state, loading: action.payload }
    case TypeRemisions.remisionByID:
      return { ...state, remisionByID: action.payload }

    default:
      return { ...state }
  }
}

export default reducer

export const getListRemisions = createSelector(
  (state: any) => state.remisionesReducer,
  (remisionesReducer: StateParams) => remisionesReducer?.remisions
)

export const getRemisionByIDSelector = createSelector(
  (state: any) => state.remisionesReducer,
  (remisionesReducer: StateParams) => remisionesReducer?.remisionByID
)

export const getFilters = createSelector(
  (state: any) => state.remisionesReducer,
  (remisionesReducer: StateParams) => remisionesReducer?.filters
)

export const getOrdersRemission = createSelector(
  (state: any) => state.remisionesReducer,
  (remisionesReducer: StateParams) => remisionesReducer?.orders
)

export const getIsLoadingRemisions = createSelector(
  (state: any) => state.remisionesReducer,
  (remisionesReducer: StateParams) => remisionesReducer?.loading
)
