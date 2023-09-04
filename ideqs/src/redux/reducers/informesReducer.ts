/* eslint-disable no-unused-vars */
import { createSelector } from 'reselect'
import { TypeOrders } from '../actions/informesActions'

interface StateParams {
  informes: any
  filters: any
}

const INITIAL_STATE: StateParams = {
  informes: null,
  filters: null
}

const reducer = (state: StateParams = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TypeOrders.getInforme: {
      const { informes, filters } = action.payload
      return { ...state, informes, filters }
    }
    default:
      return { ...state }
  }
}

export default reducer

export const getInforme = createSelector(
  (state: any) => state.informesReducer,
  (informesReducer: StateParams) => informesReducer?.informes
)

export const getFilters = createSelector(
  (state: any) => state.informesReducer,
  (informesReducer: StateParams) => informesReducer?.filters
)
