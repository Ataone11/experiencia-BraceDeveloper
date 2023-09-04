import { CategoriaModel } from "../../models/CategoriaModel";
import { categoriaActions } from "../actions/categoriaActions";
import { createSelector } from "reselect";

interface DState {
  categorias: Array<CategoriaModel> | null;
  loading: boolean;
  error: any;
}
interface ActionD {
  type: categoriaActions;
  payload: any;
}

const initialState: DState = {
  loading: false,
  categorias: null,
  error: "",
};

export default (state: any = initialState, action: ActionD) => {
  switch (action.type) {
    case categoriaActions.LOADING_CATEGORIA:
      return {
        ...state,
        loading: action.payload,
      };
    case categoriaActions.GOTTEN_CATEGORIA:
      return {
        ...state,
        loading: false,
        categorias: action.payload,
      };
    case categoriaActions.LOADING_CATEGORIA:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCategoriaState = createSelector(
  (state: any) => state.categoriaReducer,
  (categoriaReducer: DState) => categoriaReducer.categorias
);
export const getLoadingCategoria = createSelector(
  (state: any) => state.categoriaReducer,
  (categoriaReducer: DState) => categoriaReducer.loading
);
export const getErrorCategoria = createSelector(
  (state: any) => state.categoriaReducer,
  (categoriaReducer: DState) => categoriaReducer.error
);
