import { combineReducers } from "redux";
import  planReducer  from "./plansReducer";

const rootReducer = combineReducers({
  planReducer,
});

export default rootReducer;
