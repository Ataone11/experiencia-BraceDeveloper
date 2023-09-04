import { useState } from 'react'
import AddRemision from '../../../../src/screens/administrador/remision/AddRemision'
import NewRemision from '../../../../src/screens/administrador/remision/NewRemision'
import RemisionDetail from '../../../../src/screens/administrador/remision/RemisionDetail'
import Layout from '../../../../src/screens/formatos/Layout'
import { dataSidebar, screensRemisiones } from '../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../src/utils/enums'

const SCREEN = {
  [screensRemisiones.NEW]: AddRemision,
  [screensRemisiones.ADD]: NewRemision,
  [screensRemisiones.DETAIL]: RemisionDetail
}

const TITLE = {
  [screensRemisiones.NEW]: 'NUEVA REMISIÓN',
  [screensRemisiones.ADD]: 'GENERAR REMISIÓN',
  [screensRemisiones.DETAIL]: 'REMISIÓN'
}

export default function Remisions() {
  const [handleScreen, setHandleScreen] = useState(screensRemisiones.NEW)
  const Component = SCREEN[handleScreen]

  return (
    <Layout
      titleSection={TITLE[handleScreen]}
      dataSidebar={dataSidebar[SIDEBAR_ENUM.REMISIONES]}
      titleBasePage="Nueva remisión"
    >
      <Component setHandleScreen={setHandleScreen} />
    </Layout>
  )
}
