import queryString from "query-string"
import axios from "axios";
import { ResponseModel, ResponseType } from "../models/responseData";

const path = "http://localhost:4000"
const baseHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
export const getData = async (
    url: string,
    params: Record<string, unknown>,
    token: string | null = null,
    additionalHeaders: any = {},
  ): Promise<any> => {
    const headers = { ...baseHeaders, ...additionalHeaders }
    const queryParams = Object.keys(params).length
      ? `?${queryString.stringify(params)}`
      : ''
    if(token) headers.Authorization = token
    const config = {
      method: `get`,
      url:`${path}/${url}${queryParams}`,
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
