import axios from "axios";
import { ResponseModel,ResponseType } from "../models/responseData";
import queryString from "query-string"
import { Planes} from "../models/Planes"
const baseHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

const API = "http://localhost:4000"
const url = "plan"
  
export const Planlist = async (): Promise<any> => {
  const config = {
    method: 'get',
    url:`${API}/${url}`
  }
  try {
    const response = await axios(config as any)
    return new ResponseModel({
      data: response.data, 
      status: ResponseType.OK,
      statusCode: 200
    })
  } catch (error) {
    console.log(error)
    return new ResponseModel({
      data: error,
      status: ResponseType.ERROR,
      statusCode: 400
    })
  }
}
export const getPlans = async () => {
  return await axios.get(`${API}/plans`);
};

export const getData = async (
    url: "plans",
    params: Record<string, unknown>,
    additionalHeaders: any = {},
    token: string | null = null
  ): Promise<any> => {
    const headers = { ...baseHeaders, ...additionalHeaders }
    const queryParams = Object.keys(params).length
      ? `?${queryString.stringify(params)}`
      : ''
  
    if (token) headers.Authorization = token
  
    const config = {
      method: 'get',
      url:`${API}/${url}${queryParams}`,
      headers
    }
    try {
      const response = await axios(config as any)
      return new ResponseModel({
        data: response.data,
        status: ResponseType.OK,
        statusCode: 200
      })
    } catch (error) {
      console.log(error)
      return new ResponseModel({
        data: error,
        status: ResponseType.ERROR,
        statusCode: 400
      })
    }
  }

  
  
