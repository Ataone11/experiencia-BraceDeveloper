import React from 'react'
import EditUser from '../../../../src/screens/administrador/users/editarUsuario'
import Layout from '../../../../src/screens/formatos/Layout'
import { dataSidebar } from '../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../src/utils/enums'

export const Edit = () => {
  return (
    <Layout
      titleSection="EDITAR USUARIO"
      titleBasePage="Usuarios"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.USUARIOS]}
    >
      <EditUser />
    </Layout>
  )
}

export default Edit
