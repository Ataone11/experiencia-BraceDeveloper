import type { NextPage } from 'next'
import Layout from '../../../src/screens/formatos/Layout'
import { dataSidebar } from '../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../src/utils/enums'
import Table from '../../../src/screens/general/table/Table'
import { useFetchPagination } from '../../../src/hooks/useFetchPagination'
import { getRemisiones } from '../../../src/redux/actions/remisionActions'
import { useDispatch, useSelector } from 'react-redux'
import { getListRemisions } from '../../../src/redux/reducers/remisionesReducer'
import { USER_ROLES } from '../../../src/utils/user-roles'
import { ROUTES_USER } from '../../../src/utils/verifications'
import { selectUser } from '../../../src/redux/reducers/authReducer'

const headers = ['N° Remisión', 'Cliente', 'Fecha', 'Descripción']

const Remisions: NextPage = () => {
  const remisions = useSelector(getListRemisions)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const { paginator, isLoading } = useFetchPagination({
    functionFetcher: getRemisiones,
    params: { dispatch, page: 1 }
  })

  const remision = remisions?.remisiones?.map((remision: any) => ({
    id: {
      link: true,
      href: `/${
        USER_ROLES.ADMIN === user?.rol
          ? ROUTES_USER.ADMIN
          : USER_ROLES.ENCARGADO === user?.rol
          ? ROUTES_USER.ENCARGADO
          : USER_ROLES.PRDUCCION === user?.rol
          ? ROUTES_USER.PRDUCCION
          : USER_ROLES.RECEPCION === user?.rol
          ? ROUTES_USER.RECEPCION
          : USER_ROLES.USUARIO_PRINCIPAL === user?.rol
          ? ROUTES_USER.USUARIO_PRINCIPAL
          : USER_ROLES.USUARIO_SUCURSAL === user?.rol
          ? ROUTES_USER.USUARIO_SUCURSAL
          : 'login'
      }/remisiones/${remision.id}`,
      text: remision.id
    },
    client: remision.nombreCliente,
    date: remision.fecha,
    description: 'No está en el servicio'
  }))

  return (
    <Layout
      titleSection="REMISIONES"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.REMISIONES]}
      titleBasePage="Remisiones"
    >
      <Table
        title={headers}
        list={remision}
        bgRow="bg-[#D9D9D9]/30"
        functionPagination={paginator}
        totalPage={remisions?.page?.pages}
        isLoading={isLoading}
      />
    </Layout>
  )
}

export default Remisions
