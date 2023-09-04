import { postData, getData } from "../../proxy/BackRest";
import { LugaresModel } from "../../models/LugaresModel";
import { ResponseType } from "../../models/responseData";

export enum NEGOCIOS_ACTIONS {
  CREATE_NEGOCIOS = "CREATE_NEGOCIOS",
  GOTTEN_NEGOCIO = "GOTTEN_NEGOCIO",
  ERROR_NEGOCIOS = "ERROR_NEGOCIOS",
}

export const createNegocio = async (negocio: any, dispatch: any) => {
  const response = await postData("lugares/negocio", {}, negocio);
  dispatch({
    type: NEGOCIOS_ACTIONS.CREATE_NEGOCIOS,
    payload: response,
  });
  return response;
};

export const getLugaresById = async (dispatch: any, id: string) => {
  dispatch({
    type: NEGOCIOS_ACTIONS.GOTTEN_NEGOCIO,
    payload: true,
  });

  const response = await getData(`lugares/${id}`, {});

  console.log(response);
  if (response.status === ResponseType.OK) {
    const lugar = response.data as LugaresModel;

    dispatch({
      type: NEGOCIOS_ACTIONS.GOTTEN_NEGOCIO,
      payload: lugar,
    });
  } else {
    dispatch({
      type: NEGOCIOS_ACTIONS.ERROR_NEGOCIOS,
      payload: "ERROR_LUGARES",
    });
  }
};
