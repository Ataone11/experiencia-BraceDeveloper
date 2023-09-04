import { createSelector } from "reselect";
import { TestActionType } from "../actions/testActions";
import { AUTH_ACTIONS } from "../actions/authActions";

interface StateParams {
    user: any;
    authVerified: boolean;
}

const INITIAL_STATE: StateParams = {
    user: null,
    authVerified: false,
};

const reducer = (state: StateParams = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case AUTH_ACTIONS.SIGN_UP:
            return { ...state, user: action.payload };
        case AUTH_ACTIONS.SIGN_IN:
            return { ...state, user: action.payload, authVerified: true };
        case AUTH_ACTIONS.SET_USER:
            return { ...state, user: action.payload, authVerified: true };
        case AUTH_ACTIONS.SIGN_OUT:
            return { ...state, user: null };
        case AUTH_ACTIONS.COMPLETE_REGISTRATION:
            return { ...state, user: action.payload };
        case AUTH_ACTIONS.UPDATE:
            return { ...state, user: action.payload };
        case AUTH_ACTIONS.LOAD:
            return { ...state, user: action.payload };
        default:
            return { ...state };
    }
};

export default reducer;

export const selectAuthVerified = createSelector(
    (state: any) => state.authReducer,
    (authReducer: StateParams) => authReducer.authVerified
)

export const selectUser = createSelector(
    (state: any) => state.authReducer,
    (authReducer: StateParams) => authReducer?.user
)

export const selectInterestsIds = createSelector(
    (state: any) => state.authReducer,
    (authReducer: StateParams) => authReducer?.user?.intereses?.map((interest: any) => interest.categoria.id)
)