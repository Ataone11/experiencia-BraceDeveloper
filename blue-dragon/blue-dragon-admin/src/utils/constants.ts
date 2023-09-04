import Account from "../../assets/Account";
import Changes from "../../assets/Changes";
import Pay from "../../assets/Pay";
import Proveedor from "../../assets/Proveedor";
import Security from "../../assets/Security";
import Shipments from "../../assets/Shipments";

export const S3_BUCKET_URL = "https://thru-dev.s3.amazonaws.com/";

export enum USER_ROLES {
  PROVIDER = 1,
  IMPORTER = 2,
  ADMIN = 3,
}

export enum PROVIDER_STATES {
  PENDIENTE = 1,
  APROBADO = 2,
  RECHAZADO = 3,
  ACTIVO = 4,
  INHABILITADO = 5,
}

export enum ORDERS {
  ASC = "ASC",
  DESC = "DESC",
}

export enum FEATURE_TYPE {
  NUMBER = 1,
  TEXT = 2,
  DISCRETE = 3,
}

/* --------------------------- */
export enum FOB_ORDER_STATES {
  ESPERANDO_PAGO = 1,
  ESPERANDO_CONFIRMACION = 2,
  ESPERANDO_ENVIO = 3,
  ENVIADO = 4,
  FINALIZADO = 5,
  RECHAZADO = 6,
}

export enum EXW_ORDER_STATES {
  ESPERANDO_PAGO = 7,
  ESPERANDO_CONFIRMACION = 8,
  ESPERANDO_ENTREGA = 9,
  FINALIZADO = 10,
  RECHAZADO = 11,
}

export enum INCOTERMS {
  EXW = 1,
  FOB = 2,
}

export const PENULTIMOS_STATES: any = {
  [INCOTERMS.EXW]: EXW_ORDER_STATES.ESPERANDO_ENTREGA,
  [INCOTERMS.FOB]: FOB_ORDER_STATES.ENVIADO,
};

export const ORDER_STATES: any = {
  [INCOTERMS.EXW]: EXW_ORDER_STATES,
  [INCOTERMS.FOB]: FOB_ORDER_STATES,
};

export const STATES_ORDER: { [key: number]: any } = {
  1: "Esperando pago",
  2: "Esperando confirmación",
  3: "Esperando envío",
  4: "Enviado",
  5: "Finalizado",
  6: "Rechazado",
  7: "Esperando pago",
  8: "Esperando confirmación",
  9: "Esperando entrega",
  10: "Finalizado",
  11: "Rechazado",
};

export const FAQ_TYPE = [
  {
    Icon: Pay,
    type: "Pago",
  },
  {
    Icon: Shipments,
    type: "Envíos",
  },
  {
    Icon: Security,
    type: "Seguridad",
  },
  {
    Icon: Account,
    type: "Cuenta",
  },
  {
    Icon: Proveedor,
    type: "Proveedores",
  },
  {
    Icon: Changes,
    type: "Cambios",
  },
];

export const FORGOT_PASSWORD_ERRORS: any = {
  ExpiredCodeException: 'El código que iha expirado, vuelvelo a solicitar',
  InvalidPasswordException:
      'La contraseña debe contener mayúsculas, por lo menos 8 caracteres y simbolos (@#.$)',
  LimitExceededException: 'Has excedido el límite de intentos',
  CodeMismatchException:
      'El código que ingresaste es incorrecto, inténtalo de nuevo',
  AuthError: 'Error de autenticación',
  GenericError: 'Intentalo de nuevo más tarde'
}

