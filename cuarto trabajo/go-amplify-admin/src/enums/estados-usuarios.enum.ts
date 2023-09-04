export enum ESTADOS_USUARIOS {
    COMPLETANDO_REGISTRO = 1,
    ESPERANDO_APROBACION = 2,
    SELECCION_INTERESES = 3,
    ACTIVO = 4,
    RECHAZADO = 5,
    OCULTO = 6
}

export const USERS_STATES_NAMES: any = {
  [ESTADOS_USUARIOS.SELECCION_INTERESES]: {
    key: ESTADOS_USUARIOS.SELECCION_INTERESES,
    estado: "Seleccionando Intereses",
  },
  [ESTADOS_USUARIOS.COMPLETANDO_REGISTRO]: {
    key: ESTADOS_USUARIOS.COMPLETANDO_REGISTRO,
    estado: "Completando Registro",
  },
    [ESTADOS_USUARIOS.ESPERANDO_APROBACION]: {
      key: ESTADOS_USUARIOS.ESPERANDO_APROBACION,
      estado: "Solicitud Amplifier",
    },
    [ESTADOS_USUARIOS.ACTIVO]: {
      key: ESTADOS_USUARIOS.ACTIVO,
      estado: "Amplifier activo",
    },
    [ESTADOS_USUARIOS.RECHAZADO]: {
      key: ESTADOS_USUARIOS.RECHAZADO,
      estado: "Amplifier rechazado",
    },
    [ESTADOS_USUARIOS.OCULTO ]: {
      key: ESTADOS_USUARIOS.OCULTO ,
      estado: "Amplifier oculto",
    },
  }