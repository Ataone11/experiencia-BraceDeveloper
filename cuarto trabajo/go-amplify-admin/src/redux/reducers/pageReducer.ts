import { createSelector } from "reselect";
import { TestActionType } from "../actions/testActions";

interface StateParams {
  test: boolean;
}

const INITIAL_STATE: StateParams = {
  test: false,
};

const reducer = (state: StateParams = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TestActionType.test:
      return { ...state, test: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;

export const getTests = createSelector(
  (state: any) => state.pageReducer,
  (pageReducer: StateParams): boolean => {
    return pageReducer.test;
  }
);
