import { Auth } from 'aws-amplify'
import { CognitoUser } from 'amazon-cognito-identity-js'
import {ERROR, FORGOT_PASSWORD_ERRORS, OK} from "../utils/constants";

export interface ResultAmazon {
    user?: CognitoUser
    error?: string
    idUser?: string
    userModel?: any
    message?: string
}

export const signIn = async (mail: string, password: string): Promise<ResultAmazon> => {
    try {
        return await Auth.signIn(mail, password)
    } catch (error: any) {
        return { error: error.message }
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
  
  export const forgotPasswordSubmit = async (username: string, verificationCode: string, password: string) => {
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