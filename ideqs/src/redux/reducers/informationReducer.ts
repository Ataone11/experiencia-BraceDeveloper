import { createSelector } from 'reselect'
import { INFORMATION_ACTIONS } from '../actions/informationActions'
import { ActionResponse } from './baseReducer'

interface ActionInformation extends ActionResponse {
  type: INFORMATION_ACTIONS
}

interface InformationState {
  loading: boolean
}
const initialState: InformationState = {
  loading: false
}

export default (state: any = initialState, action: ActionInformation) => {
  switch (action.type) {
    case INFORMATION_ACTIONS.CHANGE_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}

export const getLoadingInformation = createSelector(
  (state: any) => state.informationReducer,
  (camposReducer: InformationState) => camposReducer.loading
)
