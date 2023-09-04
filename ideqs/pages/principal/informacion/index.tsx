import Image from 'next/image'
import Layout from '../../../src/screens/formatos/Layout'
import CardInformation from '../../../src/screens/empresa/informacion/CardInformation'
import { useEffect, useState } from 'react'
import { SIDEBAR_ENUM } from '../../../src/utils/enums'
import { dataSidebar } from '../../../src/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../src/redux/reducers/authReducer'
import { InformationModel } from '../../../src/models/informationModel'
import { getDocsInformations } from '../../../src/redux/actions/informationActions'
import { getLoadingInformation } from '../../../src/redux/reducers/informationReducer'
import caraSeria from '../../../src/assets/general/cara.svg'
import { PuffLoader } from 'react-spinners'

export default function Information() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const loadingInformation = useSelector(getLoadingInformation)
  const [information, setInformation] = useState<Array<InformationModel>>([])

  const getInformation = async () => {
    if (user && user.idCliente) {
      const data = await getDocsInformations(dispatch, user.idCliente)
      setInformation(data)
    }
  }

  useEffect(() => {
    getInformation()
  }, [])

  return (
    <Layout
      titleSection="INFORMACIÓN"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.INFORMACION]}
      titleBasePage="Información"
    >
      {loadingInformation ? (
        <div className="flex justify-center mx-auto items-center min-h-[90%]">
          <PuffLoader
            color="#086eae"
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : information && information.length > 0 ? (
        <div className="grid gap-[20px]">
          {information.map((information) => (
            <CardInformation
              key={information.id}
              data={information}
              getInformation={getInformation}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Image src={caraSeria} alt="" className="" />
          <span className=" text-textSize5 my-4 text-center text-gray-400">
            No hay documentos disponibles, agrega tu primero
          </span>
        </div>
      )}
    </Layout>
  )
}
