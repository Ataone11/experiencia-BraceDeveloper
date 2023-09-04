export enum USER_CAMPAIGN_STATES {
    INSCRITO = 1,
    DEBO_PUBLICAR = 2,
    SUBIR_PANTALLAZOS = 3,
    PANTALLAZOS_EN_REVISION = 4,
    PANTALLAZOS_RECHAZADOS = 5,
    TERMINADA_SATISFACTORIAMENTE = 6,
    TERMINADA_INSATISFACTORIAMENTE = 7
}

export const USER_CAMPAIGN_STATES_NAMES: any = {
    [USER_CAMPAIGN_STATES.INSCRITO]: "Inscrito",
    [USER_CAMPAIGN_STATES.DEBO_PUBLICAR]: "Publicar",
    [USER_CAMPAIGN_STATES.SUBIR_PANTALLAZOS]: "Subir pantallazos",
    [USER_CAMPAIGN_STATES.PANTALLAZOS_EN_REVISION]: "Pantallazos en revisión",
    [USER_CAMPAIGN_STATES.PANTALLAZOS_RECHAZADOS]: "Pantallazos rechazados",
    [USER_CAMPAIGN_STATES.TERMINADA_SATISFACTORIAMENTE]: "Completada",
    [USER_CAMPAIGN_STATES.TERMINADA_INSATISFACTORIAMENTE]: "Sin terminar",
}