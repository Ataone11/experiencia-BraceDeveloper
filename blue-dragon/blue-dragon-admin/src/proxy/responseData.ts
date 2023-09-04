/* eslint-disable no-unused-vars */
export enum ResponseType {
  OK = 'OK',
  ERROR = 'ERROR'
}

export class ResponseModel {
  data: any
  status: ResponseType
  statusCode: number

  constructor(info: { data: any; status: ResponseType; statusCode: number }) {
    this.data = info.data
    this.status = info.status
    this.statusCode = info.statusCode
  }
}
