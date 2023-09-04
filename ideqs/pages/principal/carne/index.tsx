import type { NextPage } from 'next'
import Layout from '../../../src/screens/formatos/Layout'
import { dataSidebar } from '../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../src/utils/enums'
import Table from '../../../src/screens/general/table/Table'
import { getCarneList } from '../../../src/redux/actions/carneActions'
import { useDispatch, useSelector } from 'react-redux'
import { getCarneListSelector } from '../../../src/redux/reducers/carneReducer'
import { useFetchPagination } from '../../../src/hooks/useFetchPagination'
import { selectUser } from '../../../src/redux/reducers/authReducer'

const headers = ['Orden', 'Cantidad', 'Fecha', 'Nombre del archivo']

const Carne: NextPage = () => {
  const carneList = useSelector(getCarneListSelector)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const params = {
    dispatch,
    user
  }

  const { paginator, isLoading } = useFetchPagination({
    functionFetcher: getCarneList,
    params
  })

  const content = carneList?.ordenes?.map((carne: any) => ({
    id: {
      link: true,
      href: `/principal/carne/${carne.id}`,
      text: carne.id
    },
    size: carne.cantidad ?? '0',
    date: carne.fecha ?? 'Sin fecha',
    file: carne.nombreExcel ?? 'Sin archivo'
  }))

  return (
    <Layout
      titleSection="CARNÉS PDF"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.ORDERS_BUSINESS]}
      titleBasePage="Carnés PDF"
    >
      <Table
        title={headers}
        list={content}
        bgRow="bg-[#D9D9D9]/30"
        totalPage={carneList?.page?.pages}
        functionPagination={paginator}
        isLoading={isLoading}
      />
    </Layout>
  )
}

export default Carne
