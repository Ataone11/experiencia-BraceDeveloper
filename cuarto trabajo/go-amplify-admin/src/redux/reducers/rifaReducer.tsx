import { Rifa } from "../../models/rifa";
import { RIFAS_ACTIONS } from "../actions/rifasAction";
import { createSelector } from "reselect";

interface State {
  rifas: Array<Rifa> | null;
  loading: boolean;
  error: any;
}
interface Action {
  type: RIFAS_ACTIONS;
  payload: any;
}

const initialState: State = {
  loading: false,
  rifas: null,
  error: "",
};

export const rifaReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case RIFAS_ACTIONS.GET_RIFAS:
      return {
        ...state,
        rifas: action.payload,
      };
    default:
      return state;
  }
};

export const getRifasState = createSelector(
  (state: any) => state.rifaReducer, // rifaReducer
  (rifaReducer: any) => rifaReducer.rifas, // rifas
);

export default rifaReducer