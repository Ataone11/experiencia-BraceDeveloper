/* eslint-disable no-unused-vars */
import { getData, patchData, PORTS, postData } from '../../proxy/BackendREST'
import {
  forgotPassword,
  forgotPasswordSubmit,
  signIn,
  signUp
} from '../../proxy/AWSCognito'

import { Auth } from 'aws-amplify'
import { Dispatch } from 'redux'
import { ERROR } from '../../utils/constants'

export enum AUTH_ACTIONS {
  SIGN_UP = 'SIGN_UP',
  SAVE_TOKEN = 'SAVE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  SET_USER = 'SET_USER',
  COMPLETE_REGISTRATION = 'COMPLETE_REGISTRATION',
  UPDATE = 'UPDATE',
  LOAD = 'LOAD'
}

export const registerUser = async (dispatch: any, userInfo: any) => {
  // Llamar servicio de amplify para registrarme
  const signUpRes: any = await signUp(
    userInfo.correo,
    userInfo.correo,
    userInfo.password
  )

  if (signUpRes.error) {
    return signUpRes.error
  }
  // Usar el id del servicio de amplify y crear un usuario haciendo un llamado rest
  const res: any = await postData('', {}, undefined, { id: signUpRes.userSub })
  dispatch({
    type: AUTH_ACTIONS.SIGN_UP,
    payload: res.data
  })
}

export const signInUser = async (
  dispatch: any,
  mail: string,
  password: string
) => {
  // Sign In con cognito
  const resCognito = await signIn(mail, password)

  if (!resCognito.error) {
    const active = await verifyUserAuthenticity(dispatch)
    if (active) {
      return resCognito
    }
  }
  return null
}

export const loadProfile = async (idUser: string, dispatch: any) => {
  const response = await getData(`auth/users/${idUser}`, {}, PORTS.AUTH)

  dispatch({
    type: AUTH_ACTIONS.SIGN_IN,
    payload: response.data
    // payload: {},
  })

  // Dispatch guardando el usuario
  dispatch({
    type: AUTH_ACTIONS.LOAD,
    payload: response.data
  })
  return response
}

export const updateUser = async (dispatch: any, userInfo: any) => {
  // extraigo id de cache
  await Auth.currentSession()

  const response: any = await patchData('usuarios/', {}, undefined, {
    ...userInfo
  })
  // Dispatch guardando el usuario
  if (response.status !== ERROR) {
    dispatch({
      type: AUTH_ACTIONS.UPDATE,
      payload: response.data
    })
  }
  return response
}

export const signOutWithAmazon = async (dispatch: Dispatch<any>) => {
  await Auth.signOut()
  dispatch({
    type: AUTH_ACTIONS.SIGN_OUT
  })
}

export const forgotPasswordWithAmazon = async (user: string) => {
  const res = await forgotPassword(user)

  return res
}

export const submitPasswordChange = async (
  code: string,
  email: any,
  password: any
) => {
  const res = await forgotPasswordSubmit(email, code, password)

  return res
}

export const verifyUserAuthenticity = async (dispatch: Dispatch<any>) => {
  try {
    const userAWS = await Auth.currentSession()
    if (userAWS) {
      const dataAWS = userAWS.getIdToken()
      const id = dataAWS.payload.sub
      if (id) {
        const response = await getData(`auth/users/${id}`, {}, PORTS.AUTH)
        if (response && response.data && response.data.data) {
          const userData = response.data.data
          if (userData.activo === 1) {
            dispatch({
              type: AUTH_ACTIONS.SET_USER,
              payload: response.data.data
            })

            return true
          }
        }
      }
    }

    dispatch({
      type: AUTH_ACTIONS.SET_USER,
      payload: null
    })
  } catch (error) {
    dispatch({
      type: AUTH_ACTIONS.SET_USER,
      payload: null
    })
  }

  return false
}
