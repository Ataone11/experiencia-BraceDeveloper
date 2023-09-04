export const S3_BUCKET_URL = "https://go-amplify-dev.s3.amazonaws.com/";

export const MAX_IMAGE_SIZE = 1000000;
export const OK = "OK";
export const ERROR = "ERROR";
export const UNAUTHORIZED = 'UNAUTHORIZED';


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

export enum USER_ROLES {
    ADMIN = 0,
    AMPLIFIER = 1
}