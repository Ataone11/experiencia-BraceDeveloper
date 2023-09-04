import { PlansActions } from "../actions/plansActions";
import { PlanModel } from "../models/PlanModel";
import { createSelector } from "reselect";

interface PlanState {
  plans: Array<PlanModel> | null,
  loading: boolean,
  error: any

}
interface ActionPlans{
  type: PlansActions,
  payload: any
}

const initialState: PlanState = {
  loading: false,
  plans: null,
  error: "",
};


export default (state = initialState, action: ActionPlans):PlanState => {
  switch (action.type) {
    case PlansActions.LOADING_PLANS:
      return {
        ...state,
        loading: action.payload,
      };
    case PlansActions.GOTTEN_PLANS:
      return {
        ...state,
        loading: false,
        plans: action.payload
      };
    case PlansActions.ERROR_PLANS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getPlansState = createSelector(
  (state:any)=> state.planReducer,
  (planReducer: PlanState)=> planReducer.plans
)
export const getLoadingPlans = createSelector(
  (state:any)=> state.planReducer,
  (planReducer: PlanState)=> planReducer.loading
)
export const getErrorPlans = createSelector(
  (state:any)=> state.planReducer,
  (planReducer: PlanState)=> planReducer.error
)