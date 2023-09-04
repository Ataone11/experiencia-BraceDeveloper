import { useState } from 'react'
import CreateNewPassword from '../../src/screens/login/CreateNewPassword'
import { SCREENS_ENUM } from '../../src/screens/login/enums'
import ForgetPasswordScreen from '../../src/screens/login/ForgetPasswordScreen'
import LoginScreen from '../../src/screens/login/LoginScreen'
import UpdatedPassword from '../../src/screens/login/UpdatedPassword'
import VerificationScreen from '../../src/screens/login/VerificationScreen'

const SCREENS: any = {
  [SCREENS_ENUM.LOGIN]: LoginScreen,
  [SCREENS_ENUM.FORGET_PASSWORD]: ForgetPasswordScreen,
  [SCREENS_ENUM.VERIFICATION]: VerificationScreen,
  [SCREENS_ENUM.CHANGE_PASSWORD]: CreateNewPassword,
  [SCREENS_ENUM.PASSWORD_UPDATED]: UpdatedPassword
}

const Login = () => {
  const [screen, setScreen] = useState<SCREENS_ENUM>(SCREENS_ENUM.LOGIN)
  const [recoverPassword, setRecoverPassword] = useState({
    email: '',
    code: ''
  })
  const handleScreen = () => {
    const Component = SCREENS[screen]
    return (
      <Component
        setScreen={setScreen}
        setRecoverPassword={setRecoverPassword}
        recoverPassword={recoverPassword}
      />
    )
  }
  return handleScreen()
}

export default Login
