export interface AccesibilidadModel {
  id?: number;
  nombre: string;
  imagen: string;
  caracteristicas: CaracteristicaModel[];
}

export interface CaracteristicaModel {
  id: number;
  nombre: string;
  accesibilidadid: number;
}
