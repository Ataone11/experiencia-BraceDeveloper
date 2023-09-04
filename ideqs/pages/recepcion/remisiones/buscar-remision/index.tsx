import { useState } from 'react'
import RemisionList from '../../../../src/screens/administrador/remision/RemisionList'
import SearchRemision from '../../../../src/screens/administrador/remision/SearchRemision'
import Layout from '../../../../src/screens/formatos/Layout'
import { dataSidebar, screensRemisiones } from '../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../src/utils/enums'

const SCREEN: any = {
  [screensRemisiones.SEARCH]: SearchRemision,
  [screensRemisiones.LIST]: RemisionList
}

const TITLE: any = {
  [screensRemisiones.SEARCH]: 'BUSCAR',
  [screensRemisiones.LIST]: 'REMISIONES'
}

export default function RemisionSearcher() {
  const [handleScreen, setHandleScreen] = useState(screensRemisiones.SEARCH)

  const Component = SCREEN[handleScreen]

  return (
    <Layout
      titleSection={TITLE[handleScreen]}
      dataSidebar={dataSidebar[SIDEBAR_ENUM.REMISIONES]}
      titleBasePage="Buscar remisión"
    >
      <Component setHandleScreen={setHandleScreen} />
    </Layout>
  )
}
