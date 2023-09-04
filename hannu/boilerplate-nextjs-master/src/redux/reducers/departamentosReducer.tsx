import { DepartActions } from "../actions/departamentosActions";
import { DepartModel } from "../../models/DepatModel";
import { createSelector } from "reselect";

interface DState {
  departamentos: Array<DepartModel> | null;
  loading: boolean;
  error: any;
}
interface ActionD {
  type: DepartActions;
  payload: any;
}

const initialState: DState = {
  loading: false,
  departamentos: null,
  error: "",
};

export default (state: any = initialState, action: ActionD) => {
  switch (action.type) {
    case DepartActions.LOADING_DEPART:
      return {
        ...state,
        loading: action.payload,
      };
    case DepartActions.GOTTEN_DEPART:
      return {
        ...state,
        loading: false,
        departamentos: action.payload,
      };
    case DepartActions.ERROR_DEPART:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDepartamentosState = createSelector(
  (state: any) => state.departamentosReducer,
  (departamentosReducer: DState) => departamentosReducer.departamentos
);
export const getLoadingD = createSelector(
  (state: any) => state.departamentosReducer,
  (departamentosReducer: DState) => departamentosReducer.loading
);
export const getErrorD = createSelector(
  (state: any) => state.departamentosReducer,
  (departamentosReducer: DState) => departamentosReducer.error
);
