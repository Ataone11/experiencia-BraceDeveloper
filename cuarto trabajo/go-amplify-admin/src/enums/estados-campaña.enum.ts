export enum ESTADOS_CAMPAÑA {
  INSCRIPCIONES = 1,
  EN_PROCESO = 2,
  TERMINADA = 3,
  ELIMINADA = 4
}

export const CAMPAIGN_STATES_NAMES: any = {
  [ESTADOS_CAMPAÑA.INSCRIPCIONES]: {
    key: ESTADOS_CAMPAÑA.INSCRIPCIONES,
    estado: "Inscripciones",
  },
  [ESTADOS_CAMPAÑA.EN_PROCESO]: {
    key: ESTADOS_CAMPAÑA.EN_PROCESO,
    estado: "En proceso",
  },
  [ESTADOS_CAMPAÑA.TERMINADA]: {
    key: ESTADOS_CAMPAÑA.TERMINADA,
    estado: "Terminada",
  },
  [ESTADOS_CAMPAÑA.ELIMINADA]: {
    key: ESTADOS_CAMPAÑA.ELIMINADA,
    estado: "Eliminada",
  },
}