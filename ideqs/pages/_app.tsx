import '../src/styles/globals.css'
import type { AppProps } from 'next/app'

import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from '../src/redux/reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Amplify } from 'aws-amplify'
import PermissionsGuard from '../src/guards/PermissionGuard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect } from 'react'
import { selectAuthVerified } from '../src/redux/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { verifyUserAuthenticity } from '../src/redux/actions/authActions'

const middleware = [thunk]

const makeStore = () =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

Amplify.configure({
  aws_project_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id:
    process.env.NEXT_PUBLIC_AWS_USER_POOLS__WEB_CLIENT_ID
})

const wrapper = createWrapper(makeStore)
function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent: any = Component
  const authVerified = useSelector(selectAuthVerified)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!authVerified) {
      verifyUserAuthenticity(dispatch)
    }
  }, [authVerified, dispatch])

  return (
    <PermissionsGuard>
      <div>
        <AnyComponent {...pageProps} />
        <ToastContainer />
      </div>
    </PermissionsGuard>
  )
}

export default wrapper.withRedux(MyApp)
