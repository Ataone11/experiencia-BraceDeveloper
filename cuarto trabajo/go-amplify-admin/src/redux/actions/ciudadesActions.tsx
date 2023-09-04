import { getData } from "../../proxy/BackendREST";
import { ResponseModel, ResponseType } from "../../proxy/responseData";
import { CiudadModel } from "../../models/CiudadModel";

export enum CiudadActions {
  LOADING_CIUDAD = "ciudadReducer/loading",
  GOTTEN_CIUDAD = "ciudadReducer/plans",
  ERROR_CIUDAD = "ciudadReducer/error",
}
export const getCiudad = async (dispatch: any) => {
  dispatch({
    type: CiudadActions.LOADING_CIUDAD,
    payload: true,
  });

  const response = await getData(
    `paises/ciudades`,
    {},
    null
  );
  
  console.log(response);
  if (response.status === ResponseType.OK) {
    const plans = response.data as CiudadModel;
    dispatch({
      type: CiudadActions.GOTTEN_CIUDAD,
      payload: plans,
    });
  } else {
    dispatch({
      type: CiudadActions.ERROR_CIUDAD,
      payload: "ERROR_CIUDAD",
    });
  }
};
