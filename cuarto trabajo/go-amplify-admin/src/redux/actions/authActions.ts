import { getData } from "../../proxy/BackendREST";
import { forgotPassword, forgotPasswordSubmit, signIn } from "../../proxy/AWSCognito";
import { Auth } from "aws-amplify";
import { USER_ROLES } from "../../utils/user-roles";
import { Dispatch } from "redux";

export enum AUTH_ACTIONS {
    SIGN_IN = "SIGN_IN",
    SET_USER = "SET_USER",
    SIGN_OUT = "SIGN_OUT"
}

export const signInUser = async (dispatch: any, mail: string, password: string) => {
    // Sign In con cognito
    const resCognito: any = await signIn(mail, password)

    if (!resCognito.error) {
        // Saco el id de cognito y hago el get del usuario usuarios/:id
        const response = await getData("/usuarios/" + resCognito.username)
        // Dispatch guardando el usuario
        dispatch({
            type: AUTH_ACTIONS.SIGN_IN,
            payload: response.data,
        })

        // se valida si el usuario no es administrador
        if (response.data.rol !== USER_ROLES.ADMIN) {
            return null
        }

        return response
    }
    // Manejar error de contrasena incorrecta

    return resCognito
};

export const forgotPasswordWithAmazon = async (
    email: string,
    // dispatch: (action: any) => void
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
    // dispatch: (action: any) => void
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

export const verifyUserAuthenticity = async (dispatch: Dispatch<any>) => {
    try {
        await Auth.currentSession()
        const { attributes } = await Auth.currentAuthenticatedUser()
        const response = await getData('usuarios/' + attributes.sub)

        if (response.data.rol === USER_ROLES.ADMIN) {
            dispatch({
                type: AUTH_ACTIONS.SET_USER,
                payload: response.data,
            })
        } else {
            dispatch({
                type: AUTH_ACTIONS.SET_USER,
                payload: null,
            })
        }
    } catch (error) {
        dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: null,
        })
    }
}

export const signOutWithAmazon = async (dispatch: Dispatch<any>) => {
    await Auth.signOut()
    dispatch({
        type: AUTH_ACTIONS.SIGN_OUT,
    })
}