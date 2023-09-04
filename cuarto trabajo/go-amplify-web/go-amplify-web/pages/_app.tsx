import '../src/styles/globals.css'
import type { AppProps } from 'next/app'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from '../src/redux/reducers/index'
import { composeWithDevTools } from "redux-devtools-extension";
import { Amplify } from 'aws-amplify'
import PermissionsGuard from '../src/guards/PermissionGuard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { selectAuthVerified } from '../src/redux/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { verifyUserAuthenticity } from '../src/redux/actions/authActions'

const middleware = [thunk]

const makeStore = () =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

Amplify.configure({
  aws_project_region: 'us-east-1',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_ZNaU46aMD',
  aws_user_pools_web_client_id: '3a2h18up7ek0ogpcilio8f0rr1',
})

const wrapper = createWrapper(makeStore)
function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent: any = Component
  const authVerified = useSelector(selectAuthVerified);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authVerified) {
      verifyUserAuthenticity(dispatch);
    }
  }, [authVerified, dispatch]);

  return <PermissionsGuard>
    <AnyComponent {...pageProps} />
    <ToastContainer />
  </PermissionsGuard>
}

export default wrapper.withRedux(MyApp)
