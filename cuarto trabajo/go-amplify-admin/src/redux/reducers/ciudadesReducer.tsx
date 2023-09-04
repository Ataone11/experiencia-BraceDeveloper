import { CiudadActions } from "../actions/ciudadesActions";
import { CiudadModel } from "../../models/CiudadModel";
import { createSelector } from "reselect";

interface CState {
  ciudades: Array<CiudadModel> | null;
  loading: boolean;
  error: any;
}
interface ActionC {
  type: CiudadActions;
  payload: any;
}

const initialState: CState = {
  loading: false,
  ciudades: null,
  error: "",
};

export default (state: any = initialState, action: ActionC) => {
  switch (action.type) {
    case CiudadActions.LOADING_CIUDAD:
      return {
        ...state,
        loading: action.payload,
      };
    case CiudadActions.GOTTEN_CIUDAD:
      return {
        ...state,
        loading: false,
        ciudades: action.payload,
      };
    case CiudadActions.ERROR_CIUDAD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCiudadesState = createSelector(
  (state: any) => state.ciudadesReducer,
  (ciudadesReducer: CState) => ciudadesReducer.ciudades
);
export const getLoadingC = createSelector(
  (state: any) => state.ciudadesReducer,
  (ciudadesReducer: CState) => ciudadesReducer.loading
);
export const getErrorC = createSelector(
  (state: any) => state.ciudadesReducer,
  (ciudadesReducer: CState) => ciudadesReducer.error
);
