import moment from "moment";
import {
  deleteData,
  getData,
  postData,
  patchData,
} from "../../proxy/BackendREST";

export const getCampanias = async (
  filters: any,
  pages: any,
  order: any,
  criterio: any,
  estados: any
): Promise<any> => {
  const params: any = {
    keyword: `${filters}`,
    page: pages,
    estado: estados,
  };

  if (order) {
    params.orden = order;
    params.criterioOrden = criterio;
  }

  const response = await getData("campanias", params);

  return response.data;
};

export const updateCampania = async (id: number, campaña: any): Promise<any> => {
  const formData = new FormData();

  delete campaña.ciudadesCampañas;
  delete campaña.imgCampaña;
  delete campaña.currentCiudades;
  delete campaña.ciudades;
  delete campaña.horarios;
  delete campaña.areaCampaña;

  Object.keys(campaña).forEach((key: string) => {

    if (campaña[key] === undefined || campaña[key] === null) return;

    if (["ciudadesBorrar", "ciudadesAgregar", "horariosBorrar", "horariosAgregar", "codigos"].includes(key)) {
      campaña[key].forEach((element: number) => {
        formData.append(key, element.toString());
      });
    } else if (key === "areaCampania") {
      formData.append(key, JSON.stringify([campaña[key]]));
    } else if (campaña[key] !== undefined && campaña[key] !== null) {
      formData.append(key, campaña[key]);
    }
  });
  const response = await patchData(`campanias/${id}`, {}, formData);
  return response;
};

export const getCampania = async (id: number): Promise<any> => {
  const response = await getData(`campanias/${id}`);
  return response.data;
};

export const getCampaignCodes = async (id: string): Promise<any> => {
  const response = await getData(`campanias/${id}/codigos`);
  return response.data;
};

export const crearCampaña = async (campaña: any): Promise<any> => {
  delete campaña.ciudadesBorrar;
  delete campaña.ciudadesAgregar;
  delete campaña.horariosBorrar;

  const formData = new FormData();
  Object.keys(campaña).forEach((key: string) => {
    console.log(key);
    if (["ciudades", "horarios", "codigos"].includes(key)) {
      campaña[key].forEach((element: number) => {
        formData.append(key, element + "");
      });
    } else if (key === "fechaCierreInscripciones") {
      formData.append(key, moment(campaña[key]).format("MM/DD/YYYY"));
    } else if (key === "areaCampania") {
      formData.append(key, JSON.stringify([campaña[key]]));
    } else if (campaña[key] !== null && campaña[key] !== undefined) {
      formData.append(key, campaña[key]);
    }
  });
  const response = await postData("campanias", {}, formData);
  return response;
};

export const deleteCampanias = async (id: number): Promise<any> => {
  return await deleteData(`campanias/${id}`);
};

export const aprobarPantallazos = async (id: number, idUsuario:number, pantallazo:any): Promise<any> => {
  const formData = new FormData();
  Object.keys(pantallazo).forEach((key: string) => {
    formData.append(key, pantallazo[key]);
  });
  return await patchData(`campania/${id}/usuarios/:${idUsuario}/revisar-pantallazos`,{},formData);
};
export const exportarCampania = async (id:any): Promise<any> => {
  return await getData(`campanias/${id}/exportar-amplifiers`,{});
};
