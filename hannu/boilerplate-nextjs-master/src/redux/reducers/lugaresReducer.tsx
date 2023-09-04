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
    case LUGARES_ACTIONS.LOADING_LUGARES: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case LUGARES_ACTIONS.GOTTEN_LUGARES: {
      const lugares: any = {};
      const listaLugares = action.payload;
      listaLugares.forEach((lugar: any) => {
        lugares[lugar.id] = lugar;
      });

      return {
        ...state,
        loading: false,
        lugares,
      };
    }
    case LUGARES_ACTIONS.GOTTEN_LUGAR: {
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

    case LUGARES_ACTIONS.LOADING_LUGARES: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case LUGARES_ACTIONS.DELETE_LUGAR: {
      const idLugar = action.payload;
      const lugares: any = { ...state.lugares };
      delete lugares[idLugar];

      return {
        ...state,
        loading: false,
        lugares,
      };
    }
    case LUGARES_ACTIONS.OCULTAR_HABILITAR_LUGAR: {
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
    case LUGARES_ACTIONS.CREAR_LUGAR: {
      const lugar = action.payload;

      return {
        ...state,
        lugares: {
          ...state.lugares,
          [lugar.id]: lugar,
        },
      };
    }
    default:
      return state;
  }
};

export const getLugaresState = createSelector(
  (state: any) => state.lugaresReducer,
  (lugaresReducer: LugarState) => ({
    lugares: lugaresReducer.lugares
      ? Object.values(lugaresReducer.lugares)
      : null,
    lugaresCompletos: lugaresReducer.lugaresCompletos,
  })
);

export const getLoadingLugares = createSelector(
  (state: any) => state.lugaresReducer,
  (lugaresReducer: LugarState) => lugaresReducer.loading
);

export const getErrorLugares = createSelector(
  (state: any) => state.lugaresReducer,
  (lugaresReducer: LugarState) => lugaresReducer.error
);

export const getLugarActivoById = createSelector(
  (state: any, id: string) => ({
    lugaresReducer: state.lugaresReducer,
    id,
  }),
  ({ lugaresReducer, id }: any) => {
    if (!lugaresReducer) return null;
    return lugaresReducer.lugares && lugaresReducer.lugares[id];
  }
);
