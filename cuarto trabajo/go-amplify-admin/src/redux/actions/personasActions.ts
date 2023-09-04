import moment from "moment";
import {
  getData,
  patchData,
  putData
} from "../../proxy/BackendREST";

export const getPersonasInscritas = async (
  id: any,
  filters: any,
  pages: any,
  order: any,
  criterio: any,
  porRevisar: any
): Promise<any> => {
  const params: any = {
    keyword: `${filters}`,
    page: pages,
    take: 10,
  };

  if (order) {
    params.orden = order;
    params.criterioOrden = criterio;
  }

  if (porRevisar) {
    params.porRevisar = porRevisar;
  }

  const response = await getData(`campanias/${id}/personas-inscritas`, params);

  return response.data;
};

export const getCampañasPersona = async (
  id: any,
  filters: string,
  pages: any,
  order: any,
  criterio: any,
  estado: any
): Promise<any> => {
  const params: any = {
    keyword: `${filters}`,
    estado: estado,
    page: pages,
    take: 10,
  };

  if (order) {
    params.orden = order;
    params.criterioOrden = criterio;
  }

  const response = await getData(`usuarios/${id}/campanias-actuales`, params);

  return response.data;
};

export const getPersonas = async (
  filters: any,
  pages: any,
  order: any,
  criterio: any,
  estado: any
): Promise<any> => {
  const params: any = {
    keyword: `${filters}`,
    page: pages,
    take: 10,
    estado: estado
  };

  if (order) {
    params.orden = order;
    params.criterioOrden = criterio;
  }

  const response = await getData(`usuarios`, params);

  return response.data;
};
export const usuarioFind = async (id: number): Promise<any> => {
  const response = await getData(`usuarios/${id}`, {}, {});
  return response.data;
};

export const aprobarUsuario = async (id: number): Promise<any> => {
  const response = await putData(`usuarios/${id}/aprobar`, {}, {});
  return response.data;
};

export const activarUsuario = async (id: number): Promise<any> => {
  const response = await putData(`usuarios/${id}/activar`, {}, {});
  return response.data;
};

export const ocultarUsuario = async (id: number): Promise<any> => {
  const response = await putData(`usuarios/${id}/ocultar`, {}, {});
  return response.data;
};

export const rechazarUsuario = async (id: number): Promise<any> => {
  const response = await putData(`usuarios/${id}/rechazar`, {}, {});
  return response.data;
};

export const estadoPantallazo = async (id: number, userId: any, data: any): Promise<any> => {
  const formData = new FormData();
  Object.keys(data).forEach((key: string) => {
    formData.append(key, data[key]);
  });
  return await patchData(`campanias/${id}/usuarios/${userId}/revisar-pantallazos`, {}, data);
};

export const updateInstagram = async (id: number, data: any): Promise<any> => {
  const formData = new FormData();
  Object.keys(data).forEach((key: string) => {
    formData.append(key, data[key]);
  });
  return await patchData(`usuarios/${id}/corregir-instagram`, {}, data);
};
export const exportarUsuario = async (): Promise<any> => {
  return await getData(`usuarios/exportar`, {});
};
