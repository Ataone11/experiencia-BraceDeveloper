import { Campaign } from "./campania";

export interface CampaignActive {
    id: number,
    terminada: boolean,
    puntos:number,
    fecha_inscripcion: Date|null,
    fecha_finalizacion: Date|null,
    estado: String|null,
    razon_rechazo_pantallazos: String|null,
    campaña: Campaign
}