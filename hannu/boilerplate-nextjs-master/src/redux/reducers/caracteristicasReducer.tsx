import { AccesibilidadModel } from "../../models/AccesibilidadModel";
import { caracteristicasActions } from "../actions/caracteristicasActions";
import { createSelector } from "reselect";

interface caracteristicasState {
  accesibilidades: Array<AccesibilidadModel> | null;
  loading: boolean;
  error: any;
}
interface ActioncaracteristicasActions {
  type: caracteristicasActions;
  payload: any;
}

const initialState: caracteristicasState = {
  loading: false,
  accesibilidades: null,
  error: "",
};

export default (
  state: any = initialState,
  action: ActioncaracteristicasActions
) => {
  switch (action.type) {
    case caracteristicasActions.LOADING_CARACTERISTICA:
      return {
        ...state,
        loading: action.payload,
      };
    case caracteristicasActions.GOTTEN_CARACTERISTICA:
      return {
        ...state,
        loading: false,
        accesibilidades: action.payload,
      };
    case caracteristicasActions.LOADING_CARACTERISTICA:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCaracteristicaState = createSelector(
  (state: any) => state.caracteristicasReducer,
  (caracteristicasReducer: caracteristicasState) =>
    caracteristicasReducer.accesibilidades
);
export const getLoadingCaracteristica = createSelector(
  (state: any) => state.caracteristicasReducer,
  (caracteristicasReducer: caracteristicasState) =>
    caracteristicasReducer.loading
);
export const getErrorCaracteristica = createSelector(
  (state: any) => state.caracteristicasReducer,
  (caracteristicasReducer: caracteristicasState) => caracteristicasReducer.error
);
