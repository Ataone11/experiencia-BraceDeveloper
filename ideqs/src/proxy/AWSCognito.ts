import { Auth } from 'aws-amplify'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { ERROR, OK } from '../utils/constants'

export const SIGN_UP_ERRORS: any = {
  UsernameExistsException: 'Ya existe  este usuario',
  InvalidPasswordException:
    'La contraseña debe contener mayúsculas, por lo menos 8 caracteres y simbolos (@#.$)',
  CodeMismatchException:
    'El código que ingresaste es incorrecto, inténtalo de nuevo',
  NotAuthorizedException: 'El correo o la contraseña son incorrectos',
  TooManyRequestsException: 'Has excedido el límite de intentos'
}

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

export interface ResultAmazon {
  user?: CognitoUser
  error?: string
  idUser?: string
  userModel?: any
  message?: string
}

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const user = await Auth.signUp({
      username,
      password,
      attributes: {
        email
      }
    })
    return user
  } catch (error: any) {
    return { error: SIGN_UP_ERRORS[error.code] }
  }
}

export const signIn = async (mail: string, password: string): Promise<any> => {
  try {
    const user = await Auth.signIn(mail, password)
    return user
  } catch (error: any) {
    return { error: SIGN_UP_ERRORS[error.code] }
  }
}

export const forgotPassword = async (email: string) => {
  try {
    await Auth.forgotPassword(email)
    return { message: OK }
  } catch (error: any) {
    return { error: ERROR }
  }
}

export const forgotPasswordSubmit = async (
  username: string,
  verificationCode: string,
  password: string
) => {
  try {
    await Auth.forgotPasswordSubmit(
      username ?? '',
      verificationCode ?? '',
      password ?? ''
    )
    return { message: OK }
  } catch (error: any) {
    // ToDo: Revisar los errores que lanza el método y agregarlos al login
    return {
      error:
        FORGOT_PASSWORD_ERRORS[error.code] ??
        FORGOT_PASSWORD_ERRORS.GenericError
    }
  }
}
