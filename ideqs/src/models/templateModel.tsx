export interface Campo {
  nombreCampoExcel: string
  orden: number
  nombreCampoPlantilla: string
  obligatorio: number
}

export interface Template {
  id: number
  jasper: string
  excel: string
  diseno: string
  caraA: string
  caraB: string
  nombrePlantilla: string
  idCliente?: any
  tipo: string
  user: string
  fecha: string
  campos: Campo[]
  activo: number
}
