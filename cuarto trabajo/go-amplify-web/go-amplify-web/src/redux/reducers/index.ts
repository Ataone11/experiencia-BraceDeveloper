import { combineReducers } from "redux";
import pageReducer from "./pageReducer";
import rifaReducer from "./rifaReducer"
import authReducer from "./authReducer"
import categoriaReducer from "./categoriaReducer";

export default combineReducers({
  pageReducer,
  rifaReducer,
  authReducer,
  categoriaReducer,
});
