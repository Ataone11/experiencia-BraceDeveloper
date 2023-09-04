import { createSelector } from 'reselect'
import { USUARIOS_ACTIONS } from '../actions/usuariosActions'

interface DState {
  usuarios: Array<any> | null
}
interface ActionD {
  type: USUARIOS_ACTIONS
  payload: any
}

const initialState: DState = {
  usuarios: null
}

export default (state: any = initialState, action: ActionD) => {
  switch (action.type) {
    case USUARIOS_ACTIONS.GOTTEN_USUARIOS:
      return {
        ...state,
        loading: false,
        usuarios: action.payload
      }

    default:
      return state
  }
}

export const getUsuariosState = createSelector(
  (state: any) => state.usuariosReducer,
  (usuariosReducer: DState) => usuariosReducer.usuarios
)
