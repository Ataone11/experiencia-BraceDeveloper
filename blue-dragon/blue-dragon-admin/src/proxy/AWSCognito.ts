import { Auth } from "aws-amplify";
import { LoginProps } from "../../interfaces";
import {FORGOT_PASSWORD_ERRORS} from "../utils/constants";

export const signIn = async (newUser: LoginProps) => {
  try {
    return await Auth.signIn(newUser.email ?? "", newUser.password ?? "");
  } catch (error: any) {
    return { error: error.message };
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await Auth.forgotPassword(email)
    return { message: "OK" }
  } catch (error: any) {
    return { error: "ERROR" }
  }
}

export const forgotPasswordSubmit = async (username: string, verificationCode: string, password: string) => {
  try {
    await Auth.forgotPasswordSubmit(
        username ?? '',
        verificationCode ?? '',
        password ?? ''
    )
    return { message: "OK" }
  } catch (error: any) {
    // ToDo: Revisar los errores que lanza el método y agregarlos al login
    return {
      error:
          FORGOT_PASSWORD_ERRORS[error.code] ??
          FORGOT_PASSWORD_ERRORS.GenericError
    }
  }
}

