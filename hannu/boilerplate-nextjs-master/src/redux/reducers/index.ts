import { combineReducers } from "redux";
import departamentosReducer from "./departamentosReducer";
import categoriaReducer from "./categoriaReducer";
import lugaresReducer from "./lugaresReducer";
import pendientesReducer from "./pendientesReducer";
import negocioReducer from "./negocioReducer";
import caracteristicasReducer from "./caracteristicasReducer";

const rootReducer = combineReducers({
    departamentosReducer,
    categoriaReducer,
    lugaresReducer,
    negocioReducer,
    pendientesReducer,
    caracteristicasReducer
});

export default rootReducer;
