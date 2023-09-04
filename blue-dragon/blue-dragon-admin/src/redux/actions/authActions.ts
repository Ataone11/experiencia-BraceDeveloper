import { Auth } from "aws-amplify";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { LoginProps } from "../../../interfaces";
import {forgotPassword, forgotPasswordSubmit, signIn} from "../../proxy/AWSCognito";
import { getData } from "../../proxy/BackendREST";
import { USER_ROLES } from "../../utils/constants";

export enum loginActions {
  LOGIN = "loginReducer/login",
  LOGOUT = "loginReducer/logout",
  LOGIN_ERROR = "loginReducer/error",
}

export const signInWithAmazon = async (
  dispatch: Dispatch<AnyAction>,
  newUser: LoginProps
) => {
  const resCognito: any = await signIn(newUser);

  if (!resCognito.error) {
    const response = await getData(
      "users/" + resCognito.username,
      {},
      ""
    );

    if(response.data.data.role !== USER_ROLES.ADMIN) {
      return ({
        error: "No admin role"
      })
    }

    dispatch({
      type: loginActions.LOGIN,
      payload: response.data.data,
    });
    return response;
  }

  return resCognito;
};

export const signOutWithAmazon = async (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: loginActions.LOGOUT,
    payload: null,
  });
  await Auth.signOut();
};

export const verifyUserAuthenticity = async (dispatch: Dispatch<AnyAction>) => {
  try {
    await Auth.currentSession();
    const { attributes } = await Auth.currentAuthenticatedUser();

    const response = await getData("users/" + attributes.sub, {}, "");

    if (response.data.data?.role === USER_ROLES.ADMIN) {
      dispatch({
        type: loginActions.LOGIN,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: loginActions.LOGIN,
        payload: null,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: loginActions.LOGIN,
      payload: null,
    });
  }
};

export const forgotPasswordWithAmazon = async (
    email: string,
) => {
  const res = await forgotPassword(email)
  if (!res.error) {
    //   dispatch({
    //     // type: AUTH_ACTIONS.FORGOT_PASSWORD,
    //     payload: newUser
    //   })
  }
  return res
}

export const submitPasswordChange = async (
    code: string,
    email: any,
    password: any,
) => {
  const res = await forgotPasswordSubmit(email, code, password)
  if (!res.error) {
    //   dispatch({
    //     // type: AUTH_ACTIONS.SUBMIT_NEW_PASSWORD,
    //     payload: res
    //   })
  }
  return res
}

