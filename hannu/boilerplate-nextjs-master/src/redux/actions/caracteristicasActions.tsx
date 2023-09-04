import { getData } from "../../proxy/BackRest";
import { ResponseModel, ResponseType } from "../../models/responseData";
import { AccesibilidadModel } from "../../models/AccesibilidadModel";
export enum caracteristicasActions {
  LOADING_CARACTERISTICA = "caracteristicaReducer/loading",
  GOTTEN_CARACTERISTICA = "caracteristicaReducer/caracteristica",
  ERROR_CARACTERISTICA = "caracteristicaReducer/error",
}
export const getCaracteristicas = async (dispatch: any) => {
  dispatch({
    type: caracteristicasActions.LOADING_CARACTERISTICA,
    payload: true,
  });

  const response = await getData(`lugares/accesibilidades`, {}, null, {});
  console.log("accecibilidades");

  console.log(response);
  if (response.status === ResponseType.OK) {
    const plans = response.data as AccesibilidadModel[];
    dispatch({
      type: caracteristicasActions.GOTTEN_CARACTERISTICA,
      payload: plans,
    });
  } else {
    dispatch({
      type: caracteristicasActions.ERROR_CARACTERISTICA,
      payload: "ERROR_CARACTERISTICA",
    });
  }
};
