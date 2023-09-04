export interface Client {
  id: number
  nombre: string
  nit: string
  correo: string
  direccion?: string
  telefono?: string
  logo?: string
}

export interface ListClients {
  ordenes: Client[]
}
