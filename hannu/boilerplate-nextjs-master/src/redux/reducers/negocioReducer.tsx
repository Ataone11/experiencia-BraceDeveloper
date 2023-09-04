import { NegocioModel } from "../../models/NegocioModel";
import { createSelector } from "reselect";
import { NEGOCIOS_ACTIONS } from "../actions/negociosActions";

interface NegocioState {
  negocio: NegocioModel | null;
  loading: boolean;
  error: any;
}
interface ActionNegocio {
  type: NEGOCIOS_ACTIONS;
  payload: any;
}

const initialState: NegocioState = {
  loading: false,
  negocio: null,
  error: "",
};

export default (state: any = initialState, action: ActionNegocio) => {
  switch (action.type) {
    case NEGOCIOS_ACTIONS.CREATE_NEGOCIOS: {
      const negocio = action.payload;

      return {
        ...state,
        negocio,
      };
    }
    case NEGOCIOS_ACTIONS.GOTTEN_NEGOCIO: {
      const lugar: any = action.payload;

      return {
        ...state,
        loading: false,
        negocio: {
          ...(state.negocio || {}),
          [lugar.id]: lugar,
        },
      };
    }
    default:
      return state;
  }
};
export const getNegociosState = createSelector(
  (state: any) => state.negocioReducer,
  (negocioReducer: NegocioState) => negocioReducer.negocio
);

export const getLoadingNegocios = createSelector(
  (state: any) => state.negocioReducer,
  (negocioReducer: NegocioState) => negocioReducer.loading
);

export const getErrorNegocios = createSelector(
  (state: any) => state.negocioReducer,
  (negocioReducer: NegocioState) => negocioReducer.error
);

export const getNegocioById = createSelector(
  (state: any, id: string) => ({
    negocioReducer: state.negocioReducer,
    id,
  }),
  ({ negocioReducer, id }: any) => {
    if (!negocioReducer) return null;
    return negocioReducer.negocio && negocioReducer.negocio[id];
  }
);
