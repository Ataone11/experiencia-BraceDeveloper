import { getData } from "../../proxy/BackendREST";
import { ResponseModel, ResponseType } from "../../models/responseData";
import { Rifa } from "../../models/rifa";
export enum RIFAS_ACTIONS {
  GET_RIFAS = "GET_RIFAS",
}
export const getRifas = async (dispatch: any) => {
  const response = await getData(
    `rifas`
  );

  const rifas: Rifa[] = response.data;
  dispatch({
    type: RIFAS_ACTIONS.GET_RIFAS,
    payload: rifas,
  });
};

const rifas = [{ "id": 1, "nombre": "Nombre rifa mensual", "fecha": "2020-12-12T00:00:00.000Z", "tipo": "SEMANAL", "imagen": null }, { "id": 2, "nombre": "Nombre rifa semestral", "fecha": "2015-12-12T00:00:00.000Z", "tipo": "SEMESTRAL", "imagen": null }, { "id": 3, "nombre": "Nombre rifa anual", "fecha": "2018-12-12T00:00:00.000Z", "tipo": "ANUAL", "imagen": null }]