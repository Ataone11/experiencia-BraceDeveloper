import { combineReducers } from "redux";
import pageReducer from "./pageReducer";
import ciudadesReducer from "./ciudadesReducer"
import categoriaReducer from "./categoriaReducer";
import rifaReducer from "./rifaReducer";
import authReducer from "./authReducer";

export default combineReducers({
  pageReducer,
  ciudadesReducer,
  categoriaReducer,
  rifaReducer,
  authReducer
});
