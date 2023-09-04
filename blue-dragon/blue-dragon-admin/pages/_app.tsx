import "../src/styles/globals.css";
import PopUp from "../components/PopUp";
import thunk from "redux-thunk";
import rootReducer from "../src/redux/reducers/index";
import type { AppProps } from "next/app";
import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import { useEffect, useState } from "react";
import { PopUpContext } from "../src/context/PopUpContext";
import { ModalModel } from "../interfaces";
import { Amplify } from "aws-amplify";
import { appWithTranslation } from "next-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyUserAuthenticity } from "../src/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthVerified } from "../src/redux/reducers/authReducer";
import PermissionsGuard from "../src/guards/PermissionsGuard";

const initialState = {};

const middleware = [thunk];

const makeStore = () =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

Amplify.configure({
  aws_project_region: "us-east-1",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_1et63usxP",
  aws_user_pools_web_client_id: "19d66inpu32mj4vtcs52odiu9m",
});

const wrapper = createWrapper(makeStore as any);

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthVerified);
  const [popUp, setPopUp] = useState<ModalModel | any>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!authState) {
      verifyUserAuthenticity(dispatch);
    }
  }, [authState]);

  return (
    <PermissionsGuard>
      <PopUpContext.Provider
        value={(newPopUp: any) => {
          if (newPopUp) {
            setPopUp(newPopUp);
            setTimeout(() => {
              setAnimate(true);
            }, 500);
          } else {
            setAnimate(false);
            setTimeout(() => {
              setPopUp(newPopUp);
            }, 500);
          }
        }}
      >
        <Component {...pageProps} />
        {popUp && (
          <PopUp
            popUp={popUp}
            setPopUp={setPopUp}
            animate={animate}
            setAnimate={setAnimate}
          />
        )}
        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </PopUpContext.Provider>
    </PermissionsGuard>
  );
}

export default appWithTranslation(wrapper.withRedux(MyApp));
