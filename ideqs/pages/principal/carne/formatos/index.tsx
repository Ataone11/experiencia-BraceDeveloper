import Layout from '../../../../src/screens/formatos/Layout'
import { dataSidebar } from '../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../src/utils/enums'
import DataFormat from '../../../../src/screens/empresa/carne/DataFormat'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../../src/redux/reducers/authReducer'
import { getFormatsSelector } from '../../../../src/redux/reducers/formatAdminReducer'
import { getFormatsActivos } from '../../../../src/redux/actions/formatAdminActions'
import { Template } from '../../../../src/models/templateModel'
import { PuffLoader } from 'react-spinners'
import Image from 'next/image'
import caraSeria from '../../../../src/assets/general/cara.svg'

export default function Formats() {
  const user = useSelector(selectUser)
  const formats = useSelector(getFormatsSelector)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const formats = async () => {
      if (user) {
        setLoading(true)
        await getFormatsActivos(dispatch, user?.idCliente)
        setLoading(false)
      }
    }
    formats()
  }, [])
  const override: any = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }

  return (
    <Layout
      titleSection="FORMATOS DE DATOS"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.ORDERS_BUSINESS]}
      titleBasePage="Formatos de datos"
    >
      {loading ? (
        <div className="flex w-full absolute inset-0 pl-32 justify-center items-center">
          <PuffLoader
            color="#086eae"
            loading={true}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <ul className="flex flex-col gap-[15px]">
          {formats &&
            formats.length > 0 &&
            formats.map((format: Template) => (
              <DataFormat key={format.id} format={format} />
            ))}
          {formats && formats.length <= 0 && (
            <div className="mx-auto pt-40 h-fit flex flex-col justify-center">
              <Image src={caraSeria} alt="" className="" />
              <span className=" text-textSize5  text-center text-gray-400 w-[220px]">
                Lo siento, no hay formatos disponibles
              </span>
            </div>
          )}
        </ul>
      )}
    </Layout>
  )
}
