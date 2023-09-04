export interface Sucursal {
  id: number
  idCliente: number
  nombre: string
}

export interface ListSucursal {
  list: Sucursal[]
}
