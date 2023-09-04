import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { selectUser, selectAuthVerified } from '../redux/reducers/authReducer'
import COLORS from '../utils/colors'
import { USER_ROLES } from '../utils/user-roles'

const PermissionsGuard = ({ children }: any) => {
  const authVerified = useSelector(selectAuthVerified)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [checkingPermissions, setCheckingPermissions] = useState(true)

  const checkPermissions = async () => {
    if (
      (router.pathname === '/login') &&
      user && user.rol === USER_ROLES.ADMIN
    ) {
      await router.push('/')
    } else if (!user) {
      await router.push('/login')
    }
    setCheckingPermissions(false)
  }

  useEffect(() => {
    if (authVerified) checkPermissions()
  }, [user, authVerified])

  if (checkingPermissions)
    return (
      <div className="border h-screen flex flex-col gap-y-1 items-center justify-center">
        <span className="font-bold text-lg text-Principal">Validando...</span>
        <BeatLoader color={COLORS.loading} size={10} />
      </div>
    )
  else return children
}

export default PermissionsGuard
