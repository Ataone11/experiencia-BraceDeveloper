import { createSelector } from 'reselect'
import { NombresCamposModel } from '../../models/campo'
import { CAMPOS_ACTIONS } from '../actions/camposAction'

interface DState {
  campos: NombresCamposModel[] | null
  loading: boolean
  error: any
}
interface ActionD {
  type: CAMPOS_ACTIONS
  payload: any
}

const initialState: DState = {
  loading: false,
  campos: null,
  error: ''
}

export default (state: any = initialState, action: ActionD) => {
  switch (action.type) {
    case CAMPOS_ACTIONS.GET_CAMPOS:
      return {
        ...state,
        campos: action.payload
      }
    default:
      return state
  }
}

export const getCamposState = createSelector(
  (state: any) => state.camposReducer,
  (camposReducer: DState) => {
    if (!camposReducer.campos) return null
    return camposReducer.campos.sort((a, b) => {
      if (a.nombre < b.nombre) {
        return -1
      }
      return 1
    })
  }
)

export const getLoadingC = createSelector(
  (state: any) => state.camposReducer,
  (camposReducer: DState) => camposReducer.loading
)
export const getErrorC = createSelector(
  (state: any) => state.camposReducer,
  (camposReducer: DState) => camposReducer.error
)
