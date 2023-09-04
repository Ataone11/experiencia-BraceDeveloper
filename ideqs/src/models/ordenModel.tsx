export interface OrdenModel {
  id: number
  fisica: number
  idmobile: number
  pdf: number
  sucursal: any
  idPlantilla: string
  observacion: string
  nombreExcelexcel: string
  comprimido: string
  cantidad: number
  tomador: string
  poliza: string
  referencia: string
  estado: number
  idCliente?: number
  nombreCliente: string
  nombreSucursal: string
  fecha?: string
}

interface LinkTable {
  link: boolean
  text: string
  href: string
}
export interface OrdenModelTable {
  id: LinkTable
  idCliente: number
  fisica: number
  cantidad: number
  tomador: string
  poliza: string
  estado: string
  color: string
}

export interface OrdenModelTableRequest {
  id: LinkTable
  Cliente?: string
  Sucursal: string
  Cantidad: number | string
  Poliza: string
  Fecha: string
  Tipo: string
  Tomador?: string
  Estado: string
  color?: string
}
