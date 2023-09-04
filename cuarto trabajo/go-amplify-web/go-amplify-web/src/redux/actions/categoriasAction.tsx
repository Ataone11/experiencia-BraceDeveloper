import { getData } from "../../proxy/BackendREST";
import { Categoria } from "../../models/categoria";
export enum CATEGORIAS_ACTIONS {
  GET_CATEGORIAS = "GET_CATEGORIAS",
}
export const getCategorias = async (dispatch: any) => {
  const response = await getData(
    `campanias/categorias`
  );

  const categorias: Categoria[] = response.data;
  dispatch({
    type: CATEGORIAS_ACTIONS.GET_CATEGORIAS,
    payload: categorias,
  });
};