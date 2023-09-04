import { Auth } from "aws-amplify";
import { getData } from "../../proxy/BackendREST";
import { ORDERS } from "../../utils/orders";


export enum CAMPANIAS_ACTIONS {
  GET_CAMPANIAS = "GET_CAMPANIAS",
}
export const getCampaigns = async (page: number, categories: number[], keyword: string | null, date: string[] | null, criterioOrden?: number | null, order?: number | null) => {
  let params: any = {
    take: 16,
    page: page,
  };
  switch (criterioOrden) {
    case 1:// fecha_publicacion
      if (date && date[0])
        params.fechaPublicacionInicio = new Date(date[0])
      if (date && date[1])
        params.fechaPublicacionFinal = new Date(date[1])
      break;
    case 2:// fechaCierreInscripciones
      if (date && date[0])
        params.fechaInscripcionInicio = new Date(date[0])
      if (date && date[1])
        params.fechaInscripcionFinal = new Date(date[1])
      break;

  }

  switch (order) {
    case 0:
      params.criterioOrden = 'fechaCierreInscripciones';
      params.orden = ORDERS.ASC;
      break;
    case 1:
      params.criterioOrden = 'fechaCierreInscripciones';
      params.orden = ORDERS.DESC;
      break;
    case 2:
      params.criterioOrden = 'fecha_publicacion';
      params.orden = ORDERS.ASC;
      break;
    case 3:
      params.criterioOrden = 'fecha_publicacion';
      params.orden = ORDERS.DESC;
      break;

  }
  if (keyword)
    params.keyword = keyword
  let categoriesIdsQuery = "";

  categories.forEach((id: number, index: number) => {
    categoriesIdsQuery += `&categorias=${id}`
  })

  await Auth.currentSession()
  const { attributes } = await Auth.currentAuthenticatedUser()

  const response = await getData(
    `usuarios/campanias-recomendadas`,
    params,
    null,
    {},
    categoriesIdsQuery
  );

  const res = response.data;
  return res;
};
