import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { selectUser, selectAuthVerified } from '../redux/reducers/authReducer'

import { USER_STATES } from '../utils/userStates'
import { USER_ROLES } from '../utils/user-roles'
import { ROUTES_USER } from '../utils/verifications'
import { generateToken } from '../proxy/BackendREST'

const PermissionsGuard = ({ children }: any) => {
  const authVerified = useSelector(selectAuthVerified)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [checkingPermissions, setCheckingPermissions] = useState(true)

  const checkPermissions = async () => {
    const route = router.pathname

    const exceptions = ['/verificador', '/consultar']

    if (exceptions.includes(route)) {
      setCheckingPermissions(false)
      return
    }
    if (
      (route === '/login' || route === '/registro' || route === '/') &&
      user &&
      user.activo === USER_STATES.ACTIVO
    ) {
      if (user.rol === USER_ROLES.ADMIN) {
        router.push('/administrador', undefined, { shallow: true }).then(null)
      } else if (user.rol === USER_ROLES.ENCARGADO) {
        router.push('/encargado', undefined, { shallow: true }).then(null)
      } else if (user.rol === USER_ROLES.PRDUCCION) {
        router.push('/produccion', undefined, { shallow: true }).then(null)
      } else if (user.rol === USER_ROLES.RECEPCION) {
        router.push('/recepcion', undefined, { shallow: true }).then(null)
      } else if (user.rol === USER_ROLES.USUARIO_PRINCIPAL) {
        router.push('/principal', undefined, { shallow: true }).then(null)
      } else if (user.rol === USER_ROLES.USUARIO_SUCURSAL) {
        router.push('/sucursal', undefined, { shallow: true }).then(null)
      }
    } else if (user) {
      if (user.rol === USER_ROLES.ADMIN && !route.includes(ROUTES_USER.ADMIN)) {
        router.push('/administrador', undefined, { shallow: true }).then(null)
      } else if (
        user.rol === USER_ROLES.ENCARGADO &&
        !route.includes(ROUTES_USER.ENCARGADO)
      ) {
        router.push('/encargado', undefined, { shallow: true }).then(null)
      } else if (
        user.rol === USER_ROLES.PRDUCCION &&
        !route.includes(ROUTES_USER.PRDUCCION)
      ) {
        router.push('/produccion', undefined, { shallow: true }).then(null)
      } else if (
        user.rol === USER_ROLES.RECEPCION &&
        !route.includes(ROUTES_USER.RECEPCION)
      ) {
        router.push('/recepcion', undefined, { shallow: true }).then(null)
      } else if (
        user.rol === USER_ROLES.USUARIO_PRINCIPAL &&
        !route.includes(ROUTES_USER.USUARIO_PRINCIPAL)
      ) {
        router.push('/principal', undefined, { shallow: true }).then(null)
      } else if (
        user.rol === USER_ROLES.USUARIO_SUCURSAL &&
        !route.includes(ROUTES_USER.USUARIO_SUCURSAL)
      ) {
        router.push('/sucursal', undefined, { shallow: true }).then(null)
      } else if (!user.rol) {
        router.push('/login', undefined, { shallow: true }).then(null)
      }
    } else {
      router.push('/login', undefined, { shallow: true }).then(null)
    }
    setTimeout(() => setCheckingPermissions(false), 1000)
  }

  useEffect(() => {
    if (authVerified) checkPermissions()
  }, [user, router.pathname, authVerified])

  useEffect(() => {
    generateToken()
  }, [user])

  if (checkingPermissions)
    return (
      <div className="border h-screen flex flex-col gap-y-1 items-center justify-center">
        <span className="font-bold text-lg text-Principal">Validando...</span>
        <BeatLoader color={'#cccccc'} size={10} />
      </div>
    )

  return children
}

export default PermissionsGuard
