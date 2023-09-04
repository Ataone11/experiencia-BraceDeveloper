import type { NextPage } from 'next'
import Empresas from '../../../../src/screens/administrador/users/empresas'
import { dataSidebar } from '../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../src/utils/enums'
import Layout from '../../../../src/screens/formatos/Layout'

const Index: NextPage = () => {
  return (
    <Layout
      titleSection="Empresas"
      titleBasePage="Empresas"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.USUARIOS]}
    >
      <Empresas />
    </Layout>
  )
}

export default Index
