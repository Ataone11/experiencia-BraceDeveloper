import { getData, patchData, postData } from "../../proxy/BackendREST";
import { forgotPassword, forgotPasswordSubmit, signIn, signUp } from "../../proxy/AWSCognito";
import { Auth } from "aws-amplify";
import { Dispatch } from "redux";
import { USER_ROLES } from "../../utils/user-roles";
import { ERROR } from "../../utils/constants";

export enum AUTH_ACTIONS {
    SIGN_UP = "SIGN_UP",
    SIGN_IN = "SIGN_IN",
    SIGN_OUT = "SIGN_OUT",
    SET_USER = "SET_USER",
    COMPLETE_REGISTRATION = "COMPLETE_REGISTRATION",
    UPDATE = "UPDATE",
    LOAD = "LOAD",
}

export const registerUser = async (dispatch: any, userInfo: any) => {
    // Llamar servicio de amplify para registrarme
    const signUpRes: any = await signUp(userInfo.correo, userInfo.correo, userInfo.password);

    if (signUpRes.error) {
        return signUpRes.error
    }

    // Usar el id del servicio de amplify y crear un usuario haciendo un llamado rest
    const res: any = await postData("usuarios", {}, { ...userInfo, tipoDocumento: parseInt(userInfo.tipoDocumento), id: signUpRes.userSub });
    dispatch({
        type: AUTH_ACTIONS.SIGN_UP,
        payload: res.data,
    });
};

export const signInUser = async (dispatch: any, mail: string, password: string) => {
    // Sign In con cognito
    const resCognito: any = await signIn(mail, password)

    if (!resCognito.error) {
        // Saco el id de cognito y hago el get del usuario usuarios/:id
        const response = await getData("usuarios/mis-datos")
        // Dispatch guardando el usuario
        dispatch({
            type: AUTH_ACTIONS.SIGN_IN,
            payload: response.data,
        })
        
        // se valida si el usuario no es amplifier
        if (response.data.rol !== USER_ROLES.AMPLIFIER) {
            return null
        }

        return response
    }
    // Manejar error de contrasena incorrecta

    return resCognito
};

export const completeRegistration = async (dispatch: any, userInfo: any, userId: string) => {

    const response: any = await postData("usuarios/" + userId + "/completar-registro", {}, { ...userInfo, longitud: parseFloat(userInfo.longitud), latitud: parseFloat(userInfo.latitud) })
    if(response.status === ERROR) {
        return response
    }
    // Dispatch guardando el usuario
    dispatch({
        type: AUTH_ACTIONS.COMPLETE_REGISTRATION,
        payload: response.data,
    })
    return response

}

export const loadProfile = async (idUser: string, dispatch: any) => {
    const response = await getData("usuarios/mis-datos")
    // Dispatch guardando el usuario
    dispatch({
        type: AUTH_ACTIONS.LOAD,
        payload: response.data,
    })
    return response
}

export const updateUser = async (dispatch: any, userInfo: any) => {
    //extraigo id de cache
    await Auth.currentSession()

    const response: any = await patchData("usuarios/", {}, { ...userInfo, indicacionesAdicionales: userInfo.indicacionesAdicionales, ciudad: userInfo.city })
    // Dispatch guardando el usuario
    if (response.status !== ERROR) {
        dispatch({
            type: AUTH_ACTIONS.UPDATE,
            payload: response.data,
        })
    }
    return response
}

export const callCategories = async (dispatch: any) => {

    const response = await getData("campanias/categorias")

    dispatch({
        type: AUTH_ACTIONS.LOAD,
        payload: response.data,
    })
    return response
}

export const saveCategories = async (dispatch: any, categories: {}) => {
    const response: any = await postData("usuarios/intereses", {}, { categorias: categories })

    dispatch({
        type: AUTH_ACTIONS.LOAD,
        payload: response.data,
    })
    return response
}

export const detailCampaign = async (dispatch: any, id: string) => {
    await Auth.currentSession()

    return await getData("campanias/" + id )
}

export const signUpCampaign = async (dispatch: any, id: number, horario: number) => {
    await Auth.currentSession()

    return await postData("campanias/" + id + "/inscribir", {}, {"horario": horario })
}

export const uploadScreenshotsCampaign = async (dispatch: any, id: number, screenshots: File[]) => {
    await Auth.currentSession()
    const formData = new FormData();

    screenshots.forEach((screenshot: File) => formData.append("pantallazos", screenshot))

    return await postData("campanias/" + id + "/pantallazos", {}, formData);
}

export const signOutWithAmazon = async (dispatch: Dispatch<any>) => {
    await Auth.signOut()
    dispatch({
        type: AUTH_ACTIONS.SIGN_OUT,
    })
}

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
        const response = await getData('usuarios/mis-datos')

        if (response.data.rol === USER_ROLES.AMPLIFIER) {
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