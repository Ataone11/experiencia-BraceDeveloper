import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css'
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../src/redux/reducers/index";
import { ToastContainer } from "react-toastify";
import {Amplify} from "aws-amplify";
import PermissionsGuard from "../src/guards/PermissionGuard";
import { composeWithDevTools } from "redux-devtools-extension";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthVerified } from "../src/redux/reducers/authReducer";
import { verifyUserAuthenticity } from "../src/redux/actions/authActions";

const middleware = [thunk];

const makeStore = () =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

Amplify.configure({
    aws_project_region: 'us-east-1',
    aws_cognito_region: 'us-east-1',
    aws_user_pools_id: 'us-east-1_ZNaU46aMD',
    aws_user_pools_web_client_id: '3a2h18up7ek0ogpcilio8f0rr1',
})


const wrapper = createWrapper(makeStore);
function MyApp({ Component, pageProps }: AppProps) {
  const authVerified = useSelector(selectAuthVerified);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authVerified) {
      verifyUserAuthenticity(dispatch);
    }
  }, [authVerified, dispatch]);

  return (
    <PermissionsGuard>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
      </PermissionsGuard>
  );
}

export default wrapper.withRedux(MyApp);
