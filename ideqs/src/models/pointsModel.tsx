export interface Points {
  id: number
  imagen: string | null
  idCliente: number
  nombre: string
  direccion: string
  latitud: number
  longitud: number
  pais: string
  telefono1: string
  telefono2?: string
}
