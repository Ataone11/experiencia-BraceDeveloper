import { createSelector } from "reselect";
import { TestActionType } from "../actions/testActions";

interface StateParams {
  loading: boolean;
}

const INITIAL_STATE: StateParams = {
  loading: false,
};

const reducer = (state: StateParams = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TestActionType.loading:
      return { ...state, loading: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;

export const selectLoadingSatate = createSelector(
  (state: any) => state.pageReducer,
  (pageReducer: StateParams): boolean => {
    return pageReducer.loading;
  }
);
