import { createSelector } from "reselect";
import { Categoria } from "../../models/categoria";
import { CATEGORIAS_ACTIONS } from "../actions/categoriasAction";

interface DState {
  categoria: Array<Categoria> | null;
  loading: boolean;
  error: any;
}
interface ActionD {
  type: CATEGORIAS_ACTIONS;
  payload: any;
}

const initialState: DState = {
  loading: false,
  categoria: null,
  error: "",
};

export const categoriaReducer = (state: any = initialState, action: ActionD) => {
  switch (action.type) {
    case CATEGORIAS_ACTIONS.GET_CATEGORIAS:
      return {
        ...state,
        categoria: action.payload,
      };
    default:
      return state;
  }
};

export const getCategoriaState = createSelector(
  (state: any) => state.categoriaReducer, // CampaniaReducer
  (categoriaReducer: any) => categoriaReducer.categoria, // Campanias
);

export default categoriaReducer