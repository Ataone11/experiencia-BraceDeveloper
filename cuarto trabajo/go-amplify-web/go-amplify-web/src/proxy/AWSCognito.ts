import { Auth } from 'aws-amplify'
import { CognitoUser } from 'amazon-cognito-identity-js'
import {ERROR, FORGOT_PASSWORD_ERRORS, OK, SIGN_UP_ERRORS} from "../utils/constants";

export interface ResultAmazon {
    user?: CognitoUser
    error?: string
    idUser?: string
    userModel?: any
    message?: string
}

export const signUp = async (username: string, email: string, password: string) => {
    try {
        const user = await Auth.signUp({
            username: username,
            password: password,
            attributes: {
                email
            }
        })
        return user
    } catch (error: any) {
        return { error: SIGN_UP_ERRORS[error.code] }
    }
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