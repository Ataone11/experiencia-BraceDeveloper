import queryString from "query-string";
import axios from "axios";
import { ResponseModel, ResponseType } from "./responseData";
import { Auth } from "aws-amplify";

const path = process.env.NEXT_PUBLIC_BACKEND_URL

const baseHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const getData = async (
  url: string,
  params: Record<string, unknown>,
  additionalHeaders: any = {}
): Promise<any> => {
  const headers = { ...baseHeaders, ...additionalHeaders };
  const queryParams = Object.keys(params).length
    ? `?${queryString.stringify(params)}`
    : "";

  try {
    const credentials = await Auth.currentSession()
    if (credentials.getIdToken()?.getJwtToken()) {
      headers.Authorization = `Bearer ${credentials.getIdToken().getJwtToken()}`
    }
  } catch (error) {
    console.log(error);
  }

  const config = {
    method: `GET`,
    url: `${path}/${url}${queryParams}`,
    headers,
  };
  try {
    const response = await axios(config as any);
    return new ResponseModel({
      data: response.data,
      status: ResponseType.OK,
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    return new ResponseModel({
      data: error,
      status: ResponseType.ERROR,
      statusCode: 400,
    });
  }
};

export const postData = async (url: string, params: any, data: any) => {
  const headers: any = {
    "Content-Type": "application/json",
  };

  try {
    const credentials = await Auth.currentSession()
    if (credentials.getIdToken()?.getJwtToken()) {
      headers.Authorization = `Bearer ${credentials.getIdToken().getJwtToken()}`
    }
  } catch (error) {
    console.log(error);
  }

  let config = {
    method: "POST",
    url: `${path}/${url}${setParamsString(params)}`,
    headers,
    data,
  };


  try {
    let response = await axios(config);
    return new ResponseModel({
      data: response.data,
      status: ResponseType.OK,
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    return new ResponseModel({
      data: error,
      status: ResponseType.ERROR,
      statusCode: 400,
    });
  }
};

export const patchData = async (url: string, params: any, data: any) => {
  const headers: any = {
    "Content-Type": "application/json",
  };

  try {
    const credentials = await Auth.currentSession()
    if (credentials.getIdToken()?.getJwtToken()) {
      headers.Authorization = `Bearer ${credentials.getIdToken().getJwtToken()}`
    }
  } catch (error) {
    console.log(error);
  }

  let config = {
    method: "PATCH",
    url: `${path}/${url}${setParamsString(params)}`,
    headers,
    data,
  };


  try {
    let response = await axios(config);
    return new ResponseModel({
      data: response.data,
      status: ResponseType.OK,
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    return new ResponseModel({
      data: error,
      status: ResponseType.ERROR,
      statusCode: 400,
    });
  }
};

export const deleteData = async (
  url: string,
  params: Record<string, unknown>,
  token: string | null = null,
  additionalHeaders: any = {}
): Promise<any> => {
  const headers: any = { ...baseHeaders, ...additionalHeaders };
  const queryParams = Object.keys(params).length
    ? `?${queryString.stringify(params)}`
    : "";

  try {
    const credentials = await Auth.currentSession()
    if (credentials.getIdToken()?.getJwtToken()) {
      headers.Authorization = `Bearer ${credentials.getIdToken().getJwtToken()}`
    }
  } catch (error) {
    console.log(error);
  }

  const config = {
    method: `DELETE`,
    url: `${path}/${url}${queryParams}`,
    headers,
  };
  try {
    const response = await axios(config as any);
    return new ResponseModel({
      data: response.data,
      status: ResponseType.OK,
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    return new ResponseModel({
      data: error,
      status: ResponseType.ERROR,
      statusCode: 400,
    });
  }
};

const setParamsString = (params: any) => {
  let strParams = "";
  Object.keys(params).forEach((key, i) => {
    let value = params[key];
    if (typeof value === "object") {
      let options = "";
      value.forEach((opcion: any) => (options += opcion + ","));
      value = options;
    }
    if (i === 0) strParams += key + "=" + value;
    else strParams += "&" + key + "=" + value;
  });
  return strParams ? `?${params}` : "";
};
