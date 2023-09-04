import ClientData from '../../../../src/screens/administrador/users/verClientes'
import Layout from '../../../../src/screens/formatos/Layout'
import { dataSidebar } from '../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../src/utils/enums'

export const User = () => {
  return (
    <Layout
      titleSection="USUARIOS"
      titleBasePage="Usuarios"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.USUARIOS]}
    >
      <ClientData />
    </Layout>
  )
}

export default User
