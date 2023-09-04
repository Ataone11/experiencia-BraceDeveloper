import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCarneConsultSelector } from '../../../src/redux/reducers/carneReducer'
import CardPDF from '../../../src/screens/formatos/CardPDF'
import Layout from '../../../src/screens/formatos/Layout'
import { dataSidebar } from '../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../src/utils/enums'
import { Carne } from '../../../src/models/carneModel'

export default function Formatos() {
  const carneList: Carne | null = useSelector(getCarneConsultSelector)
  const router = useRouter()

  useEffect(() => {
    if (!carneList) {
      router.push('/consultar', undefined, {shallow:true})
    }
  }, [carneList])

  const carneListTemp = carneList ? [carneList] : []

  return (
    <>
      <Layout
        titleSection="CARNÉ PDF"
        titleBasePage="Formatos"
        dataSidebar={dataSidebar[SIDEBAR_ENUM.FORMATOS]}
      >
        <div className="grid gap-[20px] py-[20px]">
          {carneListTemp.map((information: Carne, i) => (
            <CardPDF key={i} data={information} />
          ))}
        </div>
      </Layout>
    </>
  )
}
