export interface Campaign {
    id: number;
    titulo: string;
    marca: string;
    cupos: number;
    estado: string|null;
    puntos: number;
    requisitos: string|null;
    instruciones: string|null;
    muestra: string|null;
    imgMuestra: string|null;
    codigoUnico: string|null;
    fechaCreacion: string|null;
    fechaCierreInscripcion: string|null;
    puntosAsignados: number|null;
    urlInstagram: string|null;
    descripcion: string|null;
    imgCampania: string|null;
    areaCampaña: string|null;
    materialGrafico: string|null;
}