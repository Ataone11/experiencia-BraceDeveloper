import { ESTADOS_LUGAR } from "../../enums/estados.enum";
import { AccesibilidadModel } from "../../models/AccesibilidadModel";
import { LugaresModel } from "../../models/LugaresModel";
import { ResponseType } from "../../models/responseData";
import {
  deleteData,
  getData,
  postData,
  putData,
  patchData,
} from "../../proxy/BackRest";

export enum LUGARES_ACTIONS {
  CREATE_LUGAR = "CREATE_LUGAR",
  DELETE_LUGAR = "DELETE_LUGAR",
  LOADING_LUGARES = "LOADING_LUGARES",
  LOADING_LUGARES_PENDIENTES = "LOADING_LUGARES_PENDIENTES",
  GOTTEN_LUGARES = "GOTTEN_LUGARES",
  GOTTEN_LUGARES_PENDIENTES = "GOTTEN_LUGARES_PENDIENTES",
  ERROR_LUGARES = "ERROR_LUGARES",
  ERROR_LUGARES_PENDIENTES = "ERROR_LUGARES_PENDIENTES",
  OCULTAR_HABILITAR_LUGAR = "OCULTAR_HABILITAR_LUGAR",
  HABILITAR_RECHAZAR_LUGAR = "HABILITAR_RECHAZAR_LUGAR",
  ELIMINAR_LUGAR_PENDIENTE = "ELIMINAR_LUGAR_PENDIENTE",
  CREAR_LUGAR = "CREAR_LUGAR",
  EDITAR_LUGAR = "EDITAR_LUGAR",
  GOTTEN_LUGAR = "GOTTEN_LUGAR",
  GOTTEN_LUGAR_PENDIENTE = "GOTTEN_LUGAR_PENDIENTE",
}

export const createLugar = async (lugar: any, dispatch: any) => {
  const formData = new FormData();
  Object.keys(lugar).forEach((key: string) => {
    console.log(key);
    if (key === "medias") {
      lugar[key].forEach((element: File) => {
        formData.append(key, element);
      });
    } else if (key === "accesibilidades") {
      lugar[key].forEach((accecibilidad: any) => {
        accecibilidad.caracteristicas?.forEach((caracteristica: number) => {
          formData.append("caracteristicas", caracteristica + "");
        });
      });
    } else if (lugar[key]) {
      formData.append(key, lugar[key]);
    }
  });

  const response = await postData("lugares", {}, formData);
  dispatch({
    type: LUGARES_ACTIONS.CREATE_LUGAR,
    payload: response,
  });
};

export const editarLugarById = async (lugar: any, dispatch: any) => {
  const url = `lugares/${lugar.id}`;
  delete lugar.estado;
  delete lugar.comentarios;
  delete lugar.fechaRegistro;

  const formData = new FormData();
  Object.keys(lugar).forEach((key: string) => {
    if (key === "medias" || key === "mediasBorrar") {
      lugar[key].forEach((element: File) => {
        formData.append(key, element);
      });
    } else if (key === "accesibilidades") {
      lugar[key].forEach((accecibilidad: any) => {
        accecibilidad.caracteristicas?.forEach((caracteristica: number) => {
          formData.append("caracteristicas", caracteristica + "");
        });
      });
    } else {
      formData.append(key, lugar[key]);
    }
  });
  debugger;
  console.log(formData);
  const res = await patchData(url, {}, formData);

  if (res.status === ResponseType.ERROR) {
    return res.data.response.data;
  } else {
    dispatch({
      type: LUGARES_ACTIONS.EDITAR_LUGAR,
      payload: { lugar: res.data, id: lugar.id },
    });
  }
};

export const deleteLugarById = async (id: number, dispatch: any) => {
  await deleteData(`lugares/${id}`, {}, null, {});
  dispatch({
    type: LUGARES_ACTIONS.DELETE_LUGAR,
    payload: id,
  });
};
export const ocultarHabilitarLugarById = async (lugar: any, dispatch: any) => {
  const url =
    lugar.estado === ESTADOS_LUGAR.OCULTO
      ? `lugares/${lugar.id}/habilitar`
      : `lugares/${lugar.id}/ocultar`;
  const res = await putData(url, {}, {});

  if (res.status === ResponseType.ERROR) {
    return res.data.response.data;
  } else {
    dispatch({
      type: LUGARES_ACTIONS.OCULTAR_HABILITAR_LUGAR,
      payload: res.data,
    });
  }
};

export const habilitarLugarById = async (lugar: any, dispatch: any) => {
  const url = `lugares/${lugar.id}/habilitar`;
  const res = await putData(url, {}, {});

  if (res.status === ResponseType.ERROR) {
    return res.data.response.data;
  } else {
    dispatch({
      type: LUGARES_ACTIONS.CREAR_LUGAR,
      payload: res.data,
    });

    dispatch({
      type: LUGARES_ACTIONS.ELIMINAR_LUGAR_PENDIENTE,
      payload: res.data,
    });
  }
};

export const rechazarLugarById = async (lugar: any, dispatch: any) => {
  const url = `lugares/${lugar.id}/rechazar`;
  const res = await putData(url, {}, {});

  if (res.status === ResponseType.ERROR) {
    return res.data.response.data;
  } else {
    dispatch({
      type: LUGARES_ACTIONS.ELIMINAR_LUGAR_PENDIENTE,
      payload: res.data,
    });
  }
};
export const getPendientes = async (dispatch: any) => {
  dispatch({
    type: LUGARES_ACTIONS.LOADING_LUGARES_PENDIENTES,
    payload: true,
  });

  const response = await getData(
    `lugares`,
    {
      estados: ESTADOS_LUGAR.PENDIENTE,
    },
    null,
    {}
  );

  console.log(response);
  if (response.status === ResponseType.OK) {
    const plans = response.data as LugaresModel;
    dispatch({
      type: LUGARES_ACTIONS.GOTTEN_LUGARES_PENDIENTES,
      payload: plans,
    });
  } else {
    dispatch({
      type: LUGARES_ACTIONS.ERROR_LUGARES_PENDIENTES,
      payload: "ERROR_PLANES",
    });
  }
};
export const getLugares = async (dispatch: any, nombre: string) => {
  dispatch({
    type: LUGARES_ACTIONS.LOADING_LUGARES,
    payload: true,
  });

  const response = await getData(
    `lugares`,
    {
      estados: `${ESTADOS_LUGAR.OCULTO},${ESTADOS_LUGAR.APROBADO}`,
      nombre: `${nombre}`,
    },
    null,
    {}
  );

  console.log(response);
  if (response.status === ResponseType.OK) {
    const plans = response.data as LugaresModel;
    dispatch({
      type: LUGARES_ACTIONS.GOTTEN_LUGARES,
      payload: plans,
    });
  } else {
    dispatch({
      type: LUGARES_ACTIONS.ERROR_LUGARES,
      payload: "ERROR_PLANES",
    });
  }
};
export const getLugaresById = async (dispatch: any, id: string) => {
  dispatch({
    type: LUGARES_ACTIONS.LOADING_LUGARES,
    payload: true,
  });

  const response = await getData(`lugares/${id}`, {});

  console.log(response);
  if (response.status === ResponseType.OK) {
    const lugar = response.data as LugaresModel;

    if (
      lugar.estado === ESTADOS_LUGAR.APROBADO ||
      lugar.estado === ESTADOS_LUGAR.OCULTO
    ) {
      dispatch({
        type: LUGARES_ACTIONS.GOTTEN_LUGAR,
        payload: lugar,
      });
    } else if (lugar.estado === ESTADOS_LUGAR.PENDIENTE) {
      dispatch({
        type: LUGARES_ACTIONS.GOTTEN_LUGAR_PENDIENTE,
        payload: lugar,
      });
    }
  } else {
    dispatch({
      type: LUGARES_ACTIONS.ERROR_LUGARES,
      payload: "ERROR_LUGARES",
    });
  }
};
export const changeoculto = async (dispatch: any) => {
  dispatch({
    type: LUGARES_ACTIONS.LOADING_LUGARES,
    payload: true,
  });

  const response = await getData(
    `lugares`,
    { estados: `${ESTADOS_LUGAR.APROBADO},${ESTADOS_LUGAR.OCULTO}` },
    null,
    {}
  );

  console.log(response);
  if (response.status === ResponseType.OK) {
    const plans = response.data as LugaresModel;
    dispatch({
      type: LUGARES_ACTIONS.GOTTEN_LUGARES,
      payload: plans,
    });
  } else {
    dispatch({
      type: LUGARES_ACTIONS.ERROR_LUGARES,
      payload: "ERROR_PLANES",
    });
  }
};
