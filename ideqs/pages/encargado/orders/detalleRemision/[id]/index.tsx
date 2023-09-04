import RemisionDetail from '../../../../../src/screens/administrador/remision/RemisionDetail'
import Layout from '../../../../../src/screens/formatos/Layout'
import { dataSidebar } from '../../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../../src/utils/enums'

export default function RemisionDetails() {
  return (
    <Layout
      titleSection="DETALLE DE LA REMISIÓN"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.ORDERS_ENCARGADO]}
      titleBasePage="Detalle de la remisión"
    >
      <RemisionDetail />
    </Layout>
  )
}
