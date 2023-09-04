import { getData } from "../../proxy/BackendREST";
import { ResponseModel, ResponseType } from "../../proxy/responseData";
import { CategoriaModel } from "../../models/CategoriaModel";
export enum categoriaActions {
  LOADING_CATEGORIA = "categoriaReducer/loading",
  GOTTEN_CATEGORIA = "categoriaReducer/plans",
  ERROR_CATEGORIA = "categoriaReducer/error",
}
export const getCategorias = async (dispatch: any) => {
  dispatch({
    type: categoriaActions.LOADING_CATEGORIA,
    payload: true,
  });

  const response = await getData(
    `campanias/categorias`,
    { },
    null,
    
  );
  console.log("CATEGORIAS");

  console.log(response);
  if (response.status === ResponseType.OK) {
    const plans = response.data as CategoriaModel;
    dispatch({
      type: categoriaActions.GOTTEN_CATEGORIA,
      payload: plans,
    });
  } else {
    dispatch({
      type: categoriaActions.ERROR_CATEGORIA,
      payload: "ERROR_CATEGORIAS",
    });
  }
};
