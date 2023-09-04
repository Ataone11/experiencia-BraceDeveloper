/* eslint-disable no-unused-vars */

import axios from 'axios'
import { Auth } from 'aws-amplify'
import queryString from 'query-string'
import { ResponseModel, ResponseType } from './responseData'
import { UNAUTHORIZED } from '../utils/constants'

const AUTH_PORT = parseInt(process.env.NEXT_PUBLIC_BACKEND_AUTH_PORT ?? '0')
const BUSINESS_PORT = parseInt(
  process.env.NEXT_PUBLIC_BACKEND_BUSINESS_PORT ?? '0'
)
const MOBILE_PORT = parseInt(process.env.NEXT_PUBLIC_BACKEND_MOBILE_PORT ?? '0')
const REPORTE_PORT = parseInt(
  process.env.NEXT_PUBLIC_BACKEND_REPORTE_PORT ?? '0'
)

export enum PORTS {
  AUTH = AUTH_PORT,
  BUSINESS = BUSINESS_PORT,
  MOBILE = MOBILE_PORT,
  REPORTE = REPORTE_PORT
}
const path = process.env.NEXT_PUBLIC_BACKEND_URL

const baseHeaders = {
  Accept: '*/*',
  'Content-Type': 'application/json'
}

const generateHeaders = async (
  token: boolean,
  additionalHeaders: Record<string, string>
) => {
  let credentials
  let id

  const headers: Record<string, string> = {
    ...baseHeaders,
    ...additionalHeaders
  }
  try {
    credentials = await Auth.currentSession()
    id = await Auth.currentUserInfo()
    const dataUser = await Auth.currentUserInfo()
    id = dataUser.username

    if (
      !id ||
      (credentials && !credentials.getIdToken()?.getJwtToken() && token)
    ) {
      throw new Error(UNAUTHORIZED)
    }

    if (credentials) {
      headers.Authorization = `Bearer ${credentials.getIdToken().getJwtToken()}`
    }
    if (id) {
      headers.id = id
    }
    return headers
  } catch (error) {}
  return headers
}

export const generateToken = async () => {
  let credentials
  let id
  try {
    credentials = await Auth.currentSession()
    id = await Auth.currentUserInfo()
    const dataUser = await Auth.currentUserInfo()
    id = dataUser.username

    if (!id || (credentials && !credentials.getIdToken()?.getJwtToken())) {
      throw new Error(UNAUTHORIZED)
    }
    if (credentials) {
      console.log('**********************')
      console.log('**********************')
      console.log(`${credentials.getIdToken().getJwtToken()}`)
      console.log('**********************')
      console.log('**********************')
    }
  } catch (error) {}
}

export const getData = async (
  url: string,
  params: Record<string, unknown> = {},
  port: PORTS = PORTS.AUTH,
  token = true,
  additionalHeaders: any = {}
): Promise<any> => {
  const queryParams = Object.keys(params).length
    ? `?${queryString.stringify(params)}`
    : ''

  const headers = await generateHeaders(token, additionalHeaders)

  const config = {
    method: `GET`,
    url: `${path}:${port}/${url}${queryParams}`,
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
    return new ResponseModel({
      data: error,
      status: ResponseType.ERROR,
      statusCode: 400
    })
  }
}

export const postData = async (
  url: string,
  params: any,
  port: PORTS = PORTS.AUTH,
  data: any,
  token = true,
  additionalHeaders: any = {}
): Promise<any> => {
  const headers = await generateHeaders(token, additionalHeaders)

  const config = {
    method: 'POST',
    url: `${path}:${port}/${url}${setParamsString(params)}`,
    headers,
    data
  }

  try {
    const response = await axios(config)
    return new ResponseModel({
      data: response.data,
      status: ResponseType.OK,
      statusCode: 200
    })
  } catch (error) {
    return new ResponseModel({
      data: error,
      status: ResponseType.ERROR,
      statusCode: 400
    })
  }
}

export const patchData = async (
  url: string,
  params: any,
  port: PORTS = PORTS.AUTH,
  data: any,
  token = true,
  additionalHeaders: any = {}
): Promise<any> => {
  const headers = await generateHeaders(token, additionalHeaders)

  const config = {
    method: 'PATCH',
    url: `${path}:${port}/${url}${setParamsString(params)}`,
    headers,
    data
  }

  try {
    const response = await axios(config)
    return new ResponseModel({
      data: response.data,
      status: ResponseType.OK,
      statusCode: 200
    })
  } catch (error) {
    return new ResponseModel({
      data: error,
      status: ResponseType.ERROR,
      statusCode: 400
    })
  }
}

export const deleteData = async (
  url: string,
  params: Record<string, unknown>,
  port: PORTS = PORTS.AUTH,
  token = true,
  additionalHeaders: any = {}
): Promise<any> => {
  const queryParams = Object.keys(params).length
    ? `?${queryString.stringify(params)}`
    : ''

  const headers = await generateHeaders(token, additionalHeaders)

  const config = {
    method: `DELETE`,
    url: `${path}:${port}/${url}${queryParams}`,
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
    return new ResponseModel({
      data: error,
      status: ResponseType.ERROR,
      statusCode: 400
    })
  }
}

const setParamsString = (params: any) => {
  let strParams = ''
  Object.keys(params).forEach((key, i) => {
    let value = params[key]
    if (typeof value === 'object') {
      let options = ''
      value.forEach((opcion: any) => (options += opcion + ','))
      value = options
    }
    if (i === 0) strParams += key + '=' + value
    else strParams += '&' + key + '=' + value
  })
  return strParams ? `?${params}` : ''
}
