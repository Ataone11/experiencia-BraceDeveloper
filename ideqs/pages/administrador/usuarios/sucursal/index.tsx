import SucursalData from '../../../../src/screens/administrador/users/verSucursal'
import Layout from '../../../../src/screens/formatos/Layout'
import { dataSidebar } from '../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../src/utils/enums'

export const User = () => {
  return (
    <Layout
      titleSection="SUCURSAL"
      titleBasePage="sucursal"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.USUARIOS]}
    >
      <SucursalData />
    </Layout>
  )
}

export default User
