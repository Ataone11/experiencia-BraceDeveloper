import type { NextPage } from 'next'
import Users from '../../../src/screens/administrador/users/usuarios'
import { dataSidebar } from '../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../src/utils/enums'
import Layout from '../../../src/screens/formatos/Layout'

const Index: NextPage = () => {
  return (
    <Layout
      titleSection="IDEQS"
      titleBasePage="IDEQS"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.USUARIOSPRODUCCION]}
    >
      <Users />
    </Layout>
  )
}

export default Index
