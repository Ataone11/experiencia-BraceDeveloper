import { createSelector } from 'reselect'
import { Template } from '../../models/templateModel'
import { TypeOrders } from '../actions/formatAdminActions'

interface StateParams {
  formatos: Template[] | null
}

const INITIAL_STATE: StateParams = {
  formatos: null
}

const reducer = (state: StateParams = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TypeOrders.getFormat:
      return { ...state, formatos: action.payload }
    default:
      return { ...state }
  }
}

export default reducer

export const getFormatsSelector = createSelector(
  (state: any) => state.formatAdminReducer,
  (formatAdminReducer: StateParams) => formatAdminReducer?.formatos
)
