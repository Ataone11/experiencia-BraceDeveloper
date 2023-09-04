import { getData } from "../../proxy/BackendREST";


export enum CAMPANIAS_ACTIVE_ACTIONS {
    GET_CAMPANIAS_ACTIVE = "GET_CAMPANIAS_ACTIVE",
}

export const getCampaignsActives = async () => {
  const response = await getData(
    `usuarios/mis-datos`
  );

  const res = response.data.campañasActivas;
  
  return res
};
