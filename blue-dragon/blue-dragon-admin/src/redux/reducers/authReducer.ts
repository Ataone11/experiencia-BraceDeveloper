import { createSelector } from "reselect";
import { UserModel } from "../../../interfaces";
import { loginActions } from "../actions/authActions";

interface UserState {
  admin: UserModel | null;
  error: any;
  authVerified: boolean;
}
interface ActionUser {
  type: loginActions;
  payload: any;
  authVerified: boolean;
}

const initialState: UserState = {
  authVerified: false,
  admin: null,
  error: "",
};

const authReducer = (state = initialState, action: ActionUser) => {
  switch (action.type) {
    case loginActions.LOGIN:
      return {
        ...state,
        authVerified: true,
        admin: action.payload,
      };
    case loginActions.LOGOUT:
      return {
        ...state,
        admin: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

export const selectAuthVerified = createSelector(
  (state: any) => state.authReducer,
  (authReducer: UserState) => authReducer.authVerified
);

export const selectAdmin = createSelector(
  (state: any) => state.authReducer,
  (authReducer: UserState) => authReducer.admin
);
