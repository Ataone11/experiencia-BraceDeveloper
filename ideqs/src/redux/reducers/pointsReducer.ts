import { createSelector } from 'reselect'
import { POINTS_ACTIONS } from '../actions/pointsActions'
import { ActionResponse } from './baseReducer'

interface ActionPoints extends ActionResponse {
  type: POINTS_ACTIONS
}

interface PointsState {
  loading: boolean
}
const initialState: PointsState = {
  loading: false
}

export default (state: any = initialState, action: ActionPoints) => {
  switch (action.type) {
    case POINTS_ACTIONS.CHANGE_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}

export const getLoadingPoints = createSelector(
  (state: any) => state.pointsReducer,
  (camposReducer: PointsState) => camposReducer.loading
)
