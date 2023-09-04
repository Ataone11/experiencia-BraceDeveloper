import { LugaresModel } from "../../models/LugaresModel";
import { createSelector } from "reselect";
import { LUGARES_ACTIONS } from "../actions/lugaresActions";

interface LugarState {
  lugares: Array<LugaresModel> | null;
  lugaresCompletos: boolean;
  loading: boolean;
  error: any;
}
interface ActionLugar {
  type: LUGARES_ACTIONS;
  payload: any;
}

const initialState: LugarState = {
  loading: false,
  lugares: null,
  error: "",
  lugaresCompletos: false,
};

export default (state: any = initialState, action: ActionLugar) => {
  switch (action.type) {
    case LUGARES_ACTIONS.LOADING_LUGARES_PENDIENTES: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case LUGARES_ACTIONS.GOTTEN_LUGARES_PENDIENTES: {
      const lugares: any = {};
      const listaLugares = action.payload;
      listaLugares.forEach((lugar: any) => {
        lugares[lugar.id] = lugar;
      });

      return {
        ...state,
        loading: false,
        lugares,
        lugaresCompletos: true,
      };
    }
    case LUGARES_ACTIONS.EDITAR_LUGAR: {
      const { id, lugar } = action.payload;
      const lugares: any = state.lugares;
      debugger;

      return {
        ...state,
        loading: false,
        lugares: {
          ...lugares,
          [id]: lugar,
        },
      };
    }
    case LUGARES_ACTIONS.HABILITAR_RECHAZAR_LUGAR: {
      const { id, estado } = action.payload;

      return {
        ...state,
        loading: false,
        lugares: {
          ...state.lugares,
          [id]: {
            ...state.lugares[id],
            estado,
          },
        },
      };
    }
    case LUGARES_ACTIONS.ELIMINAR_LUGAR_PENDIENTE: {
      const { id } = action.payload;
      const lugares = state.lugares;
      delete lugares[id];

      return {
        ...state,
        lugares,
      };
    }
    case LUGARES_ACTIONS.GOTTEN_LUGAR_PENDIENTE: {
      const lugar: any = action.payload;

      return {
        ...state,
        loading: false,
        lugares: {
          ...(state.lugares || {}),
          [lugar.id]: lugar,
        },
      };
    }

    default:
      return state;
  }
};

export const getLugaresPendientesState = createSelector(
  (state: any) => state.pendientesReducer,
  (pendientesReducer: LugarState) => ({
    lugares: pendientesReducer.lugares
      ? Object.values(pendientesReducer.lugares)
      : null,
    lugaresCompletos: pendientesReducer.lugaresCompletos,
  })
);
export const getLoadingLugares = createSelector(
  (state: any) => state.pendientesReducer,
  (pendientesReducer: LugarState) => pendientesReducer.loading
);
export const getErrorLugares = createSelector(
  (state: any) => state.pendientesReducer,
  (pendientesReducer: LugarState) => pendientesReducer.error
);

export const getLugarPendienteById = createSelector(
  (state: any, id: string) => ({
    pendientesReducer: state.pendientesReducer,
    id,
  }),
  ({ pendientesReducer, id }: any) => {
    if (!pendientesReducer) return null;
    return pendientesReducer.lugares && pendientesReducer.lugares[id];
  }
);
